import Footer from "@/components/layout/footer";
import FreeDemoSection from "@/components/sections/free-demo";
import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import ProcessSection from "@/components/sections/process";
import PreviousProjectsSection from "@/components/sections/previous-projects";
import WhyUsSection from "@/components/sections/why-us";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const marqueeItems = [
  "50+ Projects Delivered",
  "Free Demo First",
  "5★ Average Rating",
  "You Own Your Site",
  "One-Time Pricing",
  "Fast Turnaround",
  "Modern Tech Stack",
  "SEO Optimized",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Marquee strip */}
        <div className="bg-secondary text-secondary-foreground py-4 overflow-hidden border-y border-white/5">
          <div className="inline-flex animate-marquee whitespace-nowrap w-max">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                aria-hidden={i >= marqueeItems.length ? "true" : undefined}
                className="inline-flex items-center gap-3 mx-8 text-sm font-semibold tracking-wide"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <FreeDemoSection />
        <PreviousProjectsSection />
        <ProcessSection />
        <WhyUsSection />

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-background text-foreground py-24 sm:py-36">
          {/* Gradient orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative container mx-auto px-4 text-center max-w-3xl">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
              Ready to Start?
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Let&apos;s build something
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                remarkable together.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Transparent pricing, modern design, and websites built to grow
              with your business. Your digital success is our mission.
            </p>
            <Button
              size="lg"
              asChild
              className="rounded-full px-10 py-6 text-base bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">
                Start Your Project Today{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
