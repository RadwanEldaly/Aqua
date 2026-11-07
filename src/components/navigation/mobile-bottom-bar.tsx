"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { MessageCircle, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const pathname = usePathname();
  const tHome = useTranslations("HomePage.whatsappBand");
  const { totalCount, items, isMounted } = useCart();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const whatsappUrl = buildWhatsAppUrl(tHome("whatsappPrefill"));
  const hasItems = items.length > 0;
  const isCheckout = pathname.includes("/checkout");

  // Hide when keyboard appears (input/textarea/select focused)
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // Hidden on checkout route or when an input is actively focused
  if (isCheckout || isInputFocused) {
    return null;
  }

  return (
    <aside
      aria-label={isAr ? "شريط الإجراءات السريع" : "Quick action bar"}
      className={cn(
        "fixed bottom-0 inset-x-0 z-40 md:hidden",
        "bg-white/95 backdrop-blur-md border-t border-border-subtle/80 shadow-elevated",
        "pb-[env(safe-area-inset-bottom,0px)]"
      )}
    >
      <div className="flex items-center justify-around h-14 px-3 max-w-lg mx-auto">
        {/* 1. WhatsApp Button (Only shown if configured) */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tHome("chatAria")}
            className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 text-emerald-700 hover:text-emerald-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-bold mt-0.5">
              {isAr ? "واتساب" : "WhatsApp"}
            </span>
          </a>
        )}

        {/* 2. Cart Button with badge */}
        <Link
          href="/cart"
          aria-label={
            isAr
              ? `سلة الطلبات${isMounted && totalCount > 0 ? `، ${totalCount} منتجات` : ""}`
              : `Order Cart${isMounted && totalCount > 0 ? `, ${totalCount} items` : ""}`
          }
          className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 text-brand-navy hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 shrink-0" aria-hidden="true" />
            {isMounted && totalCount > 0 && (
              <span className="absolute -top-1.5 -end-2 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">
            {isAr ? "الطلب" : "Order"}
          </span>
        </Link>

        {/* 3. Checkout Button (Prominent pill, appears when cart has items) */}
        {hasItems ? (
          <Link
            href="/checkout"
            aria-label={isAr ? "متابعة الطلب والدفع" : "Proceed to Checkout"}
            className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs shadow-subtle transition-all cursor-pointer"
          >
            <span>{isAr ? "إتمام الطلب" : "Checkout"}</span>
            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        ) : (
          <Link
            href="/products"
            aria-label={isAr ? "تصفح المنتجات" : "Browse products"}
            className="flex items-center gap-1.5 h-10 px-4 rounded-full border border-border text-brand-deep hover:bg-surface-subtle font-semibold text-xs transition-colors"
          >
            <span>{isAr ? "تصفح المنتجات" : "Products"}</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
