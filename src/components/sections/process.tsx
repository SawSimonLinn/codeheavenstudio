import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Telescope, LayoutTemplate, CodeXml, Rocket } from 'lucide-react';
import React from 'react';

const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We start by understanding your business, goals, target audience, and content requirements to build a solid foundation.',
    icon: <Telescope className="h-8 w-8" />,
  },
  {
    step: 2,
    title: 'Design',
    description: 'Next, we create wireframes and visual layouts. You\'ll see a mockup of your site, ensuring the design aligns with your vision.',
    icon: <LayoutTemplate className="h-8 w-8" />,
  },
  {
    step: 3,
    title: 'Development',
    description: 'Our team writes clean, modern, and responsive code to bring the designs to life, focusing on performance and scalability.',
    icon: <CodeXml className="h-8 w-8" />,
  },
  {
    step: 4,
    title: 'Launch',
    description: 'After final approval, we handle the deployment, hosting setup, and domain handoff, launching your new website to the world.',
    icon: <Rocket className="h-8 w-8" />,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="container mx-auto px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Our Streamlined Process
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          From concept to launch, we follow a clear and collaborative path to ensure your project's success.
        </p>
      </div>

      <div className="relative mt-12">
        {/* Decorative line */}
        <div className="absolute left-1/2 top-4 hidden h-full w-px -translate-x-1/2 bg-border md:block" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <Card key={item.step} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {item.step}
                    </span>
                    {item.title}
                </CardTitle>
                <CardDescription className="pt-2">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
