import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="py-24 sm:py-32 flex-1 flex items-center justify-center text-center">
      <Container size="sm">
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-surface border border-border shadow-card flex flex-col items-center gap-4">
          <span className="text-6xl sm:text-7xl font-black text-brand-primary leading-none">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-deep leading-[1.3]">
            {t("title")}
          </h1>
          <p className="text-text-subtle-accessible text-sm sm:text-base font-normal max-w-sm">
            {t("description")}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-6 py-3 rounded-full bg-brand-primary text-brand-surface text-sm font-semibold hover:bg-brand-primary-hover transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {t("homeAction")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
