import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
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
    <section className="py-12 sm:py-16 flex-1 flex flex-col">
      <Container size="lg" className="flex flex-col gap-10">
        <SectionHeading
          titleAs="h1"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ProductCatalog
          products={PROVISIONAL_PRODUCTS}
          categories={PROVISIONAL_CATEGORIES}
          locale={locale as "ar" | "en"}
        />
      </Container>
    </section>
  );
}
