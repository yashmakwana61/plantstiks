import os
import requests
from fastapi import HTTPException
from .core import MEDIA_DIR, db, iso

STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "plantstiks"

storage_key = None


def init_storage(force: bool = False):
    """Call once at startup (or lazily on first use). force=True recovers a dead key."""
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120,
    )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str) -> tuple:
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


async def ensure_object(mdoc: dict) -> tuple:
    """Return (bytes, content_type) for a media doc; lazily migrates legacy pod-local files."""
    path = mdoc.get("storage_path")
    mime = mdoc.get("mime") or "application/octet-stream"
    if path:
        return get_object(path)
    legacy = MEDIA_DIR / mdoc.get("stored", "")
    if mdoc.get("stored") and legacy.exists():
        data = legacy.read_bytes()
        new_path = f"{APP_NAME}/media/{mdoc['stored']}"
        try:
            result = put_object(new_path, data, mime)
            await db.media.update_one(
                {"_id": mdoc["_id"]},
                {"$set": {"storage_path": result.get("path", new_path), "migrated_at": iso()}},
            )
        except Exception:
            pass
        return data, mime
    raise HTTPException(status_code=404, detail="File missing")
