"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Check, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export function CartToast() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { lastAddedToast, dismissToast } = useCart();
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!lastAddedToast) return;

    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        dismissToast();
      }, 4000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lastAddedToast, isPaused, dismissToast]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lastAddedToast) {
        dismissToast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastAddedToast, dismissToast]);

  if (!lastAddedToast) return null;

  const product = lastAddedToast.product;
  const name = product.name[isAr ? "ar" : "en"];

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn(
        "fixed z-50 flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white shadow-elevated border border-border-subtle",
        "transition-all duration-200 ease-out",
        // Mobile: centered at bottom above mobile bar
        "bottom-20 start-4 end-4 sm:start-auto sm:end-6 sm:bottom-6 sm:max-w-md",
        // Desktop: top-end alignment
        "md:top-24 md:bottom-auto md:end-8"
      )}
    >
      {/* Product Thumbnail */}
      <div className="relative w-12 h-12 rounded-xl bg-surface-subtle p-1 shrink-0 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image.src}
          alt={name}
          fill
          className="object-contain p-0.5"
          sizes="48px"
        />
      </div>

      {/* Message & Name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
          <span>{isAr ? "تمت الإضافة إلى الطلب" : "Added to order"}</span>
        </div>
        <p className="text-xs font-medium text-brand-deep truncate mt-0.5">{name}</p>
      </div>

      {/* Action link to /cart */}
      <Link
        href="/cart"
        onClick={dismissToast}
        className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover underline shrink-0 px-2 py-1 cursor-pointer"
      >
        {isAr ? "عرض الطلب" : "View order"}
      </Link>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={dismissToast}
        aria-label={isAr ? "إغلاق الإشعار" : "Dismiss notification"}
        className="p-1 rounded-full text-text-subtle-accessible hover:text-brand-deep hover:bg-surface-subtle transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
