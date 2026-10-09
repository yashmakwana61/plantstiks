import { cloneElement, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiFetch, mediaUrl } from "./api";
import { SIDEBAR, SINGLETON_SCHEMAS, ROLES } from "./schema";
import { Badge, Btn, Card, Field, Loading } from "./ui";
import { GenericList, GenericEditor, fmtDate } from "./generic";
import { Dashboard } from "./Dashboard";
import { HomepageEditor } from "./HomepageEditor";
import { MediaLibrary } from "./MediaLibrary";
import { Leads } from "./Leads";
import { toast } from "sonner";
import { Logo } from "../components/Logo";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const user = await apiFetch("/auth/login", { method: "POST", body: { email, password } });
      onLogin(user);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-6" data-testid="cms-login">
      <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-white p-10 shadow-xl shadow-teal/5">
        <Logo dark size={52} />
        <p className="mt-6 font-display text-2xl font-bold text-teal">Plantstiks CMS</p>
        <p className="mt-1 text-sm text-ink/50">Content &amp; marketing management platform. Sign in with your team account.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field def={{ k: "email", label: "EMAIL", type: "text" }} value={email} onChange={setEmail} />
          <Field def={{ k: "password", label: "PASSWORD", type: "text" }} value={password} onChange={setPassword} />
          {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600" data-testid="login-error">{error}</p>}
          <button type="submit" disabled={busy} data-testid="login-submit-button" className="w-full rounded-full bg-teal px-8 py-3.5 font-display text-xs font-bold tracking-[0.2em] text-cream transition-colors hover:bg-leaf disabled:opacity-50">
            {busy ? "SIGNING IN…" : "SIGN IN TO CMS"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-ink/40">Authorized team members only. All actions are audit-logged.</p>
      </div>
    </div>
  );
};

const Shell = ({ user, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const nav = useNavigate();
  const location = useLocation();
  const mods = user.perms?.modules || [];

  useEffect(() => {
    apiFetch("/cms/notifications").then((d) => setNotifs(d.items)).catch(() => {});
  }, [location.pathname]);

  const allowed = (item) => !item.module || mods.includes(item.module);

  const doSearch = (v) => {
    setSearch(v);
    if (v.length < 2) return setResults([]);
    apiFetch(`/cms/search?q=${encodeURIComponent(v)}`).then((d) => setResults(d.results)).catch(() => setResults([]));
  };

  return (
    <div className="min-h-screen bg-cream">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-ink/10 bg-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
        data-testid="cms-sidebar"
      >
        <div className="flex items-center justify-between px-4 py-5">
          {!collapsed && <Logo dark size={34} />}
          <button onClick={() => setCollapsed(!collapsed)} data-testid="sidebar-toggle" className="rounded-lg border border-ink/10 p-2 text-ink/50 hover:text-teal">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-6">
          {SIDEBAR.map((group) => {
            const items = ((group.items || [])).filter(allowed);
            if (!items.length) return null;
            return (
              <div key={group.label}>
                {!collapsed && <p className="px-3 pb-1.5 font-display text-[0.58rem] font-bold tracking-[0.2em] text-ink/35">{group.label.toUpperCase()}</p>}
                {items.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <button
                      key={item.label + item.to}
                      onClick={() => nav(item.to)}
                      data-testid={`cms-nav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      title={item.label}
                      className={`mt-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${active ? "bg-teal text-cream" : "text-ink/65 hover:bg-cream-soft hover:text-teal"}`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? "bg-peach" : "bg-ink/20"}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
        <div className="border-t border-ink/10 p-3">
          <button onClick={() => nav("/")} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink/55 hover:text-teal" data-testid="view-website-link">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            {!collapsed && "View website ↗"}
          </button>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-ink/10 bg-cream/90 px-6 py-3 backdrop-blur-md">
          <div className="relative w-72">
            <input
              value={search}
              onChange={(e) => doSearch(e.target.value)}
              placeholder="Search everything — pages, products, leads…"
              data-testid="cms-global-search"
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm outline-none focus:border-teal"
            />
            {results.length > 0 && (
              <div className="absolute inset-x-0 top-full z-50 mt-2 rounded-xl border border-ink/10 bg-white py-2 shadow-xl">
                {results.map((r) => (
                  <button
                    key={r.collection + r.id}
                    onClick={() => { setSearch(""); setResults([]); nav(`/cms/c/${r.collection}/${r.id}`); }}
                    className="block w-full px-4 py-2 text-left text-sm text-ink/70 hover:bg-cream-soft"
                  >
                    <span className="mr-2 font-display text-[0.58rem] font-bold tracking-[0.14em] text-leaf">{r.collection.toUpperCase()}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-center gap-3">
            <button onClick={() => setNotifOpen(!notifOpen)} data-testid="cms-notifications-button" className="relative rounded-full border border-ink/10 bg-white p-2.5 text-ink/60 hover:text-teal">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4 4 0 00-4 4v3l-1.5 3h11L12 8.5v-3a4 4 0 00-4-4z" stroke="currentColor" strokeWidth="1.3" /><path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" /></svg>
              {notifs.some((n) => !n.read) && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-peach" />}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-ink/10 bg-white p-2 shadow-xl" data-testid="cms-notifications">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="font-display text-xs font-bold tracking-[0.16em] text-ink/45">NOTIFICATIONS</p>
                  <button
                    className="text-[0.65rem] text-leaf"
                    onClick={async () => { await apiFetch("/cms/notifications/read-all", { method: "POST" }); setNotifs(notifs.map((n) => ({ ...n, read: true }))); }}
                  >
                    Mark all read
                  </button>
                </div>
                {notifs.slice(0, 8).map((n) => (
                  <div key={n._id} className={`rounded-lg px-3 py-2 ${n.read ? "" : "bg-cream-soft/70"}`}>
                    <p className="text-xs font-semibold text-ink/75">{n.title}</p>
                    <p className="text-[0.68rem] text-ink/50">{n.body}</p>
                    <p className="mt-0.5 text-[0.6rem] text-ink/35">{new Date(n.created_at).toLocaleString("en-IN")}</p>
                  </div>
                ))}
                {!notifs.length && <p className="px-3 py-4 text-sm text-ink/40">Nothing yet.</p>}
              </div>
            )}
            <div className="text-right">
              <p className="font-display text-xs font-bold text-teal">{user.name}</p>
              <p className="text-[0.62rem] text-ink/45">{user.role.replace("_", " ")}</p>
            </div>
            <button
              onClick={async () => { await apiFetch("/auth/logout", { method: "POST" }); window.location.href = "/cms"; }}
              data-testid="cms-logout-button"
              className="rounded-full border border-ink/15 px-4 py-2 font-display text-[0.62rem] font-bold tracking-[0.14em] text-ink/60 hover:border-teal hover:text-teal"
            >
              LOGOUT
            </button>
          </div>
        </header>
        <main className="px-6 py-8 lg:px-10" data-testid="cms-main">{children}</main>
      </div>
    </div>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const [editing, setEditing] = useState(null);
  const load = () => apiFetch("/cms/users").then((d) => setUsers(d.items)).catch((e) => toast.error(e.message));
  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      if (editing._id) await apiFetch(`/cms/users/${editing._id}`, { method: "PUT", body: editing });
      else await apiFetch("/cms/users", { method: "POST", body: editing });
      toast.success("User saved");
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (!users) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-teal">Users</h1>
        <Btn onClick={() => setEditing({ name: "", email: "", role: "reviewer", password: "", active: true })} testid="user-new-button">+ NEW USER</Btn>
      </div>
      <Card className="mt-6 divide-y divide-ink/5">
        {users.map((u) => (
          <div key={u._id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4" data-testid={`user-row-${u._id}`}>
            <div>
              <p className="font-display text-sm font-bold text-teal">{u.name}</p>
              <p className="text-xs text-ink/50">{u.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge value={u.active ? "published" : "draft"} />
              <span className="font-display text-[0.62rem] font-bold tracking-[0.1em] text-ink/55">{u.role.replace("_", " ").toUpperCase()}</span>
              <Btn size="sm" variant="ghost" onClick={() => setEditing({ ...u, password: "" })}>EDIT</Btn>
            </div>
          </div>
        ))}
      </Card>
      {editing && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-teal-950/40 p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8">
            <h3 className="font-display text-xl font-bold text-teal">{editing._id ? "Edit user" : "New user"}</h3>
            <div className="mt-5 grid gap-4">
              <Field def={{ k: "name", label: "NAME", type: "text" }} value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Field def={{ k: "email", label: "EMAIL", type: "text" }} value={editing.email} onChange={(v) => setEditing({ ...editing, email: v })} />
              <Field def={{ k: "role", label: "ROLE", type: "select", options: ROLES }} value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <Field def={{ k: "password", label: editing._id ? "NEW PASSWORD (leave blank to keep)" : "PASSWORD", type: "text" }} value={editing.password || ""} onChange={(v) => setEditing({ ...editing, password: v })} />
              <Field def={{ k: "active", label: "ACTIVE", type: "bool" }} value={editing.active !== false} onChange={(v) => setEditing({ ...editing, active: v })} />
            </div>
            <div className="mt-6 flex gap-3">
              <Btn onClick={save} testid="user-save-button">SAVE USER</Btn>
              {editing._id && (
                <Btn variant="danger" onClick={async () => { await apiFetch(`/cms/users/${editing._id}`, { method: "DELETE" }); toast.success("Deleted"); setEditing(null); load(); }}>DELETE</Btn>
              )}
              <Btn variant="ghost" onClick={() => setEditing(null)}>CANCEL</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AuditPage = () => {
  const [items, setItems] = useState(null);
  useEffect(() => { apiFetch("/cms/audit").then((d) => setItems(d.items)).catch(() => setItems([])); }, []);
  if (!items) return <Loading />;
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-teal">Audit Log</h1>
      <p className="mt-1 text-xs text-ink/50">Every important action, who did it, and when.</p>
      <Card className="mt-6 divide-y divide-ink/5">
        {items.map((a, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 px-6 py-3" data-testid={`audit-row-${i}`}>
            <p className="text-sm text-ink/75">
              <span className="font-semibold text-teal">{a.user}</span> {a.action} <span className="font-mono text-xs text-ink/45">{a.entity}</span>
              {a.new?.name ? ` — ${a.new.name}` : a.prev?.status || a.new?.status ? ` — ${a.new?.status || a.prev?.status}` : ""}
            </p>
            <span className="text-xs text-ink/40">{new Date(a.created_at).toLocaleString("en-IN")}</span>
          </div>
        ))}
        {!items.length && <p className="py-10 text-center text-sm text-ink/40">No actions logged yet.</p>}
      </Card>
    </div>
  );
};

const SitemapPage = () => {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sitemap.xml`).then((r) => r.text()).then((t) => {
      setUrls([...t.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]));
    });
  }, []);
  if (!urls) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-teal">Sitemap</h1>
          <p className="mt-1 text-xs text-ink/50">Generated dynamically from published content · {urls.length} URLs</p>
        </div>
        <a href={`${process.env.REACT_APP_BACKEND_URL}/api/sitemap.xml`} target="_blank" rel="noreferrer" data-testid="sitemap-open" className="rounded-full border border-ink/15 px-5 py-2 text-[0.65rem] font-bold tracking-[0.12em] text-ink/70 hover:border-teal hover:text-teal">OPEN XML ↗</a>
      </div>
      <Card className="mt-6 p-6">
        {urls.map((u) => (
          <p key={u} className="border-b border-ink/5 py-2 font-mono text-xs text-ink/60 last:border-0">{u}</p>
        ))}
      </Card>
    </div>
  );
};

const SingletonEditor = ({ skey }) => {
  const schema = SINGLETON_SCHEMAS[skey];
  const [doc, setDoc] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    apiFetch(`/cms-single/${skey}`).then((d) => {
      setDoc(d);
      setId(d._id || null);
    }).catch((e) => toast.error(e.message));
  }, [skey]);

  if (!doc) return <Loading />;

  const getPath = (obj, p) => p.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  const setPath = (obj, p, val) => {
    const next = { ...obj };
    const keys = p.split(".");
    let cur = next;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) cur[k] = val;
      else {
        cur[k] = cur[k] && typeof cur[k] === "object" ? { ...cur[k] } : {};
        cur = cur[k];
      }
    });
    return next;
  };

  const save = async () => {
    try {
      const body = { ...doc };
      delete body._id;
      await apiFetch(`/cms-single/${skey}`, { method: "PUT", body });
      toast.success("Saved — version stored");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-teal">{schema.label}</h1>
          <p className="mt-1 text-xs text-ink/50">Changes go live immediately after save. Every save is versioned.</p>
        </div>
        <Btn onClick={save} testid="singleton-save-button">SAVE</Btn>
      </div>
      <Card className="mt-6 p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {schema.fields.map((f) =>
            f.type === "sub" ? (
              <div key={f.label} className="mt-2 border-t border-ink/10 pt-4 sm:col-span-2">
                <p className="font-display text-xs font-bold tracking-[0.2em] text-leaf">{f.label.toUpperCase()}</p>
              </div>
            ) : (
              <Field key={f.k} def={f} value={getPath(doc, f.k)} onChange={(v) => setDoc((d) => setPath(d, f.k, v))} />
            )
          )}
        </div>
      </Card>
    </div>
  );
};

const MODULE_BY_COLLECTION = {
  pages: "pages", blog: "blog", case_studies: "case_studies", faqs: "faqs",
  products: "products", preforms: "preforms", moulds: "moulds", applications: "applications",
  documents: "documents", leads: "leads", redirects: "seo", media: "media", audit: "audit",
};
const MODULE_BY_SINGLETON = { settings: "settings", navigation: "navigation", footer: "footer", home_sections: "homepage" };

const ModuleGuard = ({ user, fixed, children }) => {
  const params = useParams();
  const { collection, skey } = params;
  const mod = fixed || (collection ? MODULE_BY_COLLECTION[collection] : MODULE_BY_SINGLETON[skey]);
  const mods = user?.perms?.modules || [];
  if (mod && !mods.includes(mod)) return <Navigate to="/cms" replace />;
  const extra = collection ? { collection, ...(params.id ? { id: params.id } : {}) } : skey ? { skey } : {};
  return Object.keys(extra).length ? cloneElement(children, extra) : children;
};

export const CmsApp = () => {
  const [user, setUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    apiFetch("/auth/me").then(setUser).catch(() => setUser(null));
  }, [location.pathname]);

  if (user === undefined) return <div className="min-h-screen bg-cream"><Loading /></div>;
  if (user === null) return <Login onLogin={setUser} />;

  return (
    <Shell user={user}>
      <Routes>
        <Route path="/cms" element={<Dashboard user={user} />} />
        <Route path="/cms/c/:collection" element={<ModuleGuard user={user}><GenericList /></ModuleGuard>} />
        <Route path="/cms/c/:collection/:id" element={<ModuleGuard user={user}><GenericEditor /></ModuleGuard>} />
        <Route path="/cms/homepage" element={<ModuleGuard user={user} fixed="homepage"><HomepageEditor /></ModuleGuard>} />
        <Route path="/cms/media" element={<ModuleGuard user={user} fixed="media"><MediaLibrary /></ModuleGuard>} />
        <Route path="/cms/leads" element={<ModuleGuard user={user} fixed="leads"><Leads /></ModuleGuard>} />
        <Route path="/cms/single/:skey" element={<ModuleGuard user={user}><SingletonEditor /></ModuleGuard>} />
        <Route path="/cms/users" element={<ModuleGuard user={user} fixed="users"><UsersPage /></ModuleGuard>} />
        <Route path="/cms/audit" element={<ModuleGuard user={user} fixed="audit"><AuditPage /></ModuleGuard>} />
        <Route path="/cms/sitemap" element={<ModuleGuard user={user} fixed="seo"><SitemapPage /></ModuleGuard>} />
        <Route path="/cms/*" element={<Navigate to="/cms" replace />} />
      </Routes>
    </Shell>
  );
};
