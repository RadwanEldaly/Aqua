"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import {
  PROVISIONAL_PRODUCTS,
  PROVISIONAL_CATEGORIES,
} from "@/data/provisional-products";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface FeaturedProductsSectionProps {
  locale: "ar" | "en";
}

export function FeaturedProductsSection({
  locale,
}: FeaturedProductsSectionProps) {
  const t = useTranslations("HomePage.featured");
  const tProducts = useTranslations("ProductsPage");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Curate 4 to 8 featured products from catalog
  const featuredProducts = PROVISIONAL_PRODUCTS.slice(0, 8);

  const isAr = locale === "ar";

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:0_600px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
          />

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Scroll Navigation Buttons for Mobile/Tablet */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <button
                type="button"
                onClick={() => scroll(isAr ? "right" : "left")}
                aria-label={isAr ? "السابق" : "Previous"}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-brand-deep hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure"
              >
                {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => scroll(isAr ? "left" : "right")}
                aria-label={isAr ? "التالي" : "Next"}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-brand-deep hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure"
              >
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>

            <Button
              href="/products"
              variant="outline"
              size="md"
              withOrbit
              className="min-w-[150px] h-10 px-5 text-xs font-bold rounded-full border-border hover:bg-brand-foam/40 cursor-pointer"
            >
              {t("viewAllAction")}
            </Button>
          </div>
        </div>

        {/* Products Row: Mobile Snap Row (<640px) & Desktop Grid (>=640px) */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 sm:pb-0"
        >
          {featuredProducts.map((product, idx) => {
            const productName = product.name[locale];
            const prefilledMessage = tProducts("whatsappPrefill", {
              name: productName,
            });
            const whatsAppHref = buildWhatsAppUrl(prefilledMessage);

            const categoryMatch = PROVISIONAL_CATEGORIES.find(
              (c) => c.id === product.categoryId
            );
            const categoryLabel = categoryMatch?.label[locale];

            return (
              <div
                key={product.id}
                className="w-[260px] shrink-0 snap-start sm:w-auto sm:shrink"
              >
                <ProductCard
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
                  actions={
                    <div className="flex items-center gap-1.5">
                      <AddToCartButton
                        productId={product.id}
                        locale={locale}
                        size="sm"
                      />
                      {whatsAppHref && (
                        <a
                          href={whatsAppHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tProducts("inquireAria", {
                            name: productName,
                          })}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer shrink-0"
                          title={
                            locale === "ar"
                              ? "طلب عبر واتساب"
                              : "Order via WhatsApp"
                          }
                        >
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
