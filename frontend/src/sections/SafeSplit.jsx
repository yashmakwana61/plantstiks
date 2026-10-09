import { motion } from "framer-motion";
import { FadeUp } from "../components/Reveal";

const PROVIDES = [
  { t: "Proprietary material formulations", d: "Developed centrally for different packaging applications." },
  { t: "Technical trials & process parameters", d: "Validated on commercial injection, blow and thermoforming equipment." },
  { t: "Product validation & QC standards", d: "Testing protocols and quality requirements partners produce against." },
  { t: "Manufacturing SOPs & certification support", d: "Standards, documentation and certification guidance included." },
  { t: "Brand authorization & market development", d: "Customer opportunities, brand relationships and technical assistance." },
];

const PARTNERS_GIVE = [
  { t: "Existing manufacturing infrastructure", d: "Injection moulding, preform, bottle blowing, extrusion, thermoforming." },
  { t: "Production capability & local operations", d: "Capacity already running, closer to the market." },
  { t: "Quality execution & regional supply", d: "Manufacturing under Plantstiks specifications and SOPs." },
];

const Card = ({ item, i, light }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="flex items-start gap-5 border-t py-6"
  >
    <span className={`mt-1 font-display text-[0.65rem] font-bold tracking-[0.2em] ${light ? "text-leaf" : "text-peach"}`}>
      {String(i + 1).padStart(2, "0")}
    </span>
    <div>
      <h4 className={`font-display text-xl font-bold ${light ? "text-teal" : "text-teal"}`}>{item.t}</h4>
      <p className={`mt-1.5 text-sm leading-relaxed ${light ? "text-ink/60" : "text-ink/60"}`}>{item.d}</p>
    </div>
  </motion.div>
);

export const SafeSplit = () => (
  <section className="relative bg-cream py-24 lg:py-36" data-testid="safe-split-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-4xl">
        <FadeUp className="eyebrow flex items-center gap-3 text-leaf">
          <span className="inline-block h-px w-10 bg-leaf/60" />
          THE PLANTSTIKS MODEL
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-teal sm:text-6xl">
            WE&rsquo;RE NOT JUST MAKING PACKAGING.
            <br />
            WE&rsquo;RE BUILDING THE MATERIAL TECHNOLOGY BEHIND IT.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-8 max-w-2xl text-ink/65">
          Material Science + Product Engineering + Certified Manufacturing + Market
          Deployment + End-of-Life Strategy. We develop the material technology,
          formulations and standards centrally — qualified manufacturers become
          authorized Plantstiks partners and produce closer to the market.
        </FadeUp>
      </div>

      <div className="relative mt-16 grid gap-6 lg:grid-cols-2 lg:gap-0" data-testid="safe-split-worlds">
        <div className="rounded-[32px] bg-cream-soft p-8 sm:p-12 lg:rounded-r-none lg:border-r lg:border-dashed lg:border-ink/15">
          <FadeUp>
            <p className="eyebrow text-leaf">PLANTSTIKS PROVIDES</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-teal">
              The material technology.
            </h3>
          </FadeUp>
          <div className="mt-8">
            {PROVIDES.map((item, i) => (
              <Card key={item.t} item={item} i={i} light />
            ))}
          </div>
        </div>

        <div className="rounded-[32px] bg-[#E9EFE6] p-8 sm:p-12 lg:rounded-l-none">
          <FadeUp>
            <p className="eyebrow text-peach">MANUFACTURING PARTNERS PROVIDE</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-teal">
              The production muscle.
            </h3>
          </FadeUp>
          <div className="mt-8">
            {PARTNERS_GIVE.map((item, i) => (
              <Card key={item.t} item={item} i={i} />
            ))}
          </div>
          <FadeUp delay={0.2} className="mt-10 border-t border-ink/15 pt-8">
            <p className="font-display text-lg font-semibold leading-relaxed text-teal">
              A distributed model designed to reduce unnecessary logistics,
              accelerate market entry and scale production — without a
              Plantstiks-owned factory in every market.
            </p>
          </FadeUp>
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-28 w-28 items-center justify-center rounded-full border border-ink/10 bg-peach shadow-xl shadow-teal/20"
            data-testid="safe-split-emblem"
          >
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path d="M32 50 V26" stroke="#002A2A" strokeWidth="4" strokeLinecap="round" />
              <path d="M32 38 L22 32 M32 30 L42 24" stroke="#002A2A" strokeWidth="3.6" strokeLinecap="round" />
              <ellipse cx="32" cy="19" rx="6.5" ry="9.5" fill="none" stroke="#002A2A" strokeWidth="3.6" />
            </svg>
          </motion.div>
        </div>
      </div>

      <FadeUp delay={0.2} className="mx-auto mt-14 max-w-xl text-center">
        <p className="font-display text-xl font-semibold text-teal sm:text-2xl">
          Your machines. Our material technology. A new packaging market.
        </p>
      </FadeUp>
    </div>
  </section>
);

