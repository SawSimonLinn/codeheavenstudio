import { Telescope, LayoutTemplate, CodeXml, Rocket } from "lucide-react";
import React from "react";

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We understand your business, goals, and audience to build a solid foundation.",
    icon: <Telescope className="h-6 w-6" />,
  },
  {
    step: "02",
    title: "Design",
    description:
      "We create mockups and visual layouts so you see the site before it's built.",
    icon: <LayoutTemplate className="h-6 w-6" />,
  },
  {
    step: "03",
    title: "Development",
    description:
      "Clean, modern, responsive code that brings your design to life with speed.",
    icon: <CodeXml className="h-6 w-6" />,
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We handle deployment, hosting, and domain handoff. Ready to go live.",
    icon: <Rocket className="h-6 w-6" />,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-muted/40 py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-16">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Four steps.
            <br />
            Zero guesswork.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="bg-background p-8 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <span className="text-7xl font-black text-muted-foreground/15 leading-none">
                  {step.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  {step.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
