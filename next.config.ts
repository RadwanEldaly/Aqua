import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/:locale(ar|en)/products/category/filters",
        destination: "/:locale/products?category=systems",
        permanent: true,
      },
      {
        source: "/products/category/filters",
        destination: "/products?category=systems",
        permanent: true,
      },
      {
        source: "/:locale(ar|en)/products/filters",
        destination: "/:locale/products?category=systems",
        permanent: true,
      },
      {
        source: "/products/filters",
        destination: "/products?category=systems",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
