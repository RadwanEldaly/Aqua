import React from "react";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import {
  PROVISIONAL_PRODUCTS,
  PROVISIONAL_CATEGORIES,
} from "@/data/provisional-products";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface FeaturedProductsSectionProps {
  locale: "ar" | "en";
}

export function FeaturedProductsSection({ locale }: FeaturedProductsSectionProps) {
  const t = useTranslations("HomePage.featured");
  const tProducts = useTranslations("ProductsPage");

  // Take the first 4 products strictly from the data file
  const featuredProducts = PROVISIONAL_PRODUCTS.slice(0, 4);

  return (
    <Section spacing="none" className="py-16 sm:py-20 lg:py-28">
      <Container size="lg">
        <div className="flex flex-col gap-10 sm:gap-12">
          {/* Section Heading */}
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
          />

          {/* 4-Item Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const productName = product.name[locale];
              const prefilledMessage = tProducts("whatsappPrefill", {
                name: productName,
              });
              const whatsAppHref = buildWhatsAppUrl(prefilledMessage);

              const categoryMatch = PROVISIONAL_CATEGORIES.find(
                (c) => c.id === product.categoryId
              );
              const categoryLabel = categoryMatch?.label[locale];

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={productName}
                  category={categoryLabel}
                  imageUrl={product.image.src}
                  imageAlt={product.image.alt[locale]}
                  locale={locale}
                  /* Non-link article mode (href omitted) */
                  /* No badges (best seller / new badges omitted) */
                  actions={
                    whatsAppHref ? (
                      <a
                        href={whatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tProducts("inquireAria", { name: productName })}
                        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-brand-primary text-brand-surface text-xs font-semibold hover:bg-brand-primary-hover transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{tProducts("inquire")}</span>
                      </a>
                    ) : undefined
                  }
                />
              );
            })}
          </div>

          {/* View All Button linking to /products */}
          <div className="flex justify-center pt-4">
            <Button
              href="/products"
              variant="outline"
              size="lg"
              className="min-w-[180px] h-12 px-8 text-sm font-semibold cursor-pointer"
            >
              {t("viewAllAction")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
