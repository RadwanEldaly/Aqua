/**
 * Package / Bundled solutions data model.
 * In accordance with strict ground rules:
 * - PACKAGES remains strictly EMPTY until real client packages are confirmed.
 * - Production routes guard and render nothing when empty.
 */

export interface PackageItem {
  productId: string;
  qty: number;
}

export interface Package {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  items: readonly PackageItem[];
  price?: number;
}

export const PACKAGES: readonly Package[] = [];
