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

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  // If neither base URL is set, disallow all
  if (!baseUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dev",
        "/dev/",
        "/cart",
        "/cart/",
        "/checkout",
        "/checkout/",
        "/*/dev",
        "/*/dev/",
        "/*/cart",
        "/*/cart/",
        "/*/checkout",
        "/*/checkout/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
