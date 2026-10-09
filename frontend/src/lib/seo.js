import { useEffect } from "react";
import { useContent } from "./cmsContent";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const DOMAIN = "https://www.plantstiksbottle.in";

export const useSEO = ({ title, description, path, jsonLd }) => {
  const { ready } = useContent();

  useEffect(() => {
    const cms = (typeof window !== "undefined" && window.__cmsPageSeo?.[path]) || {};
    const t = cms.title || title;
    const desc = cms.meta_description || description;
    const canonical = cms.canonical
      ? cms.canonical.startsWith("http")
        ? cms.canonical
        : `${DOMAIN}${cms.canonical}`
      : path
        ? `${DOMAIN}${path}`
        : null;
    const ogImg = cms.og_image ? `${API}/media/${cms.og_image}` : null;

    const setMeta = (selector, attr, val) => {
      let el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, val);
      else {
        const m = document.createElement("meta");
        const [kind, key] = selector.replace(/[\[\]']/g, "").split("=");
        m.setAttribute(kind, key);
        m.setAttribute(attr, val);
        document.head.appendChild(m);
      }
    };
    if (t) document.title = t;
    if (desc) setMeta('meta[name="description"]', "content", desc);
    if (t) setMeta('meta[property="og:title"]', "content", t);
    if (desc) setMeta('meta[property="og:description"]', "content", desc);
    if (ogImg) setMeta('meta[property="og:image"]', "content", ogImg);
    if (cms.no_index) setMeta('meta[name="robots"]', "content", "noindex");
    if (canonical) {
      setMeta('meta[property="og:url"]', "content", canonical);
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
    let script = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [title, description, path, jsonLd, ready]);
};
