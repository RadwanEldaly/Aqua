"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { RippleRings } from "@/components/ui/brand-patterns";
import { PROVISIONAL_CATEGORIES } from "@/data/provisional-products";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  locale: "ar" | "en";
}

export function HeroSection({ locale }: HeroSectionProps) {
  const tHero = useTranslations("HomePage.hero");
  const tCommon = useTranslations("Common");
  const whatsappUrl = buildWhatsAppUrl(tHero("whatsappPrefill"));
  const hasWhatsApp = Boolean(whatsappUrl);
  const containerRef = useRef<HTMLDivElement>(null);

  // Category quick chips (excluding 'all')
  const categories = PROVISIONAL_CATEGORIES.filter((c) => c.id !== "all");

  return (
    <section className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5">
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto rounded-panel bg-brand-ocean overflow-hidden shadow-elevated min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex flex-col justify-between"
      >
        {/* Saturated Deep Marine Gradient Background (Passes AAA Contrast > 12:1) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-abyss via-brand-ocean to-brand-ocean/95" />
          {/* Concentric Ripple Rings Ambient Mark (11s smooth scale/opacity pulse) */}
          <div className="absolute -top-16 -start-16 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] opacity-35">
            <RippleRings animate className="w-full h-full text-brand-foam/30" />
          </div>
        </div>

        {/* Content Grid: Clearance for Floating Pill Nav (pt-24 sm:pt-28) */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-10 lg:p-14 pt-24 sm:pt-28 lg:pt-32 my-auto">
          {/* Editorial Display Typography (Bottom-Start Aligned) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            <h1
              className={cn(
                "hero-text-elem text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.2] sm:leading-[1.12]",
                locale === "en" ? "tracking-tight" : "tracking-normal"
              )}
            >
              <bdi>{tHero("descriptor")}</bdi>
            </h1>

            <p className="hero-text-elem mt-4 sm:mt-6 text-lg sm:text-xl lg:text-2xl font-light text-brand-foam/90 leading-[1.45] max-w-xl">
              <bdi>{tCommon("tagline")}</bdi>
            </p>

            {/* Actions Row: Orbit Buttons */}
            <div className="hero-text-elem mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4 min-h-[52px]">
              <Button
                href="/products"
                variant="light"
                size="lg"
                withOrbit
                className="min-w-[170px] h-13 px-7 text-base font-bold bg-white text-brand-abyss hover:bg-brand-pearl hover:text-brand-abyss shadow-subtle cursor-pointer rounded-full"
              >
                {tHero("browseAction")}
              </Button>

              {hasWhatsApp ? (
                <Button
                  href={whatsappUrl!}
                  external
                  variant="outline"
                  size="lg"
                  className="min-w-[160px] h-13 px-8 text-base font-bold text-white border-white/70 hover:bg-white/10 hover:border-white inline-flex items-center gap-2 cursor-pointer rounded-full"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{tHero("inquireAction")}</span>
                </Button>
              ) : (
                /* Reserved slot: identical dimensions, zero shift */
                <div className="hidden sm:inline-block w-0 min-h-[52px]" aria-hidden="true" />
              )}
            </div>

            {/* Category Quick Chips */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-foam/85 bg-white/5 hover:bg-white/15 hover:text-white border border-white/10 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure"
                >
                  {c.label[locale]}
                </Link>
              ))}
            </div>
          </div>

          {/* Product Cutout Inset Card (Pure White Rounded Panel - NO border) */}
          <div className="hero-card-elem lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[16/13] rounded-3xl bg-white p-6 sm:p-8 shadow-elevated overflow-hidden flex items-center justify-center">
              <div
                className="feathered-image-mask relative max-w-full max-h-full w-full h-full flex items-center justify-center"
                style={{ aspectRatio: "1600 / 1340" }}
              >
                <Image
                  src="/images/home/tabletop-dispenser-trio.jpg"
                  alt={tHero("imageAlt")}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 450px, 480px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
