"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BG2, LINE, HI, DIM, BLUE } from "@/lib/colors";

const services = [
  {
    n: "01",
    title: "AI Applied Websites",
    tag: "AI",
    desc: "Modern websites powered by Gemini, OpenAI, and Claude to improve lead quality, automate workflows, and increase conversions.",
    details: ["AI chat", "Lead qualification", "Dynamic content", "AI-ready SEO"],
  },
  {
    n: "02",
    title: "Web Development",
    tag: "Full-Stack",
    desc: "Custom Next.js and React apps built from scratch - fast, scalable, and ready for growth.",
    details: ["Next.js", "TypeScript", "APIs", "Auth and payments"],
  },
  {
    n: "03",
    title: "UI / UX Design",
    tag: "Design",
    desc: "Conversion-focused interfaces that look polished and guide users clearly.",
    details: ["Wireframes", "Design systems", "Mobile-first layouts", "Accessibility"],
  },
  {
    n: "04",
    title: "Performance",
    tag: "Optimization",
    desc: "Fast load times, stronger Core Web Vitals, and less client-side weight.",
    details: ["Image optimization", "Code splitting", "Caching", "Vitals monitoring"],
  },
  {
    n: "05",
    title: "SEO & Growth",
    tag: "Marketing",
    desc: "Technical SEO, structured data, and answer-ready content for visibility across Google and AI-assisted search.",
    details: ["Schema", "AI search visibility", "Search Console", "CRO"],
  },
];

function ServiceRow({ service, index }: { service: (typeof services)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [hovered, setHovered] = useState(false);
  const rm = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      ref={ref}
      className="ch-service-row"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: `1px solid ${LINE}`,
        background: hovered ? "rgba(0,114,245,0.025)" : "transparent",
        boxShadow: hovered ? `inset 3px 0 0 ${BLUE}` : "inset 3px 0 0 transparent",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div
        className="ch-service-main"
        style={{ display: "flex", alignItems: "center", gap: 40, padding: "34px 0" }}
      >
        <div
          className="ch-service-heading"
          style={{ display: "flex", alignItems: "center", gap: 36, minWidth: 0 }}
        >
          {/* Number — fades in */}
          <motion.span
            className="ch-service-number"
            style={{ fontSize: 12, fontWeight: 700, color: BLUE, minWidth: 32 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: rm ? 0 : index * 0.07, ease }}
          >
            {service.n}
          </motion.span>

          {/* Title — slides from left */}
          <motion.h3
            className="ch-service-title"
            style={{ fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, color: "#1E293B", margin: 0, minWidth: 200 }}
            initial={{ opacity: 0, x: rm ? 0 : -32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: rm ? 0 : -32 }}
            transition={{ duration: 0.65, delay: rm ? 0 : 0.08 + index * 0.07, ease }}
          >
            {service.title}
          </motion.h3>

          <motion.span
            className="ch-service-tag"
            style={{
              fontSize: 11, fontWeight: 700, color: "#fff", background: BLUE,
              borderRadius: 4, padding: "4px 10px", textTransform: "uppercase", flexShrink: 0,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: rm ? 0 : 0.2 + index * 0.07, ease }}
          >
            {service.tag}
          </motion.span>
        </div>

        {/* Description — slides from right */}
        <motion.p
          className="ch-service-desc"
          style={{ fontSize: 14, color: DIM, lineHeight: 1.7, margin: 0, maxWidth: 440, marginLeft: "auto" }}
          initial={{ opacity: 0, x: rm ? 0 : 32 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: rm ? 0 : 32 }}
          transition={{ duration: 0.65, delay: rm ? 0 : 0.16 + index * 0.07, ease }}
        >
          {service.desc}
        </motion.p>

        <motion.div
          className="ch-service-arrow"
          animate={hovered && !rm ? { x: 4, y: -4 } : { x: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0 }}
        >
          <ArrowUpRight size={18} color={BLUE} />
        </motion.div>
      </div>

      {/* Details chips */}
      <motion.div
        className="ch-service-details-content"
        style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingBottom: 28, paddingLeft: 68 }}
        initial={{ opacity: 0, y: rm ? 0 : 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: rm ? 0 : 10 }}
        transition={{ duration: 0.5, delay: rm ? 0 : 0.28 + index * 0.07, ease }}
      >
        {service.details.map((detail) => (
          <span
            key={detail}
            style={{
              fontSize: 12, fontWeight: 600, color: BLUE,
              background: "rgba(0,114,245,0.08)", border: "1px solid rgba(0,114,245,0.18)",
              borderRadius: 4, padding: "5px 12px",
            }}
          >
            {detail}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <div ref={headRef} className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: HI, margin: 0, lineHeight: 1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease }}
          >
            What We Do
          </motion.h2>
          <motion.p
            style={{ fontSize: 14, color: DIM, maxWidth: 320, lineHeight: 1.7, margin: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Every service is scoped around the same goal: making your business
            easier to find, trust, and buy from.
          </motion.p>
        </div>
        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {services.map((service, i) => (
            <ServiceRow key={service.n} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
