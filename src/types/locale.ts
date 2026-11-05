export type Locale = "ar" | "en";

export type Direction = "rtl" | "ltr";

export interface LocalizedString {
  ar: string;
  en: string;
}

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}
