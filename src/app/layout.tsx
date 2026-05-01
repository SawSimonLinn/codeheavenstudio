import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://www.codeheavenstudio.com";
const SITE_NAME = "Code Heaven Studio";
const DEFAULT_DESCRIPTION =
  "Code Heaven Studio builds fast, modern, and SEO-optimized websites. Free demo, free audit, free consulting — no commitment until you're ready to start.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Demo Website, No Commitment`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "web design agency",
    "custom website development",
    "free website demo",
    "free website audit",
    "Next.js website",
    "SEO optimized website",
    "small business website",
    "affordable web design",
    "no commitment web design",
    "free consulting web agency",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Demo Website, No Commitment`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/hero-image.png",
        width: 1920,
        height: 1080,
        alt: `${SITE_NAME} — Engineering Your Digital Future`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Demo Website, No Commitment`,
    description: DEFAULT_DESCRIPTION,
    images: ["/clouds-poster.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceType: [
    "Web Design",
    "Web Development",
    "SEO Optimization",
    "AI-Powered Websites",
    "UI/UX Design",
  ],
  offers: {
    "@type": "Offer",
    description:
      "Free website demo, free audit, and free consulting — no commitment required.",
    price: "0",
    priceCurrency: "USD",
  },
  sameAs: ["https://github.com/SawSimonLinn"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </body>
    </html>
  );
}
