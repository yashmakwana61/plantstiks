# Production deploy — Hostinger

> Read this first: **Hostinger Business *shared* web hosting cannot run this stack.**
> Python/FastAPI, MongoDB and Docker need root access → **VPS only**
> (Hostinger support: "Python, Django, Flask, Java … are supported exclusively on VPS Hosting").
> Node.js apps are allowed on Business shared, but this backend is Python, so:
>
> - **Frontend (static CRA build)** → Hostinger Business shared `public_html` ✅
> - **Backend (FastAPI) + MongoDB** → Hostinger VPS (KVM, Ubuntu 24.04, Docker) ✅
>   or MongoDB Atlas + VPS for the API.
>
> Pushing `docker-compose.prod.yml` to shared hosting will not work. Follow the split below.

## Architecture

```
Browser ──https──▶ www.plantstiksbottle.in (shared hosting, static build/)
                    └── REACT_APP_BACKEND_URL=https://api.plantstiksbottle.in
Browser ──https──▶ api.plantstiksbottle.in (VPS: nginx :80/443 → backend:8000 → mongo:27017)
```

Bake the API URL into the frontend at build time (CRA inlines `REACT_APP_*`):
`REACT_APP_BACKEND_URL=https://api.plantstiksbottle.in npm run build`

## 0. Prereqs

- Domain DNS in Hostinger hPanel: `www`/`@` → shared hosting IP; `api` → VPS IP (A record).
- VPS: Ubuntu 24.04, Docker + compose plugin, firewall open 80/443 (keep 27017 closed).
- Local: Node 24, Python 3.11, Docker Desktop (for pre-flight only).

## 1. Secrets (VPS only, never commit)

```bash
# on the VPS, in the repo root:
cp backend/.env.production.example backend/.env.production
python3 -c "import secrets; print(secrets.token_urlsafe(48))"  # -> JWT_SECRET
# edit backend/.env.production: MONGO_ROOT_PASSWORD, JWT_SECRET, ADMIN_PASSWORD,
# CORS_ORIGINS=https://www.plantstiksbottle.in,https://plantstiksbottle.in
chmod 600 backend/.env.production
```

`backend/.env` / `frontend/.env` (localhost) are git-ignored dev files — do not copy them to prod.

## 2. Backend + Mongo on the VPS

```bash
docker compose -f docker-compose.prod.yml --env-file backend/.env.production up -d --build
docker compose -f docker-compose.prod.yml ps
curl -s http://localhost:8000/api/health  # {"status":"ok"}
curl -s http://localhost:8000/api/ready   # {"status":"ready"} (DB ping)
docker compose -f docker-compose.prod.yml logs -f backend
```

First boot seeds admin + CMS content (`cms/seed.py`). **Change `ADMIN_PASSWORD` + rotate `JWT_SECRET` after first login.**
Mongo data persists in `plantstiks-mongo-prod-data`. Nightly backup:

```bash
docker exec plantstiks-mongo-prod mongodump --username $MONGO_ROOT_USER \
  --password $MONGO_ROOT_PASSWORD --authenticationDatabase admin \
  --out /data/backup/$(date +%F)
```

## 3. TLS (Let's Encrypt on the VPS)

```bash
# point api.plantstiksbottle.in at the VPS first, then:
docker run --rm -p 80:80 -v certvol:/etc/letsencrypt certbot/certbot certonly --standalone \
  -d api.plantstiksbottle.in
# mount certvol into nginx, uncomment the 443 block in nginx.prod.conf, reload
```

Alternatively terminate TLS at Hostinger/CDN and keep VPS on port 80 behind it.

## 4. Frontend → shared hosting

```bash
cd frontend
REACT_APP_BACKEND_URL=https://api.plantstiksbottle.in GENERATE_SOURCEMAP=false npm run build
# upload frontend/build/* (including .htaccess + robots.txt) to public_html via hPanel File Manager / FTP
```

`frontend/public/.htaccess` provides the SPA rewrite (`/* → index.html`) on Apache.
`frontend/public/robots.txt` points crawlers at `/sitemap.xml` (served by the API).
Verify: open `https://www.plantstiksbottle.in/products/bottles` directly (not just `/`) — it must load, proving the rewrite works.

## 5. Full-stack on VPS only (alternative)

If you prefer everything on the VPS, the same compose file already serves the API + static
build via `nginx.prod.conf` (`/api/` → backend, `/*` → `index.html`). Build the frontend with the
API URL first, then `up -d --build` as in step 2 and point both DNS records at the VPS.

## 6. Operational notes

- Health: liveness `/api/health`, readiness (DB) `/api/ready`. Uptime monitor both.
- Logs: `docker compose -f docker-compose.prod.yml logs -f backend nginx mongo` (structured `asctime level name` lines from `server.py`).
- Scaling: `UVICORN_WORKERS=2-4` in `backend/.env.production` (rule of thumb: 2× vCPU).
- Media: 25MB limit, allowlist `jpg/png/webp/avif/svg/mp4/pdf`, remote-first via Emergent proxy;
  `backend/media/` is a legacy fallback — back it up if `storage_path` is empty for any rows.
- Security deltas vs dev: `/docs`+`/redoc` disabled when `ENV=production`, strict CORS allowlist
  (no `*` + credentials), `TrustedHost` when `TRUSTED_HOSTS` set, `Secure/HttpOnly/SameSite=None`
  auth cookies, security headers from both FastAPI and nginx, non-root backend user, Mongo auth + no public 27017.
- Rollback: images are versioned per build; `docker compose -f docker-compose.prod.yml up -d --build` redeploys; Mongo volume survives rebuilds.
