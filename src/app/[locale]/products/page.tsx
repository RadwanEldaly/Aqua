import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProductCatalog } from "@/components/products/product-catalog";
import {
  PROVISIONAL_PRODUCTS,
  PROVISIONAL_CATEGORIES,
} from "@/data/provisional-products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.products" });
  const tProducts = await getTranslations({ locale, namespace: "ProductsPage" });

  return {
    title: t("title"),
    description: tProducts("description"),
    alternates: {
      canonical: locale === "ar" ? "/products" : "/en/products",
      languages: {
        ar: "/products",
        en: "/en/products",
        "x-default": "/products",
      },
    },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProductsPage" });

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-16 sm:pb-24 flex-1 flex flex-col gap-10 sm:gap-14">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Saturated Deep-Azure Page Header Panel (matches hero look & feel) */}
        <div className="relative w-full rounded-panel bg-brand-navy overflow-hidden shadow-elevated min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32">
          {/* Solid Brand Navy Token Overlay (No Gradient) */}
          <div className="absolute inset-0 bg-brand-navy pointer-events-none select-none" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-start text-start max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold ltr:uppercase ltr:tracking-wider text-aqua-200">
              {t("eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mt-2 sm:mt-3">
              <bdi>{t("title")}</bdi>
            </h1>
            <p className="text-aqua-100/90 text-base sm:text-lg lg:text-xl font-light leading-relaxed mt-3 sm:mt-4">
              <bdi>{t("description")}</bdi>
            </p>
          </div>
        </div>

        {/* Product Catalog with Category Filter */}
        <ProductCatalog
          products={PROVISIONAL_PRODUCTS}
          categories={PROVISIONAL_CATEGORIES}
          locale={locale as "ar" | "en"}
        />
      </div>
    </div>
  );
}
