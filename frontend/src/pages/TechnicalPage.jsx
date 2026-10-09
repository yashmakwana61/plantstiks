import { PageHeader } from "../components/PageHeader";
import { Science } from "../sections/Science";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function TechnicalPage() {
  useSEO({
    title: "Technical Documents — Reports Library | Plantstiks",
    description:
      "The Plantstiks document library: material identification (PLA), specific migration testing, compliance results and documentation shared on request.",
    path: "/resources/technical",
  });

  return (
    <>
      <PageHeader
        eyebrow="RESOURCES — TECHNICAL DOCUMENTS"
        title={["THE TRUST CENTER."]}
        intro="Every claim on this site traces back to a document. Open them here, request the full versions from us."
        img={IMG.lab}
      />
      <Science />
    </>
  );
}
