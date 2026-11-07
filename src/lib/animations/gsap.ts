"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // High-performance GSAP ScrollTrigger configuration
  ScrollTrigger.config({
    // Prevents jerky recalculations when mobile address bar hides/shows
    ignoreMobileResize: true,
    // Ensure accurate position measurements
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
}

/**
 * Checks whether the client has requested reduced motion.
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Standardized easing & performance defaults for scroll-triggered animations.
 * Provides a fluid, premium water-feel without layout shifts.
 */
export const SCROLL_REVEAL_DEFAULTS = {
  ease: "power2.out",
  duration: 0.65,
  yOffset: 32,
  stagger: 0.08,
  start: "top 85%",
} as const;

/**
 * Creates a ScrollTrigger configuration that automatically disables or minimizes
 * scrubbing when reduced motion is preferred by the user.
 */
export function createSafeScrollTrigger(
  vars: ScrollTrigger.Vars
): ScrollTrigger.Vars {
  if (isReducedMotionPreferred()) {
    return {
      ...vars,
      scrub: false,
      toggleActions: "none none none none",
    };
  }
  return vars;
}

export { gsap, ScrollTrigger };
