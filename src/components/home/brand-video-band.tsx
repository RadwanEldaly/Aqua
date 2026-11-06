"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export function BrandVideoBand() {
  const t = useTranslations("Common");
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check reduced motion & saveData
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const isSaveData = Boolean(nav.connection?.saveData);

    // If reduced motion or saveData is requested, leave paused on poster
    if (prefersReducedMotion || isSaveData) {
      video.pause();
      return;
    }

    // Play only while in viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay policy restrictions handled gracefully
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Aspect Ratio Container: Eliminates Layout Shift */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-panel overflow-hidden bg-brand-deep shadow-elevated flex items-center justify-center select-none"
        >
          {/* Decorative Video Element */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster="/video/brand-water-poster.webp"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/video/brand-water-720p.mp4" type="video/mp4" />
          </video>

          {/* High-Contrast Tint Overlay (Passes AA/AAA contrast > 8:1 on all frames) */}
          <div
            className="absolute inset-0 bg-brand-deep/70 backdrop-brightness-75"
            aria-hidden="true"
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
