"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BG2, LINE, HI, DIM } from "@/lib/colors";

const heroStats = [
  { value: "50+", label: "Projects Shipped", num: 50, suffix: "+" },
  { value: "100%", label: "Code Ownership", num: 100, suffix: "%" },
  { value: "48h", label: "Demo Delivery", num: 48, suffix: "h" },
  { value: "5/5", label: "Average Rating", num: 5, suffix: "/5" },
];

function CountUp({ to, suffix, active, rm }: { to: number; suffix: string; active: boolean; rm: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || rm) {
      setDisplay(to);
      return;
    }
    let start: number | null = null;
    const duration = 1400;

    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, to, rm]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: (typeof heroStats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      ref={ref}
      className="rounded-lg border bg-white p-6"
      style={{ borderColor: LINE, position: "relative", overflow: "hidden" }}
      initial={{ opacity: 0, y: rm ? 0 : 30, scale: rm ? 1 : 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: rm ? 0 : index * 0.1, ease }}
    >
      {/* Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg"
        animate={inView && !rm ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
        style={{ background: "radial-gradient(circle at 30% 40%, rgba(0,114,245,0.1), transparent 70%)" }}
      />

      {/* Floating animation */}
      <motion.div
        animate={inView && !rm ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 3.5 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      >
        <div style={{ fontSize: "clamp(38px,5vw,64px)", fontWeight: 900, color: HI, lineHeight: 1 }}>
          <CountUp to={stat.num} suffix={stat.suffix} active={inView} rm={!!rm} />
        </div>
        <div style={{ fontSize: 12, color: DIM, marginTop: 8, fontWeight: 700, textTransform: "uppercase" }}>
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto grid max-w-[1360px] gap-6 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {heroStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
