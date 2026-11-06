/**
 * Feature Flags Configuration
 *
 * Controls progressive feature rollout across storefront phases.
 */

export const FEATURES = {
  search: false,
  cart: false,
} as const;

export type FeatureFlag = keyof typeof FEATURES;
