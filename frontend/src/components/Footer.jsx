import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { CONTACT, NAV } from "../lib/data";
import { useContent } from "../lib/cmsContent";

export const Footer = () => {
  const { footer, contact } = useContent();
  const CONTACT = contact;
  const columns = footer?.columns?.length
    ? footer.columns
    : NAV.slice(0, 3).map((col) => ({ title: col.label, links: col.items.slice(0, 5) }));
  const legal =
    footer?.legal?.length
      ? footer.legal
      : [
          { label: "Privacy Policy", to: "/privacy" },
          { label: "Terms", to: "/terms" },
          { label: "Cookie Policy", to: "/cookies" },
        ];

  return (
    <footer className="relative border-t border-ink/10 bg-cream text-ink" data-testid="site-footer">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo dark />
            <p className="mt-6 max-w-xs font-display text-2xl font-semibold leading-snug text-teal">
              {footer?.description || "Packaging, reinvented by plants. Advanced materials. Better packaging. A cleaner future."}
            </p>
            <div className="mt-8 space-y-1 text-sm text-ink/60">
              {CONTACT.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-leaf">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((s) => (
                    <li key={s.label}>
                      {s.to?.startsWith("http") ? (
                        <a href={s.to} target="_blank" rel="noreferrer" className="text-sm text-ink/55 transition-colors hover:text-teal">{s.label}</a>
                      ) : (
                        <Link to={s.to} className="text-sm text-ink/55 transition-colors hover:text-teal" data-testid={`footer-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{s.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-leaf">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-ink/65">
              {CONTACT.phonesRaw.map((p, i) => (
                <li key={p}>
                  <a href={`tel:+91${p}`} className="transition-colors hover:text-teal" data-testid={`footer-phone-${i}`}>
                    +91 {CONTACT.phones[i] || p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-teal" data-testid="footer-email">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.website}</li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp || "919313938006"}?text=Hi%20Plantstiks%2C%20I%27d%20like%20to%20discuss%20plant-based%20packaging.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#1D8F4E] transition-colors hover:text-teal"
                  data-testid="footer-whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.4 0 .6-.3.6-.7.9-.5 1.2.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4 0 .1 0 .8-.2 1.4Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Plantstiks. All rights reserved.</p>
          <div className="flex gap-6">
            {legal.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-teal" data-testid={`footer-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
