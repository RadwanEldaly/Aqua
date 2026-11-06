import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function SiteFooter() {
  const locale = useLocale() as "ar" | "en";
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const brandMark = locale === "ar" ? "أكوا" : "AQUA";

  const navLinks = [
    { href: "/" as const, label: tNav("home") },
    { href: "/products" as const, label: tNav("products") },
    { href: "/contact" as const, label: tNav("contact") },
  ];

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-8 sm:pt-12">
      <div className="max-w-7xl mx-auto rounded-panel bg-brand-deep text-white p-8 sm:p-12 lg:p-16 shadow-elevated flex flex-col justify-between gap-10 sm:gap-14">
        {/* Top Section: Oversized Wordmark, Tagline, COD Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-3">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
              {brandMark}
            </span>
            <p className="text-aqua-200/90 text-base sm:text-lg lg:text-xl font-medium max-w-md">
              <bdi>{tCommon("tagline")}</bdi>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/10 text-aqua-100 shadow-subtle">
              <bdi>{tFooter("codNotice")}</bdi>
            </span>
          </div>
        </div>

        {/* Middle Section: Localized Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm sm:text-base font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-aqua-100/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Section: Copyright & Location */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-subtle-accessible/80 border-t border-brand-navy/40">
          <p>
            © {new Date().getFullYear()} {brandMark}. <bdi>{tFooter("rights")}</bdi>
          </p>
          <p>
            {locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}
          </p>
        </div>
      </div>
    </footer>
  );
}
