"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useLocale } from "next-intl";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export interface CartTriggerProps {
  className?: string;
}

export function CartTrigger({ className }: CartTriggerProps) {
  const locale = useLocale();
  const { totalCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        locale === "ar"
          ? `سلة المشتريات (${totalCount} منتجات)`
          : `Shopping cart (${totalCount} items)`
      }
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-brand-mist/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer",
        className
      )}
    >
      <ShoppingBag className="w-5 h-5" aria-hidden="true" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -end-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center shadow-subtle animate-in zoom-in-50">
          {totalCount}
        </span>
      )}
    </button>
  );
}
