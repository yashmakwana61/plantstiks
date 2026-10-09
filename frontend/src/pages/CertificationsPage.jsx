import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { CERTS } from "../lib/data";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function CertificationsPage() {
  useSEO({
    title: "Certifications & Compliance — IS/ISO 17088, CPCB, CIPET, EN 13432 | Plantstiks",
    description:
      "Plantstiks works with applicable standards, laboratories and regulatory requirements — IS/ISO 17088:2021, CPCB requirements, CIPET testing, EN 13432 and ASTM D6400 where applicable.",
    path: "/certifications",
  });

  return (
    <>
      <PageHeader
        eyebrow="CERTIFICATIONS & COMPLIANCE"
        title={["COMPLIANCE DESIGNED", "INTO PRODUCT DEVELOPMENT."]}
        intro="Plantstiks works with applicable standards, laboratories and regulatory requirements based on the material, product category and target market."
        img={IMG.lab}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="certifications-grid">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTS.map((c, i) => (
              <FadeUp key={c.k} delay={(i % 3) * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-[24px] border border-ink/10 bg-white p-8 shadow-sm shadow-teal/5" data-testid={`cert-card-${i}`}>
                  <p className="font-display text-2xl font-bold text-teal">{c.k}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60">{c.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-12 rounded-[24px] border border-peach/40 bg-[#FBF3EA] p-8 sm:p-10">
            <p className="eyebrow text-peach">WEBSITE COMPLIANCE NOTE</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/70">
              Every certificate or test report displayed identifies its exact scope.
              One certificate or test report never automatically covers every
              Plantstiks formulation, product, size or application — claims are
              made only to the extent the relevant material, product test or
              certificate supports them.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-12">
            <Link
              to="/resources/technical"
              data-testid="certifications-reports-cta"
              className="inline-block rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
            >
              VIEW CERTIFICATIONS &amp; TEST REPORTS
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
