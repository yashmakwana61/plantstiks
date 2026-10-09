import { PageHeader } from "../components/PageHeader";
import { Decomposition } from "../sections/Decomposition";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function DecompositionPage() {
  useSEO({
    title: "Decomposition — Designed End-of-Life | Plantstiks",
    description:
      "Every Plantstiks bottle has a next chapter: a plant-based material with a designed end-of-life. No invented timelines — just the principle of returning to the biological cycle.",
    path: "/technology/decomposition",
  });

  return (
    <>
      <PageHeader
        eyebrow="TECHNOLOGY — DECOMPOSITION"
        title={["EVERY BOTTLE HAS", "A NEXT CHAPTER."]}
        intro="Biodegradable and industrially compostable by design. Scroll through what designed end-of-life means — principle first, promises never."
        img={IMG.decomposition}
      />
      <Decomposition />
    </>
  );
}
