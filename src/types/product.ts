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
 * Filter stage descriptor (e.g., Sediment, Carbon Block, RO Membrane, Post Carbon)
 */
export interface FilterStage {
  stageNumber: number;
  name: LocalizedString;
  function: LocalizedString;
  replacementIntervalMonths?: number;
}

/**
 * Core product definition for water filters, RO devices, and cartridges
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
  category: "ro-systems" | "filter-cartridges" | "accessories" | "shower-filters";
  stagesCount?: number;
  stages?: FilterStage[];
  specs: ProductSpec[];
  inStock: boolean;
  warrantyYears?: number;
  freeInstallationAvailable: boolean;
}
