"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, MessageCircle, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductDetailActionsProps {
  product: Product;
  locale: "ar" | "en";
}

export function ProductDetailActions({ product, locale }: ProductDetailActionsProps) {
  const isAr = locale === "ar";
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappText = isAr
    ? `مرحباً أكوا جارد، أود طلب المنتج التالي:\n- ${product.name.ar} (${quantity}x)\nالسعر: ${product.price * quantity} ر.س\nيرجى تزويدي بتفاصيل التوصيل والتركيب.`
    : `Hello Aqua Guard, I would like to order:\n- ${product.name.en} (${quantity}x)\nPrice: ${product.price * quantity} SAR\nPlease provide delivery and installation details.`;

  const whatsappUrl = buildWhatsAppUrl(whatsappText);

  return (
    <div className="space-y-4 pt-4 border-t border-border-subtle">
      {/* Quantity & Stock row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-text-subtle">
            {isAr ? "الكمية:" : "Quantity:"}
          </span>
          <div className="flex items-center border border-border rounded-xl bg-surface-subtle overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 hover:bg-white text-text-subtle hover:text-brand-deep transition-colors"
              aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1.5 text-sm font-bold text-brand-deep min-w-[36px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 hover:bg-white text-text-subtle hover:text-brand-deep transition-colors"
              aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isAr ? "متوفر في المخزون" : "In Stock"}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(
            "flex items-center justify-center gap-2 py-3.5 px-6 rounded-button font-bold text-base transition-all active:scale-[0.98] shadow-sm",
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-brand-primary hover:bg-brand-primary-hover text-white"
          )}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>{isAr ? "تمت الإضافة للسلة!" : "Added to Cart!"}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>{isAr ? "أضف إلى السلة" : "Add to Cart"}</span>
            </>
          )}
        </button>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{isAr ? "اطلب الآن عبر واتساب" : "Order via WhatsApp"}</span>
          </a>
        )}
      </div>
    </div>
  );
}
