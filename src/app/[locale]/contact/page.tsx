import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24 sm:pb-28 flex-1 flex flex-col gap-10 sm:gap-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Rounded Tinted Page Header Panel */}
        <div className="rounded-[2rem] bg-brand-surface border border-border-subtle/80 p-8 sm:p-12 lg:p-14 shadow-card text-center">
          <SectionHeading
            titleAs="h1"
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </div>

        {/* Contact Form Card */}
        <div className="w-full max-w-2xl mx-auto rounded-[2rem] bg-white border border-border-subtle/80 p-6 sm:p-10 lg:p-12 shadow-card">
          <ContactForm locale={locale as "ar" | "en"} />
        </div>
      </div>
    </div>
  );
}
