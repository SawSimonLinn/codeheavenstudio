"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { BG, LINE, HI, DIM, BLUE } from "@/lib/colors";

const heroStats = [
  ["50+", "Projects Shipped"],
  ["100%", "Code Ownership"],
  ["48h", "Demo Delivery"],
  ["5/5", "Average Rating"],
];

function Particles() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: (i * 5.6 + 3) % 100,
    y: (i * 7.3 + 10) % 100,
    size: (i % 3) + 2,
    dur: 8 + (i % 7),
    delay: (i * 0.4) % 5,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/25"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-12, 12, -12], x: [-6, 6, -6], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const headlineLines = ["Engineering", "Your Digital Future."];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const rm = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: BG, borderBottom: `1px solid ${LINE}` }}
    >
      {/* Parallax hero image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={rm ? {} : { y: imageY, scale: imageScale }}
      >
        <Image
          src="/hero-image.png"
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover"
          aria-hidden="true"
        />
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg,rgba(56,151,239,0.06) 0%,rgba(255,255,255,0.10) 48%,rgba(246,250,255,0.5) 84%,rgba(246,250,255,0.7) 100%)",
        }}
        animate={rm ? {} : { opacity: [1, 0.82, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <Particles />

      {/* Content */}
      <motion.div
        className="relative z-20 mx-auto flex min-h-[calc(100svh-92px)] max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:pt-28"
        style={rm ? {} : { y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/30 px-5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-white"
            animate={rm ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          AI-Ready Web Studio - Est. 2024
        </motion.div>

        {/* Headline — line by line reveal */}
        <h1
          className="mt-9 max-w-5xl text-balance text-5xl font-black !leading-[1.1] text-white drop-shadow-[0_3px_18px_rgba(15,23,42,0.24)] sm:text-6xl lg:text-7xl"
          style={{ perspective: "1000px" }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.14, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          className="mt-7 max-w-2xl text-base font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(15,23,42,0.18)] sm:text-lg"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.54, ease }}
        >
          Code Heaven Studio builds fast, modern, AI-powered websites with SEO
          foundations for Google and AI-assisted search. You focus on your
          business. We handle the digital growth.
        </motion.p>

        {/* CTA buttons — staggered */}
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } },
          }}
        >
          {[
            {
              href: "/contact",
              label: "Start Free Demo",
              icon: <ArrowRight className="h-4 w-4" />,
              cls: "text-white shadow-[0_18px_50px_-20px_rgba(15,23,42,0.45)] hover:-translate-y-0.5",
              style: { background: BLUE },
            },
            {
              href: "/projects",
              label: "View Work",
              icon: <ArrowUpRight className="h-4 w-4" />,
              cls: "border border-white/55 bg-white/15 backdrop-blur-md hover:bg-white/25",
              style: {},
            },
          ].map(({ href, label, icon, cls, style }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.94 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
              }}
            >
              <Link
                href={href}
                className={`inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-bold transition-transform ${cls}`}
                style={style}
              >
                {label} {icon}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats card — floats */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease }}
          className="mt-14 w-full"
        >
          <motion.div
            animate={rm ? {} : { y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="ch-hero-stats mx-auto max-w-4xl rounded-lg border border-white/55 bg-white/75 px-4 backdrop-blur"
            style={{ boxShadow: "0 24px 64px -12px rgba(0,114,245,0.18)" }}
          >
            {heroStats.map(([num, label], i) => (
              <div
                key={label}
                className="ch-hero-stat"
                style={{
                  flex: 1,
                  padding: "18px 0",
                  paddingLeft: i > 0 ? 24 : 0,
                  borderLeft: i > 0 ? `1px solid ${LINE}` : "none",
                }}
              >
                <div style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 900, color: HI, lineHeight: 1 }}>
                  {num}
                </div>
                <div style={{ fontSize: 12, color: DIM, marginTop: 5, fontWeight: 700, textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.span
            className="text-[10px] font-bold uppercase tracking-widest text-white/60"
            animate={rm ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={rm ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
