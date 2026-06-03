import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import ScrollButtons from "@/components/layout/scroll-buttons";
import PromoModal from "@/components/layout/promo-modal";
import LenisProvider from "@/components/layout/lenis-provider";
import ScrollProgress from "@/components/layout/scroll-progress";
import MouseGlow from "@/components/layout/mouse-glow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://www.codeheavenstudio.com";
const SITE_NAME = "Code Heaven Studio";
const DEFAULT_DESCRIPTION =
  "Code Heaven Studio builds AI-powered websites, practical automation, and SEO foundations for visibility across Google and AI-assisted search.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `AI-Powered Websites & AI Search SEO | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "web design agency",
    "custom website development",
    "AI website development",
    "AI-powered websites",
    "AI website features",
    "AI search optimization",
    "AI SEO",
    "Google AI Overviews SEO",
    "ChatGPT search visibility",
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
    siteName: SITE_NAME,
    title: `AI-Powered Websites & AI Search SEO | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/hero-image.png",
        width: 1920,
        height: 1080,
        alt: `${SITE_NAME} — AI-powered websites and search visibility`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `AI-Powered Websites & AI Search SEO | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    images: ["/clouds-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: DEFAULT_DESCRIPTION,
      email: "hello@codeheavenstudio.com",
      priceRange: "$$",
      areaServed: "Worldwide",
      serviceType: [
        "AI Website Development",
        "AI Search Optimization",
        "Web Design",
        "Web Development",
        "SEO Optimization",
        "UI/UX Design",
      ],
      knowsAbout: [
        "AI-powered websites",
        "AI assistants",
        "Workflow automation",
        "Technical SEO",
        "Structured data",
        "Google AI Overviews",
        "ChatGPT search visibility",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@codeheavenstudio.com",
        contactType: "customer service",
      },
      founder: [
        {
          "@type": "Person",
          name: "Saw Simon Linn",
          jobTitle: "Co-Founder & Software Engineer",
          url: `${SITE_URL}/founder/saw-simon-linn`,
          sameAs: [
            "https://www.linkedin.com/in/sawsimonlinn/",
            "https://github.com/SawSimonLinn",
            "https://simonlinn.dev/",
          ],
        },
        {
          "@type": "Person",
          name: "Mia Truong",
          jobTitle: "Co-Founder & Software Engineer",
          url: `${SITE_URL}/founder/mia-truong`,
          sameAs: [
            "https://www.linkedin.com/in/trangmtruong/",
            "https://github.com/trangmtruong",
            "https://www.miatruong.com/",
          ],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website and AI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Applied Websites",
              url: `${SITE_URL}/services/ai-applied-websites`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SEO and AI Search Optimization",
              url: `${SITE_URL}/services/seo-optimization`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Website Development",
              url: `${SITE_URL}/services`,
            },
          },
        ],
      },
      sameAs: [
        "https://www.linkedin.com/company/codeheavenstudio",
        "https://github.com/SawSimonLinn",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <LenisProvider>
          <ScrollProgress />
          <MouseGlow />
          {children}
          <Analytics />
          <Toaster />
          <ScrollButtons />
          <PromoModal />
        </LenisProvider>
      </body>
    </html>
  );
}
