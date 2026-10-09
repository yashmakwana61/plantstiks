import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { NAV, CONTACT } from "../lib/data";
import { useContent } from "../lib/cmsContent";

const PreformGlyph = () => (
  <svg width="9" height="24" viewBox="0 0 10 26" className="text-leaf" aria-hidden="true">
    <path d="M5 4v18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <ellipse cx="5" cy="8" rx="3.2" ry="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
  </svg>
);

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const location = useLocation();
  const { nav, contact } = useContent();
  const NAV = nav;
  const CONTACT = contact;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
          <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-light border-b border-ink/10" : "bg-transparent"
        }`}
        data-testid="site-nav"
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? "py-2.5" : "py-5"
          }`}
        >
          <Link to="/" aria-label="Plantstiks home" data-testid="nav-logo-link">
            <Logo dark />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className="flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-[0.7rem] font-bold tracking-[0.22em] text-ink/70 transition-colors duration-300 hover:text-teal"
                >
                  {item.label === "Products" && (
                    <span className="opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0">
                      <PreformGlyph />
                    </span>
                  )}
                  {item.label.toUpperCase()}
                </Link>
                <div className="pointer-events-none absolute left-2 top-full w-60 translate-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass-light rounded-2xl border border-ink/10 p-2 shadow-xl shadow-teal/10">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        data-testid={`nav-sub-${sub.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        className="block rounded-xl px-4 py-2.5 font-display text-[0.7rem] font-bold tracking-[0.18em] text-ink/60 transition-colors hover:bg-teal/5 hover:text-teal"
                      >
                        {sub.label.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              data-testid="nav-cta-talk-to-us"
              className="hidden sm:inline-block rounded-full bg-teal px-6 py-2.5 font-display text-[0.7rem] font-bold tracking-[0.22em] text-cream transition-all duration-300 hover:bg-leaf"
            >
              TALK TO US
            </Link>
            <button
              onClick={() => setOpen(true)}
              data-testid="nav-menu-button"
              aria-label="Open menu"
              className="lg:hidden rounded-full border border-ink/20 p-3 text-teal"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M0 1h18M0 6h12M0 11h18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream grain lg:hidden"
            data-testid="mobile-fullscreen-menu"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <Logo dark />
              <button
                onClick={() => setOpen(false)}
                data-testid="nav-menu-close-button"
                aria-label="Close menu"
                className="rounded-full border border-ink/20 p-3 text-teal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-4" data-lenis-prevent>
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="border-b border-ink/10"
                >
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    className="flex w-full items-center justify-between py-4 font-display text-2xl font-bold text-teal"
                  >
                    {item.label}
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className={`transition-transform duration-300 ${expanded === item.label ? "rotate-45" : ""}`}
                    >
                      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.4" className="text-leaf" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      expanded === item.label ? "max-h-80 pb-4" : "max-h-0"
                    }`}
                  >
                    <Link to={item.to} className="block py-1.5 pl-3 font-display text-xs font-semibold tracking-[0.2em] text-leaf">
                      {item.label.toUpperCase()} — OVERVIEW
                    </Link>
                    {item.items.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        className="block py-1.5 pl-3 font-display text-xs font-semibold tracking-[0.2em] text-ink/60"
                      >
                        {s.label.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 space-y-3"
              >
                <Link
                  to="/contact"
                  data-testid="mobile-nav-cta"
                  className="block rounded-full bg-teal px-8 py-4 text-center font-display text-xs font-bold tracking-[0.22em] text-cream"
                >
                  TALK TO US
                </Link>
                <p className="pt-2 text-center text-xs tracking-widest text-ink/50">{CONTACT.email}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
