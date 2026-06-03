"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { BLUE } from "@/lib/colors";

const steps = [
  { n: "01", title: "Discovery", desc: "We learn your business, goals, and audience to build the right strategy." },
  { n: "02", title: "Free Demo", desc: "Get a working demo of your site in 48 hours before committing." },
  { n: "03", title: "Build", desc: "Modern code, responsive design, and clear progress updates throughout." },
  { n: "04", title: "Launch", desc: "Full code handoff, training, and post-launch support. It is yours to keep." },
];

export default function ProcessSection() {
  const rm = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (rm) return;
    if (v < 0.22) setActive(0);
    else if (v < 0.48) setActive(1);
    else if (v < 0.74) setActive(2);
    else setActive(3);
  });

  return (
    <div
      ref={wrapperRef}
      style={{ height: rm ? "auto" : "400vh", background: BLUE, position: "relative" }}
    >
      <div
        style={{
          position: rm ? "relative" : "sticky",
          top: 0,
          height: rm ? "auto" : "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>
              From Idea to Live
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", marginTop: 14, maxWidth: 360 }}>
              Four clear steps. No guesswork, no surprises.
            </p>
          </div>

          <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
            {/* Progress line */}
            {!rm && (
              <div
                style={{
                  position: "relative",
                  width: 2,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 1,
                  marginTop: 8,
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    background: "#fff",
                    borderRadius: 1,
                    height: lineHeight,
                  }}
                />
              </div>
            )}

            <div
              className="grid"
              style={{
                flex: 1,
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {steps.map((step, i) => {
                const isActive = active === i;
                const isPast = active > i;
                const opacity = rm ? 1 : isActive ? 1 : isPast ? 0.45 : 0.25;
                const scale = rm ? 1 : isActive ? 1 : 0.96;

                return (
                  <motion.div
                    key={step.n}
                    className="ch-process-step"
                    animate={{ opacity, scale }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      padding: "46px 34px 46px 0",
                      borderRight: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
                      paddingLeft: i > 0 ? 34 : 0,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
                      {step.n}
                    </div>
                    <motion.h3
                      animate={{ fontSize: rm ? "clamp(20px,2.4vw,28px)" : isActive ? "clamp(24px,2.8vw,36px)" : "clamp(20px,2.4vw,28px)" }}
                      transition={{ duration: 0.35 }}
                      style={{ fontWeight: 800, color: "#fff", marginBottom: 14 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0 }}>
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
