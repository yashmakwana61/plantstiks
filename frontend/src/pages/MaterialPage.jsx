import { PageHeader } from "../components/PageHeader";
import { MaterialStory } from "../sections/MaterialStory";
import { FadeUp } from "../components/Reveal";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function MaterialPage() {
  useSEO({
    title: "Plant-Based Material — PLA from Sugarcane & Corn Starch | Plantstiks",
    description:
      "Plantstiks preforms are made from sugarcane cellulose and corn starch — a plant-based alternative to PET, identified as Poly Lactic Acid (PLA) in our CIPET report.",
    path: "/technology/material",
  });

  return (
    <>
      <PageHeader
        eyebrow="TECHNOLOGY — MATERIAL"
        title={["WHAT IF A BOTTLE", "STARTED WITH A PLANT?"]}
        intro="Sugarcane cellulose and corn starch in, plant-based material out — refined, tested and formed into preforms designed as an alternative to PET."
        img={IMG.feedstock}
      />
      <FadeUp className="border-b border-ink/10 bg-cream-soft py-14">
        <p className="mx-auto max-w-3xl px-6 text-center font-display text-xl font-semibold leading-relaxed text-teal sm:text-2xl lg:px-12">
          The CIPET report identifies the tested sample as a PLA bottle — Poly
          Lactic Acid. The origin is the point: same job, different beginning.
        </p>
      </FadeUp>
      <MaterialStory />
    </>
  );
}
