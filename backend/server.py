import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from starlette.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional

from cms.core import db, mongo_client as client, iso, oid
from cms import seed as cms_seed
from cms.storage import init_storage
from cms.public import router as public_router
from cms.admin import router as admin_router

app = FastAPI()

api = public_router  # /api router (public content + forms)
app.include_router(public_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.revisions.create_index([("entity", 1), ("entity_id", 1)])
    try:
        init_storage()
        print("Object storage initialized")
    except Exception as e:
        print(f"Storage init failed: {e}")
    await cms_seed.seed()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
