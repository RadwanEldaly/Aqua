import React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* VisuallyHidden Primitive                                                   */
/* -------------------------------------------------------------------------- */

export function VisuallyHidden({
  as: Component = "span",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "span" | "div" | "p" }) {
  return (
    <Component
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* -------------------------------------------------------------------------- */
/* Stack Primitive                                                            */
/* -------------------------------------------------------------------------- */

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "col" | "row";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

const spacingStyles = {
  xs: "gap-1.5",
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
  xl: "gap-12",
};

const alignStyles = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyStyles = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Stack({
  direction = "col",
  spacing = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        spacingStyles[spacing],
        alignStyles[align],
        justifyStyles[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Grid Primitive                                                             */
/* -------------------------------------------------------------------------- */

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
}

const colStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
};

const gapStyles = {
  sm: "gap-3 sm:gap-4",
  md: "gap-5 sm:gap-6",
  lg: "gap-6 sm:gap-8 lg:gap-10",
};

export function Grid({
  cols = 3,
  gap = "md",
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div className={cn("grid", colStyles[cols], gapStyles[gap], className)} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Divider Primitive                                                          */
/* -------------------------------------------------------------------------- */

export function Divider({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px bg-border self-stretch my-1", className)}
      />
    );
  }

  return (
    <hr
      className={cn("w-full border-0 border-t border-border my-4", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Direction-Safe LabelValue Primitive (Fixes RTL Punctuation Flipping)      */
/* -------------------------------------------------------------------------- */

export interface LabelValueProps {
  label: string;
  value: React.ReactNode;
  dir?: "rtl" | "ltr";
  className?: string;
}

export function LabelValue({
  label,
  value,
  className,
}: LabelValueProps) {
  return (
    <div className={cn("flex items-center justify-between text-xs py-1", className)}>
      <span className="text-text-subtle-accessible font-medium">
        <bdi>{label}:</bdi>
      </span>
      <span className="font-semibold text-brand-deep">
        <bdi>{value}</bdi>
      </span>
    </div>
  );
}
