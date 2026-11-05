/**
 * WhatsApp Integration Utilities
 *
 * Strictly follows business rules:
 * - Digits only for wa.me.
 * - encodeURIComponent for message payload.
 * - If NEXT_PUBLIC_WHATSAPP_NUMBER is not provided or empty, returns null.
 * - Zero fallback to fake or placeholder numbers.
 */

export function buildWhatsAppUrl(message?: string): string | null {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!rawNumber || rawNumber.trim() === "") {
    return null;
  }

  const cleanDigits = rawNumber.replace(/[^0-9]/g, "");
  if (cleanDigits.length === 0) {
    return null;
  }

  const baseUrl = `https://wa.me/${cleanDigits}`;
  if (!message || message.trim() === "") {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
}
