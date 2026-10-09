import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const MaskLines = ({ lines, className = "", lineClass = "", delay = 0, as: Tag = "h1" }) => (
  <Tag className={className}>
    {lines.map((l, i) => (
      <span key={i} className={`line-mask ${lineClass}`}>
        <motion.span
          className="block will-change-transform"
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
        >
          {l}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const FadeUp = ({ children, delay = 0, y = 28, className = "", once = true, ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.15 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, light = false, className = "" }) => (
  <FadeUp className={`eyebrow flex items-center gap-3 ${light ? "text-sage" : "text-leaf"} ${className}`}>
    <span className={`inline-block h-px w-10 ${light ? "bg-sage/60" : "bg-leaf/60"}`} />
    {children}
  </FadeUp>
);

export const RevealImage = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={`overflow-hidden ${className}`}
    initial={{ clipPath: "inset(12% 8% 12% 8% round 24px)", opacity: 0.4 }}
    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.2, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);
