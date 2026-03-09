import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import ScrollButtons from "@/components/layout/scroll-buttons";
import PromoModal from "@/components/layout/promo-modal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Code Heaven Studio AI",
  description:
    "Heaven for Your Digital Growth. We craft modern, responsive, and SEO-friendly websites - powered by creativity and AI innovation.",
  alternates: {
    canonical: "https://www.codeheavenstudio.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Code Heaven Studio",
    url: "https://www.codeheavenstudio.com",
    logo: "https://www.codeheavenstudio.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "codeheavenstudio@gmail.com",
      contactType: "customer service",
    },
    founder: [
      {
        "@type": "Person",
        name: "Saw Simon Linn",
        jobTitle: "Co-Founder & Software Engineer",
        url: "https://www.codeheavenstudio.com/founder/saw-simon-linn",
        sameAs: [
          "https://www.linkedin.com/in/sawsimonlinn/",
          "https://github.com/SawSimonLinn",
          "https://simonlinn.dev/",
        ],
      },
      {
        "@type": "Person",
        name: "Mia Truong",
        jobTitle: "Co-Founder",
        url: "https://www.codeheavenstudio.com/founder/mia-truong",
        sameAs: [
          "https://www.linkedin.com/in/trangmtruong/",
          "https://github.com/trangmtruong",
          "https://www.miatruong.com/",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
        <Analytics />
        <Toaster />
        <ScrollButtons />
        <PromoModal />
      </body>
    </html>
  );
}
