import React from "react";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-16 sm:pb-24 flex-1 flex flex-col gap-10 sm:gap-14 animate-pulse">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* Header Skeleton Panel */}
        <div className="relative w-full rounded-panel bg-brand-navy/60 overflow-hidden shadow-elevated min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32">
          <div className="h-4 w-28 bg-white/20 rounded-full mb-3" />
          <div className="h-10 w-72 bg-white/30 rounded-xl mb-4" />
          <div className="h-5 w-96 bg-white/20 rounded-lg max-w-full" />
        </div>

        {/* Filter Pills Skeleton */}
        <div className="flex gap-2 pb-2 border-b border-border-subtle overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-24 rounded-full bg-surface-muted shrink-0" />
          ))}
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
