import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import ScrollButtons from "@/components/layout/scroll-buttons";

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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
        <Analytics />
        <Toaster />
        <ScrollButtons />
      </body>
    </html>
  );
}
