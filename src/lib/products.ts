import type { Product } from "@/types/product";

/**
 * Product Data Access Layer (Repository Foundation)
 *
 * In Phase 1, products are limited and fixed.
 * Real product items and specifications will be registered during the UI content mapping phase.
 * This abstraction enables switching from fixed static definitions to an external DB/CMS
 * in the future without modifying consumer components.
 */

export async function getProducts(): Promise<Product[]> {
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
