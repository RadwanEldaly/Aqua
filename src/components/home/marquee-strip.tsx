"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PROVISIONAL_CATEGORIES } from "@/data/provisional-products";
import { DropletGlyph } from "@/components/ui/brand-patterns";

interface MarqueeStripProps {
  locale: "ar" | "en";
}

export function MarqueeStrip({ locale }: MarqueeStripProps) {
  const tHero = useTranslations("HomePage.hero");
  const categories = PROVISIONAL_CATEGORIES.filter((c) => c.id !== "all");

  // Approved items for the marquee track
  const items: string[] = [
    tHero("descriptor"),
    ...categories.map((c) => c.label[locale]),
  ];

  return (
    <section
      aria-label={locale === "ar" ? "شريط فئات المنتجات" : "Product categories marquee"}
      className="marquee-container w-full overflow-hidden bg-brand-abyss py-3.5 sm:py-4 border-y border-white/10 select-none [content-visibility:auto] [contain-intrinsic-size:0_56px]"
    >
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex w-max items-center marquee-track will-change-transform"
      >
        {/* Track 1: Accessible to Assistive Technologies */}
        <div className="flex items-center gap-6 sm:gap-8 px-3 shrink-0">
          {items.map((text, idx) => (
            <React.Fragment key={`item-1-${idx}`}>
              <span className="text-xs sm:text-sm font-bold text-brand-foam/90 tracking-wide uppercase font-sans whitespace-nowrap">
                {text}
              </span>
              <DropletGlyph className="w-2.5 h-2.5 text-brand-champagne/80 shrink-0" />
            </React.Fragment>
          ))}
        </div>

        {/* Track 2: Duplicate for seamless visual loop, hidden from screen readers */}
        <div
          aria-hidden="true"
          className="flex items-center gap-6 sm:gap-8 px-3 shrink-0 select-none"
        >
          {items.map((text, idx) => (
            <React.Fragment key={`item-2-${idx}`}>
              <span className="text-xs sm:text-sm font-bold text-brand-foam/90 tracking-wide uppercase font-sans whitespace-nowrap">
                {text}
              </span>
              <DropletGlyph className="w-2.5 h-2.5 text-brand-champagne/80 shrink-0" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
