import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import {
  HeroSection,
  CategoriesSection,
  FeaturedProductsSection,
  BrandVideoBand,
  WhatsAppBandSection,
} from "@/components/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "ar" ? "/" : "/en",
      languages: {
        ar: "/",
        en: "/en",
        "x-default": "/",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = (locale === "ar" || locale === "en" ? locale : "ar") as Locale;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, "")}`
      : null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: typedLocale === "ar" ? "أكوا" : "AQUA",
    url: baseUrl || (typedLocale === "ar" ? "/" : "/en"),
  };
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <div className="flex flex-col flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <HeroSection locale={typedLocale} />
      <CategoriesSection locale={typedLocale} />
      <FeaturedProductsSection locale={typedLocale} />
      <BrandVideoBand />
      <WhatsAppBandSection />
    </div>
  );
}
