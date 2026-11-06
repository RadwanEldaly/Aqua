"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppBandSection() {
  const t = useTranslations("HomePage.whatsappBand");
  const whatsappUrl = buildWhatsAppUrl(t("whatsappPrefill"));

  // The whole band is hidden if the number is missing (Zero layout shift)
  if (!whatsappUrl) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto rounded-[2rem] bg-brand-primary p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center justify-center gap-6 sm:gap-8 shadow-elevated">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl">
          <bdi>{t("title")}</bdi>
        </h2>

        <Button
          href={whatsappUrl}
          external
          variant="primary"
          size="lg"
          aria-label={t("chatAria")}
          className="min-w-[220px] h-14 px-8 text-base font-bold bg-white text-brand-deep hover:bg-aqua-100 hover:text-brand-deep inline-flex items-center gap-2.5 shadow-subtle cursor-pointer rounded-full"
        >
          <MessageCircle className="w-5 h-5 shrink-0 text-brand-primary" aria-hidden="true" />
          <span>{t("chatAction")}</span>
        </Button>
      </div>
    </section>
  );
}
