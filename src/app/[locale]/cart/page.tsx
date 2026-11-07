import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import { CartView } from "@/components/cart/cart-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CartPage" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = (locale === "ar" || locale === "en" ? locale : "ar") as Locale;
  const t = await getTranslations({ locale, namespace: "CartPage" });

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-16 sm:pb-24 flex-1 flex flex-col gap-8 sm:gap-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 sm:gap-10">
        {/* Saturated Deep-Azure Page Header Panel (matches hero look & feel) */}
        <div className="relative w-full rounded-panel bg-brand-navy overflow-hidden shadow-elevated min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32">
          <div className="absolute inset-0 bg-brand-navy pointer-events-none select-none" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-start text-start max-w-3xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-aqua-300 mb-2">
              <bdi>{t("eyebrow")}</bdi>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              <bdi>{t("heading")}</bdi>
            </h1>
            <p className="text-sm sm:text-base text-aqua-200/95 max-w-2xl leading-relaxed">
              <bdi>{t("description")}</bdi>
            </p>
          </div>
        </div>

        <CartView locale={typedLocale} />
      </div>
    </div>
  );
}
