/**
 * DEV-ONLY FIXTURES (LABELED PLACEHOLDER).
 * STRICT POLICY:
 * - Used strictly for /dev/showcase and local unit verification.
 * - MUST NEVER be imported by production routes or committed as production catalog data.
 */

import { type ProvisionalProduct } from "@/data/provisional-products";
import { type Package } from "@/data/packages";

export const PLACEHOLDER_OFFER_PRODUCTS: readonly ProvisionalProduct[] = [
  {
    id: "placeholder-offer-1",
    categoryId: "systems",
    name: {
      ar: "[تجريبي] جهاز تحلية منزلي ذكي",
      en: "[Placeholder] Smart Home RO System",
    },
    price: 1300,
    compareAtPrice: 1550, // Savings = 250 SAR (16%)
    image: {
      src: "/images/offers/artec-pro-digital.jpg",
      width: 800,
      height: 800,
      alt: {
        ar: "[تجريبي] جهاز تحلية",
        en: "[Placeholder] RO System",
      },
    },
  },
  {
    id: "placeholder-offer-2",
    categoryId: "dispensers",
    name: {
      ar: "[تجريبي] برادة مياه طاولة فاخرة",
      en: "[Placeholder] Premium Countertop Dispenser",
    },
    price: 790,
    compareAtPrice: 990, // Savings = 200 SAR (20%)
    image: {
      src: "/images/products/tabletop-dispenser-black.jpg",
      width: 800,
      height: 800,
      alt: {
        ar: "[تجريبي] برادة مياه",
        en: "[Placeholder] Dispenser",
      },
    },
  },
];

export const PLACEHOLDER_PACKAGES: readonly Package[] = [
  {
    id: "placeholder-pkg-1",
    name: {
      ar: "[تجريبي] بكج الأمان المتكامل (فلتر + برادة)",
      en: "[Placeholder] Complete Safety Package (Filter + Dispenser)",
    },
    items: [
      { productId: "package-alaman", qty: 1 },
      { productId: "tabletop-dispenser-rotary", qty: 1 },
    ],
    price: 1999, // Bundle price (sum = 1999 + 790 = 2789; savings = 790 SAR)
  },
];
