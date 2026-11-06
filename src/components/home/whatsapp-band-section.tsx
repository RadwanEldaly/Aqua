import React from "react";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppBandSection() {
  const t = useTranslations("HomePage.whatsappBand");
  const whatsappUrl = buildWhatsAppUrl(t("whatsappPrefill"));

  // The whole band is hidden if the number is missing
  if (!whatsappUrl) {
    return null;
  }

  return (
    <Section spacing="none" className="py-16 sm:py-20 lg:py-24">
      <Container size="lg">
        {/* Soft-tint panel using existing tokens: bg-brand-surface, solid card, no glass/gradients */}
        <div className="rounded-3xl bg-brand-surface border border-border p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center gap-6 shadow-subtle">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-deep leading-tight">
            <bdi>{t("title")}</bdi>
          </h2>

          <Button
            href={whatsappUrl}
            external
            variant="primary"
            size="lg"
            aria-label={t("chatAria")}
            className="min-w-[200px] h-13 px-8 text-base font-semibold inline-flex items-center gap-2.5 shadow-subtle cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{t("chatAction")}</span>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
