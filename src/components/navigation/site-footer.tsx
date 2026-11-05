import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  const locale = useLocale() as "ar" | "en";
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const brandMark = locale === "ar" ? "أكوا" : "AQUA";

  const navLinks = [
    { href: "/" as const, label: tNav("home") },
    { href: "/products" as const, label: tNav("products") },
    { href: "/about" as const, label: tNav("about") },
    { href: "/contact" as const, label: tNav("contact") },
  ];

  return (
    <footer className="bg-brand-deep text-brand-surface py-12 sm:py-16 border-t border-brand-navy/60">
      <Container size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-brand-navy/50">
          {/* Brand & COD Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
            <span className="text-2xl font-extrabold text-brand-surface leading-[1.3] ltr:tracking-tight">
              {brandMark}
            </span>
            <span className="hidden sm:inline-block w-px h-5 bg-brand-navy" aria-hidden="true" />
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-navy text-aqua-200 border border-brand-navy/80">
              <bdi>{tFooter("codNotice")}</bdi>
            </span>
          </div>

          {/* Localized Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-subtle-accessible hover:text-brand-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md px-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-subtle-accessible">
          <p>
            © {new Date().getFullYear()} {brandMark}. <bdi>{tFooter("rights")}</bdi>
          </p>
          <p>
            {locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}
          </p>
        </div>
      </Container>
    </footer>
  );
}
