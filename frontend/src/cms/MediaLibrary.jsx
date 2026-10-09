import { useEffect, useState } from "react";
import { apiFetch, mediaUrl } from "./api";
import { Btn, Card, Field, Loading, Modal } from "./ui";
import { toast } from "sonner";

const CATEGORIES = ["Products", "Preforms", "Bottles", "Materials", "Manufacturing", "Science", "Applications", "Brand", "Marketing", "Documents"];

export const MediaLibrary = () => {
  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ title: "", alt: "", description: "", category: "Brand", tags: "" });
  const [file, setFile] = useState(null);

  const load = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    apiFetch(`/cms/media?${params}`).then((d) => setItems(d.items)).catch((e) => toast.error(e.message));
  };
  useEffect(load, [q, cat]);

  const upload = async () => {
    if (!file) return toast.error("Choose a file first");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await apiFetch("/cms/media/upload", { method: "POST", body: fd });
      toast.success("Uploaded");
      setFile(null);
      setForm({ title: "", alt: "", description: "", category: "Brand", tags: "" });
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  const saveItem = async () => {
    try {
      await apiFetch(`/cms/media/${editItem._id}`, {
        method: "PUT",
        body: { title: editItem.title, alt: editItem.alt, description: editItem.description, category: editItem.category, tags: editItem.tags },
      });
      toast.success("Asset updated");
      setEditItem(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const del = async (item) => {
    try {
      await apiFetch(`/cms/media/${item._id}`, { method: "DELETE" });
      toast.success("Asset deleted");
      setPreview(null);
      load();
    } catch (e) {
      if (e.usage) {
        setPreview(null);
        toast.error(`In use by: ${e.usage.map((u) => `${u.name} (${u.collection})`).join(", ")} — remove the reference first.`);
      } else toast.error(e.message);
    }
  };

  if (!items) return <Loading />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-teal">Media Library</h1>
          <p className="mt-1 text-xs text-ink/50">{items.length} assets · JPG, PNG, WebP, AVIF, SVG, MP4, PDF</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search media…" data-testid="media-search" className="w-52 rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-teal" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-teal">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <Card className="mt-6 p-6" data-testid="media-upload">
        <p className="font-display text-xs font-bold tracking-[0.18em] text-ink/45">UPLOAD NEW ASSET</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-5">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="rounded-xl border border-dashed border-ink/20 px-3 py-2 text-xs sm:col-span-2" data-testid="media-file-input" />
          <Field def={{ k: "title", label: "TITLE", type: "text" }} value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field def={{ k: "alt", label: "ALT TEXT", type: "text" }} value={form.alt} onChange={(v) => setForm({ ...form, alt: v })} />
          <div className="flex items-end gap-2">
            <Field def={{ k: "category", label: "CATEGORY", type: "select", options: CATEGORIES }} value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
            <Btn onClick={upload} disabled={uploading} testid="media-upload-button">{uploading ? "…" : "UPLOAD"}</Btn>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6" data-testid="media-grid">
        {items.map((a) => (
          <button
            key={a._id}
            onClick={() => setPreview(a)}
            onDoubleClick={() => setEditItem({ ...a, tags: (a.tags || []).join(", ") })}
            data-testid={`media-asset-${a._id}`}
            className="group overflow-hidden rounded-2xl border border-ink/10 bg-white text-left transition-colors hover:border-teal/40"
          >
            {a.mime?.startsWith("image/") ? (
              <img src={mediaUrl(a._id)} alt={a.alt || a.title} className="h-28 w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-28 items-center justify-center bg-cream-soft font-display text-xs font-bold text-ink/50">{a.mime?.split("/")[1]?.toUpperCase()}</div>
            )}
            <div className="p-2.5">
              <p className="truncate text-xs font-semibold text-ink/75">{a.title}</p>
              <p className="mt-0.5 text-[0.62rem] text-ink/40">{a.category} · {Math.round((a.size || 0) / 1024)} KB</p>
            </div>
          </button>
        ))}
      </div>
      {!items.length && <p className="mt-10 text-center text-sm text-ink/40">No media yet — upload your first asset above.</p>}

      <Modal open={!!preview} onClose={() => setPreview(null)}>
        {preview && (
          <div>
            {preview.mime?.startsWith("image/") ? (
              <img src={mediaUrl(preview._id)} alt={preview.alt || preview.title} className="max-h-96 w-full rounded-xl object-contain" />
            ) : preview.mime === "application/pdf" ? (
              <object data={mediaUrl(preview._id)} type="application/pdf" className="h-96 w-full rounded-xl border border-ink/10">
                <a href={mediaUrl(preview._id)} target="_blank" rel="noreferrer">Open PDF ↗</a>
              </object>
            ) : preview.mime === "video/mp4" ? (
              <video src={mediaUrl(preview._id)} controls className="w-full rounded-xl" />
            ) : null}
            <h3 className="mt-4 font-display text-xl font-bold text-teal">{preview.title}</h3>
            <p className="mt-1 text-xs text-ink/45">
              {preview.filename} · {preview.width ? `${preview.width}×${preview.height}px · ` : ""}{Math.round((preview.size || 0) / 1024)} KB · uploaded by {preview.uploaded_by || "—"}
            </p>
            {preview.description && <p className="mt-3 text-sm text-ink/65">{preview.description}</p>}
            <div className="mt-5 flex gap-2">
              <Btn size="sm" onClick={() => setEditItem({ ...preview, tags: (preview.tags || []).join(", ") })}>EDIT DETAILS</Btn>
              <Btn size="sm" variant="ghost" onClick={() => { navigator.clipboard?.writeText(mediaUrl(preview._id)); toast.success("URL copied"); }}>COPY URL</Btn>
              <Btn size="sm" variant="danger" onClick={() => del(preview)} testid="media-delete-button">DELETE</Btn>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!editItem} onClose={() => setEditItem(null)}>
        {editItem && (
          <div>
            <h3 className="font-display text-xl font-bold text-teal">Edit asset</h3>
            <div className="mt-5 grid gap-4">
              <Field def={{ k: "title", label: "TITLE", type: "text" }} value={editItem.title} onChange={(v) => setEditItem({ ...editItem, title: v })} />
              <Field def={{ k: "alt", label: "ALT TEXT", type: "text" }} value={editItem.alt} onChange={(v) => setEditItem({ ...editItem, alt: v })} />
              <Field def={{ k: "description", label: "DESCRIPTION", type: "textarea" }} value={editItem.description} onChange={(v) => setEditItem({ ...editItem, description: v })} />
              <Field def={{ k: "category", label: "CATEGORY", type: "select", options: CATEGORIES }} value={editItem.category} onChange={(v) => setEditItem({ ...editItem, category: v })} />
              <Field def={{ k: "tags", label: "TAGS", type: "text" }} value={editItem.tags} onChange={(v) => setEditItem({ ...editItem, tags: v })} />
            </div>
            <div className="mt-6 flex gap-3">
              <Btn onClick={saveItem}>SAVE</Btn>
              <Btn variant="ghost" onClick={() => setEditItem(null)}>CANCEL</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
