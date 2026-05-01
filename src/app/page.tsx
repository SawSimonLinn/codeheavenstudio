import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BG, BG2, LINE, HI, MID, DIM, BLUE } from "@/lib/colors";

const heroStats = [
  ["50+", "Projects Shipped"],
  ["100%", "Code Ownership"],
  ["48h", "Demo Delivery"],
  ["5/5", "Average Rating"],
];

const serviceHighlights = [
  "Free Demo First",
  "You Own Your Site",
  "One-Time Pricing",
  "Fast Turnaround",
  "SEO Optimized",
];

const services = [
  {
    n: "01",
    title: "AI Applied Websites",
    tag: "AI",
    desc: "Modern websites powered by Gemini, OpenAI, and Claude to improve lead quality, automate workflows, and increase conversions.",
    details: [
      "AI chat",
      "Lead qualification",
      "Dynamic content",
      "AI-ready SEO",
    ],
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
    details: [
      "Wireframes",
      "Design systems",
      "Mobile-first layouts",
      "Accessibility",
    ],
  },
  {
    n: "04",
    title: "Performance",
    tag: "Optimization",
    desc: "Fast load times, stronger Core Web Vitals, and less client-side weight.",
    details: [
      "Image optimization",
      "Code splitting",
      "Caching",
      "Vitals monitoring",
    ],
  },
  {
    n: "05",
    title: "SEO & Growth",
    tag: "Marketing",
    desc: "Technical SEO, structured data, and analytics so the site can rank and convert.",
    details: ["Schema", "Sitemap", "Search Console", "CRO"],
  },
];

const projects = [
  {
    title: "E-Commerce Platform",
    cat: "Full-Stack",
    tag: "Next.js",
    bg: "#EAF5FF",
  },
  { title: "SaaS Dashboard", cat: "Web App", tag: "TypeScript", bg: "#F4F7FB" },
  {
    title: "Restaurant Landing",
    cat: "Marketing",
    tag: "Next.js",
    bg: "#ECFDF5",
  },
  {
    title: "Real Estate Portal",
    cat: "Full-Stack",
    tag: "React",
    bg: "#FFF7E6",
  },
  { title: "Healthcare App", cat: "Web App", tag: "Full-Stack", bg: "#FDF2F8" },
  { title: "Startup Landing", cat: "Marketing", tag: "Next.js", bg: "#EEF2FF" },
];

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "We learn your business, goals, and audience to build the right strategy.",
  },
  {
    n: "02",
    title: "Free Demo",
    desc: "Get a working demo of your site in 48 hours before committing.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Modern code, responsive design, and clear progress updates throughout.",
  },
  {
    n: "04",
    title: "Launch",
    desc: "Full code handoff, training, and post-launch support. It is yours to keep.",
  },
];

const benefits = [
  "No subscriptions. Pay once, own it forever.",
  "Full source code and asset ownership from day one.",
  "Performance and Core Web Vitals are part of the build.",
  "Working demo delivered before you commit.",
  "Built with Next.js, TypeScript, and Tailwind CSS.",
  "SEO structure and metadata handled from the start.",
];

const testimonials = [
  {
    quote:
      "Code Heaven delivered a fast, polished site and gave us full ownership.",
    name: "Sarah M.",
    role: "Founder, Bloom Boutique",
  },
  {
    quote:
      "The free demo made the decision easy. We saw the direction before signing.",
    name: "James K.",
    role: "CEO, Apex Realty",
  },
  {
    quote:
      "Clear process, no monthly lock-in, and the finished site was easy to manage.",
    name: "Priya N.",
    role: "Director, TechStart Inc.",
  },
];

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: BG, borderBottom: `1px solid ${LINE}` }}
    >
      <Image
        src="/hero-image.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(56,151,239,0.06)_0%,rgba(255,255,255,0.10)_48%,rgba(246,250,255,0.5)_84%,rgba(246,250,255,0.7)_100%)]" />

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-92px)] max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/30 px-5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-white" />
          Web Studio - Est. 2024
        </div>

        <h1 className="mt-9 max-w-5xl text-balance text-5xl font-black !leading-[1.1]  text-white drop-shadow-[0_3px_18px_rgba(15,23,42,0.24)] sm:text-6xl lg:text-7xl">
          Engineering
          <br />
          Your Digital Future.
          {/* <br /> */}
        </h1>
        <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed  drop-shadow-[0_2px_10px_rgba(15,23,42,0.18)] sm:text-lg">
          Code Heaven Studio builds fast, modern, and SEO-optimized websites.
          You focus on your business. We handle the digital growth.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md text-white bg-white px-8 py-4 text-sm font-bold  shadow-[0_18px_50px_-20px_rgba(15,23,42,0.45)] transition-transform hover:-translate-y-0.5"
            style={{ background: BLUE }}
          >
            Start Free Demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-white/55 bg-white/15 px-7 py-4 text-sm font-semibold shadow-sm backdrop-blur-md transition-colors hover:bg-white/25"
          >
            View Work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="ch-hero-stats mt-14 w-full max-w-4xl rounded-lg border border-white/55 bg-white/75 px-4 backdrop-blur">
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
              <div
                style={{
                  fontSize: "clamp(24px,3vw,34px)",
                  fontWeight: 900,
                  color: HI,
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: DIM,
                  marginTop: 5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightStrip() {
  return (
    <div
      style={{
        borderBottom: `1px solid ${LINE}`,
        padding: "14px clamp(16px,4vw,40px)",
        background: BLUE,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {serviceHighlights.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase text-white"
          >
            <span className="block h-1 w-1 rounded-full bg-white/55" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
        }}
      >
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 900,
              color: HI,
              margin: 0,
              lineHeight: 1,
            }}
          >
            What We Do
          </h2>
          <p
            style={{
              fontSize: 14,
              color: DIM,
              maxWidth: 320,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Every service is scoped around the same goal: making your business
            easier to find, trust, and buy from.
          </p>
        </div>
        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {services.map((service) => (
            <ServiceRow key={service.n} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: (typeof services)[number] }) {
  return (
    <div
      className="ch-service-row"
      style={{ borderBottom: `1px solid ${LINE}` }}
    >
      <div
        className="ch-service-main"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          padding: "34px 0",
        }}
      >
        <div
          className="ch-service-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            minWidth: 0,
          }}
        >
          <span
            className="ch-service-number"
            style={{ fontSize: 12, fontWeight: 700, color: BLUE, minWidth: 32 }}
          >
            {service.n}
          </span>
          <h3
            className="ch-service-title"
            style={{
              fontSize: "clamp(22px,2.8vw,36px)",
              fontWeight: 800,
              color: "#1E293B",
              margin: 0,
              minWidth: 200,
            }}
          >
            {service.title}
          </h3>
          <span
            className="ch-service-tag"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              background: BLUE,
              borderRadius: 4,
              padding: "4px 10px",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            {service.tag}
          </span>
        </div>
        <p
          className="ch-service-desc"
          style={{
            fontSize: 14,
            color: DIM,
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 440,
            marginLeft: "auto",
          }}
        >
          {service.desc}
        </p>
        <ArrowUpRight
          className="ch-service-arrow"
          size={18}
          color={BLUE}
          style={{ flexShrink: 0 }}
        />
      </div>

      <div
        className="ch-service-details-content"
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          paddingBottom: 28,
          paddingLeft: 68,
        }}
      >
        {service.details.map((detail) => (
          <span
            key={detail}
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: BLUE,
              background: "rgba(0,114,245,0.08)",
              border: "1px solid rgba(0,114,245,0.18)",
              borderRadius: 4,
              padding: "5px 12px",
            }}
          >
            {detail}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
        }}
      >
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 900,
              color: HI,
              margin: 0,
              lineHeight: 1,
            }}
          >
            Selected Work
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold"
            style={{
              color: HI,
              borderBottom: `2px solid ${BLUE}`,
              paddingBottom: 2,
            }}
          >
            View All Projects <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {projects.map((project, i) => (
            <Link
              key={project.title}
              href="/projects"
              className="block overflow-hidden rounded-lg border transition-transform hover:-translate-y-1"
              style={{ background: project.bg, borderColor: LINE }}
            >
              <div className="relative flex aspect-[4/3] items-center justify-center">
                <div
                  style={{
                    fontSize: "clamp(48px,7vw,80px)",
                    fontWeight: 900,
                    color: "rgba(0,114,245,0.12)",
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: BLUE }}
                >
                  <ArrowUpRight size={16} color="#fff" />
                </div>
              </div>
              <div
                style={{
                  padding: "20px 24px 24px",
                  borderTop: `1px solid ${LINE}`,
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: DIM,
                      textTransform: "uppercase",
                    }}
                  >
                    {project.cat}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: BLUE,
                      textTransform: "uppercase",
                    }}
                  >
                    {project.tag}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: HI,
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      style={{
        background: BLUE,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
        }}
      >
        <div style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              lineHeight: 1,
            }}
          >
            From Idea to Live
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.72)",
              marginTop: 14,
              maxWidth: 360,
            }}
          >
            Four clear steps. No guesswork, no surprises.
          </p>
        </div>
        <div
          className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="ch-process-step"
              style={{
                padding: "46px 34px 46px 0",
                borderRight:
                  i < steps.length - 1
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "none",
                paddingLeft: i > 0 ? 34 : 0,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 24,
                }}
              >
                {step.n}
              </div>
              <h3
                style={{
                  fontSize: "clamp(20px,2.4vw,28px)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 14,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto grid max-w-[1360px] gap-6 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {heroStats.map(([value, label]) => (
          <div
            key={label}
            className="rounded-lg border bg-white p-6"
            style={{ borderColor: LINE }}
          >
            <div
              style={{
                fontSize: "clamp(38px,5vw,64px)",
                fontWeight: 900,
                color: HI,
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: DIM,
                marginTop: 8,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
        }}
      >
        <div className="ch-why-grid">
          <div>
            <h2
              style={{
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 900,
                color: HI,
                margin: "0 0 20px",
                lineHeight: 1,
              }}
            >
              The Code Heaven
              <br />
              <span style={{ color: BLUE }}>Difference.</span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: MID,
                lineHeight: 1.8,
                marginBottom: 40,
                maxWidth: 380,
              }}
            >
              We craft digital assets that work around the clock without
              subscriptions or hidden fees.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded px-8 py-4 text-sm font-bold text-white"
              style={{ background: BLUE }}
            >
              Start a Project <ArrowRight size={17} />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderTop: `1px solid ${LINE}`,
            }}
          >
            {benefits.map((benefit, i) => (
              <div
                key={benefit}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "20px 0",
                  borderBottom: `1px solid ${LINE}`,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: BLUE,
                    marginTop: 3,
                    flexShrink: 0,
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: MID,
                    fontWeight: 500,
                    lineHeight: 1.65,
                  }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ background: BG2, borderBottom: `1px solid ${LINE}` }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
        }}
      >
        <div className="mb-10 flex items-center gap-3">
          <span
            style={{ width: 32, height: 1, background: BLUE, display: "block" }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BLUE,
              textTransform: "uppercase",
            }}
          >
            Client Testimonials
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-lg border bg-white p-6"
              style={{ borderColor: LINE }}
            >
              <blockquote
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: HI,
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: MID,
                  marginTop: 28,
                }}
              >
                {item.name}{" "}
                <span style={{ fontWeight: 500, color: DIM }}>
                  - {item.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ background: BG }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(64px,10vw,120px) clamp(16px,4vw,40px)",
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-12">
          <h2
            style={{
              fontSize: "clamp(44px,8vw,104px)",
              fontWeight: 900,
              lineHeight: 0.98,
              color: HI,
              margin: 0,
            }}
          >
            Let&apos;s Build
            <br />
            <span style={{ color: BLUE }}>Something</span>
            <br />
            Remarkable.
          </h2>
          <div style={{ maxWidth: 380 }}>
            <p
              style={{
                fontSize: 16,
                color: MID,
                lineHeight: 1.75,
                marginBottom: 32,
              }}
            >
              Transparent pricing, full ownership, and modern design. Your
              digital growth gets a cleaner foundation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded px-9 py-4 text-sm font-black text-white"
              style={{ background: BLUE }}
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReferralSection() {
  return (
    <section
      style={{
        background: BG2,
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
        }}
      >
        <div className="mb-10 flex items-center gap-3">
          <span
            style={{ width: 32, height: 1, background: BLUE, display: "block" }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BLUE,
              textTransform: "uppercase",
            }}
          >
            Referral Partner Program
          </span>
        </div>

        <div className="ch-why-grid">
          <div>
            <h2
              style={{
                fontSize: "clamp(32px,4.5vw,60px)",
                fontWeight: 900,
                color: HI,
                margin: "0 0 20px",
                lineHeight: 1,
              }}
            >
              More referrals.
              <br />
              <span style={{ color: BLUE }}>More earnings.</span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: MID,
                lineHeight: 1.8,
                maxWidth: 390,
                marginBottom: 36,
              }}
            >
              Earn commission on every project you refer. We handle the sales
              call, proposal, and onboarding.
            </p>
            <Link
              href="/referral"
              className="inline-flex items-center gap-2 rounded px-8 py-4 text-sm font-bold text-white"
              style={{ background: BLUE }}
            >
              See the Program <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderTop: `1px solid ${LINE}`,
            }}
          >
            {[
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
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "24px 0",
                  borderBottom: `1px solid ${LINE}`,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: BLUE,
                    marginTop: 3,
                    flexShrink: 0,
                    minWidth: 24,
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: HI,
                      marginBottom: 4,
                    }}
                  >
                    {step.title}
                  </div>
                  <div style={{ fontSize: 13, color: MID, lineHeight: 1.65 }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ background: BG, color: HI, minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <HighlightStrip />
        <Services />
        <ProjectsSection />
        <ProcessSection />
        <StatsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CTASection />
        <ReferralSection />
      </main>
      <Footer />
    </div>
  );
}
