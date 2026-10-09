import { IMG } from "../lib/images";

export const VideoBand = () => (
  <div className="relative z-10 mx-auto max-w-[1240px] px-6 pb-20 lg:px-12" data-testid="hero-video-section">
    <div className="relative overflow-hidden rounded-[32px] border border-ink/10 shadow-xl shadow-teal/5">
      <video
        src="/plantstiks_loop.mp4"
        poster={IMG.heroBottle}
        autoPlay
        muted
        loop
        playsInline
        className="aspect-video w-full object-cover"
        data-testid="hero-video"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/60 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
        <p className="eyebrow text-cream/80">THE PLANTSTIKS SYSTEM FILM</p>
        <p className="mt-2 max-w-xs font-display text-lg font-bold leading-snug text-cream sm:max-w-none sm:text-2xl">
          From field to bottle, in one loop.
        </p>
      </div>
      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-teal-950/50 px-4 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-peach" />
        <span className="font-display text-[0.6rem] font-bold tracking-[0.24em] text-cream">01 — SYSTEM</span>
      </div>
    </div>
  </div>
);
