"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";

/**
 * Architectural Language Switcher Component
 * Switches between Arabic (RTL) and English (LTR) while preserving the current route.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === "ar" ? "en" : "ar";
  const targetLabel = locale === "ar" ? "English" : "العربية";

  function handleLocaleChange() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  return (
    <button
      type="button"
      onClick={handleLocaleChange}
      disabled={isPending}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى اللغة العربية"}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full border border-slate-200 bg-white/90 text-slate-700 hover:text-sky-600 hover:border-sky-300 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
    >
      <Globe className="w-3.5 h-3.5 text-sky-600" />
      <span>{targetLabel}</span>
    </button>
  );
}
