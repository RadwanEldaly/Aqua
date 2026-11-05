import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "error";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    "bg-sky-50 text-brand-primary border-brand-ice/80 font-medium",
  neutral:
    "bg-slate-100 text-slate-700 border-slate-200 font-medium",
  success:
    "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium",
  warning:
    "bg-amber-50 text-amber-800 border-amber-200 font-medium",
  error:
    "bg-rose-50 text-rose-800 border-rose-200 font-medium",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs rounded-full gap-1",
  md: "px-3 py-1 text-xs sm:text-sm rounded-full gap-1.5",
};

export function Badge({
  variant = "neutral",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border font-sans select-none whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
