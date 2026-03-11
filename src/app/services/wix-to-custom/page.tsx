import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  XCircle,
  Zap,
  Lock,
  TrendingUp,
  Code2,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Builder to Custom Website Redesign | Code Heaven Studio",
  description:
    "Escape website builder limitations. We rebuild your Wix, Squarespace, or Webflow site into a blazing-fast, SEO-optimized, custom-coded site you 100% own. No monthly fees, no restrictions.",
  alternates: { canonical: "https://www.codeheavenstudio.com/services/wix-to-custom" },
  openGraph: {
    title: "Website Builder to Custom Website Redesign | Code Heaven Studio",
    description:
      "Stop paying monthly for a slow, limited website. We rebuild it with real code, full SEO, and hand you 100% ownership.",
    url: "https://www.codeheavenstudio.com/services/wix-to-custom",
  },
};

const builderProblems = [
  "Monthly subscription fees that never stop",
  "Slow load times that hurt Google rankings",
  "Limited SEO: meta tags buried, no schema markup",
  "You don't own the code. The platform does.",
  "Cookie-cutter templates that look like everyone else",
  "Hard to scale or add custom features",
  "No real analytics or conversion tracking control",
  "Platform branding in your URL (unless you pay more)",
];

const whatYouGet = [
  {
    icon: <Code2 className="h-6 w-6 text-primary" />,
    title: "Real Code You Own 100%",
    desc: "Built with Next.js and React. Modern, production-grade code delivered to you or deployed on your server. No middleman, no lock-in.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Full SEO Optimization",
    desc: "Proper meta tags, Open Graph, schema markup, sitemap, fast Core Web Vitals scores, and keyword-targeted copy that ranks on Google.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Blazing Fast Performance",
    desc: "Custom-built sites score 90+ on Google PageSpeed. Faster sites rank higher, bounce less, and convert more visitors into customers.",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "Gain More Customers",
    desc: "A site that shows up in search results, loads instantly, and is designed to convert. Not just look pretty.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "No More Monthly Fees",
    desc: "Pay once, own it forever. You'll only pay for your own hosting (typically $5-20/month). Never another builder subscription.",
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Custom Design, Not a Template",
    desc: "Your new site is designed specifically for your brand and industry. Built to stand out, not blend in.",
  },
];

const process = [
  {
    step: "01",
    title: "Audit Your Current Site",
    desc: "We review your existing site, identify all pages, content, and any SEO data worth migrating.",
  },
  {
    step: "02",
    title: "Design Your New Site",
    desc: "We design a modern, custom UI tailored to your brand. You'll review and approve before we write a single line of code.",
  },
  {
    step: "03",
    title: "Build with Real Code",
    desc: "We develop your site using Next.js and React with full SEO setup, responsive layout, and optimized performance.",
  },
  {
    step: "04",
    title: "Migrate Your Content",
    desc: "All your pages, text, images, and any SEO equity are carefully moved over. Nothing important is lost.",
  },
  {
    step: "05",
    title: "Launch & Hand Over",
    desc: "We deploy your new site, verify everything works, and hand you full ownership of the codebase.",
  },
];

export default function WixToCustomPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="container mx-auto max-w-7xl px-4 text-center relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest mb-6">
              Popular Service
            </div>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Escape website builders.{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Own your website.
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              We rebuild your Wix, Squarespace, or Webflow site into a blazing-fast, SEO-optimized,
              custom-coded website that you own 100%. No monthly fees. No restrictions. No platform
              branding.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/request-website">Rebuild My Site</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/projects">See Our Work</Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "90+", label: "PageSpeed Score" },
                { value: "100%", label: "Code Ownership" },
                { value: "$0", label: "Builder Fees After Launch" },
                { value: "3x", label: "More Google Traffic" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-5"
                >
                  <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-secondary-foreground/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Why website builders are holding you back
              </h2>
              <p className="text-muted-foreground text-lg">
                They&apos;re easy to start on, but were never built for serious business growth.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {builderProblems.map((problem) => (
                <div
                  key={problem}
                  className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                >
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                What you get with a custom rebuild
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything your business needs to rank, convert, and grow. Without the builder handcuffs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whatYouGet.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs After */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Website Builder vs. Custom Built
              </h2>
              <p className="text-muted-foreground text-lg">
                Side by side, the difference is clear.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Builder column */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="font-bold text-lg">Website Builder Site</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Slow load times (3–6 seconds average)",
                    "Limited SEO capability",
                    "Monthly fees forever",
                    "Template-based, looks generic",
                    "The platform owns your site",
                    "Hard to add custom features",
                    "Poor mobile performance",
                    "Platform ads and branding",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Custom column */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-bold text-lg">Custom Built Website</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Under 1 second load time",
                    "Full SEO: schema, sitemaps, meta, Core Web Vitals",
                    "One-time cost, you pay only for hosting",
                    "Unique design built for your brand",
                    "You own 100% of the code",
                    "Unlimited custom features",
                    "Perfect mobile experience",
                    "Zero third-party branding",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                How the migration works
              </h2>
              <p className="text-muted-foreground text-lg">
                A smooth, structured process. Your business never goes dark.
              </p>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col gap-0">
              {process.map((step, i) => (
                <div key={step.step} className="flex gap-5 relative">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm z-10">
                      {step.step}
                    </div>
                    {i < process.length - 1 && (
                      <div className="w-px flex-1 bg-border my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Common questions
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "Will I lose my Google rankings when I switch?",
                  a: "No. We carefully migrate all your existing URLs and set up proper 301 redirects. Your SEO equity is preserved, and the performance improvements typically increase rankings within 60-90 days.",
                },
                {
                  q: "Do I need to know how to code to manage my new site?",
                  a: "No. We can build a simple content management interface, or document the parts you'll need to update. Most clients never need to touch the code.",
                },
                {
                  q: "What happens to my current subscription?",
                  a: "Once your new site is live, you cancel your builder plan. Done. You only pay for your new hosting (~$5-20/month). That's it.",
                },
                {
                  q: "How long does the rebuild take?",
                  a: "Most migrations take 2–4 weeks depending on site size and complexity. We'll give you a precise timeline after reviewing your current site.",
                },
                {
                  q: "Do I truly own 100% of the code?",
                  a: "Yes, 100%. We deliver the full source code to you or a private Git repository. You can host it anywhere, modify it, or hand it to any developer in the future.",
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-2xl border bg-card p-6">
                  <h3 className="font-semibold text-base mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="container mx-auto max-w-7xl px-4 text-center relative">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Ready to leave website builders behind?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us about your current site. We&apos;ll show you exactly what your new site
              will look like, before you commit to anything.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Start My Rebuild <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
