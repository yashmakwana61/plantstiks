const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export async function apiFetch(path, { method = "GET", body } = {}) {
  const opts = {
    method,
    credentials: "include",
    headers: body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {},
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };
  let res = await fetch(`${API}${path}`, opts);
  if (res.status === 401 && !path.startsWith("/auth/")) {
    const r = await fetch(`${API}/auth/refresh`, { method: "POST", credentials: "include" });
    if (r.ok) res = await fetch(`${API}${path}`, opts);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = typeof data.detail === "string" ? data.detail
      : Array.isArray(data.detail) ? data.detail.map((e) => e.msg).join(", ")
      : "Request failed";
    throw Object.assign(new Error(msg), { status: res.status, usage: data.detail?.usage });
  }
  return data;
}

export const mediaUrl = (id) => (id ? `${API}/media/${id}` : null);
