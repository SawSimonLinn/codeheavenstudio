import Link from "next/link";
import {
  Utensils,
  Building2,
  Lightbulb,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const industries = [
  {
    icon: Utensils,
    title: "Restaurant Websites",
    description:
      "A great restaurant website does more than look good—it drives reservations, showcases your menu, and gives people a taste of the experience before they arrive.",
    features: [
      "Online menu with photos",
      "Reservation & booking links",
      "Google Maps integration",
      "Opening hours & contact",
      "Instagram feed integration",
      "Mobile-optimized layout",
    ],
    cta: "See an example",
    href: "/projects",
  },
  {
    icon: Building2,
    title: "Small Business Websites",
    description:
      "Whether you run a salon, a law firm, or a local shop, your website is often the first impression. We make sure it builds trust and turns visitors into paying customers.",
    features: [
      "Professional design",
      "Services & pricing pages",
      "Contact forms",
      "Google Business integration",
      "Testimonials section",
      "SEO-ready structure",
    ],
    cta: "Get started",
    href: "/contact",
  },
  {
    icon: Lightbulb,
    title: "Startup Websites",
    description:
      "Startups need to move fast and look credible. We build clean, conversion-focused websites that communicate your value proposition and help you acquire early customers.",
    features: [
      "Landing page or full site",
      "Email capture & waitlist",
      "Investor-ready design",
      "Fast launch turnaround",
      "Scalable architecture",
      "Analytics ready",
    ],
    cta: "Let's talk",
    href: "/contact",
  },
  {
    icon: MapPin,
    title: "Local Business SEO",
    description:
      "If you serve a local area, you need to show up when people search for what you offer nearby. We optimize your site and Google Business profile to put you on the map—literally.",
    features: [
      "Google Business Profile setup",
      "Local keyword targeting",
      "Location pages",
      "Review management guidance",
      "Citation building",
      "Monthly ranking reports",
    ],
    cta: "Improve my rankings",
    href: "/contact",
  },
];

const featuredWork = [
  {
    name: "Bangkok Soul",
    type: "Thai Restaurant",
    location: "USA",
    result: "Professional online presence with menu, gallery, and Google Maps integration.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Header />
    <main>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Industries We Serve
          </p>
          <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            We Know Your{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Industry
            </span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
            We don&apos;t build generic websites. We focus on specific niches so we can deliver
            exactly what works for your type of business.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.title}
                  className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-headline text-2xl font-bold mb-3">{industry.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {industry.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 flex-1">
                    {industry.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="rounded-full w-fit">
                    <Link href={industry.href} className="flex items-center gap-2">
                      {industry.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="bg-muted/40 py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">
            Businesses We&apos;ve Helped
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Real results for real businesses—here&apos;s a look at some of the clients we&apos;ve worked with.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWork.map((work) => (
              <div key={work.name} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Utensils className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{work.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {work.type} · {work.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{work.result}</p>
              </div>
            ))}
            {/* More coming card */}
            <div className="rounded-2xl border border-dashed bg-card/50 p-6 flex flex-col items-center justify-center text-center gap-3">
              <p className="text-sm font-semibold text-muted-foreground">More projects coming soon</p>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link href="/projects" className="flex items-center gap-2 text-primary">
                  View all work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Is your industry here?
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            We work with businesses outside these categories too. If you need a website, let&apos;s
            talk—we&apos;ll figure out what works for you.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/contact">Start the Conversation</Link>
          </Button>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
