import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { PARTNER_EVAL } from "../lib/data";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function PartnersPage() {
  useSEO({
    title: "Become a Manufacturing Partner — Compostable Packaging Network | Plantstiks",
    description:
      "Already operating injection moulding, preform, bottle blowing, extrusion or thermoforming machinery? Apply to become an authorized Plantstiks manufacturing partner across India and selected international markets.",
    path: "/manufacturing-partners",
  });

  return (
    <>
      <PageHeader
        eyebrow="MANUFACTURING NETWORK"
        title={["YOUR MACHINES.", "OUR MATERIAL TECHNOLOGY.", "A NEW PACKAGING MARKET."]}
        intro="Already operating injection moulding, preform, bottle blowing, sheet extrusion, thermoforming or related packaging machinery? Your existing infrastructure may have the potential to manufacture next-generation plant-based packaging. Plantstiks is building a network of qualified manufacturing partners across India and selected international markets."
        img={IMG.lab}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="partner-eval">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold text-teal sm:text-4xl">WHAT WE EVALUATE</h2>
          </FadeUp>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_EVAL.map((p, i) => (
              <FadeUp key={p} delay={(i % 4) * 0.06} className="bg-white p-6" data-testid={`partner-eval-${i}`}>
                <p className="font-display text-xs font-bold text-peach">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm font-semibold leading-snug text-ink/75">{p}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-12">
            <p className="max-w-3xl leading-relaxed text-ink/65">
              Approved partners undergo material trials, validation and
              authorization before commercial production. Plantstiks provides
              proprietary material formulations, technical trials, process
              parameters, product validation, quality-control standards,
              manufacturing SOPs, certification support, brand authorization,
              market development, customer opportunities and technical
              assistance — partners provide the infrastructure, production
              capability, local operations, quality execution and regional supply.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-12">
            <a
              href="/contact"
              data-testid="partner-apply-cta"
              className="inline-block rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
            >
              APPLY AS MANUFACTURING PARTNER
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
