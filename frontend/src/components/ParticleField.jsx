import { useEffect, useRef } from "react";

export const ParticleField = ({ density = 60, color = "245,240,228" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, particles = [], w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vy: -(0.08 + Math.random() * 0.3),
      drift: Math.random() * Math.PI * 2,
      ds: 0.002 + Math.random() * 0.006,
      a: 0.12 + Math.random() * 0.3,
      fiber: Math.random() > 0.7,
      len: 6 + Math.random() * 14,
    });

    const init = () => {
      particles = Array.from({ length: density }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.drift += p.ds;
        p.x += Math.sin(p.drift) * 0.25;
        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }
        ctx.strokeStyle = `rgba(${color},${p.a})`;
        ctx.fillStyle = `rgba(${color},${p.a})`;
        if (p.fiber) {
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(p.x + Math.sin(p.drift) * 6, p.y - p.len / 2, p.x + Math.sin(p.drift) * 2, p.y - p.len);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      } else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [density, color]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
};
