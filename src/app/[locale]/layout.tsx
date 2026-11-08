import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { fontArabic, fontSans } from "@/styles/fonts";
import { SkipToContent } from "@/components/ui/navigation";
import { SiteHeader, SiteFooter, FloatingActionButton } from "@/components/navigation";
import { MobileBottomBar } from "@/components/navigation/mobile-bottom-bar";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartToast } from "@/components/ui/cart-toast";
import { GtmGlobalListener } from "@/lib/gtm";
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
      : null);

  return {
    title: {
      default: t("title"),
      template: `%s | ${locale === "ar" ? "أكوا" : "AQUA"}`,
    },
    description: t("description"),
    ...(baseUrl ? { metadataBase: new URL(baseUrl) } : {}),
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
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: locale === "ar" ? "أكوا - أنظمة وفلاتر تنقية المياه" : "AQUA - Water Filtration Systems",
        },
      ],
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
      <head>
        {/* Google Tag Manager (GTM-MDB88DR9) */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MDB88DR9"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18563616365');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-canvas text-brand-deep selection:bg-brand-primary selection:text-white"
        dir={dir}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDB88DR9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GtmGlobalListener />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CartProvider>
            <SkipToContent />
            <SiteHeader />
            <main id="main-content" className="flex-1 flex flex-col pb-16 md:pb-0">
              {children}
            </main>
            <SiteFooter />
            <FloatingActionButton />
            <MobileBottomBar />
            <CartToast />
            <CartDrawer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
