"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export interface FloatingActionButtonProps {
  className?: string;
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  const locale = useLocale();
  const t = useTranslations("HomePage.whatsappBand");
  const whatsappUrl = buildWhatsAppUrl(t("whatsappPrefill"));

  // Hidden completely if WhatsApp number is unconfigured (Zero layout shift)
  if (!whatsappUrl) {
    return null;
  }

  return (
    <aside aria-label={locale === "ar" ? "زر التواصل السريع" : "Quick contact button"}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("title")}
        className={cn(
          "fixed z-40 w-14 h-14 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white shadow-elevated",
          "flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
          "bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] end-[calc(1.5rem+env(safe-area-inset-right,0px))]",
          className
        )}
      >
        <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
      </a>
    </aside>
  );
}
