/**
 * Single source of truth for product data, mapped directly to real catalog.
 */
import {
  CATALOG_PRODUCTS,
  CATALOG_CATEGORIES,
} from "./catalog";

export interface ProductCategory {
  id: string;
  label: {
    ar: string;
    en: string;
  };
}

export interface ProvisionalProduct {
  id: string;
  categoryId: string;
  name: {
    ar: string;
    en: string;
  };
  price?: number;
  compareAtPrice?: number;
  badge?: {
    ar: string;
    en: string;
  };
  image: {
    src: string;
    width: number;
    height: number;
    alt: {
      ar: string;
      en: string;
    };
  };
}

export const PROVISIONAL_CATEGORIES: readonly ProductCategory[] = CATALOG_CATEGORIES.map(
  (c) => ({
    id: c.id,
    label: c.label,
  })
);

export const PROVISIONAL_PRODUCTS: readonly ProvisionalProduct[] = CATALOG_PRODUCTS.map(
  (p) => ({
    id: p.id,
    categoryId: p.category,
    name: p.name,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    badge: p.badge,
    image: {
      src: p.thumbnailImage,
      width: 800,
      height: 800,
      alt: p.name,
    },
  })
);
