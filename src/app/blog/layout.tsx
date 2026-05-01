import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Web Design & Development Tips",
  description:
    "Practical tips on web design, SEO, Next.js development, and growing your business online — from the team at Code Heaven Studio.",
  alternates: { canonical: "https://www.codeheavenstudio.com/blog" },
  openGraph: {
    title: "Blog | Code Heaven Studio",
    description:
      "Practical tips on web design, SEO, Next.js development, and growing your business online.",
    url: "https://www.codeheavenstudio.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
