import { IMG } from "../lib/images";
import { Eyebrow, FadeUp, RevealImage } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

export const AboutSection = () => (
  <section className="relative bg-cream-soft py-24 lg:py-36" data-testid="about-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <FadeUp className="eyebrow flex items-center gap-3 text-leaf">
            <span className="inline-block h-px w-10 bg-leaf/60" />
            ABOUT PLANTSTIKS
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-teal sm:text-5xl">
              WE STARTED WITH A BOTTLE.
              <br />
              WE&rsquo;RE BUILDING A MATERIAL REVOLUTION.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-8 max-w-lg space-y-5 text-ink/65">
            <p>
              Plantstiks began with a simple question: Why should packaging
              designed to be used for minutes remain in the environment for
              generations? That question led us into material science, product
              engineering and sustainable packaging development.
            </p>
            <p>
              What started with plant-based bottles has evolved into a broader
              technology platform spanning materials, preforms, caps, containers,
              thermoformed packaging and custom applications.
            </p>
            <p className="border-l-2 border-peach pl-5 font-display text-lg font-semibold text-teal">
              “We want to build the technology infrastructure that helps
              industries transition toward the next generation of materials.”
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 font-display text-[0.65rem] font-bold tracking-[0.2em] text-leaf">
              MATERIAL TECHNOLOGY <span className="text-peach">→</span> MANUFACTURERS{" "}
              <span className="text-peach">→</span> BRANDS <span className="text-peach">→</span> CONSUMERS{" "}
              <span className="text-peach">→</span> COLLECTION <span className="text-peach">→</span> END-OF-LIFE
            </p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-10">
            <MagneticButton to="/manufacturing-partners" testid="about-cta">
              BECOME A MANUFACTURING PARTNER
            </MagneticButton>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          <RevealImage className="col-span-2 rounded-[28px]">
            <img src={IMG.lab} alt="Plantstiks material evaluation — samples and test documentation" loading="lazy" className="h-64 w-full object-cover sm:h-80" />
          </RevealImage>
          <RevealImage delay={0.15} className="rounded-[28px]">
            <img src={IMG.material} alt="Macro view of plant cellulose material" loading="lazy" className="h-48 w-full object-cover sm:h-56" />
          </RevealImage>
          <RevealImage delay={0.25} className="rounded-[28px]">
            <img src={IMG.lineup} alt="Plantstiks bottle family in milky white, amber and transparent finishes" loading="lazy" className="h-48 w-full object-cover sm:h-56" />
          </RevealImage>
        </div>
      </div>
    </div>
  </section>
);
