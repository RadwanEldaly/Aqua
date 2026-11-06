"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Send } from "lucide-react";
import { Label, Input, Textarea } from "@/components/ui/form-inputs";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

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
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
      {/* Direct WhatsApp Quick Contact Button (hidden when number is missing) */}
      {hasWhatsApp && (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-surface border border-border text-center gap-3 shadow-subtle">
          <p className="text-sm font-medium text-text-subtle-accessible">
            {t("description")}
          </p>
          <Button
            href={directWhatsAppUrl!}
            external
            variant="primary"
            size="lg"
            aria-label={t("directActionAria")}
            className="w-full sm:w-auto min-w-[220px] inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{t("directAction")}</span>
          </Button>
        </div>
      )}

      {/* Message Form (No backend; triggers WhatsApp client with user's name & message) */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-subtle"
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
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!hasWhatsApp}
            className="w-full inline-flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 rtl:rotate-180 shrink-0" aria-hidden="true" />
            <span>{t("submitAction")}</span>
          </Button>
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
