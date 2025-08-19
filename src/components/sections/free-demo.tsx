"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const features = [
  { name: "No hidden charges" },
  { name: "No commitments required" },
  { name: "A preview of your future website" },
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

export default function FreeDemoSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section
      id="free-demo"
      className="relative overflow-hidden bg-secondary py-16 sm:py-24 text-secondary-foreground"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div>
            <div className="text-base font-semibold leading-7 text-primary">
              🎁 Free Demo First
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Free Demo Before You Commit
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              At Code Heaven Studio, we believe in proving our value first.
              That’s why we design a free demo template layout for your business
              before you pay anything.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <CheckCircle2
                      className="absolute left-1 top-1 h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                </div>
              ))}
            </dl>
            <p className="mt-8 border-l-4 border-primary pl-4 italic text-muted-foreground">
              "Your satisfaction is our happiness."
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-md"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {demoImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          data-ai-hint={image.aiHint}
                          width={800}
                          height={600}
                          className="aspect-[4/3] object-cover"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
