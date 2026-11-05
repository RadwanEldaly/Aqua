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
      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full border border-border bg-brand-surface/90 text-brand-navy hover:text-brand-primary hover:border-brand-primary/40 transition-all shadow-subtle disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      <Globe className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
      <span>{targetLabel}</span>
    </button>
  );
}
