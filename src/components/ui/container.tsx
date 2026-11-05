import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
  size?: "sm" | "md" | "lg" | "full";
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  as: Component = "div",
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "aside";
  spacing?: "sm" | "md" | "lg" | "none";
}

const spacingStyles = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-14 md:py-20",
  lg: "py-20 md:py-28 lg:py-32",
};

export function Section({
  as: Component = "section",
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn("w-full relative", spacingStyles[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
