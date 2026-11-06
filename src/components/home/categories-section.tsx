"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  PROVISIONAL_CATEGORIES,
  PROVISIONAL_PRODUCTS,
} from "@/data/provisional-products";
import { ArrowUpRight } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/use-gsap";
import { cn } from "@/lib/utils";

interface CategoriesSectionProps {
  locale: "ar" | "en";
}

// Curated iconic image for each category so every tile looks distinct and premium
const CATEGORY_FEATURED_IMAGES: Record<string, string> = {
  packages: "/images/offers/package-alaman.jpg",
  systems: "/images/offers/artec-pro-digital.jpg",
  dispensers: "/images/products/tabletop-dispenser-black.jpg",
  filters: "/images/products/jumbo-triple-rack.jpg",
  accessories: "/images/products/cartridges-7stages.jpg",
};

export function CategoriesSection({ locale }: CategoriesSectionProps) {
  const t = useTranslations("HomePage.categories");
  const containerRef = useRef<HTMLDivElement>(null);

  // Show only distinct product categories (excluding "all")
  const categories = PROVISIONAL_CATEGORIES.filter((c) => c.id !== "all");

  // Fast, reliable reveal: starts early at top 95% with fast 0.35s duration
  // Uses clearProps so elements immediately become 100% natural DOM elements
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tiles = containerRef.current?.querySelectorAll(".category-tile-elem");
        if (!tiles || tiles.length === 0) return;

        gsap.fromTo(
          tiles,
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 scroll-mt-24">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="start"
        />

        {/* 5 Distinct Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {categories.map((cat) => {
            const matchingProducts = PROVISIONAL_PRODUCTS.filter(
              (p) => p.categoryId === cat.id
            );
            const productCount = matchingProducts.length;
            const categoryName = cat.label[locale];

            // Use curated iconic image, fallback to first product
            const imageUrl =
              CATEGORY_FEATURED_IMAGES[cat.id] ||
              (matchingProducts[0] ? matchingProducts[0].image.src : null);

            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                aria-label={t("viewCategoryAria", { name: categoryName })}
                className={cn(
                  "category-tile-elem group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-card border border-border-subtle/80",
                  "transition-all duration-300 hover:shadow-hover hover:-translate-y-1 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                )}
              >
                {/* Crisp Image Panel (Pure white inset on subtle surface, zero blur/feather) */}
                <div className="relative w-full aspect-square rounded-2xl bg-surface-subtle overflow-hidden p-4 mb-4 flex items-center justify-center">
                  {imageUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
                      <Image
                        src={imageUrl}
                        alt={categoryName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Category Metadata */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-brand-deep leading-snug group-hover:text-brand-primary transition-colors line-clamp-2 min-h-[40px] flex items-center">
                      {categoryName}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-text-subtle-accessible">
                      {t("productCount", { count: productCount })}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full bg-brand-mist/90 text-brand-primary flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110 rtl:rotate-[-90deg]"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
