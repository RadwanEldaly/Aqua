"use client";

import React, { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Globe, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Skip to Content Component                                                  */
/* -------------------------------------------------------------------------- */

export function SkipToContent({
  targetId = "main-content",
  children = "تخطي إلى المحتوى الرئيسي / Skip to main content",
}: {
  targetId?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50",
        "focus:px-4 focus:py-2.5 focus:bg-brand-primary focus:text-white focus:text-sm focus:font-semibold",
        "focus:rounded-full focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-white"
      )}
    >
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* NavLink Component                                                          */
/* -------------------------------------------------------------------------- */

export interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({
  href,
  isActive = false,
  children,
  className,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative text-sm font-medium transition-colors duration-150 py-1.5 px-3 rounded-full select-none",
        "hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
        isActive
          ? "text-brand-primary font-semibold bg-brand-mist/80"
          : "text-slate-600 hover:bg-slate-100/60",
        className
      )}
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Header Shell Component                                                     */
/* -------------------------------------------------------------------------- */

export interface HeaderShellProps {
  brand: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  mobileTrigger?: React.ReactNode;
  className?: string;
}

export function HeaderShell({
  brand,
  navigation,
  actions,
  mobileTrigger,
  className,
}: HeaderShellProps) {
  return (
    <header className={cn("sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-5 sm:px-7 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-subtle">
        {/* Brand Slot */}
        <div className="flex items-center gap-3 shrink-0">{brand}</div>

        {/* Center Desktop Navigation */}
        {navigation && (
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {navigation}
          </nav>
        )}

        {/* Utility Actions (Language switcher, search, cart trigger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {actions}
          {mobileTrigger && <div className="flex md:hidden">{mobileTrigger}</div>}
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual Language Switcher Component                                         */
/* -------------------------------------------------------------------------- */

export interface LanguageSwitcherProps {
  currentLocale: "ar" | "en";
  targetLabel: string;
  onSwitch: () => void;
  isPending?: boolean;
  className?: string;
}

export function VisualLanguageSwitcher({
  currentLocale,
  targetLabel,
  onSwitch,
  isPending = false,
  className,
}: LanguageSwitcherProps) {
  return (
    <button
      type="button"
      onClick={onSwitch}
      disabled={isPending}
      aria-label={currentLocale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className={cn(
        "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-slate-200 bg-white/90 text-xs font-semibold text-slate-700",
        "transition-colors duration-150 hover:text-brand-primary hover:border-brand-primary/40 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:opacity-50 cursor-pointer",
        className
      )}
    >
      <Globe className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
      <span>{targetLabel}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Drawer Shell Component (Motion for React)                           */
/* -------------------------------------------------------------------------- */

export interface MobileDrawerShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  dir?: "rtl" | "ltr";
}

export function MobileDrawerShell({
  isOpen,
  onClose,
  title,
  children,
  footer,
  dir = "rtl",
}: MobileDrawerShellProps) {
  const asideRef = React.useRef<HTMLElement>(null);

  // Focus trap & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the drawer or close button on open
    const aside = asideRef.current;
    if (aside) {
      const focusables = aside.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && aside) {
        const focusables = aside.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const slideInitial = dir === "rtl" ? { x: "100%" } : { x: "-100%" };
  const slideExit = dir === "rtl" ? { x: "100%" } : { x: "-100%" };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          dir={dir}
          className="fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            ref={asideRef}
            initial={slideInitial}
            animate={{ x: 0 }}
            exit={slideExit}
            transition={{ type: "spring", damping: 25, stiffness: 240 }}
            className="relative w-full max-w-xs sm:max-w-sm h-full bg-white shadow-elevated flex flex-col z-10 me-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <span className="text-base font-bold text-slate-900">{title}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق القائمة / Close drawer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-3">
              {children}
            </div>

            {/* Drawer Footer */}
            {footer && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                {footer}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
