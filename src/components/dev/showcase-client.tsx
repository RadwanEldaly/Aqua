"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Price,
  Container,
  Section,
  SectionHeading,
  ProductCard,
  HeaderShell,
  NavLink,
  MobileDrawerShell,
  VisualLanguageSwitcher,
  ProductCardSkeleton,
} from "@/components/ui";
import {
  RippleRings,
  WaveDivider,
  DropletGlyph,
  DisplayNumeral,
} from "@/components/ui/brand-patterns";
import {
  PLACEHOLDER_CARD_DATA,
  PLACEHOLDER_NAV_ITEMS,
  SWATCH_FAMILIES,
} from "@/dev/fixtures/products";
import {
  PLACEHOLDER_OFFER_PRODUCTS,
  PLACEHOLDER_PACKAGES,
} from "@/dev/fixtures";
import { PROVISIONAL_PRODUCTS } from "@/data/provisional-products";
import { cn } from "@/lib/utils";
import { Menu, Search, ShoppingBag, ArrowRight } from "lucide-react";

export function ShowcaseClient({ locale }: { locale: "ar" | "en" }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-canvas text-brand-deep pb-24 font-sans">
      {/* 1. Header Shell Demonstration */}
      <div className="bg-brand-surface border-b border-border-subtle py-2 px-4 text-center text-xs font-mono text-text-subtle-accessible">
        {isRtl
          ? "[عينة تجريبية لمكون HeaderShell في نظام التصميم — ترويسة العرض المعزولة]"
          : "[Design System Component Specimen: HeaderShell — Isolated Demo Specimen]"}
      </div>
      <HeaderShell
        brand={
          <span className="font-bold text-sm ltr:tracking-tight text-brand-deep select-none">
            أكوا (AQUA PLACEHOLDER)
          </span>
        }
        navigation={
          <>
            {PLACEHOLDER_NAV_ITEMS.map((item, idx) => (
              <NavLink key={idx} href={item.href} isActive={idx === 0}>
                {item.label[locale]}
              </NavLink>
            ))}
          </>
        }
        actions={
          <>
            <VisualLanguageSwitcher
              currentLocale={locale}
              targetLabel={isRtl ? "English" : "العربية"}
              onSwitch={() => {
                window.location.href = isRtl ? "/en/dev/showcase" : "/dev/showcase";
              }}
            />
            <Button variant="quiet" size="sm" iconOnly aria-label="Search">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="quiet" size="sm" iconOnly aria-label="Cart">
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </>
        }
        mobileTrigger={
          <Button
            variant="quiet"
            size="sm"
            iconOnly
            aria-label="Open Menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        }
      />

      {/* Mobile Drawer Shell Test */}
      <MobileDrawerShell
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={isRtl ? "قائمة التصفح (PLACEHOLDER)" : "Navigation (PLACEHOLDER)"}
        dir={isRtl ? "rtl" : "ltr"}
        footer={
          <div className="text-xs text-text-subtle-accessible text-center">
            {isRtl ? "أكوا (AQUA PLACEHOLDER)" : "Aqua (AQUA PLACEHOLDER)"}
          </div>
        }
      >
        {PLACEHOLDER_NAV_ITEMS.map((item, idx) => (
          <NavLink
            key={idx}
            href={item.href}
            isActive={idx === 0}
            onClick={() => setIsDrawerOpen(false)}
          >
            {item.label[locale]}
          </NavLink>
        ))}
      </MobileDrawerShell>

      <Container className="pt-10 flex flex-col gap-16">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>
            <strong>DEV-ONLY SHOWCASE:</strong> This page is strictly for testing design tokens, RTL/LTR
            symmetry, and components. Excluded in production via <code>notFound()</code>.
          </span>
          <span className="font-mono bg-amber-100 px-2 py-0.5 rounded ltr:uppercase font-bold shrink-0">
            Locale: {locale} ({isRtl ? "RTL" : "LTR"})
          </span>
        </div>

        {/* 2. Brand Patterns & Motifs Showcase */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Patterns / أنماط العلامة"
            title={isRtl ? "أنماط العلامة التجارية المائية" : "Brand Water Patterns & Motifs"}
            description={
              isRtl
                ? "أشكال متجهة خفيفة (SVG) تعبّر عن تموجات الماء وانسيابيته بدون صور زخرفية ثقيلة."
                : "Vector SVG motifs embodying water ripple and fluidity without heavy raster assets."
            }
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pattern 1: Ripple Rings */}
            <div className="p-6 rounded-3xl bg-brand-ocean text-white flex flex-col items-center justify-center relative overflow-hidden h-64 border border-white/10 shadow-card">
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <RippleRings className="w-56 h-56 text-brand-foam" animate />
              </div>
              <span className="relative z-10 font-bold text-sm">RippleRings</span>
              <span className="relative z-10 text-xs text-brand-foam/75 mt-1 font-mono">11s pulse loop</span>
            </div>

            {/* Pattern 2: Wave Divider */}
            <div className="p-6 rounded-3xl bg-brand-pearl border border-border-subtle flex flex-col justify-between h-64 shadow-subtle">
              <span className="font-bold text-sm text-brand-deep">WaveDivider</span>
              <div className="w-full text-brand-ocean my-auto">
                <WaveDivider className="w-full h-8" />
              </div>
              <span className="text-xs text-text-subtle-accessible font-mono">Continuous bezier wave</span>
            </div>

            {/* Pattern 3: Droplet Glyph */}
            <div className="p-6 rounded-3xl bg-white border border-border-subtle flex flex-col items-center justify-center h-64 shadow-subtle gap-3">
              <DropletGlyph className="w-10 h-10 text-brand-azure" />
              <span className="font-bold text-sm text-brand-deep">DropletGlyph</span>
              <span className="text-xs text-text-subtle-accessible font-mono">Pure geometry SVG</span>
            </div>

            {/* Pattern 4: Display Numeral */}
            <div className="p-6 rounded-3xl bg-brand-abyss text-brand-champagne flex flex-col items-center justify-center h-64 border border-white/10 shadow-card gap-2">
              <DisplayNumeral number="01" className="text-4xl" />
              <span className="font-bold text-xs text-white">DisplayNumeral (01)</span>
              <span className="text-xs text-brand-champagne/70 font-mono">Champagne on Abyss (14.1:1)</span>
            </div>
          </div>
        </Section>

        {/* 3. Button Component Showcase (Orbit Buttons v2) */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Buttons v2 / الأزرار التفاعلية"
            title={isRtl ? "أزرار المدار (Orbit Buttons) مع شريحة الإزاحة" : "Orbit Buttons v2 with 4px Chip Nudge"}
            description={
              isRtl
                ? "4 أنماط أساسية مع شريحة دائرية تنزاح 4px في التحويم، تنعكس تلقائياً في RTL، وهدف لمس أدنى 44px."
                : "4 primary variants with orbiting chip nudging 4px on hover, flipping in RTL, and 44px min touch target."
            }
          />
          <div className="mt-6 flex flex-wrap items-center gap-4 p-6 bg-white rounded-2xl border border-border">
            <Button variant="primary" size="md" withOrbit>
              <span>{isRtl ? "زر أساسي بالمدار" : "Primary Orbit"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Button>

            <div className="bg-brand-ocean p-2 rounded-xl inline-flex">
              <Button variant="light" size="md" withOrbit>
                <span>{isRtl ? "زر فاتح بالمدار" : "Light Orbit"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </div>

            <Button variant="outline" size="md" withOrbit>
              <span>{isRtl ? "زر إطار بالمدار" : "Outline Orbit"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Button>

            <Button variant="quiet" size="md">
              <span>{isRtl ? "زر هادئ (Quiet)" : "Quiet Button"}</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={isButtonLoading}
              onClick={() => setIsButtonLoading(!isButtonLoading)}
            >
              {isButtonLoading
                ? isRtl
                  ? "جاري التحميل..."
                  : "Loading..."
                : isRtl
                ? "تجربة حالة التحميل"
                : "Click for Loading"}
            </Button>

            <Button variant="primary" size="md" disabled>
              {isRtl ? "معطل" : "Disabled"}
            </Button>
          </div>
        </Section>

        {/* 4. Product Card v2 Showcase */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Product Card v2 / بطاقة المنتج المطورة"
            title={
              isRtl
                ? "بطاقة المنتج مع لوحة صور بلون اللؤلؤ وظل أرضي"
                : "Product Card v2 with Pearl Tonal Panel & Floor Shadow"
            }
            description={
              isRtl
                ? "استخدام mix-blend-multiply مع خلفية اللؤلؤ وقناع التلاشي المستطيل لمنع المربعات البيضاء."
                : "mix-blend-multiply over pearl tint with rectangular feather mask eliminates white bounding boxes."
            }
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              id={PLACEHOLDER_CARD_DATA.id}
              name={PLACEHOLDER_CARD_DATA.name}
              index={1}
              category={PLACEHOLDER_CARD_DATA.category}
              price={PLACEHOLDER_CARD_DATA.price}
              compareAtPrice={PLACEHOLDER_CARD_DATA.compareAtPrice}
              badge={PLACEHOLDER_CARD_DATA.badge}
              href={PLACEHOLDER_CARD_DATA.href}
              locale={locale}
              actions={
                <Button variant="primary" size="sm" withOrbit>
                  <span>{isRtl ? "طلب" : "Order"}</span>
                </Button>
              }
            />

            <ProductCardSkeleton />
          </div>
        </Section>

        {/* 5. Dev-Only Fixture: Offers Preview */}
        <Section spacing="none">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-mono font-bold mb-4">
            DEV ONLY — PLACEHOLDER DATA FOR PREVIEW: OFFERS SECTION
          </div>
          <SectionHeading
            eyebrow="Offers Preview / معاينة العروض"
            title={isRtl ? "معاينة قسم العروض ببيانات تجريبية" : "Offers Section Preview (Fixture Data)"}
            description={
              isRtl
                ? "يعتمد هذا القسم على وجود compareAtPrice > price حقيقي. يتم إخفاؤه تلقائياً في الإنتاج في حال عدم توفره."
                : "Calculates real savings amount and percentage. Hidden in production when no discounted items exist."
            }
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_OFFER_PRODUCTS.map((product) => {
              const price = product.price!;
              const compareAt = product.compareAtPrice!;
              const savings = compareAt - price;
              const percent = Math.round((savings / compareAt) * 100);

              return (
                <article
                  key={product.id}
                  className="relative rounded-3xl bg-brand-ocean text-white border border-white/10 p-6 shadow-card flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute -top-10 -end-10 w-48 h-48 opacity-25 pointer-events-none">
                    <RippleRings className="w-full h-full text-brand-foam/20" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-champagne/20 text-brand-champagne border border-brand-champagne/40">
                      {isRtl
                        ? `وفر ${savings} ر.س (${percent}%)`
                        : `Save ${savings} SAR (${percent}%)`}
                    </span>
                  </div>

                  <div className="relative w-full aspect-square rounded-2xl bg-white overflow-hidden p-4 mb-4 flex items-center justify-center">
                    <div className="feathered-image-mask relative w-full h-full flex items-center justify-center">
                      <Image
                        src={product.image.src}
                        alt={product.image.alt[locale]}
                        fill
                        sizes="280px"
                        className="object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-bold text-white line-clamp-2">
                      <bdi>{product.name[locale]}</bdi>
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                      <Price
                        amount={price}
                        compareAtAmount={compareAt}
                        locale={locale}
                        size="md"
                        tone="light"
                      />
                      <Button variant="light" size="sm">
                        <span>{isRtl ? "طلب" : "Order"}</span>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* 6. Dev-Only Fixture: Packages Preview */}
        <Section spacing="none">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-mono font-bold mb-4">
            DEV ONLY — PLACEHOLDER DATA FOR PREVIEW: PACKAGES SECTION
          </div>
          <SectionHeading
            eyebrow="Packages Preview / معاينة البكجات"
            title={isRtl ? "معاينة قسم البكجات ببيانات تجريبية" : "Packages Section Preview (Fixture Data)"}
            description={
              isRtl
                ? "يجمع البكج عدة منتجات ويحسب الخصم مقارنة بسعر المنتجات الفردية تلقائياً."
                : "Bundles multiple items and calculates composite bundle savings dynamically."
            }
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_PACKAGES.map((pkg) => {
              const resolvedItems = pkg.items.map((it) => {
                const product = PROVISIONAL_PRODUCTS.find(
                  (p) => p.id === it.productId
                ) || {
                  id: it.productId,
                  name: { ar: "منتج البكج", en: "Package Item" },
                  image: { src: "/images/products/tabletop-dispenser-black.jpg", alt: { ar: "", en: "" } },
                  price: 790,
                };
                return { ...it, product };
              });

              return (
                <article
                  key={pkg.id}
                  className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-border-subtle flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center -space-x-3 rtl:space-x-reverse mb-6">
                      {resolvedItems.slice(0, 4).map((it) => (
                        <div
                          key={it.productId}
                          className="relative w-14 h-14 rounded-2xl bg-white shadow-subtle border-2 border-white overflow-hidden shrink-0"
                        >
                          <Image
                            src={it.product.image.src}
                            alt=""
                            fill
                            sizes="60px"
                            className="object-contain p-1"
                          />
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-brand-deep mb-2">
                      <bdi>{pkg.name[locale]}</bdi>
                    </h3>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                      {isRtl ? "وفر 790 ر.س" : "Save 790 SAR"}
                    </span>

                    <div className="mt-4 pt-4 border-t border-border-subtle">
                      <p className="text-xs font-bold text-text-subtle-accessible mb-2">
                        {isRtl ? "محتويات البكج:" : "Package Contents:"}
                      </p>
                      <ul className="flex flex-col gap-1.5 text-xs text-brand-deep">
                        {resolvedItems.map((it) => (
                          <li key={it.productId} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-azure shrink-0" />
                            <span>
                              {it.qty} × {it.product.name[locale]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between gap-4">
                    <Price
                      amount={pkg.price!}
                      compareAtAmount={2789}
                      locale={locale}
                      size="md"
                    />

                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      withOrbit
                      className="min-h-[44px]"
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{isRtl ? "إضافة البكج" : "Add Package"}</span>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* 7. Color Swatches Section */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Tokens / الألوان"
            title={isRtl ? "تدرجات الألوان ومعدلات التباين (WCAG AA)" : "Color Token Scales & Contrast"}
            description={
              isRtl
                ? "تدرجات كاملة مرتبة حسب العائلة مع إظهار كود اللون ومعدل التباين ضد النص."
                : "Full ordered scales per family with hex codes and contrast ratios against foreground text."
            }
          />
          <div className="mt-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-text-muted ltr:uppercase ltr:tracking-wider">
                1. Aqua Blue Scale (50–950):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
                {SWATCH_FAMILIES.blueScale.map((swatch) => (
                  <div
                    key={swatch.step}
                    className="flex flex-col rounded-xl overflow-hidden border border-border bg-white shadow-subtle"
                  >
                    <div
                      className={cn(
                        "h-14 w-full flex items-center justify-center font-bold text-xs p-1",
                        swatch.bgClass,
                        swatch.textClass
                      )}
                    >
                      {swatch.step}
                    </div>
                    <div className="p-2 flex flex-col gap-0.5">
                      <span className="text-xs font-mono text-text-muted">{swatch.hex}</span>
                      <span className="text-xs font-semibold text-text-subtle-accessible">{swatch.contrast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-text-muted ltr:uppercase ltr:tracking-wider">
                2. Neutral Slate Scale (50–900):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                {SWATCH_FAMILIES.neutralScale.map((swatch) => (
                  <div
                    key={swatch.step}
                    className="flex flex-col rounded-xl overflow-hidden border border-border bg-white shadow-subtle"
                  >
                    <div
                      className={cn(
                        "h-14 w-full flex items-center justify-center font-bold text-xs p-1",
                        swatch.bgClass,
                        swatch.textClass
                      )}
                    >
                      {swatch.step}
                    </div>
                    <div className="p-2 flex flex-col gap-0.5">
                      <span className="text-xs font-mono text-text-muted">{swatch.hex}</span>
                      <span className="text-xs font-semibold text-text-subtle-accessible">{swatch.contrast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
