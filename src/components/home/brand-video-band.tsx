"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Play } from "lucide-react";

export function BrandVideoBand() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Aspect Ratio Container: Eliminates Layout Shift */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-panel overflow-hidden bg-brand-deep shadow-elevated flex items-center justify-center select-none">
          {/* 1. Static Poster via next/image (WebP under 60 KB, lazy) */}
          <Image
            src="/video/brand-water-poster.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            loading="lazy"
            className="object-cover"
            aria-hidden="true"
          />

          {/* 2. Optional Video Element: ONLY created in the DOM after user taps 'play' */}
          {isPlaying && (
            <video
              autoPlay
              playsInline
              loop
              muted
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/video/brand-water-720p.mp4" type="video/mp4" />
            </video>
          )}

          {/* 3. High-Contrast Pure Color Tint (No backdrop-filter) */}
          <div
            className="absolute inset-0 bg-brand-deep/75"
            aria-hidden="true"
          />

          {/* 4. Centered Brand Content & Tap-to-play Action */}
          <div className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center gap-4">
            {!isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={locale === "ar" ? "تشغيل الفيديو" : "Play video"}
                className="w-14 h-14 rounded-full bg-white/90 text-brand-primary hover:bg-white hover:scale-105 flex items-center justify-center shadow-card transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Play className="w-6 h-6 fill-current ms-0.5" aria-hidden="true" />
              </button>
            )}
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white ltr:tracking-wide leading-tight drop-shadow-md">
              <bdi>{t("tagline")}</bdi>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
