import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { CATALOG_PRODUCTS, getProductById } from "@/data/catalog";
import { ProductDetailActions } from "@/components/products/product-detail-actions";
import { ProductCard } from "@/components/ui/product-card";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  const params: Array<{ locale: string; id: string }> = [];
  for (const locale of routing.locales) {
    for (const product of CATALOG_PRODUCTS) {
      params.push({ locale, id: product.id });
      if (product.slug !== product.id) {
        params.push({ locale, id: product.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "المنتج غير موجود" };
  }

  const isAr = locale === "ar";
  const title = product.name[isAr ? "ar" : "en"];
  const description = product.shortDescription[isAr ? "ar" : "en"];
  const canonicalUrl = isAr ? `/products/${product.id}` : `/en/products/${product.id}`;

  return {
    title: `${title} | ${isAr ? "أكوا جارد" : "AQUA GUARD"}`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: `/products/${product.id}`,
        en: `/en/products/${product.id}`,
        "x-default": `/products/${product.id}`,
      },
    },
    openGraph: {
      title,
      description,
      images: [{ url: product.thumbnailImage, width: 800, height: 800, alt: title }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = getProductById(id);
  if (!product) {
    notFound();
  }

  const isAr = locale === "ar";
  const title = product.name[isAr ? "ar" : "en"];
  const shortDesc = product.shortDescription[isAr ? "ar" : "en"];
  const fullDesc = product.fullDescription[isAr ? "ar" : "en"];

  // Related products
  const relatedProducts = CATALOG_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isOffer)
  ).slice(0, 3);

  // Discount calculation
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-text-subtle mb-6 sm:mb-8"
        >
          <Link href="/" className="hover:text-brand-primary transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <Link href="/products" className="hover:text-brand-primary transition-colors">
            {isAr ? "المنتجات" : "Products"}
          </Link>
          {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="font-semibold text-brand-deep truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </nav>

        {/* Main Product Showcase Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-border-subtle/60 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl bg-surface-subtle p-6 flex items-center justify-center overflow-hidden group">
              {product.badge && (
                <div className="absolute top-4 start-4 z-10">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold shadow-sm">
                    {product.badge[isAr ? "ar" : "en"]}
                  </span>
                </div>
              )}

              {discountPercent > 0 && (
                <div className="absolute top-4 end-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-sm">
                    {isAr ? `خصم ${discountPercent}%` : `-${discountPercent}%`}
                  </span>
                </div>
              )}

              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={product.thumbnailImage}
                  alt={title}
                  fill
                  priority
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            {/* Thumbnail Strip if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 rounded-xl bg-surface-subtle border-2 border-brand-primary p-2 shrink-0 overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${title} - view ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider bg-brand-mist/60 px-3 py-1 rounded-full">
                  {product.category === "packages"
                    ? isAr ? "باقة خاصة" : "Special Bundle"
                    : product.category === "systems"
                    ? isAr ? "أنظمة تحلية" : "RO System"
                    : product.category === "dispensers"
                    ? isAr ? "برادة مياه" : "Water Dispenser"
                    : product.category === "filters"
                    ? isAr ? "فلتر جامبو" : "Jumbo Filter"
                    : isAr ? "قطع غيار" : "Accessory"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-deep leading-tight mb-4">
                {title}
              </h1>

              {/* Short Description */}
              <p className="text-base text-text-subtle leading-relaxed mb-6">
                {shortDesc}
              </p>

              {/* Price Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle/80 border border-border-subtle flex flex-wrap items-baseline gap-4 mb-6">
                <div className="text-3xl sm:text-4xl font-bold text-brand-deep">
                  {product.price}{" "}
                  <span className="text-lg font-bold text-brand-primary">
                    {isAr ? "ر.س" : "SAR"}
                  </span>
                </div>

                {product.compareAtPrice && (
                  <div className="text-lg sm:text-xl text-text-subtle line-through decoration-red-500/70">
                    {product.compareAtPrice} {isAr ? "ر.س" : "SAR"}
                  </div>
                )}

                {savings > 0 && (
                  <span className="ms-auto inline-flex items-center px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {isAr ? `وفر ${savings} ر.س` : `Save ${savings} SAR`}
                  </span>
                )}
              </div>

              {/* Interactive Cart and WhatsApp Action Buttons */}
              <ProductDetailActions product={product} locale={locale as "ar" | "en"} />
            </div>
          </div>
        </div>

        {/* Detailed Description & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Full description & features (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-subtle/60">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-deep mb-4 pb-3 border-b border-border-subtle">
              {isAr ? "تفاصيل ومميزات المنتج" : "Product Details & Features"}
            </h2>

            <p className="text-base text-text-subtle leading-relaxed mb-6 whitespace-pre-line">
              {fullDesc}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="space-y-3 mb-6">
                <h3 className="text-base font-bold text-brand-deep mb-2">
                  {isAr ? "أبرز الخصائص والمواصفات:" : "Key Features:"}
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-brand-deep">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                      <span>{feat[isAr ? "ar" : "en"]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.packageIncludes && product.packageIncludes.length > 0 && (
              <div className="p-4 rounded-2xl bg-brand-mist/40 border border-brand-primary/20">
                <h3 className="text-sm font-bold text-brand-deep mb-2">
                  {isAr ? "محتويات البكج:" : "Package Contents:"}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-brand-deep">
                  {product.packageIncludes.map((inc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span>{inc[isAr ? "ar" : "en"]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Technical Specs Table (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-subtle/60">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-deep mb-4 pb-3 border-b border-border-subtle">
              {isAr ? "المواصفات الفنية" : "Technical Specs"}
            </h2>

            <dl className="divide-y divide-border-subtle">
              {product.specs.map((spec) => (
                <div key={spec.id} className="py-3 flex justify-between items-center text-sm">
                  <dt className="text-text-subtle font-medium">
                    {spec.label[isAr ? "ar" : "en"]}
                  </dt>
                  <dd className="font-bold text-brand-deep text-end">
                    {spec.value[isAr ? "ar" : "en"]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-deep">
                  {isAr ? "منتجات وعروض ذات صلة" : "Related Products & Offers"}
                </h2>
                <p className="text-sm text-text-subtle mt-1">
                  {isAr
                    ? "حلول تحلية وفلترة المياه للمنزل"
                    : "Water purification and filtration solutions"}
                </p>
              </div>

              <Link
                href="/products"
                className="text-sm font-bold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1.5"
              >
                <span>{isAr ? "عرض كل المنتجات" : "View All"}</span>
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name[isAr ? "ar" : "en"]}
                  price={p.price}
                  compareAtPrice={p.compareAtPrice}
                  imageUrl={p.thumbnailImage}
                  imageAlt={p.name[isAr ? "ar" : "en"]}
                  imageWidth={800}
                  imageHeight={800}
                  href={`/products/${p.id}`}
                  locale={locale as "ar" | "en"}
                  badge={p.badge ? { text: p.badge[isAr ? "ar" : "en"], variant: "primary" } : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
