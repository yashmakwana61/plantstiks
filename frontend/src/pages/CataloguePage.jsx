import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function CataloguePage() {
  useSEO({
    title: "Catalogue — Available on Request | Plantstiks",
    description:
      "Request the Plantstiks catalogue: preform weights (13.5g, 19g, 36g), bottle ranges, caps, labels and customization options.",
    path: "/resources/catalogue",
  });

  return (
    <>
      <PageHeader
        eyebrow="RESOURCES — CATALOGUE"
        title={["THE FULL PICTURE,", "ON REQUEST."]}
        intro="Our catalogue covers the preform family, bottle ranges with corresponding weights, necks and volumes, cap and label options, and customization."
        img={IMG.lineup}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="catalogue-body">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="relative overflow-hidden rounded-[28px] border border-ink/10">
            <img src={IMG.lineup} alt="Plantstiks catalogue cover placeholder — product family" loading="lazy" className="h-[440px] w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-teal-950/55">
              <div className="rounded-2xl border border-cream/30 bg-teal-950/70 px-8 py-5 text-center backdrop-blur-sm">
                <p className="font-display text-sm font-bold tracking-[0.24em] text-cream">PLANTSTIKS CATALOGUE</p>
                <p className="mt-2 text-xs tracking-widest text-cream/60">SHARED ON REQUEST</p>
              </div>
            </div>
          </div>
          <FadeUp delay={0.15}>
            <h2 className="font-display text-3xl font-bold leading-snug text-teal">
              Inside: preforms, bottle ranges, caps, labels and customization.
            </h2>
            <p className="mt-5 max-w-lg text-ink/60">
              We share the catalogue directly with serious enquiries — along with the
              technical documentation behind every claim on this site.
            </p>
            <Link
              to="/contact"
              data-testid="catalogue-request-cta"
              className="mt-8 inline-block rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
            >
              REQUEST THE CATALOGUE
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
