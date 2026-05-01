import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />,
    text: "Full SEO optimization: rank on Google, gain customers",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />,
    text: "Real code (Next.js + React), not a drag-and-drop template",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />,
    text: "100% code ownership, delivered directly to you",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />,
    text: "Ditch the monthly subscription. Pay once, own it for life.",
  },
];

const builderIssues = [
  { icon: <XCircle className="h-4 w-4 text-red-400 shrink-0" />, text: "Slow load times" },
  { icon: <XCircle className="h-4 w-4 text-red-400 shrink-0" />, text: "Limited SEO" },
  { icon: <XCircle className="h-4 w-4 text-red-400 shrink-0" />, text: "Monthly fees forever" },
  { icon: <XCircle className="h-4 w-4 text-red-400 shrink-0" />, text: "You don't own the code" },
];

export default function WixRedesignHighlight() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-secondary text-secondary-foreground">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest mb-6">
              Popular Service
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-5">
              Still on a website builder?{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Let&apos;s fix that.
              </span>
            </h2>
            <p className="text-secondary-foreground/70 text-lg leading-relaxed mb-8 max-w-lg">
              We rebuild your Wix, Squarespace, or Webflow site into a custom-coded, SEO-optimized
              site that ranks on Google, loads in under a second, and is 100% yours. Forever.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-center gap-3 text-sm font-medium">
                  {b.icon}
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/services/wix-to-custom" className="flex items-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/request-website">Get a Free Quote</Link>
              </Button>
            </div>
          </div>

          {/* Right: Visual comparison card */}
          <div className="flex flex-col gap-4">
            {/* Wix card (problem) */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="h-4 w-4 text-red-500" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide text-red-500">
                  Your Website Builder Site
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {builderIssues.map((issue) => (
                  <div
                    key={issue.text}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-secondary-foreground/70"
                  >
                    {issue.icon}
                    {issue.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="h-6 w-px bg-border" />
                <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  We rebuild it
                </div>
                <div className="h-6 w-px bg-border" />
              </div>
            </div>

            {/* Custom site card (solution) */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide text-primary">
                  Your New Custom Site
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Zap className="h-5 w-5 text-primary" />, label: "90+ Speed", sub: "PageSpeed Score" },
                  { icon: <TrendingUp className="h-5 w-5 text-primary" />, label: "3x Traffic", sub: "From Google SEO" },
                  { icon: <ShieldCheck className="h-5 w-5 text-primary" />, label: "100% Yours", sub: "Full ownership" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center rounded-xl bg-primary/10 px-3 py-4 gap-2"
                  >
                    {stat.icon}
                    <span className="font-bold text-sm leading-tight">{stat.label}</span>
                    <span className="text-[10px] text-secondary-foreground/60 leading-tight">{stat.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
