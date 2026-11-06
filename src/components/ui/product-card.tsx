import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import { Badge } from "./badge";

export const PRODUCT_CARD_IMAGE_ASPECT = "aspect-square";

export interface ProductCardProps {
  id: string;
  name: string;
  category?: string;
  price?: number;
  compareAtPrice?: number;
  imageUrl?: string;
  imageAlt?: string;
  badge?: {
    text: string;
    variant?: "primary" | "neutral" | "success" | "warning";
  };
  href?: string;
  locale?: "ar" | "en";
  actions?: React.ReactNode;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  name,
  category,
  price,
  compareAtPrice,
  imageUrl,
  imageAlt,
  badge,
  href,
  locale = "ar",
  actions,
  className,
  priority = false,
}: ProductCardProps) {
  const CardTag = href ? "div" : "article";

  return (
    <CardTag
      className={cn(
        "group relative flex flex-col rounded-2xl bg-brand-surface border border-border",
        "transition-all duration-200 hover:shadow-card hover:border-brand-primary/40 overflow-hidden",
        className
      )}
    >
      {/* Visual Image Container with Pure White Panel (blends opaque JPEG cutouts seamlessly) */}
      <div className={cn("relative w-full overflow-hidden bg-white border-b border-border-subtle/50", PRODUCT_CARD_IMAGE_ASPECT)}>
        {badge && (
          <div className="absolute top-3 start-3 z-10 pointer-events-none">
            <Badge variant={badge.variant || "primary"} size="sm">
              {badge.text}
            </Badge>
          </div>
        )}

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? undefined : "lazy"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-text-subtle-accessible">
            <svg
              className="w-12 h-12 stroke-current"
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

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        {category ? (
          <span className="h-4 text-xs font-medium text-text-subtle-accessible uppercase tracking-wider leading-none">
            {category}
          </span>
        ) : (
          <div className="h-4" aria-hidden="true" />
        )}

        <h3 className="min-h-[48px] text-base font-semibold text-brand-deep leading-6 group-hover:text-brand-primary transition-colors line-clamp-2">
          {href ? (
            <Link href={href} className="focus:outline-none">
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              <bdi>{name}</bdi>
            </Link>
          ) : (
            <bdi>{name}</bdi>
          )}
        </h3>

        {/* Price & Actions Row */}
        <div className="mt-auto pt-2 h-11 flex items-center justify-between border-t border-border-subtle">
          <div>
            {typeof price === "number" && (
              <Price
                amount={price}
                compareAtAmount={compareAtPrice}
                locale={locale}
                size="md"
              />
            )}
          </div>

          {actions ? (
            <div className="relative z-10 shrink-0">{actions}</div>
          ) : (
            <div className="h-9 shrink-0" aria-hidden="true" />
          )}
        </div>
      </div>
    </CardTag>
  );
}
