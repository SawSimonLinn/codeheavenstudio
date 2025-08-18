import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const features = [
  { name: 'No hidden charges' },
  { name: 'No commitments required' },
  { name: 'A preview of your future website' },
];

export default function FreeDemoSection() {
  return (
    <section id="free-demo" className="relative overflow-hidden bg-secondary py-16 sm:py-24 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div>
            <div className="text-base font-semibold leading-7 text-primary">🎁 Free Demo First</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Free Demo Before You Commit
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              At Code Heaven Studio, we believe in proving our value first. That’s why we design a free demo template layout for your business before you pay anything.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-green-500" aria-hidden="true" />
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
             <Image
                src="https://placehold.co/600x400.png"
                alt="Free Demo Website Mockup"
                data-ai-hint="website mockup"
                className="relative w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-border sm:w-[57rem]"
                width={800}
                height={600}
             />
          </div>
        </div>
      </div>
    </section>
  );
}
