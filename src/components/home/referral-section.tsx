"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BG2, LINE, HI, MID, BLUE } from "@/lib/colors";

const steps = [
  {
    n: "01",
    title: "Refer a client",
    desc: "Send them our way with your referral link or an email intro.",
  },
  {
    n: "02",
    title: "We close the deal",
    desc: "We handle the proposal and onboarding.",
  },
  {
    n: "03",
    title: "You earn commission",
    desc: "Once the first payment clears, we send your cut.",
  },
];

function TimelineStep({
  step,
  index,
  total,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "24px 0",
        borderBottom: `1px solid ${LINE}`,
        position: "relative",
      }}
      initial={{ opacity: 0, x: rm ? 0 : -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: rm ? 0 : index * 0.14, ease }}
    >
      {/* Animated dot */}
      <div style={{ position: "relative", flexShrink: 0, minWidth: 24 }}>
        <motion.span
          style={{ fontSize: 11, fontWeight: 700, color: BLUE, display: "block", marginTop: 3 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: rm ? 0 : index * 0.14 + 0.1, ease }}
        >
          {step.n}
        </motion.span>
        {/* Connecting line grows down */}
        {index < total - 1 && (
          <motion.div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              width: 1,
              background: BLUE,
              transformOrigin: "top",
              marginTop: 8,
            }}
            initial={{ scaleY: 0, height: 48 }}
            animate={inView ? { scaleY: 1, height: 48 } : {}}
            transition={{ duration: 0.5, delay: rm ? 0 : index * 0.14 + 0.3, ease }}
          />
        )}
      </div>

      <div>
        <motion.div
          style={{ fontSize: 15, fontWeight: 800, color: HI, marginBottom: 4 }}
          initial={{ opacity: 0, y: rm ? 0 : 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: rm ? 0 : index * 0.14 + 0.08, ease }}
        >
          {step.title}
        </motion.div>
        <div style={{ fontSize: 13, color: MID, lineHeight: 1.65 }}>{step.desc}</div>
      </div>
    </motion.div>
  );
}

export default function ReferralSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      style={{
        background: BG2,
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          ref={headRef}
        >
          <span style={{ width: 32, height: 1, background: BLUE, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, textTransform: "uppercase" }}>
            Referral Partner Program
          </span>
        </motion.div>

        <div className="ch-why-grid">
          {/* Left */}
          <div>
            <motion.h2
              style={{ fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 900, color: HI, margin: "0 0 20px", lineHeight: 1 }}
              initial={{ opacity: 0, y: rm ? 0 : 28 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
            >
              More referrals.
              <br />
              <span style={{ color: BLUE }}>More earnings.</span>
            </motion.h2>
            <motion.p
              style={{ fontSize: 15, color: MID, lineHeight: 1.8, maxWidth: 390, marginBottom: 36 }}
              initial={{ opacity: 0, y: rm ? 0 : 18 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
            >
              Earn commission on every project you refer. We handle the sales
              call, proposal, and onboarding.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: rm ? 0 : 14 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28, ease }}
            >
              <Link
                href="/referral"
                className="inline-flex items-center gap-2 rounded px-8 py-4 text-sm font-bold text-white"
                style={{ background: BLUE }}
              >
                See the Program <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Right — animated timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: `1px solid ${LINE}` }}>
            {steps.map((step, i) => (
              <TimelineStep key={step.n} step={step} index={i} total={steps.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
