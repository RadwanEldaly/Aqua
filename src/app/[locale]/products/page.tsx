import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24 flex-1 flex flex-col gap-10 sm:gap-14">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Rounded Tinted Page Header Panel */}
        <div className="rounded-[2rem] bg-brand-surface border border-border-subtle/80 p-8 sm:p-12 lg:p-14 shadow-card">
          <SectionHeading
            titleAs="h1"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="start"
          />
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
