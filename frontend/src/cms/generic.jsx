import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch, mediaUrl } from "./api";
import { SCHEMAS } from "./schema";
import { Badge, Btn, Card, Confirm, Empty, Field, Loading, Modal } from "./ui";
import { toast } from "sonner";

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
const setIn = (obj, path, val) => {
  const next = { ...obj };
  const keys = path.split(".");
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

export const fmtDate = (d) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
};

export const GenericList = ({ collection }) => {
  const schema = SCHEMAS[collection];
  const nav = useNavigate();
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [dir, setDir] = useState(-1);
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState([]);
  const [confirmDel, setConfirmDel] = useState(null);
  const perPage = 20;

  const load = useCallback(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sortBy) {
      params.set("sort_by", sortBy);
      params.set("sort_dir", dir);
    }
    params.set("skip", page * perPage);
    params.set("limit", perPage);
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
    apiFetch(`/cms/${collection}?${params}`).then((d) => {
      setItems(d.items);
      setTotal(d.total);
    }).catch((e) => toast.error(e.message));
  }, [collection, q, filters, sortBy, dir, page]);

  useEffect(() => {
    load();
  }, [load]);

  if (!items) return <Loading />;

  const col = (k) => get(k, k);

  const cell = (item, c) => {
    const v = get(item, c.k);
    if (c.type === "badge") return <Badge value={v} />;
    if (c.type === "bool") return <span className={v ? "text-leaf" : "text-ink/30"}>{v ? "Yes" : "—"}</span>;
    if (c.type === "date") return fmtDate(v);
    if (c.mono) return <span className="font-mono text-xs">{v || "—"}</span>;
    return String(v ?? "—");
  };

  const exportCsv = () => {
    const head = schema.columns.map((c) => c.label).join(",");
    const rows = items.map((i) => schema.columns.map((c) => `"${String(get(i, c.k) ?? "").replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([`${head}\n${rows.join("\n")}`], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${collection}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-teal">{schema.label}</h1>
          <p className="mt-1 text-xs text-ink/50">{total} total</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder={`Search ${schema.label.toLowerCase()}…`}
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(0); }}
            data-testid={`${collection}-search`}
            className="w-56 rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-teal"
          />
          {(schema.filters || []).map((f) => (
            <select
              key={f.k}
              value={filters[f.k] || ""}
              onChange={(e) => setFilters((f0) => ({ ...f0, [f.k]: e.target.value }))}
              className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-teal"
            >
              <option value="">{f.label}: All</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
          <Btn variant="ghost" size="sm" onClick={exportCsv}>EXPORT</Btn>
          {sel.length > 0 && (
            <Btn variant="danger" size="sm" onClick={() => setConfirmDel({ bulk: true })}>DELETE ({sel.length})</Btn>
          )}
          <Btn onClick={() => nav(`/cms/c/${collection}/new`)} testid={`${collection}-new-button`}>+ NEW</Btn>
        </div>
      </div>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm" data-testid={`${collection}-table`}>
          <thead>
            <tr className="border-b border-ink/10">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={sel.length === items.length && items.length > 0}
                  onChange={(e) => setSel(e.target.checked ? items.map((i) => i._id) : [])}
                />
              </th>
              {schema.columns.map((c) => (
                <th key={c.k} className="px-4 py-3">
                  <button
                    className="flex items-center gap-1 font-display text-[0.62rem] font-bold tracking-[0.14em] text-ink/45"
                    onClick={() => { setSortBy(c.k); setDir(sortBy === c.k ? -dir : -1); }}
                  >
                    {c.label} {sortBy === c.k && <span>{dir === 1 ? "↑" : "↓"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="cursor-pointer border-b border-ink/5 transition-colors hover:bg-cream-soft/60"
                onClick={() => nav(`/cms/c/${collection}/${item._id}`)}
                data-testid={`${collection}-row-${item._id}`}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={sel.includes(item._id)}
                    onChange={(e) => setSel(e.target.checked ? [...sel, item._id] : sel.filter((s) => s !== item._id))}
                  />
                </td>
                {schema.columns.map((c) => (
                  <td key={c.k} className="max-w-[260px] truncate px-4 py-3 text-ink/75">{cell(item, c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && <div className="p-10"><Empty title={`No ${schema.label.toLowerCase()} yet`} hint={`Click "+ NEW" to create the first one.`} /></div>}
      </Card>

      {total > perPage && (
        <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
          <span>Page {page + 1} of {Math.ceil(total / perPage)}</span>
          <div className="flex gap-2">
            <Btn size="sm" variant="ghost" disabled={page === 0} onClick={() => setPage(page - 1)}>PREV</Btn>
            <Btn size="sm" variant="ghost" disabled={(page + 1) * perPage >= total} onClick={() => setPage(page + 1)}>NEXT</Btn>
          </div>
        </div>
      )}

      <Confirm
        open={!!confirmDel}
        title="Delete items?"
        body="This cannot be undone. Linked pages will keep working; references are never silently broken for media."
        onClose={() => setConfirmDel(null)}
        onConfirm={async () => {
          for (const id of confirmDel.bulk ? sel : [confirmDel]) {
            try {
              await apiFetch(`/cms/${collection}/${id}`, { method: "DELETE" });
            } catch (e) {
              if (e.usage) toast.error(`In use by: ${e.usage.map((u) => u.name).join(", ")}`);
              else toast.error(e.message);
            }
          }
          setSel([]);
          setConfirmDel(null);
          toast.success("Deleted");
          load();
        }}
      />
    </div>
  );
};

const REVISION_HELPERS = { get, setIn };

export const GenericEditor = ({ collection, id }) => {
  const schema = SCHEMAS[collection];
  const nav = useNavigate();
  const isNew = id === "new";
  const [doc, setDoc] = useState(null);
  const [saving, setSaving] = useState(false);
  const [revs, setRevs] = useState(null);
  const [showRevs, setShowRevs] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    if (isNew) {
      setDoc({ status: "draft", published: false });
      return;
    }
    apiFetch(`/cms/${collection}/${id}`).then(setDoc).catch((e) => toast.error(e.message));
    apiFetch(`/cms/${collection}/${id}/revisions`).then((d) => setRevs(d.items)).catch(() => {});
  }, [collection, id, isNew]);

  if (!doc) return <Loading />;

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const d = await apiFetch(`/cms/${collection}`, { method: "POST", body: doc });
        toast.success("Created");
        nav(`/cms/c/${collection}/${d.id}`);
      } else {
        await apiFetch(`/cms/${collection}/${id}`, { method: "PUT", body: doc });
        toast.success("Saved — revision stored");
        const d = await apiFetch(`/cms/${collection}/${id}/revisions`);
        setRevs(d.items);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const wf = async (action) => {
    try {
      const d = await apiFetch(`/cms/${collection}/${id}/workflow`, { method: "POST", body: { action } });
      setDoc({ ...doc, status: d.status });
      toast.success(`Status: ${d.status.replace("_", " ")}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const del = async () => {
    try {
      await apiFetch(`/cms/${collection}/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      nav(`/cms/c/${collection}`);
    } catch (e) {
      setConfirmDel(false);
      toast.error(e.message);
    }
  };

  const restore = async (version) => {
    try {
      await apiFetch(`/cms/${collection}/${id}/restore`, { method: "POST", body: { version } });
      const d = await apiFetch(`/cms/${collection}/${id}`);
      setDoc(d);
      toast.success(`Restored version ${version}`);
      setShowRevs(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const name = doc[schema.nameField] || "Untitled";
  const hasWorkflow = schema.workflow;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button onClick={() => nav(`/cms/c/${collection}`)} className="text-xs text-ink/45 hover:text-teal">
            ← {schema.label}
          </button>
          <h1 className="mt-1 max-w-2xl truncate font-display text-2xl font-bold text-teal">{name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {hasWorkflow && <Badge value={doc.status} />}
          {!isNew && <Btn variant="ghost" size="sm" onClick={() => setShowPreview(true)}>PREVIEW</Btn>}
          {!isNew && <Btn variant="ghost" size="sm" onClick={() => setShowRevs(true)}>HISTORY</Btn>}
          {!isNew && <Btn variant="danger" size="sm" onClick={() => setConfirmDel(true)}>DELETE</Btn>}
          <Btn onClick={save} disabled={saving} testid={`${collection}-save-button`}>{saving ? "SAVING…" : "SAVE"}</Btn>
        </div>
      </div>

      {hasWorkflow && !isNew && (
        <div className="mt-5 flex flex-wrap gap-2 rounded-xl border border-ink/10 bg-cream-soft/60 p-3" data-testid="workflow-bar">
          <span className="mr-2 self-center font-display text-[0.6rem] font-bold tracking-[0.18em] text-ink/40">WORKFLOW</span>
          {doc.status === "draft" && <Btn size="sm" variant="ghost" onClick={() => wf("submit_review")}>SUBMIT FOR REVIEW</Btn>}
          {doc.status === "in_review" && <Btn size="sm" onClick={() => wf("approve")}>APPROVE</Btn>}
          {doc.status === "in_review" && <Btn size="sm" variant="ghost" onClick={() => wf("reject")}>REJECT</Btn>}
          {["draft", "in_review", "approved"].includes(doc.status) && <Btn size="sm" variant="peach" onClick={() => wf("publish")} testid="publish-button">PUBLISH</Btn>}
          {doc.status === "published" && <Btn size="sm" variant="ghost" onClick={() => wf("unpublish")}>UNPUBLISH</Btn>}
        </div>
      )}

      <Card className="mt-6 p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {schema.fields.map((f) =>
            f.type === "sub" ? (
              <div key={f.label} className="sm:col-span-2 mt-2 border-t border-ink/10 pt-4">
                <p className="font-display text-xs font-bold tracking-[0.2em] text-leaf">{f.label.toUpperCase()}</p>
              </div>
            ) : (
              <Field
                key={f.k}
                def={f}
                value={get(doc, f.k)}
                onChange={(v) => setDoc((d) => setIn(d, f.k, v))}
              />
            )
          )}
        </div>
      </Card>

      <Modal open={showPreview} onClose={() => setShowPreview(false)} wide>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-teal">Preview — {name}</h3>
          <a href={`${doc.slug || "/"}`} target="_blank" rel="noreferrer" className="text-xs text-leaf underline">open live page ↗</a>
        </div>
        <div className="mt-6 rounded-2xl border border-ink/10 bg-cream-soft p-6" data-testid="preview-panel">
          <p className="eyebrow text-leaf">CONTENT SUMMARY (DRAFT SAVE PREVIEW)</p>
          {schema.fields.filter((f) => f.k).slice(0, 8).map((f) => {
            const v = get(doc, f.k);
            if (v == null || v === "") return null;
            return (
              <div key={f.k} className="mt-4 border-t border-ink/10 pt-3 first:border-0 first:pt-0">
                <p className="font-display text-[0.6rem] font-bold tracking-[0.16em] text-ink/40">{f.label}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-ink/80">{Array.isArray(v) ? v.join(", ") : typeof v === "object" ? JSON.stringify(v) : String(v)}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-ink/45">
          Draft content is previewed here and never published publicly. Publish from the workflow bar when ready.
        </p>
      </Modal>

      <Modal open={showRevs} onClose={() => setShowRevs(false)}>
        <h3 className="font-display text-xl font-bold text-teal">Version History</h3>
        <div className="mt-4 space-y-2">
          {(revs || []).map((r) => (
            <div key={r._id} className="flex items-center justify-between rounded-xl border border-ink/10 bg-cream-soft/60 px-4 py-3" data-testid={`revision-${r.version}`}>
              <div>
                <p className="font-display text-sm font-bold text-teal">Version {r.version}</p>
                <p className="text-xs text-ink/50">{r.user} · {new Date(r.created_at).toLocaleString("en-IN")}</p>
              </div>
              <Btn size="sm" variant="ghost" onClick={() => restore(r.version)} testid={`restore-${r.version}`}>RESTORE</Btn>
            </div>
          ))}
          {revs && !revs.length && <p className="py-6 text-center text-sm text-ink/40">No revisions yet — they are created on every save.</p>}
          {!revs && <Loading />}
        </div>
      </Modal>

      <Confirm
        open={confirmDel}
        title={`Delete "${name}"?`}
        body="This cannot be undone."
        onClose={() => setConfirmDel(false)}
        onConfirm={del}
      />
    </div>
  );
};

export { REVISION_HELPERS };
