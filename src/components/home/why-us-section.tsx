"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BG, LINE, HI, MID, BLUE } from "@/lib/colors";

const benefits = [
  "No subscriptions. Pay once, own it forever.",
  "Full source code and asset ownership from day one.",
  "Performance and Core Web Vitals are part of the build.",
  "Working demo delivered before you commit.",
  "Built with Next.js, TypeScript, and Tailwind CSS.",
  "SEO, structured data, and AI search visibility handled from the start.",
];

function BenefitItem({ benefit, index }: { benefit: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        padding: "20px 0",
        borderBottom: `1px solid ${LINE}`,
      }}
      initial={{ opacity: 0, y: rm ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: rm ? 0 : index * 0.09, ease }}
    >
      <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, marginTop: 3, flexShrink: 0 }}>
        0{index + 1}
      </span>
      <span style={{ fontSize: 14, color: MID, fontWeight: 500, lineHeight: 1.65 }}>
        {benefit}
      </span>
    </motion.div>
  );
}

export default function WhyUsSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <div className="ch-why-grid">
          {/* Sticky left column */}
          <div style={{ position: "sticky", top: 120, alignSelf: "start" }}>
            <motion.h2
              ref={headRef}
              style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: HI, margin: "0 0 20px", lineHeight: 1 }}
              initial={{ opacity: 0, y: rm ? 0 : 28 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              The Code Heaven
              <br />
              <span style={{ color: BLUE }}>Difference.</span>
            </motion.h2>
            <motion.p
              style={{ fontSize: 15, color: MID, lineHeight: 1.8, marginBottom: 40, maxWidth: 380 }}
              initial={{ opacity: 0, y: rm ? 0 : 18 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease }}
            >
              We craft digital assets that work around the clock without
              subscriptions or hidden fees.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: rm ? 0 : 14 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded px-8 py-4 text-sm font-bold text-white"
                style={{ background: BLUE }}
              >
                Start a Project <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>

          {/* Scrolling right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: `1px solid ${LINE}` }}>
            {benefits.map((benefit, i) => (
              <BenefitItem key={benefit} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
