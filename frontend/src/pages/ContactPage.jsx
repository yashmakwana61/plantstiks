import { ContactSection } from "../sections/ContactSection";
import { useSEO } from "../lib/seo";

export default function ContactPage() {
  useSEO({
    title: "Contact Plantstiks — Start a Conversation",
    description:
      "Talk to Plantstiks about plant-based packaging: Siddhraj Z Square, East-307, Kudasan, Gandhinagar – 382421. Phone 9313938006 / 8800211680. business@plantstiksbottle.in",
    path: "/contact",
  });

  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
