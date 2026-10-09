import { IMG } from "./images";

export const CONTACT = {
  address: ["Siddhraj Z Square,", "East-307, Kudasan,", "Gandhinagar – 382421"],
  phones: ["93139 38006", "88002 11680"],
  phonesRaw: ["9313938006", "8800211680"],
  email: "business@plantstiksbottle.in",
  website: "www.plantstiksbottle.in",
};

export const NAV = [
  {
    label: "Products",
    to: "/products",
    items: [
      { label: "Compostable Bottles", to: "/products/bottles" },
      { label: "Preforms", to: "/products/preforms" },
      { label: "Caps & Closures", to: "/products/caps" },
      { label: "Jars & Containers", to: "/products/jars" },
      { label: "Custom Packaging", to: "/products/customization" },
    ],
  },
  {
    label: "Technology",
    to: "/technology",
    items: [
      { label: "Materials", to: "/materials" },
      { label: "Plant-Based Material", to: "/technology/material" },
      { label: "Performance", to: "/technology#performance" },
      { label: "Decomposition", to: "/technology/decomposition" },
      { label: "Testing & Validation", to: "/technology/testing" },
      { label: "Certifications", to: "/certifications" },
    ],
  },
  {
    label: "Applications",
    to: "/applications",
    items: [
      { label: "Water", to: "/applications/water" },
      { label: "Hospitality", to: "/applications/hospitality" },
      { label: "Personal Care", to: "/applications/personal-care" },
      { label: "Pharma", to: "/applications/pharma" },
      { label: "FMCG", to: "/applications/fmcg" },
    ],
  },
  {
    label: "Network",
    to: "/manufacturing-partners",
    items: [
      { label: "Manufacturing Partners", to: "/manufacturing-partners" },
      { label: "From Material to Market", to: "/technology" },
      { label: "Global Markets", to: "/about#scale" },
      { label: "Partner With Us", to: "/manufacturing-partners" },
    ],
  },
  {
    label: "About",
    to: "/about",
    items: [
      { label: "Our Story", to: "/about" },
      { label: "Our Journey", to: "/about#journey" },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Certifications", to: "/certifications" },
      { label: "FAQs", to: "/resources#faqs" },
    ],
  },
  {
    label: "Resources",
    to: "/resources",
    items: [
      { label: "Catalogue", to: "/resources/catalogue" },
      { label: "Technical Documents", to: "/resources/technical" },
      { label: "FAQs", to: "/resources#faqs" },
    ],
  },
];

export const JOURNEY = [
  {
    id: "plant",
    step: "01",
    label: "PLANT",
    title: "It begins in a field.",
    copy: "Sugarcane cellulose and corn starch replace oil as the raw material.",
    img: IMG.feedstock,
  },
  {
    id: "material",
    step: "02",
    label: "MATERIAL",
    title: "Plants become material.",
    copy: "Refined plant cellulose becomes a resin pellet — the base of every Plantstiks product.",
    img: IMG.material,
  },
  {
    id: "preform",
    step: "03",
    label: "PREFORM",
    title: "The DNA of every bottle.",
    copy: "Small, precise preforms engineered for strength, clarity and conversion.",
    img: IMG.preform,
  },
  {
    id: "bottle",
    step: "04",
    label: "BOTTLE",
    title: "Stretch. Bloom. Bottle.",
    copy: "Heat and stretch turn the preform into a finished bottle, ready for the line.",
    img: IMG.heroBottle,
  },
  {
    id: "product",
    step: "05",
    label: "PRODUCT",
    title: "On the shelf.",
    copy: "Filled, capped, labelled, shipped — performance your line already knows.",
    img: IMG.water,
  },
  {
    id: "planet",
    step: "06",
    label: "PLANET",
    title: "Designed to return.",
    copy: "At end of life, the material goes back to nature. Because we planned it that way.",
    img: IMG.decomposition,
  },
];

export const PREFORMS = [
  {
    id: "13-5",
    weight: "13.5g",
    tag: "LIGHTWEIGHT APPLICATIONS",
    range: "~150ml – 500ml",
    apps: ["Samples", "Travel packs", "Single-serve bottles"],
    note: "Material-efficient preform for small-format bottles where clarity matters most.",
  },
  {
    id: "19",
    weight: "19g",
    tag: "BALANCED PERFORMANCE",
    range: "~200ml – 1L",
    apps: ["Water", "Beverages", "Personal care"],
    note: "The workhorse of the family — a balance of strength, clarity and material use.",
  },
  {
    id: "36",
    weight: "36g",
    tag: "HIGHER STRENGTH",
    range: "~500ml – 2L",
    apps: ["Bulk water", "Edible liquids", "Refill packs"],
    note: "Built for larger volumes and heavier fill loads, without losing plant-based integrity.",
  },
];

export const SPECS = [
  { k: "HIGH-QUALITY PREFORMS", v: "Strength and clarity", d: "Precise preforms engineered for consistent conversion." },
  { k: "CUSTOMIZABLE", v: "Shape, size and branding", d: "Coloured, milky white, amber and custom shades." },
  { k: "BLUISH TONE", v: "In daylight", d: "A distinctive, premium cast in natural light." },
  { k: "FOOD GRADE", v: "0% migration", d: "As stated in the Plantstiks catalogue." },
  { k: "TEMPERATURE STABILITY", v: "−20°C to +55°C", d: "Documented working range for the material." },
  { k: "TESTED", v: "1 year, Indian atmosphere", d: "Real-condition exposure across a full year." },
];

export const DOCS = [
  {
    id: "cipet",
    category: "MATERIAL",
    title: "CIPET — Material Identification",
    lab: "CIPET",
    summary:
      "The tested sample is identified as a PLA bottle. Material identification reports Poly Lactic Acid (PLA).",
    points: ["Sample identified: PLA bottle", "Material identification: Poly Lactic Acid (PLA)"],
  },
  {
    id: "iip-migration",
    category: "MIGRATION",
    title: "Indian Institute of Packaging — Specific Migration",
    lab: "Indian Institute of Packaging",
    summary:
      "The sample is identified as PLA and specific migration testing was carried out. The listed requirements are marked “Complies”.",
    points: ["Sample identified: PLA", "Specific migration testing conducted", "Listed requirements: Complies"],
  },
  {
    id: "compliance",
    category: "TECHNICAL TESTING",
    title: "Compliance Results — Tested Parameters",
    lab: "Test report",
    summary:
      "Report lists PLA as the material and shows compliance results for the tested parameters.",
    points: ["Material listed: PLA", "Compliance results reported for tested parameters"],
  },
  {
    id: "food-safety",
    category: "FOOD SAFETY",
    title: "Food-Grade Documentation",
    lab: "Available on request",
    summary:
      "Catalogue states 0% migration. Full food-safety documentation can be shared for your evaluation.",
    points: ["Catalogue statement: 0% migration", "Full documentation on request"],
  },
  {
    id: "biodeg",
    category: "BIODEGRADABILITY",
    title: "Biodegradability Dossier",
    lab: "Available on request",
    summary:
      "The material is plant-based and biodegradable. We share documented evidence with serious enquiries — we do not publish timelines we cannot support.",
    points: ["Plant-based material", "Evidence shared on request"],
  },
  {
    id: "compost",
    category: "COMPOSTABILITY",
    title: "Compostability Documentation",
    lab: "Available on request",
    summary:
      "Industrially compostable packaging system. Documentation is shared contextually with the relevant certificates for your market.",
    points: ["Industrially compostable", "Certificates shared contextually"],
  },
];

export const APPLICATIONS = [
  { slug: "water", name: "Packaged Drinking Water", tagline: "Differentiated, sustainable water packaging.", img: IMG.water, preform: "PLA", note: "Plant-based bottles, preforms and caps for water brands." },
  { slug: "hospitality", name: "Hospitality", tagline: "Premium bottles for hotels and events.", img: IMG.refill, preform: "Custom", note: "Custom branded plant-based water bottles for hotels, resorts, restaurants, cafés, events and institutions." },
  { slug: "beverages", name: "Still Beverages & Juices", tagline: "Fresh from fill to fridge.", img: IMG.lineup, preform: "Custom", note: "Bottle formats for juices and selected beverage applications." },
  { slug: "personal-care", name: "Personal Care & Cosmetics", tagline: "Premium you can hold.", img: IMG.cosmetic, preform: "Custom", note: "Custom bottles, jars, caps and containers designed around branding, functionality and sustainability." },
  { slug: "pharma", name: "Pharmaceuticals & Nutraceuticals", tagline: "Validated before it ships.", img: IMG.pharma, preform: "Custom", note: "Plant-based rigid packaging developed subject to required compatibility, stability and regulatory validation." },
  { slug: "fmcg", name: "FMCG", tagline: "Built for scale.", img: IMG.caps, preform: "Custom", note: "Custom plant-based packaging development for brands reducing dependence on fossil-based packaging." },
  { slug: "institutional", name: "Corporate & Institutional", tagline: "Measurable alternatives, at campus scale.", img: IMG.household, preform: "Custom", note: "Sustainable packaging programs for organizations, universities, campuses, events and institutions." },
  { slug: "food-packaging", name: "Food & Beverage", tagline: "Formats for every counter.", img: IMG.edible, preform: "Thermoformed", note: "Bottles, cups, trays, containers, lids and other selected food and beverage formats." },
];

export const INDUSTRIES = [
  { name: "PACKAGED DRINKING WATER", img: IMG.water, tint: "#01262C", line: "Plant-based bottles, preforms and caps for water brands seeking differentiated sustainable packaging." },
  { name: "HOSPITALITY", img: IMG.refill, tint: "#2A3324", line: "Premium plant-based water bottles and custom branded packaging for hotels, resorts, restaurants, cafés, events and institutions." },
  { name: "FOOD & BEVERAGE", img: IMG.edible, tint: "#3A2E24", line: "Bottles, cups, trays, containers and lids for selected food and beverage applications." },
  { name: "FMCG", img: IMG.caps, tint: "#013736", line: "Custom plant-based packaging development for brands reducing dependence on conventional fossil-based packaging." },
  { name: "PERSONAL CARE & COSMETICS", img: IMG.cosmetic, tint: "#3A2E24", line: "Custom bottles, jars, caps and containers designed around branding, functionality and sustainability." },
  { name: "PHARMACEUTICALS & NUTRACEUTICALS", img: IMG.pharma, tint: "#1C2B33", line: "Plant-based rigid packaging, developed subject to compatibility, stability and regulatory validation." },
  { name: "CORPORATE & INSTITUTIONAL", img: IMG.household, tint: "#123028", line: "Sustainable packaging programs for organizations, universities, campuses and events." },
];

export const WHY = [
  { n: "01", t: "MATERIAL INNOVATION", d: "A technology platform built around material development rather than a single finished product." },
  { n: "02", t: "PROPRIETARY FORMULATIONS", d: "Polymer blends and processing know-how developed for different packaging applications." },
  { n: "03", t: "PACKAGING ENGINEERING", d: "Support from material selection through preform and finished-pack design." },
  { n: "04", t: "SCALABLE MANUFACTURING", d: "A certified manufacturing network designed to enable regional production through qualified partners." },
  { n: "05", t: "CUSTOM DEVELOPMENT", d: "Solutions developed around product, volume, filling process, performance requirements and market." },
  { n: "06", t: "INDIA + GLOBAL CAPABILITY", d: "An Indian material technology company developing solutions for domestic and international markets." },
];

export const STEPS = [
  { n: "01", t: "Material Development", d: "Identify the application's functional, processing and sustainability requirements and develop an appropriate plant-based formulation." },
  { n: "02", t: "Product Engineering", d: "Select or design the bottle, preform, cap, container or packaging geometry around customer requirements." },
  { n: "03", t: "Manufacturing Trials", d: "Process the material on commercial equipment — injection moulding, injection stretch blow moulding, extrusion or thermoforming." },
  { n: "04", t: "Testing & Validation", d: "Evaluate applicable performance, compatibility and regulatory requirements." },
  { n: "05", t: "Certified Manufacturing", d: "Transfer approved formulations and processes to authorized partners under Plantstiks specifications, SOPs and quality requirements." },
  { n: "06", t: "Commercial Deployment", d: "Work with brands and B2B customers to move validated packaging into commercial supply." },
  { n: "07", t: "Collection & End-of-Life", d: "Where practical, build closed-loop collection, buyback and appropriate recovery pathways." },
];

export const PARTNER_EVAL = [
  "Machine configuration", "Installed capacity", "Location", "Existing product categories",
  "Quality systems", "Technical capabilities", "Trial readiness", "Market potential",
];

export const BRAND_PARAMS = [
  "Product being packed", "Pack size", "Annual / monthly quantity", "Filling temperature",
  "Storage conditions", "Required shelf life", "Barrier requirements", "Bottle / container geometry",
  "Cap / closure requirement", "Printing and labelling", "Transportation conditions", "End market",
  "Applicable regulatory requirements",
];

export const REGIONS = ["India", "Middle East", "Europe", "North America", "Africa", "Asia-Pacific"];

export const TIMELINE = [
  { year: "2022", t: "The Beginning", d: "The journey began with Greenevon and R&D focused on alternatives to conventional packaging." },
  { year: "2024", t: "Product Development", d: "Plant-based bottle, cap and label solutions moved from development toward commercial applications." },
  { year: "2025", t: "Market Validation", d: "Customer trials, industry validation and commercial deployment expanded across different markets." },
  { year: "2026", t: "Plantstiks International", d: "Expanding beyond finished-product manufacturing toward a Material Technology + Certified Manufacturing Network model." },
];

export const CERTS = [
  { k: "IS/ISO 17088:2021", d: "Relevant Indian specification for compostable plastics." },
  { k: "CPCB Requirements", d: "Applicable Indian regulatory requirements for compostable plastic products and entities." },
  { k: "CIPET Testing", d: "Material and finished-product testing depending on scope." },
  { k: "EN 13432", d: "European compostability framework where applicable." },
  { k: "ASTM D6400", d: "North American compostability framework where applicable." },
];

export const FAQS = [
  {
    q: "What is Plantstiks?",
    a: "Plantstiks is an advanced material and packaging technology company developing plant-based material formulations and sustainable packaging solutions including bottles, preforms, caps, containers, trays, cups and other packaging applications.",
  },
  {
    q: "Does Plantstiks manufacture biodegradable bottles?",
    a: "Plantstiks develops plant-based and compostable bottle solutions using materials and proprietary formulations selected according to the application. The exact environmental claim depends on the material grade, certification and applicable end-of-life conditions.",
  },
  {
    q: "What materials does Plantstiks use?",
    a: "Our technology platform works with plant-based and compostable polymers including PLA, PHA and proprietary blends developed for different packaging applications.",
  },
  {
    q: "Are Plantstiks bottles compostable?",
    a: "Specific Plantstiks products can be designed using compostable materials. Compostability should be assessed according to the exact material/product certification and applicable standard rather than making a blanket claim across every product.",
  },
  {
    q: "What is PLA packaging?",
    a: "PLA, or polylactic acid, is a bio-based polymer commonly derived from renewable feedstocks and used in various packaging applications. End-of-life claims depend on the specific grade and certified conditions.",
  },
  {
    q: "What is PHA packaging?",
    a: "PHA refers to a family of biopolymers produced through biological processes. PHA materials are increasingly explored for sustainable packaging applications because of their bio-based origin and potential end-of-life advantages.",
  },
  {
    q: "Does Plantstiks provide custom packaging?",
    a: "Yes. Plantstiks can work with brands on custom materials, bottle designs, preforms, containers, caps, moulds and other packaging formats subject to technical feasibility and commercial volumes.",
  },
  {
    q: "Can Plantstiks supply internationally?",
    a: "Plantstiks is developing its supply and manufacturing network for customers in India and international markets. Export requirements are evaluated based on destination, product, volume, certification and logistics.",
  },
  {
    q: "Can existing packaging manufacturers work with Plantstiks?",
    a: "Yes. Qualified manufacturers with compatible injection moulding, preform, bottle blowing, extrusion, thermoforming or related infrastructure can apply to join the Plantstiks manufacturing network.",
  },
  {
    q: "Can I request samples?",
    a: "Yes. Businesses can submit their product, volume and packaging requirements to the Plantstiks team for sample availability, development options and commercial quotation.",
  },
];
