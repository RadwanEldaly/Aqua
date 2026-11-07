"use client";

import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  isReducedMotionPreferred,
  SCROLL_REVEAL_DEFAULTS,
} from "@/lib/animations/gsap";

/**
 * Re-exporting useGSAP from @gsap/react with pre-configured GSAP registration.
 * Provides automatic context cleanup on React component unmount, preventing memory
 * leaks in Next.js App Router client components.
 */
export {
  useGSAP,
  gsap,
  ScrollTrigger,
  isReducedMotionPreferred,
  SCROLL_REVEAL_DEFAULTS,
};
