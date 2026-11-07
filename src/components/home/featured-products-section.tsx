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
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useGSAP, gsap } from "@/hooks/use-gsap";

interface FeaturedProductsSectionProps {
  locale: "ar" | "en";
}

export function FeaturedProductsSection({ locale }: FeaturedProductsSectionProps) {
  const t = useTranslations("HomePage.featured");
  const tProducts = useTranslations("ProductsPage");
  const containerRef = useRef<HTMLDivElement>(null);

  // Select 4 distinct products (one from each category) from provisional products
  const categoryIds = ["home-systems", "dispensers", "filters", "cartridges-and-parts"];
  const featuredProducts = categoryIds
    .map((catId) => PROVISIONAL_PRODUCTS.find((p) => p.categoryId === catId))
    .filter((p): p is (typeof PROVISIONAL_PRODUCTS)[number] => Boolean(p));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".featured-card-elem",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
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
            className="min-w-[150px] h-10 px-5 text-xs font-bold rounded-full border-border hover:bg-brand-mist/60 cursor-pointer self-start sm:self-auto"
          >
            {t("viewAllAction")}
          </Button>
        </div>

        {/* 8-Item Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
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
              <div key={product.id} className="featured-card-elem">
                <ProductCard
                  id={product.id}
                  name={productName}
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
                      <AddToCartButton productId={product.id} locale={locale} size="sm" />
                      {whatsAppHref && (
                        <a
                          href={whatsAppHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tProducts("inquireAria", { name: productName })}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer shrink-0"
                          title={locale === "ar" ? "طلب عبر واتساب" : "Order via WhatsApp"}
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
