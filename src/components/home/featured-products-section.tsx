"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import {
  PROVISIONAL_PRODUCTS,
  PROVISIONAL_CATEGORIES,
} from "@/data/provisional-products";

interface FeaturedProductsSectionProps {
  locale: "ar" | "en";
}

export function FeaturedProductsSection({
  locale,
}: FeaturedProductsSectionProps) {
  const t = useTranslations("HomePage.featured");

  // Curate 4 key items across diverse categories
  const featuredProducts = PROVISIONAL_PRODUCTS.slice(0, 4);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:0_600px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading & View All Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
          />

          <Button
            href="/products"
            variant="outline"
            size="md"
            withOrbit
            className="self-start sm:self-auto min-w-[150px] h-10 px-5 text-xs font-bold rounded-full border-border hover:bg-brand-foam/40 cursor-pointer"
          >
            {t("viewAllAction")}
          </Button>
        </div>

        {/* Products Grid: 2 columns (<640px, 12px gap), 3 columns (>=640px), 4 columns (>=1024px) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product, idx) => {
            const productName = product.name[locale];
            const categoryMatch = PROVISIONAL_CATEGORIES.find(
              (c) => c.id === product.categoryId
            );
            const categoryLabel = categoryMatch?.label[locale];

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={productName}
                index={idx + 1}
                category={categoryLabel}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                imageUrl={product.image.src}
                imageAlt={product.image.alt[locale]}
                imageWidth={product.image.width}
                imageHeight={product.image.height}
                href={`/products/${product.id}`}
                locale={locale}
                badge={
                  product.badge
                    ? { text: product.badge[locale], variant: "primary" }
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
