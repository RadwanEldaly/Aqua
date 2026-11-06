import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "ar" ? "/contact" : "/en/contact",
      languages: {
        ar: "/contact",
        en: "/en/contact",
        "x-default": "/contact",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-24 sm:pb-28 flex-1 flex flex-col gap-10 sm:gap-14">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Saturated Deep-Azure Page Header Panel (matches hero look & feel) */}
        <div className="relative w-full rounded-panel bg-brand-navy overflow-hidden shadow-elevated min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32 text-center items-center">
          {/* Solid Brand Navy Token Overlay (No Gradient) */}
          <div className="absolute inset-0 bg-brand-navy pointer-events-none select-none" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="text-xs sm:text-sm font-semibold ltr:uppercase ltr:tracking-wider text-aqua-200">
              {t("eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mt-2 sm:mt-3">
              <bdi>{t("title")}</bdi>
            </h1>
            <p className="text-aqua-100/90 text-base sm:text-lg lg:text-xl font-light leading-relaxed mt-3 sm:mt-4">
              <bdi>{t("description")}</bdi>
            </p>
          </div>
        </div>

        {/* Contact Form Card (Pure White Rounded Panel - NO border) */}
        <div className="w-full max-w-2xl mx-auto rounded-panel bg-white p-6 sm:p-10 lg:p-12 shadow-card">
          <ContactForm locale={locale as "ar" | "en"} />
        </div>
      </div>
    </div>
  );
}
