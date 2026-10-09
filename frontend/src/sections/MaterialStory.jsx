import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { IMG } from "../lib/images";

const STOPS = [
  { n: "01", t: "PLANT", d: "Feedstock grows in fields, not wells. Sugarcane and corn starch are the starting point.", img: IMG.feedstock },
  { n: "02", t: "MATERIAL", d: "Plant cellulose is refined into resin — the raw material of the entire system.", img: IMG.material },
  { n: "03", t: "PREFORM", d: "Precision preforms in 13.5g, 19g and 36g — the DNA of every bottle.", img: IMG.preform },
  { n: "04", t: "BOTTLE", d: "Heat and stretch form the preform into a finished, brandable bottle.", img: IMG.heroBottle },
  { n: "05", t: "PRODUCT", d: "Capped, labelled and filled — ready for water, pharma, cosmetics and more.", img: IMG.water },
  { n: "06", t: "END OF LIFE", d: "The material returns to the biological cycle. Designed to, from day one.", img: IMG.decomposition },
];

export const MaterialStory = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(STOPS.length - 1, Math.floor(v * STOPS.length)));
  });

  const x = useTransform(smooth, [0, 1], ["0vw", `${-(STOPS.length - 1) * 78}vw`]);
  const lineScale = useTransform(smooth, [0, 1], [0, 1]);

  const header = (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <p className="eyebrow flex items-center gap-3 text-leaf">
        <span className="inline-block h-px w-10 bg-leaf/60" />
        THE MATERIAL STORY
      </p>
      <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
        WHAT IF A BOTTLE STARTED WITH A PLANT?
      </h2>
    </div>
  );

  if (reduced) {
    return (
      <section className="bg-cream py-24" data-testid="material-story-static">
        {header}
        <div className="mx-auto mt-14 grid max-w-[1440px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-12">
          {STOPS.map((s) => (
            <div key={s.n} className="rounded-3xl border border-ink/10 bg-cream-soft p-8">
              <p className="font-display text-4xl font-bold text-leaf/30">{s.n}</p>
              <p className="eyebrow mt-4 text-leaf">{s.t}</p>
              <p className="mt-3 text-sm text-ink/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-cream" style={{ height: "380vh" }} data-testid="material-story-section">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pt-16">{header}</div>

        <div className="relative mt-14">
          <motion.div style={{ x }} className="flex w-max gap-[6vw] pl-[6vw]">
            {STOPS.map((s, i) => (
              <div
                key={s.n}
                className={`w-[72vw] sm:w-[60vw] lg:w-[72vw] max-w-[860px] transition-all duration-700 ${
                  idx === i ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="flex items-end gap-8">
                  <p className="font-display text-[5rem] font-bold leading-none text-teal/10 sm:text-[7rem]">{s.n}</p>
                  <div className="pb-3">
                    <p className="eyebrow text-peach">{s.t}</p>
                    <p className="mt-3 max-w-md font-display text-xl font-semibold text-teal sm:text-2xl">{s.d}</p>
                  </div>
                </div>
                <div className="mt-6 overflow-hidden rounded-[28px] border border-ink/10 shadow-lg shadow-teal/5">
                  <img src={s.img} alt={`${s.t} — Plantstiks material journey`} className="h-56 w-full object-cover sm:h-72" loading="lazy" />
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mx-auto mt-12 w-full max-w-[1440px] px-[6vw]">
            <div className="relative h-px w-full bg-ink/10">
              <motion.div style={{ scaleX: lineScale }} className="absolute inset-0 origin-left bg-leaf" />
            </div>
            <div className="mt-4 flex justify-between font-display text-[0.6rem] font-bold tracking-[0.26em] text-ink/35">
              <span className={idx === 0 ? "text-teal" : ""}>PLANT</span>
              <span className={idx >= 2 && idx <= 3 ? "text-teal" : ""}>MATERIAL</span>
              <span className={idx === 4 ? "text-teal" : ""}>PRODUCT</span>
              <span className={idx === 5 ? "text-teal" : ""}>PLANET</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
