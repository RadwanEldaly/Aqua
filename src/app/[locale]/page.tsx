import React from "react";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import {
  HeroSection,
  CategoriesSection,
  FeaturedProductsSection,
  WhatsAppBandSection,
} from "@/components/home";

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
      <WhatsAppBandSection />
    </div>
  );
}
