import { STEPS } from "../lib/data";
import { Eyebrow, FadeUp } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

export const Partnership = () => (
  <section className="relative bg-cream-soft py-24 lg:py-36" data-testid="partnership-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-4xl">
        <Eyebrow>FROM MATERIAL TO MARKET</Eyebrow>
        <FadeUp delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-teal sm:text-5xl">
            FROM MATERIAL
            <br />
            TO MARKET.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-6 max-w-xl text-ink/60">
          Seven steps from a plant-based formulation to packaging on the shelf —
          with testing and certified manufacturing built into the path.
        </FadeUp>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <FadeUp key={s.n} delay={(i % 3) * 0.1} className="bg-white p-8 sm:p-10">
            <p className="font-display text-sm font-bold text-peach">{s.n}</p>
            <h3 className="mt-5 font-display text-xl font-bold leading-snug text-teal">{s.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">{s.d}</p>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.2} className="mt-12">
        <MagneticButton to="/contact" testid="partnership-cta">
          START YOUR PACKAGING PROJECT
        </MagneticButton>
      </FadeUp>
    </div>
  </section>
);
