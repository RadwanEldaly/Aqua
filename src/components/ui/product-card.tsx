import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import { Badge } from "./badge";
import { AddToCartButton } from "@/components/products/add-to-cart-button";

export const PRODUCT_CARD_IMAGE_ASPECT = "aspect-square";

export interface ProductCardProps {
  id: string;
  name: string;
  index?: number;
  category?: string;
  price?: number;
  compareAtPrice?: number;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  badge?: {
    text: string;
    variant?: "primary" | "neutral" | "success" | "warning";
  };
  href?: string;
  locale?: "ar" | "en";
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  id,
  name,
  index,
  category,
  price,
  compareAtPrice,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  badge,
  href,
  locale = "ar",
  className,
  priority = false,
}: ProductCardProps) {
  const CardTag = href ? "div" : "article";
  const formattedIndex =
    typeof index === "number" ? String(index).padStart(2, "0") : undefined;

  return (
    <CardTag
      data-product-card="true"
      className={cn(
        "group relative flex flex-col h-full rounded-panel bg-white p-3 sm:p-5 shadow-card border border-border-subtle/80",
        "transition-transform duration-200 hover:-translate-y-1 hover:shadow-hover min-w-0 w-full overflow-hidden",
        className
      )}
    >
      {/* Tonal Inset Image Panel (foam/pearl tint with mix-blend-multiply) */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-brand-pearl mb-3 sm:mb-4 flex items-center justify-center p-2.5 sm:p-4 select-none min-w-0",
          PRODUCT_CARD_IMAGE_ASPECT
        )}
      >
        {/* Optional Badge: max 2 lines, smaller type scale, contained within panel */}
        {badge && (
          <div className="absolute top-2 start-2 max-w-[calc(100%-44px)] z-10 pointer-events-none">
            <Badge
              variant={badge.variant || "primary"}
              size="sm"
              className="text-[10px] sm:text-xs leading-tight line-clamp-2 break-words text-start whitespace-normal py-0.5 px-2"
            >
              {badge.text}
            </Badge>
          </div>
        )}

        {/* Small Top-End Index Numeral */}
        {formattedIndex && (
          <span
            aria-hidden="true"
            className="absolute top-2 end-2 z-10 text-[10px] sm:text-[11px] font-extrabold text-brand-azure/60 font-sans tracking-tight select-none"
          >
            {formattedIndex}
          </span>
        )}

        {/* Product Image: mix-blend-multiply melts pure white JPEG into pearl panel */}
        {imageUrl ? (
          <div
            className="feathered-image-mask relative z-1 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
            style={{
              aspectRatio:
                imageWidth && imageHeight
                  ? `${imageWidth} / ${imageHeight}`
                  : undefined,
              width:
                imageWidth && imageHeight
                  ? imageWidth >= imageHeight
                    ? "100%"
                    : "auto"
                  : "100%",
              height:
                imageWidth && imageHeight
                  ? imageHeight > imageWidth
                    ? "100%"
                    : "auto"
                  : "100%",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt || name}
              fill
              sizes="(max-width: 640px) 384px, (max-width: 1024px) 50vw, 25vw"
              className="object-contain mix-blend-multiply"
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? undefined : "lazy"}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-text-subtle-accessible">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Card Content: all flex children min-w-0 */}
      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 min-w-0 w-full">
        {/* Category Tag */}
        {category ? (
          <span className="text-[10px] sm:text-xs font-semibold text-text-subtle-accessible ltr:uppercase ltr:tracking-wider leading-none truncate min-w-0">
            {category}
          </span>
        ) : (
          <div className="h-2.5 sm:h-3" aria-hidden="true" />
        )}

        {/* Title: clamped to 2 lines, full name in title and alt */}
        <h3
          title={name}
          className="min-h-[38px] sm:min-h-[44px] text-sm sm:text-base font-bold text-brand-deep leading-snug group-hover:text-brand-azure transition-colors line-clamp-2 min-w-0 break-words"
        >
          {href ? (
            <Link href={href} prefetch={false} className="focus:outline-none">
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              <bdi>{name}</bdi>
            </Link>
          ) : (
            <bdi>{name}</bdi>
          )}
        </h3>

        {/* Actions & Price block pinned to bottom with mt-auto */}
        <div className="mt-auto pt-2 sm:pt-3 flex flex-col gap-2 min-w-0 w-full">
          {/* Price block on its own line: current price first; previous price beside it */}
          <div className="min-w-0 w-full min-h-[22px] sm:min-h-[24px] flex items-baseline">
            {typeof price === "number" ? (
              <Price
                amount={price}
                compareAtAmount={compareAtPrice}
                locale={locale}
                size="sm"
                className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0"
              />
            ) : (
              <div className="h-5 sm:h-6" aria-hidden="true" />
            )}
          </div>

          {/* Full-width add button (min-height 44px) */}
          <div className="relative z-10 min-w-0 w-full">
            <AddToCartButton
              productId={id}
              locale={locale}
              className="w-full min-h-[44px]"
            />
          </div>
        </div>
      </div>
    </CardTag>
  );
}
