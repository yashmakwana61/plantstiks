import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { FadeUp, RevealImage } from "../components/Reveal";
import { Performance } from "../sections/Performance";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

const PILLARS = [
  { t: "PLANT-BASED MATERIAL", d: "Preforms made from sugarcane cellulose and corn starch — a plant-based alternative to PET, identified as PLA in our CIPET report.", to: "/technology/material" },
  { t: "MANUFACTURING", d: "Preform to bottle on standard conversion routes — engineered for real production, not just prototypes.", to: "/technology" },
  { t: "DECOMPOSITION", d: "A designed end-of-life: material that returns to the biological cycle instead of persisting for centuries.", to: "/technology/decomposition" },
  { t: "TESTING & VALIDATION", d: "Material identification, migration testing and compliance results — shared, not buried.", to: "/technology/testing" },
];

export default function Technology() {
  useSEO({
    title: "Technology — Plantstiks Plant-Based Material Science",
    description:
      "The technology inside Plantstiks: plant-based PLA material, preform-to-bottle manufacturing, designed decomposition and documented testing.",
    path: "/technology",
  });

  return (
    <>
      <PageHeader
        eyebrow="TECHNOLOGY"
        title={["MATERIAL SCIENCE,", "FROM A DIFFERENT STARTING POINT."]}
        intro="Most packaging starts with oil. Ours starts in a field — and is engineered all the way to end-of-life."
        img={IMG.material}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="technology-pillars">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <FadeUp key={p.t} delay={(i % 2) * 0.1}>
                <Link
                  to={p.to}
                  data-testid={`technology-pillar-${i}`}
                  className="group flex h-full flex-col justify-between rounded-[28px] border border-ink/10 bg-cream-soft p-10 transition-colors duration-300 hover:border-teal/40"
                >
                  <h2 className="font-display text-2xl font-bold text-teal sm:text-3xl">{p.t}</h2>
                  <div>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">{p.d}</p>
                    <span className="mt-6 inline-block font-display text-[0.62rem] font-bold tracking-[0.24em] text-peach opacity-0 transition-all duration-500 group-hover:opacity-100">
                      EXPLORE →
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
            <RevealImage className="rounded-[28px]">
              <img src={IMG.lab} alt="Plantstiks material evaluation and technical documentation" loading="lazy" className="h-80 w-full rounded-[28px] object-cover" />
            </RevealImage>
            <FadeUp delay={0.15}>
              <p className="font-display text-2xl font-semibold leading-relaxed text-teal sm:text-3xl">
                We are not simply selling bottles. We are developing a new material
                and packaging system.
              </p>
              <p className="mt-6 max-w-lg text-ink/60">
                That means the science comes first: what the material is, how it
                performs, how it fails safely at end-of-life, and what the documents
                actually say.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <Performance id="performance" />
    </>
  );
}
