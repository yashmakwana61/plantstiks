import os
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta
from bson import ObjectId
from fastapi import HTTPException, Request, Depends
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
MEDIA_DIR = ROOT_DIR / "media"
MEDIA_DIR.mkdir(exist_ok=True)

mongo_client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = mongo_client[os.environ["DB_NAME"]]

JWT_ALGORITHM = "HS256"


def now():
    return datetime.now(timezone.utc)


def iso(d=None):
    return (d or now()).isoformat()


class PyObjectIdStr(str):
    pass


def oid(v):
    return str(v) if isinstance(v, ObjectId) else v


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[str] = Field(default=None, alias="_id")

    def to_mongo(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        data.pop("_id", None)
        return data

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc) if doc else None


def clean(doc):
    if doc is None:
        return None
    doc = dict(doc)
    doc["_id"] = str(doc["_id"])
    if "password_hash" in doc:
        doc.pop("password_hash")
    return doc


def clean_list(cursor):
    return [clean(d) for d in cursor]


# ---------- password / tokens ----------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def jwt_secret():
    return os.environ["JWT_SECRET"]


def create_token(user_id, email, kind="access", minutes=15, days=None):
    payload = {
        "sub": str(user_id),
        "email": email,
        "type": kind,
        "exp": now() + (timedelta(days=days) if days else timedelta(minutes=minutes)),
    }
    return jwt.encode(payload, jwt_secret(), algorithm=JWT_ALGORITHM)


def decode_token(token):
    return jwt.decode(token, jwt_secret(), algorithms=[JWT_ALGORITHM])


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = decode_token(token)
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user or not user.get("active", True):
            raise HTTPException(status_code=401, detail="User not found")
        return clean(user)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- RBAC ----------

MODULES = [
    "dashboard", "pages", "homepage", "navigation", "footer", "blog", "case_studies",
    "faqs", "products", "preforms", "moulds", "applications", "documents", "media",
    "leads", "seo", "settings", "users", "audit",
]

COLLECTION_MODULE = {
    "pages": "pages", "blog": "blog", "case_studies": "case_studies", "faqs": "faqs",
    "products": "products", "preforms": "preforms", "moulds": "moulds",
    "applications": "applications", "documents": "documents", "leads": "leads",
    "redirects": "seo", "media": "media", "audit": "audit",
}

ROLE_PERMS = {
    "super_admin": {"modules": MODULES, "edit": True},
    "content_manager": {"modules": ["dashboard", "pages", "homepage", "navigation", "footer", "blog", "case_studies", "faqs", "applications", "media"], "edit": True},
    "product_manager": {"modules": ["dashboard", "products", "preforms", "moulds", "applications", "media", "leads"], "edit": True},
    "technical_manager": {"modules": ["dashboard", "documents", "media"], "edit": True},
    "marketing_manager": {"modules": ["dashboard", "homepage", "pages", "seo", "media", "blog", "navigation", "footer", "faqs"], "edit": True},
    "sales_manager": {"modules": ["dashboard", "leads"], "edit": True},
    "reviewer": {"modules": ["dashboard", "pages", "homepage", "blog", "case_studies", "products", "preforms", "applications", "documents", "faqs", "media"], "edit": False},
}


def perms_for(user):
    if user.get("role") == "super_admin":
        return ROLE_PERMS["super_admin"]
    return ROLE_PERMS.get(user.get("role"), {"modules": [], "edit": False})


def guard(module: str, edit: bool = True):
    async def _dep(user: dict = Depends(get_current_user)):
        p = perms_for(user)
        if module not in p["modules"]:
            raise HTTPException(status_code=403, detail="No access to this module")
        if edit and not p["edit"]:
            raise HTTPException(status_code=403, detail="Read-only role")
        return user
    return _dep


# ---------- audit & revisions ----------

async def audit(user, action, entity, entity_id=None, prev=None, new=None):
    await db.audit.insert_one({
        "user": user.get("name") or user.get("email"),
        "role": user.get("role"),
        "action": action,
        "entity": entity,
        "entity_id": str(entity_id) if entity_id else None,
        "prev": prev,
        "new": new,
        "created_at": iso(),
    })


async def notify(title, body, ntype="info", link=None):
    await db.notifications.insert_one({
        "title": title, "body": body, "type": ntype, "link": link,
        "read": False, "created_at": iso(),
    })


async def snapshot(db_, entity, entity_id, data, user):
    last = await db_.revisions.find_one({"entity": entity, "entity_id": entity_id}, sort=[("version", -1)])
    version = (last["version"] + 1) if last else 1
    await db_.revisions.insert_one({
        "entity": entity, "entity_id": entity_id, "version": version,
        "data": data, "user": user.get("name") or user.get("email"),
        "created_at": iso(),
    })
    return version


def public_view(doc):
    if not doc:
        return None
    doc = dict(doc)
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc
