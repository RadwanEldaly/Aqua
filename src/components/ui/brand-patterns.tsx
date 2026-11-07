import React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* 1. Ripple Rings (Concentric water ripples background mark)                */
/* -------------------------------------------------------------------------- */

export interface RippleRingsProps {
  className?: string;
  variant?: "light" | "dark" | "champagne";
  animate?: boolean;
}

export function RippleRings({
  className,
  variant = "light",
  animate = false,
}: RippleRingsProps) {
  const strokeColor =
    variant === "dark"
      ? "text-brand-ocean/40"
      : variant === "champagne"
      ? "text-brand-champagne/35"
      : "text-brand-foam/80";

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none",
        strokeColor,
        animate && "animate-ripple-pulse",
        className
      )}
    >
      <circle
        cx="200"
        cy="200"
        r="60"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="4 2"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="200"
        r="110"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle
        cx="200"
        cy="200"
        r="155"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="200"
        r="195"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.2"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Wave Divider (Organic water wave transition edge)                      */
/* -------------------------------------------------------------------------- */

export interface WaveDividerProps {
  className?: string;
  position?: "top" | "bottom";
  tone?: "abyss" | "ocean" | "canvas" | "pearl" | "white";
}

export function WaveDivider({
  className,
  position = "top",
  tone = "abyss",
}: WaveDividerProps) {
  const fillClass =
    tone === "abyss"
      ? "fill-brand-abyss"
      : tone === "ocean"
      ? "fill-brand-ocean"
      : tone === "pearl"
      ? "fill-brand-pearl"
      : tone === "canvas"
      ? "fill-canvas"
      : "fill-white";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full overflow-hidden leading-none pointer-events-none select-none",
        position === "bottom" && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className={cn("w-full h-8 sm:h-12 block", fillClass)}
      >
        <path d="M0,24 C280,48 520,8 800,28 C1080,48 1280,12 1440,24 L1440,48 L0,48 Z" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Droplet Glyph (Minimalist water droplet for eyebrows & bullets)        */
/* -------------------------------------------------------------------------- */

export interface DropletGlyphProps {
  className?: string;
}

export function DropletGlyph({ className }: DropletGlyphProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 shrink-0 inline-block align-middle", className)}
    >
      <path d="M8 1.5C8 1.5 3 7.2 3 10.5C3 13.26 5.24 15.5 8 15.5C10.76 15.5 13 13.26 13 10.5C13 7.2 8 1.5 8 1.5Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Display Numeral (Large metallic numeral on dark panels)                 */
/* -------------------------------------------------------------------------- */

export interface DisplayNumeralProps {
  number: string | number;
  className?: string;
  tone?: "champagne" | "azure" | "muted";
}

export function DisplayNumeral({
  number,
  className,
  tone = "champagne",
}: DisplayNumeralProps) {
  const formatted =
    typeof number === "number" ? String(number).padStart(2, "0") : number;

  const toneClass =
    tone === "champagne"
      ? "text-brand-champagne/90"
      : tone === "azure"
      ? "text-brand-azure"
      : "text-text-subtle-accessible";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-sans font-extrabold tracking-tight select-none",
        toneClass,
        className
      )}
    >
      {formatted}
    </span>
  );
}
