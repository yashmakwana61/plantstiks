import { PageHeader } from "../components/PageHeader";
import { FadeUp, RevealImage, Eyebrow } from "../components/Reveal";
import { MaterialStory } from "../sections/MaterialStory";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

const MATERIALS = [
  {
    k: "PLA-BASED TECHNOLOGY",
    t: "Polylactic Acid, engineered.",
    d: "PLA is a bio-based polymer produced from renewable agricultural feedstocks. Plantstiks develops PLA-based formulations for rigid bottles, preforms, containers, thermoformed packaging and other products. Compostability claims are always communicated according to the applicable standard, certification scope and required composting conditions.",
    img: IMG.material,
  },
  {
    k: "PHA-BASED TECHNOLOGY",
    t: "The next generation of biomaterials.",
    d: "Plantstiks is advancing into proprietary PHA-based compounded formulations. PHA — Polyhydroxyalkanoates — is an important family of bio-based polymers with potential across multiple packaging applications. Our R&D strategy is focused not on a single polymer, but on continuously developing material grades suited to different products, manufacturing technologies and end-of-life requirements.",
    img: IMG.lab,
  },
  {
    k: "PROPRIETARY MATERIAL BLENDS",
    t: "We engineer the material around the application.",
    d: "Clarity, strength, flexibility, heat performance, barrier characteristics, processing stability, sealing, product compatibility — different applications need different properties. Plantstiks develops proprietary compounded formulations to optimize them. We don't force one material into every application.",
    img: IMG.preform,
  },
];

const RD = [
  "PHA-based packaging", "Advanced PLA compounds", "Improved barrier materials", "Heat-performance enhancement",
  "Flexible packaging applications", "Rigid packaging", "Thermoforming materials", "Injection moulding grades",
  "Custom bio-based compounds", "New end-of-life pathways",
];

export default function MaterialsPage() {
  useSEO({
    title: "Materials — PLA, PHA & Proprietary Bio-Based Blends | Plantstiks",
    description:
      "Plantstiks material technology: PLA-based and PHA-based formulations and proprietary bio-based blends engineered around each packaging application — from rigid bottles to thermoformed packaging.",
    path: "/materials",
  });

  return (
    <>
      <PageHeader
        eyebrow="MATERIAL TECHNOLOGY"
        title={["FROM POLYMER SCIENCE", "TO FINISHED PACKAGING."]}
        intro="At the core of Plantstiks is material innovation — plant-derived and compostable polymers, developed into proprietary formulations designed around the processing and performance requirements of different packaging applications."
        img={IMG.material}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="materials-list">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {MATERIALS.map((m, i) => (
            <FadeUp key={m.k} className="mt-14 first:mt-0">
              <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <RevealImage className="rounded-[28px]">
                  <img src={m.img} alt={`${m.k} — Plantstiks plant-based material`} loading="lazy" className="h-80 w-full rounded-[28px] object-cover" />
                </RevealImage>
                <div>
                  <p className="eyebrow text-leaf">{m.k}</p>
                  <h2 className="mt-4 font-display text-3xl font-bold text-teal sm:text-4xl">{m.t}</h2>
                  <p className="mt-5 max-w-lg leading-relaxed text-ink/65">{m.d}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-cream-soft py-20 lg:py-28" data-testid="rd-roadmap">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Eyebrow>R&amp;D AND INNOVATION</Eyebrow>
          <FadeUp delay={0.1}>
            <h2 className="mt-6 font-display text-3xl font-bold text-teal sm:text-5xl">
              THE MATERIAL DOESN&rsquo;T STOP EVOLVING. NEITHER DO WE.
            </h2>
          </FadeUp>
          <div className="mt-10 flex flex-wrap gap-2">
            {RD.map((r, i) => (
              <FadeUp key={r} delay={i * 0.04}>
                <span className="inline-block rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink/70">
                  {r}
                </span>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-xl font-display text-lg font-semibold text-teal">
              Our objective: develop the right material for the right application —
              and make it commercially scalable.
            </p>
          </FadeUp>
        </div>
      </section>

      <MaterialStory />
    </>
  );
}
