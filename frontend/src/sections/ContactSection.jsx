import { useState } from "react";
import { toast } from "sonner";
import { CONTACT } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { Eyebrow, FadeUp } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELDS = [
  { id: "name", label: "NAME", type: "text", required: true, half: true },
  { id: "company", label: "COMPANY", type: "text", half: true },
  { id: "email", label: "EMAIL", type: "email", required: true, half: true },
  { id: "phone", label: "PHONE", type: "tel", half: true },
  { id: "industry", label: "INDUSTRY", type: "text", half: true },
  { id: "currentPackaging", label: "CURRENT PACKAGING", type: "text", half: true },
  { id: "requiredVolume", label: "REQUIRED BOTTLE VOLUME", type: "text", half: true },
  { id: "estimatedQuantity", label: "ESTIMATED QUANTITY", type: "text", half: true },
];

export const ContactSection = () => {
  const { contact } = useContent();
  const CONTACT = contact;
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);

  const set = (id) => (e) => setForm((f) => ({ ...f, [id]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await fetch(`${API}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(typeof d.detail === "string" ? d.detail : "Failed");
      });
      toast.success("Enquiry received. We'll be in touch shortly.");
      setForm({});
    } catch (err) {
      toast.error("Something went wrong. Please email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-cream py-24 lg:py-36" data-testid="contact-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>CONTACT</Eyebrow>
            <FadeUp delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-5xl">
                START A
                <br />
                CONVERSATION.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} className="mt-10 space-y-8">
              <div>
                <p className="eyebrow text-leaf">PLANTSTIKS</p>
                <div className="mt-3 text-sm leading-relaxed text-ink/70">
                  {CONTACT.address.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow text-leaf">PHONE</p>
                <div className="mt-3 space-y-1">
                  {CONTACT.phonesRaw.map((p, i) => (
                    <a key={p} href={`tel:+91${p}`} className="block text-sm text-ink/70 transition-colors hover:text-teal" data-testid={`contact-phone-${i}`}>
                      +91 {CONTACT.phones[i]}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow text-leaf">EMAIL</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-3 block text-sm text-ink/70 transition-colors hover:text-teal" data-testid="contact-email">
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-leaf">WEBSITE</p>
                <p className="mt-3 text-sm text-ink/70">{CONTACT.website}</p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <form
                onSubmit={submit}
                data-testid="enquiry-form"
                className="rounded-[28px] border border-ink/10 bg-cream-soft p-8 sm:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <label key={f.id} className="block">
                      <span className="font-display text-[0.6rem] font-bold tracking-[0.22em] text-ink/50">
                        {f.label} {f.required && <span className="text-peach">*</span>}
                      </span>
                      <input
                        type={f.type}
                        required={f.required}
                        value={form[f.id] || ""}
                        onChange={set(f.id)}
                        data-testid={`enquiry-${f.id.toLowerCase()}-input`}
                        className="mt-2 w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal"
                      />
                    </label>
                  ))}
                  <label className="block sm:col-span-2">
                    <span className="font-display text-[0.6rem] font-bold tracking-[0.22em] text-ink/50">MESSAGE</span>
                    <textarea
                      rows="4"
                      value={form.message || ""}
                      onChange={set("message")}
                      data-testid="enquiry-message-input"
                      className="mt-2 w-full resize-none rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  data-testid="enquiry-submit-button"
                  className="mt-8 w-full rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-all duration-300 hover:bg-leaf disabled:opacity-50 sm:w-auto"
                >
                  {sending ? "SENDING…" : "START A CONVERSATION"}
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
