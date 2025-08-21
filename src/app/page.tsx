"use client";

import { useState } from "react";

import AiFeaturesSection from "@/components/sections/ai-features";
import Footer from "@/components/layout/footer";
import FreeDemoSection from "@/components/sections/free-demo";
import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import ProcessSection from "@/components/sections/process";
import PreviousProjectsSection from "@/components/sections/previous-projects";
import TestimonialsSection from "@/components/sections/testimonials";
import WhyUsSection from "@/components/sections/why-us";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Zap, X } from "lucide-react";

export default function Home() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      {isBannerVisible && (
        <div className="relative bg-primary text-primary-foreground text-center py-3 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="container mx-auto px-4 text-sm sm:text-base">
            <Zap className="inline-block h-5 w-5 mr-2 animate-pulse" />
            <strong>Limited Time Offer:</strong> Get <strong>25% OFF</strong>{" "}
            all packages until September 30th!
            <Button
              variant="link"
              asChild
              className="ml-2 p-0 h-auto text-primary-foreground"
            >
              <Link href="https://wa.me/message/57WKZCOUS5YWE1" target="_blank">
                Learn More
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 h-7 w-7 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            onClick={() => setIsBannerVisible(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close banner</span>
          </Button>
        </div>
      )}
      <main className="flex-1">
        <HeroSection />
        <FreeDemoSection />
        <PreviousProjectsSection />
        <AiFeaturesSection />
        <ProcessSection />
        <WhyUsSection />
        <TestimonialsSection />
        <section className="bg-muted text-foreground py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <p className="max-w-3xl mx-auto text-lg leading-8 text-muted-foreground">
              “At Code Heaven Studio, your digital success is our mission. With
              transparent pricing, modern design, and AI-powered tools, we make
              websites that grow with your business.”
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-purple-500 text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Link href="/contact">Start Your Project Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
