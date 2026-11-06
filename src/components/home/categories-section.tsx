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

export function CategoriesSection({ locale }: CategoriesSectionProps) {
  const t = useTranslations("HomePage.categories");
  const containerRef = useRef<HTMLDivElement>(null);

  // Show only distinct product categories (excluding "all")
  const categories = PROVISIONAL_CATEGORIES.filter((c) => c.id !== "all");

  // Subtle ScrollTrigger reveal with reduced-motion support
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".category-tile-elem", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="start"
        />

        {/* 4 Large Rounded Category Tiles (1 col @ 360, 2 col @ 768, 4 col @ 1440) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const matchingProducts = PROVISIONAL_PRODUCTS.filter(
              (p) => p.categoryId === cat.id
            );
            const productCount = matchingProducts.length;
            const categoryName = cat.label[locale];
            const sampleProduct = matchingProducts[0];
            const imageUrl = sampleProduct ? sampleProduct.image.src : null;

            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                aria-label={t("viewCategoryAria", { name: categoryName })}
                className={cn(
                  "category-tile-elem group relative flex flex-col justify-between rounded-[2rem] bg-white border border-border-subtle/80 p-5 sm:p-6 shadow-card",
                  "transition-all duration-200 hover:shadow-elevated hover:border-brand-primary/40 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                )}
              >
                {/* White Inner Image Panel with subtle hover scale */}
                <div className="relative w-full aspect-square rounded-2xl bg-brand-surface border border-border-subtle/50 overflow-hidden p-6 mb-5 flex items-center justify-center">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={categoryName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 transition-transform duration-200 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                {/* Category Metadata */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-brand-deep leading-snug group-hover:text-brand-primary transition-colors">
                      {categoryName}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-text-subtle-accessible">
                      {t("productCount", { count: productCount })}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full bg-brand-mist/80 text-text-subtle-accessible flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-105 rtl:rotate-[-90deg]"
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
