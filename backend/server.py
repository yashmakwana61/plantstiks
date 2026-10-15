import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Fail fast with a clear message instead of a bare KeyError deep in cms.core.
for _var in ("MONGO_URL", "DB_NAME", "JWT_SECRET"):
    if not os.environ.get(_var):
        raise RuntimeError(f"Missing required env var {_var} (see backend/.env.production.example)")

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

logging.basicConfig(
    level=os.environ.get("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
log = logging.getLogger("plantstiks")

from cms.core import db, mongo_client as client
from cms import seed as cms_seed
from cms.storage import init_storage
from cms.public import router as public_router
from cms.admin import router as admin_router

ENV = os.environ.get("ENV", "development").lower()
IS_PROD = ENV == "production"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.revisions.create_index([("entity", 1), ("entity_id", 1)])
    try:
        init_storage()
        log.info("Object storage initialized")
    except Exception as e:
        # Storage is optional; app serves local/DB content without it.
        log.warning("Storage init failed (continuing without remote storage): %s", e)
    await cms_seed.seed()
    log.info("Startup complete (env=%s)", ENV)
    yield
    # Shutdown
    client.close()
    log.info("Shutdown complete")


app = FastAPI(
    title="Plantstiks CMS API",
    docs_url=None if IS_PROD else "/docs",
    redoc_url=None if IS_PROD else "/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

app.include_router(public_router)
app.include_router(admin_router)


def _parse_origins(raw: str) -> list[str]:
    return [o.strip() for o in (raw or "").split(",") if o.strip()]


_raw_origins = os.environ.get("CORS_ORIGINS", "")
_origins = _parse_origins(_raw_origins)
if not _origins:
    # Never allow_credentials with "*": browsers reject it and it is insecure.
    # Dev default keeps localhost working; prod MUST set CORS_ORIGINS explicitly.
    _origins = ["http://localhost:3000"] if not IS_PROD else []
    if IS_PROD:
        log.warning("CORS_ORIGINS is empty in production; cross-origin requests will be blocked")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Requested-With"],
    max_age=600,
)

_trusted = _parse_origins(os.environ.get("TRUSTED_HOSTS", ""))
if _trusted:
    # Enforce Host header (mitigates host-header attacks behind proxy).
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=_trusted)


@app.middleware("http")
async def security_headers(request, call_next):
    resp = await call_next(request)
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["X-Frame-Options"] = "DENY"
    resp.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    resp.headers["Cross-Origin-Resource-Policy"] = "same-origin"
    return resp


@app.get("/api/ready", include_in_schema=False)
async def ready():
    """Readiness probe: app + MongoDB reachable. Compose/nginx use /api/health for liveness."""
    try:
        await db.command("ping")
    except Exception as e:
        log.warning("Readiness ping failed: %s", e)
        return JSONResponse({"status": "not_ready"}, status_code=503)
    return {"status": "ready"}


@app.exception_handler(Exception)
async def unhandled_handler(request, exc):  # noqa: ANN001, ANN202
    log.exception("Unhandled error on %s %s", request.method, request.url.path)
    if IS_PROD:
        return JSONResponse({"detail": "Internal server error"}, status_code=500)
    raise exc
