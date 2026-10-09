import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useReducedMotion, useSpring } from "framer-motion";
import { JOURNEY } from "../lib/data";

const STACK = [0.16, 1, 0.3, 1];

export const Journey = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(JOURNEY.length - 1, Math.floor(v * JOURNEY.length));
    setActive(i);
  });

  if (reduced) {
    return (
      <section className="bg-teal-900 px-6 py-24 lg:px-12" data-testid="journey-section-static">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow text-sage">THE PLANTSTIKS JOURNEY</p>
          {JOURNEY.map((s) => (
            <div key={s.id} className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
              <img src={s.img} alt={s.title} className="h-72 w-full rounded-3xl object-cover" />
              <div>
                <p className="font-display text-5xl font-bold text-cream/15">{s.step}</p>
                <p className="eyebrow mt-4 text-leaf">{s.label}</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-cream">{s.title}</h3>
                <p className="mt-3 max-w-md text-cream/70">{s.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-teal-950" style={{ height: `${JOURNEY.length * 90}vh` }} data-testid="journey-section">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {JOURNEY.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.08 }}
            transition={{ duration: 1.1, ease: STACK }}
          >
            <img src={s.img} alt="" className="h-full w-full object-cover" style={{ opacity: 0.5 }} />
            <div className="absolute inset-0 bg-gradient-to-b from-teal-950/80 via-teal-950/30 to-teal-950" />
          </motion.div>
        ))}

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sage">THE PLANTSTIKS JOURNEY</p>
            <div className="relative mt-8 h-56 sm:h-64">
              {JOURNEY.map((s, i) => (
                <motion.div
                  key={s.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    y: active === i ? 0 : 36,
                    filter: active === i ? "blur(0px)" : "blur(6px)",
                  }}
                  transition={{ duration: 0.7, ease: STACK }}
                >
                  <p className="font-display text-7xl font-bold text-cream/10 sm:text-8xl">{s.step}</p>
                  <p className="eyebrow mt-4 text-peach">{s.label}</p>
                  <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-cream/70">{s.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-2 lg:col-start-11 lg:block">
            <div className="relative pl-6">
              <span className="absolute left-0 top-0 h-full w-px bg-cream/15" />
              <motion.span
                className="absolute left-0 top-0 w-px bg-peach"
                style={{ height: "100%", scaleY: smooth, transformOrigin: "top" }}
              />
              <ul className="space-y-5">
                {JOURNEY.map((s, i) => (
                  <li
                    key={s.id}
                    className={`font-display text-[0.65rem] font-bold tracking-[0.3em] transition-all duration-500 ${
                      active === i ? "text-cream" : "text-cream/30"
                    }`}
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-10 flex gap-2 lg:hidden">
          {JOURNEY.map((s, i) => (
            <span
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${active >= i ? "bg-peach" : "bg-cream/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
