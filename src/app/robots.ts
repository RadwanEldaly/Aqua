import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aqua.sa";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/dev/", "/dev/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
