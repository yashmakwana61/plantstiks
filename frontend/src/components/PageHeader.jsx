import { Eyebrow, FadeUp, MaskLines } from "./Reveal";

export const PageHeader = ({ eyebrow, title, intro, img }) => (
  <header className="relative overflow-hidden bg-cream pb-16 pt-32 grain lg:pb-24 lg:pt-44">
    <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <MaskLines
        delay={0.2}
        as="h1"
        className="mt-6 font-display font-bold leading-[1.03] text-teal text-[clamp(2.4rem,6vw,5rem)]"
        lines={title}
      />
      {intro && (
        <FadeUp delay={0.55} className="mt-8 max-w-xl text-ink/60">
          {intro}
        </FadeUp>
      )}
      {img && (
        <FadeUp delay={0.7} className="mt-12">
          <div className="overflow-hidden rounded-[28px] border border-ink/10 shadow-xl shadow-teal/5">
            <img src={img} alt="" className="h-64 w-full object-cover sm:h-80" loading="lazy" />
          </div>
        </FadeUp>
      )}
    </div>
  </header>
);
