import React from "react";
import { cn } from "@/lib/utils";

export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  compareAtAmount?: number;
  currency?: "SAR";
  locale?: "ar" | "en";
  useWesternDigits?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base font-semibold",
  lg: "text-lg md:text-xl font-bold",
  xl: "text-2xl md:text-3xl font-extrabold tracking-tight",
};

/**
 * Formats SAR price according to target locale and digit preferences.
 */
function formatCurrency(
  value: number,
  locale: "ar" | "en",
  useWesternDigits: boolean
): { formattedNumber: string; currencySymbol: string } {
  const numberLocale = useWesternDigits ? "en-US" : locale === "ar" ? "ar-SA" : "en-US";
  const formattedNumber = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

  const currencySymbol = locale === "ar" ? "ر.س" : "SAR";

  return { formattedNumber, currencySymbol };
}

export function Price({
  amount,
  compareAtAmount,
  locale = "ar",
  useWesternDigits = true,
  size = "md",
  className,
  ...props
}: PriceProps) {
  const isDiscounted = typeof compareAtAmount === "number" && compareAtAmount > amount;
  const current = formatCurrency(amount, locale, useWesternDigits);
  const original = isDiscounted
    ? formatCurrency(compareAtAmount, locale, useWesternDigits)
    : null;

  return (
    <div
      className={cn("inline-flex items-baseline gap-2 tabular-nums font-sans", className)}
      {...props}
    >
      {/* Current Active Price */}
      <span className={cn("text-slate-900 flex items-baseline gap-1", sizeStyles[size])}>
        <span className="font-bold">{current.formattedNumber}</span>
        <span className="text-xs font-medium text-slate-500 uppercase">{current.currencySymbol}</span>
      </span>

      {/* Compare-at / Original Price (if discounted) */}
      {isDiscounted && original && (
        <span className="inline-flex items-baseline gap-1 text-xs sm:text-sm text-slate-400 line-through">
          <span className="sr-only">
            {locale === "ar" ? "السعر الأصلي قبل الخصم:" : "Original price before discount:"}
          </span>
          <span>{original.formattedNumber}</span>
          <span className="text-[10px]">{original.currencySymbol}</span>
        </span>
      )}
    </div>
  );
}
