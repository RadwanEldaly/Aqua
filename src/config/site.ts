import type { Locale } from "@/types/locale";

export const siteConfig = {
  name: {
    ar: "أكوا لتنقية المياه",
    en: "AQUA Water Filtration",
  },
  shortName: {
    ar: "أكوا",
    en: "AQUA",
  },
  tagline: {
    ar: "أنظمة وفلاتر تنقية المياه في المملكة العربية السعودية",
    en: "Water filtration systems and filters in Saudi Arabia",
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
    freeDeliveryThreshold: 0,
    supportCities: [
      { id: "riyadh", name: { ar: "الرياض", en: "Riyadh" } },
      { id: "jeddah", name: { ar: "جدة", en: "Jeddah" } },
      { id: "dammam", name: { ar: "الدمام", en: "Dammam" } },
      { id: "khobar", name: { ar: "الخبر", en: "Khobar" } },
      { id: "makkah", name: { ar: "مكة المكرمة", en: "Makkah" } },
      { id: "medina", name: { ar: "المدينة المنورة", en: "Madinah" } },
      { id: "taif", name: { ar: "الطائف", en: "Taif" } },
      { id: "qassim", name: { ar: "القصيم", en: "Qassim" } },
      { id: "other", name: { ar: "مدينة أخرى", en: "Other City" } },
    ],
  },
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61596223054770&mibextid=ZbWKwL",
    threads: "https://www.threads.com/@aqua.guard9",
    x: "https://x.com/aquaguaard99",
  },
} as const;

export type SiteConfig = typeof siteConfig;
