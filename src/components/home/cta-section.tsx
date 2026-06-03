"use client";
import { useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BG, HI, MID, BLUE } from "@/lib/colors";

const line1 = "Let's Build";
const line2 = "Something";
const line3 = "Remarkable.";

function SplitReveal({ text, delay = 0, color = HI }: { text: string; delay?: number; color?: string }) {
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const chars = text.split("");

  return (
    <span className="inline-block overflow-hidden" aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ color }}
          variants={{
            hidden: { opacity: 0, y: rm ? 0 : 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: rm ? 0 : delay + i * 0.025,
                ease,
              },
            },
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rm = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (rm) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [rm]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 500);
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center gap-3 rounded px-9 py-4 text-sm font-black text-white"
      style={{ background: BLUE, willChange: "transform", display: "inline-flex" }}
    >
      {children}
    </Link>
  );
}

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={ref} style={{ background: BG, position: "relative", overflow: "hidden" }}>
      {/* Background morph blobs */}
      {!rm && (
        <>
          <motion.div
            className="pointer-events-none absolute"
            style={{
              width: 600, height: 600, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,114,245,0.07) 0%, transparent 70%)",
              top: "-10%", left: "-5%",
            }}
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute"
            style={{
              width: 500, height: 500, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,114,245,0.05) 0%, transparent 70%)",
              bottom: "-10%", right: "-5%",
            }}
            animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(64px,10vw,120px) clamp(16px,4vw,40px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-12">
          {/* Headline — character by character */}
          <motion.h2
            style={{
              fontSize: "clamp(44px,8vw,104px)",
              fontWeight: 900,
              lineHeight: 0.98,
              color: HI,
              margin: 0,
            }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0 } } }}
          >
            <SplitReveal text={line1} delay={0} color={HI} />
            <br />
            <SplitReveal text={line2} delay={0.18} color={BLUE} />
            <br />
            <SplitReveal text={line3} delay={0.36} color={HI} />
          </motion.h2>

          {/* Right side */}
          <motion.div
            style={{ maxWidth: 380 }}
            initial={{ opacity: 0, x: rm ? 0 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, marginBottom: 32 }}>
              Transparent pricing, full ownership, and modern design. Your
              digital growth gets a cleaner foundation.
            </p>
            <MagneticButton href="/contact">
              Start Your Project <ArrowRight size={18} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
