import { PageHeader } from "../components/PageHeader";
import { FadeUp } from "../components/Reveal";
import { useSEO } from "../lib/seo";

const COPY = {
  privacy: {
    t: ["PRIVACY", "POLICY."],
    eyebrow: "LEGAL",
    body: [
      "Plantstiks respects your privacy. Information submitted through this website — names, companies, contact details and enquiry content — is used solely to respond to your enquiry and is never sold to third parties.",
      "Enquiry data is stored securely and retained only as long as needed to handle our conversation. To review or delete anything you have shared, write to business@plantstiksbottle.in.",
    ],
  },
  terms: {
    t: ["TERMS", "OF USE."],
    eyebrow: "LEGAL",
    body: [
      "This website describes Plantstiks plant-based packaging technology. Technical figures shown reflect our catalogue and test documents; marketing language should be read as intent, and documents shared on request remain the authoritative record.",
      "All content is the property of Plantstiks. Product names, imagery and copy may not be reproduced without written permission.",
    ],
  },
  cookies: {
    t: ["COOKIE", "POLICY."],
    eyebrow: "LEGAL",
    body: [
      "This website uses no advertising or tracking cookies. Only functional browser storage needed to render the site is used.",
      "If analytics are added in future, this policy will be updated before any tracking begins.",
    ],
  },
};

export default function LegalPage({ kind = "privacy" }) {
  const c = COPY[kind];
  useSEO({
    title: `Plantstiks — ${kind.replace(/^\w/, (m) => m.toUpperCase())}`,
    path: `/${kind}`,
  });

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.t} />
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-2xl space-y-6 px-6 lg:px-12">
          {c.body.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <p className="leading-relaxed text-ink/70">{p}</p>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
