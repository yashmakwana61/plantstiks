import { cloneElement } from "react";
import { Hero } from "../sections/Hero";
import { Marquee } from "../components/Marquee";
import { SafeSplit } from "../sections/SafeSplit";
import { MaterialStory } from "../sections/MaterialStory";
import { PreformLab } from "../sections/PreformLab";
import { Configurator } from "../sections/Configurator";
import { Performance } from "../sections/Performance";
import { Science } from "../sections/Science";
import { ForBrands } from "../sections/ForBrands";
import { Decomposition } from "../sections/Decomposition";
import { ApplicationsGallery } from "../sections/Applications";
import { Scale } from "../sections/Scale";
import { Trust } from "../sections/Trust";
import { Why } from "../sections/Why";
import { Partnership } from "../sections/Partnership";
import { Industries } from "../sections/Industries";
import { AboutSection } from "../sections/AboutSection";
import { FinalCTA } from "../sections/FinalCTA";
import { ContactSection } from "../sections/ContactSection";
import { useSEO } from "../lib/seo";
import { useContent } from "../lib/cmsContent";

const SECTION_MAP = {
  hero: (cms) => <Hero cmsHero={cms.hero} />,
  marquee: (cms) => <Marquee items={cms.marqueeItems} />,
  network: () => <SafeSplit />,
  material_story: () => <MaterialStory />,
  preform_selector: () => <PreformLab />,
  configurator: () => <Configurator />,
  performance: () => <Performance />,
  science: () => <Science />,
  for_brands: () => <ForBrands />,
  decomposition: () => <Decomposition />,
  applications: () => <ApplicationsGallery />,
  global_markets: () => <Scale />,
  trust: () => <Trust />,
  why: () => <Why />,
  from_material_to_market: () => <Partnership />,
  industries: () => <Industries />,
  about: () => <AboutSection />,
  final_cta: () => <FinalCTA />,
  contact: () => <ContactSection />,
};

const DEFAULT_ORDER = [
  "hero", "marquee", "network", "material_story", "preform_selector", "configurator",
  "performance", "science", "for_brands", "decomposition", "applications", "global_markets",
  "trust", "why", "from_material_to_market", "industries", "about", "final_cta", "contact",
];

export default function Home() {
  useSEO({
    title: "Plantstiks | Compostable & Plant-Based Packaging Solutions India & Global",
    description:
      "Plantstiks develops advanced plant-based materials and compostable packaging including bottles, preforms, caps, containers, trays, cups, labels and custom packaging solutions for businesses in India and global markets.",
    path: "/",
  });

  const cms = useContent();
  const visible = cms.sections
    ? cms.sections.filter((s) => s.visible)
    : DEFAULT_ORDER.map((k) => ({ key: k }));

  return (
    <div data-testid="cms-driven-home">
      {visible.map((s) => {
        const fn = SECTION_MAP[s.key];
        const el = fn ? fn(cms) : null;
        return el ? cloneElement(el, { key: s.key }) : null;
      })}
    </div>
  );
}
