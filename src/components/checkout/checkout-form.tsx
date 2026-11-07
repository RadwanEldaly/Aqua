"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { useCart } from "@/context/cart-context";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Normalizes a Saudi mobile phone input:
 * - Converts Arabic-Indic numerals (٠-٩) to Western (0-9)
 * - Accepts 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX, 009665XXXXXXXX
 * - Normalizes to standard 9665XXXXXXXX format
 */
export function normalizeSaudiPhone(raw: string): { valid: boolean; normalized: string } {
  const arabicIndic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  let s = raw.trim();
  for (let i = 0; i < 10; i++) {
    s = s.replaceAll(arabicIndic[i], String(i));
  }
  s = s.replace(/[^\d+]/g, "");
  if (s.startsWith("+")) s = s.slice(1);
  if (s.startsWith("00")) s = s.slice(2);
  if (s.startsWith("05")) s = "966" + s.slice(1);
  else if (s.startsWith("5")) s = "966" + s;

  const valid = /^9665\d{8}$/.test(s);
  return { valid, normalized: s };
}

export function CheckoutForm() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { items, totalPrice, hasPriceForAll, clear, isMounted } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "riyadh",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");
  const [copied, setCopied] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const cities = siteConfig.commerce.supportCities;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isAr ? "الاسم الكامل مطلوب" : "Full name is required";
    }

    const phoneCheck = normalizeSaudiPhone(formData.phone);
    if (!phoneCheck.valid) {
      newErrors.phone = isAr
        ? "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"
        : "Phone must start with 05 and contain 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = isAr ? "العنوان مطلوب" : "Address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first invalid element
      if (newErrors.fullName) {
        fullNameRef.current?.focus();
      } else if (newErrors.phone) {
        phoneRef.current?.focus();
      } else if (newErrors.address) {
        addressRef.current?.focus();
      }
      return;
    }

    const generatedOrderNum = `AQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);

    const cityName =
      cities.find((c) => c.id === formData.city)?.name[isAr ? "ar" : "en"] ||
      formData.city;

    const itemsSummary = items
      .map((item, idx) => {
        const priceStr =
          typeof item.product.price === "number"
            ? ` - ${item.product.price * item.quantity} ر.س`
            : "";
        return `${idx + 1}. ${item.product.name[isAr ? "ar" : "en"]} (${item.quantity}x)${priceStr}`;
      })
      .join("\n");

    const totalStr =
      hasPriceForAll && typeof totalPrice === "number"
        ? `\n*المجموع:* ${totalPrice} ر.س\n`
        : "\n";

    const message = isAr
      ? `*طلب جديد* 💧\n\n` +
        `*رقم الطلب:* #${generatedOrderNum}\n` +
        `*الاسم:* ${formData.fullName.trim()}\n` +
        `*الجوال:* ${phoneCheck.normalized}\n` +
        `*المدينة:* ${cityName}\n` +
        `*العنوان:* ${formData.address.trim()}\n` +
        (formData.notes.trim() ? `*ملاحظات:* ${formData.notes.trim()}\n` : "") +
        `\n*المنتجات:*\n${itemsSummary}\n` +
        totalStr +
        `*طريقة الدفع:* الدفع عند الاستلام`
      : `*New Order* 💧\n\n` +
        `*Order ID:* #${generatedOrderNum}\n` +
        `*Name:* ${formData.fullName.trim()}\n` +
        `*Phone:* ${phoneCheck.normalized}\n` +
        `*City:* ${cityName}\n` +
        `*Address:* ${formData.address.trim()}\n` +
        (formData.notes.trim() ? `*Notes:* ${formData.notes.trim()}\n` : "") +
        `\n*Items:*\n${itemsSummary}\n` +
        (hasPriceForAll && typeof totalPrice === "number"
          ? `\n*Total:* ${totalPrice} SAR\n`
          : "\n") +
        `*Payment:* Cash on Delivery`;

    const url = buildWhatsAppUrl(message);
    setWhatsappHref(url || "");

    if (url) {
      window.open(url, "_blank", "noopener");
    }

    setIsSubmitted(true);
  };

  const handleCopyOrder = () => {
    if (!whatsappHref) return;
    const msg = decodeURIComponent(whatsappHref.split("text=")[1] || "");
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  // Loading skeleton
  if (!isMounted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 animate-pulse space-y-6">
        <div className="h-8 w-48 bg-surface-subtle rounded-xl" />
        <div className="h-48 bg-white rounded-3xl" />
      </div>
    );
  }

  // Confirmation screen with "I sent the order" to clear cart
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-card text-center border border-border-subtle">
        <div className="w-16 h-16 rounded-full bg-brand-mist text-brand-primary flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-brand-deep mb-2">
          {isAr ? "تم إرسال الطلب بنجاح" : "Order Submitted Successfully"}
        </h2>

        <p className="text-text-subtle-accessible text-sm max-w-md mx-auto mb-6">
          {isAr
            ? `رقم طلبك هو #${orderNumber}. سيتم التواصل معك لتأكيد تفاصيل الطلب.`
            : `Your order reference is #${orderNumber}. We will contact you to confirm the details.`}
        </p>

        <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle max-w-md mx-auto mb-6 text-start text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-text-subtle-accessible">{isAr ? "رقم الطلب:" : "Order:"}</span>
            <span className="font-bold text-brand-deep">#{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-subtle-accessible">{isAr ? "الاسم:" : "Name:"}</span>
            <span className="font-semibold text-brand-deep">{formData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-subtle-accessible">{isAr ? "طريقة الدفع:" : "Payment:"}</span>
            <span className="font-semibold text-brand-deep">
              {isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}
            </span>
          </div>
        </div>

        {/* Fallback actions if WhatsApp didn't open */}
        {whatsappHref && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors shadow-subtle"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{isAr ? "فتح واتساب مرة أخرى" : "Open WhatsApp Again"}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyOrder}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-border-subtle text-brand-deep font-medium text-sm hover:bg-surface-subtle transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (isAr ? "تم النسخ" : "Copied") : (isAr ? "نسخ نص الطلب" : "Copy Order Text")}</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            clear();
            window.location.href = isAr ? "/" : "/en";
          }}
          className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-brand-navy hover:bg-brand-deep text-white font-bold text-sm transition-all cursor-pointer"
        >
          <span>{isAr ? "أرسلت الطلب - إنهاء وإفراغ السلة" : "I Sent the Order - Finish & Clear Cart"}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-card text-center border border-border-subtle">
        <div className="w-16 h-16 rounded-full bg-surface-subtle text-text-subtle-accessible flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-xl font-bold text-brand-deep mb-2">
          {isAr ? "سلة المشتريات فارغة" : "Your order is empty"}
        </h2>
        <p className="text-text-subtle-accessible text-sm mb-6">
          {isAr
            ? "يرجى إضافة منتجات إلى السلة قبل المتابعة إلى صفحة تأكيد الطلب."
            : "Please add products to your order before proceeding to checkout."}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-medium text-sm transition-all"
        >
          <span>{isAr ? "تصفح المنتجات" : "Browse Products"}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Checkout Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-subtle/80">
        <h2 className="text-xl font-bold text-brand-deep mb-1">
          {isAr ? "بيانات الطلب والتوصيل" : "Order & Delivery Details"}
        </h2>
        <p className="text-xs text-text-subtle-accessible mb-6">
          {isAr
            ? "يرجى إدخال البيانات لتأكيد الطلب وتحديد موعد التسليم"
            : "Please enter your details to confirm your order"}
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="checkout-fullName" className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "الاسم الكامل *" : "Full Name *"}
            </label>
            <input
              ref={fullNameRef}
              id="checkout-fullName"
              type="text"
              name="fullName"
              required
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "error-fullName" : undefined}
              value={formData.fullName}
              onChange={handleChange}
              placeholder={isAr ? "مثال: محمد عبدالله" : "e.g. Mohammed Abdullah"}
              className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all"
            />
            {errors.fullName && (
              <span id="error-fullName" className="text-xs text-red-600 mt-1 block">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="checkout-phone" className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "رقم الجوال *" : "Mobile Phone *"}
            </label>
            <input
              ref={phoneRef}
              id="checkout-phone"
              type="tel"
              name="phone"
              required
              dir="ltr"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              value={formData.phone}
              onChange={handleChange}
              placeholder="05XXXXXXXX"
              className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all text-start"
            />
            {errors.phone && (
              <span id="error-phone" className="text-xs text-red-600 mt-1 block">
                {errors.phone}
              </span>
            )}
          </div>

          {/* City Selection */}
          <div>
            <label htmlFor="checkout-city" className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "المدينة *" : "City *"}
            </label>
            <div className="relative">
              <select
                id="checkout-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-11 px-4 pe-10 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all bg-white appearance-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name[isAr ? "ar" : "en"]}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-text-subtle-accessible absolute top-3.5 end-3 pointer-events-none" />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="checkout-address" className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "العنوان بالتفصيل *" : "Detailed Address *"}
            </label>
            <input
              ref={addressRef}
              id="checkout-address"
              type="text"
              name="address"
              required
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "error-address" : undefined}
              value={formData.address}
              onChange={handleChange}
              placeholder={isAr ? "الحي، اسم الشارع" : "District, Street"}
              className="w-full h-11 px-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all"
            />
            {errors.address && (
              <span id="error-address" className="text-xs text-red-600 mt-1 block">
                {errors.address}
              </span>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="checkout-notes" className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "ملاحظات إضافية (اختياري)" : "Additional Notes (Optional)"}
            </label>
            <textarea
              id="checkout-notes"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all resize-none"
            />
          </div>

          {/* Payment Method Line */}
          <div className="pt-2">
            <div className="p-3.5 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-between text-xs">
              <span className="font-semibold text-text-subtle-accessible">
                {isAr ? "طريقة الدفع:" : "Payment Method:"}
              </span>
              <span className="font-bold text-brand-deep">
                {isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-subtle hover:shadow-glow-cyan transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{isAr ? "إرسال الطلب عبر واتساب" : "Submit Order via WhatsApp"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Order Summary Sidebar (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-card border border-border-subtle/80">
          <h3 className="text-base font-bold text-brand-deep mb-4 pb-3 border-b border-border-subtle flex items-center justify-between">
            <span>{isAr ? "ملخص الطلب" : "Order Summary"}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-mist text-brand-primary">
              {items.length} {isAr ? "منتجات" : "items"}
            </span>
          </h3>

          {/* Products List */}
          <div className="divide-y divide-border-subtle max-h-80 overflow-y-auto mb-4" role="list">
            {items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl bg-surface-subtle p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.product.image.src}
                    alt={item.product.name[isAr ? "ar" : "en"]}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-brand-deep truncate">
                    {item.product.name[isAr ? "ar" : "en"]}
                  </h4>
                  <div className="text-xs text-text-subtle-accessible mt-0.5">
                    {isAr ? "الكمية:" : "Qty:"} {item.quantity}
                  </div>
                </div>
                {typeof item.product.price === "number" ? (
                  <div className="text-xs font-bold text-brand-deep shrink-0">
                    {item.product.price * item.quantity} {isAr ? "ر.س" : "SAR"}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Total Row (Appears ONLY if EVERY item has a price) */}
          {hasPriceForAll && typeof totalPrice === "number" ? (
            <div className="flex justify-between items-baseline pt-3 border-t border-border-subtle">
              <span className="text-sm font-bold text-brand-deep">
                {isAr ? "المجموع الكلي:" : "Total:"}
              </span>
              <div className="text-lg font-bold text-brand-primary">
                {totalPrice}{" "}
                <span className="text-xs font-semibold">{isAr ? "ر.س" : "SAR"}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
