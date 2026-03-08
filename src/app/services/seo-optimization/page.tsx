import Link from "next/link";
import { Search, CheckCircle2, ArrowRight, BarChart2, MapPin, FileSearch, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Full SEO audit of your existing site",
  "Keyword research for your industry & location",
  "On-page SEO (titles, meta, headings, content)",
  "Technical SEO (crawlability, speed, structure)",
  "Local SEO & Google Business Profile setup",
  "Schema markup implementation",
  "Competitor analysis",
  "Monthly reporting & progress tracking",
];

const whyUs = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Local SEO First",
    desc: "Most of our clients are local businesses. We know how to rank you in your city and neighborhood, not just globally.",
  },
  {
    icon: <FileSearch className="h-6 w-6 text-primary" />,
    title: "Real Audits, Real Fixes",
    desc: "We don't just hand you a report. We implement the fixes ourselves, so improvements actually happen.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Transparent Reporting",
    desc: "You get clear monthly reports showing keyword rankings, traffic, and what changed. No jargon, just results.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Speed = SEO",
    desc: "Google rewards fast sites. Every optimization we do includes performance improvements to boost your rankings further.",
  },
];

export default function SeoOptimizationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              SEO{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Optimization
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Be found by the people searching for you. We improve your Google rankings through
              technical SEO, content structure, and local optimization that actually moves the needle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/free-audit">Get a Free SEO Audit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/codeheavenpricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                What&apos;s Included
              </h2>
              <p className="text-muted-foreground text-lg">
                A complete SEO service, from initial audit to ongoing improvements and reporting.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {features.map((feat) => (
                <div key={feat} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                SEO that actually works
              </h2>
              <p className="text-muted-foreground text-lg">
                No black hat tricks. No empty promises. Just solid fundamentals done right.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyUs.map((item) => (
                <div key={item.title} className="rounded-2xl border bg-card p-6 shadow-sm flex gap-4">
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Start ranking. Start growing.
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              We&apos;ll audit your site for free and show you exactly what&apos;s holding you back on Google.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/free-audit" className="flex items-center gap-2">
                Request Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
