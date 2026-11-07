"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BackgroundVideo } from "@/components/ui/background-video";

export function BrandVideoBand() {
  const t = useTranslations("Common");

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Aspect Ratio Container: Eliminates Layout Shift */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-panel overflow-hidden bg-brand-deep shadow-elevated flex items-center justify-center select-none">
          {/* Decorative Background Video */}
          <BackgroundVideo
            videoSrc="/video/brand-droplet-720p.mp4"
            posterSrc="/video/brand-droplet-poster.webp"
            overlayClassName="bg-brand-deep/70 backdrop-brightness-75"
          />

          {/* Centered Brand Tagline */}
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white ltr:tracking-wide leading-tight drop-shadow-md">
              <bdi>{t("tagline")}</bdi>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
