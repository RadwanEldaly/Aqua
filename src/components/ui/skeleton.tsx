import React from "react";
import { cn } from "@/lib/utils";
import { PRODUCT_CARD_IMAGE_ASPECT } from "./product-card";

/* -------------------------------------------------------------------------- */
/* Base Skeleton Primitive                                                    */
/* -------------------------------------------------------------------------- */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const roundedStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({
  rounded = "md",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-surface-muted",
        roundedStyles[rounded],
        className
      )}
      {...props}
    >
      <div className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer-active pointer-events-none" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Specialized Skeleton Primitives                                            */
/* -------------------------------------------------------------------------- */

export function TextSkeleton({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

export function ImageSkeleton({
  aspect = "aspect-square",
  className,
}: {
  aspect?: string;
  className?: string;
}) {
  return (
    <Skeleton
      rounded="none"
      className={cn("w-full bg-surface-muted", aspect, className)}
    />
  );
}

export function PriceSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-2", className)} aria-hidden="true">
      <Skeleton className="h-6 w-20" rounded="md" />
      <Skeleton className="h-4 w-8" rounded="sm" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Composite ProductCardSkeleton (Matches ProductCard bounding box 1:1)       */
/* -------------------------------------------------------------------------- */

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={cn(
        "flex flex-col rounded-panel bg-white shadow-card overflow-hidden",
        className
      )}
    >
      <span className="sr-only">جاري تحميل بيانات المنتج / Loading product data...</span>

      {/* Image Skeleton (Identical aspect ratio) */}
      <ImageSkeleton aspect={PRODUCT_CARD_IMAGE_ASPECT} />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        {/* Category */}
        <div className="h-4 flex items-center">
          <Skeleton className="h-3.5 w-20" rounded="sm" />
        </div>

        {/* Title Lines */}
        <div className="min-h-[48px] flex flex-col justify-center gap-2">
          <Skeleton className="h-4 w-5/6" rounded="sm" />
          <Skeleton className="h-4 w-3/5" rounded="sm" />
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto pt-2 sm:pt-3 flex flex-col gap-2 min-w-0 w-full">
          <PriceSkeleton />
          <Skeleton className="h-11 w-full" rounded="full" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Composite ProductDetailSkeleton                                            */
/* -------------------------------------------------------------------------- */

export function ProductDetailSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full", className)}
    >
      <span className="sr-only">جاري تحميل تفاصيل المنتج / Loading product details...</span>

      {/* Gallery Skeleton */}
      <div className="flex flex-col gap-4">
        <ImageSkeleton aspect="aspect-square" className="rounded-2xl" />
        <div className="grid grid-cols-4 gap-3">
          <Skeleton className="aspect-square" rounded="lg" />
          <Skeleton className="aspect-square" rounded="lg" />
          <Skeleton className="aspect-square" rounded="lg" />
          <Skeleton className="aspect-square" rounded="lg" />
        </div>
      </div>

      {/* Spec & Info Skeleton */}
      <div className="flex flex-col gap-5 justify-center">
        <Skeleton className="h-4 w-28" rounded="sm" />
        <Skeleton className="h-8 w-4/5" rounded="md" />
        <PriceSkeleton className="my-2" />
        <TextSkeleton lines={3} />
        <div className="h-px bg-border-subtle my-2" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" rounded="xl" />
          <Skeleton className="h-12 w-full" rounded="full" />
        </div>
      </div>
    </div>
  );
}
