import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { RippleRings } from "@/components/ui/brand-patterns";
import { MessageCircle } from "lucide-react";
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
      ? "السلام عليكم، أود التواصل مع أكوا."
      : "Hello, I would like to contact AQUA."
  );

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-24 sm:pb-28 flex-1 flex flex-col gap-10 sm:gap-14">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Saturated Deep-Azure Page Header Panel */}
        <div className="relative w-full rounded-panel bg-brand-ocean overflow-hidden shadow-elevated min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32 text-center items-center">
          {/* Subtle Ambient Ripple Rings */}
          <div className="absolute -top-16 -end-16 w-[420px] h-[420px] opacity-25 pointer-events-none select-none" aria-hidden="true">
            <RippleRings className="w-full h-full text-brand-foam/30" />
          </div>

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

            {/* Direct WhatsApp Action in Header */}
            {directWhatsAppUrl && (
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-brand-deep font-bold text-sm shadow-subtle hover:bg-aqua-100 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <span>{t("directAction")}</span>
              </a>
            )}
          </div>
        </div>

        {/* Message Form (Name + Message that opens WhatsApp) */}
        <div className="w-full max-w-2xl mx-auto rounded-panel bg-white p-6 sm:p-10 lg:p-12 shadow-card">
          <ContactForm locale={locale as "ar" | "en"} />
        </div>
      </div>
    </div>
  );
}
