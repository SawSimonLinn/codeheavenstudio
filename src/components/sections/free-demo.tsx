"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const features = [
  "No hidden charges",
  "No commitment required",
  "Preview of your future site",
  "Free consultation call",
];

const demoImages = [
  {
    src: "/freeDemo/screenshot_01.png",
    alt: "Project Demo 1",
    aiHint: "website mockup dark",
  },
  {
    src: "/freeDemo/screenshot_02.png",
    alt: "Project Demo 2",
    aiHint: "website mockup light",
  },
  {
    src: "/freeDemo/screenshot_03.png",
    alt: "Project Demo 3",
    aiHint: "dashboard mockup",
  },
  {
    src: "/freeDemo/screenshot_04.png",
    alt: "Project Demo 4",
    aiHint: "mobile app mockup",
  },
  {
    src: "/freeDemo/screenshot_05.png",
    alt: "Project Demo 5",
    aiHint: "mobile app mockup",
  },
  {
    src: "/freeDemo/screenshot_06.png",
    alt: "Project Demo 6",
    aiHint: "mobile app mockup",
  },
];

/**
 * Renders the "Free Demo" site section with a header, feature pills, a responsive image carousel, and a CTA.
 *
 * The carousel auto-plays using the Autoplay plugin, pauses when hovered, and loops continuously; images are shown in rounded cards with responsive sizing. The CTA links to the contact page to request a free demo.
 *
 * @returns The section element containing the free demo header, feature pills, carousel of demo images, and call-to-action button.
 */
export default function FreeDemoSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section
      id="free-demo"
      className="bg-secondary text-secondary-foreground py-20 sm:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            Free Demo First
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            See it before
            <br />
            you pay for it.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            We design a free demo layout for your business before you pay a
            single dollar. No pressure, no commitment. Just proof of our
            quality.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {features.map((f) => (
              <div
                key={f}
                className="inline-flex items-center gap-2 rounded-full bg-background/10 border border-white/10 px-4 py-2 text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Full-width carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{ loop: true }}
        >
          <CarouselContent className="-ml-4">
            {demoImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden border-0 rounded-2xl">
                  <CardContent className="p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      data-ai-hint={image.aiHint}
                      width={800}
                      height={600}
                      className="aspect-[4/3] object-cover w-full"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-10 text-center">
          <Button
            size="lg"
            asChild
            className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/contact">Request Your Free Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
