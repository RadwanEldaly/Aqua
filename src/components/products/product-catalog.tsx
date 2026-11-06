"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Check } from "lucide-react";
import {
  type ProvisionalProduct,
  type ProductCategory,
} from "@/data/provisional-products";
import { ProductCard } from "@/components/ui/product-card";
import { AddToCartButton } from "./add-to-cart-button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface ProductCatalogProps {
  products: readonly ProvisionalProduct[];
  categories: readonly ProductCategory[];
  locale: "ar" | "en";
}

export function ProductCatalog({
  products,
  categories,
  locale,
}: ProductCatalogProps) {
  const t = useTranslations("ProductsPage");
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  // Read initial category from query string on mount (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam && categories.some((c) => c.id === categoryParam)) {
      requestAnimationFrame(() => {
        setActiveCategoryId(categoryParam);
      });
    }
  }, [categories]);

  // Handle filter pill selection & keep query string in sync without page navigation
  function handleSelectCategory(catId: string) {
    setActiveCategoryId(catId);
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const newUrl =
        catId === "all" ? pathname : `${pathname}?category=${catId}`;
      window.history.replaceState(null, "", newUrl);
    }
  }

  // Filter products by active category
  const filteredProducts =
    activeCategoryId === "all"
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  const activeCategoryObj = categories.find((c) => c.id === activeCategoryId);
  const activeCategoryLabel = activeCategoryObj?.label[locale] || "";

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Filter Pills Container (Horizontal scroll on mobile with zero page overflow) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border-subtle">
        <div
          role="group"
          aria-label={t("filterGroupAriaLabel")}
          className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar max-w-full"
        >
          {categories.map((cat) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelectCategory(cat.id)}
                className={cn(
                  "min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shrink-0 transition-all duration-150 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                  isSelected
                    ? "bg-brand-primary text-brand-surface shadow-subtle border border-brand-primary"
                    : "bg-brand-surface text-text-subtle-accessible border border-border hover:text-brand-deep hover:border-brand-primary/40 hover:bg-brand-mist/40"
                )}
              >
                {isSelected && (
                  <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                )}
                <span>{cat.label[locale]}</span>
              </button>
            );
          })}
        </div>

        {/* Visible count indicator */}
        <p className="text-xs font-medium text-text-subtle-accessible shrink-0">
          {t("showingCount", {
            count: filteredProducts.length,
            total: products.length,
          })}
        </p>
      </div>

      {/* Polite live region announcing filtered state for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${activeCategoryLabel}: ${t("showingCount", {
          count: filteredProducts.length,
          total: products.length,
        })}`}
      </div>

      {/* 2. Products Responsive Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const productName = product.name[locale];
            const prefilledMessage = t("whatsappPrefill", {
              name: productName,
            });
            const whatsAppHref = buildWhatsAppUrl(prefilledMessage);

            const categoryMatch = categories.find(
              (c) => c.id === product.categoryId
            );
            const categoryLabel = categoryMatch?.label[locale];

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={productName}
                category={categoryLabel}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                imageUrl={product.image.src}
                imageAlt={product.image.alt[locale]}
                imageWidth={product.image.width}
                imageHeight={product.image.height}
                href={`/products/${product.id}`}
                locale={locale}
                priority={index === 0}
                badge={
                  product.badge
                    ? { text: product.badge[locale], variant: "primary" }
                    : undefined
                }
                actions={
                  <div className="flex items-center gap-1.5">
                    <AddToCartButton productId={product.id} locale={locale} size="sm" />
                    {whatsAppHref && (
                      <a
                        href={whatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("inquireAria", { name: productName })}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer shrink-0"
                        title={locale === "ar" ? "طلب عبر واتساب" : "Order via WhatsApp"}
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-brand-surface">
          <p className="text-sm font-medium text-text-subtle-accessible">
            {t("emptyState")}
          </p>
        </div>
      )}
    </div>
  );
}
