import Link from "next/link";
import { PenTool, CheckCircle2, ArrowRight, Code2, Smartphone, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Pixel-perfect implementation from any Figma file",
  "Fully responsive, mobile, tablet, desktop",
  "Clean, production-ready code (Next.js / React)",
  "Animations and interactions preserved",
  "SEO-ready structure built in",
  "Optimized images and assets",
  "Cross-browser tested",
  "Handoff with full deployment support",
];

const whyUs = [
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    title: "Pixel Perfect",
    desc: "We match your Figma design down to the last spacing value, font size, and color. No guesswork, no approximations.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: "Fully Responsive",
    desc: "Your design comes to life on every screen size. We handle breakpoints and adaptive layouts professionally.",
  },
  {
    icon: <Code2 className="h-6 w-6 text-primary" />,
    title: "Clean Code",
    desc: "Production-ready, well-structured code built on modern tech. Easy to maintain and scale after handoff.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Fast Delivery",
    desc: "We move quickly. Hand us the file and we'll have a live, working site ready without unnecessary back-and-forth.",
  },
];

export const metadata = {
  title: "Figma to Website | Code Heaven Studio",
  description:
    "Already have a Figma design? We build it pixel-perfect, fully responsive, and production-ready. Hand us the file and we handle the rest.",
  openGraph: {
    title: "Figma to Website | Code Heaven Studio",
    description: "Your design, built pixel perfect.",
  },
};

export default function FigmaToWebsitePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <PenTool className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Figma to{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Website
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Already have a Figma design you love? We&apos;ll bring it to life exactly as designed, pixel perfect, fully responsive, and production-ready. Hand us the file and we handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/request-website">Send Us Your Design</Link>
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
                Everything needed to turn your Figma file into a live, working website.
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
                Why build with us
              </h2>
              <p className="text-muted-foreground text-lg">
                We treat your design with the precision it deserves.
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
              Your design is ready. Let&apos;s build it.
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Share your Figma file and we&apos;ll get it live. Pixel perfect, on time.
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
