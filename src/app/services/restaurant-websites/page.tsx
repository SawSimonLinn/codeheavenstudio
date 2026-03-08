import Link from "next/link";
import { Utensils, CheckCircle2, ArrowRight, MapPin, Smartphone, Star, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Online menu display (PDF or custom-built)",
  "Reservation & booking integration",
  "Google Maps embed + directions",
  "Food photo gallery",
  "Mobile-first, fast-loading design",
  "SEO-ready structure for local search",
  "Social media links & Instagram feed",
  "Contact form & click-to-call button",
];

const whyUs = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Local SEO Built In",
    desc: "We optimize every restaurant site for local search so hungry people nearby find you first on Google.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: "Mobile-First Design",
    desc: "Over 70% of restaurant searches happen on mobile. Your site looks perfect on every screen.",
  },
  {
    icon: <Star className="h-6 w-6 text-primary" />,
    title: "First Impressions Matter",
    desc: "We design sites that make people want to walk through your door before they even leave the house.",
  },
  {
    icon: <CalendarCheck className="h-6 w-6 text-primary" />,
    title: "Reservations & Orders",
    desc: "Connect OpenTable, Resy, or a custom form. We handle the integration for you.",
  },
];

export default function RestaurantWebsitesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Utensils className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Restaurant{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Websites
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Hungry customers deserve a great first impression. We build fast, beautiful restaurant
              websites that turn visitors into regulars.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/request-website">Request Your Restaurant Site</Link>
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
                Everything your restaurant website needs to attract customers and keep them coming back.
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
                Why restaurants choose us
              </h2>
              <p className="text-muted-foreground text-lg">
                We&apos;ve built sites for food businesses and know exactly what works.
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
              Ready to fill more tables?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us about your restaurant and we&apos;ll put together a plan. No pressure, no commitment.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
