"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROVISIONAL_PRODUCTS } from "@/data/provisional-products";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { Price } from "@/components/ui/price";
import { useGSAP, gsap, isReducedMotionPreferred } from "@/hooks/use-gsap";

interface OffersSectionProps {
  locale: "ar" | "en";
}

export function OffersSection({ locale }: OffersSectionProps) {
  const t = useTranslations("HomePage.offers");
  const tCommon = useTranslations("Common");
  const sectionRef = useRef<HTMLElement>(null);

  // Strict data guard: render only if at least one product has price and compareAtPrice > price
  const offerProducts = PROVISIONAL_PRODUCTS.filter(
    (p) =>
      typeof p.price === "number" &&
      typeof p.compareAtPrice === "number" &&
      p.compareAtPrice > p.price
  );

  useGSAP(
    () => {
      if (isReducedMotionPreferred()) return;

      const header = sectionRef.current?.querySelector(".offers-header-anim");
      const cards = sectionRef.current?.querySelectorAll(".offers-card-anim");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (header) {
        tl.fromTo(
          header,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "opacity,transform",
          }
        );
      }

      if (cards && cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          header ? "-=0.35" : 0
        );
      }
    },
    { scope: sectionRef }
  );

  if (offerProducts.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 bg-brand-abyss text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading on Dark Abyss */}
        <div className="offers-header-anim flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
            tone="light"
          />
        </div>

        {/* Offers Cards Grid: 2 columns (<640px, 12px gap), 3 columns (>=640px), 4 columns (>=1024px) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {offerProducts.map((product) => {
            const price = product.price!;
            const compareAt = product.compareAtPrice!;
            const savings = compareAt - price;
            const percent = Math.round((savings / compareAt) * 100);

            return (
              <article
                key={product.id}
                data-product-card="true"
                className="offers-card-anim relative rounded-2xl sm:rounded-3xl bg-brand-ocean/90 border border-white/10 p-3 sm:p-6 shadow-card flex flex-col justify-between overflow-hidden min-w-0 w-full"
              >
                {/* Savings Badge COMPUTED directly from real prices */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 min-w-0">
                  <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-brand-champagne/20 text-brand-champagne border border-brand-champagne/40 truncate">
                    {t("saveBadge", {
                      amount: savings,
                      percent,
                      currency: tCommon("currency"),
                    })}
                  </span>
                </div>

                {/* Inset Cutout Photo or Product Video */}
                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl bg-white overflow-hidden p-2.5 sm:p-4 mb-3 sm:mb-4 flex items-center justify-center min-w-0">
                  <div className="feathered-image-mask relative w-full h-full flex items-center justify-center">
                    {product.id === "package-alaman" ? (
                      <video
                        autoPlay
                        playsInline
                        loop
                        muted
                        preload="none"
                        poster="/video/alaman-package-poster.webp"
                        className="w-full h-full object-contain"
                        aria-hidden="true"
                      >
                        <source src="/video/alaman-package-commercial.mp4" type="video/mp4" />
                      </video>
                    ) : product.id === "stand-7stages-filter" ? (
                      <video
                        autoPlay
                        playsInline
                        loop
                        muted
                        preload="none"
                        poster="/video/ro-stand-filter-poster.webp"
                        className="w-full h-full object-contain"
                        aria-hidden="true"
                      >
                        <source src="/video/ro-stand-filter-commercial.mp4" type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={product.image.src}
                        alt={product.image.alt[locale]}
                        fill
                        sizes="(max-width: 640px) 384px, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-1 sm:p-2"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 w-full">
                  <h3 className="text-sm sm:text-lg font-bold text-white line-clamp-2 min-h-[38px] sm:min-h-[48px] min-w-0 break-words">
                    <Link href={`/products/${product.id}`} className="hover:text-brand-foam transition-colors">
                      <bdi>{product.name[locale]}</bdi>
                    </Link>
                  </h3>

                  <div className="mt-auto pt-2.5 sm:pt-4 flex flex-col gap-2 border-t border-white/10 min-w-0 w-full">
                    <div className="min-w-0 w-full min-h-[22px] sm:min-h-[24px] flex items-baseline">
                      <Price
                        amount={price}
                        compareAtAmount={compareAt}
                        locale={locale}
                        size="sm"
                        tone="light"
                        className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0"
                      />
                    </div>

                    <AddToCartButton
                      productId={product.id}
                      locale={locale}
                      className="w-full min-h-[44px]"
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
