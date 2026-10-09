import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { FAQS } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function ResourcesPage() {
  const { faqs } = useContent();
  const FAQS = faqs;
  useSEO({
    title: "Resources — Catalogue, Technical Documents & FAQs | Plantstiks",
    description:
      "Plantstiks resources: request the catalogue, read technical documents and find answers on material, food safety, temperature range and preform weights.",
    path: "/resources",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="RESOURCES"
        title={["PROOF, ON REQUEST.", "ANSWERS, UP FRONT."]}
        intro="The catalogue, technical documents and the questions brands actually ask us."
        img={IMG.lab}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="resources-cards">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-6 sm:grid-cols-2 lg:px-12">
          <Link to="/resources/catalogue" data-testid="resources-catalogue-card" className="group relative block h-80 overflow-hidden rounded-[28px] bg-teal-900">
            <img src={IMG.lineup} alt="Plantstiks catalogue" loading="lazy" className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <h2 className="font-display text-3xl font-bold text-cream">CATALOGUE</h2>
              <p className="mt-2 text-sm text-cream/65">Product families, preform weights, bottle ranges. Shared on request.</p>
            </div>
          </Link>
          <Link to="/resources/technical" data-testid="resources-technical-card" className="group relative block h-80 overflow-hidden rounded-[28px] bg-teal-900">
            <img src={IMG.lab} alt="Plantstiks technical documents" loading="lazy" className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <h2 className="font-display text-3xl font-bold text-cream">TECHNICAL DOCUMENTS</h2>
              <p className="mt-2 text-sm text-cream/65">Material identification, migration testing, compliance results.</p>
            </div>
          </Link>
        </div>
      </section>

      <section id="faqs" className="bg-cream-soft py-20 lg:py-28" data-testid="resources-faqs">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold text-teal sm:text-4xl">FREQUENTLY ASKED</h2>
          </FadeUp>
          <div className="mt-10">
            {FAQS.map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.05} className="border-t border-ink/10 last:border-b">
                <details className="group py-6" data-testid={`faq-item-${i}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-bold text-teal [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-leaf transition-transform duration-300 group-open:rotate-45">
                      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65">{f.a}</p>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
