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

  return (
    <div className="flex flex-col flex-1">
      <HeroSection locale={typedLocale} />
      <CategoriesSection locale={typedLocale} />
      <FeaturedProductsSection locale={typedLocale} />
      <BrandVideoBand />
      <WhatsAppBandSection />
    </div>
  );
}
