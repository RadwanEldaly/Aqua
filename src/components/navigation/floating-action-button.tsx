"use client";

import React from "react";
import { useLocale } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, PhoneCallIcon } from "@/components/ui/social-icons";
import { cn } from "@/lib/utils";

export interface FloatingActionButtonProps {
  className?: string;
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const whatsappUrl = buildWhatsAppUrl(
    isAr
      ? "السلام عليكم، أود الاستفسار عن منتجات وفلاتر أكوا لتنقية المياه."
      : "Hello, I would like to inquire about AQUA water filtration systems."
  );

  const rawPhone = process.env.NEXT_PUBLIC_PHONE_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966577842370";
  const cleanPhone = rawPhone.replace(/\D/g, "");
  const telUrl = cleanPhone ? `tel:+${cleanPhone}` : null;

  // Hidden completely if contact numbers are unconfigured
  if (!whatsappUrl && !telUrl) {
    return null;
  }

  return (
    <aside
      aria-label={isAr ? "أزرار التواصل والاتصال السريع" : "Quick contact & call buttons"}
      className={cn(
        "fixed z-40 flex flex-col items-center gap-2.5 md:gap-3 select-none",
        // Mobile: sits safely above the mobile bottom bar (bottom-[72px]); Desktop: bottom-6 end-6
        "bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] end-3.5 md:end-6",
        className
      )}
    >
      {/* 1. Quick Call Button (Placed ABOVE the WhatsApp button) */}
      {telUrl && (
        <a
          href={telUrl}
          aria-label={isAr ? "اتصال هاتفي مباشر بـ أكوا" : "Direct phone call to AQUA"}
          className={cn(
            "group/call relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-card",
            "bg-brand-ocean hover:bg-brand-azure text-white transition-all duration-200 hover:scale-110 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2"
          )}
        >
          <PhoneCallIcon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover/call:rotate-12" />
          <span className="absolute end-full me-2.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-abyss text-white shadow-elevated whitespace-nowrap opacity-0 pointer-events-none group-hover/call:opacity-100 transition-opacity duration-150 hidden md:inline-block">
            {isAr ? "اتصال سريع" : "Direct Call"}
          </span>
        </a>
      )}

      {/* 2. WhatsApp Official Floating Button */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isAr ? "محادثة فورية عبر واتساب" : "Instant chat on WhatsApp"}
          className={cn(
            "group/wa relative w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-elevated",
            "bg-[#25D366] hover:bg-[#20ba59] text-white transition-all duration-200 hover:scale-110 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          )}
        >
          {/* Subtle pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
            aria-hidden="true"
          />
          <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 shrink-0 relative z-10 transition-transform duration-200 group-hover/wa:scale-105" />
          <span className="absolute end-full me-2.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-abyss text-white shadow-elevated whitespace-nowrap opacity-0 pointer-events-none group-hover/wa:opacity-100 transition-opacity duration-150 hidden md:inline-block">
            {isAr ? "محادثة واتساب" : "WhatsApp Chat"}
          </span>
        </a>
      )}
    </aside>
  );
}
