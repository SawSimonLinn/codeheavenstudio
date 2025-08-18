import AiFeaturesSection from '@/components/sections/ai-features';
import Footer from '@/components/layout/footer';
import FreeDemoSection from '@/components/sections/free-demo';
import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import ProcessSection from '@/components/sections/process';
import PreviousProjectsSection from '@/components/sections/previous-projects';
import TestimonialsSection from '@/components/sections/testimonials';
import WhyUsSection from '@/components/sections/why-us';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
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
                    “At Code Heaven Studio, your digital success is our mission. With transparent pricing, modern design, and AI-powered tools, we make websites that grow with your business.”
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
