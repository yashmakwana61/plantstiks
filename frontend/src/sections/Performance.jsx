import { motion } from "framer-motion";
import { SPECS } from "../lib/data";
import { FadeUp, Eyebrow } from "../components/Reveal";

const TempScale = () => (
  <FadeUp className="relative overflow-hidden rounded-[32px] border border-ink/10 bg-white p-8 shadow-lg shadow-teal/5 sm:p-12" data-testid="temperature-scale">
    <div className="flex items-end justify-between">
      <div>
        <p className="eyebrow text-leaf">TEMPERATURE STABILITY</p>
        <p className="mt-4 font-display text-4xl font-bold text-teal sm:text-6xl">
          −20°C <span className="text-ink/25">→</span> +55°C
        </p>
      </div>
      <p className="max-w-[200px] text-right text-xs leading-relaxed text-ink/50">
        Documented working range for the Plantstiks material system.
      </p>
    </div>
    <div className="relative mt-10 h-2 overflow-hidden rounded-full bg-ink/10">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-sage via-leaf to-peach"
      />
    </div>
    <div className="mt-3 flex justify-between font-display text-[0.65rem] font-bold tracking-[0.2em] text-ink/40">
      <span>−20°C · FROZEN</span>
      <span>+25°C · AMBIENT</span>
      <span>+55°C · HOT FILL ZONE</span>
    </div>
  </FadeUp>
);

export const Performance = ({ id }) => (
  <section id={id} className="bg-cream-soft py-24 lg:py-36" data-testid="performance-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-3xl">
        <Eyebrow>SUSTAINABILITY MEETS PERFORMANCE</Eyebrow>
        <FadeUp delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
            SUSTAINABILITY
            <br />
            MEETS PERFORMANCE.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-6 max-w-xl text-ink/60">
          A plant-based system is only useful if it behaves like packaging.
          Ours is documented, tested and built for real lines.
        </FadeUp>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SPECS.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group rounded-[24px] border border-ink/10 bg-cream p-8 transition-colors duration-300 hover:border-teal/30"
            data-testid={`performance-spec-${i}`}
          >
            <p className="font-display text-[0.62rem] font-bold tracking-[0.24em] text-leaf">{s.k}</p>
            <p className="mt-5 font-display text-2xl font-bold leading-snug text-teal">{s.v}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">{s.d}</p>
            <span className="mt-6 block h-px w-full bg-ink/10 transition-colors duration-300 group-hover:bg-teal/30" />
            <span className="mt-2 block font-display text-[0.6rem] font-bold tracking-[0.2em] text-ink/30">
              SPEC {String(i + 1).padStart(2, "0")}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <TempScale />
      </div>
    </div>
  </section>
);
