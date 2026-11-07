"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
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

  return (
    <section className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5">
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto rounded-panel bg-brand-navy overflow-hidden shadow-elevated min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex flex-col justify-between"
      >
        {/* Saturated Deep Marine Gradient Background (Passes AAA Contrast > 12:1) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-navy to-brand-navy/90" />
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

            <p className="hero-text-elem mt-4 sm:mt-6 text-lg sm:text-xl lg:text-2xl font-light text-aqua-200/95 leading-[1.45] max-w-xl">
              <bdi>{tCommon("tagline")}</bdi>
            </p>

            {/* Actions Row: Fixed min-h-[52px] to guarantee zero layout shift */}
            <div className="hero-text-elem mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4 min-h-[52px]">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                className="min-w-[160px] h-13 px-8 text-base font-bold bg-white text-brand-deep hover:bg-aqua-100 hover:text-brand-deep shadow-subtle cursor-pointer rounded-full"
              >
                {tHero("browseAction")}
              </Button>

              {hasWhatsApp ? (
                <Button
                  href={whatsappUrl!}
                  external
                  variant="outline"
                  size="lg"
                  className="min-w-[160px] h-13 px-8 text-base font-bold text-white border-white/80 hover:bg-white/15 inline-flex items-center gap-2 cursor-pointer rounded-full"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{tHero("inquireAction")}</span>
                </Button>
              ) : (
                /* Reserved slot: identical dimensions, zero shift */
                <div className="hidden sm:inline-block w-0 min-h-[52px]" aria-hidden="true" />
              )}
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
