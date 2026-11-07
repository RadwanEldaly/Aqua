"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export interface CartTriggerProps {
  className?: string;
}

export function CartTrigger({ className }: CartTriggerProps) {
  const locale = useLocale();
  const { totalCount, isMounted } = useCart();
  const count = isMounted ? totalCount : 0;

  const label =
    locale === "ar"
      ? `سلة الطلبات${count > 0 ? ` (${count})` : ""}`
      : `Order cart${count > 0 ? ` (${count})` : ""}`;

  return (
    <Link
      href="/cart"
      aria-label={label}
      className={cn(
        "relative w-11 h-11 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-brand-mist/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer shrink-0",
        className
      )}
    >
      <ShoppingBag className="w-5 h-5" aria-hidden="true" />
      {/* Polite live region with reserved badge space and zero layout shift */}
      <span
        aria-live="polite"
        className={cn(
          "absolute -top-1 -end-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center shadow-subtle transition-opacity duration-150 pointer-events-none",
          count > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        {count > 0 ? count : ""}
      </span>
    </Link>
  );
}
