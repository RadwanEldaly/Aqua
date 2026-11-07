import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "إتمام الطلب | أكوا" : "Checkout | AQUA",
    description: isAr
      ? "صفحة إتمام وتأكيد طلب أنظمة وفلاتر مياه الشرب."
      : "Complete and confirm your water filtration order.",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: isAr ? "/checkout" : "/en/checkout",
      languages: {
        ar: "/checkout",
        en: "/en/checkout",
        "x-default": "/checkout",
      },
    },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === "ar";

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-16 sm:pb-24 flex-1 flex flex-col gap-8 sm:gap-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 sm:gap-10">
        {/* Saturated Deep-Azure Page Header Panel (matches hero look & feel) */}
        <div className="relative w-full rounded-panel bg-brand-navy overflow-hidden shadow-elevated min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32">
          <div className="absolute inset-0 bg-brand-navy pointer-events-none select-none" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-start text-start max-w-3xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-aqua-300 mb-2">
              <bdi>{isAr ? "الطلب والدفع" : "Order & Payment"}</bdi>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              <bdi>{isAr ? "إتمام وتأكيد الطلب" : "Checkout & Order Confirmation"}</bdi>
            </h1>
            <p className="text-sm sm:text-base text-aqua-200/95 max-w-2xl leading-relaxed">
              <bdi>
                {isAr
                  ? "أدخل بيانات التواصل لتأكيد طلبك وتحديد موعد التسليم."
                  : "Enter your contact details to confirm your order and schedule delivery."}
              </bdi>
            </p>
          </div>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}
