import { useEffect, useState } from "react";
import { apiFetch, mediaUrl } from "./api";
import { Badge, Btn, Card, Loading } from "./ui";
import { fmtDate } from "./generic";

export const Dashboard = ({ user }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    apiFetch("/cms/dashboard").then(setData).catch(() => setData({ error: true }));
  }, []);

  if (!data) return <Loading />;
  if (data.error) return <p className="text-sm text-red-500">Could not load dashboard.</p>;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-teal" data-testid="dashboard-greeting">
        {greeting}, {user.name?.split(" ")[0] || "Admin"}
      </h1>
      <p className="mt-1 text-sm text-ink/50">Here is where the Plantstiks website stands today.</p>

      <Card className="mt-6 flex flex-wrap items-center justify-between gap-6 p-6" >
        <div className="flex items-center gap-3" data-testid="website-status">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-leaf" />
          <div>
            <p className="font-display text-sm font-bold text-teal">Website Live</p>
            <p className="text-xs text-ink/45">www.plantstiksbottle.in</p>
          </div>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="font-display text-[0.6rem] font-bold tracking-[0.18em] text-ink/40">LAST PUBLISHED</p>
            <p className="mt-1 text-sm text-ink/75">{data.website.last_published ? new Date(data.website.last_published).toLocaleString("en-IN") : "—"}</p>
          </div>
          <div>
            <p className="font-display text-[0.6rem] font-bold tracking-[0.18em] text-ink/40">LAST CONTENT UPDATE</p>
            <p className="mt-1 text-sm text-ink/75">{data.website.last_content_update ? new Date(data.website.last_content_update).toLocaleString("en-IN") : "—"}</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5" data-testid="content-counts">
        {[
          ["Pages", data.content.pages, "/cms/c/pages"],
          ["Products", data.content.products, "/cms/c/products"],
          ["Applications", data.content.applications, "/cms/c/applications"],
          ["Documents", data.content.documents, "/cms/c/documents"],
          ["Media", data.content.media, "/cms/media"],
          ["Blog Posts", data.content.blog, "/cms/c/blog"],
          ["Case Studies", data.content.case_studies, "/cms/c/case_studies"],
          ["Preforms", data.content.preforms, "/cms/c/preforms"],
          ["Moulds", data.content.moulds, "/cms/c/moulds"],
          ["FAQs", data.content.faqs, "/cms/c/faqs"],
        ].map(([label, n, to]) => (
          <a key={label} href={to} className="rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-teal/40">
            <p className="font-display text-3xl font-bold text-teal">{n}</p>
            <p className="mt-1 font-display text-[0.6rem] font-bold tracking-[0.18em] text-ink/45">{label.toUpperCase()}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="lead-counts">
        {[
          ["New Enquiries", data.leads.new, "bg-leaf/10 text-leaf"],
          ["Product Enquiries", data.leads.product_enquiries, "bg-teal/10 text-teal"],
          ["Sample Requests", data.leads.samples, "bg-peach/20 text-teal-900"],
          ["Qualified Leads", data.leads.qualified, "bg-sage/25 text-teal"],
        ].map(([label, n, cls]) => (
          <a key={label} href="/cms/leads" className="rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-teal/40">
            <p className={`inline-block rounded-full px-2.5 py-1 font-display text-2xl font-bold ${cls}`}>{n}</p>
            <p className="mt-2 font-display text-[0.6rem] font-bold tracking-[0.18em] text-ink/45">{label.toUpperCase()}</p>
          </a>
        ))}
      </div>

      <Card className="mt-6 p-6" data-testid="recent-activity">
        <h2 className="font-display text-lg font-bold text-teal">Recent Activity</h2>
        <div className="mt-4 space-y-3">
          {data.activity.map((a, i) => (
            <div key={i} className="flex items-start justify-between gap-4 border-b border-ink/5 pb-3 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-cream-soft font-display text-[0.6rem] font-bold text-teal">
                  {String(a.user || "?").slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm text-ink/80">
                    <span className="font-semibold">{a.user}</span> {a.action} {a.entity}
                    {a.new?.name ? ` — ${a.new.name}` : a.new?.status ? ` — ${a.new.status}` : ""}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-xs text-ink/40">{new Date(a.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
            </div>
          ))}
          {!data.activity.length && <p className="text-sm text-ink/40">No activity yet.</p>}
        </div>
      </Card>
    </div>
  );
};
