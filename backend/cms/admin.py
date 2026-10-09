import uuid
from fastapi import APIRouter, HTTPException, Depends, Request, Response, UploadFile, File, Form
from pydantic import BaseModel, EmailStr
from typing import Optional
from .core import (db, iso, clean, clean_list, hash_password, verify_password,
                   create_token, decode_token, get_current_user, guard, perms_for,
                   COLLECTION_MODULE, audit, notify, snapshot)
from .public import ALLOWED_MEDIA, create_lead
from .storage import put_object, APP_NAME

router = APIRouter(prefix="/api")

SEARCH_FIELDS = {
    "pages": ["title", "internal_name", "slug"], "products": ["name", "sku"],
    "preforms": ["name"], "moulds": ["name"], "applications": ["name"],
    "documents": ["name", "organization"], "blog": ["title"], "case_studies": ["title", "client"],
    "faqs": ["question"], "leads": ["name", "company", "email"], "redirects": ["old_path", "new_path"],
    "media": ["title", "filename"], "users": ["name", "email"],
}

SINGLETONS = {"settings": "settings", "navigation": "navigation", "footer": "footer", "home_sections": "homepage"}

STATUS_FLOW = ["draft", "in_review", "approved", "published", "archived"]


# ---------------- AUTH ----------------

class LoginIn(BaseModel):
    email: EmailStr
    password: str


def set_auth_cookies(response: Response, user):
    access = create_token(user["_id"], user["email"], "access", minutes=15)
    refresh = create_token(user["_id"], user["email"], "refresh", days=7)
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")


@router.post("/auth/login")
async def login(body: LoginIn, request: Request, response: Response):
    email = body.email.lower()
    identifier = f"{request.client.host}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5 and not _lock_expired(attempt):
        raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": {"updated_at": iso()}, "$inc": {"count": 1}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    set_auth_cookies(response, user)
    u = clean(user)
    await audit(u, "logged in", "auth", u["_id"])
    return {**u, "perms": perms_for(u)}


def _lock_expired(attempt):
    from datetime import datetime, timezone, timedelta
    try:
        t = datetime.fromisoformat(attempt["updated_at"])
        return datetime.now(timezone.utc) - t > timedelta(minutes=15)
    except Exception:
        return True


@router.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No session")
    try:
        payload = decode_token(token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"_id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        set_auth_cookies(response, user)
        return {"ok": True}
    except Exception:
        raise HTTPException(status_code=401, detail="Session expired")


@router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return {**user, "perms": perms_for(user)}


# ---------------- DASHBOARD ----------------

@router.get("/cms/dashboard")
async def dashboard(user: dict = Depends(guard("dashboard", edit=False))):
    async def count(c, q=None):
        return await db[c].count_documents(q or {})

    new_leads = await db.leads.count_documents({"status": "New"})
    return {
        "website": {"live": True, "last_published": await last_published(), "last_content_update": await last_update()},
        "content": {
            "pages": await count("pages"), "products": await count("products"),
            "preforms": await count("preforms"), "moulds": await count("moulds"),
            "applications": await count("applications"), "documents": await count("documents"),
            "blog": await count("blog"), "case_studies": await count("case_studies"),
            "media": await count("media"), "faqs": await count("faqs"),
        },
        "leads": {
            "new": new_leads,
            "product_enquiries": await db.leads.count_documents({"type": "product_enquiry"}),
            "samples": await db.leads.count_documents({"type": "sample"}),
            "qualified": await db.leads.count_documents({"status": "Qualified"}),
            "total": await count("leads"),
        },
        "activity": clean_list(await db.audit.find().sort("created_at", -1).to_list(8)),
        "notifications": clean_list(await db.notifications.find().sort("created_at", -1).to_list(5)),
    }


async def last_published():
    d = await db.audit.find_one({"action": {"$in": ["published", "published page"]}}, sort=[("created_at", -1)])
    return d["created_at"] if d else None


async def last_update():
    d = await db.audit.find_one(sort=[("created_at", -1)])
    return d["created_at"] if d else None


# ---------------- USERS (literal routes — registered before parameterized /cms/{collection} routes) ----------------

@router.get("/cms/users")
async def list_users(q: Optional[str] = None, user: dict = Depends(guard("users", edit=False))):
    query = {}
    if q:
        import re
        rx = {"$regex": re.escape(q), "$options": "i"}
        query["$or"] = [{"name": rx}, {"email": rx}]
    items = clean_list(await db.users.find(query).sort("created_at", -1).to_list(200))
    return {"items": items, "total": len(items)}


@router.post("/cms/users")
async def create_user(body: dict, user: dict = Depends(guard("users"))):
    email = (body.get("email") or "").lower()
    if not email or not body.get("password"):
        raise HTTPException(status_code=400, detail="Email and password required")
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=409, detail="Email already exists")
    doc = {
        "name": body.get("name", ""), "email": email, "role": body.get("role", "reviewer"),
        "active": body.get("active", True), "created_at": iso(),
        "password_hash": hash_password(body["password"]),
    }
    res = await db.users.insert_one(doc)
    await audit(user, "created user", "users", str(res.inserted_id), None, {"email": email, "role": doc["role"]})
    return {"ok": True, "id": str(res.inserted_id)}


@router.put("/cms/users/{id}")
async def update_user(id: str, body: dict, user: dict = Depends(guard("users"))):
    from bson import ObjectId
    prev = await db.users.find_one({"_id": ObjectId(id)})
    if not prev:
        raise HTTPException(status_code=404, detail="Not found")
    updates = {k: v for k, v in body.items() if k not in ("_id", "password_hash")}
    if body.get("password"):
        updates["password_hash"] = hash_password(body.pop("password"))
    updates["updated_at"] = iso()
    await db.users.update_one({"_id": ObjectId(id)}, {"$set": updates})
    await audit(user, "updated user", "users", id, clean(prev), None)
    return {"ok": True}


@router.delete("/cms/users/{id}")
async def delete_user(id: str, user: dict = Depends(guard("users"))):
    if user["_id"] == id:
        raise HTTPException(status_code=400, detail="You cannot delete yourself")
    from bson import ObjectId
    await db.users.delete_one({"_id": ObjectId(id)})
    await audit(user, "deleted user", "users", id, None, None)
    return {"ok": True}


# ---------------- SEARCH / AUDIT / NOTIFICATIONS (literal routes) ----------------

@router.get("/cms/search")
async def global_search(q: str, user: dict = Depends(get_current_user)):
    import re
    mods = perms_for(user)["modules"]
    results = []
    rx = {"$regex": re.escape(q), "$options": "i"}
    fields_map = {
        "pages": ("title", "pages"), "products": ("name", "products"), "preforms": ("name", "preforms"),
        "moulds": ("name", "moulds"), "applications": ("name", "applications"),
        "documents": ("name", "documents"), "blog": ("title", "blog"),
        "case_studies": ("title", "case_studies"), "faqs": ("question", "faqs"), "leads": ("name", "leads"),
    }
    for col, (field, mod) in fields_map.items():
        if mod not in mods:
            continue
        async for d in db[col].find({field: rx}).limit(5):
            results.append({"collection": col, "id": str(d["_id"]), "label": d.get(field, "—")})
    return {"results": results[:25]}


@router.get("/cms/audit")
async def audit_log(user: dict = Depends(guard("audit", edit=False))):
    return {"items": clean_list(await db.audit.find().sort("created_at", -1).to_list(200))}


@router.get("/cms/notifications")
async def notifications(user: dict = Depends(get_current_user)):
    return {"items": clean_list(await db.notifications.find().sort("created_at", -1).to_list(30))}


@router.post("/cms/notifications/read-all")
async def notifications_read(user: dict = Depends(get_current_user)):
    await db.notifications.update_many({}, {"$set": {"read": True}})
    return {"ok": True}


# ---------------- GENERIC CRUD ----------------

def search_q(collection: str, q: Optional[str]):
    if not q:
        return {}
    import re
    rx = {"$regex": re.escape(q), "$options": "i"}
    return {"$or": [{f: rx} for f in SEARCH_FIELDS.get(collection, ["name", "title"])]}


@router.get("/cms/{collection}")
async def list_items(collection: str, request: Request, q: Optional[str] = None, sort_by: str = None,
                     sort_dir: int = -1, skip: int = 0, limit: int = 100, user: dict = Depends(get_current_user)):
    module = COLLECTION_MODULE.get(collection)
    if not module:
        raise HTTPException(status_code=404, detail="Unknown collection")
    if module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    query = search_q(collection, q)
    for k, v in request.query_params.multi_items():
        if k not in ("q", "sort_by", "sort_dir", "skip", "limit") and v:
            query[k] = v
    if sort_by:
        cursor = db[collection].find(query).sort([(sort_by, sort_dir)])
    else:
        cursor = db[collection].find(query).sort([("sort_order", 1), ("created_at", -1)])
    items = clean_list(await cursor.skip(skip).limit(limit).to_list(limit))
    total = await db[collection].count_documents(query)
    return {"items": items, "total": total}


@router.get("/cms/{collection}/{id}")
async def get_item(collection: str, id: str, user: dict = Depends(get_current_user)):
    module = COLLECTION_MODULE.get(collection)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    from bson import ObjectId
    try:
        doc = await db[collection].find_one({"_id": ObjectId(id)})
    except Exception:
        doc = await db[collection].find_one({"_id": id})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return clean(doc)


@router.post("/cms/{collection}")
async def create_item(collection: str, body: dict, user: dict = Depends(get_current_user)):
    module = COLLECTION_MODULE.get(collection)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    if not perms_for(user)["edit"]:
        raise HTTPException(status_code=403, detail="Read-only role")
    body.pop("_id", None)
    body.pop("password", None)
    body.setdefault("created_at", iso())
    body["updated_at"] = iso()
    body["updated_by"] = user.get("name")
    res = await db[collection].insert_one(body)
    await audit(user, "created", collection, res.inserted_id, None, {"name": body.get("name") or body.get("title") or body.get("question")})
    await notify("Content created", f"{user.get('name')} created {body.get('name') or body.get('title') or 'item'} in {collection}", "content", f"/cms/c/{collection}/{res.inserted_id}")
    return {"ok": True, "id": str(res.inserted_id)}


@router.put("/cms/{collection}/{id}")
async def update_item(collection: str, id: str, body: dict, user: dict = Depends(get_current_user)):
    module = COLLECTION_MODULE.get(collection)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    if not perms_for(user)["edit"]:
        raise HTTPException(status_code=403, detail="Read-only role")
    from bson import ObjectId
    try:
        oid_ = ObjectId(id)
    except Exception:
        oid_ = id
    prev = await db[collection].find_one({"_id": oid_})
    if not prev:
        raise HTTPException(status_code=404, detail="Not found")
    prev_clean = clean(prev)
    updates = {k: v for k, v in body.items() if k not in ("_id", "password")}
    updates["updated_at"] = iso()
    updates["updated_by"] = user.get("name")
    await db[collection].update_one({"_id": oid_}, {"$set": updates})
    new_doc = await db[collection].find_one({"_id": oid_})
    await snapshot(db, collection, id, clean(new_doc), user)
    await audit(user, "updated", collection, id, prev_clean, clean(new_doc))
    return {"ok": True}


@router.delete("/cms/{collection}/{id}")
async def delete_item(collection: str, id: str, user: dict = Depends(get_current_user)):
    module = COLLECTION_MODULE.get(collection)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    if not perms_for(user)["edit"]:
        raise HTTPException(status_code=403, detail="Read-only role")
    from bson import ObjectId
    try:
        oid_ = ObjectId(id)
    except Exception:
        oid_ = id
    prev = await db[collection].find_one({"_id": oid_})
    if not prev:
        raise HTTPException(status_code=404, detail="Not found")
    if collection == "media":
        usage = await media_usage(id)
        if usage:
            raise HTTPException(status_code=409, detail={"message": "Asset in use", "usage": usage})
    await db[collection].delete_one({"_id": oid_})
    await audit(user, "deleted", collection, id, clean(prev), None)
    return {"ok": True}


# ---------------- WORKFLOW ----------------

@router.post("/cms/{collection}/{id}/workflow")
async def workflow(collection: str, id: str, body: dict, user: dict = Depends(get_current_user)):
    action = body.get("action")
    module = COLLECTION_MODULE.get(collection)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    from bson import ObjectId
    try:
        oid_ = ObjectId(id)
    except Exception:
        oid_ = id
    doc = await db[collection].find_one({"_id": oid_})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    current = doc.get("status", "draft")

    transitions = {
        "submit_review": ("draft", "in_review"),
        "approve": ("in_review", "approved"),
        "reject": (None, "draft"),
        "publish": (None, "published"),
        "unpublish": (None, "draft"),
    }
    if action not in transitions:
        raise HTTPException(status_code=400, detail="Unknown action")
    if action == "publish" and current not in ("approved", "draft", "in_review"):
        raise HTTPException(status_code=400, detail="Cannot publish from this status")
    if action in ("approve", "publish") and current == "draft" and action == "approve":
        raise HTTPException(status_code=400, detail="Submit for review first")
    new_status = transitions[action][1]
    await db[collection].update_one({"_id": oid_}, {"$set": {"status": new_status, "updated_at": iso(), "updated_by": user.get("name")}})
    label = doc.get("name") or doc.get("title") or doc.get("question") or id
    await audit(user, action, collection, id, {"status": current}, {"status": new_status})
    if action in ("publish", "approve", "reject"):
        await notify(f"{label} — {action}", f"{user.get('name')} set {label} to {new_status}", "workflow", f"/cms/c/{collection}/{id}")
    return {"ok": True, "status": new_status}


# ---------------- REVISIONS ----------------

@router.get("/cms/{collection}/{id}/revisions")
async def revisions(collection: str, id: str, user: dict = Depends(get_current_user)):
    items = clean_list(await db.revisions.find({"entity": collection, "entity_id": id}).sort("version", -1).to_list(50))
    return {"items": items}


@router.post("/cms/{collection}/{id}/restore")
async def restore(collection: str, id: str, body: dict, user: dict = Depends(get_current_user)):
    if not perms_for(user)["edit"]:
        raise HTTPException(status_code=403, detail="Read-only role")
    rev = await db.revisions.find_one({"entity": collection, "entity_id": id, "version": body.get("version")})
    if not rev:
        raise HTTPException(status_code=404, detail="Revision not found")
    from bson import ObjectId
    try:
        oid_ = ObjectId(id)
    except Exception:
        oid_ = id
    data = dict(rev["data"])
    data.pop("_id", None)
    data["updated_at"] = iso()
    data["updated_by"] = user.get("name")
    await db[collection].update_one({"_id": oid_}, {"$set": data})
    await audit(user, "restored revision", collection, id, None, {"version": body.get("version")})
    return {"ok": True}


# ---------------- SINGLETONS ----------------

@router.get("/cms-single/{key}")
async def get_singleton(key: str, user: dict = Depends(get_current_user)):
    module = SINGLETONS.get(key)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    doc = await db[key].find_one()
    return clean(doc) or {}


@router.put("/cms-single/{key}")
async def put_singleton(key: str, body: dict, user: dict = Depends(get_current_user)):
    module = SINGLETONS.get(key)
    if not module or module not in perms_for(user)["modules"]:
        raise HTTPException(status_code=403, detail="No access")
    if not perms_for(user)["edit"]:
        raise HTTPException(status_code=403, detail="Read-only role")
    doc = await db[key].find_one()
    prev = clean(doc)
    body = {k: v for k, v in body.items() if k != "_id"}
    body["updated_at"] = iso()
    body["updated_by"] = user.get("name")
    if doc:
        await db[key].update_one({"_id": doc["_id"]}, {"$set": body})
        new_doc = await db[key].find_one({"_id": doc["_id"]})
        await snapshot(db, key, str(doc["_id"]), clean(new_doc), user)
        await audit(user, "updated", key, str(doc["_id"]), prev, clean(new_doc))
    else:
        await db[key].insert_one({**body, "created_at": iso()})
        await audit(user, "created", key, None, None, body)
    return {"ok": True}


# ---------------- MEDIA ----------------

@router.post("/cms/media/upload")
async def upload_media(file: UploadFile = File(...), title: str = Form(""), description: str = Form(""),
                       alt: str = Form(""), category: str = Form("Brand"), tags: str = Form(""),
                       user: dict = Depends(guard("media"))):
    if file.content_type not in ALLOWED_MEDIA:
        raise HTTPException(status_code=400, detail=f"File type {file.content_type} not allowed")
    content = await file.read()
    if len(content) > 25 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 25MB)")
    ext = ALLOWED_MEDIA[file.content_type]
    storage_path = f"{APP_NAME}/media/{uuid.uuid4().hex}{ext}"
    result = put_object(storage_path, content, file.content_type)
    width = height = None
    if file.content_type.startswith("image/") and ext != ".svg":
        try:
            from PIL import Image
            import io
            img = Image.open(io.BytesIO(content))
            width, height = img.size
        except Exception:
            pass
    doc = {
        "filename": file.filename, "storage_path": result.get("path", storage_path), "mime": file.content_type,
        "size": len(content), "width": width, "height": height,
        "title": title or file.filename, "description": description, "alt": alt,
        "category": category, "tags": [t.strip() for t in tags.split(",") if t.strip()],
        "uploaded_by": user.get("name"), "created_at": iso(),
    }
    res = await db.media.insert_one(doc)
    await audit(user, "uploaded", "media", str(res.inserted_id), None, {"filename": file.filename})
    return {"ok": True, "id": str(res.inserted_id), "url": f"/api/media/{res.inserted_id}"}


async def media_usage(media_id: str):
    usage = []
    fields = ["image", "hero_image", "featured_image", "pdf_media_id", "image_media_id", "logo_media_id", "og_image", "favicon"]
    for c in ["products", "preforms", "moulds", "applications", "documents", "blog", "case_studies", "pages", "settings"]:
        q = {"$or": [{f: media_id} for f in fields]}
        q["$or"].append({"images": media_id})
        q["$or"].append({"gallery": media_id})
        async for d in db[c].find(q, {"name": 1, "title": 1}):
            usage.append({"collection": c, "id": str(d["_id"]), "name": d.get("name") or d.get("title") or "—"})
    return usage


@router.get("/cms/media/{id}/usage")
async def media_usage_ep(id: str, user: dict = Depends(guard("media", edit=False))):
    return {"usage": await media_usage(id)}
