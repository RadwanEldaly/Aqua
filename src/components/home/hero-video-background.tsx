"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Single Desktop-Only Hero Video Background.
 *
 * Strict Mounting Rules:
 * - Does not exist in SSR / initial HTML / initial hydration.
 * - Created ONLY if:
 *     1. matchMedia("(min-width: 1024px) and (hover: hover)")
 *     2. prefers-reduced-motion is not "reduce"
 *     3. navigator.connection?.saveData is not true and effectiveType is "4g" or undefined
 *     4. window "load" event has already fired, then requestIdleCallback (timeout: 3000ms) has run
 *     5. hero section is in the viewport (IntersectionObserver)
 * - Pauses when hero leaves viewport or tab is hidden (visibilitychange).
 * - Zero backdrop-filter: uses solid tinted overlay token passing AA on brightest frame.
 */
export function HeroVideoBackground() {
  const [shouldMount, setShouldMount] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Desktop & Hover check
    const isDesktopHover = window.matchMedia(
      "(min-width: 1024px) and (hover: hover)"
    ).matches;
    if (!isDesktopHover) return;

    // 2. Prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // 3. Network connection check
    const conn = (
      navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType && conn.effectiveType !== "4g") return;

    // 4. Window load event + requestIdleCallback (timeout 3000ms)
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const onIdle = () => {
      // 5. Hero in viewport check
      if (!containerRef.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setShouldMount(true);
              observer.disconnect();
              break;
            }
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    };

    const scheduleAfterLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(onIdle, { timeout: 3000 });
      } else {
        timeoutHandle = setTimeout(onIdle, 1000);
      }
    };

    if (document.readyState === "complete") {
      scheduleAfterLoad();
    } else {
      window.addEventListener("load", scheduleAfterLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleAfterLoad);
      if (idleHandle && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, []);

  // Playback control: Pause when hero leaves viewport or tab is hidden
  useEffect(() => {
    if (!shouldMount) return;
    const video = videoRef.current;
    if (!video) return;

    let inViewport = true;

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (inViewport) {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inViewport = entry.isIntersecting;
          if (inViewport && !document.hidden) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [shouldMount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Static Poster WebP (<40 KB): visible immediately on all viewports */}
      <Image
        src="/video/hero-ripples-poster.webp"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 1280px"
        className="object-cover"
        loading="lazy"
      />

      {/* Video element created ONLY when all conditions match */}
      {shouldMount && (
        <video
          ref={videoRef}
          src="/video/hero-ripples.mp4"
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}

      {/* Solid Tinted Overlay Token: Contrast > 11:1 (AAA) over brightest frame, NO backdrop-filter */}
      <div className="absolute inset-0 bg-brand-abyss/85" />
    </div>
  );
}
