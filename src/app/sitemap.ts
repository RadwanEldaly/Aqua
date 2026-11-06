import type { MetadataRoute } from "next";

export function getBaseUrl(): string | null {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/+$/, "")}`;
  }
  return null;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return [];
  }

  // Active production routes (About page omitted until copy is provided)
  const routes = ["", "/products", "/contact"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Unprefixed Arabic canonical route
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
          "x-default": `${baseUrl}${route}`,
        },
      },
    });

    // Prefixed English route
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 0.9 : 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
          "x-default": `${baseUrl}${route}`,
        },
      },
    });
  }

  return sitemapEntries;
}
