import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMG } from "../lib/images";
import { PREFORMS } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { FadeUp, Eyebrow } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

export const PreformLab = ({ compact = false }) => {
  const { preforms } = useContent();
  const PREFORMS = preforms;
  const [active, setActive] = useState(null);
  const preform = PREFORMS.find((p) => p.id === active) || PREFORMS[1] || PREFORMS[0];

  return (
    <section className="relative bg-white py-24 lg:py-36" data-testid="preform-lab-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>THE PREFORM FAMILY</Eyebrow>
            <FadeUp delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
                FROM PREFORM
                <br />
                TO POSSIBILITY.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} className="mt-6 max-w-md text-ink/60">
              Every Plantstiks bottle starts as a preform — engineered in three
              weights to cover ~150ml to 2L applications. Select one to see what it can become.
            </FadeUp>

            <div className="mt-10 flex gap-3" data-testid="preform-selector">
              {PREFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  data-testid={`preform-select-${p.id}`}
                  className={`relative rounded-2xl px-6 py-4 font-display text-lg font-bold transition-all duration-400 ${
                    active === p.id
                      ? "bg-teal text-cream"
                      : "border border-ink/15 text-ink/60 hover:border-teal hover:text-teal"
                  }`}
                >
                  {p.weight}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[32px] border border-ink/10 bg-cream-soft shadow-lg shadow-teal/5">
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="relative flex items-center justify-center bg-gradient-to-b from-cream-deep/70 to-cream-soft p-10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={preform.id}
                      src={IMG.preform}
                      alt={`Plantstiks ${preform.weight} preform`}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-80 w-auto rounded-2xl object-contain"
                      data-testid="preform-visual"
                    />
                  </AnimatePresence>
                  <motion.div
                    key={`ring-${preform.id}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="absolute inset-6 rounded-[24px] border border-dashed border-ink/15"
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`detail-${preform.id}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 sm:p-10"
                    data-testid="preform-details"
                  >
                    <p className="eyebrow text-peach">{preform.tag}</p>
                    <p className="mt-4 font-display text-5xl font-bold text-teal">{preform.range}</p>
                    <p className="mt-2 text-sm tracking-wide text-leaf">VOLUME RANGE</p>

                    <div className="mt-8 border-t border-ink/10 pt-6">
                      <p className="eyebrow text-leaf">IDEAL FOR</p>
                      <ul className="mt-3 space-y-2">
                        {preform.apps.map((a) => (
                          <li key={a} className="flex items-center gap-3 text-ink/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-ink/55">{preform.note}</p>

                    {!compact && (
                      <MagneticButton to="/contact" className="mt-8" testid="preform-cta">
                        DISCUSS YOUR PREFORM
                      </MagneticButton>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
