"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Check, Search, X } from "lucide-react";
import {
  type ProvisionalProduct,
  type ProductCategory,
} from "@/data/provisional-products";
import { ProductCard } from "@/components/ui/product-card";
import { AddToCartButton } from "./add-to-cart-button";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { FEATURES } from "@/config/features";
import { cn } from "@/lib/utils";

/**
 * Normalizes Arabic text for tolerant search:
 * - Strips tashkeel (diacritics: \u064B-\u065F)
 * - Strips tatweel (\u0640)
 * - Unifies alef forms: [إأآا] -> ا
 * - Unifies ya / alef-maqsura: [ىي] -> ي
 * - Unifies ta-marbuta / ha: [ةه] -> ه
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/\u0640/g, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/[ىي]/g, "ي")
    .replace(/[ةه]/g, "ه")
    .toLowerCase()
    .trim();
}

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
  const tInquire = useTranslations("HomePage.inquireBanner");
  const generalWhatsAppUrl = buildWhatsAppUrl(
    locale === "ar"
      ? "السلام عليكم، أود الاستفسار عن منتج غير معروض."
      : "Hello, I would like to inquire about a product not listed."
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && categories.some((c) => c.id === cat)) return cat;
    return "all";
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input if requested via query parameter (?focus=search)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("focus") === "search" || params.get("q")) {
      searchInputRef.current?.focus();
    }
  }, []);

  // Synchronize category & query with URL without page reload
  const updateUrl = (catId: string, q: string) => {
    if (typeof window === "undefined") return;
    const pathname = window.location.pathname;
    const params = new URLSearchParams();

    if (catId && catId !== "all") {
      params.set("category", catId);
    }
    if (q.trim()) {
      params.set("q", q.trim());
    }

    const queryStr = params.toString();
    const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    updateUrl(catId, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateUrl(activeCategoryId, val);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    updateUrl(activeCategoryId, "");
    searchInputRef.current?.focus();
  };

  // Filter products by category AND search query
  const filteredProducts = products.filter((p) => {
    // 1. Category check
    if (activeCategoryId !== "all" && p.categoryId !== activeCategoryId) {
      return false;
    }

    // 2. Search query check
    if (searchQuery.trim()) {
      const qNorm = normalizeArabic(searchQuery);
      const nameNorm = normalizeArabic(p.name[locale] || "");
      const catObj = categories.find((c) => c.id === p.categoryId);
      const catNorm = normalizeArabic(catObj?.label[locale] || "");

      return nameNorm.includes(qNorm) || catNorm.includes(qNorm);
    }

    return true;
  });

  const activeCategoryObj = categories.find((c) => c.id === activeCategoryId);
  const activeCategoryLabel = activeCategoryObj?.label[locale] || "";

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* 1. Search Bar (Rendered when FEATURES.search is enabled) */}
      {FEATURES.search && (
        <div className="relative w-full max-w-xl">
          <label htmlFor="product-search-input" className="sr-only">
            {t("searchAria")}
          </label>
          <div className="relative flex items-center">
            <Search
              className="w-5 h-5 text-text-subtle-accessible absolute start-4 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              id="product-search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("searchPlaceholder")}
              className="w-full h-12 ps-11 pe-11 rounded-full bg-white border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all shadow-subtle text-brand-deep placeholder:text-text-subtle-accessible"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label={t("clearSearch")}
                className="absolute end-3.5 p-1 rounded-full text-text-subtle-accessible hover:text-brand-deep hover:bg-surface-subtle transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Filter Pills Container (Horizontal scroll on mobile with zero page overflow) */}
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
                    ? "bg-brand-primary text-white shadow-subtle border border-brand-primary"
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

        {/* Visible count indicator with ICU Plural */}
        <p className="text-xs font-medium text-text-subtle-accessible shrink-0">
          {t("showingCount", {
            count: filteredProducts.length,
            total: products.length,
          })}
        </p>
      </div>

      {/* Polite live region announcing filtered state for screen readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {searchQuery
          ? `${t("searchAria")}: ${filteredProducts.length} items found`
          : `${activeCategoryLabel}: ${t("showingCount", {
              count: filteredProducts.length,
              total: products.length,
            })}`}
      </div>

      {/* 3. Products Responsive Grid */}
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
              <React.Fragment key={product.id}>
                <ProductCard
                  id={product.id}
                  name={productName}
                  index={index + 1}
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

                {/* Full-width inquiry banner inserted after row 2 (index === 7) */}
                {index === 7 && generalWhatsAppUrl && (
                  <div className="col-span-full rounded-3xl bg-brand-ocean text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card border border-white/10 my-2">
                    <div className="flex flex-col gap-1 text-center sm:text-start">
                      <h4 className="text-xl sm:text-2xl font-bold">
                        {tInquire("title")}
                      </h4>
                      <p className="text-sm text-brand-foam/85 max-w-lg">
                        {tInquire("desc")}
                      </p>
                    </div>
                    <Button
                      href={generalWhatsAppUrl}
                      external
                      variant="light"
                      size="md"
                      withOrbit
                      className="shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span>{tInquire("action")}</span>
                    </Button>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl border border-dashed border-border bg-white flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-subtle flex items-center justify-center text-text-subtle-accessible">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-text-subtle-accessible max-w-sm">
            {searchQuery ? t("noSearchResults") : t("emptyState")}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover underline cursor-pointer"
            >
              {t("clearSearch")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
