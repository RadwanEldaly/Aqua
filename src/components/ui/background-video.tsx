"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Global singleton to guarantee at most ONE video playing on screen at any time
class VideoPlaybackManager {
  private static instance: VideoPlaybackManager;
  private currentActiveVideo: HTMLVideoElement | null = null;

  static getInstance(): VideoPlaybackManager {
    if (!VideoPlaybackManager.instance) {
      VideoPlaybackManager.instance = new VideoPlaybackManager();
    }
    return VideoPlaybackManager.instance;
  }

  requestPlay(video: HTMLVideoElement) {
    if (this.currentActiveVideo && this.currentActiveVideo !== video) {
      this.currentActiveVideo.pause();
    }
    this.currentActiveVideo = video;
    video.play().catch(() => {
      // Autoplay might be restricted; silence error
    });
  }

  release(video: HTMLVideoElement) {
    if (this.currentActiveVideo === video) {
      video.pause();
      this.currentActiveVideo = null;
    }
  }
}

export interface BackgroundVideoProps {
  videoSrc: string;
  posterSrc: string;
  overlayClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundVideo({
  videoSrc,
  posterSrc,
  overlayClassName,
  className,
  children,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check user preference for reduced motion or data saving
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const isSaveData = Boolean(nav.connection?.saveData);

    if (mediaQuery.matches || isSaveData) {
      return;
    }

    // Delay network video loading until window 'load' event has fired
    function onLoad() {
      setCanLoadVideo(true);
    }

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !canLoadVideo) return;

    const manager = VideoPlaybackManager.getInstance();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            manager.requestPlay(video);
          } else {
            manager.release(video);
          }
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      manager.release(video);
    };
  }, [canLoadVideo]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none z-0", className)}
      aria-hidden="true"
    >
      {/* 1. Static WebP Poster (Zero network video, shown under reduced-motion / before load) */}
      <Image
        src={posterSrc}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover w-full h-full"
        aria-hidden="true"
      />

      {/* 2. Optimized Loop Video (Rendered only when network idle + motion allowed) */}
      {canLoadVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 3. Contrast Tint Overlay (Ensures AA/AAA contrast >= 4.5:1 on text across all loop frames) */}
      <div
        className={cn(
          "absolute inset-0 bg-brand-ocean/80 backdrop-brightness-75",
          overlayClassName
        )}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
