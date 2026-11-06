import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aqua.sa";
  const routes = ["", "/products", "/about", "/contact"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Unprefixed Arabic canonical route
    sitemapEntries.push({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          ar: `${siteUrl}${route}`,
          en: `${siteUrl}/en${route}`,
        },
      },
    });

    // Prefixed English route
    sitemapEntries.push({
      url: `${siteUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 0.9 : 0.7,
      alternates: {
        languages: {
          ar: `${siteUrl}${route}`,
          en: `${siteUrl}/en${route}`,
        },
      },
    });
  }

  return sitemapEntries;
}
