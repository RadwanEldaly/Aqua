"use client";

import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { getProductById } from "@/data/catalog";
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
  size = "sm",
}: AddToCartButtonProps) {
  const isAr = locale === "ar";
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const product = getProductById(productId);
    if (!product) return;

    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isAr ? "إضافة المنتج إلى سلة المشتريات" : "Add to shopping cart"}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-bold rounded-full transition-all active:scale-95 cursor-pointer shadow-subtle",
        size === "sm" ? "h-9 px-3 text-xs" : "h-11 px-5 text-sm",
        isAdded
          ? "bg-emerald-600 text-white"
          : "bg-brand-primary hover:bg-brand-primary-hover text-white",
        className
      )}
    >
      {isAdded ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>{isAr ? "أضيف!" : "Added!"}</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isAr ? "أضف للسلة" : "Add to Cart"}</span>
        </>
      )}
    </button>
  );
}
