"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu } from "lucide-react";
import {
  HeaderShell,
  MobileDrawerShell,
  NavLink,
} from "@/components/ui/navigation";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { SearchTrigger } from "./search-trigger";
import { CartTrigger } from "./cart-trigger";

export function SiteHeader() {
  const locale = useLocale() as "ar" | "en";
  const pathname = usePathname();
  const tNav = useTranslations("Navigation");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const brandMark = locale === "ar" ? "أكوا" : "AQUA";

  const navLinks = [
    { href: "/" as const, label: tNav("home") },
    { href: "/products" as const, label: tNav("products") },
    { href: "/contact" as const, label: tNav("contact") },
  ];

  return (
    <>
      <HeaderShell
        brand={
          <Link
            href="/"
            aria-label={brandMark}
            className="text-2xl sm:text-3xl font-bold text-brand-deep hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg px-1 leading-none ltr:tracking-tight"
          >
            <span>{brandMark}</span>
          </Link>
        }
        navigation={
          <>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <NavLink key={link.href} href={link.href} isActive={isActive}>
                  {link.label}
                </NavLink>
              );
            })}
          </>
        }
        actions={
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <SearchTrigger />
            <CartTrigger />
            <LanguageSwitcher />
          </div>
        }
        mobileTrigger={
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={locale === "ar" ? "فتح القائمة الرئيسية" : "Open main menu"}
            className="w-10 h-10 rounded-full flex items-center justify-center text-brand-navy hover:text-brand-primary hover:bg-brand-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        }
      />

      <MobileDrawerShell
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={brandMark}
        dir={locale === "ar" ? "rtl" : "ltr"}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-subtle-accessible font-medium">
              {locale === "ar" ? "تغيير اللغة" : "Switch Language"}
            </span>
            <LanguageSwitcher />
          </div>
        }
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`px-4 py-3 rounded-2xl text-base font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                  isActive
                    ? "bg-brand-mist text-brand-primary shadow-subtle"
                    : "text-brand-navy hover:text-brand-primary hover:bg-brand-mist/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </MobileDrawerShell>
    </>
  );
}
