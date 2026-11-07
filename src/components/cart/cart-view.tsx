"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

interface CartViewProps {
  locale: "ar" | "en";
}

export function CartView({ locale }: CartViewProps) {
  const t = useTranslations("CartPage");
  const isAr = locale === "ar";
  const {
    items,
    totalCount,
    totalPrice,
    hasPriceForAll,
    setQuantity,
    removeItem,
    clear,
    isMounted,
  } = useCart();

  // Loading skeleton state before hydration
  if (!isMounted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 animate-pulse space-y-6">
        <div className="h-8 w-48 bg-surface-subtle rounded-xl" />
        <div className="h-32 bg-white rounded-3xl" />
        <div className="h-32 bg-white rounded-3xl" />
      </div>
    );
  }

  // Empty State
  if (items.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 sm:py-24 text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-mist flex items-center justify-center text-brand-primary">
          <svg
            className="w-10 h-10 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-brand-deep">{t("emptyTitle")}</h2>
          <p className="text-sm text-text-subtle-accessible max-w-md">
            {t("emptyDescription")}
          </p>
        </div>
        <Button href="/products" variant="primary" size="lg" className="rounded-full px-8">
          {t("browseProducts")}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 flex flex-col gap-8">
      {/* Header controls: Item count & Clear cart */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
        <span className="text-sm font-semibold text-text-subtle-accessible">
          {isAr
            ? `${totalCount} منتجات في السلة`
            : `${totalCount} items in order`}
        </span>
        <button
          type="button"
          onClick={clear}
          aria-label={t("clearConfirmAria")}
          className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
          <span>{t("clearAction")}</span>
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-4" role="list">
        {items.map((item) => {
          const product = item.product;
          const name = product.name[locale];

          return (
            <div
              key={product.id}
              role="listitem"
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white shadow-card border border-border-subtle/80"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="relative w-20 h-20 rounded-2xl bg-surface-subtle overflow-hidden shrink-0 flex items-center justify-center p-2">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt[locale]}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-brand-deep leading-snug line-clamp-2">
                    <bdi>{name}</bdi>
                  </h3>
                  {typeof product.price === "number" && (
                    <div className="mt-0.5">
                      <Price amount={product.price} locale={locale} size="sm" />
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Stepper (44px target) & Remove Button */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle">
                <div
                  className="flex items-center border border-border rounded-full bg-surface-subtle p-1"
                  role="group"
                  aria-label={t("quantityLabel")}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(product.id, item.quantity - 1)}
                    aria-label={t("decreaseAria", { name })}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer shrink-0"
                  >
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <span
                    className="w-9 text-center font-bold text-sm text-brand-deep select-none"
                    aria-live="polite"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(product.id, item.quantity + 1)}
                    aria-label={t("increaseAria", { name })}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  aria-label={t("removeAria", { name })}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-text-subtle-accessible hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary & Proceed to Checkout */}
      <div className="p-6 rounded-3xl bg-surface-subtle border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
        <div>
          {hasPriceForAll && typeof totalPrice === "number" ? (
            <div className="flex items-baseline gap-3">
              <span className="text-base font-bold text-brand-deep">
                {t("totalLabel")}:
              </span>
              <Price amount={totalPrice} locale={locale} size="lg" />
            </div>
          ) : (
            <span className="text-sm font-semibold text-text-subtle-accessible">
              {isAr ? "الدفع عند الاستلام" : "Payment on delivery"}
            </span>
          )}
        </div>

        <Button
          href="/checkout"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto min-w-[220px] rounded-full inline-flex items-center justify-center gap-2"
        >
          <span>{t("proceedToCheckout")}</span>
          {isAr ? (
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  );
}
