import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Custom admin & staff dashboards",
  "Online order management system",
  "Inventory & product tracking",
  "Role-based user access control",
  "Real-time data updates",
  "Internal forms & workflow tools",
  "Reporting & analytics views",
  "Mobile-friendly responsive UI",
];

const useCases = [
  "Restaurant order & kitchen display systems",
  "Internal HR & employee portals",
  "Inventory management for retail & warehouses",
  "Custom booking & scheduling tools",
  "Sales & CRM dashboards for small teams",
  "Multi-branch business management panels",
];

const whyUs = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Built Around Your Workflow",
    desc: "We don't force you into off-the-shelf software. Every system is shaped around how your team actually works.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Made for Real Teams",
    desc: "From front-of-house staff to back-office managers, we design interfaces everyone can actually use.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Secure & Role-Based",
    desc: "Control who sees what. Admin, manager, and staff roles with separate permissions out of the box.",
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-primary" />,
    title: "Easy to Maintain & Scale",
    desc: "Clean code, clear documentation, and a system that grows with your business, not against it.",
  },
];

export default function FullstackInternalWebsitesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Layers className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Fullstack Internal{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Web Systems
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Custom-built web applications for your team order systems, dashboards, staff
              portals, and internal tools designed to make your operations faster and smarter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/contact">Discuss Your System</Link>
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
                A fully custom internal system built from the ground up for your business needs.
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

        {/* Use Cases */}
        <section className="py-20 sm:py-28 bg-muted/40">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Who It&apos;s For
              </h2>
              <p className="text-muted-foreground text-lg">
                Internal systems for businesses that have outgrown spreadsheets and generic software.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {useCases.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
                  <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item}</span>
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
                Why businesses choose us
              </h2>
              <p className="text-muted-foreground text-lg">
                We build systems your team will actually use, not tools that collect dust.
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
              Ready to build your internal system?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us what your team needs. We&apos;ll scope it out, price it clearly, and build it right.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Let&apos;s Talk <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
