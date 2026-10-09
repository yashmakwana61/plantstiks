const DEFAULTS = [
  "ADVANCED MATERIALS",
  "BETTER PACKAGING",
  "A CLEANER FUTURE",
  "PLANT-BASED BOTTLES & PREFORMS",
  "COMPOSTABLE BY DESIGN",
  "MADE FOR INDIA",
  "ENGINEERED FOR THE WORLD",
];

export const Marquee = ({ items }) => {
  const LIST = items?.length ? items : DEFAULTS;
  return (
    <div
      className="relative overflow-hidden border-y border-ink/10 bg-white py-5"
      data-testid="editorial-marquee"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center">
            {LIST.map((item, i) => (
              <span key={i} className="flex items-center font-display text-sm font-semibold tracking-[0.3em] text-teal/70">
                <span className="px-8">{item}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" className="text-leaf">
                  <circle cx="5" cy="5" r="4" fill="currentColor" opacity="0.8" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
