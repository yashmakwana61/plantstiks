import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { Configurator } from "../sections/Configurator";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";
import { useContent } from "../lib/cmsContent";

const FAMILIES = [
  {
    name: "PREFORMS",
    type: "preform",
    to: "/products/preforms",
    img: IMG.preform,
    d: "13.5g, 19g and 36g — plant-based preforms engineered for strength and clarity.",
  },
  {
    name: "BOTTLES",
    type: "bottle",
    to: "/products/bottles",
    img: IMG.lineup,
    d: "Coloured, milky white, amber and custom shades — a bottle family for daily formats.",
  },
  {
    name: "CAPS",
    type: "cap",
    to: "/products/caps",
    img: IMG.caps,
    d: "Cap options that finish the system — matched to your bottle and brand.",
  },
  {
    name: "LABELS",
    type: "label",
    to: "/products/labels",
    img: IMG.cosmetic,
    d: "Waterproof paper adhesive, transparent adhesive and shrink wrap.",
  },
  {
    name: "CUSTOMIZATION",
    type: "other",
    to: "/products/customization",
    img: IMG.material,
    d: "Shape, size, colour, finish, label and cap — built around your product.",
  },
];

export default function Products() {
  const { products } = useContent();

  const families = FAMILIES.map((f) => {
    const cms = products.find((p) => p.type === f.type && (p.img || p.short));
    return cms ? { ...f, img: cms.img || f.img, d: cms.short || f.d } : f;
  });

  useSEO({
    title: "Products — Plantstiks Preforms, Bottles, Caps & Labels",
    description:
      "The Plantstiks product system: 100% plant-based preforms (13.5g, 19g, 36g), bottles, caps and labels — customizable from shape to shade.",
    path: "/products",
  });

  return (
    <>
      <PageHeader
        eyebrow="PRODUCTS"
        title={["ONE SYSTEM.", "EVERY PART PLANT-BASED."]}
        intro="Bottle, cap, label and preform — designed together as a single plant-based packaging system, not assembled from parts."
        img={IMG.lineup}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="products-overview">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {families.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <Link
                  to={f.to}
                  data-testid={`products-card-${f.name.toLowerCase()}`}
                  className="group relative block h-80 overflow-hidden rounded-[28px] bg-teal-900 sm:h-96"
                >
                  <img
                    src={f.img}
                    alt={`Plantstiks ${f.name.toLowerCase()}`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h2 className="font-display text-2xl font-bold tracking-[0.08em] text-cream">{f.name}</h2>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/65">{f.d}</p>
                    <span className="mt-4 inline-block font-display text-[0.62rem] font-bold tracking-[0.24em] text-peach opacity-0 transition-all duration-500 group-hover:opacity-100">
                      EXPLORE →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Configurator />
    </>
  );
}
