import React from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeScaffold />;
}

function HomeScaffold() {
  const t = useTranslations("Pages.home");

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
