import { useEffect, useState } from "react";
import { apiFetch, mediaUrl } from "./api";
import { Btn, Card, Field, Loading, Modal } from "./ui";
import { HERO_CONTENT_FIELDS } from "./schema";
import { toast } from "sonner";

export const HomepageEditor = () => {
  const [sections, setSections] = useState(null);
  const [orig, setOrig] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/cms-single/home_sections").then((d) => {
      const s = [...(d.sections || [])].sort((a, b) => a.order - b.order);
      setSections(s);
      setOrig(d);
    }).catch((e) => toast.error(e.message));
  }, []);

  if (!sections) return <Loading />;

  const save = async (nextSections) => {
    setSaving(true);
    try {
      await apiFetch("/cms-single/home_sections", { method: "PUT", body: { ...orig, sections: nextSections } });
      toast.success("Homepage saved — version stored");
      setOrig({ ...orig, sections: nextSections });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const move = (i, dir) => {
    const next = [...sections];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    const renumbered = next.map((s, k) => ({ ...s, order: k + 1 }));
    setSections(renumbered);
    save(renumbered);
  };

  const toggle = (i) => {
    const next = sections.map((s, k) => (k === i ? { ...s, visible: !s.visible } : s));
    setSections(next);
    save(next);
  };

  const saveContent = (key, content) => {
    const next = sections.map((s) => (s.key === key ? { ...s, content } : s));
    setSections(next);
    setEditing(null);
    save(next);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-teal">Homepage</h1>
          <p className="mt-1 text-xs text-ink/50">Reorder, hide or edit sections. The public design and animations stay untouched.</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          data-testid="homepage-preview-button"
          className="rounded-full border border-ink/15 px-5 py-2 text-[0.65rem] font-bold tracking-[0.12em] text-ink/70 hover:border-teal hover:text-teal"
        >
          PREVIEW LIVE SITE ↗
        </a>
      </div>

      <Card className="mt-6 divide-y divide-ink/5" data-testid="homepage-sections">
        {sections.map((s, i) => (
          <div key={s.key} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4" data-testid={`home-section-${s.key}`}>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="text-xs text-ink/35 hover:text-teal disabled:opacity-20">▲</button>
                <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} className="text-xs text-ink/35 hover:text-teal disabled:opacity-20">▼</button>
              </div>
              <div>
                <p className={`font-display text-sm font-bold ${s.visible ? "text-teal" : "text-ink/35 line-through"}`}>{s.label}</p>
                <p className="text-[0.65rem] text-ink/40">{s.key}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 font-display text-[0.58rem] font-bold tracking-[0.14em] ${s.visible ? "bg-leaf/10 text-leaf" : "bg-ink/5 text-ink/40"}`}>
                {s.visible ? "VISIBLE" : "HIDDEN"}
              </span>
              <Btn size="sm" variant="ghost" onClick={() => toggle(i)} testid={`toggle-${s.key}`}>{s.visible ? "HIDE" : "SHOW"}</Btn>
              {["hero", "marquee"].includes(s.key) && (
                <Btn size="sm" onClick={() => setEditing(s)} testid={`edit-${s.key}`}>EDIT CONTENT</Btn>
              )}
            </div>
          </div>
        ))}
      </Card>

      {editing && (
        <EditSectionModal
          section={editing}
          onClose={() => setEditing(null)}
          onSave={(content) => saveContent(editing.key, content)}
        />
      )}
    </div>
  );
};

const EditSectionModal = ({ section, onClose, onSave }) => {
  const isHero = section.key === "hero";
  const [content, setContent] = useState(section.content || {});
  const fields = isHero
    ? HERO_CONTENT_FIELDS
    : [{ k: "items", label: "MARQUEE ITEMS", type: "tags" }];

  const getPath = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  const setPath = (obj, path, val) => {
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

  return (
    <Modal open onClose={onClose} wide>
      <h3 className="font-display text-xl font-bold text-teal">Edit — {section.label}</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <Field key={f.k} def={f} value={getPath(content, f.k)} onChange={(v) => setContent((c) => setPath(c, f.k, v))} />
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Btn onClick={() => onSave(content)} testid="save-section-button">SAVE SECTION</Btn>
        <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
      </div>
    </Modal>
  );
};
