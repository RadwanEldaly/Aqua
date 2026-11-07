import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WaveDivider } from "@/components/ui/brand-patterns";
import { SOCIAL_LINKS, WhatsAppIcon } from "@/components/ui/social-icons";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const locale = useLocale() as "ar" | "en";
  const isAr = locale === "ar";
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const brandMark = isAr ? "أكوا" : "AQUA";

  const navLinks = [
    { href: "/" as const, label: tNav("home") },
    { href: "/products" as const, label: tNav("products") },
    { href: "/checkout" as const, label: isAr ? "إتمام الطلب" : "Checkout" },
    { href: "/contact" as const, label: tNav("contact") },
  ];

  const whatsappUrl = buildWhatsAppUrl(
    isAr
      ? "السلام عليكم، أود الاستفسار عن منتجات وفلاتر المياه."
      : "Hello, I would like to inquire about water filters."
  );

  return (
    <footer className="w-full relative mt-12 sm:mt-16">
      {/* Wave Transition Top Edge */}
      <WaveDivider tone="abyss" position="top" className="relative z-10" />

      <div className="w-full bg-brand-abyss text-white px-4 sm:px-6 lg:px-8 pb-10 pt-4 sm:pt-6">
        <div className="relative max-w-7xl mx-auto flex flex-col justify-between gap-10 sm:gap-14 overflow-hidden">
          {/* Subtle Oversized Architectural Brand Watermark */}
          <div
            aria-hidden="true"
            className="absolute -bottom-6 end-0 text-[110px] sm:text-[170px] lg:text-[220px] font-black text-white/[0.03] select-none pointer-events-none leading-none font-sans"
          >
            {brandMark}
          </div>

          {/* Top Section: Brand Name, Tagline, COD Badge */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
            <div className="flex flex-col gap-3">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-none ltr:tracking-tight">
                {brandMark}
              </span>
              <p className="text-brand-foam/85 text-base sm:text-lg font-medium max-w-md">
                <bdi>{tCommon("tagline")}</bdi>
              </p>
            </div>

            {/* Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? "محادثة عبر واتساب" : "WhatsApp Chat"}</span>
                </a>
              )}

              <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/10 text-brand-foam shadow-subtle border border-white/10">
                <bdi>{tFooter("codNotice")}</bdi>
              </span>
            </div>
          </div>

          {/* Middle Section: Navigation Links & Social Media Icons */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm sm:text-base font-semibold"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-brand-foam/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure rounded-lg px-2 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social Media Links with Official Logos */}
            <div
              className="flex items-center gap-2.5"
              aria-label={isAr ? "منصات التواصل الاجتماعي" : "Social Media Platforms"}
            >
              {SOCIAL_LINKS.map(({ id, label, href, Icon, colorClass }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "w-10 h-10 rounded-full bg-white/10 text-brand-foam/85 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-200 hover:scale-105 shadow-sm",
                    colorClass
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Section: Copyright & Location */}
          <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-brand-foam/70 border-t border-white/10">
            <p>
              © {new Date().getFullYear()} {brandMark}. <bdi>{tFooter("rights")}</bdi>
            </p>
            <p>
              {locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
