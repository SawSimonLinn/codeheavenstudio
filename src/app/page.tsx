import dynamic from "next/dynamic";
import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";

const MarqueeStrip = dynamic(() => import("@/components/sections/marquee-strip"));
const WixRedesignHighlight = dynamic(() => import("@/components/sections/wix-redesign-highlight"));
const PreviousProjectsSection = dynamic(() => import("@/components/sections/previous-projects"));
const ProcessSection = dynamic(() => import("@/components/sections/process"));
const WhyUsSection = dynamic(() => import("@/components/sections/why-us"));
const TechStackSection = dynamic(() => import("@/components/sections/tech-stack"));
const PricingPreview = dynamic(() => import("@/components/sections/pricing-preview"));
const FreeAuditSection = dynamic(() => import("@/components/sections/free-audit"));
const FinalCtaSection = dynamic(() => import("@/components/sections/final-cta"));
const Footer = dynamic(() => import("@/components/layout/footer"));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MarqueeStrip />
        <WixRedesignHighlight />
        <PreviousProjectsSection />
        <ProcessSection />
        <WhyUsSection />
        <TechStackSection />
        <PricingPreview />
        <FreeAuditSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
