import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeUp, Eyebrow } from "../components/Reveal";

const COLOURS = [
  { id: "natural", name: "Natural / Transparent", fill: "rgba(210,232,224,0.35)", tint: "#9FC4B8" },
  { id: "milky", name: "Milky White", fill: "rgba(245,242,235,0.92)", tint: "#E8E4D8" },
  { id: "amber", name: "Amber", fill: "rgba(198,138,66,0.82)", tint: "#C68A42" },
  { id: "custom", name: "Custom Shade", fill: "rgba(46,125,94,0.72)", tint: "#2E7D5E" },
];

const SHAPES = [
  { id: "cyl", name: "Cylinder" },
  { id: "slim", name: "Tall Slim" },
  { id: "round", name: "Boston Round" },
];

const FINISHES = [
  { id: "gloss", name: "Gloss" },
  { id: "matte", name: "Matte" },
];

const LABELS = [
  { id: "none", name: "No label" },
  { id: "transparent", name: "Transparent adhesive" },
  { id: "paper", name: "Waterproof paper" },
  { id: "shrink", name: "Shrink wrap" },
];

const CAPS = [
  { id: "natural", name: "Natural", fill: "#E8E4D8" },
  { id: "teal", name: "Deep Teal", fill: "#002A2A" },
  { id: "white", name: "White", fill: "#FAFAF7" },
  { id: "custom", name: "Custom", fill: "#E39A6B" },
];

const SIZES = [
  { id: "s", name: "~250ml", h: 190 },
  { id: "m", name: "~500ml", h: 230 },
  { id: "l", name: "~1L", h: 270 },
];

const Option = ({ active, onClick, children, testid }) => (
  <button
    onClick={onClick}
    data-testid={testid}
    className={`rounded-full border px-4 py-2 font-display text-[0.65rem] font-bold tracking-[0.16em] transition-all duration-300 ${
      active ? "border-teal bg-teal text-cream" : "border-ink/15 text-ink/60 hover:border-teal/50 hover:text-teal"
    }`}
  >
    {children}
  </button>
);

const BottleSVG = ({ shape, colour, finish, label, cap, size }) => {
  const h = size.h;
  const bodyTop = 300 - h;
  const bodyPath =
    shape === "slim"
      ? `M118 ${bodyTop} Q112 ${bodyTop + 30} 112 ${bodyTop + 60} V286 Q112 300 126 300 H154 Q168 300 168 286 V${bodyTop + 60} Q162 ${bodyTop + 30} 158 ${bodyTop}`
      : shape === "round"
      ? `M116 ${bodyTop + 18} Q104 ${bodyTop + 70} 108 220 Q110 300 140 300 Q170 300 172 220 Q176 ${bodyTop + 70} 164 ${bodyTop + 18}`
      : `M114 ${bodyTop + 10} V286 Q114 300 128 300 H152 Q166 300 166 286 V${bodyTop + 10}`;

  return (
    <svg viewBox="0 0 280 320" className="h-[320px] w-[280px]" data-testid="configurator-bottle-visual">
      <defs>
        <linearGradient id="bodyShine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="0.75" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <ellipse cx="140" cy="306" rx="64" ry="8" fill="#0B2B28" opacity="0.12" />

      <motion.path
        d={bodyPath}
        fill={colour.fill}
        stroke={colour.tint}
        strokeWidth="2"
        animate={{ d: bodyPath, fill: colour.fill }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path d={bodyPath} fill="url(#bodyShine)" animate={{ d: bodyPath }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ mixBlendMode: "screen" }} />

      {label !== "none" && label !== "shrink" && (
        <motion.rect
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          x={label === "transparent" ? 122 : 118}
          y={bodyTop + h * 0.34}
          width={label === "transparent" ? 36 : 44}
          height={h * 0.3}
          rx="4"
          fill={label === "transparent" ? "rgba(255,255,255,0.35)" : "#F5F0E4"}
          stroke={label === "transparent" ? "rgba(255,255,255,0.6)" : "#0B2B28"}
          strokeOpacity={label === "transparent" ? 0.5 : 0.12}
          strokeDasharray={label === "transparent" ? "3 3" : "0"}
        />
      )}

      {label === "shrink" && (
        <motion.rect
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          x="110" y={bodyTop + h * 0.28} width="60" height={h * 0.42} rx="6"
          fill="rgba(46,125,94,0.55)"
        />
      )}

      <rect x="126" y={bodyTop - 34} width="28" height="10" fill={cap.fill} stroke="#0B2B28" strokeOpacity="0.15" />
      <motion.rect
        x="123" y={bodyTop - 24} width="34" height="26" rx="4"
        fill={cap.fill}
        animate={{ fill: cap.fill }}
        transition={{ duration: 0.5 }}
      />

      {finish === "gloss" && (
        <ellipse cx="122" cy={bodyTop + h * 0.4} rx="5" ry={h * 0.24} fill="#ffffff" opacity="0.5" />
      )}
    </svg>
  );
};

export const Configurator = () => {
  const [shape, setShape] = useState("cyl");
  const [colour, setColour] = useState("natural");
  const [finish, setFinish] = useState("gloss");
  const [label, setLabel] = useState("paper");
  const [cap, setCap] = useState("teal");
  const [size, setSize] = useState("m");

  const c = COLOURS.find((x) => x.id === colour);
  const s = SIZES.find((x) => x.id === size);

  return (
    <section className="bg-cream py-24 lg:py-36" data-testid="configurator-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>BOTTLE CONFIGURATOR</Eyebrow>
            <FadeUp delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-teal sm:text-6xl">
                YOUR PRODUCT.
                <br />
                YOUR BOTTLE.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="max-w-sm text-sm text-ink/60">
            Shape, size, colour, finish, label and cap — explore the combination
            your brand needs. Colours, labels and caps documented in the Plantstiks catalogue.
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="relative flex items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-b from-cream-soft to-cream-deep py-12 lg:col-span-5" data-testid="configurator-stage">
            <div className="absolute inset-x-10 top-10 bottom-10 rounded-full bg-leaf/10 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={`${shape}-${colour}-${size.id}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.45 }}
              >
                <BottleSVG shape={shape} colour={c} finish={finish} label={label} cap={CAPS.find((x) => x.id === cap)} size={s} />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[0.65rem] font-bold tracking-[0.24em] text-ink/40">
              {s.name.toUpperCase()} · {c.name.toUpperCase()} · {finish.toUpperCase()}
            </p>
          </div>

          <div className="space-y-8 lg:col-span-7" data-testid="configurator-controls">
            {[
              { label: "BOTTLE SHAPE", opts: SHAPES, val: shape, set: setShape, tid: "shape" },
              { label: "SIZE", opts: SIZES, val: size, set: setSize, tid: "size" },
              { label: "COLOUR", opts: COLOURS, val: colour, set: setColour, tid: "colour" },
              { label: "MATERIAL FINISH", opts: FINISHES, val: finish, set: setFinish, tid: "finish" },
              { label: "LABEL", opts: LABELS, val: label, set: setLabel, tid: "label" },
              { label: "CAP", opts: CAPS, val: cap, set: setCap, tid: "cap" },
            ].map((row) => (
              <div key={row.label} className="border-t border-ink/10 pt-5">
                <p className="eyebrow text-leaf">{row.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {row.opts.map((o) => (
                    <Option
                      key={o.id}
                      active={row.val === o.id}
                      onClick={() => row.set(o.id)}
                      testid={`configurator-option-${row.tid}-${o.id}`}
                    >
                      {o.name}
                    </Option>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                to="/contact"
                data-testid="configurator-cta"
                className="rounded-full bg-teal px-8 py-4 font-display text-xs font-bold tracking-[0.22em] text-cream transition-all duration-300 hover:bg-leaf"
              >
                CREATE YOUR PACKAGING
              </Link>
              <p className="text-xs text-ink/50">Every combination ships as a validated preform + bottle system.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
