import type { MetadataRoute } from "next";
import { PROGRAMS } from "@/lib/constants";

export const dynamic = "force-static";

const BASE = "https://haleyouthfoundation.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/our-story",
    "/about/leadership",
    "/about/global-recognition",
    "/programs",
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
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const programRoutes = PROGRAMS.map((p) => ({
    url: `${BASE}/programs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...programRoutes];
}
