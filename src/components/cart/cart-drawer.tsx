"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const {
    items,
    isOpen,
    totalCount,
    subtotal,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Build WhatsApp pre-filled order string
  const itemsText = items
    .map((item) => `- ${item.product.name[isAr ? "ar" : "en"]} (${item.quantity}x) : ${item.product.price * item.quantity} ر.س`)
    .join("\n");
  const whatsappMsg = isAr
    ? `مرحباً أكوا جارد، أود طلب السلة التالية:\n\n${itemsText}\n\nالإجمالي: ${subtotal} ر.س\nالدفع عند الاستلام مع التوصيل والتركيب المجاني.`
    : `Hello Aqua Guard, I would like to order the following cart:\n\n${itemsText}\n\nTotal: ${subtotal} SAR\nPayment on delivery with free installation.`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMsg);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-deep/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex">
        <div
          className={cn(
            "w-screen max-w-md bg-white shadow-elevated flex flex-col transform transition ease-in-out duration-300",
            "animate-in slide-in-from-right rtl:slide-in-from-left"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle bg-surface-subtle">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-brand-deep">
                  {isAr ? "سلة المشتريات" : "Shopping Cart"}
                </h2>
                <p className="text-xs text-text-subtle">
                  {isAr
                    ? `${totalCount} ${totalCount === 1 ? "منتج" : totalCount === 2 ? "منتجين" : "منتجات"}`
                    : `${totalCount} ${totalCount === 1 ? "item" : "items"}`}
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-full text-text-subtle hover:text-brand-deep hover:bg-black/5 transition-colors"
              aria-label={isAr ? "إغلاق السلة" : "Close cart"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border-subtle">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-surface-subtle flex items-center justify-center text-text-subtle-accessible mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-brand-deep mb-2">
                  {isAr ? "سلة المشتريات فارغة" : "Your cart is empty"}
                </h3>
                <p className="text-sm text-text-subtle max-w-xs mb-6">
                  {isAr
                    ? "تصفح أحدث العروض وبكجات التحلية واختر ما يناسب منزلك"
                    : "Explore our latest offers and purification systems for your home"}
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors"
                >
                  <span>{isAr ? "تصفح المنتجات والعروض" : "Browse Products"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl bg-surface-subtle shrink-0 p-2 overflow-hidden flex items-center justify-center">
                    <Image
                      src={item.product.thumbnailImage}
                      alt={item.product.name[isAr ? "ar" : "en"]}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-brand-deep truncate mb-1">
                      {item.product.name[isAr ? "ar" : "en"]}
                    </h4>
                    <div className="text-sm font-semibold text-brand-primary mb-2">
                      {item.product.price} {isAr ? "ر.س" : "SAR"}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-border-subtle rounded-lg bg-surface-subtle overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-white text-text-subtle hover:text-brand-deep transition-colors"
                          aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-brand-deep min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-white text-text-subtle hover:text-brand-deep transition-colors"
                          aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 rounded-lg text-text-subtle-accessible hover:text-red-600 hover:bg-red-50 transition-colors ms-auto"
                        aria-label={isAr ? "حذف المنتج" : "Remove item"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border-subtle bg-surface-subtle space-y-4">
              {/* Shipping Highlight */}
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="font-semibold">
                  {isAr ? "🚚 التوصيل والتركيب المنزلي:" : "🚚 Delivery & Installation:"}
                </span>
                <span className="font-bold">{isAr ? "مجاني 100%" : "Free 100%"}</span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-text-subtle">
                  {isAr ? "المجموع الفرعي:" : "Subtotal:"}
                </span>
                <span className="text-xl font-bold text-brand-deep">
                  {subtotal} {isAr ? "ر.س" : "SAR"}
                </span>
              </div>

              {/* Checkout Action Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-button bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base shadow-sm transition-all active:scale-[0.98]"
              >
                <span>{isAr ? "متابعة الطلب والدفع" : "Proceed to Checkout"}</span>
                {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </Link>

              {/* Quick WhatsApp Checkout */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "طلب مباشر عبر واتساب" : "Direct WhatsApp Order"}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
