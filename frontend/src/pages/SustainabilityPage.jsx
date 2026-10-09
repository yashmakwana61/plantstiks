import { PageHeader } from "../components/PageHeader";
import { MaterialStory } from "../sections/MaterialStory";
import { Decomposition } from "../sections/Decomposition";
import { FinalCTA } from "../sections/FinalCTA";
import { FadeUp } from "../components/Reveal";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

const LOOP = ["Reduce", "Collect", "Recover", "Recycle / Compost", "Reintroduce"];

export default function SustainabilityPage() {
  useSEO({
    title: "Sustainability — A Circular Ecosystem | Plantstiks",
    description:
      "Sustainability at Plantstiks doesn't end when the packaging is sold: a circular ecosystem built around Reduce, Collect, Recover, Recycle/Compost and Reintroduce — with clear, responsible environmental claims.",
    path: "/sustainability",
  });

  return (
    <>
      <PageHeader
        eyebrow="SUSTAINABILITY"
        title={["SUSTAINABILITY DOESN'T END", "WHEN THE PACKAGING", "IS SOLD."]}
        intro="Replacing conventional packaging is only part of the challenge. The other half is ensuring that the material has a credible pathway after use."
        img={IMG.material}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="circular-ecosystem">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <FadeUp>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-snug text-teal sm:text-4xl">
              A circular ecosystem, built around a simple loop.
            </h2>
          </FadeUp>
          <div className="mt-10 flex flex-wrap items-center gap-3" data-testid="ecosystem-loop">
            {LOOP.map((l, i) => (
              <FadeUp key={l} delay={i * 0.08} className="flex items-center gap-3">
                <span className="rounded-full bg-teal px-6 py-3 font-display text-[0.68rem] font-bold tracking-[0.2em] text-cream">
                  {l.toUpperCase()}
                </span>
                {i < LOOP.length - 1 && <span className="font-display text-lg text-peach">→</span>}
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-2xl text-ink/60">
              Where commercially and operationally feasible, our closed-loop
              approach includes collection partnerships, material buyback and
              appropriate recovery pathways.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="mt-12 rounded-[24px] border border-peach/40 bg-[#FBF3EA] p-8 sm:p-10">
            <p className="eyebrow text-peach">CLEAR, RESPONSIBLE ENVIRONMENTAL CLAIMS</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/70">
              Plantstiks believes sustainability claims should be technically
              accurate. Compostability and biodegradability are communicated
              according to the exact material, product certification, applicable
              standard and intended end-of-life environment. This clarity matters
              for customers, regulators, consumers and the long-term credibility
              of sustainable packaging.
            </p>
          </FadeUp>
        </div>
      </section>

      <MaterialStory />
      <Decomposition />
      <FinalCTA />
    </>
  );
}
