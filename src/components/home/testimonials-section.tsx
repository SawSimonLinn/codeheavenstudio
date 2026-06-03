"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BG2, LINE, HI, MID, DIM, BLUE } from "@/lib/colors";

const testimonials = [
  {
    quote: "Code Heaven delivered a fast, polished site and gave us full ownership.",
    name: "Sarah M.",
    role: "Founder, Bloom Boutique",
  },
  {
    quote: "The free demo made the decision easy. We saw the direction before signing.",
    name: "James K.",
    role: "CEO, Apex Realty",
  },
  {
    quote: "Clear process, no monthly lock-in, and the finished site was easy to manage.",
    name: "Priya N.",
    role: "Director, TechStart Inc.",
  },
];

// Triple the items for a seamless infinite loop
const track = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  // Auto-scroll the track
  useEffect(() => {
    if (rm) return;
    const el = trackRef.current;
    if (!el) return;

    let offset = 0;
    let rafId: number;
    let paused = false;

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    function tick() {
      if (!paused) {
        offset += 0.5;
        const cardWidth = 380 + 16; // card width + gap
        const loopAt = cardWidth * testimonials.length;
        if (offset >= loopAt) offset -= loopAt;
        if (el) el.style.transform = `translateX(-${offset}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rm]);

  return (
    <section
      ref={sectionRef}
      style={{ background: BG2, borderBottom: `1px solid ${LINE}`, overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <span style={{ width: 32, height: 1, background: BLUE, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, textTransform: "uppercase" }}>
            Client Testimonials
          </span>
        </motion.div>
      </div>

      {/* Full-width scrolling track */}
      <div style={{ paddingBottom: "clamp(60px,8vw,100px)" }}>
        <div
          ref={trackRef}
          className="flex gap-4"
          style={{ willChange: "transform", width: "max-content" }}
        >
          {track.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  index,
  inView,
}: {
  item: (typeof testimonials)[number];
  index: number;
  inView: boolean;
}) {
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.figure
      className="rounded-xl border bg-white p-6"
      style={{
        borderColor: LINE,
        width: 380,
        flexShrink: 0,
        cursor: "default",
      }}
      initial={{ opacity: 0, y: rm ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: rm ? 0 : (index % testimonials.length) * 0.1, ease }}
      whileHover={rm ? {} : {
        scale: 1.03,
        rotate: (index % 2 === 0 ? 0.6 : -0.6),
        boxShadow: "0 20px 60px -10px rgba(0,114,245,0.15)",
        transition: { duration: 0.3 },
      }}
    >
      <blockquote
        style={{ fontSize: 18, fontWeight: 800, color: HI, lineHeight: 1.45, margin: 0 }}
      >
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption style={{ fontSize: 14, fontWeight: 700, color: MID, marginTop: 28 }}>
        {item.name}{" "}
        <span style={{ fontWeight: 500, color: DIM }}>- {item.role}</span>
      </figcaption>
    </motion.figure>
  );
}
