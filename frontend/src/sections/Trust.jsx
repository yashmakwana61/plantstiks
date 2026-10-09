import { FadeUp } from "../components/Reveal";

const BRANDS = ["Zydus Pharma", "Pidilite", "Wagh Bakri", "DS Group"];

export const Trust = () => (
  <section id="partners" className="border-y border-ink/10 bg-cream py-20 lg:py-28" data-testid="trust-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <FadeUp>
        <h2 className="text-center font-display text-2xl font-bold text-teal sm:text-3xl">
          TRUSTED BY BRANDS EXPLORING WHAT&rsquo;S NEXT.
        </h2>
      </FadeUp>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-14 gap-y-6" data-testid="trust-brand-list">
        {BRANDS.map((b, i) => (
          <FadeUp key={b} delay={i * 0.08} className="font-display text-2xl font-bold text-ink/45 transition-colors duration-300 hover:text-teal sm:text-3xl">
            {b}
          </FadeUp>
        ))}
      </div>
      <FadeUp delay={0.3}>
        <p className="mt-10 text-center text-xs tracking-wide text-ink/40">
          Enterprise engagements and pilots referenced in the Plantstiks brochure — shown as text references.
        </p>
      </FadeUp>
    </div>
  </section>
);
