import { useParams, Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { FadeUp, RevealImage } from "../components/Reveal";
import { PreformLab } from "../sections/PreformLab";
import { Configurator } from "../sections/Configurator";
import { Performance } from "../sections/Performance";
import { useSEO } from "../lib/seo";
import { IMG } from "../lib/images";
import { useContent } from "../lib/cmsContent";

const SCHEMA_NAME = {
  preforms: "Compostable Preforms",
  bottles: "Compostable Bottles",
  caps: "Plant-Based Caps & Closures",
  labels: "Plant-Based Labels, Films & Shrink",
  jars: "Plant-Based Jars & Containers",
  trays: "Thermoformed Trays, Cups & Lids",
  customization: "Custom Plant-Based Packaging",
};

const CONTENT = {
  preforms: {
    eyebrow: "PRODUCT — PREFORMS",
    title: ["FROM PREFORM", "TO POSSIBILITY."],
    intro: "Plant-based preforms designed for scalable bottle manufacturing. Plantstiks works with manufacturers and brands to develop preform weights, neck configurations and bottle designs based on product and processing requirements.",
    body: "Plantstiks preforms are developed for scalable bottle manufacturing — weights, neck configurations and bottle designs engineered around your product and processing requirements.",
    img: IMG.preform,
  },
  bottles: {
    eyebrow: "PRODUCT — COMPOSTABLE BOTTLES",
    title: ["BOTTLES", "BUILT FROM PLANTS."],
    intro: "Plant-based bottles engineered for water, beverages, hospitality, personal care, nutraceutical, pharmaceutical and other selected applications. Available in multiple capacities, shapes, neck finishes, colours and custom designs.",
    body: "From packaged drinking water and hospitality bottles to personal care and pharmaceutical formats — multiple capacities, shapes, neck finishes, colours and custom designs.",
    img: IMG.lineup,
  },
  caps: {
    eyebrow: "PRODUCT — CAPS & CLOSURES",
    title: ["THE FINISHING", "TOUCH."],
    intro: "A sustainable bottle needs more than a sustainable body. Plantstiks develops plant-based cap and closure solutions engineered to complement bottles and preforms while maintaining functionality, sealing and brand compatibility.",
    body: "Plantstiks cap and closure solutions are developed to complete the system — functionality, sealing and brand compatibility included.",
    img: IMG.caps,
  },
  jars: {
    eyebrow: "PRODUCT — JARS & CONTAINERS",
    title: ["RIGID PACKAGING,", "PLANT-BASED."],
    intro: "Plant-based rigid packaging for food products, dry foods, nutraceuticals, personal care, cosmetics, hospitality, FMCG and specialty applications. Custom shapes, sizes and material grades can be developed based on product requirements.",
    body: "From dry foods to cosmetics — plant-based rigid packaging developed around the product it protects.",
    img: IMG.lineup,
  },
  trays: {
    eyebrow: "PRODUCT — TRAYS, CUPS & LIDS",
    title: ["THERMOFORMED,", "NOT FORMULATED", "FROM FOSSILS."],
    intro: "Plantstiks material technology can be processed into thermoformed packaging such as food trays, clamshell containers, cups, lids, deli containers, produce packaging, takeaway packaging and institutional food packaging.",
    body: "Plant-based material, processed into thermoformed formats — from food trays to takeaway packaging.",
    img: IMG.lab,
  },
  labels: {
    eyebrow: "PRODUCT — LABELS, FILMS & SHRINK",
    title: ["SUSTAINABILITY SHOULD", "STOP AT NOTHING."],
    intro: "Packaging sustainability should not stop at the container. Plantstiks is developing an integrated packaging ecosystem covering bottles, closures, labels, films and other components — helping brands transition toward more complete sustainable packaging systems.",
    body: "Labels, films and shrink solutions — part of an integrated packaging ecosystem, not an afterthought.",
    img: IMG.cosmetic,
  },
  customization: {
    eyebrow: "PRODUCT — CUSTOMIZATION",
    title: ["SHAPE, SIZE, SHADE.", "YOUR CALL."],
    intro: "Shape, size, colour, material finish, label and cap — the system is built to be configured around your product.",
    body: "From custom shades to bespoke formats, customization is not an afterthought — it is how the system was designed.",
    img: IMG.material,
  },
};

export default function ProductDetail() {
  const { product } = useParams();
  const { products } = useContent();
  const base = CONTENT[product] || CONTENT.bottles;
  const cmsP = products.find((p) => p.slug === `/products/${product}` || p.slug === product);
  const c = cmsP
    ? { ...base, intro: cmsP.short || base.intro, body: cmsP.body || base.body, img: cmsP.img || base.img }
    : base;

  useSEO({
    title: `Plantstiks ${c.eyebrow.split("— ")[1]} — Plant-Based Packaging`,
    description: c.intro,
    path: `/products/${product}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Plantstiks ${SCHEMA_NAME[product] || "Plant-Based Packaging"}`,
      description: c.intro,
      brand: { "@type": "Brand", name: "Plantstiks" },
      material: "PLA — Poly Lactic Acid (plant-based)",
    },
  });

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} img={c.img} />

      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <RevealImage className="rounded-[28px]">
            <img src={c.img} alt={`Plantstiks ${product}`} className="h-[420px] w-full rounded-[28px] object-cover" loading="lazy" />
          </RevealImage>
          <FadeUp delay={0.15}>
            <p className="font-display text-2xl font-semibold leading-relaxed text-teal sm:text-3xl">{c.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                data-testid={`product-${product}-cta`}
                className="rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
              >
                TALK TO PLANTSTIKS
              </Link>
              <Link
                to="/products/preforms"
                data-testid={`product-${product}-preforms-link`}
                className="rounded-full border border-ink/20 px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-teal transition-colors duration-300 hover:border-teal"
              >
                SEE PREFORMS
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {product === "preforms" && <PreformLab />}
      {(product === "bottles" || product === "customization") && <Configurator />}
      {product === "preforms" && <Performance />}
    </>
  );
}
