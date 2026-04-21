"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BG, BG2, LINE, HI, MID, DIM, BLUE } from "@/lib/colors";

// ─── HOOKS ─────────────────────────────────────────────────────────────────────
function useReveal(thr = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: thr });
    obs.observe(el); return () => obs.disconnect();
  }, [thr]);
  return { ref, visible: v };
}

function useCounter(target: number, active: boolean, dur = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = Date.now();
    const tick = () => { const p = Math.min((Date.now() - t0) / dur, 1); setVal(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [active, target, dur]);
  return val;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 60); return () => clearTimeout(t); }, []);
  const fade = (d: number): React.CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${d}s, transform 0.6s ease ${d}s`,
  });

  return (
    <section style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: "0 clamp(16px,4vw,40px)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", paddingTop: "clamp(120px,14vh,160px)", paddingBottom: "clamp(80px,10vh,120px)" }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40, ...fade(0.05) }}>
          <span style={{ width: 32, height: 1, background: BLUE, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase" }}>Web Studio — Est. 2024</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(52px,8.5vw,128px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", color: HI, margin: 0, maxWidth: 960, ...fade(0.1) }}>
          We build<br />
          <em style={{ fontStyle: "normal", color: BLUE }}>websites</em><br />
          that work.
        </h1>

        {/* Sub row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 56, flexWrap: "wrap", gap: 32, ...fade(0.2) }}>
          <p style={{ fontSize: "clamp(15px,1.6vw,18px)", color: MID, lineHeight: 1.7, maxWidth: 440, margin: 0 }}>
            Custom Next.js sites. Fast delivery, one-time pricing,
            and full code ownership — no subscriptions, no lock-in.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: HI, color: "#0C0C0C", borderRadius: 4, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "-0.01em" }}>
              Start Free Demo <ArrowRight size={16} />
            </Link>
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 28px", background: "transparent", color: HI, border: `1.5px solid ${LINE}`, borderRadius: 4, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              View Work <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="ch-hero-stats" style={{ gap: 0, marginTop: 80, borderTop: `1px solid ${LINE}`, ...fade(0.3) }}>
          {[["50+", "Projects Shipped"], ["100%", "Code Ownership"], ["48h", "Demo Delivery"], ["5★", "Average Rating"]].map(([num, lbl], i) => (
            <div key={lbl} className="ch-hero-stat" style={{ flex: 1, padding: "28px 0", paddingLeft: i > 0 ? 32 : 0, borderLeft: i > 0 ? `1px solid ${LINE}` : "none" }}>
              <div style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: HI, letterSpacing: "-0.04em", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 12, color: DIM, marginTop: 6, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const MI = ["50+ Projects Delivered", "Free Demo First", "5★ Average Rating", "You Own Your Site", "One-Time Pricing", "Fast Turnaround", "Modern Tech Stack", "SEO Optimized"];

function MarqueeStrip() {
  return (
    <div style={{ overflow: "hidden", borderBottom: `1px solid ${LINE}`, padding: "14px 0", background: BLUE }}>
      <div className="animate-marquee" style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
        {[...MI, ...MI].map((item, i) => (
          <span key={i} aria-hidden={i >= MI.length ? "true" : undefined} style={{ display: "inline-flex", alignItems: "center", gap: 12, margin: "0 32px", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "block" }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SVCS = [
  {
    n: "01",
    title: "AI Applied Websites",
    tag: "AI",
    desc: "Modern websites powered by Gemini, OpenAI, and Claude to improve lead quality, automate workflows, and increase conversions.",
    details: ["Gemini + OpenAI + Claude stack", "AI chat with lead qualification", "Smart dynamic content and recommendations", "AI-ready SEO and schema setup"],
  },
  { n: "02", title: "Web Development", tag: "Full-Stack", desc: "Custom Next.js and React apps built from scratch — fast, scalable, and ready for growth.", details: ["Next.js 14 App Router", "TypeScript & Tailwind CSS", "REST & GraphQL APIs", "Auth, payments, and CMS integrations"] },
  { n: "03", title: "UI / UX Design", tag: "Design", desc: "Conversion-focused interfaces that look stunning and guide users effortlessly.", details: ["Figma wireframes & prototypes", "Design systems & component libraries", "Mobile-first responsive layouts", "Accessibility (WCAG 2.1 AA)"] },
  { n: "04", title: "Performance", tag: "Optimization", desc: "Lighthouse 95+ scores, blazing-fast load times, and Core Web Vitals built in by default.", details: ["Image & font optimization", "Code splitting & lazy loading", "CDN & edge caching setup", "Core Web Vitals monitoring"] },
  { n: "05", title: "SEO & Growth", tag: "Marketing", desc: "Technical SEO, structured data, and analytics so you rank and convert from day one.", details: ["Schema markup & Open Graph", "Sitemap & robots.txt setup", "Google Analytics & Search Console", "Conversion rate optimization"] },
];

function Services() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", color: HI, margin: 0, lineHeight: 1 }}>What We Do</h2>
          <span style={{ fontSize: 13, color: DIM, maxWidth: 280, lineHeight: 1.6 }}>Every service is built for one goal: making your business grow online.</span>
        </div>
        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {SVCS.map((s, i) => <ServiceRow key={s.n} s={s} i={i} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ s, i, visible }: { s: typeof SVCS[0]; i: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="ch-service-row"
      style={{ borderBottom: `1px solid ${LINE}`, cursor: "default", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `opacity 0.65s ease ${i * 0.08 + 0.15}s, transform 0.65s ease ${i * 0.08 + 0.15}s, background 0.25s` }}
    >
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, padding: "36px 0" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: hov ? BLUE : DIM, letterSpacing: "0.1em", minWidth: 32, transition: "color 0.2s" }}>{s.n}</span>
        <h3 style={{ fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, color: hov ? HI : "#C0C0C0", letterSpacing: "-0.03em", margin: 0, flex: "0 0 auto", minWidth: 200, transition: "color 0.2s" }}>{s.title}</h3>
        <span style={{ fontSize: 11, fontWeight: 700, color: hov ? "#fff" : BLUE, background: hov ? BLUE : "transparent", border: `1.5px solid ${BLUE}`, borderRadius: 3, padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s", flexShrink: 0 }}>{s.tag}</span>
        <p className="ch-service-desc" style={{ fontSize: 14, color: DIM, lineHeight: 1.7, margin: 0, maxWidth: 440, marginLeft: "auto" }}>{s.desc}</p>
        <ArrowUpRight size={18} color={hov ? BLUE : LINE} style={{ flexShrink: 0, transform: hov ? "rotate(0deg)" : "rotate(-45deg)", transition: "color 0.2s, transform 0.3s ease" }} />
      </div>

      {/* Expandable details */}
      <div style={{ display: "grid", gridTemplateRows: hov ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingBottom: 28, paddingLeft: 72, opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(-6px)", transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s" }}>
            {s.details.map((d) => (
              <span key={d} style={{ fontSize: 12, fontWeight: 600, color: BLUE, background: "rgba(99,102,241,0.08)", border: `1px solid rgba(99,102,241,0.2)`, borderRadius: 4, padding: "5px 12px", letterSpacing: "0.02em" }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJS = [
  { title: "E-Commerce Platform", cat: "Full-Stack", tag: "Next.js", bg: "#0D1226" },
  { title: "SaaS Dashboard", cat: "Web App", tag: "TypeScript", bg: "#12100D" },
  { title: "Restaurant Landing", cat: "Marketing", tag: "Next.js", bg: "#0D1A14" },
  { title: "Real Estate Portal", cat: "Full-Stack", tag: "React", bg: "#1A1200" },
  { title: "Healthcare App", cat: "Web App", tag: "Full-Stack", bg: "#1A0D0D" },
  { title: "Startup Landing", cat: "Marketing", tag: "Next.js", bg: "#0D1A1A" },
];

function ProjectCard({ p, i, visible }: { p: typeof PROJS[0]; i: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: p.bg, borderRadius: 8, overflow: "hidden", border: `1.5px solid ${hov ? BLUE : LINE}`, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: `opacity 0.65s ease ${i * 0.08}s, transform 0.65s ease ${i * 0.08}s, border-color 0.2s`, cursor: "pointer" }}
    >
      <div style={{ aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ fontSize: "clamp(48px,7vw,80px)", fontWeight: 900, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em", userSelect: "none" }}>
          {String(i + 1).padStart(2, "0")}
        </div>
        <div style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center", opacity: hov ? 1 : 0, transform: hov ? "scale(1)" : "scale(0.5)", transition: "all 0.25s ease" }}>
          <ArrowUpRight size={16} color="#fff" />
        </div>
      </div>
      <div style={{ padding: "20px 24px 24px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.cat}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.tag}</span>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: HI, letterSpacing: "-0.02em", margin: 0 }}>{p.title}</h3>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", color: HI, margin: 0, lineHeight: 1 }}>Selected Work</h2>
          <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: HI, textDecoration: "none", borderBottom: `2px solid ${BLUE}`, paddingBottom: 2 }}>
            View All Projects <ArrowRight size={15} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {PROJS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Discovery", desc: "We learn your business, goals, and audience to build the right strategy." },
  { n: "02", title: "Free Demo", desc: "Get a working demo of your site in 48 hours — no commitment required." },
  { n: "03", title: "Build", desc: "Modern code, responsive design, and weekly progress updates throughout." },
  { n: "04", title: "Launch", desc: "Full code handoff, training, and post-launch support. It's yours to keep." },
];

function ProcessSection() {
  const { ref, visible } = useReveal(0.08);
  return (
    <section ref={ref} style={{ background: BLUE, borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <div style={{ marginBottom: 64, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: 0, lineHeight: 1 }}>From Idea to Live</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginTop: 14, maxWidth: 360 }}>Four clear steps. No guesswork, no surprises.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="ch-process-step" style={{ padding: "48px 36px 48px 0", borderRight: i < STEPS.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none", paddingLeft: i > 0 ? 36 : 0, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `all 0.65s ease ${i * 0.1 + 0.15}s` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.14em", marginBottom: 24 }}>{s.n}</div>
              <h3 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.03em" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const { ref, visible } = useReveal(0.15);
  const s0 = useCounter(50, visible);
  const s1 = useCounter(100, visible);
  const s2 = useCounter(48, visible);
  const vals = [s0, s1, s2, 5];
  const suffs = ["+", "%", "h", "★"];
  const labs = ["Projects Shipped", "Code Ownership", "Demo in Hours", "Average Rating"];

  return (
    <section ref={ref} style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(48px,6vw,80px) clamp(16px,4vw,40px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {vals.map((v, i) => (
          <div key={labs[i]} style={{ padding: "20px 0", borderLeft: i > 0 ? `1px solid ${LINE}` : "none", paddingLeft: i > 0 ? 40 : 0, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `all 0.65s ease ${i * 0.1}s` }}>
            <div style={{ fontSize: "clamp(44px,5.5vw,72px)", fontWeight: 900, color: HI, letterSpacing: "-0.05em", lineHeight: 1 }}>{v}{suffs[i]}</div>
            <div style={{ fontSize: 12, color: DIM, marginTop: 8, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{labs[i]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── WHY US ───────────────────────────────────────────────────────────────────
const BENS = [
  "No subscriptions. Pay once, own it forever.",
  "Full source code and asset ownership from day one.",
  "Lighthouse 95+ performance score guaranteed.",
  "Working demo delivered before you commit to anything.",
  "Built with Next.js, TypeScript, and Tailwind CSS.",
  "SEO-optimized and Core Web Vitals compliant out of the box.",
];

function WhyUsSection() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)" }}>
        <div className="ch-why-grid">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-28px)", transition: "all 0.8s ease" }}>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", color: HI, margin: "0 0 20px", lineHeight: 1 }}>
              The Code Heaven<br /><span style={{ color: BLUE }}>Difference.</span>
            </h2>
            <p style={{ fontSize: 15, color: MID, lineHeight: 1.8, marginBottom: 40, maxWidth: 380 }}>
              We craft digital assets that work 24/7 — without subscriptions or hidden fees.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: BLUE, color: "#fff", borderRadius: 4, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Start a Project <ArrowRight size={17} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: `1px solid ${LINE}` }}>
            {BENS.map((b, i) => (
              <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "20px 0", borderBottom: `1px solid ${LINE}`, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(28px)", transition: `all 0.65s ease ${i * 0.07 + 0.2}s` }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.1em", marginTop: 3, flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ fontSize: 14, color: MID, fontWeight: 500, lineHeight: 1.65 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTS = [
  { quote: "Code Heaven delivered beyond expectations. The site is lightning fast, gorgeous, and we own everything. Zero drama.", name: "Sarah M.", role: "Founder, Bloom Boutique" },
  { quote: "The free demo blew us away. Within 48 hours we had a working prototype. The final product was even better.", name: "James K.", role: "CEO, Apex Realty" },
  { quote: "Most agencies want monthly fees forever. Code Heaven gave us a stunning site for a one-time price. Incredible.", name: "Priya N.", role: "Director, TechStart Inc." },
  { quote: "Lighthouse score went from 52 to 97. The difference in traffic and conversions has been remarkable.", name: "Carlos R.", role: "Marketing Lead, FitLife" },
];

function TestimonialsSection() {
  const { ref, visible } = useReveal();
  const [a, setA] = useState(0);
  useEffect(() => { const id = setInterval(() => setA(x => (x + 1) % TESTS.length), 4500); return () => clearInterval(id); }, []);

  return (
    <section ref={ref} style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
          <span style={{ width: 32, height: 1, background: BLUE, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase" }}>Client Testimonials</span>
        </div>
        <div style={{ position: "relative", minHeight: 200 }}>
          {TESTS.map((t, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: a === i ? 1 : 0, transform: a === i ? "none" : "translateY(12px)", transition: "all 0.55s ease", pointerEvents: a === i ? "auto" : "none" }}>
              <blockquote style={{ fontSize: "clamp(22px,3.2vw,44px)", fontWeight: 800, color: HI, lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 32px", maxWidth: 900 }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div style={{ fontSize: 14, fontWeight: 700, color: MID }}>{t.name} <span style={{ fontWeight: 500, color: DIM }}>— {t.role}</span></div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
          {TESTS.map((_, i) => (
            <button key={i} onClick={() => setA(i)} style={{ width: a === i ? 28 : 8, height: 8, borderRadius: 100, background: a === i ? BLUE : LINE, border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  const { ref, visible } = useReveal(0.2);
  return (
    <section ref={ref} style={{ background: BG }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,10vw,120px) clamp(16px,4vw,40px)", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.8s ease" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 48 }}>
          <h2 style={{ fontSize: "clamp(48px,8vw,112px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.045em", color: HI, margin: 0 }}>
            Let&apos;s Build<br />
            <span style={{ color: BLUE }}>Something</span><br />
            Remarkable.
          </h2>
          <div style={{ maxWidth: 360 }}>
            <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, marginBottom: 32 }}>
              Transparent pricing, full ownership, and modern design. Your digital success is our mission.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 40px", background: HI, color: "#0C0C0C", borderRadius: 4, fontWeight: 800, fontSize: 16, textDecoration: "none", letterSpacing: "-0.01em" }}>
              Start Your Project Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: BG, color: HI, minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <MarqueeStrip />
        <Services />
        <ProjectsSection />
        <ProcessSection />
        <StatsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
