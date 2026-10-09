import { BRAND_PARAMS } from "../lib/data";
import { Eyebrow, FadeUp } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

export const ForBrands = () => (
  <section className="bg-white py-24 lg:py-36" data-testid="for-brands-section">
    <div className="mx-auto grid max-w-[1440px] gap-14 px-6 lg:grid-cols-12 lg:px-12">
      <div className="lg:col-span-5">
        <Eyebrow>FOR BRANDS</Eyebrow>
        <FadeUp delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-teal sm:text-5xl">
            TELL US WHAT YOU PACKAGE.
            <br />
            WE&rsquo;LL HELP ENGINEER WHAT&rsquo;S NEXT.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-6 max-w-md text-ink/60">
          Whether you need a small-format bottle, premium hospitality packaging,
          custom cosmetic container or an entirely new sustainable packaging
          format — share your parameters and we&rsquo;ll recommend an existing
          solution or initiate a custom development program.
        </FadeUp>
        <FadeUp delay={0.3} className="mt-10">
          <MagneticButton to="/contact" testid="for-brands-cta">
            START YOUR PACKAGING PROJECT
          </MagneticButton>
        </FadeUp>
      </div>

      <div className="lg:col-span-7">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3" data-testid="brand-parameters">
          {BRAND_PARAMS.map((p, i) => (
            <FadeUp key={p} delay={(i % 3) * 0.08} className="flex min-h-24 items-center bg-cream-soft p-5">
              <span className="mr-3 font-display text-xs font-bold text-peach">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium leading-snug text-ink/75">{p}</span>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <p className="mt-6 text-xs leading-relaxed text-ink/45">
            Based on these parameters, Plantstiks can recommend an existing
            solution or begin a custom development program.
          </p>
        </FadeUp>
      </div>
    </div>
  </section>
);
