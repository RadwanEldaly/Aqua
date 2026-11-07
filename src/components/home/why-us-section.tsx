"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Wrench, Droplets, Headphones } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/use-gsap";

interface WhyUsSectionProps {
  locale: "ar" | "en";
}

export function WhyUsSection({ locale }: WhyUsSectionProps) {
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);

  useEffect(() => {
    if (!bannerRef.current) return;

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

    observer.observe(bannerRef.current);

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

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".why-us-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const pillars = [
    {
      icon: Droplets,
      title: isAr ? "نقاء فائق بنسبة 100%" : "100% Pure Drinking Water",
      desc: isAr
        ? "تقنية التناضح العكسي RO لإزالة الكلور والشوائب والأملاح الثقيلة."
        : "Advanced RO technology removing chlorine, sediments, and heavy metals.",
      color: "bg-blue-50 text-brand-primary",
    },
    {
      icon: Wrench,
      title: isAr ? "تركيب وتجهيز فني" : "Professional Installation",
      desc: isAr
        ? "فريق فنيين لتركيب الأجهزة وفحص نسبة الأملاح وتجربة الماء أمامك."
        : "Technicians for device setup and water testing.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: ShieldCheck,
      title: isAr ? "دعم ومتابعة" : "Ongoing Support",
      desc: isAr
        ? "متابعة دورية وخدمة صيانة للأجهزة والفلاتر."
        : "Scheduled maintenance and follow-up.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Headphones,
      title: isAr ? "تواصل مباشر" : "Direct Contact",
      desc: isAr
        ? "فريقنا معك عبر واتساب والاتصال الهاتفي للرد الفوري على استفساراتك وخدمات ما بعد البيع."
        : "Instant assistance and after-sales support via WhatsApp and phone.",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface-subtle/40">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* 1. Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-3">
            {isAr ? "معايير الجودة والأمان" : "Quality & Safety Standards"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-deep">
            {isAr ? "نقاء تثق به في كل قطرة" : "Pure Quality You Can Trust"}
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-2">
            {isAr
              ? "نلتزم بأحدث تقنيات تحلية وتصفية المياه المنزلية لتوفير مياه عذبة وصحية لعائلتك"
              : "Committed to delivering pristine, safe drinking water through advanced filtration technology"}
          </p>
        </div>

        {/* 2. Water Droplet Splash Visual Banner */}
        <div
          ref={bannerRef}
          className="relative w-full aspect-[16/7] sm:aspect-[21/8] rounded-panel overflow-hidden bg-brand-deep shadow-elevated flex items-center justify-center p-6 sm:p-12 text-center select-none"
        >
          {/* Static WebP Poster (Lazy loaded, < 25 KB) */}
          <Image
            src="/video/water-droplet-poster.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            loading="lazy"
            className="object-cover"
            aria-hidden="true"
          />

          {/* Crown Splash Ambient Video Loop */}
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
              <source src="/video/water-droplet.mp4" type="video/mp4" />
            </video>
          )}

          {/* Contrast Tint */}
          <div className="absolute inset-0 bg-brand-deep/75" aria-hidden="true" />

          {/* Banner Typography */}
          <div className="relative z-10 max-w-2xl flex flex-col items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider">
              {isAr ? "تقنية التناضح العكسي RO" : "Reverse Osmosis Technology"}
            </span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug drop-shadow-md">
              {isAr
                ? "إزالة تامة للشوائب والكلور والأملاح الذائبة للحصول على مياه شرب نقية 100%"
                : "Complete elimination of impurities, chlorine, and heavy metals for 100% pure water"}
            </p>
          </div>
        </div>

        {/* 3. Four Quality Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="why-us-card bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-border-subtle/60 flex flex-col items-start text-start hover:shadow-hover transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}>
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-lg font-bold text-brand-deep mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
