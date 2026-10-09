import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHeader } from "../components/PageHeader";
import { APPLICATIONS } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";

export default function ApplicationsPage() {
  const { applications } = useContent();
  const APPLICATIONS = applications;
  useSEO({
    title: "Applications — Water, Beverages, Personal Care, Pharma | Plantstiks",
    description:
      "Where Plantstiks goes: water, beverages, personal care, FMCG, pharmaceuticals, household liquids, edible liquids and refill packs — all on plant-based preforms.",
    path: "/applications",
  });

  return (
    <>
      <PageHeader
        eyebrow="APPLICATIONS"
        title={["ONE MATERIAL.", "MANY SHELVES."]}
        intro="From single-serve water to refill packs — preforms sized and tested for the categories that move."
        img={IMG.lineup}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="applications-grid">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
          {APPLICATIONS.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/applications/${a.slug}`}
                data-testid={`applications-page-card-${a.slug}`}
                className="group relative block h-96 overflow-hidden rounded-[28px] bg-teal-900"
              >
                <img
                  src={a.img}
                  alt={`${a.name} — Plantstiks plant-based packaging`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[0.6rem] font-bold tracking-[0.24em] text-peach">PREFORM {a.preform}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-cream">{a.name}</h2>
                  <p className="mt-1 text-sm text-cream/65">{a.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
