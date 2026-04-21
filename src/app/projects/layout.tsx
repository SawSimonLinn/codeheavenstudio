import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work & Projects",
  description:
    "Browse websites and digital products built by Code Heaven Studio. Real clients, real results — from AI SaaS platforms to restaurant sites and e-commerce stores.",
  alternates: { canonical: "https://www.codeheavenstudio.com/projects" },
  openGraph: {
    title: "Our Work & Projects | Code Heaven Studio",
    description:
      "Browse websites and digital products built by Code Heaven Studio. Real clients, real results.",
    url: "https://www.codeheavenstudio.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
