import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional classes and merges conflicting Tailwind classes cleanly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric price into the localized Saudi Riyal display format.
 */
export function formatPrice(price: number, locale: "ar" | "en" = "ar"): string {
  if (locale === "ar") {
    return `${price.toLocaleString("ar-SA")} ر.س`;
  }
  return `${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`;
}
