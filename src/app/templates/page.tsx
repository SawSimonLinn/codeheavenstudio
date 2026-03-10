"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  DollarSign,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Globe,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Paintbrush,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const templates = [
  {
    id: "fullstack-restaurant-cms",
    category: "Restaurant",
    title: "Full-Stack Restaurant + CMS",
    tagline: "Update your menu anytime, no developer needed",
    description:
      "A full-stack restaurant website powered by a CMS so staff can edit menus, specials, and content without touching code. Combines cultural storytelling, online ordering, and a polished brand experience.",
    features: [
      "CMS-powered editable menu (no dev needed)",
      "Story / culture page for brand identity",
      "Online ordering & reservation links",
      "High-quality photo gallery",
      "Location, hours & contact section",
      "Local SEO + mobile-first design",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    timeline: "4–5 weeks",
    startingAt: "$1,725",
    imageUrl: "/previousWorks/previous-work_02.png",
    liveExampleSlug: "blue-bird-haus-sushi",
    badge: "Most Popular",
  },
  {
    id: "restaurant-booking",
    category: "Restaurant",
    title: "Restaurant + Online Ordering & Booking",
    tagline: "Every service your restaurant needs, in one site",
    description:
      "Built for restaurants with multiple menus, reservations, and online ordering needs. A unified digital hub where customers can browse, book, and order, and you manage it all from one place.",
    features: [
      "Multiple menu sections (diner, brunch, happy hour)",
      "Integrated online ordering system",
      "Reservation & private events booking",
      "Gift card & loyalty section",
      "Full photo gallery (patio, bar, signature dishes)",
      "Performance + SEO optimized",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeline: "4–5 weeks",
    startingAt: "$1,725",
    imageUrl: "/previousWorks/previous-work_06.png",
    liveExampleSlug: "dunedin-sd",
    badge: null,
  },
  {
    id: "internal-admin-dashboard",
    category: "Internal Tool",
    title: "Internal Admin Dashboard",
    tagline: "A command center for your team's daily operations",
    description:
      "A custom internal dashboard that gives your team a clear, real-time view of business data. Manage records, track metrics, and take action from a secure, fast web-based tool built for your workflow.",
    features: [
      "Role-based access with secure login",
      "Live data tables with search & filters",
      "Metric cards and summary charts",
      "Create, edit & delete records",
      "Export data (CSV / PDF)",
      "Mobile-accessible for on-the-go teams",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    timeline: "5–6 weeks",
    startingAt: "$1,725",
    imageUrl: "/previousWorks/previous-work_01.png",
    liveExampleSlug: "crypto-dashboard",
    badge: null,
  },
  {
    id: "service-business-admin",
    category: "Business Platform",
    title: "Service Business + Admin Panel",
    tagline: "Online applications & full back-office control",
    description:
      "For service businesses that need customers to apply or submit forms online, with a secure internal admin panel to review, filter, and manage all submissions. No spreadsheets required.",
    features: [
      "Multi-form online application system",
      "Secure admin panel with login",
      "Applicant data management & filtering",
      "Email notifications on new submissions",
      "Mobile-friendly public-facing site",
      "Full data ownership, no third-party lock-in",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    timeline: "5–6 weeks",
    startingAt: "$1,725",
    imageUrl: "/previousWorks/previous-work_04.png",
    liveExampleSlug: "ventures-quality-insurance",
    badge: null,
  },
  {
    id: "cafe-small-business",
    category: "Cafe / Small Business",
    title: "Cafe & Small Business Landing Page",
    tagline: "A cozy corner of the internet for your business",
    description:
      "A warm, atmosphere-first landing page that leads with your space and story. Perfect for cafes, co-working spots, and local small businesses that want to attract foot traffic and make a strong first impression online.",
    features: [
      "Atmosphere-first hero with space photography",
      "Menu highlights & specials section",
      "Co-working perks & amenities display",
      "Location, hours & parking info",
      "Instagram / social feed integration",
      "Local SEO for neighborhood discovery",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeline: "3 weeks",
    startingAt: "$938",
    imageUrl: "/previousWorks/previous-work_07.png",
    liveExampleSlug: "about-time-cafe",
    badge: null,
  },
  {
    id: "personal-brand",
    category: "Personal Brand",
    title: "Personal Brand Website",
    tagline: "Your professional presence, built to impress",
    description:
      "A sleek personal website that positions you as the expert. Perfect for freelancers, coaches, consultants, and creatives who want to stand out and win clients online.",
    features: [
      "Hero & bio section with your story",
      "Portfolio / work showcase gallery",
      "Services & pricing block",
      "Testimonials & social proof section",
      "Contact & booking form",
      "SEO & performance optimized",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeline: "3–4 weeks",
    startingAt: "$938",
    imageUrl: null,
    gradientFrom: "from-primary",
    gradientTo: "to-purple-500",
    liveExampleSlug: null,
    badge: "Great for Freelancers",
  },
];

const categories = [
  "All",
  "Restaurant",
  "Internal Tool",
  "Business Platform",
  "Cafe / Small Business",
  "Personal Brand",
];

const universalInclusions = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Every template is fully responsive and tested across phones, tablets, and desktops.",
  },
  {
    icon: Globe,
    title: "SEO-Ready Structure",
    description:
      "Clean code, proper meta tags, and page structure optimized for Google search.",
  },
  {
    icon: BarChart3,
    title: "Google Analytics Setup",
    description: "Track visitors, traffic sources, and conversions from day one.",
  },
  {
    icon: ShieldCheck,
    title: "SSL & Secure Hosting",
    description:
      "Hosted with HTTPS, SSL certificate, and reliable uptime included.",
  },
  {
    icon: Paintbrush,
    title: "Full Brand Customization",
    description:
      "Your colors, fonts, logo, and content, fully applied to the template.",
  },
  {
    icon: Headphones,
    title: "Post-Launch Support",
    description:
      "2 weeks of support after launch included. Extended options available.",
  },
];

const faqs = [
  {
    question: "Are these templates fully customized for my business?",
    answer:
      "Yes, templates are starting points, not cookie-cutter outputs. We apply your brand colors, fonts, logo, and all your content. The result looks and feels like it was built exclusively for you.",
  },
  {
    question: "Can I request features not listed in the template?",
    answer:
      "Absolutely. Every project starts with a free consultation call where we scope your exact needs. Features can be added or removed from any template.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Most templates go live in 3–6 weeks depending on complexity, how quickly content is provided, and revision rounds. We keep you updated throughout.",
  },
  {
    question: "Do I own the website after it's built?",
    answer:
      "100%. You own the code, the domain, and everything on it. We don't lock you into proprietary platforms or charge recurring platform fees.",
  },
  {
    question: "What if I need ongoing updates after launch?",
    answer:
      "We offer Website Maintenance & Support plans starting at $200/mo covering updates, backups, bug fixes, and priority support. Details on our pricing page.",
  },
  {
    question: "Can I see a live demo before committing?",
    answer:
      "Yes, for most templates we have live examples you can browse. Click 'See Example' on any template card. For the personal brand template, we can walk you through examples on a free consultation call.",
  },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Starter Templates
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Launch Faster With a{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Proven Design
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Pick a starter template built for your industry. We customize every
              detail: brand, content, and features, so you go live in weeks,
              not months.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/contact">Request a Template</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/projects">See Live Examples</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Category Filters ─────────────────────────────────── */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Templates Grid ───────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-24">
                No templates in this category yet.
              </p>
            )}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>

        {/* ── What's Included in Every Template ───────────────── */}
        <section className="bg-muted/40 py-16 sm:py-24 border-y border-border">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                Standard Inclusions
              </p>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                What Every Template Includes
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                These are not extras. They are built into every project
                we deliver.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universalInclusions.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border bg-card p-6"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How Templates Work ───────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                The Process
              </p>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                How Templates Work
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Templates are a starting point, not a constraint. We customize
                every detail to fit your brand.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Pick Your Template",
                  desc: "Choose the starter that best fits your industry and goals.",
                },
                {
                  step: "02",
                  title: "Free Consultation Call",
                  desc: "We scope your project, discuss features, and confirm the timeline.",
                },
                {
                  step: "03",
                  title: "We Build & Customize",
                  desc: "Your colors, content, logo, and copy, all tailored to your brand.",
                },
                {
                  step: "04",
                  title: "Review, Revise & Launch",
                  desc: "You review the build, we refine it, then deploy your site live.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <span className="block text-6xl font-black text-muted/40 leading-none mb-3">
                    {step}
                  </span>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="bg-muted/40 py-16 sm:py-24 border-y border-border">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                FAQ
              </p>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight">
                Common Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-card overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-sm sm:text-base">
                      {faq.question}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Custom CTA Banner ────────────────────────────────── */}
        <section className="py-12 sm:py-16 border-b border-border">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Need something fully custom?</h3>
                <p className="text-sm text-muted-foreground">
                  None of these fit? We build bespoke websites from scratch too.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 shrink-0"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Request a Custom Site <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Ready to Start?
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Let&apos;s build your website.
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us which template caught your eye and we&apos;ll reach out
              with next steps, no commitment required.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ── Template Card ────────────────────────────────────────────────── */
function TemplateCard({ template }: { template: (typeof templates)[number] }) {
  return (
    <div className="relative rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
      {/* Badge */}
      {template.badge && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 shadow">
          {template.badge}
        </span>
      )}

      {/* Screenshot / Preview */}
      <div className="relative h-52 bg-muted overflow-hidden shrink-0">
        {template.imageUrl ? (
          <Image
            src={template.imageUrl}
            alt={template.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${
              (template as { gradientFrom?: string }).gradientFrom ?? "from-primary"
            } ${
              (template as { gradientTo?: string }).gradientTo ?? "to-purple-500"
            } flex items-center justify-center`}
          >
            <span className="text-white/50 text-sm font-semibold uppercase tracking-widest">
              Preview on Request
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Category + title */}
        <div className="mb-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary px-2.5 py-0.5 mb-2">
            {template.category}
          </span>
          <h2 className="font-headline text-xl font-bold leading-snug mb-1">
            {template.title}
          </h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {template.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {template.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {template.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {template.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Meta row: timeline + price */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            {template.timeline}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <DollarSign className="h-4 w-4 shrink-0" />
            From {template.startingAt}
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Button
            asChild
            className="flex-1 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link
              href={`/contact?template=${encodeURIComponent(template.title)}`}
            >
              Get This Template <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {template.liveExampleSlug && (
            <Button asChild variant="outline" className="rounded-full shrink-0">
              <Link
                href={`/projects/${template.liveExampleSlug}`}
                className="flex items-center gap-1.5"
              >
                See Example <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
