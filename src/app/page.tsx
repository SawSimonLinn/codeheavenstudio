import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import HighlightStrip from "@/components/home/highlight-strip";
import ServicesSection from "@/components/home/services-section";
import ProjectsSection from "@/components/home/projects-section";
import ProcessSection from "@/components/home/process-section";
import StatsSection from "@/components/home/stats-section";
import WhyUsSection from "@/components/home/why-us-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import ReferralSection from "@/components/home/referral-section";
import { BG, HI } from "@/lib/colors";

const HOME_DESCRIPTION =
  "Code Heaven Studio builds AI-powered websites, practical automations, and SEO foundations that help businesses get discovered across Google and AI-assisted search.";

export const metadata: Metadata = {
  title: "AI-Powered Websites & AI Search SEO",
  description: HOME_DESCRIPTION,
  alternates: { canonical: "https://www.codeheavenstudio.com" },
  openGraph: {
    title: "AI-Powered Websites & AI Search SEO | Code Heaven Studio",
    description: HOME_DESCRIPTION,
    url: "https://www.codeheavenstudio.com",
    images: ["/hero-image.png"],
  },
};

export default function Home() {
  return (
    <div style={{ background: BG, color: HI, minHeight: "100vh" }}>
      <Header />
      <main>
        <HeroSection />
        <HighlightStrip />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <StatsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CTASection />
        <ReferralSection />
      </main>
      <Footer />
    </div>
  );
}
