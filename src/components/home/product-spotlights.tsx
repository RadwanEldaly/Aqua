"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROVISIONAL_PRODUCTS, type ProvisionalProduct } from "@/data/provisional-products";
import { RippleRings, DisplayNumeral } from "@/components/ui/brand-patterns";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Price } from "@/components/ui/price";
import { cn } from "@/lib/utils";

interface ProductSpotlightsProps {
  locale: "ar" | "en";
}

// Select 3 products from 3 distinct categories
function pickSpotlightProducts(): ProvisionalProduct[] {
  const chosen: ProvisionalProduct[] = [];
  const seenCategories = new Set<string>();

  for (const p of PROVISIONAL_PRODUCTS) {
    if (!seenCategories.has(p.categoryId) && chosen.length < 3) {
      seenCategories.add(p.categoryId);
      chosen.push(p);
    }
  }

  // Fallback to first 3 products if fewer than 3 categories
  if (chosen.length < 3) {
    for (const p of PROVISIONAL_PRODUCTS) {
      if (!chosen.some((c) => c.id === p.id) && chosen.length < 3) {
        chosen.push(p);
      }
    }
  }

  return chosen;
}

export function ProductSpotlights({ locale }: ProductSpotlightsProps) {
  const t = useTranslations("HomePage.spotlights");
  const isAr = locale === "ar";
  const spotlights = pickSpotlightProducts();

  // Guard: hide section if data has fewer than 3 products
  if (spotlights.length < 3) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-brand-pearl/60 border-y border-border-subtle/80 [content-visibility:auto] [contain-intrinsic-size:0_1200px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="start"
        />

        {/* 3 Alternating Editorial Spotlight Panels */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {spotlights.map((product, idx) => {
            const isReversed = idx % 2 === 1;
            const numeral = idx + 1;
            const whatsappMsg = isAr
              ? `السلام عليكم، أود الاستفسار عن: ${product.name.ar}`
              : `Hello, I would like to inquire about: ${product.name.en}`;
            const whatsappUrl = buildWhatsAppUrl(whatsappMsg);

            return (
              <article
                key={product.id}
                className={cn(
                  "relative rounded-3xl bg-white p-6 sm:p-10 lg:p-12 shadow-card border border-border-subtle/90 overflow-hidden",
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                )}
              >
                {/* 1. Visual Panel (Large Product Cutout with Ripple Mark & CSS Detail Crop) */}
                <div
                  className={cn(
                    "relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl bg-brand-pearl overflow-hidden p-6 sm:p-8 flex items-center justify-center select-none",
                    isReversed ? "lg:col-span-6 lg:order-2" : "lg:col-span-6 lg:order-1"
                  )}
                >
                  {/* Background Ripple Rings */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <RippleRings className="w-[140%] h-[140%] text-brand-ocean/20" />
                  </div>

                  {/* Floor Shadow */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-6 w-3/5 h-3 rounded-full bg-brand-deep/8 blur-[3px] pointer-events-none"
                  />

                  {/* Primary Product Photo (mix-blend-multiply onto pearl panel) */}
                  <div className="feathered-image-mask relative z-1 w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt[locale]}
                      fill
                      sizes="(max-width: 1024px) 90vw, 500px"
                      className="object-contain mix-blend-multiply p-4"
                      loading="lazy"
                    />
                  </div>

                  {/* Secondary Image: CSS Zoomed Detail Crop (No new imagery, object-position & scale only) */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-4 end-4 z-10 w-24 sm:w-32 aspect-square rounded-xl bg-white shadow-card border border-border-subtle overflow-hidden pointer-events-none hidden sm:block"
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={product.image.src}
                        alt=""
                        fill
                        sizes="130px"
                        className="object-cover scale-200 object-center mix-blend-multiply"
                        loading="lazy"
                      />
                    </div>
                    <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold text-center bg-brand-deep/75 text-white rounded py-0.5 backdrop-blur-xs">
                      {t("detailCropBadge")}
                    </span>
                  </div>
                </div>

                {/* 2. Editorial Text & Actions Panel */}
                <div
                  className={cn(
                    "flex flex-col justify-center",
                    isReversed ? "lg:col-span-6 lg:order-1" : "lg:col-span-6 lg:order-2"
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <DisplayNumeral
                      number={numeral}
                      tone="azure"
                      className="text-2xl sm:text-3xl font-extrabold"
                    />
                    <span className="text-xs font-bold text-brand-azure uppercase tracking-wider bg-brand-foam/70 px-3 py-1 rounded-full">
                      {product.categoryId}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-deep leading-tight mb-4">
                    <bdi>{product.name[locale]}</bdi>
                  </h3>

                  {/* Price (Rendered only if price exists in data) */}
                  {typeof product.price === "number" && (
                    <div className="mb-6">
                      <Price
                        amount={product.price}
                        compareAtAmount={product.compareAtPrice}
                        locale={locale}
                        size="lg"
                      />
                    </div>
                  )}

                  {/* Action Buttons: Add to order + WhatsApp inquiry */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border-subtle/80">
                    <AddToCartButton
                      productId={product.id}
                      locale={locale}
                      size="md"
                    />

                    {whatsappUrl && (
                      <Button
                        href={whatsappUrl}
                        external
                        variant="outline"
                        size="md"
                        className="inline-flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                        <span>{isAr ? "استفسر عبر واتساب" : "WhatsApp Inquiry"}</span>
                      </Button>
                    )}
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
