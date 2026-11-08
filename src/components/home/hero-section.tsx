"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { RippleRings } from "@/components/ui/brand-patterns";
import { HeroVideoBackground } from "./hero-video-background";
import { PROVISIONAL_CATEGORIES } from "@/data/provisional-products";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/gtm";
import { useGSAP, gsap, isReducedMotionPreferred } from "@/hooks/use-gsap";
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

  // Rich entrance animation for the Hero section
  useGSAP(
    () => {
      if (isReducedMotionPreferred()) return;

      const heading = containerRef.current?.querySelector(".hero-title-anim");
      const subtitle = containerRef.current?.querySelector(".hero-sub-anim");
      const actions = containerRef.current?.querySelector(".hero-actions-anim");
      const chips = containerRef.current?.querySelectorAll(".hero-chip-anim");
      const card = containerRef.current?.querySelector(".hero-card-elem");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "opacity,transform" }
        );
      }

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: "opacity,transform" },
          "-=0.55"
        );
      }

      if (actions) {
        tl.fromTo(
          actions,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, clearProps: "opacity,transform" },
          "-=0.5"
        );
      }

      if (chips && chips.length > 0) {
        tl.fromTo(
          chips,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, clearProps: "opacity,transform" },
          "-=0.4"
        );
      }

      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, y: 45, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out", clearProps: "opacity,transform" },
          "-=0.7"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5">
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto rounded-panel bg-brand-ocean overflow-hidden shadow-elevated min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex flex-col justify-between"
      >
        {/* Decorative Desktop-Only Ripple Video / Poster Background */}
        <HeroVideoBackground />

        {/* Ambient Concentric Ripple Rings */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
          <div className="absolute -top-16 -start-16 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] opacity-25">
            <RippleRings animate className="w-full h-full text-brand-foam/30" />
          </div>
        </div>

        {/* Content Grid: Clearance for Floating Pill Nav (pt-24 sm:pt-28) */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-10 lg:p-14 pt-24 sm:pt-28 lg:pt-32 my-auto">
          {/* Editorial Display Typography (Bottom-Start Aligned) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            <h1
              className={cn(
                "hero-title-anim text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.2] sm:leading-[1.12]",
                locale === "en" ? "tracking-tight" : "tracking-normal"
              )}
            >
              <bdi>{tHero("descriptor")}</bdi>
            </h1>

            <p className="hero-sub-anim mt-4 sm:mt-6 text-lg sm:text-xl lg:text-2xl font-light text-brand-foam/90 leading-[1.45] max-w-xl">
              <bdi>{tCommon("tagline")}</bdi>
            </p>

            {/* Actions Row: Modernized, high-contrast, beautiful buttons */}
            <div className="hero-actions-anim mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4 min-h-[52px]">
              {/* Primary: Browse Products */}
              <Link
                href="/products"
                className={cn(
                  "group/hero-browse min-w-[175px] h-13 px-7 text-base font-bold rounded-full",
                  "bg-white hover:bg-brand-pearl text-brand-abyss shadow-elevated",
                  "inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2"
                )}
              >
                <span>{tHero("browseAction")}</span>
                <span className="w-7 h-7 rounded-full bg-brand-ocean/10 text-brand-ocean flex items-center justify-center transition-transform duration-200 group-hover/hero-browse:translate-x-1 rtl:group-hover/hero-browse:-translate-x-1">
                  {locale === "ar" ? (
                    <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                </span>
              </Link>

              {/* Secondary: Inquire via Official WhatsApp */}
              {hasWhatsApp ? (
                <a
                  href={whatsappUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ context: "hero_inquire" })}
                  className={cn(
                    "group/hero-wa min-w-[175px] h-13 px-7 text-base font-bold rounded-full",
                    "bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] text-white shadow-elevated",
                    "inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                  )}
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover/hero-wa:scale-110" aria-hidden="true" />
                  <span>{tHero("inquireAction")}</span>
                </a>
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
                  className="hero-chip-anim inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-foam/85 bg-white/5 hover:bg-white/15 hover:text-white border border-white/10 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure"
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
