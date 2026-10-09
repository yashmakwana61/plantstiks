import { createContext, useContext, useEffect, useState } from "react";
import { IMG } from "./images";
import { NAV, PREFORMS, APPLICATIONS, INDUSTRIES, DOCS, FAQS, CONTACT } from "./data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
let cache = null;
let pending = null;

const STATIC_TAG = { "13.5": "LIGHTWEIGHT APPLICATIONS", "19": "BALANCED PERFORMANCE", "36": "HIGHER STRENGTH" };

export const mediaUrl = (id) => (id ? `${API}/media/${id}` : null);

export const defaults = () => ({
  nav: NAV,
  contact: CONTACT,
  footer: null,
  preforms: PREFORMS.map((p) => ({ ...p, image: IMG.preform })),
  applications: APPLICATIONS,
  industries: INDUSTRIES,
  docs: DOCS,
  faqs: FAQS,
  products: [],
  pageSeo: {},
  hero: null,
  marqueeItems: null,
  sections: null,
  ready: false,
});

async function fetchContent() {
  if (cache) return cache;
  if (!pending) {
    pending = fetch(`${API}/content`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("cms unavailable"))))
      .then((d) => {
        cache = mapContent(d);
        window.__cmsRedirects = d.redirects || [];
        return cache;
      })
      .catch(() => defaults());
  }
  return pending;
}

function mapContent(d) {
  const settings = d.settings || {};
  const contact = settings.contact
    ? {
        address: settings.contact.address_lines?.length ? settings.contact.address_lines : CONTACT.address,
        phones: settings.contact.phones_display?.length ? settings.contact.phones_display : CONTACT.phones,
        phonesRaw: settings.contact.phones?.length ? settings.contact.phones : CONTACT.phonesRaw,
        email: settings.contact.email || CONTACT.email,
        website: settings.contact.website || CONTACT.website,
      }
    : CONTACT;

  const nav = (d.navigation?.items || [])
    .filter((i) => i.enabled !== false)
    .map((i) => ({ label: i.label, to: i.to, items: (i.items || []).filter((s) => s.enabled !== false) }));

  const preforms = (d.preforms?.length ? d.preforms : []).map((p) => ({
    id: p._id,
    weight: p.weight_grams != null ? `${p.weight_grams}g` : p.name,
    tag: (p.tagline || STATIC_TAG[String(p.weight_grams)] || "PLANT-BASED PREFORM").toUpperCase(),
    range: p.volume_range || "",
    apps: p.use_cases || [],
    note: p.notes || "",
    image: p.image ? mediaUrl(p.image) : IMG.preform,
  }));

  const appStatic = {
    water: { img: IMG.water, preform: "Custom" }, beverages: { img: IMG.lineup, preform: "Custom" },
    "personal-care": { img: IMG.cosmetic, preform: "Custom" }, pharma: { img: IMG.pharma, preform: "Custom" },
    fmcg: { img: IMG.caps, preform: "Custom" }, hospitality: { img: IMG.refill, preform: "Custom" },
    institutional: { img: IMG.household, preform: "Custom" }, "food-packaging": { img: IMG.edible, preform: "Thermoformed" },
  };
  const applications = (d.applications?.length ? d.applications : APPLICATIONS).map((a) => ({
    slug: a.slug,
    name: a.name,
    tagline: a.short_description || "",
    img: a.hero_image ? mediaUrl(a.hero_image) : (appStatic[a.slug]?.img || IMG.lineup),
    preform: a.hero_image ? "Custom" : (appStatic[a.slug]?.preform || "Custom"),
    note: a.long_description || "",
  }));

  const industries = applications.map((a) => {
    const st = INDUSTRIES.find((i) => i.name === a.name.toUpperCase());
    return st
      ? { ...st, line: a.note || st.line, img: a.img || st.img }
      : { name: a.name.toUpperCase(), img: a.img, tint: "#013736", line: a.tagline };
  });

  const docs = (d.documents?.length ? d.documents : DOCS.map((x) => ({ ...x, points: x.points || [] }))).map((dd) => ({
    id: dd._id || dd.id,
    category: dd.category,
    title: dd.name || dd.title,
    lab: dd.organization || dd.lab || "",
    summary: dd.summary,
    points: dd.points || [],
  }));

  const faqs = (d.faqs?.length ? d.faqs : FAQS).map((f) => ({ q: f.question, a: f.answer }));

  const products = (d.products || []).map((p) => ({
    id: p._id,
    name: p.name || "",
    slug: p.slug || "",
    type: p.type || "other",
    short: p.short_description || "",
    body: p.long_description || "",
    img: p.images?.length ? mediaUrl(p.images[0]) : (p.gallery?.length ? mediaUrl(p.gallery[0]) : null),
  }));

  const pageSeo = {};
  (d.pages || []).forEach((p) => {
    if (p.slug) pageSeo[p.slug] = p.seo || {};
  });
  window.__cmsPageSeo = pageSeo;

  const sections = (d.home_sections || []).sort((a, b) => a.order - b.order);
  const hero = sections.find((s) => s.key === "hero")?.content || null;
  const marqueeItems = sections.find((s) => s.key === "marquee")?.content?.items || null;

  return {
    nav: nav.length ? nav : NAV,
    contact,
    footer: d.footer
      ? {
          description: d.footer.description,
          columns: d.footer.columns || [],
          legal: d.footer.legal || [],
          newsletter_cta: d.footer.newsletter_cta,
        }
      : null,
    preforms: preforms.length ? preforms : defaults().preforms,
    applications: applications.length ? applications : defaults().applications,
    industries: industries.length ? industries : defaults().industries,
    docs: docs.length ? docs : defaults().docs,
    faqs: faqs.length ? faqs : defaults().faqs,
    products,
    pageSeo,
    hero,
    marqueeItems,
    sections: sections.length ? sections : null,
    settings,
    ready: true,
  };
}

const Ctx = createContext(defaults());

export const ContentProvider = ({ children }) => {
  const [data, setData] = useState(defaults());
  useEffect(() => {
    fetchContent().then((d) => setData((prev) => ({ ...prev, ...d, ready: true })));
  }, []);
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
};

export const useContent = () => useContext(Ctx);
