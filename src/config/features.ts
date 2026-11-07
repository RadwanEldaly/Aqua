/**
 * Feature Flags Configuration
 *
 * Controls progressive feature rollout across storefront phases.
 */

export const FEATURES = {
  search: true,
  cart: true,
} as const;

export type FeatureFlag = keyof typeof FEATURES;
