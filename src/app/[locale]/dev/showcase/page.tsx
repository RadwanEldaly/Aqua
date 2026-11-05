import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShowcaseClient } from "@/components/dev/showcase-client";
import { routing, type Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Design System Showcase (DEV ONLY)",
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Strict safety check: Never expose showcase in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <ShowcaseClient locale={locale as "ar" | "en"} />;
}
