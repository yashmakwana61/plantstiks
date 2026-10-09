import { PageHeader } from "../components/PageHeader";
import { AboutSection } from "../sections/AboutSection";
import { Scale } from "../sections/Scale";
import { Trust } from "../sections/Trust";
import { FadeUp, Eyebrow } from "../components/Reveal";
import { TIMELINE } from "../lib/data";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function AboutPage() {
  useSEO({
    title: "About Plantstiks — Advanced Material & Packaging Technology Company",
    description:
      "Plantstiks began with a bottle and is building a material revolution — an ecosystem connecting material technology, manufacturers, brands and end-of-life infrastructure. Made for India. Engineered for the world.",
    path: "/about",
  });

  return (
    <>
      <PageHeader
        eyebrow="ABOUT PLANTSTIKS"
        title={["WE STARTED WITH A BOTTLE.", "WE'RE BUILDING", "A MATERIAL REVOLUTION."]}
        intro="Plantstiks develops advanced plant-based materials and packaging technologies that enable brands and manufacturers to transition toward high-performance, scalable and more sustainable packaging."
        img={IMG.lab}
      />
      <AboutSection />

      <section id="journey" className="bg-cream-soft py-20 lg:py-28" data-testid="journey-timeline">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Eyebrow>OUR JOURNEY</Eyebrow>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <FadeUp key={t.year} delay={i * 0.1} className="rounded-[24px] border border-ink/10 bg-white p-8" data-testid={`timeline-${t.year}`}>
                <p className="font-display text-4xl font-bold text-leaf/30">{t.year}</p>
                <p className="eyebrow mt-4 text-leaf">{t.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{t.d}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28" data-testid="vision-mission">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-6 sm:grid-cols-2 lg:px-12">
          <FadeUp className="rounded-[28px] border border-ink/10 bg-cream-soft p-10">
            <p className="eyebrow text-leaf">VISION</p>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug text-teal">
              To make plant-based materials a mainstream choice for global
              packaging — a world where packaging is designed not only for
              performance and convenience, but also for what happens after its
              useful life.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="rounded-[28px] border border-ink/10 bg-cream-soft p-10">
            <p className="eyebrow text-peach">MISSION</p>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug text-teal">
              To develop, validate and commercialize advanced plant-based
              materials and packaging technologies through a scalable global
              manufacturing network.
            </p>
          </FadeUp>
        </div>
      </section>

      <Scale />
      <Trust />
    </>
  );
}
