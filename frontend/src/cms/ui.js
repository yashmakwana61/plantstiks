import { useEffect, useState } from "react";
import { apiFetch, mediaUrl } from "./api";

export const Btn = ({ children, onClick, variant = "primary", size = "md", disabled, testid, type = "button" }) => {
  const styles = {
    primary: "bg-teal text-cream hover:bg-leaf",
    ghost: "border border-ink/15 text-ink/70 hover:border-teal hover:text-teal",
    danger: "border border-red-200 text-red-600 hover:bg-red-50",
    peach: "bg-peach text-teal-900 hover:opacity-90",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={testid}
      className={`rounded-full font-display font-bold tracking-[0.08em] transition-all duration-200 disabled:opacity-40 ${styles[variant]} ${size === "sm" ? "px-4 py-2 text-[0.65rem]" : "px-6 py-2.5 text-xs"}`}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = "", ...rest }) => (
  <div className={`rounded-2xl border border-ink/10 bg-white ${className}`} {...rest}>{children}</div>
);

const STATUS_COLORS = {
  published: "bg-leaf/10 text-leaf", approved: "bg-sage/25 text-teal",
  in_review: "bg-amber-100 text-amber-700", draft: "bg-ink/5 text-ink/50",
  archived: "bg-ink/5 text-ink/40", New: "bg-leaf/10 text-leaf",
  Contacted: "bg-amber-100 text-amber-700", Qualified: "bg-teal/10 text-teal",
  SampleRequested: "bg-peach/20 text-teal-900", Testing: "bg-sage/25 text-teal",
  Quotation: "bg-teal/10 text-teal", Won: "bg-leaf/15 text-leaf", Lost: "bg-red-100 text-red-500",
};

export const Badge = ({ value }) => {
  const key = String(value || "").replace(/\s+/g, "");
  return (
    <span className={`inline-block rounded-full px-3 py-1 font-display text-[0.6rem] font-bold tracking-[0.12em] ${STATUS_COLORS[value] || STATUS_COLORS[key] || "bg-ink/5 text-ink/60"}`}>
      {String(value || "—").replace("_", " ").toUpperCase()}
    </span>
  );
};

export const Modal = ({ open, onClose, children, wide = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-teal-950/40 p-4" onClick={onClose} data-testid="cms-modal-overlay">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[88vh] w-full overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl ${wide ? "max-w-4xl" : "max-w-2xl"}`}
        data-lenis-prevent
        data-testid="cms-modal"
      >
        {children}
      </div>
    </div>
  );
};

export const Loading = () => (
  <div className="flex h-40 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal/20 border-t-teal" />
  </div>
);

export const Empty = ({ title, hint }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white py-16 text-center">
    <p className="font-display text-lg font-bold text-teal">{title}</p>
    {hint && <p className="mt-2 max-w-sm text-sm text-ink/50">{hint}</p>}
  </div>
);

const getInputClass = () =>
  "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal";

export const Field = ({ def, value, onChange }) => {
  const { type = "text", label, options, placeholder, fields, tip } = def;
  const cls = "block";
  return (
    <label className={`${cls} ${type === "textarea" || type === "list" ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block font-display text-[0.62rem] font-bold tracking-[0.16em] text-ink/50">
        {label} {tip && <span className="ml-1 font-body text-[0.65rem] font-normal normal-case tracking-normal text-peach">({tip})</span>}
      </span>
      {type === "textarea" && (
        <textarea rows={def.rows || 3} className={getInputClass()} placeholder={placeholder} value={value || ""} onChange={(e) => onChange(e.target.value)} data-testid={`field-${def.k.replace(/\./g, "-")}`} />
      )}
      {type === "select" && (
        <select className={getInputClass()} value={value || ""} onChange={(e) => onChange(e.target.value)} data-testid={`field-${def.k.replace(/\./g, "-")}`}>
          <option value="">— Select —</option>
          {options.map((o) => (
            <option key={o} value={o}>{String(o).replace(/_/g, " ")}</option>
          ))}
        </select>
      )}
      {type === "bool" && (
        <button
          type="button"
          onClick={() => onChange(!value)}
          data-testid={`field-${def.k.replace(/\./g, "-")}`}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${value ? "bg-leaf" : "bg-ink/15"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${value ? "left-[1.375rem]" : "left-0.5"}`} />
        </button>
      )}
      {(type === "text" || type === "date" || type === "color") && (
        <input
          type={type === "date" ? "date" : type === "color" ? "color" : "text"}
          className={getInputClass()}
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          data-testid={`field-${def.k.replace(/\./g, "-")}`}
        />
      )}
      {type === "number" && (
        <input type="number" step="any" className={getInputClass()} placeholder={placeholder} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} data-testid={`field-${def.k.replace(/\./g, "-")}`} />
      )}
      {type === "tags" && <TagsInput value={value} onChange={onChange} testid={`field-${def.k.replace(/\./g, "-")}`} />}
      {type === "media" && <MediaPicker value={value} onChange={onChange} single />}
      {type === "medialist" && <MediaPicker value={value} onChange={onChange} />}
      {type === "list" && <ListInput value={value} fields={fields} onChange={onChange} />}
      {tip && type !== "bool" && <span className="mt-1 block text-[0.7rem] text-ink/40">{tip}</span>}
    </label>
  );
};

export const TagsInput = ({ value = [], onChange, testid }) => {
  const [draft, setDraft] = useState("");
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {(value || []).map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-1.5 rounded-full bg-cream-soft px-3 py-1 text-xs text-ink/70">
            {t}
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-ink/40 hover:text-red-500">×</button>
          </span>
        ))}
      </div>
      <input
        className={getInputClass()}
        placeholder="Type and press Enter"
        value={draft}
        data-testid={testid}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && draft.trim()) {
            e.preventDefault();
            onChange([...(value || []), draft.trim()]);
            setDraft("");
          }
        }}
      />
    </div>
  );
};

export const MediaPicker = ({ value, onChange, single = false }) => {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    if (open) apiFetch("/cms/media").then((d) => setAssets(d.items)).catch(() => {});
  }, [open]);
  const vals = single ? (value ? [value] : []) : value || [];
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {vals.map((v, i) => (
          <span key={`${v}-${i}`} className="flex items-center gap-2 rounded-lg border border-ink/10 bg-cream-soft px-2 py-1">
            <img src={mediaUrl(v)} alt="" className="h-8 w-8 rounded object-cover" />
            <button type="button" className="text-xs text-ink/40 hover:text-red-500" onClick={() => onChange(single ? null : value.filter((x) => x !== v))}>×</button>
          </span>
        ))}
        <Btn size="sm" variant="ghost" onClick={() => setOpen(true)}>{single && vals.length ? "REPLACE" : "CHOOSE"}</Btn>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} wide>
        <h3 className="font-display text-lg font-bold text-teal">Media Library</h3>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {assets.map((a) => (
            <button
              key={a._id}
              type="button"
              data-testid={`media-pick-${a._id}`}
              onClick={() => {
                onChange(single ? a._id : [...(value || []), a._id]);
                setOpen(false);
              }}
              className="group overflow-hidden rounded-xl border border-ink/10 hover:border-teal"
            >
              {a.mime?.startsWith("image/") ? (
                <img src={mediaUrl(a._id)} alt={a.alt || a.title} className="h-20 w-full object-cover" />
              ) : (
                <div className="flex h-20 items-center justify-center bg-cream-soft font-display text-[0.6rem] font-bold text-ink/50">{a.mime?.split("/")[1]?.toUpperCase()}</div>
              )}
              <p className="truncate px-2 py-1 text-[0.65rem] text-ink/50">{a.title}</p>
            </button>
          ))}
          {!assets.length && <p className="col-span-5 py-8 text-center text-sm text-ink/40">No media yet — upload some first.</p>}
        </div>
      </Modal>
    </div>
  );
};

const SimpleField = ({ def, value, onChange }) => {
  const { type = "text", label, options, placeholder } = def;
  const tid = `field-${String(def.k).replace(/\./g, "-")}`;
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[0.62rem] font-bold tracking-[0.16em] text-ink/50">{label}</span>
      {type === "textarea" && (
        <textarea rows={2} className={getInputClass()} placeholder={placeholder} value={value || ""} onChange={(e) => onChange(e.target.value)} data-testid={tid} />
      )}
      {type === "select" && (
        <select className={getInputClass()} value={value || ""} onChange={(e) => onChange(e.target.value)} data-testid={tid}>
          <option value="">— Select —</option>
          {(options || []).map((o) => (
            <option key={o} value={o}>{String(o).replace(/_/g, " ")}</option>
          ))}
        </select>
      )}
      {type === "bool" && (
        <button
          type="button"
          onClick={() => onChange(!value)}
          data-testid={tid}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${value ? "bg-leaf" : "bg-ink/15"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${value ? "left-[1.375rem]" : "left-0.5"}`} />
        </button>
      )}
      {(type === "text" || type === "number" || type === "date") && (
        <input
          type={type === "text" ? "text" : type}
          className={getInputClass()}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)}
          data-testid={tid}
        />
      )}
    </label>
  );
};

const RowCard = ({ row, i, rows, fields, onChange, Nest }) => {
  const rowObj = typeof row === "object" && row !== null ? row : {};
  const set = (key, v) => {
    const next = [...rows];
    next[i] = { ...rowObj, [key]: v };
    onChange(next);
  };
  return (
    <div className="rounded-xl border border-ink/10 bg-cream-soft/60 p-4">
      <div className="flex items-center justify-between">
        <span className="font-display text-[0.6rem] font-bold tracking-[0.16em] text-ink/40">ITEM {i + 1}</span>
        <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="text-xs text-red-500">Remove</button>
      </div>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {fields.map((f) => {
          const key = f.k.split(".").pop();
          if (f.type === "list") {
            if (!Nest) return null;
            return (
              <div key={f.k} className="sm:col-span-2">
                <Nest value={rowObj[key] || []} fields={f.fields || []} onChange={(v) => set(key, v)} />
              </div>
            );
          }
          return (
            <SimpleField
              key={f.k}
              def={{ ...f, type: f.type || "text" }}
              value={rowObj[key]}
              onChange={(v) => set(key, v)}
            />
          );
        })}
      </div>
    </div>
  );
};

const SubListInput = ({ value = [], fields, onChange }) => (
  <div className="space-y-3 border-l-2 border-ink/10 pl-3">
    {(value || []).map((row, i) => (
      <RowCard key={i} row={row} i={i} rows={value} fields={fields} onChange={onChange} />
    ))}
    <Btn size="sm" variant="ghost" onClick={() => onChange([...(value || []), {}])}>+ ADD ITEM</Btn>
  </div>
);

export const ListInput = ({ value = [], fields, onChange }) => (
  <div className="space-y-3">
    {(value || []).map((row, i) => (
      <RowCard key={i} row={row} i={i} rows={value} fields={fields} onChange={onChange} Nest={SubListInput} />
    ))}
    <Btn size="sm" variant="ghost" onClick={() => onChange([...(value || []), {}])}>+ ADD ITEM</Btn>
  </div>
);

export const Confirm = ({ open, title, body, onConfirm, onClose, confirmLabel = "DELETE" }) => (
  <Modal open={open} onClose={onClose}>
    <h3 className="font-display text-xl font-bold text-teal">{title}</h3>
    <p className="mt-3 text-sm text-ink/60">{body}</p>
    <div className="mt-6 flex gap-3">
      <Btn variant="danger" onClick={onConfirm} testid="confirm-action-button">{confirmLabel}</Btn>
      <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
    </div>
  </Modal>
);
