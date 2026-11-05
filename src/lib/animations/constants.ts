/**
 * Animation Design Tokens and Separation of Concerns Guidelines
 *
 * ARCHITECTURAL SEPARATION OF CONCERNS:
 * 1. GSAP + ScrollTrigger:
 *    - Reserved exclusively for macro scroll animations, parallax sections,
 *      pinned scroll scrubbing, and multi-element timeline sequences.
 *    - Always clean up using `useGSAP` or `gsap.context()`.
 *    - Always check `isReducedMotionPreferred()`.
 *
 * 2. Motion for React:
 *    - Reserved exclusively for micro-interactions, component mount/unmount transitions,
 *      dropdown menus, dialog modals, toast notifications, and interactive button feedback.
 *    - Handled via declarative React state and props.
 *
 * CONFLICT PREVENTION RULE:
 * Never animate the same DOM node's transform/opacity properties using both GSAP and Motion simultaneously.
 */

export const ANIMATION_DURATIONS = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
  cinematic: 1.0,
} as const;

export const ANIMATION_EASINGS = {
  // Smooth cubic bezier curves for fluid water-feel UI transitions
  fluidOut: [0.16, 1, 0.3, 1] as const,
  fluidInOut: [0.65, 0, 0.35, 1] as const,
  springGentle: { type: "spring", damping: 25, stiffness: 200 } as const,
  springSnappy: { type: "spring", damping: 20, stiffness: 300 } as const,
} as const;
