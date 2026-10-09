import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INDUSTRIES } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { Eyebrow, FadeUp } from "../components/Reveal";

export const Industries = () => {
  const { industries } = useContent();
  const INDUSTRIES = industries;
  const [active, setActive] = useState(0);
  const industry = INDUSTRIES[active];

  return (
    <section className="bg-cream-soft py-24 lg:py-36" data-testid="industries-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <Eyebrow>INDUSTRY SELECTOR</Eyebrow>
          <FadeUp delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-teal sm:text-6xl">
              ONE MATERIAL.
              <br />
              MANY SHELVES.
            </h2>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-5" data-testid="industry-selector">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.name}
                onClick={() => setActive(i)}
                data-testid={`industry-option-${ind.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={`group flex w-full items-center justify-between rounded-2xl border px-6 py-4 text-left transition-all duration-300 ${
                  active === i
                    ? "border-teal bg-teal text-cream"
                    : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
                }`}
              >
                <span className="font-display text-sm font-bold tracking-[0.18em]">{ind.name}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`transition-all duration-300 ${active === i ? "rotate-0 text-peach" : "-rotate-45 text-ink/30"}`}>
                  <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ))}
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] lg:col-span-7" data-testid="industry-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img src={industry.img} alt={`${industry.name} packaging environment`} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${industry.tint}f0 10%, transparent 60%)` }} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${industry.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="eyebrow text-peach">{industry.name}</p>
                  <p className="mt-3 max-w-md font-display text-2xl font-bold leading-snug text-cream sm:text-3xl">
                    {industry.line}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
