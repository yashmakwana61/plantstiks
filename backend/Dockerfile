# Production image for Plantstiks FastAPI backend.
# Dev uses volume-mount + --reload (docker-compose.yml). This is prod-only:
# no reload, non-root user, healthcheck, baked deps.
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# System deps for bcrypt/cryptography builds if wheels miss (kept minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt \
    && pip uninstall -y black isort flake8 mypy pytest pytest-xdist 2>/dev/null || true

COPY server.py .
COPY cms/ ./cms/

# Non-root runtime user; media dir must stay writable for legacy local fallback
RUN useradd -m -u 10001 appuser \
    && mkdir -p /app/media \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/health', timeout=4).read()" || exit 1

# Workers via $UVICORN_WORKERS (default 2). Override per VPS size: 2-4 x vCPU.
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port 8000 --workers ${UVICORN_WORKERS:-2} --proxy-headers --forwarded-allow-ips '*'"]
