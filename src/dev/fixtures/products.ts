/**
 * Dev-only Placeholder Fixtures for Design System Testing
 *
 * STRICT COMPLIANCE:
 * - Marked explicitly as PLACEHOLDER
 * - No real or invented product catalog data
 */

export const PLACEHOLDER_CARD_DATA = {
  id: "placeholder-sample-01",
  name: "جهاز تنقية تجريبي (PLACEHOLDER RO-UNIT)",
  category: "فئة تجريبية (PLACEHOLDER)",
  price: 850,
  compareAtPrice: 1100,
  badge: {
    text: "عينة تجريبية (SAMPLE)",
    variant: "primary" as const,
  },
  imageUrl: undefined,
  href: "#",
};

export const PLACEHOLDER_SWATCHES = [
  { name: "--color-aqua-deep", var: "bg-brand-deep", hex: "#07172c", label: "Deep Ocean (950)" },
  { name: "--color-aqua-navy", var: "bg-brand-navy", hex: "#0b2545", label: "Oceanic Navy (900)" },
  { name: "--color-aqua-marine", var: "bg-brand-marine", hex: "#134074", label: "Marine (800)" },
  { name: "--color-aqua-primary", var: "bg-brand-primary", hex: "#0284c7", label: "Crystal Azure (600)" },
  { name: "--color-aqua-primary-hover", var: "bg-brand-primary-hover", hex: "#0369a1", label: "Deep Azure (700)" },
  { name: "--color-aqua-cyan", var: "bg-brand-cyan", hex: "#06b6d4", label: "Mineral Cyan (500)" },
  { name: "--color-aqua-ice", var: "bg-brand-ice", hex: "#e0f2fe", label: "Glacial Ice (100)" },
  { name: "--color-aqua-mist", var: "bg-brand-mist", hex: "#f0f9ff", label: "Water Mist (50)" },
];
