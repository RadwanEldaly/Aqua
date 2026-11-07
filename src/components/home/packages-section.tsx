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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 bg-brand-pearl border-b border-border-subtle [content-visibility:auto] [contain-intrinsic-size:0_650px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="start"
        />

        {/* Packages Cards Grid: 2 columns (<640px, 12px gap), 3 columns (>=1024px) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
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
                data-product-card="true"
                className="relative rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-8 shadow-card border border-border-subtle flex flex-col justify-between min-w-0 w-full"
              >
                <div className="min-w-0 w-full">
                  {/* Cinematic Video Showcase for Al-Aman Package */}
                  {pkg.id === "package-alaman" && (
                    <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-subtle bg-brand-abyss select-none">
                      <Image
                        src="/video/alaman-package-poster.webp"
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        loading="lazy"
                        className="object-cover"
                        aria-hidden="true"
                      />
                      <video
                        autoPlay
                        playsInline
                        loop
                        muted
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover"
                        aria-hidden="true"
                      >
                        <source src="/video/alaman-package-commercial.mp4" type="video/mp4" />
                      </video>
                      <span className="absolute top-2 start-2 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary/90 text-white shadow-sm">
                        {locale === "ar" ? "معاينة البكج" : "Bundle Preview"}
                      </span>
                    </div>
                  )}

                  {/* Overlapping Thumbnails */}
                  <div className="flex items-center -space-x-2 sm:-space-x-3 rtl:space-x-reverse mb-3 sm:mb-6 min-w-0">
                    {resolvedItems.slice(0, 4).map((it) => (
                      <div
                        key={it.productId}
                        className="relative w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white shadow-subtle border border-white sm:border-2 overflow-hidden shrink-0"
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

                  <h3 className="text-sm sm:text-xl font-bold text-brand-deep mb-2 line-clamp-2 min-w-0 break-words">
                    <bdi>{pkg.name[locale]}</bdi>
                  </h3>

                  {/* Savings pill if verified */}
                  {hasSavings && typeof savings === "number" && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3 sm:mb-4 truncate">
                      {t("saveBadge", {
                        amount: savings,
                        currency: tCommon("currency"),
                      })}
                    </span>
                  )}

                  {/* Included Items List (dropped on mobile for compact 2-col presentation) */}
                  <div className="mt-4 pt-4 border-t border-border-subtle hidden sm:block min-w-0">
                    <p className="text-xs font-bold text-text-subtle-accessible mb-2">
                      {t("includes")}
                    </p>
                    <ul className="flex flex-col gap-1.5 text-xs text-brand-deep">
                      {resolvedItems.map((it) => (
                        <li key={it.productId} className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-azure shrink-0" />
                          <span className="truncate">
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

                {/* Footer / Actions: Price on its own line, add button below full width */}
                <div className="mt-auto pt-3 sm:pt-4 border-t border-border-subtle flex flex-col gap-2 min-w-0 w-full">
                  {typeof pkg.price === "number" && (
                    <div className="min-w-0 w-full min-h-[22px] sm:min-h-[24px] flex items-baseline">
                      <Price
                        amount={pkg.price}
                        compareAtAmount={hasSavings ? sumPrice : undefined}
                        locale={locale}
                        size="sm"
                        className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0"
                      />
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleAddPackage}
                    variant="primary"
                    size="md"
                    withOrbit
                    className="w-full min-h-[44px] text-xs sm:text-sm px-2 py-2"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="sm:hidden">{locale === "ar" ? "أضف" : "Add"}</span>
                      <span className="hidden sm:inline">{t("addPackage")}</span>
                    </span>
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
