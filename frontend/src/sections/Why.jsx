import { motion } from "framer-motion";
import { WHY } from "../lib/data";
import { Eyebrow, FadeUp } from "../components/Reveal";

export const Why = () => (
  <section className="bg-cream py-24 lg:py-36" data-testid="why-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-3xl">
        <Eyebrow>THE CASE FOR PLANTSTIKS</Eyebrow>
        <FadeUp delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold text-teal sm:text-6xl">WHY PLANTSTIKS?</h2>
        </FadeUp>
      </div>

      <div className="mt-16">
        {WHY.map((w, i) => (
          <motion.div
            key={w.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 12 }}
            className="group flex flex-col gap-4 border-t border-ink/15 py-10 transition-colors last:border-b sm:flex-row sm:items-center sm:gap-12"
            data-testid={`why-principle-${w.n}`}
          >
            <p className="font-display text-5xl font-bold text-leaf/25 transition-colors duration-300 group-hover:text-peach sm:w-28 sm:text-6xl">
              {w.n}
            </p>
            <h3 className="font-display text-3xl font-bold text-teal sm:w-96 sm:text-4xl">{w.t}</h3>
            <p className="max-w-md text-sm leading-relaxed text-ink/60 sm:ml-auto">{w.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
