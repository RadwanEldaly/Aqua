import type { Locale } from "@/types/locale";

export const siteConfig = {
  name: {
    ar: "أكوا لتنقية المياه",
    en: "Aqua Water Purification",
  },
  shortName: {
    ar: "أكوا",
    en: "Aqua",
  },
  tagline: {
    ar: "حلول متقدمة لأنظمة وفلاتر تنقية المياه في المملكة العربية السعودية",
    en: "Advanced water filtration and purification solutions in Saudi Arabia",
  },
  targetMarket: {
    country: "Saudi Arabia",
    countryCode: "SA",
    defaultCurrency: "SAR" as const,
    currencySymbol: {
      ar: "ر.س",
      en: "SAR",
    },
  },
  localization: {
    defaultLocale: "ar" as Locale,
    locales: ["ar", "en"] as const,
  },
  commerce: {
    paymentMethod: "COD" as const,
    freeDeliveryThreshold: 0, // Configurable for future business rules
    supportCities: [
      { id: "riyadh", name: { ar: "الرياض", en: "Riyadh" } },
      { id: "jeddah", name: { ar: "جدة", en: "Jeddah" } },
      { id: "dammam", name: { ar: "الدمام", en: "Dammam" } },
      { id: "khobar", name: { ar: "الخبر", en: "Khobar" } },
      { id: "makkah", name: { ar: "مكة المكرمة", en: "Makkah" } },
      { id: "medina", name: { ar: "المدينة المنورة", en: "Madinah" } },
    ],
  },
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
