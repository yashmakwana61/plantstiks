import { useParams, Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { APPLICATIONS } from "../lib/data";
import { useContent } from "../lib/cmsContent";
import { useSEO } from "../lib/seo";
import { Navigate } from "react-router-dom";

export default function ApplicationDetail() {
  const { applications } = useContent();
  const APPLICATIONS = applications;
  const { slug } = useParams();
  const app = APPLICATIONS.find((a) => a.slug === slug);
  if (!app) return <Navigate to="/applications" replace />;

  const others = APPLICATIONS.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`APPLICATION — ${app.name.toUpperCase()}`}
        title={[app.name.toUpperCase() + "."]}
        intro={app.note}
        img={app.img}
      />

      <section className="bg-cream py-20 lg:py-28" data-testid="application-detail">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <FadeUp>
            <img src={app.img} alt={`${app.name} — Plantstiks application`} className="h-[440px] w-full rounded-[28px] object-cover" loading="lazy" />
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-display text-2xl font-semibold leading-relaxed text-teal sm:text-3xl">{app.tagline}</p>
            <div className="mt-8 rounded-2xl border border-ink/10 bg-cream-soft p-6">
              <p className="font-display text-[0.62rem] font-bold tracking-[0.24em] text-leaf">RECOMMENDED PREFORM</p>
              <p className="mt-2 font-display text-3xl font-bold text-teal">{app.preform}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                data-testid={`application-${slug}-cta`}
                className="rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
              >
                DISCUSS YOUR APPLICATION
              </Link>
              <Link
                to="/products/preforms"
                className="rounded-full border border-ink/20 px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-teal transition-colors duration-300 hover:border-teal"
              >
                EXPLORE PREFORMS
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mx-auto mt-20 max-w-[1440px] px-6 lg:px-12">
          <p className="eyebrow text-leaf">OTHER APPLICATIONS</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/applications/${o.slug}`}
                data-testid={`application-related-${o.slug}`}
                className="group relative h-56 overflow-hidden rounded-[24px] bg-teal-900"
              >
                <img src={o.img} alt={o.name} loading="lazy" className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent" />
                <h3 className="absolute bottom-5 left-6 font-display text-xl font-bold text-cream">{o.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
