"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container, Section } from "@/components/ui/container";
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
          y: 16,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <Section spacing="none" className="py-16 sm:py-20 lg:py-24 bg-brand-surface">
      <Container size="lg">
        <div ref={containerRef} className="flex flex-col gap-10 sm:gap-12">
          {/* Section Heading */}
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
          />

          {/* Categories Grid (1 col @ 360, 2 col @ 768, 4 col @ 1440) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {categories.map((cat) => {
              const productCount = PROVISIONAL_PRODUCTS.filter(
                (p) => p.categoryId === cat.id
              ).length;
              const categoryName = cat.label[locale];

              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  aria-label={t("viewCategoryAria", { name: categoryName })}
                  className={cn(
                    "category-tile-elem group relative flex flex-col justify-between rounded-2xl bg-white border border-border p-6 sm:p-7 min-h-[140px] sm:min-h-[160px]",
                    "transition-all duration-200 hover:border-brand-primary/50 hover:shadow-card cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-brand-deep leading-snug group-hover:text-brand-primary transition-colors">
                      {categoryName}
                    </h3>
                    <div
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full bg-brand-mist/60 text-text-subtle-accessible flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-105 rtl:rotate-[-90deg]"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-text-subtle-accessible mt-4">
                    {t("productCount", { count: productCount })}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
