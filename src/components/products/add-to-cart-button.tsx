"use client";

import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { PROVISIONAL_PRODUCTS } from "@/data/provisional-products";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  locale: "ar" | "en";
  className?: string;
  size?: "sm" | "md";
}

export function AddToCartButton({
  productId,
  locale,
  className,
}: AddToCartButtonProps) {
  const isAr = locale === "ar";
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const product = PROVISIONAL_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isAdded ? (isAr ? "تمت الإضافة إلى الطلب" : "Added to order") : (isAr ? "أضف إلى الطلب" : "Add to order")}
      className={cn(
        "w-full min-h-[44px] h-11 px-2.5 py-2 inline-flex items-center justify-center gap-1.5 font-bold rounded-xl sm:rounded-full transition-all active:scale-95 cursor-pointer shadow-subtle shrink-0 text-xs sm:text-sm text-center leading-tight min-w-0 select-none",
        isAdded
          ? "bg-emerald-600 text-white"
          : "bg-brand-primary hover:bg-brand-primary-hover text-white",
        className
      )}
    >
      {isAdded ? (
        <>
          <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
          <span className="truncate">{isAr ? "تمت الإضافة" : "Added"}</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">
            <span className="sm:hidden">{isAr ? "أضف" : "Add"}</span>
            <span className="hidden sm:inline">{isAr ? "أضف إلى الطلب" : "Add to order"}</span>
          </span>
        </>
      )}
    </button>
  );
}
