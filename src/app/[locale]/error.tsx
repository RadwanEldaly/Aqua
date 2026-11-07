"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    // Log unexpected runtime error
    console.error("Runtime error captured in root error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-border-subtle text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 stroke-[1.75]" aria-hidden="true" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-brand-deep mb-3">
          {t("title")}
        </h1>

        <p className="text-sm text-text-subtle-accessible leading-relaxed mb-8">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-subtle transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{t("retryAction")}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-border hover:bg-surface-subtle text-brand-deep font-semibold text-sm transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>{t("homeAction")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
