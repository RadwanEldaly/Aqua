"use client";

import React, { useState } from "react";
import {
  Button,
  Badge,
  Price,
  Container,
  Section,
  SectionHeading,
  ProductCard,
  Input,
  Textarea,
  Select,
  Label,
  FieldError,
  Hint,
  HeaderShell,
  NavLink,
  MobileDrawerShell,
  VisualLanguageSwitcher,
  Skeleton,
  ProductCardSkeleton,
  ProductDetailSkeleton,
  Stack,
  Grid,
  Divider,
  LabelValue,
} from "@/components/ui";
import {
  PLACEHOLDER_CARD_DATA,
  PLACEHOLDER_NAV_ITEMS,
  SWATCH_FAMILIES,
} from "@/dev/fixtures/products";
import { cn } from "@/lib/utils";
import { Menu, Search, ShoppingBag } from "lucide-react";

export function ShowcaseClient({ locale }: { locale: "ar" | "en" }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      {/* 1. Header Shell Demonstration */}
      <HeaderShell
        brand={
          /* Plain text placeholder - No invented logo or mark */
          <span className="font-bold text-sm tracking-tight text-slate-900 select-none">
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
            <Button variant="ghost" size="sm" iconOnly aria-label="Search">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Cart">
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </>
        }
        mobileTrigger={
          <Button
            variant="ghost"
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
          <div className="text-xs text-slate-500 text-center">
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
          <span className="font-mono bg-amber-100 px-2 py-0.5 rounded uppercase font-bold shrink-0">
            Locale: {locale} ({isRtl ? "RTL" : "LTR"})
          </span>
        </div>

        {/* 2. Color Swatches Section (Ordered Families) */}
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
            {/* Family 1: Blue Scale (50 - 950) */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Aqua Blue Scale (50–950):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
                {SWATCH_FAMILIES.blueScale.map((swatch) => (
                  <div
                    key={swatch.step}
                    className="flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-subtle"
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
                      <span className="text-[10px] font-mono text-slate-600">{swatch.hex}</span>
                      <span className="text-[9px] font-semibold text-slate-500">{swatch.contrast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family 2: Neutral Scale (50 - 900) */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Neutral Slate Scale (50–900):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                {SWATCH_FAMILIES.neutralScale.map((swatch) => (
                  <div
                    key={swatch.step}
                    className="flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-subtle"
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
                      <span className="text-[10px] font-mono text-slate-600">{swatch.hex}</span>
                      <span className="text-[9px] font-semibold text-slate-500">{swatch.contrast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family 3: Status Family */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Status Colors Family:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SWATCH_FAMILIES.statusScale.map((swatch) => (
                  <div
                    key={swatch.name}
                    className="flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-subtle"
                  >
                    <div
                      className={cn(
                        "h-14 w-full flex items-center justify-center font-bold text-xs p-1",
                        swatch.bgClass,
                        swatch.textClass
                      )}
                    >
                      {swatch.name}
                    </div>
                    <div className="p-2.5 flex flex-col gap-0.5">
                      <span className="text-[11px] font-mono text-slate-600">
                        {swatch.bg} / {swatch.fg}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">{swatch.contrast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Button Component Showcase */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Buttons / الأزرار"
            title={isRtl ? "مكون الزر التفاعلي" : "Button Component States & Variants"}
            description={
              isRtl
                ? "يدعم الأزرار الأساسية والثانوية والمفرغة وحالات التحميل والتعطيل مع هدف لمس أدنى 44px."
                : "Primary, secondary, outline, ghost variants with loading, disabled, and 44px min touch targets."
            }
          />
          <div className="mt-6 flex flex-wrap items-center gap-4 p-6 bg-white rounded-2xl border border-slate-200/80">
            <Button variant="primary" size="lg">
              {isRtl ? "زر أساسي كبير" : "Primary Large"}
            </Button>
            <Button variant="primary" size="md">
              {isRtl ? "زر أساسي عادي" : "Primary Medium"}
            </Button>
            <Button variant="primary" size="sm">
              {isRtl ? "زر أساسي صغير" : "Primary Small"}
            </Button>
            <Button variant="secondary" size="md">
              {isRtl ? "زر ثانوي" : "Secondary"}
            </Button>
            <Button variant="outline" size="md">
              {isRtl ? "زر مفرغ" : "Outline"}
            </Button>
            <Button variant="ghost" size="md">
              {isRtl ? "زر شبحي" : "Ghost"}
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
                ? "اضغط لتجربة التحميل"
                : "Click for Loading"}
            </Button>
            <Button variant="primary" size="md" disabled>
              {isRtl ? "معطل" : "Disabled"}
            </Button>
          </div>
        </Section>

        {/* 4. Badges & Price Primitives */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Badges & Price / الشارات والأسعار"
            title={isRtl ? "الشارات وتنسيق العملة السعودية" : "Badges & SAR Price Formatting"}
            description={
              isRtl
                ? "شارات بحالات متعددة وأسعار بنظام أرقام جدولية مع سعر الشطب قبل الخصم."
                : "Semantic status badges and tabular-numeric SAR price display with compare-at strike."
            }
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badges Box */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 flex flex-col gap-4">
              <span className="text-xs font-semibold text-slate-500">BADGE VARIANTS:</span>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">{isRtl ? "أساسي" : "Primary"}</Badge>
                <Badge variant="neutral">{isRtl ? "محايد" : "Neutral"}</Badge>
                <Badge variant="success">{isRtl ? "توصيل وتركيب مجاني" : "Free Delivery"}</Badge>
                <Badge variant="warning">{isRtl ? "متبقي 3 فقط" : "Only 3 left"}</Badge>
                <Badge variant="error">{isRtl ? "نفدت الكمية" : "Out of stock"}</Badge>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 flex flex-col gap-4">
              <span className="text-xs font-semibold text-slate-500">PRICE FORMATTING (SAR):</span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{isRtl ? "سعر مع خصم (كبير):" : "Discounted (Lg):"}</span>
                  <Price amount={850} compareAtAmount={1100} locale={locale} size="lg" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{isRtl ? "سعر عادي (متوسط):" : "Regular (Md):"}</span>
                  <Price amount={450} locale={locale} size="md" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{isRtl ? "سعر صغير:" : "Small:"}</span>
                  <Price amount={120} locale={locale} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Zero-CLS Skeleton vs Real Card Comparison */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Zero-CLS Skeletons / الهياكل المتطابقة"
            title={
              isRtl
                ? "مقارنة حية: بطاقة المنتج الحقيقية مقابل الهيكل التحميلي (CLS = 0.00)"
                : "Live Comparison: Real ProductCard vs Skeleton (Zero CLS)"
            }
            description={
              isRtl
                ? "تتطابق أبعاد ومساحات الهيكل تماماً مع البطاقة الحقيقية لمنع أي إزاحة تخطيطية."
                : "Identical bounding boxes, padding, and aspect ratios guarantee zero Cumulative Layout Shift."
            }
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real Card */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md w-fit">
                {isRtl ? "البطاقة الحقيقية" : "Real Component"}
              </span>
              <ProductCard
                id={PLACEHOLDER_CARD_DATA.id}
                name={PLACEHOLDER_CARD_DATA.name}
                category={PLACEHOLDER_CARD_DATA.category}
                price={PLACEHOLDER_CARD_DATA.price}
                compareAtPrice={PLACEHOLDER_CARD_DATA.compareAtPrice}
                badge={PLACEHOLDER_CARD_DATA.badge}
                href={PLACEHOLDER_CARD_DATA.href}
                locale={locale}
                actions={
                  <Button variant="secondary" size="sm">
                    {isRtl ? "معاينة" : "View"}
                  </Button>
                }
              />
            </div>

            {/* Skeleton Card */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md w-fit">
                {isRtl ? "الهيكل التحميلي (Skeleton)" : "Matching Skeleton"}
              </span>
              <ProductCardSkeleton />
            </div>

            {/* Real Card 2 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md w-fit">
                {isRtl ? "بطاقة بدون شارة" : "Without Badge"}
              </span>
              <ProductCard
                id="placeholder-sample-02"
                name="طقم فلاتر بديل (PLACEHOLDER CARTRIDGES)"
                category="قطع غيار (PARTS)"
                price={180}
                href="#"
                locale={locale}
                actions={
                  <Button variant="secondary" size="sm">
                    {isRtl ? "معاينة" : "View"}
                  </Button>
                }
              />
            </div>

            {/* Skeleton Card 2 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md w-fit">
                {isRtl ? "هيكل تحميلي ثانٍ" : "Matching Skeleton 2"}
              </span>
              <ProductCardSkeleton />
            </div>
          </div>
        </Section>

        {/* 6. Form Inputs & RTL Punctuation */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Forms & Direction / النماذج ومحاذاة النصوص"
            title={
              isRtl
                ? "حقول الإدخال والتعامل الآمن مع اتجاه اللغات"
                : "Form Inputs & Direction-Safe Fields"
            }
            description={
              isRtl
                ? "حقول الهاتف والبريد تحتفظ باتجاه LTR تلقائياً لمنع قلب الأرقام داخل صفحات RTL."
                : "Phone and numeric fields automatically enforce LTR orientation inside RTL layouts."
            }
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl border border-slate-200/80">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="demo-name" required>
                  {isRtl ? "الاسم الكامل" : "Full Name"}
                </Label>
                <Input id="demo-name" placeholder={isRtl ? "أدخل اسمك" : "Enter name"} />
              </div>

              <div>
                <Label htmlFor="demo-phone" required>
                  {isRtl ? "رقم الجوال (اتجاه LTR إجباري)" : "Phone Number (Forces LTR)"}
                </Label>
                <Input
                  id="demo-phone"
                  type="tel"
                  placeholder="+966 50 000 0000"
                  hint={isRtl ? "يتم التحقق تلقائياً من الصيغة السعودية" : "Saudi mobile format"}
                />
              </div>

              <div>
                <Label htmlFor="demo-city">{isRtl ? "المدينة" : "City"}</Label>
                <Select id="demo-city">
                  <option value="riyadh">{isRtl ? "الرياض" : "Riyadh"}</option>
                  <option value="jeddah">{isRtl ? "جدة" : "Jeddah"}</option>
                  <option value="dammam">{isRtl ? "الدمام" : "Dammam"}</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="demo-error">{isRtl ? "حقل مع خطأ تحقق" : "Field with Error"}</Label>
                <Input
                  id="demo-error"
                  defaultValue="invalid-input"
                  error={isRtl ? "هذا الحقل غير صالح" : "This field is invalid"}
                />
              </div>

              <div>
                <Label htmlFor="demo-notes">{isRtl ? "ملاحظات العنوان" : "Address Notes"}</Label>
                <Textarea id="demo-notes" placeholder={isRtl ? "اكتب أية ملاحظات إضافية..." : "Notes..."} />
                <Hint className="mt-1">{isRtl ? "ملاحظات للتوصيل" : "Optional delivery instructions"}</Hint>
              </div>

              {/* Direction-Safe LabelValue Demo */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-500 mb-1">
                  DIRECTION-SAFE LABELVALUE (<bdi>{"<bdi>"}</bdi> Isolation):
                </span>
                <LabelValue
                  label={isRtl ? "الموديل التجريبي (RO-75G)" : "Demo Model (RO-75G)"}
                  value={isRtl ? "متوفر في المخزون" : "In Stock"}
                />
                <LabelValue
                  label={isRtl ? "طريقة الدفع" : "Payment Method"}
                  value={isRtl ? "الدفع عند الاستلام (COD)" : "Cash on Delivery (COD)"}
                />
                <FieldError className="mt-1">
                  {isRtl ? "رسالة خطأ تجريبية للتحقق" : "Sample field error message"}
                </FieldError>
              </div>
            </div>
          </div>
        </Section>

        {/* 7. Layout Primitives & Standalone Skeletons */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Layout & Primitives / التخطيط والمكونات الأساسية"
            title={isRtl ? "مكونات التخطيط والعناصر المنفصلة" : "Layout Primitives (Stack, Grid, Divider)"}
            description={
              isRtl
                ? "مكونات مرنة لبناء التخطيطات مع محاذاة منطقية كاملة."
                : "Flexible structural layout primitives with responsive logical spacing."
            }
          />
          <div className="mt-6 p-6 bg-white rounded-2xl border border-slate-200/80 flex flex-col gap-6">
            <Stack direction="row" spacing="md" align="center" justify="between" wrap>
              <span className="text-sm font-semibold text-slate-800">
                {isRtl ? "مكدس أفقي مع فاصل (Stack Horizontal):" : "Stack Horizontal Row:"}
              </span>
              <Badge variant="primary">Stack Item 1</Badge>
              <Badge variant="neutral">Stack Item 2</Badge>
              <Badge variant="success">Stack Item 3</Badge>
            </Stack>

            <Divider />

            <Grid cols={3} gap="sm">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-center font-medium">
                Grid Col 1
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-center font-medium">
                Grid Col 2
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-center font-medium">
                Grid Col 3
              </div>
            </Grid>

            <Divider />

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-500">Standalone Shimmer Skeletons:</span>
              <Skeleton className="h-6 w-1/3" rounded="md" />
              <Skeleton className="h-4 w-2/3" rounded="sm" />
            </div>
          </div>
        </Section>

        {/* 8. Product Detail Skeleton Preview */}
        <Section spacing="none">
          <SectionHeading
            eyebrow="Complex Skeleton / تفاصيل المنتج"
            title={isRtl ? "هيكل صفحة تفاصيل المنتج" : "Product Detail Composite Skeleton"}
            description={
              isRtl
                ? "هيكل مركب يتضمن المعرض الفني والمواصفات وزر الشراء قبل وصول البيانات."
                : "Full composite preview of the upcoming product detail loading state."
            }
          />
          <div className="mt-6 p-8 bg-white rounded-2xl border border-slate-200/80">
            <ProductDetailSkeleton />
          </div>
        </Section>
      </Container>
    </div>
  );
}
