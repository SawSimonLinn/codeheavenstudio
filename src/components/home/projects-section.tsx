"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { BG, LINE, HI, DIM, BLUE } from "@/lib/colors";

const projects = [
  { title: "E-Commerce Platform", cat: "Full-Stack", tag: "Next.js", bg: "#EAF5FF" },
  { title: "SaaS Dashboard", cat: "Web App", tag: "TypeScript", bg: "#F4F7FB" },
  { title: "Restaurant Landing", cat: "Marketing", tag: "Next.js", bg: "#ECFDF5" },
  { title: "Real Estate Portal", cat: "Full-Stack", tag: "React", bg: "#FFF7E6" },
  { title: "Healthcare App", cat: "Web App", tag: "Full-Stack", bg: "#FDF2F8" },
  { title: "Startup Landing", cat: "Marketing", tag: "Next.js", bg: "#EEF2FF" },
];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block shrink-0 overflow-hidden rounded-xl border"
      style={{
        background: project.bg,
        borderColor: LINE,
        width: "clamp(280px, 30vw, 380px)",
        boxShadow: hovered ? "0 24px 60px -12px rgba(0,114,245,0.18)" : "0 4px 20px -4px rgba(0,0,0,0.06)",
        transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1) translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
      }}
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={{
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ fontSize: "clamp(48px,7vw,80px)", fontWeight: 900, color: "rgba(0,114,245,0.12)", userSelect: "none" }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full"
          style={{
            background: BLUE,
            transform: hovered ? "scale(1.12) rotate(45deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <ArrowUpRight size={16} color="#fff" />
        </div>
      </div>
      <div style={{ padding: "20px 24px 24px", borderTop: `1px solid ${LINE}` }}>
        <div className="mb-2 flex items-center justify-between gap-4">
          <span style={{ fontSize: 11, fontWeight: 700, color: DIM, textTransform: "uppercase" }}>{project.cat}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, textTransform: "uppercase" }}>{project.tag}</span>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: HI, margin: 0 }}>{project.title}</h3>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const rm = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  // Cards translate horizontally as user scrolls the section
  const cardCount = projects.length;
  const totalShift = -(cardCount - 2) * 340;
  const x = useTransform(scrollYProgress, [0.1, 0.9], rm ? [0, 0] : [80, totalShift]);

  return (
    <section style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
      <div
        ref={wrapperRef}
        style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}
      >
        <div ref={headRef} className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: HI, margin: 0, lineHeight: 1 }}
            initial={{ opacity: 0, y: 28 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            Selected Work
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold"
              style={{ color: HI, borderBottom: `2px solid ${BLUE}`, paddingBottom: 2 }}
            >
              View All Projects <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal scroll gallery */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-5 pb-4"
            style={{ x }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
