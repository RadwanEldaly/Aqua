import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

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
  const isAr = locale === "ar";
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const directWhatsAppUrl = buildWhatsAppUrl(
    isAr
      ? "مرحباً أكوا جارد، أود الاستفسار عن فلاتر وأجهزة تحلية المياه."
      : "Hello Aqua Guard, I would like to inquire about water filtration systems."
  );

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-24 sm:pb-28 flex-1 flex flex-col gap-10 sm:gap-14">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Saturated Deep-Azure Page Header Panel */}
        <div className="relative w-full rounded-panel bg-brand-navy overflow-hidden shadow-elevated min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32 text-center items-center">
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

        {/* Contact Info Cards Strip */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp / Phone */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-border-subtle flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-text-subtle mb-1">
              {isAr ? "خدمة العملاء والواتساب" : "WhatsApp Support"}
            </span>
            {directWhatsAppUrl ? (
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="text-base font-bold text-brand-deep hover:text-emerald-600 transition-colors"
              >
                {siteConfig.contact.displayPhone}
              </a>
            ) : (
              <span dir="ltr" className="text-base font-bold text-brand-deep">
                {siteConfig.contact.displayPhone}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-border-subtle flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-text-subtle mb-1">
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm font-bold text-brand-deep hover:text-brand-primary transition-colors truncate max-w-full"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          {/* Location / Coverage */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-border-subtle flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-text-subtle mb-1">
              {isAr ? "مناطق التغطية" : "Service Coverage"}
            </span>
            <span className="text-sm font-bold text-brand-deep">
              {isAr ? "كافة مدن المملكة العربية السعودية" : "All Cities in Saudi Arabia"}
            </span>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="w-full max-w-2xl mx-auto rounded-panel bg-white p-6 sm:p-10 lg:p-12 shadow-card">
          <ContactForm locale={locale as "ar" | "en"} />
        </div>
      </div>
    </div>
  );
}
