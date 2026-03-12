import Link from "next/link";
import {
  Monitor,
  Utensils,
  ShoppingCart,
  Layout,
  Search,
  Wrench,
  Palette,
  PenLine,
  Layers,
  ArrowRight,
  CheckCircle2,
  ArrowLeftRight,
  RefreshCw,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const services = [
  {
    icon: Monitor,
    title: "Small Business Websites",
    tagline: "Fast, custom sites built to convert",
    description:
      "We design and develop fast, responsive websites tailored to your brand. Every site is built with clean code, great UX, and a focus on converting visitors into customers.",
    features: ["Mobile-first design", "SEO-ready structure", "Fast load times", "CMS integration"],
    href: "/services/small-business-websites",
  },
  {
    icon: Utensils,
    title: "Restaurant Websites",
    tagline: "Hungry customers deserve a great first impression",
    description:
      "We specialize in websites for restaurants: menus, reservations, Google Maps integration, and photo galleries that make people want to visit before they even walk in the door.",
    features: ["Online menu display", "Reservation links", "Google Maps embed", "Mobile optimized"],
    href: "/services/restaurant-websites",
  },
  {
    icon: ArrowLeftRight,
    title: "Wix to Custom Website",
    tagline: "Escape Wix. Own your site 100%.",
    description:
      "Still stuck on Wix? We migrate your site to a fully custom, self-owned website built on modern tech. No more monthly fees, no more limitations just a site you actually own.",
    features: ["Full site migration", "Improved performance", "No platform lock-in", "SEO preservation"],
    href: "/services/wix-to-custom",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    tagline: "Modernise and improve your existing site",
    description:
      "Got an outdated website that's hurting your brand? We redesign it from the ground up faster, sharper, and built to convert. Same domain, completely new experience.",
    features: ["Full visual redesign", "Performance improvements", "Better UX & conversion", "Content refresh"],
    href: "/services/website-redesign",
  },
  {
    icon: PenTool,
    title: "Figma to Website",
    tagline: "Your design. Built pixel perfect.",
    description:
      "Already have a Figma design you love? We'll bring it to life exactly as designed pixel perfect, fully responsive, and production-ready. Hand us the file and we handle the rest.",
    features: ["Pixel-perfect implementation", "Fully responsive", "Clean, production-ready code", "Works with any Figma design"],
    href: "/services/figma-to-website",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Websites",
    tagline: "Sell more with a store that works",
    description:
      "From product listings to checkout, we build e-commerce experiences that are simple to manage and easy for your customers to use, so you can focus on running your business.",
    features: ["Product management", "Secure checkout", "Inventory tracking", "Payment integration"],
    href: "/services/ecommerce-websites",
  },
  {
    icon: Layout,
    title: "Landing Pages",
    tagline: "One page. One goal. Maximum impact.",
    description:
      "Need to launch a campaign, promote a product, or capture leads? We build high-converting landing pages designed with a single focused goal in mind.",
    features: ["Conversion-focused", "A/B test ready", "Lead capture forms", "Fast turnaround"],
    href: "/services/landing-pages",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    tagline: "Be found by the people searching for you",
    description:
      "We improve your site's visibility in Google search results through technical SEO, content structure, keyword targeting, and local SEO strategies for your area.",
    features: ["Keyword research", "On-page SEO", "Local SEO", "Performance audits"],
    href: "/services/seo-optimization",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    tagline: "Keep your site healthy, secure, and up to date",
    description:
      "Websites need ongoing care. We handle updates, security patches, content changes, and performance monitoring so your site stays fast and reliable month after month.",
    features: ["Security updates", "Content updates", "Performance monitoring", "Priority support"],
    href: "/services/website-maintenance",
  },
  {
    icon: Palette,
    title: "Logo Design & Business Kit",
    tagline: "A brand identity that means business",
    description:
      "We create cohesive brand identities that make your business look professional everywhere. From your logo to your business card, every element is designed to work together and leave a lasting impression.",
    features: ["Logo design", "Custom icons", "Letterhead design", "Business card design"],
    href: "/services/logo-design-business-kit",
  },
  {
    icon: PenLine,
    title: "Content Writing",
    tagline: "Words that connect, inform, and convert",
    description:
      "Great design needs great words. We write clear, engaging content for your website, landing pages, and marketing materials, tailored to your audience and optimized for search engines.",
    features: ["Website copywriting", "Landing page copy", "Blog & article writing", "SEO-friendly content"],
    href: "/services/content-writing",
  },
  {
    icon: Layers,
    title: "Fullstack Internal Web Systems",
    tagline: "Custom tools built for your team",
    description:
      "We build custom web applications for internal use: order management systems, staff dashboards, booking tools, and more. Built fullstack, tailored to your workflow, and designed for real teams.",
    features: ["Online order systems", "Admin & staff dashboards", "Role-based access control", "Inventory & reporting tools"],
    href: "/services/fullstack-internal-websites",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
    <main>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            What We Build
          </p>
          <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Services Built for{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
            From restaurant sites to full e-commerce stores, brand identities to content we
            build everything your business needs to look great and grow online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Link href="/projects">See Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {service.tagline}
                  </p>
                  <h2 className="font-headline text-xl font-bold mb-3">{service.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  {service.href && (
                    <Button asChild variant="outline" size="sm" className="rounded-full mt-auto w-full">
                      <Link href={service.href} className="flex items-center justify-center gap-1.5">
                        Learn More <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works strip */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground">
              See exactly how we take you from idea to live website.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 shrink-0"
          >
            <Link href="/how-it-works" className="flex items-center gap-2">
              How It Works <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Ready to build something great?
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            Book a free consultation and let&apos;s talk about what you need. No pressure, no commitment.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/contact">Book a Free Call</Link>
          </Button>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
