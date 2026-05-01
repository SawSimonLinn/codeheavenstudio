import Link from "next/link";
import { Layout, CheckCircle2, ArrowRight, Target, FlaskConical, MousePointerClick, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Conversion-focused layout and copywriting",
  "Lead capture forms with email integration",
  "A/B test ready structure",
  "Fast load times for better ad performance",
  "Mobile-first responsive design",
  "Analytics and tracking setup",
  "Custom domain and deployment",
  "Fast turnaround, live within days",
];

const whyUs = [
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "One Goal, Zero Distractions",
    desc: "Every element on the page is designed to move the visitor toward a single action. No navigation, no noise, just results.",
  },
  {
    icon: <MousePointerClick className="h-6 w-6 text-primary" />,
    title: "Built to Convert",
    desc: "We use proven layout patterns, strong CTAs, and persuasive copy structure to maximise the number of visitors who take action.",
  },
  {
    icon: <FlaskConical className="h-6 w-6 text-primary" />,
    title: "A/B Test Ready",
    desc: "Want to test two headlines or CTAs? We build pages with experimentation in mind so you can optimise over time.",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Fast Turnaround",
    desc: "Campaigns don&apos;t wait. We move quickly so your landing page is live and ready before your budget starts burning.",
  },
];

export const metadata = {
  title: "Landing Pages | Code Heaven Studio",
  description:
    "High-converting landing pages built for campaigns, product launches, and lead generation. One page, one goal, maximum impact.",
  openGraph: {
    title: "Landing Pages | Code Heaven Studio",
    description: "One page. One goal. Maximum impact.",
  },
};

export default function LandingPagesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Layout className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Landing{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Pages
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Need to launch a campaign, promote a product, or capture leads? We build high-converting
              landing pages designed with a single focused goal in mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/request-website">Build My Landing Page</Link>
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
                A focused, high-performance page built to drive real results for your campaign.
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
                Why launch with us
              </h2>
              <p className="text-muted-foreground text-lg">
                We build pages that turn ad clicks into customers.
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
              Your campaign deserves a great page.
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us your goal and your audience. We&apos;ll build a page that converts.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Start My Campaign <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
