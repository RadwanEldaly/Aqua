import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Label Component                                                            */
/* -------------------------------------------------------------------------- */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-xs sm:text-sm font-semibold text-text-muted select-none", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-rose-500 ms-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Hint Component                                                             */
/* -------------------------------------------------------------------------- */

export function Hint({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p id={id} className={cn("text-xs text-text-subtle-accessible leading-normal", className)}>
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* FieldError Component                                                       */
/* -------------------------------------------------------------------------- */

export function FieldError({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!children) return null;

  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium text-rose-600 leading-normal",
        className
      )}
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Input Component                                                            */
/* -------------------------------------------------------------------------- */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", error, hint, id, className, dir, ...props }, ref) => {
    // Determine direction: phone, email, url, number, sku force ltr for consistency
    const isLtrType = type === "tel" || type === "email" || type === "url" || type === "number";
    const computedDir = dir || (isLtrType ? "ltr" : undefined);

    const hintId = hint && id ? `${id}-hint` : undefined;
    const errorId = error && id ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <input
          ref={ref}
          id={id}
          type={type}
          dir={computedDir}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "w-full h-11 min-h-[44px] px-3.5 rounded-xl bg-white border font-sans text-sm text-brand-deep placeholder:text-text-subtle-accessible",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary",
            "disabled:bg-surface-muted disabled:text-text-subtle-accessible disabled:cursor-not-allowed",
            error ? "border-rose-400 focus:ring-rose-400" : "border-border",
            isLtrType && "text-start font-mono tracking-wide",
            className
          )}
          {...props}
        />
        {hint && <Hint id={hintId}>{hint}</Hint>}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  }
);
Input.displayName = "Input";

/* -------------------------------------------------------------------------- */
/* Textarea Component                                                         */
/* -------------------------------------------------------------------------- */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, hint, id, className, rows = 3, ...props }, ref) => {
    const hintId = hint && id ? `${id}-hint` : undefined;
    const errorId = error && id ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-xl bg-white border font-sans text-sm text-brand-deep placeholder:text-text-subtle-accessible",
            "transition-colors duration-150 resize-y",
            "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary",
            "disabled:bg-surface-muted disabled:text-text-subtle-accessible disabled:cursor-not-allowed",
            error ? "border-rose-400 focus:ring-rose-400" : "border-border",
            className
          )}
          {...props}
        />
        {hint && <Hint id={hintId}>{hint}</Hint>}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

/* -------------------------------------------------------------------------- */
/* Select Component                                                           */
/* -------------------------------------------------------------------------- */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, hint, id, className, children, ...props }, ref) => {
    const hintId = hint && id ? `${id}-hint` : undefined;
    const errorId = error && id ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              "w-full h-11 min-h-[44px] px-3.5 pe-9 rounded-xl bg-white border font-sans text-sm text-brand-deep appearance-none cursor-pointer",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary",
              "disabled:bg-surface-muted disabled:text-text-subtle-accessible disabled:cursor-not-allowed",
              error ? "border-rose-400 focus:ring-rose-400" : "border-border",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-3 text-text-subtle-accessible">
            <svg
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
            </svg>
          </div>
        </div>
        {hint && <Hint id={hintId}>{hint}</Hint>}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  }
);
Select.displayName = "Select";
