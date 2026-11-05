"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks whether the client has requested reduced motion.
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
