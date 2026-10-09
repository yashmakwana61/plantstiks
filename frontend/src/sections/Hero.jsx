import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../lib/images";
import { MaskLines, FadeUp } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import { ParticleField } from "../components/ParticleField";
import { VideoBand } from "../components/VideoBand";

export const Hero = ({ cmsHero } = {}) => {
  const c = cmsHero || {};
  const LINES = c.headline_lines?.length ? c.headline_lines : ["PACKAGING,", "REINVENTED", "BY PLANTS."];
  const CTAS = [
    c.primary_cta?.label ? c.primary_cta : { label: "EXPLORE OUR SOLUTIONS", to: "/products" },
    c.secondary_cta?.label ? c.secondary_cta : { label: "REQUEST A SAMPLE", to: "/contact" },
    c.tertiary_cta?.label ? c.tertiary_cta : { label: "BECOME A MANUFACTURING PARTNER", to: "/manufacturing-partners" },
  ];
  const TRUST_LINE = c.trust_line?.length ? c.trust_line : ["MADE FOR INDIA", "ENGINEERED FOR THE WORLD"];
  const CHIPS = [
    { pos: "-left-10 top-16", ...(c.chip_1?.label ? c.chip_1 : { label: "MATERIALS", value: "PLA • PHA • BLENDS" }) },
    { pos: "-right-6 bottom-20", ...(c.chip_2?.label ? c.chip_2 : { label: "MODEL", value: "MATERIAL + NETWORK" }) },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotImg = useTransform(scrollYProgress, [0, 1], [-4, 10]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream grain" data-testid="hero-section">
      <div className="absolute -top-32 left-[10%] h-[560px] w-[560px] rounded-full bg-leaf/10 blur-[160px]" />
      <div className="absolute bottom-[-10%] right-[5%] h-[440px] w-[440px] rounded-full bg-peach/15 blur-[140px]" />
      <ParticleField density={64} color="11,43,40" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-12 lg:px-12 lg:pt-24">
        <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
          <FadeUp delay={0.1} className="eyebrow flex items-center gap-3 text-leaf">
            <span className="inline-block h-px w-10 bg-leaf/60" />
            {c.eyebrow || "ADVANCED MATERIALS • PLANT-BASED PACKAGING"}
          </FadeUp>

          <MaskLines
            delay={0.35}
            className="mt-8 font-display font-bold leading-[0.98] text-teal text-[clamp(2.2rem,4.5vw,3.75rem)]"
            lines={LINES}
          />

          {c.tagline !== null && (
            <FadeUp delay={0.85} className="mt-6 font-display text-lg font-semibold text-peach sm:text-xl">
              {c.tagline || "Advanced Materials. Better Packaging. A Cleaner Future."}
            </FadeUp>
          )}

          {c.description !== null && (
            <FadeUp delay={0.95} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink/65">
              {c.description ||
                "Plantstiks is an advanced material and packaging technology company developing high-performance, plant-based packaging solutions — from compostable bottles, preforms and caps to containers, jars, trays, cups, lids, labels, films and custom packaging. Our platform works with PLA, PHA and proprietary material blends, engineered for real-world applications."}
            </FadeUp>
          )}

          <FadeUp delay={1.05} className="mt-10 flex flex-wrap items-center gap-4">
            {CTAS.map((cta, i) => (
              <MagneticButton key={cta.label} to={cta.to} variant={i === 0 ? "solid" : "outline"} testid={`hero-cta-${i}`}>
                {cta.label}
              </MagneticButton>
            ))}
          </FadeUp>

          <FadeUp delay={1.2} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
            {TRUST_LINE.map((t, i) => (
              <span key={t} className="flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.28em] text-leaf">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-peach" />}
                {t}
              </span>
            ))}
          </FadeUp>
        </motion.div>

        <motion.div style={{ y: yImg }} className="relative lg:col-span-5" data-testid="hero-visual">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{ rotate: rotImg }}
            className="relative mx-auto max-w-[420px]"
          >
            <div className="absolute -inset-8 rounded-[48px] border border-ink/10" />
            <div className="overflow-hidden rounded-[36px] border border-ink/10 shadow-2xl shadow-teal/10">
              <img
                src={c.image_media_id ? `${process.env.REACT_APP_BACKEND_URL}/api/media/${c.image_media_id}` : IMG.heroBottle}
                alt="Plantstiks plant-based compostable bottle in a botanical environment"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            {CHIPS.map((chip, i) => (
              <div
                key={chip.label}
                className={`animate-floaty absolute ${chip.pos} rounded-2xl border border-ink/10 bg-white/85 px-4 py-3 shadow-lg shadow-teal/5 backdrop-blur-md`}
                style={i === 1 ? { animationDelay: "1.4s" } : {}}
              >
                <p className="font-display text-[0.6rem] font-bold tracking-[0.24em] text-leaf">{chip.label}</p>
                <p className="mt-1 font-display text-sm font-bold text-teal">{chip.value}</p>
              </div>
            ))}
            <svg
              className="animate-spin-slow absolute -top-14 -right-14 h-36 w-36 text-teal/15"
              viewBox="0 0 100 100" fill="none" aria-hidden="true"
            >
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 6" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <VideoBand />
    </section>
  );
};
