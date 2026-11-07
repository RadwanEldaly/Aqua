"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { PACKAGES } from "@/data/packages";
import { PROVISIONAL_PRODUCTS } from "@/data/provisional-products";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { ShoppingBag } from "lucide-react";

interface PackagesSectionProps {
  locale: "ar" | "en";
}

export function PackagesSection({ locale }: PackagesSectionProps) {
  const t = useTranslations("HomePage.packages");
  const tCommon = useTranslations("Common");
  const { addItem } = useCart();

  // Strict Guard: Hide completely if PACKAGES is empty
  if (!PACKAGES || PACKAGES.length === 0) {
    return null;
  }

  // Verify all productIds in each package exist in catalog
  const validPackages = PACKAGES.filter((pkg) =>
    pkg.items.every((item) =>
      PROVISIONAL_PRODUCTS.some((p) => p.id === item.productId)
    )
  );

  if (validPackages.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-brand-pearl border-b border-border-subtle [content-visibility:auto] [contain-intrinsic-size:0_650px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="start"
        />

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {validPackages.map((pkg) => {
            const resolvedItems = pkg.items.map((it) => {
              const product = PROVISIONAL_PRODUCTS.find(
                (p) => p.id === it.productId
              )!;
              return { ...it, product };
            });

            // Calculate sum of individual items if every item has a price
            const allItemsHavePrice = resolvedItems.every(
              (it) => typeof it.product.price === "number"
            );
            const sumPrice = allItemsHavePrice
              ? resolvedItems.reduce(
                  (sum, it) => sum + (it.product.price || 0) * it.qty,
                  0
                )
              : undefined;

            const hasSavings =
              typeof pkg.price === "number" &&
              typeof sumPrice === "number" &&
              pkg.price < sumPrice;
            const savings = hasSavings ? sumPrice! - pkg.price! : undefined;

            const handleAddPackage = () => {
              for (const it of resolvedItems) {
                addItem(it.product, it.qty);
              }
            };

            return (
              <article
                key={pkg.id}
                className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-border-subtle flex flex-col justify-between"
              >
                <div>
                  {/* Overlapping Thumbnails */}
                  <div className="flex items-center -space-x-3 rtl:space-x-reverse mb-6">
                    {resolvedItems.slice(0, 4).map((it) => (
                      <div
                        key={it.productId}
                        className="relative w-14 h-14 rounded-2xl bg-white shadow-subtle border-2 border-white overflow-hidden shrink-0"
                      >
                        <Image
                          src={it.product.image.src}
                          alt={it.product.image.alt[locale]}
                          fill
                          sizes="60px"
                          className="object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-brand-deep mb-2">
                    <bdi>{pkg.name[locale]}</bdi>
                  </h3>

                  {/* Savings pill if verified */}
                  {hasSavings && typeof savings === "number" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                      {t("saveBadge", {
                        amount: savings,
                        currency: tCommon("currency"),
                      })}
                    </span>
                  )}

                  {/* Included Items List */}
                  <div className="mt-4 pt-4 border-t border-border-subtle">
                    <p className="text-xs font-bold text-text-subtle-accessible mb-2">
                      {t("includes")}
                    </p>
                    <ul className="flex flex-col gap-1.5 text-xs text-brand-deep">
                      {resolvedItems.map((it) => (
                        <li key={it.productId} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-azure shrink-0" />
                          <span>
                            {t("itemQuantity", {
                              qty: it.qty,
                              name: it.product.name[locale],
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer / Actions */}
                <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between gap-4">
                  {typeof pkg.price === "number" && (
                    <Price
                      amount={pkg.price}
                      compareAtAmount={hasSavings ? sumPrice : undefined}
                      locale={locale}
                      size="md"
                    />
                  )}

                  <Button
                    type="button"
                    onClick={handleAddPackage}
                    variant="primary"
                    size="md"
                    withOrbit
                    className="min-h-[44px]"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t("addPackage")}</span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
