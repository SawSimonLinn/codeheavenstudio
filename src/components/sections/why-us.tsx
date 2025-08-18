import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Award, Sparkles, Gift } from 'lucide-react';
import Image from 'next/image';

const benefits = [
  {
    title: 'One-Time Pricing',
    description: 'No hidden fees or recurring charges. You pay once for the design and development of your website.',
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    title: 'You Own Your Site',
    description: 'Once launched, the website is completely yours. You have full ownership of the code and all assets.',
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: 'AI-Powered Solutions',
    description: 'We integrate smart, AI-powered features to make your website more intelligent and efficient.',
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: 'Free Demo Before Commitment',
    description: 'We build a free demo layout for you, so you can see our work before you decide to move forward.',
    icon: <Gift className="h-6 w-6" />,
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="bg-secondary text-secondary-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-2 text-primary border-primary">🌟 Why Choose Us?</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            The Code Heaven Advantage
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            We are committed to transparency, quality, and innovation in every project we undertake.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="bg-background text-foreground shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {benefit.icon}
                </div>
                <CardTitle className="pt-4">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
