"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Check } from "lucide-react";
import {
  type ProvisionalProduct,
  type ProductCategory,
} from "@/data/provisional-products";
import { ProductCard } from "@/components/ui/product-card";
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
                {/* Active state not conveyed by color alone: visible check icon indicator */}
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

      {/* 2. Products Responsive Grid (1 col @ 360, 2 col @ 768, 3-4 col @ 1440) */}
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
                imageUrl={product.image.src}
                imageAlt={product.image.alt[locale]}
                locale={locale}
                priority={index === 0}
                actions={
                  whatsAppHref ? (
                    <a
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("inquireAria", { name: productName })}
                      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-brand-primary text-brand-surface text-xs font-semibold hover:bg-brand-primary-hover transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer"
                    >
                      <MessageCircle
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                      <span>{t("inquire")}</span>
                    </a>
                  ) : (
                    // Reserved slot when WhatsApp number is unconfigured: identical height, zero CLS
                    <div className="h-9" aria-hidden="true" />
                  )
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
