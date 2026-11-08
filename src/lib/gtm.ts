"use client";

import { useEffect } from "react";

export type GtmEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Pushes custom e-commerce or conversion events to Google Tag Manager dataLayer
 * and dispatches directly to Google Ads Conversion if applicable.
 */
export function pushEvent(data: GtmEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);

  // Directly dispatch Google Ads conversion for Purchase
  if (data.event === "purchase") {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof win.gtag === "function") {
      win.gtag("event", "conversion", {
        send_to: "AW-18563616365/1qRaCNbz07QdEO2c6ZNF",
        value: data.value,
        currency: data.currency || "SAR",
        transaction_id: data.transaction_id,
      });
    }
  }
}

// Track WhatsApp click with debouncing to prevent any rapid double firing
let lastWaClick = 0;
export function trackWhatsAppClick() {
  const now = Date.now();
  if (now - lastWaClick < 800) return;
  lastWaClick = now;

  pushEvent({
    event: "whatsapp_click",
  });
}

/**
 * Single source of truth listener: automatically intercepts all WhatsApp clicks
 * across the entire application without needing individual onClick handlers on links.
 */
export function GtmGlobalListener() {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (
        href.includes("wa.me") ||
        href.includes("whatsapp.com") ||
        href.includes("api.whatsapp.com")
      ) {
        trackWhatsAppClick();
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return null;
}
