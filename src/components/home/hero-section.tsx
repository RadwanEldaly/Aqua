"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useGSAP, gsap } from "@/hooks/use-gsap";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  locale: "ar" | "en";
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("HomePage.hero");
  const whatsappUrl = buildWhatsAppUrl(t("whatsappPrefill"));
  const hasWhatsApp = Boolean(whatsappUrl);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle GSAP entrance animation with reduced-motion support
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-text-elem", {
          opacity: 0,
          y: 16,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
        });
        gsap.from(".hero-image-panel", {
          opacity: 0,
          scale: 0.98,
          duration: 0.65,
          ease: "power2.out",
          delay: 0.08,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <Section spacing="none" className="py-16 sm:py-20 lg:py-28 overflow-hidden">
      <Container size="lg">
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Editorial Text Composition */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            <h1
              className={cn(
                "hero-text-elem text-5xl sm:text-6xl lg:text-7xl font-extrabold text-brand-deep leading-[1.25] sm:leading-[1.2]",
                locale === "en" ? "tracking-tight uppercase" : "tracking-normal"
              )}
            >
              <bdi>{t("title")}</bdi>
            </h1>

            <p className="hero-text-elem mt-4 sm:mt-5 text-lg sm:text-xl lg:text-2xl text-text-subtle-accessible font-medium leading-[1.4] max-w-xl">
              {t("descriptor")}
            </p>

            {/* Actions row: min-h-[52px] anchors height and layout so zero shift occurs */}
            <div className="hero-text-elem mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 min-h-[52px]">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                className="min-w-[160px] h-13 px-7 text-base font-semibold shadow-subtle cursor-pointer"
              >
                {t("browseAction")}
              </Button>

              {hasWhatsApp ? (
                <Button
                  href={whatsappUrl!}
                  external
                  variant="outline"
                  size="lg"
                  aria-label={t("inquireAria")}
                  className="min-w-[160px] h-13 px-7 text-base font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>{t("inquireAction")}</span>
                </Button>
              ) : (
                /* Reserved slot: layout does not shift when WhatsApp number is omitted */
                <div className="hidden sm:inline-block w-0 min-h-[52px]" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* Hero Visual Image Panel */}
          <div className="hero-image-panel lg:col-span-6 w-full">
            <div className="relative rounded-3xl bg-white p-6 sm:p-10 border border-border-subtle/60 shadow-subtle overflow-hidden flex items-center justify-center">
              <div className="relative w-full aspect-[16/13] sm:aspect-[16/12]">
                <Image
                  src="/images/home/tabletop-dispenser-trio.jpg"
                  alt={t("imageAlt")}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
