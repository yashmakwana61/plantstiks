import { useRef } from "react";
import { APPLICATIONS } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { Link } from "react-router-dom";
import { FadeUp, Eyebrow } from "../components/Reveal";

export const ApplicationsGallery = () => {
  const { applications } = useContent();
  const APPLICATIONS = applications;
  const scroller = useRef(null);
  const scrollBy = (dir) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-cream py-24 lg:py-36" data-testid="applications-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>APPLICATIONS</Eyebrow>
            <FadeUp delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
                WHERE CAN
                <br />
                PLANTSTIKS GO?
              </h2>
            </FadeUp>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-2 hidden font-display text-[0.62rem] font-bold tracking-[0.24em] text-ink/40 sm:block">
              DRAG / SCROLL
            </span>
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => scrollBy(d)}
                data-testid={`applications-scroll-${d === -1 ? "prev" : "next"}`}
                aria-label={d === -1 ? "Scroll applications left" : "Scroll applications right"}
                className="rounded-full border border-ink/15 p-4 text-ink/60 transition-all duration-300 hover:border-teal hover:bg-teal hover:text-cream"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: d === -1 ? "rotate(180deg)" : "none" }}>
                  <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 lg:px-12"
        data-testid="applications-track"
      >
        {APPLICATIONS.map((a, i) => (
          <Link
            key={a.slug}
            to={`/applications/${a.slug}`}
            data-testid={`application-card-${a.slug}`}
            className="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-teal-900 sm:w-[320px]"
          >
            <img
              src={a.img}
              alt={`${a.name} — Plantstiks plant-based packaging application`}
              loading="lazy"
              className="h-[440px] w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="font-display text-[0.6rem] font-bold tracking-[0.24em] text-peach">
                PREFORM {a.preform}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-cream">{a.name}</h3>
              <p className="mt-1 text-sm text-cream/70">{a.tagline}</p>
              <div className="mt-3 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-24">
                <p className="border-t border-cream/20 pt-3 text-xs leading-relaxed text-cream/60">{a.note}</p>
              </div>
            </div>
            <span className="absolute right-6 top-6 font-display text-xs font-bold text-cream/40">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
