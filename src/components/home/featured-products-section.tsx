"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
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

  // Take the first 4 products strictly from the data file
  const featuredProducts = PROVISIONAL_PRODUCTS.slice(0, 4);

  // Subtle ScrollTrigger card stagger with reduced-motion support
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".featured-card-elem", {
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

        {/* 4-Item Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  imageUrl={product.image.src}
                  imageAlt={product.image.alt[locale]}
                  locale={locale}
                  actions={
                    whatsAppHref ? (
                      <a
                        href={whatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tProducts("inquireAria", { name: productName })}
                        className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{tProducts("inquire")}</span>
                      </a>
                    ) : undefined
                  }
                />
              </div>
            );
          })}
        </div>

        {/* View All Button linking to /products */}
        <div className="flex justify-center pt-2">
          <Button
            href="/products"
            variant="outline"
            size="lg"
            className="min-w-[180px] h-12 px-8 text-sm font-bold rounded-full border-border hover:bg-brand-mist/60 cursor-pointer"
          >
            {t("viewAllAction")}
          </Button>
        </div>
      </div>
    </section>
  );
}
