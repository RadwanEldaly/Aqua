import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { fontArabic, fontSans } from "@/styles/fonts";
import { SkipToContent } from "@/components/ui/navigation";
import { SiteHeader, SiteFooter, FloatingActionButton } from "@/components/navigation";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, "")}`
      : "http://localhost:3000");

  return {
    title: {
      default: t("title"),
      template: `%s | ${locale === "ar" ? "أكوا" : "AQUA"}`,
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === "ar" ? "/" : "/en",
      languages: {
        ar: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale parameter
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontArabic.variable} ${fontSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-canvas text-brand-deep selection:bg-brand-primary selection:text-white" dir={dir}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SkipToContent />
          <SiteHeader />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <SiteFooter />
          <FloatingActionButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
