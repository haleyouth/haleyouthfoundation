import type { MetadataRoute } from "next";
import { PROGRAMS } from "@/lib/constants";

export const dynamic = "force-static";

const BASE = "https://haleyouthfoundation.org";

// The site is served with trailingSlash: true, so the canonical URL of every
// page ends in "/". The sitemap must list those exact URLs, otherwise Google
// crawls the sitemap URL, gets a 301 to the trailing-slash version, and reports
// the submitted URL as "Page with redirect -> not indexed".
function canonical(route: string): string {
  if (route === "") return `${BASE}/`;
  return `${BASE}${route}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/our-story",
    "/about/leadership",
    "/about/global-recognition",
    "/programs",
    "/programs/tech-skill-training",
    "/programs/stem-for-all",
    "/impact",
    "/partners",
    "/gallery",
    "/news",
    "/contact",
    "/get-involved",
    "/get-involved/donate",
    "/get-involved/volunteer",
    "/get-involved/partner-with-us",
    "/privacy-policy",
    "/terms-of-service",
  ].map((r) => ({
    url: canonical(r),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const programRoutes = PROGRAMS.map((p) => ({
    url: canonical(`/programs/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...programRoutes];
}
