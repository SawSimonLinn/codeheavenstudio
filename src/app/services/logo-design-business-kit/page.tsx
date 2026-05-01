import Link from "next/link";
import { Palette, CheckCircle2, ArrowRight, Layers, CreditCard, FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Primary logo design",
  "Alternate logo variations (horizontal, stacked, icon-only)",
  "Custom icon set",
  "Letterhead design",
  "Business card design",
  "Brand color palette",
  "Typography selection",
  "Final files in print and web formats (PNG, SVG, PDF)",
];

const whyUs = [
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: "Cohesive Identity",
    desc: "Every element is designed to work together. Your logo, icons, and print materials all share the same visual language.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: "Print Ready",
    desc: "We deliver files ready for both digital use and professional printing, so you look sharp everywhere.",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Full Business Kit",
    desc: "From your first email to your business card handshake, we cover every touchpoint your brand needs.",
  },
  {
    icon: <ImageIcon className="h-6 w-6 text-primary" />,
    title: "Multiple Formats",
    desc: "You get every format you need: PNG, SVG, and PDF files optimized for both screens and print.",
  },
];

export default function LogoDesignBusinessKitPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Palette className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Logo Design &{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Business Kit
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              A brand identity that makes your business look professional everywhere. We design
              logos, icons, letterheads, and business cards that all work together from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/contact">Get a Free Quote</Link>
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
                Everything you need to present your business with confidence and consistency.
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
                Brand identity done right
              </h2>
              <p className="text-muted-foreground text-lg">
                Not just a logo. A complete kit that makes your business look its best from the start.
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
              Ready to build your brand?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us about your business and we will design a brand identity you are proud to show off.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Start Your Brand <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
