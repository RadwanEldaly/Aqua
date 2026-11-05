import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.contact" });

  return {
    title: t("title"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactScaffold />;
}

function ContactScaffold() {
  const t = useTranslations("Pages.contact");

  return (
    <section className="py-20 sm:py-28 flex-1 flex items-center">
      <Container size="lg" className="text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-deep leading-[1.3] ltr:tracking-tight">
          <bdi>{t("heading")}</bdi>
        </h1>
      </Container>
    </section>
  );
}
