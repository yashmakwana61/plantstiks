# Setup & Run (Windows)

## Prereqs
- Node 24 + npm 11 (installed: v24.18.0 / 11.16.0)
- Docker Desktop (for MongoDB; image `mongo:6` already cached)
- Python 3.11 (installing via `winget install -e --id Python.Python.3.11`)

## 1. Environment files (already created)
- `backend/.env` — `MONGO_URL=mongodb://localhost:27017`, `DB_NAME=plantstiks`,
  `JWT_SECRET=<random>`, `CORS_ORIGINS=http://localhost:3000`,
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` seed the super-admin on first boot.
  See `backend/.env.example`.
- `frontend/.env` — `REACT_APP_BACKEND_URL=http://localhost:8000`, `PORT=3000`.
  See `frontend/.env.example`.

## 2. Database
```powershell
docker start plantstiks-mongo 2>$null; if (!$?) {
  docker run -d --name plantstiks-mongo -p 27017:27017 `
    -v plantstiks-mongo-data:/data/db mongo:6
}
```
Or: `docker compose up -d mongo`

## 3. Backend
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
# health: http://localhost:8000/docs
```
First boot seeds admin user + CMS content (`cms/seed.py`).
Login: `admin@plantstiksbottle.in` / `Plantstiks@2026` (from `backend/.env`).
Object storage (`cms/storage.py`) fails open if `EMERGENT_LLM_KEY` is unset.

Docker alternative: `docker compose up -d --build backend`

## 4. Frontend
```powershell
cd frontend
# yarn 1.22.22 via corepack (no admin enable needed):
$env:COREPACK_HOME="$env:USERPROFILE\.corepack"
$env:COREPACK_ENABLE_DOWNLOAD_PROMPT="0"
corepack yarn@1.22.22 install --frozen-lockfile
corepack yarn@1.22.22 start
# or: npm start  (craco start on http://localhost:3000)
```

## 5. One-click (Windows)
`start-all.bat` — starts Mongo container, backend, and frontend in separate windows.

## Tests
- Backend: `cd backend && pytest` (pinned `-n 2 --dist loadscope` in `pytest.ini`
  — do not override).
- Frontend: `cd frontend && npm test` / `yarn test` (CRA watch mode).
