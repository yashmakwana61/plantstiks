import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DOCS } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { FadeUp, Eyebrow } from "../components/Reveal";
import { Link } from "react-router-dom";

const DocModal = ({ doc, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[70] flex items-center justify-center bg-teal-950/80 p-4 backdrop-blur-sm"
    onClick={onClose}
    data-testid="doc-modal-overlay"
  >
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-cream p-8 sm:p-12"
      data-lenis-prevent
      data-testid="doc-modal"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow text-leaf">{doc.category}</p>
          <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-teal sm:text-3xl">{doc.title}</h3>
        </div>
        <button
          onClick={onClose}
          data-testid="doc-modal-close"
          aria-label="Close document"
          className="rounded-full border border-ink/15 p-3 text-ink/60 transition-colors hover:border-teal hover:text-teal"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-cream-soft p-6">
        <p className="font-display text-[0.62rem] font-bold tracking-[0.24em] text-ink/40">WHAT THE DOCUMENT STATES</p>
        <p className="mt-3 leading-relaxed text-ink/80">{doc.summary}</p>
        <ul className="mt-5 space-y-2">
          {doc.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-sm text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink/45">
        We publish only what our documents state. Full reports are shared contextually
        with serious enquiries — nothing on this page converts “tested” into “certified”.
      </p>

      <Link
        to="/contact"
        data-testid="doc-request-full"
        className="mt-6 inline-block rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
      >
        REQUEST FULL DOCUMENT
      </Link>
    </motion.div>
  </motion.div>
);

export const Science = () => {
  const { docs } = useContent();
  const DOCS = docs;
  const [open, setOpen] = useState(null);

  return (
    <section className="relative bg-white py-24 lg:py-36" data-testid="science-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>SCIENCE &amp; VALIDATION</Eyebrow>
            <FadeUp delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
                BUILT ON MATERIAL SCIENCE.
                <br />
                BACKED BY TESTING.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="max-w-sm text-sm leading-relaxed text-ink/60">
            Material identification. Migration testing. Compliance results.
            Open a document to see exactly what it says — and what it doesn’t.
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="document-library">
          {DOCS.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => setOpen(d)}
              data-testid={`doc-card-${d.id}`}
              className="group rounded-[24px] border border-ink/10 bg-cream-soft p-8 text-left shadow-sm shadow-teal/5 transition-colors duration-300 hover:border-teal/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-leaf/40 px-3 py-1 font-display text-[0.58rem] font-bold tracking-[0.22em] text-leaf">
                  {d.category}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-teal">
                  <path d="M2 14L14 2M14 2H5M14 2v9" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold leading-snug text-teal">{d.title}</h3>
              <p className="mt-3 text-sm text-ink/45">{d.lab}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <DocModal doc={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
};
