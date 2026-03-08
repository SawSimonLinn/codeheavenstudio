import Link from "next/link";
import { Wrench, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw, HeadphonesIcon, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Monthly security patches & updates",
  "Plugin / dependency updates",
  "Content updates (text, images, pages)",
  "Performance monitoring & speed checks",
  "Uptime monitoring with alerts",
  "Bug fixes & broken link repair",
  "Monthly backup & restore coverage",
  "Priority support via email or chat",
];

const whyUs = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Security First",
    desc: "Outdated sites get hacked. We keep your dependencies, CMS, and plugins up to date every month.",
  },
  {
    icon: <Activity className="h-6 w-6 text-primary" />,
    title: "Always Watching",
    desc: "Uptime monitoring means we know if your site goes down before you do. We fix it fast.",
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-primary" />,
    title: "Fresh Content, No Hassle",
    desc: "Need to update a price, swap a photo, or add a new page? Just message us. It's covered.",
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6 text-primary" />,
    title: "Priority Support",
    desc: "Maintenance clients go to the front of the queue. No waiting around when something urgent comes up.",
  },
];

const plans = [
  {
    name: "Basic",
    price: "$49",
    period: "/ month",
    desc: "Great for simple brochure sites that just need to stay healthy.",
    perks: ["Security updates", "Monthly backups", "Uptime monitoring", "Email support"],
  },
  {
    name: "Standard",
    price: "$99",
    period: "/ month",
    desc: "For active businesses that need regular content updates too.",
    perks: ["Everything in Basic", "Up to 2 hrs content updates", "Performance checks", "Priority support"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "$199",
    period: "/ month",
    desc: "Full-service care for businesses that depend on their site daily.",
    perks: ["Everything in Standard", "Up to 5 hrs content updates", "SEO monitoring", "Slack / chat support"],
  },
];

export default function WebsiteMaintenancePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Wrench className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Website{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Maintenance
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Your website is not a one-time project. It needs ongoing care. We handle updates,
              security, backups, and content changes so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/request-website">Get a Maintenance Plan</Link>
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
                Everything needed to keep your site healthy, secure, and up to date month after month.
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

        {/* Plans */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Simple monthly plans
              </h2>
              <p className="text-muted-foreground text-lg">
                No contracts. Cancel anytime. Pick the level that fits your site.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-6 shadow-sm flex flex-col ${
                    plan.highlight
                      ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary"
                      : "bg-card"
                  }`}
                >
                  {plan.highlight && (
                    <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-headline text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="sm"
                    variant={plan.highlight ? "default" : "outline"}
                    className="rounded-full w-full"
                  >
                    <Link href="/request-website">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Why choose us for maintenance
              </h2>
              <p className="text-muted-foreground text-lg">
                We built your site, or we can take over any existing site and maintain it right.
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
              Keep your site in great shape.
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Let us handle the technical side so you never have to worry about your website again.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Get a Maintenance Plan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
