import { motion } from "framer-motion";
import { FadeUp, Eyebrow } from "../components/Reveal";
import { REGIONS } from "../lib/data";

const NEXT_CHAPTER = [
  "Expand proprietary PLA and PHA material technologies",
  "Build manufacturing partnerships across India",
  "Enter international markets",
  "Develop new packaging applications",
  "Strengthen collection and end-of-life infrastructure",
];

export const Scale = () => (
  <section id="scale" className="relative bg-white py-24 lg:py-36" data-testid="scale-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-3xl">
        <Eyebrow>GLOBAL MARKETS</Eyebrow>
        <FadeUp delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
            MADE IN INDIA.
            <br />
            BUILT FOR THE WORLD.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-6 max-w-2xl text-ink/60">
          Plantstiks is building its technology and manufacturing ecosystem in
          India while developing solutions for customers and partners
          internationally — focused on markets where businesses are actively
          searching for sustainable, compostable and plant-based packaging.
        </FadeUp>
      </div>

      <FadeUp delay={0.25} className="mt-10 flex flex-wrap gap-2" data-testid="global-regions">
        {REGIONS.map((r) => (
          <span key={r} className="rounded-full border border-ink/15 bg-cream-soft px-5 py-2 font-display text-[0.65rem] font-bold tracking-[0.2em] text-teal">
            {r.toUpperCase()}
          </span>
        ))}
      </FadeUp>

      <div className="mt-16 grid gap-6 lg:grid-cols-12" data-testid="presence-visual">
        <div className="relative overflow-hidden rounded-[32px] border border-ink/10 bg-cream-soft p-8 sm:p-12 lg:col-span-7">
          <p className="eyebrow text-leaf">PRESENCE</p>
          <div className="relative mt-8 flex h-64 items-center justify-center sm:h-80">
            {[0, 1, 2].map((r) => (
              <motion.span
                key={r}
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, delay: r * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute rounded-full border border-ink/15"
                style={{ width: 120 + r * 130, height: 120 + r * 130 }}
              />
            ))}
            <motion.span
              animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute h-16 w-16 rounded-full bg-leaf/30"
            />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-teal">
              <span className="font-display text-[0.6rem] font-bold tracking-[0.18em] text-cream">INDIA</span>
            </div>
            {REGIONS.slice(1).map((r, i) => (
              <span
                key={r}
                className="absolute h-2 w-2 rounded-full bg-peach"
                style={{ right: `${14 + i * 9}%`, top: `${20 + i * 14}%` }}
              />
            ))}
            <span className="absolute bottom-[14%] right-[38%] font-display text-[0.58rem] font-bold tracking-[0.24em] text-ink/45">
              GLOBAL EXPANSION
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/55">
            An Indian material technology company developing solutions for
            domestic and international markets — with a manufacturing network
            designed for regional supply.
          </p>
        </div>

        <div className="rounded-[32px] border border-ink/10 bg-cream-soft p-8 sm:p-12 lg:col-span-5">
          <p className="eyebrow text-leaf">THE NEXT CHAPTER</p>
          <div className="mt-10 space-y-0">
            {NEXT_CHAPTER.map((n, i) => (
              <FadeUp key={n} delay={i * 0.1} className="flex items-start gap-4 border-b border-ink/10 py-4 last:border-b-0">
                <span className="mt-0.5 font-display text-xs font-bold text-peach">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed text-ink/70">{n}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
