import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

export const MagneticButton = ({ to, href, children, variant = "solid", className = "", testid }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "solid"
      ? "bg-teal text-cream hover:bg-leaf"
      : "border border-teal/30 text-teal hover:border-teal hover:bg-teal hover:text-cream";

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block rounded-full px-8 py-4 font-display text-xs font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${base} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (href)
    return (
      <a href={href} data-testid={testid} className="inline-block">
        {inner}
      </a>
    );
  return (
    <Link to={to} data-testid={testid} className="inline-block">
      {inner}
    </Link>
  );
};
