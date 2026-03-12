import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground py-24 sm:py-36">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 text-center">
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
          Transparent pricing, modern design, and websites built to grow with
          your business. Your digital success is our mission.
        </p>
        <Button
          size="lg"
          asChild
          className="rounded-full px-10 py-6 text-base bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
        >
          <Link href="/contact">
            Start Your Project Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
