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
    title: isAr ? "إتمام الطلب | أكوا جارد" : "Checkout | AQUA GUARD",
    description: isAr
      ? "صفحة إتمام وتأكيد طلب أنظمة وفلاتر مياه الشرب مع التوصيل والتركيب المجاني في السعودية."
      : "Complete your water filtration order with free delivery and installation in Saudi Arabia.",
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
    <div className="pt-24 sm:pt-28 pb-20 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-mist text-brand-primary text-xs font-bold mb-3">
            {isAr ? "الدفع عند الاستلام مع ضمان سنتين" : "Cash on Delivery with 2-Year Warranty"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-deep">
            {isAr ? "إتمام وتأكيد الطلب" : "Checkout & Order Confirmation"}
          </h1>
          <p className="text-sm text-text-subtle mt-2">
            {isAr
              ? "خطوة واحدة فقط لتأكيد طلبك وتحديد موعد التوصيل والتركيب المجاني"
              : "Just one step to finalize your order and schedule free installation"}
          </p>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}
