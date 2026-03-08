import { NextResponse } from "next/server";

const BASE_URL = "https://www.codeheavenstudio.com";

const pages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/services", priority: "0.9", changefreq: "monthly" },
  { url: "/services/restaurant-websites", priority: "0.8", changefreq: "monthly" },
  { url: "/services/small-business-websites", priority: "0.8", changefreq: "monthly" },
  { url: "/services/website-redesign", priority: "0.8", changefreq: "monthly" },
  { url: "/services/seo-optimization", priority: "0.8", changefreq: "monthly" },
  { url: "/services/website-maintenance", priority: "0.8", changefreq: "monthly" },
  { url: "/projects", priority: "0.8", changefreq: "weekly" },
  { url: "/codeheavenpricing", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
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
  { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
  { url: "/accessibility", priority: "0.3", changefreq: "yearly" },
];

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
