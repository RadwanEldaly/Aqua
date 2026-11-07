import React from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "light"
  | "outline"
  | "quiet"
  | "secondary"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconOnly?: boolean;
  withOrbit?: boolean;
  orbitIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-azure text-white hover:bg-brand-azure-hover active:bg-brand-ocean shadow-subtle hover:shadow-card border border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]",
  light:
    "bg-brand-pearl text-brand-abyss hover:bg-white active:bg-brand-foam/80 shadow-subtle hover:shadow-card border border-border-subtle",
  outline:
    "bg-transparent text-brand-deep border border-border hover:border-brand-azure hover:text-brand-azure hover:bg-brand-foam/40 active:bg-brand-foam",
  quiet:
    "bg-transparent text-brand-deep hover:bg-surface-subtle hover:text-brand-azure active:bg-surface-muted border border-transparent",
  secondary:
    "bg-brand-foam text-brand-ocean hover:bg-brand-ice active:bg-sky-200 border border-brand-ice/60",
  ghost:
    "bg-transparent text-text-subtle-accessible hover:bg-surface-muted hover:text-brand-deep active:bg-border border border-transparent",
};

const orbitChipStyles: Record<ButtonVariant, string> = {
  primary: "bg-white/20 text-white group-hover:bg-white/30",
  light: "bg-brand-abyss/10 text-brand-abyss group-hover:bg-brand-abyss/15",
  outline: "bg-brand-azure/10 text-brand-azure group-hover:bg-brand-azure/20",
  quiet: "bg-brand-azure/10 text-brand-azure group-hover:bg-brand-azure/20",
  secondary: "bg-brand-ocean/15 text-brand-ocean group-hover:bg-brand-ocean/20",
  ghost: "bg-brand-abyss/10 text-brand-deep group-hover:bg-brand-abyss/15",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 min-h-[36px] px-3.5 text-xs font-semibold rounded-full gap-2",
  md: "h-11 min-h-[44px] px-5 text-sm font-bold rounded-full gap-2.5",
  lg: "h-13 min-h-[52px] px-7 text-base font-bold rounded-full gap-3",
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: "w-9 h-9 min-h-[36px] p-0 rounded-full",
  md: "w-11 h-11 min-h-[44px] p-0 rounded-full",
  lg: "w-13 h-13 min-h-[52px] p-0 rounded-full",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      iconOnly = false,
      withOrbit = false,
      orbitIcon,
      href,
      external,
      className,
      disabled,
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    if (iconOnly && !ariaLabel) {
      console.warn(
        "Accessible button warning: `aria-label` is required for icon-only buttons."
      );
    }

    const baseClasses = cn(
      "group relative inline-flex items-center justify-center font-sans select-none cursor-pointer overflow-hidden",
      "transition-all duration-200 active:scale-[0.98]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      variantStyles[variant],
      iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
      className
    );

    // Orbit chip icon element
    const chipIconElement = orbitIcon || (
      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
    );

    const content = (
      <>
        {isLoading && (
          <Loader2
            className={cn(
              "animate-spin",
              size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
            )}
            aria-hidden="true"
          />
        )}
        <span className={cn(isLoading && "opacity-80")}>{children}</span>

        {/* Orbit Chip (nudges 4px along inline direction on hover) */}
        {withOrbit && !iconOnly && (
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 ease-out",
              "group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
              size === "sm"
                ? "w-5 h-5 -me-1"
                : size === "lg"
                ? "w-7 h-7 -me-2"
                : "w-6 h-6 -me-1.5",
              orbitChipStyles[variant]
            )}
          >
            {chipIconElement}
          </span>
        )}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
            aria-label={ariaLabel}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          aria-label={ariaLabel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
