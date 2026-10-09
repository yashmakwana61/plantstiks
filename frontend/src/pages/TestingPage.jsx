import { PageHeader } from "../components/PageHeader";
import { Science } from "../sections/Science";
import { FadeUp } from "../components/Reveal";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

const PARAMS = [
  "Material identification", "Migration and food-contact parameters", "Top-load strength", "Drop performance",
  "Burst performance", "Seal integrity", "Leakage", "WVTR — Water Vapour Transmission Rate",
  "OTR — Oxygen Transmission Rate", "Dimensional stability", "Storage stability", "Thermal performance",
  "Product compatibility", "Applicable compostability requirements",
];

export default function TestingPage() {
  useSEO({
    title: "Testing & Validation — Built on Data, Not Green Claims | Plantstiks",
    description:
      "Plantstiks evaluates packaging performance before it scales: material identification, migration and food-contact parameters, top-load, drop, burst, seal integrity, leakage, WVTR, OTR, stability and compostability requirements.",
    path: "/technology/testing",
  });

  return (
    <>
      <PageHeader
        eyebrow="TECHNOLOGY — TESTING & VALIDATION"
        title={["BUILT ON DATA,", "NOT GREEN CLAIMS."]}
        intro="Packaging must perform before it can scale. Depending on the application, Plantstiks evaluates the relevant parameters — then shares the documents behind them."
        img={IMG.lab}
      />

      <section className="bg-cream-soft py-20 lg:py-28" data-testid="testing-params">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold text-teal sm:text-4xl">
              WHAT WE EVALUATE
            </h2>
          </FadeUp>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {PARAMS.map((p, i) => (
              <FadeUp key={p} delay={(i % 4) * 0.06} className="bg-white p-6" data-testid={`testing-param-${i}`}>
                <p className="font-display text-xs font-bold text-peach">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm font-semibold leading-snug text-ink/75">{p}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Science />
    </>
  );
}
