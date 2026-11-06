import React from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconOnly?: boolean;
  href?: string;
  external?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-marine shadow-subtle border border-transparent",
  secondary:
    "bg-brand-mist text-brand-navy hover:bg-brand-ice active:bg-sky-200 border border-brand-ice/60",
  outline:
    "bg-surface text-brand-deep border border-border hover:border-brand-primary hover:text-brand-primary hover:bg-brand-mist/50 active:bg-brand-ice",
  ghost:
    "bg-transparent text-text-muted hover:bg-surface-muted hover:text-brand-deep active:bg-border border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 min-h-[36px] px-3.5 text-xs font-semibold rounded-full gap-1.5",
  md: "h-11 min-h-[44px] px-5 text-sm font-semibold rounded-full gap-2",
  lg: "h-13 min-h-[52px] px-7 text-base font-semibold rounded-full gap-2.5",
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: "w-9 h-9 min-h-[36px] p-0 rounded-full",
  md: "w-11 h-11 min-h-[44px] p-0 rounded-full",
  lg: "w-13 h-13 min-h-[52px] p-0 rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      iconOnly = false,
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
      console.warn("Accessible button warning: `aria-label` is required for icon-only buttons.");
    }

    const baseClasses = cn(
      "inline-flex items-center justify-center font-sans transition-all duration-200 select-none cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]",
      variantStyles[variant],
      iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
      className
    );

    const content = (
      <>
        {isLoading && (
          <Loader2
            className={cn("animate-spin", size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4")}
            aria-hidden="true"
          />
        )}
        <span className={cn(isLoading && "opacity-80")}>{children}</span>
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
