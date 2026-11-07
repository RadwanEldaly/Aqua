"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROVISIONAL_PRODUCTS } from "@/data/provisional-products";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { RippleRings } from "@/components/ui/brand-patterns";
import { Price } from "@/components/ui/price";

interface OffersSectionProps {
  locale: "ar" | "en";
}

export function OffersSection({ locale }: OffersSectionProps) {
  const t = useTranslations("HomePage.offers");
  const tCommon = useTranslations("Common");

  // Strict data guard: render only if at least one product has price and compareAtPrice > price
  const offerProducts = PROVISIONAL_PRODUCTS.filter(
    (p) =>
      typeof p.price === "number" &&
      typeof p.compareAtPrice === "number" &&
      p.compareAtPrice > p.price
  );

  if (offerProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-brand-abyss text-white [content-visibility:auto] [contain-intrinsic-size:0_650px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading on Dark Abyss */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
            tone="light"
          />
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {offerProducts.map((product) => {
            const price = product.price!;
            const compareAt = product.compareAtPrice!;
            const savings = compareAt - price;
            const percent = Math.round((savings / compareAt) * 100);

            return (
              <article
                key={product.id}
                className="relative rounded-3xl bg-brand-ocean/90 border border-white/10 p-5 sm:p-6 shadow-card flex flex-col justify-between overflow-hidden"
              >
                {/* Background Ripple Accent */}
                <div className="absolute -top-10 -end-10 w-64 h-64 opacity-25 pointer-events-none">
                  <RippleRings className="w-full h-full text-brand-foam/20" />
                </div>

                {/* Savings Badge COMPUTED directly from real prices */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-champagne/20 text-brand-champagne border border-brand-champagne/40">
                    {t("saveBadge", {
                      amount: savings,
                      percent,
                      currency: tCommon("currency"),
                    })}
                  </span>
                </div>

                {/* Inset Cutout Photo */}
                <div className="relative w-full aspect-square rounded-2xl bg-white overflow-hidden p-4 mb-4 flex items-center justify-center">
                  <div className="feathered-image-mask relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt[locale]}
                      fill
                      sizes="(max-width: 640px) 90vw, 30vw"
                      className="object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    <Link href={`/products/${product.id}`} className="hover:text-brand-foam transition-colors">
                      <bdi>{product.name[locale]}</bdi>
                    </Link>
                  </h3>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                    <Price
                      amount={price}
                      compareAtAmount={compareAt}
                      locale={locale}
                      size="md"
                      tone="light"
                    />

                    <AddToCartButton
                      productId={product.id}
                      locale={locale}
                      size="sm"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
