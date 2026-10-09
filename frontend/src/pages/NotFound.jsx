import { Link } from "react-router-dom";
import { MaskLines, FadeUp } from "../components/Reveal";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-cream grain" data-testid="not-found">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <p className="eyebrow text-leaf">404 — NOT FOUND</p>
        <MaskLines
          delay={0.2}
          as="h1"
          className="mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.02] text-teal"
          lines={["THIS PAGE IS", "STILL A SEED."]}
        />
        <FadeUp delay={0.6} className="mt-10">
          <Link
            to="/"
            data-testid="not-found-home-link"
            className="inline-block rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-leaf"
          >
            BACK TO THE BEGINNING
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
