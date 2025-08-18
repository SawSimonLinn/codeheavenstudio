"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover brightness-110 contrast-95"
      >
        <source src="/blue_clouds.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10" />

      <div
        className="absolute inset-x-0 top-0 -z-10 h-full w-full overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] top-0 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3B82F6] to-[#9333EA] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-blob"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="relative z-20 container mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="text-base sm:text-lg py-0 px-4 rounded-full border-primary/50 font-bold bg-background/50"
          >
            Heaven for Your Digital Growth
          </Badge>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-primary sm:text-6xl lg:text-7xl font-headline">
            Code Heaven Studio
          </p>
          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            You run your business while we grow your business. We craft modern,
            responsive, and SEO-friendly websites — powered by creativity and AI
            innovation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-purple-500 text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Link href="#free-demo">Get Your Free Demo</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="#ai-features">
                Explore AI Features <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
