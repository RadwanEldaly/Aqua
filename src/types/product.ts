import type { LocalizedString } from "./locale";

/**
 * Technical specification for a water filtration device or component
 */
export interface ProductSpec {
  id: string;
  label: LocalizedString;
  value: LocalizedString;
}

/**
 * Filter stage descriptor
 */
export interface FilterStage {
  stageNumber: number;
  name: LocalizedString;
  function: LocalizedString;
  replacementIntervalMonths?: number;
}

/**
 * Core product definition for water filtration devices, packages, and cartridges
 */
export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  price: number;
  compareAtPrice?: number;
  currency: "SAR";
  images: string[];
  thumbnailImage: string;
  category: "packages" | "systems" | "dispensers" | "filters" | "accessories";
  badge?: LocalizedString;
  isOffer?: boolean;
  warranty?: LocalizedString;
  features?: LocalizedString[];
  packageIncludes?: LocalizedString[];
  specs: ProductSpec[];
  inStock: boolean;
}
