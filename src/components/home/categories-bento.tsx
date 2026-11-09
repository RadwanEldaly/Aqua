"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  PROVISIONAL_CATEGORIES,
  PROVISIONAL_PRODUCTS,
} from "@/data/provisional-products";
import { RippleRings } from "@/components/ui/brand-patterns";
import { ArrowUpRight } from "lucide-react";
import { useGSAP, gsap, isReducedMotionPreferred } from "@/hooks/use-gsap";
import { cn } from "@/lib/utils";

interface CategoriesBentoProps {
  locale: "ar" | "en";
}

// Curated iconic image for each category
const CATEGORY_FEATURED_IMAGES: Record<string, string> = {
  systems: "/images/offers/artec-pro-digital.jpg",
  dispensers: "/images/products/tabletop-dispenser-black.jpg",
  commercial: "/images/products/restaurant-filter-800l.jpg",
  accessories: "/images/products/cartridges-7stages.jpg",
  shower: "/images/offers/shower-filter-bundle.jpg",
  packages: "/images/offers/package-alaman.jpg",
  filters: "/images/products/jumbo-triple-rack.jpg",
};

export function CategoriesBento({ locale }: CategoriesBentoProps) {
  const t = useTranslations("HomePage.categories");
  const categories = PROVISIONAL_CATEGORIES.filter((c) => c.id !== "all");

  const [leadCategory, ...secondaryCategories] = categories;

  const leadProducts = PROVISIONAL_PRODUCTS.filter(
    (p) => p.categoryId === leadCategory.id
  );
  const leadCount = leadProducts.length;
  const leadImage =
    CATEGORY_FEATURED_IMAGES[leadCategory.id] ||
    (leadProducts[0] ? leadProducts[0].image.src : null);

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isReducedMotionPreferred()) return;

      const heading = sectionRef.current?.querySelector(".bento-heading-anim");
      const heroTile = sectionRef.current?.querySelector(".bento-hero-tile");
      const secondaryTiles = sectionRef.current?.querySelectorAll(".bento-sub-tile");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "opacity,transform",
          }
        );
      }

      if (heroTile) {
        tl.fromTo(
          heroTile,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          heading ? "-=0.4" : 0
        );
      }

      if (secondaryTiles && secondaryTiles.length > 0) {
        tl.fromTo(
          secondaryTiles,
          { opacity: 0, y: 46, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          heroTile ? "-=0.45" : 0
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <div className="bento-heading-anim">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
          />
        </div>

        {/* Bento Grid: 2 columns on mobile (<640px, 12px gap), 12-column grid on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-6">
          {/* 1. Large Bento Hero Tile (e.g. Packages / 2-col on mobile, 5-col on desktop) */}
          <Link
            href={`/products?category=${leadCategory.id}`}
            className={cn(
              "bento-hero-tile group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-brand-pearl p-4 sm:p-8 shadow-card border border-border-subtle/80",
              "col-span-2 md:col-span-5 md:min-h-[440px] min-w-0 w-full",
              "transition-transform duration-200 hover:-translate-y-1 hover:shadow-hover cursor-pointer overflow-hidden",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2"
            )}
          >
            {/* Ambient Background Ripple Rings */}
            <div className="absolute -top-12 -end-12 w-80 h-80 opacity-40 pointer-events-none">
              <RippleRings className="w-full h-full text-brand-ocean/15" />
            </div>

            {/* Header info */}
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-brand-azure/80 font-sans tracking-tight">
                  01
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-deep leading-tight mt-1 group-hover:text-brand-azure transition-colors">
                  {leadCategory.label[locale]}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-text-subtle-accessible mt-1">
                  {t("productCount", { count: leadCount })}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-white shadow-subtle text-brand-azure flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 rtl:rotate-[-90deg]"
              >
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Visual Media (Video for Packages, Cutout Image for others) */}
            <div className="relative z-10 w-full aspect-square max-h-[260px] my-auto flex items-center justify-center">
              {leadCategory.id === "packages" ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-subtle bg-brand-abyss flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
                  <Image
                    src="/video/alaman-package-poster.webp"
                    alt={leadCategory.label[locale]}
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <video
                    autoPlay
                    playsInline
                    loop
                    muted
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden="true"
                  >
                    <source src="/video/alaman-package-commercial.mp4" type="video/mp4" />
                  </video>
                  <span className="absolute top-2 start-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white shadow-sm">
                    {locale === "ar" ? "فيديو العرض" : "Offer Video"}
                  </span>
                </div>
              ) : (
                leadImage && (
                  <div className="feathered-image-mask relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
                    <Image
                      src={leadImage}
                      alt={leadCategory.label[locale]}
                      fill
                      sizes="(max-width: 768px) 80vw, 40vw"
                      className="object-contain mix-blend-multiply p-2"
                      loading="lazy"
                    />
                  </div>
                )
              )}
            </div>
          </Link>

          {/* 2. Four Secondary Bento Tiles in 7-col 2x2 grid (2-col on mobile) */}
          <div className="col-span-2 md:col-span-7 grid grid-cols-2 gap-3 sm:gap-6 min-w-0 w-full">
            {secondaryCategories.map((cat, idx) => {
              const matchingProducts = PROVISIONAL_PRODUCTS.filter(
                (p) => p.categoryId === cat.id
              );
              const count = matchingProducts.length;
              const catImage =
                CATEGORY_FEATURED_IMAGES[cat.id] ||
                (matchingProducts[0] ? matchingProducts[0].image.src : null);
              const numeral = String(idx + 2).padStart(2, "0");

              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className={cn(
                    "bento-sub-tile group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-6 shadow-card border border-border-subtle/80",
                    "col-span-1 min-w-0 w-full",
                    "transition-transform duration-200 hover:-translate-y-1 hover:shadow-hover cursor-pointer overflow-hidden",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2"
                  )}
                >
                  {/* Subtle Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-extrabold text-brand-azure/70 font-sans tracking-tight">
                        {numeral}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-brand-deep leading-snug group-hover:text-brand-azure transition-colors line-clamp-1">
                        {cat.label[locale]}
                      </h3>
                      <p className="text-xs font-medium text-text-subtle-accessible">
                        {t("productCount", { count })}
                      </p>
                    </div>

                    <div
                      aria-hidden="true"
                      className="w-7 h-7 rounded-full bg-brand-foam/60 text-brand-azure flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 rtl:rotate-[-90deg]"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Cutout Container */}
                  <div className="relative w-full aspect-square rounded-2xl bg-brand-pearl overflow-hidden p-3 flex items-center justify-center">
                    {catImage && (
                      <div className="feathered-image-mask relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
                        <Image
                          src={catImage}
                          alt={cat.label[locale]}
                          fill
                          sizes="(max-width: 768px) 60vw, 20vw"
                          className="object-contain mix-blend-multiply p-1"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
