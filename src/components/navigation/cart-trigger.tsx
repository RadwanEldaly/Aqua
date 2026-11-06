"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useLocale } from "next-intl";
import { FEATURES } from "@/config/features";
import { cn } from "@/lib/utils";

export interface CartTriggerProps {
  count?: number;
  className?: string;
  onClick?: () => void;
}

export function CartTrigger({ count = 0, className, onClick }: CartTriggerProps) {
  const locale = useLocale();

  // Progressive rollout: rendered only when FEATURES.cart is enabled
  if (!FEATURES.cart) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        locale === "ar"
          ? `سلة المشتريات (${count} منتجات)`
          : `Shopping cart (${count} items)`
      }
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-brand-mist/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer",
        className
      )}
    >
      <ShoppingBag className="w-5 h-5" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center shadow-subtle">
          {count}
        </span>
      )}
    </button>
  );
}
