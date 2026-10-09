import { useEffect, Component } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ContentProvider } from "./lib/cmsContent";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CmsApp } from "./cms/CmsApp";

const SiteFrame = ({ children }) => {
  const location = useLocation();
  if (location.pathname.startsWith("/cms")) return <CmsApp />;
  return (
    <ContentProvider>
      {children}
      <WhatsAppButton />
      <Footer />
    </ContentProvider>
  );
};
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Technology from "./pages/Technology";
import MaterialPage from "./pages/MaterialPage";
import DecompositionPage from "./pages/DecompositionPage";
import TestingPage from "./pages/TestingPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplicationDetail from "./pages/ApplicationDetail";
import AboutPage from "./pages/AboutPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import ResourcesPage from "./pages/ResourcesPage";
import CataloguePage from "./pages/CataloguePage";
import TechnicalPage from "./pages/TechnicalPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";
import MaterialsPage from "./pages/MaterialsPage";
import CertificationsPage from "./pages/CertificationsPage";
import PartnersPage from "./pages/PartnersPage";
import NotFound from "./pages/NotFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error)
      return (
        <div className="flex min-h-screen items-center justify-center bg-teal px-6 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-cream">Something took root in the wrong place.</p>
            <a href="/" className="mt-6 inline-block rounded-full bg-cream px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-teal">
              RELOAD THE SITE
            </a>
          </div>
        </div>
      );
    return this.props.children;
  }
}

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (pathname.startsWith("/cms")) return undefined;
    const match = (window.__cmsRedirects || []).find((r) => r.old_path === pathname);
    if (match) {
      nav(match.new_path, { replace: true });
      return undefined;
    }
    if (hash) {
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return () => clearTimeout(t);
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollManager />
        <SiteFrame>
          <Nav />
          <main data-testid="app-main">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/preforms" element={<ProductDetail key="preforms" />} />
            <Route path="/products/bottles" element={<ProductDetail key="bottles" />} />
            <Route path="/products/caps" element={<ProductDetail key="caps" />} />
            <Route path="/products/labels" element={<ProductDetail key="labels" />} />
            <Route path="/products/jars" element={<ProductDetail key="jars" />} />
            <Route path="/products/trays" element={<ProductDetail key="trays" />} />
            <Route path="/products/customization" element={<ProductDetail key="customization" />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/manufacturing-partners" element={<PartnersPage />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/technology/material" element={<MaterialPage />} />
            <Route path="/technology/decomposition" element={<DecompositionPage />} />
            <Route path="/technology/testing" element={<TestingPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/:slug" element={<ApplicationDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/catalogue" element={<CataloguePage />} />
            <Route path="/resources/technical" element={<TechnicalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="/cookies" element={<LegalPage kind="cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
        </SiteFrame>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
