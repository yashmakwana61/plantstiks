@echo off
REM Start MongoDB (Docker) + Backend (uvicorn) + Frontend (craco)
SETLOCAL
SET EXEC_BYPASS=powershell -NoProfile -ExecutionPolicy Bypass -Command

echo [1/3] Ensuring MongoDB container is running...
docker start plantstiks-mongo 2>NUL || docker run -d --name plantstiks-mongo -p 27017:27017 -v plantstiks-mongo-data:/data/db mongo:6

echo [2/3] Starting backend on http://localhost:8000 ...
start "plantstiks-backend" cmd /k "cd /d %~dp0backend && python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload"

echo [3/3] Starting frontend on http://localhost:3000 ...
start "plantstiks-frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo Done. Backend: http://localhost:8000/docs  Frontend: http://localhost:3000
