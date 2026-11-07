"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useGSAP, gsap } from "@/hooks/use-gsap";

interface SpecialOffersSectionProps {
  locale: "ar" | "en";
}

export function SpecialOffersSection({ locale }: SpecialOffersSectionProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  // Noticeable, smooth scroll animation using GSAP ScrollTrigger
  useGSAP(
    () => {
      const banner = sectionRef.current?.querySelector(".offer-banner-anim");
      const cards = sectionRef.current?.querySelectorAll(".offer-card-anim");

      if (banner) {
        gsap.fromTo(
          banner,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: banner,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const alamanWhatsappMsg = isAr
    ? "مرحباً أكوا جارد، أود الاستفسار وطلب (عرض بكج الأمان المتكامل 1999 ر.س) شامل التوصيل والتركيب والضريبة."
    : "Hello Aqua Guard, I would like to order the (Al-Aman Safety Package 1999 SAR) with free delivery and installation.";
  const alamanWhatsappUrl = buildWhatsAppUrl(alamanWhatsappMsg);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
          <span>{isAr ? "عروض حصرية لفترة محدودة" : "Exclusive Limited-Time Offers"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep tracking-tight">
          {isAr ? "باقات وعروض أكوا الخاصة" : "AQUA Featured Packages & Offers"}
        </h2>
        <p className="text-base sm:text-lg text-text-subtle mt-3">
          {isAr
            ? "حلول شاملة متكاملة لمياه شرب نقية وصحية مع الدفع عند الاستلام"
            : "Complete bundled solutions for pure drinking water with cash on delivery"}
        </p>
      </div>

      {/* 1. MASTER SHOWCASE: بكج الأمان (Al-Aman Safety Package) */}
      <div className="offer-banner-anim relative rounded-3xl bg-gradient-to-br from-brand-deep via-brand-navy to-brand-primary/95 text-white p-6 sm:p-10 lg:p-12 shadow-elevated overflow-hidden mb-12">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -end-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-96 h-96 bg-brand-primary/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Details & Features (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? "العرض الأقوى - بكج الأمان" : "Best Seller - Al-Aman Package"}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                {isAr ? "وفر 900 ريال سعودي" : "Save 900 SAR"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {isAr
                ? "بكج الأمان المتكامل (فلتر 7 مراحل + برادة + خزان + حنفية)"
                : "Al-Aman Safety Bundle (7-Stage Filter + Dispenser + Tank + Faucet)"}
            </h3>

            <p className="text-base sm:text-lg text-aqua-100/90 leading-relaxed max-w-xl">
              {isAr
                ? "العرض الحصري الأكثر طلباً في المملكة: احصل على محطة تحلية منزلية 7 مراحل مع برادة طاولة عصرية وخزان ضغط صحي وصنبور ستيل فاخر شامل التركيب والضريبة."
                : "Our flagship bundle: Complete 7-stage RO purifier, modern tabletop water dispenser, pressurized storage tank, and premium stainless steel faucet."}
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-1">
              <div className="flex items-center gap-2 text-sm text-aqua-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{isAr ? "جهاز تحلية 7 مراحل بنظام RO" : "7-Stage RO purification"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-aqua-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{isAr ? "برادة طاولة ذكية 3 صنابير" : "Smart 3-tap tabletop dispenser"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-aqua-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{isAr ? "خزان ضغط صحي سعة 19 لتر" : "19L sanitary pressure tank"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-aqua-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{isAr ? "حنفية فاخرة ستانلس ستيل 304" : "Luxury 304 steel faucet"}</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex flex-wrap items-baseline gap-4 pt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                1999 <span className="text-xl font-bold text-aqua-300">{isAr ? "ر.س" : "SAR"}</span>
              </div>
              <div className="text-xl sm:text-2xl text-white/60 line-through decoration-red-500 decoration-2">
                2899 {isAr ? "ر.س" : "SAR"}
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {isAr ? "شامل التوصيل والتركيب والضريبة" : "Free Delivery, Install & VAT"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full">
              <AddToCartButton
                productId="package-alaman"
                locale={locale}
                size="md"
                className="bg-white text-brand-deep hover:bg-aqua-100 hover:text-brand-deep shadow-elevated"
              />

              {alamanWhatsappUrl && (
                <a
                  href={alamanWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-subtle transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "طلب العرض عبر واتساب" : "Order via WhatsApp"}</span>
                </a>
              )}

              <Link
                href="/products/package-alaman"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-aqua-200 hover:text-white transition-colors ms-auto"
              >
                <span>{isAr ? "معاينة التفاصيل" : "View Details"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>

          {/* Offer Visual Flyer (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <Link
              href="/products/package-alaman"
              className="relative w-full max-w-md aspect-[4/5] rounded-2xl bg-white p-3 shadow-2xl overflow-hidden block group transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/images/offers/package-alaman.jpg"
                alt={isAr ? "عرض بكج الأمان المتكامل" : "Al-Aman Safety Package Offer"}
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 1024px) 90vw, 450px"
              />
              <div className="absolute inset-0 bg-brand-deep/0 group-hover:bg-brand-deep/10 transition-colors pointer-events-none" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. SUB-OFFERS GRID (Artec Pro, Silver Bundle, Shower Heads) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Sub-Offer 1: Artec Pro Digital */}
        <div className="offer-card-anim rounded-3xl bg-white p-6 shadow-card border border-border-subtle flex flex-col justify-between group hover:shadow-hover transition-all">
          <div>
            <div className="relative aspect-square w-full rounded-2xl bg-surface-subtle p-4 mb-4 flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 start-3 z-10 px-3 py-1 rounded-full bg-brand-primary text-white text-[11px] font-bold">
                {isAr ? "الفلتر الذكي بدون خزان" : "Smart Tankless"}
              </span>
              <Image
                src="/images/offers/artec-pro-digital.jpg"
                alt={isAr ? "جهاز تحلية ارتك برو ديجيتال" : "Artec Pro Digital Purifier"}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-lg font-bold text-brand-deep group-hover:text-brand-primary transition-colors line-clamp-2">
                <Link href="/products/artec-pro-digital">
                  {isAr
                    ? "جهاز تحلية ارتك برو ديجيتال 6 مراحل بدون خزان"
                    : "Artec Pro Digital 6-Stage Tankless Purifier"}
                </Link>
              </h4>
              <p className="text-xs text-text-subtle line-clamp-2">
                {isAr
                  ? "شاشة رقمية ذكية وإنتاجية تصل إلى 1600 لتر يومياً وتصميم مدمج."
                  : "Smart digital screen, 1600L/day capacity, and compact design."}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-brand-deep">
                1300 <span className="text-xs text-brand-primary">{isAr ? "ر.س" : "SAR"}</span>
              </div>
              <div className="text-xs text-text-subtle line-through">
                1550 {isAr ? "ر.س" : "SAR"}
              </div>
            </div>

            <AddToCartButton productId="artec-pro-digital" locale={locale} size="sm" />
          </div>
        </div>

        {/* Sub-Offer 2: Nano Silver + Black Dispenser */}
        <div className="offer-card-anim rounded-3xl bg-white p-6 shadow-card border border-border-subtle flex flex-col justify-between group hover:shadow-hover transition-all">
          <div>
            <div className="relative aspect-square w-full rounded-2xl bg-surface-subtle p-4 mb-4 flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 start-3 z-10 px-3 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold">
                {isAr ? "بكج التوفير - وفر 550 ر.س" : "Save 550 SAR"}
              </span>
              <Image
                src="/images/offers/bundle-filter-dispenser.jpg"
                alt={isAr ? "بكج فلتر نانو سيلفر وبرادة بيور تاب" : "Pure Silver & Dispenser Bundle"}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-lg font-bold text-brand-deep group-hover:text-brand-primary transition-colors line-clamp-2">
                <Link href="/products/bundle-filter-dispenser">
                  {isAr
                    ? "بكج فلتر نانو سيلفر 7 مراحل + برادة بيور تاب سوداء"
                    : "Pure Silver 7-Stage Purifier + Black Tabletop Dispenser"}
                </Link>
              </h4>
              <p className="text-xs text-text-subtle line-clamp-2">
                {isAr
                  ? "طقم متكامل يجمع التحلية السباعية الفائقة مع برادة طاولة عصرية 3 صنابير."
                  : "Complete bundle combining 7-stage RO purifier and 3-tap tabletop dispenser."}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-brand-deep">
                1650 <span className="text-xs text-brand-primary">{isAr ? "ر.س" : "SAR"}</span>
              </div>
              <div className="text-xs text-text-subtle line-through">
                2200 {isAr ? "ر.س" : "SAR"}
              </div>
            </div>

            <AddToCartButton productId="bundle-filter-dispenser" locale={locale} size="sm" />
          </div>
        </div>

        {/* Sub-Offer 3: Shower Heads 2x */}
        <div className="offer-card-anim rounded-3xl bg-white p-6 shadow-card border border-border-subtle flex flex-col justify-between group hover:shadow-hover transition-all">
          <div>
            <div className="relative aspect-square w-full rounded-2xl bg-surface-subtle p-4 mb-4 flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 start-3 z-10 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                {isAr ? "عرض خاص 2x حبتين" : "2x Special Bundle"}
              </span>
              <Image
                src="/images/offers/shower-filter-bundle.jpg"
                alt={isAr ? "عرض حبتين رأس دش مصفى" : "2x Filtered Shower Heads"}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-lg font-bold text-brand-deep group-hover:text-brand-primary transition-colors line-clamp-2">
                <Link href="/products/shower-filter-bundle">
                  {isAr
                    ? "عرض خاص 2x: دش استحمام مصفى لإزالة الكلور والشوائب"
                    : "Special 2x: Filtered Shower Heads for Chlorine Removal"}
                </Link>
              </h4>
              <p className="text-xs text-text-subtle line-clamp-2">
                {isAr
                  ? "حبتين رأس دش نانو مصفى لحماية البشرة ونعومة الشعر وزيادة ضغط الماء."
                  : "2x nano filtered shower heads for skin protection and hair softness."}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-brand-deep">
                99 <span className="text-xs text-brand-primary">{isAr ? "ر.س" : "SAR"}</span>
              </div>
              <div className="text-xs text-text-subtle line-through">
                198 {isAr ? "ر.س" : "SAR"}
              </div>
            </div>

            <AddToCartButton productId="shower-filter-bundle" locale={locale} size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
