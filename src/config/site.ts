import type { Locale } from "@/types/locale";

export const siteConfig = {
  name: {
    ar: "أكوا جارد لتنقية المياه",
    en: "Aqua Guard Water Filtration",
  },
  shortName: {
    ar: "أكوا جارد",
    en: "Aqua Guard",
  },
  tagline: {
    ar: "حلول متقدمة لأنظمة وفلاتر وبرادات المياه في المملكة العربية السعودية",
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
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966577842370",
    displayPhone: "+966 57 784 2370",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Aquaguaard9@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
