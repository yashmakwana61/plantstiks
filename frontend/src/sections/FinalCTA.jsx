import { IMG } from "../lib/images";
import { FadeUp, MaskLines } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import { ParticleField } from "../components/ParticleField";

export const FinalCTA = () => (
  <section className="relative overflow-hidden bg-white py-24 lg:py-36" data-testid="final-cta-section">
    <ParticleField density={70} color="227,154,107" />

    <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center lg:px-12">
      <FadeUp delay={0.05} className="mx-auto w-full max-w-[560px]">
        <div className="overflow-hidden rounded-[28px] border border-ink/10 shadow-xl shadow-teal/5">
          <img
            src={IMG.decomposition}
            alt="A Plantstiks bottle dissolving into organic particles"
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </div>
      </FadeUp>

      <MaskLines
        delay={0.1}
        as="h2"
        className="mx-auto mt-12 font-display font-bold leading-[1.02] text-teal text-[clamp(2.4rem,6.5vw,5.5rem)]"
        lines={["YOUR NEXT PACKAGING", "SOLUTION COULD START", "WITH A PLANT."]}
      />
      <FadeUp delay={0.5} className="mx-auto mt-8 max-w-lg text-ink/60">
        Whether you&rsquo;re a global brand searching for sustainable packaging, an
        Indian manufacturer looking for new material technology, or a business
        developing its next product — Plantstiks is ready to explore what&rsquo;s
        possible.
      </FadeUp>
      <FadeUp delay={0.65} className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
        {[
          { k: "FOR BRANDS", label: "REQUEST SAMPLES", to: "/contact", tid: "final-cta-samples" },
          { k: "FOR MANUFACTURERS", label: "BECOME A PARTNER", to: "/manufacturing-partners", tid: "final-cta-partner" },
          { k: "FOR DISTRIBUTORS", label: "DISTRIBUTION ENQUIRY", to: "/contact", tid: "final-cta-distribution" },
          { k: "FOR CUSTOM PROJECTS", label: "START A PROJECT", to: "/contact", tid: "final-cta-project" },
        ].map((c, i) => (
          <div key={c.k} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-cream-soft px-6 py-4 text-left">
            <span className="font-display text-[0.6rem] font-bold tracking-[0.22em] text-leaf">{c.k}</span>
            <MagneticButton to={c.to} testid={c.tid} className="!px-5 !py-2.5">
              {c.label}
            </MagneticButton>
          </div>
        ))}
      </FadeUp>
      <FadeUp delay={0.8} className="mt-12 font-display text-sm font-bold tracking-[0.28em] text-ink/40">
        PLANTSTIKS — ADVANCED MATERIALS. BETTER PACKAGING. A CLEANER FUTURE.
      </FadeUp>
    </div>
  </section>
);
