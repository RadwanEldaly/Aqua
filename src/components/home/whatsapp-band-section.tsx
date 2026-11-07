"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useGSAP, gsap, isReducedMotionPreferred } from "@/hooks/use-gsap";

export function WhatsAppBandSection() {
  const t = useTranslations("HomePage.whatsappBand");
  const whatsappUrl = buildWhatsAppUrl(t("whatsappPrefill"));
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);

  useGSAP(
    () => {
      if (isReducedMotionPreferred()) return;

      const inner = containerRef.current?.querySelector(".whatsapp-band-content");
      if (inner) {
        gsap.fromTo(
          inner,
          { opacity: 0, y: 48, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // Check media query: only mount on desktop/tablet without reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (prefersReducedMotion || !isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMountVideo(true);
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);

    const handleVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // The whole band is hidden if the number is missing (Zero layout shift)
  if (!whatsappUrl) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto rounded-panel overflow-hidden bg-brand-deep p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center justify-center gap-6 sm:gap-8 shadow-elevated select-none"
      >
        {/* 1. Static Poster via next/image (WebP under 25 KB, lazy) */}
        <Image
          src="/video/underwater-bubbles-poster.webp"
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          loading="lazy"
          className="object-cover"
          aria-hidden="true"
        />

        {/* 2. Dynamic Underwater Ambient Video (Sunlight rays & ascending bubbles) */}
        {shouldMountVideo && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            loop
            muted
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/video/underwater-bubbles.mp4" type="video/mp4" />
          </video>
        )}

        {/* 3. High-Contrast Ocean Tint for AAA Text Readability */}
        <div className="absolute inset-0 bg-brand-ocean/85" aria-hidden="true" />

        {/* 4. Action Content */}
        <div className="whatsapp-band-content relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl drop-shadow-sm">
            <bdi>{t("title")}</bdi>
          </h2>

          <Button
            href={whatsappUrl}
            external
            variant="primary"
            size="lg"
            className="min-w-[220px] h-14 px-8 text-base font-bold bg-white text-brand-deep hover:bg-aqua-100 hover:text-brand-deep inline-flex items-center gap-2.5 shadow-subtle cursor-pointer rounded-full transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0 text-[#25D366]" aria-hidden="true" />
            <span>{t("chatAction")}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
