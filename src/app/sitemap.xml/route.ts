import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog-data";
import { projects } from "@/lib/projects-data";
import { resources } from "@/lib/resources-data";

const BASE_URL = "https://www.codeheavenstudio.com";

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/services", priority: "0.9", changefreq: "monthly" },
  { url: "/services/ai-applied-websites", priority: "0.9", changefreq: "monthly" },
  { url: "/services/ecommerce-websites", priority: "0.8", changefreq: "monthly" },
  { url: "/services/figma-to-website", priority: "0.8", changefreq: "monthly" },
  { url: "/services/landing-pages", priority: "0.8", changefreq: "monthly" },
  { url: "/services/logo-design-business-kit", priority: "0.7", changefreq: "monthly" },
  { url: "/services/restaurant-websites", priority: "0.8", changefreq: "monthly" },
  { url: "/services/small-business-websites", priority: "0.8", changefreq: "monthly" },
  { url: "/services/content-writing", priority: "0.7", changefreq: "monthly" },
  { url: "/services/fullstack-internal-websites", priority: "0.8", changefreq: "monthly" },
  { url: "/services/website-redesign", priority: "0.8", changefreq: "monthly" },
  { url: "/services/seo-optimization", priority: "0.8", changefreq: "monthly" },
  { url: "/services/website-maintenance", priority: "0.8", changefreq: "monthly" },
  { url: "/services/wix-to-custom", priority: "0.8", changefreq: "monthly" },
  { url: "/projects", priority: "0.8", changefreq: "weekly" },
  { url: "/codeheavenpricing", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/founder/saw-simon-linn", priority: "0.5", changefreq: "monthly" },
  { url: "/founder/mia-truong", priority: "0.5", changefreq: "monthly" },
  { url: "/blog", priority: "0.7", changefreq: "weekly" },
  { url: "/request-website", priority: "0.9", changefreq: "monthly" },
  { url: "/contact", priority: "0.6", changefreq: "monthly" },
  { url: "/faq", priority: "0.5", changefreq: "monthly" },
  { url: "/free-audit", priority: "0.7", changefreq: "monthly" },
  { url: "/how-it-works", priority: "0.6", changefreq: "monthly" },
  { url: "/industries", priority: "0.6", changefreq: "monthly" },
  { url: "/case-studies", priority: "0.6", changefreq: "monthly" },
  { url: "/testimonials", priority: "0.5", changefreq: "monthly" },
  { url: "/resources", priority: "0.5", changefreq: "weekly" },
  { url: "/templates", priority: "0.5", changefreq: "monthly" },
  { url: "/referral", priority: "0.5", changefreq: "monthly" },
  { url: "/careers", priority: "0.4", changefreq: "monthly" },
  { url: "/press", priority: "0.4", changefreq: "monthly" },
  { url: "/sitemap", priority: "0.3", changefreq: "monthly" },
  { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
  { url: "/accessibility", priority: "0.3", changefreq: "yearly" },
  { url: "/why-choose-us", priority: "0.8", changefreq: "monthly" },
];

const dynamicPages = [
  ...projects.map((project) => ({
    url: `/projects/${project.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
  ...resources.map((resource) => ({
    url: `/resources/${resource.slug}`,
    priority: "0.5",
    changefreq: "monthly",
  })),
  ...blogPosts.map((post) => ({
    url: post.slug,
    priority: "0.6",
    changefreq: "monthly",
  })),
];

const pages = [...staticPages, ...dynamicPages];

export function GET() {
  const lastmod = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
