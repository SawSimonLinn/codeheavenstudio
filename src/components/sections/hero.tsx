"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { heroContent, heroMockups, heroStats } from "@/lib/hero-data";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mockupIndex, setMockupIndex] = useState(0);
  const [isMockupFading, setIsMockupFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsMockupFading(true);
      setTimeout(() => {
        setMockupIndex((prev) => (prev + 1) % heroMockups.length);
        setIsMockupFading(false);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentMockup = heroMockups[mockupIndex];

  return (
    <section className="relative overflow-hidden flex items-center min-h-[85vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src="/blue_clouds.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50 z-10" />

      <div className="relative z-20 container mx-auto max-w-7xl px-4 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-8 cursor-default select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="relative">
                <span className="transition-opacity duration-500 group-hover:opacity-0">{heroContent.badge}</span>
                <span className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">Code. Design. Launch.</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] mb-1">
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent inline-block pb-3">
Where Ideas Become Software
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Button
                size="lg"
                asChild
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href={heroContent.primaryCta.href}>
                  {heroContent.primaryCta.label}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full px-8"
              >
                <Link href={heroContent.secondaryCta.href}>
                  {heroContent.secondaryCta.label}
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-border/60">
              {heroStats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  {i > 0 && <div className="h-10 w-px bg-border" />}
                  <div>
                    <p className="text-3xl font-extrabold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — browser mockup */}
          <div className="relative hidden lg:block px-8 py-6">
            <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-[0_25px_80px_-15px_rgba(59,130,246,0.25)]">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="ml-3 flex-1 text-center text-xs text-muted-foreground bg-background/60 rounded py-0.5 px-2"
                style={{ transition: "opacity 0.4s ease", opacity: isMockupFading ? 0 : 1 }}
              >
                  {currentMockup.url}
                </div>
              </div>
              <Image
                src={currentMockup.image}
                alt="Website Preview"
                width={800}
                height={500}
                className="w-full object-cover"
                style={{ transition: "opacity 0.4s ease", opacity: isMockupFading ? 0 : 1 }}
                priority
              />
            </div>

            {/* Floating testimonial card */}
            <div className="absolute -bottom-6 -left-8 bg-card border border-border shadow-2xl rounded-2xl p-4 w-56">
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;{heroContent.testimonial.quote}&rdquo;
              </p>
              <p className="text-xs font-bold text-foreground mt-2">
                {heroContent.testimonial.author}
              </p>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-5 -right-4 bg-gradient-to-r from-primary to-purple-500 text-white rounded-2xl px-5 py-3 shadow-lg text-sm font-bold whitespace-nowrap">
              {heroContent.floatingBadge}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
