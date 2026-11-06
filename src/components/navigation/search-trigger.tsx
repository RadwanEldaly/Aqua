"use client";

import React from "react";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { FEATURES } from "@/config/features";
import { cn } from "@/lib/utils";

export interface SearchTriggerProps {
  className?: string;
  onClick?: () => void;
}

export function SearchTrigger({ className, onClick }: SearchTriggerProps) {
  const locale = useLocale();

  // Progressive rollout: rendered only when FEATURES.search is enabled
  if (!FEATURES.search) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={locale === "ar" ? "البحث في المنتجات" : "Search products"}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-brand-mist/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer",
        className
      )}
    >
      <Search className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
