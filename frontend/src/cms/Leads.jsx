import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { Badge, Btn, Card, Field, Loading, Modal } from "./ui";
import { LEAD_STATUSES } from "./schema";
import { fmtDate } from "./generic";
import { toast } from "sonner";

const TYPES = [
  { key: "", label: "ALL" },
  { key: "product_enquiry", label: "PRODUCT ENQUIRIES" },
  { key: "sample", label: "SAMPLE REQUESTS" },
  { key: "contact", label: "CONTACT REQUESTS" },
];

export const Leads = () => {
  const [items, setItems] = useState(null);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [note, setNote] = useState("");

  const load = () => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    if (q) params.set("q", q);
    apiFetch(`/cms/leads?${params}`).then((d) => setItems(d.items)).catch((e) => toast.error(e.message));
  };
  useEffect(load, [type, status, q]);

  const update = async (id, patch) => {
    try {
      await apiFetch(`/cms/leads/${id}`, { method: "PUT", body: patch });
      toast.success("Lead updated");
      setOpen(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    const next = [...(open.notes || []), { text: note.trim(), by: "you", at: new Date().toISOString() }];
    await update(open._id, { notes: next });
  };

  if (!items) return <Loading />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-teal">Leads &amp; Enquiries</h1>
          <p className="mt-1 text-xs text-ink/50">{items.length} leads</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              className={`rounded-full px-4 py-2 font-display text-[0.62rem] font-bold tracking-[0.14em] transition-colors ${type === t.key ? "bg-teal text-cream" : "border border-ink/15 text-ink/55 hover:border-teal"}`}
            >
              {t.label}
            </button>
          ))}
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-teal" data-testid="lead-status-filter">
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" data-testid="lead-search" className="w-48 rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-teal" />
        </div>
      </div>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm" data-testid="leads-table">
          <thead>
            <tr className="border-b border-ink/10">
              {["NAME", "COMPANY", "TYPE", "INTEREST", "STATUS", "DATE"].map((h) => (
                <th key={h} className="px-4 py-3 font-display text-[0.62rem] font-bold tracking-[0.14em] text-ink/45">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l._id} onClick={() => setOpen(l)} className="cursor-pointer border-b border-ink/5 hover:bg-cream-soft/60" data-testid={`lead-row-${l._id}`}>
                <td className="px-4 py-3 font-semibold text-ink/80">{l.name}</td>
                <td className="px-4 py-3 text-ink/65">{l.company || "—"}</td>
                <td className="px-4 py-3"><Badge value={l.type === "sample" ? "Sample Requested" : l.type === "product_enquiry" ? "Qualified" : "New"} /></td>
                <td className="px-4 py-3 text-ink/65">{l.productInterest || l.product || l.application || "—"}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={l.status}
                    onChange={(e) => update(l._id, { status: e.target.value })}
                    data-testid={`lead-status-${l._id}`}
                    className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs outline-none focus:border-teal"
                  >
                    {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-ink/45">{fmtDate(l.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && <p className="py-12 text-center text-sm text-ink/40">No leads yet — website enquiries, product enquiries and sample requests land here automatically.</p>}
      </Card>

      <Modal open={!!open} onClose={() => setOpen(null)} wide>
        {open && (
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-teal">{open.name}</h3>
                <p className="mt-1 text-sm text-ink/50">{open.company || "—"} · {open.email}</p>
              </div>
              <Badge value={open.status} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["PHONE", open.phone], ["COUNTRY", open.country], ["INDUSTRY", open.industry],
                ["APPLICATION", open.application], ["PRODUCT INTEREST", open.productInterest || open.product || open.productId],
                ["EXPECTED VOLUME", open.expectedVolume || open.quantity], ["CURRENT PACKAGING", open.currentPackaging],
                ["BOTTLE VOLUME", open.bottleVolume], ["SOURCE", open.source],
                ["UTM", [open.utmSource, open.utmMedium, open.utmCampaign].filter(Boolean).join(" / ") || "—"],
              ].map(([k, v]) => v ? (
                <div key={k}>
                  <p className="font-display text-[0.6rem] font-bold tracking-[0.16em] text-ink/40">{k}</p>
                  <p className="mt-1 text-sm text-ink/75">{v}</p>
                </div>
              ) : null)}
            </div>

            {open.message && (
              <div className="mt-5 rounded-xl bg-cream-soft p-4">
                <p className="font-display text-[0.6rem] font-bold tracking-[0.16em] text-ink/40">MESSAGE</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{open.message}</p>
              </div>
            )}

            <div className="mt-6">
              <p className="font-display text-[0.6rem] font-bold tracking-[0.16em] text-ink/40">NOTES</p>
              <div className="mt-2 space-y-2">
                {(open.notes || []).map((n, i) => (
                  <div key={i} className="rounded-lg border border-ink/10 px-3 py-2 text-xs text-ink/65">
                    {n.text} <span className="text-ink/35">— {n.by} · {fmtDate(n.at)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note…" className="flex-1 rounded-xl border border-ink/15 px-3.5 py-2 text-sm outline-none focus:border-teal" data-testid="lead-note-input" />
                <Btn size="sm" onClick={addNote}>ADD NOTE</Btn>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <p className="w-full font-display text-[0.6rem] font-bold tracking-[0.16em] text-ink/40">MOVE TO STATUS</p>
              {LEAD_STATUSES.map((s) => (
                <Btn key={s} size="sm" variant={s === open.status ? "primary" : "ghost"} onClick={() => update(open._id, { status: s })} testid={`lead-set-${s.toLowerCase().replace(/\s+/g, "-")}`}>
                  {s}
                </Btn>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              {open.email && <a href={`mailto:${open.email}`} className="rounded-full border border-ink/15 px-5 py-2 text-[0.65rem] font-bold tracking-[0.12em] text-ink/70 hover:border-teal hover:text-teal">EMAIL REPLY</a>}
              {open.phone && <a href={`tel:${open.phone}`} className="rounded-full border border-ink/15 px-5 py-2 text-[0.65rem] font-bold tracking-[0.12em] text-ink/70 hover:border-teal hover:text-teal">CALL</a>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
