import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
    ],
    sitemap: "https://haleyouthfoundation.org/sitemap.xml",
    host: "https://haleyouthfoundation.org",
  };
}
