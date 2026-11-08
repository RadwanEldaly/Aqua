"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Label, Input, Textarea } from "@/components/ui/form-inputs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/gtm";
import { useGSAP, gsap, isReducedMotionPreferred } from "@/hooks/use-gsap";

interface ContactFormProps {
  locale: "ar" | "en";
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("ContactPage");
  const directWhatsAppUrl = buildWhatsAppUrl(t("directPrefill"));
  const hasWhatsApp = Boolean(directWhatsAppUrl);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotionPreferred() || !containerRef.current) return;
      const elements = containerRef.current.children;
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );
    },
    { scope: containerRef }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { name?: string; message?: string } = {};
    if (!name.trim()) {
      newErrors.name = t("nameRequired");
    }
    if (!message.trim()) {
      newErrors.message = t("messageRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Construct formatted message
    const formattedMessage =
      locale === "ar"
        ? `السلام عليكم، أنا ${name.trim()}، ${message.trim()}`
        : `Hello, I am ${name.trim()}. ${message.trim()}`;

    const url = buildWhatsAppUrl(formattedMessage);
    if (url) {
      trackWhatsAppClick();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto flex flex-col gap-8">
      {/* Direct WhatsApp Quick Contact Button (hidden when number is missing) */}
      {hasWhatsApp && (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-surface text-center gap-3 shadow-subtle">
          <p className="text-sm font-medium text-text-subtle-accessible">
            {t("description")}
          </p>
          <a
            href={directWhatsAppUrl!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("directActionAria")}
            className="w-full sm:w-auto min-w-[220px] h-12 px-6 rounded-xl font-bold bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] text-white shadow-card hover:shadow-hover inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{t("directAction")}</span>
          </a>
        </div>
      )}

      {/* Message Form (No backend; triggers WhatsApp client with user's name & message) */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-white shadow-subtle"
      >
        <div className="border-b border-border-subtle pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-brand-deep">
            {t("formTitle")}
          </h2>
        </div>

        {/* Name input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name" required>
            {t("nameLabel")}
          </Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder={t("namePlaceholder")}
            error={errors.name}
            required
          />
        </div>

        {/* Message input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-message" required>
            {t("messageLabel")}
          </Label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            placeholder={t("messagePlaceholder")}
            error={errors.message}
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!hasWhatsApp}
            className="w-full h-12 px-6 rounded-xl font-bold bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] text-white shadow-card hover:shadow-hover inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{t("submitAction")}</span>
          </button>
          {!hasWhatsApp && (
            <p className="mt-2 text-xs text-center text-text-subtle-accessible">
              {t("whatsappOffline")}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
