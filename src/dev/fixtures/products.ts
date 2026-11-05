/**
 * Dev-only Placeholder Fixtures for Design System Testing
 *
 * STRICT COMPLIANCE:
 * - Marked explicitly as PLACEHOLDER
 * - No real or invented product catalog data or brand marks
 */

export const PLACEHOLDER_NAV_ITEMS = [
  { href: "#", label: { ar: "رابط 1 (PLACEHOLDER)", en: "Link 1 (PLACEHOLDER)" } },
  { href: "#", label: { ar: "رابط 2 (PLACEHOLDER)", en: "Link 2 (PLACEHOLDER)" } },
  { href: "#", label: { ar: "رابط 3 (PLACEHOLDER)", en: "Link 3 (PLACEHOLDER)" } },
];

export const PLACEHOLDER_CARD_DATA = {
  id: "placeholder-sample-01",
  name: "جهاز تجريبي (PLACEHOLDER RO-UNIT)",
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

export const SWATCH_FAMILIES = {
  blueScale: [
    { step: "50", hex: "#f0f9ff", bgClass: "bg-aqua-50", textClass: "text-slate-900", contrast: "18.0:1" },
    { step: "100", hex: "#e0f2fe", bgClass: "bg-aqua-100", textClass: "text-slate-900", contrast: "15.6:1" },
    { step: "200", hex: "#bae6fd", bgClass: "bg-aqua-200", textClass: "text-slate-900", contrast: "13.8:1" },
    { step: "300", hex: "#7dd3fc", bgClass: "bg-aqua-300", textClass: "text-slate-900", contrast: "11.2:1" },
    { step: "400", hex: "#38bdf8", bgClass: "bg-aqua-400", textClass: "text-slate-900", contrast: "8.5:1" },
    { step: "500", hex: "#0ea5e9", bgClass: "bg-aqua-500", textClass: "text-white", contrast: "3.1:1 UI" },
    { step: "600", hex: "#0284c7", bgClass: "bg-aqua-600", textClass: "text-white", contrast: "3.4:1 UI" },
    { step: "700", hex: "#0369a1", bgClass: "bg-aqua-700", textClass: "text-white", contrast: "4.8:1 AA" },
    { step: "800", hex: "#075985", bgClass: "bg-aqua-800", textClass: "text-white", contrast: "7.0:1 AAA" },
    { step: "900", hex: "#0b2545", bgClass: "bg-aqua-900", textClass: "text-white", contrast: "13.9:1 AAA" },
    { step: "950", hex: "#07172c", bgClass: "bg-aqua-950", textClass: "text-white", contrast: "18.0:1 AAA" },
  ],
  neutralScale: [
    { step: "50", hex: "#f8fafc", bgClass: "bg-slate-50", textClass: "text-slate-900", contrast: "18.2:1" },
    { step: "100", hex: "#f1f5f9", bgClass: "bg-slate-100", textClass: "text-slate-900", contrast: "17.1:1" },
    { step: "200", hex: "#e2e8f0", bgClass: "bg-slate-200", textClass: "text-slate-900", contrast: "15.2:1" },
    { step: "300", hex: "#cbd5e1", bgClass: "bg-slate-300", textClass: "text-slate-900", contrast: "12.3:1" },
    { step: "400", hex: "#94a3b8", bgClass: "bg-slate-400", textClass: "text-slate-900", contrast: "6.8:1" },
    { step: "500", hex: "#64748b", bgClass: "bg-slate-500", textClass: "text-white", contrast: "4.6:1 AA" },
    { step: "600", hex: "#475569", bgClass: "bg-slate-600", textClass: "text-white", contrast: "7.3:1 AAA" },
    { step: "700", hex: "#334155", bgClass: "bg-slate-700", textClass: "text-white", contrast: "10.2:1 AAA" },
    { step: "800", hex: "#1e293b", bgClass: "bg-slate-800", textClass: "text-white", contrast: "14.5:1 AAA" },
    { step: "900", hex: "#0f172a", bgClass: "bg-slate-900", textClass: "text-white", contrast: "18.4:1 AAA" },
  ],
  statusScale: [
    { name: "Success", bg: "#ecfdf5", fg: "#047857", bgClass: "bg-emerald-50", textClass: "text-emerald-800", contrast: "7.1:1 AAA" },
    { name: "Warning", bg: "#fffbeb", fg: "#b45309", bgClass: "bg-amber-50", textClass: "text-amber-800", contrast: "5.8:1 AA" },
    { name: "Error", bg: "#fef2f2", fg: "#b91c1c", bgClass: "bg-rose-50", textClass: "text-rose-800", contrast: "6.9:1 AAA" },
    { name: "Neutral", bg: "#f1f5f9", fg: "#334155", bgClass: "bg-slate-100", textClass: "text-slate-800", contrast: "9.5:1 AAA" },
  ],
};
