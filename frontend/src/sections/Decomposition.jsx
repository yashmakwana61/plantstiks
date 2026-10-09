import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { IMG } from "../lib/images";
import { FadeUp } from "../components/Reveal";
import { ParticleField } from "../components/ParticleField";

const STAGES = [
  { t: "Finished bottle", d: "A complete plant-based package, on the line and on the shelf." },
  { t: "Surface begins changing", d: "Given the right conditions, the material starts to open up." },
  { t: "Material breaks down", d: "The structure loosens as natural processes go to work." },
  { t: "Fragments become smaller", d: "Smaller and smaller, back toward its botanical origins." },
  { t: "Returns to the environment", d: "Integrated into the biological cycle. Designed end-of-life." },
];

const RAIL = ["PRODUCT", "MATERIAL", "DECOMPOSITION", "NATURE"];
const RAIL_MAP = [0, 1, 2, 4];

export const Decomposition = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)));
  });

  const header = (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <FadeUp className="eyebrow flex items-center gap-3 text-leaf">
        <span className="inline-block h-px w-10 bg-leaf/60" />
        DESIGNED END-OF-LIFE
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
          EVERY BOTTLE HAS
          <br />
          A NEXT CHAPTER.
        </h2>
      </FadeUp>
    </div>
  );

  if (reduced) {
    return (
      <section className="bg-cream py-24" data-testid="decomposition-static">
        {header}
        <div className="mx-auto mt-12 max-w-2xl px-6">
          {STAGES.map((s, i) => (
            <div key={s.t} className="mt-8 border-t border-ink/10 pt-6">
              <p className="font-display text-[0.65rem] font-bold tracking-[0.24em] text-leaf">STAGE 0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-teal">{s.t}</h3>
              <p className="mt-2 text-sm text-ink/55">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <DecompositionScroll
      ref={ref}
      smooth={smooth}
      active={active}
      header={header}
    />
  );
};

const DecompositionScroll = ({ smooth, active, header }) => {
  const decompOpacity = useTransform(smooth, [0.12, 0.5], [0, 1]);
  const imgScale = useTransform(smooth, [0, 0.35], [1.12, 1]);

  return (
    <section className="relative bg-cream" style={{ height: "420vh" }} data-testid="decomposition-section">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="pt-24 sm:pt-28">{header}</div>

        <div className="relative flex flex-1 items-center justify-center py-6">
          <div className="relative h-[56vh] overflow-hidden rounded-[36px] border border-ink/10 bg-cream-deep/50 shadow-2xl shadow-teal/10" data-testid="decomposition-stage">
            <motion.img
              src={IMG.heroBottle}
              alt=""
              className="h-full w-auto object-cover"
              style={{ scale: imgScale }}
            />
            <motion.img
              src={IMG.decomposition}
              alt="A Plantstiks bottle breaking down into botanical fragments"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: decompOpacity, scale: imgScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/30 via-transparent to-teal-950/10" />
          </div>
          <ParticleField density={80} color="11,43,40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <div className="relative h-28 sm:h-24">
                {STAGES.map((s, i) => (
                  <motion.div
                    key={s.t}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-display text-[0.62rem] font-bold tracking-[0.26em] text-leaf">
                      STAGE 0{i + 1} / 05
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-teal sm:text-3xl">{s.t}</h3>
                    <p className="mt-1 max-w-md text-sm text-ink/55">{s.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative h-px w-full bg-ink/10">
                <motion.div className="absolute inset-0 origin-left bg-leaf" style={{ scaleX: smooth }} />
              </div>
              <div className="mt-4 flex justify-between">
                {RAIL.map((r, i) => (
                  <span
                    key={r}
                    className={`font-display text-[0.58rem] font-bold tracking-[0.22em] transition-colors duration-500 ${
                      active >= RAIL_MAP[i] ? "text-teal" : "text-ink/30"
                    }`}
                  >
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-[0.7rem] leading-relaxed text-ink/45">
                An experience about principle, not promises. We publish no
                decomposition timeline we cannot document.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
