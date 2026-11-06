"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Wrench,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function CheckoutForm() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "riyadh",
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [validated, setValidated] = useState(false);

  const cities = siteConfig.commerce.supportCities;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidated(true);

    if (!formData.fullName || !formData.phone || !formData.address) {
      return;
    }

    const generatedOrderNum = `AQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);

    const cityName =
      cities.find((c) => c.id === formData.city)?.name[isAr ? "ar" : "en"] ||
      formData.city;

    const itemsSummary = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name[isAr ? "ar" : "en"]} (${item.quantity}x) - ${
            item.product.price * item.quantity
          } ر.س`
      )
      .join("\n");

    const message = isAr
      ? `*طلب جديد من موقع أكوا جارد* 💧\n\n` +
        `*رقم الطلب:* #${generatedOrderNum}\n` +
        `*اسم العميل:* ${formData.fullName}\n` +
        `*رقم الجوال:* ${formData.phone}\n` +
        `*المدينة:* ${cityName}\n` +
        `*العنوان:* ${formData.address}\n` +
        (formData.notes ? `*ملاحظات:* ${formData.notes}\n` : "") +
        `\n*المنتجات المطلوبة:*\n${itemsSummary}\n\n` +
        `*المجموع الكلي:* ${subtotal} ر.س\n` +
        `*طريقة الدفع:* الدفع عند الاستلام (شامل التوصيل والتركيب المجاني)\n` +
        `يرجى تأكيد موعد وصول الفني للتركيب.`
      : `*New Order from Aqua Guard Website* 💧\n\n` +
        `*Order ID:* #${generatedOrderNum}\n` +
        `*Customer Name:* ${formData.fullName}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*City:* ${cityName}\n` +
        `*Address:* ${formData.address}\n` +
        (formData.notes ? `*Notes:* ${formData.notes}\n` : "") +
        `\n*Items Ordered:*\n${itemsSummary}\n\n` +
        `*Grand Total:* ${subtotal} SAR\n` +
        `*Payment Method:* Cash on Delivery (Free Delivery & Installation)\n` +
        `Please confirm technician installation schedule.`;

    const whatsappUrl = buildWhatsAppUrl(message);

    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
    }

    setIsSubmitted(true);
    clearCart();
  };

  // If order is completed successfully
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-card text-center border border-border-subtle">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-mist text-brand-primary text-xs font-bold mb-3">
          {isAr ? "تم تسجيل طلبك بنجاح!" : "Order Placed Successfully!"}
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-brand-deep mb-2">
          {isAr ? "شكراً لثقتك بأكوا جارد" : "Thank you for trusting Aqua Guard"}
        </h2>

        <p className="text-text-subtle text-sm sm:text-base max-w-md mx-auto mb-6">
          {isAr
            ? `رقم طلبك هو #${orderNumber}. سيقوم فريق خدمة العملاء بالتواصل معك لتأكيد موعد التوصيل والتركيب المجاني.`
            : `Your order number is #${orderNumber}. Our customer service team will contact you shortly to confirm installation.`}
        </p>

        <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle max-w-md mx-auto mb-8 text-start text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-text-subtle">{isAr ? "رقم الطلب:" : "Order ID:"}</span>
            <span className="font-bold text-brand-deep">#{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-subtle">{isAr ? "المستلم:" : "Recipient:"}</span>
            <span className="font-semibold text-brand-deep">{formData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-subtle">{isAr ? "طريقة الدفع:" : "Payment:"}</span>
            <span className="font-semibold text-emerald-700">
              {isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 py-3 px-8 rounded-button bg-brand-primary hover:bg-brand-primary-hover text-white font-bold transition-all"
        >
          <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    );
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-card text-center border border-border-subtle">
        <div className="w-20 h-20 rounded-full bg-surface-subtle text-text-subtle-accessible flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-bold text-brand-deep mb-3">
          {isAr ? "سلة المشتريات فارغة" : "Your cart is currently empty"}
        </h2>
        <p className="text-text-subtle text-sm mb-8">
          {isAr
            ? "يرجى إضافة المنتجات أو باقات التحلية إلى سلة الشراء للمتابعة إلى صفحة الدفع."
            : "Please add products or filtration bundles to your cart before proceeding to checkout."}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 py-3 px-8 rounded-button bg-brand-primary hover:bg-brand-primary-hover text-white font-bold transition-all"
        >
          <span>{isAr ? "تصفح العروض والمنتجات" : "Browse Products"}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Checkout Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-subtle/60">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-deep mb-2">
          {isAr ? "معلومات التوصيل والتركيب" : "Delivery & Installation Details"}
        </h2>
        <p className="text-xs sm:text-sm text-text-subtle mb-6">
          {isAr
            ? "يرجى إدخال بياناتك بدقة للتنسيق الفوري مع الفني المختص"
            : "Please enter your details accurately for technician scheduling"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "الاسم الكامل *" : "Full Name *"}
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder={isAr ? "مثال: عبدالله محمد" : "e.g. Abdullah Mohammed"}
              className="w-full h-12 px-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all"
            />
            {validated && !formData.fullName && (
              <span className="text-xs text-red-500 mt-1 block">
                {isAr ? "الاسم مطلوب" : "Name is required"}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "رقم الجوال (واتساب) *" : "Mobile Phone (WhatsApp) *"}
            </label>
            <input
              type="tel"
              name="phone"
              required
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              placeholder="05XXXXXXXX"
              className="w-full h-12 px-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all text-start"
            />
            {validated && !formData.phone && (
              <span className="text-xs text-red-500 mt-1 block">
                {isAr ? "رقم الجوال مطلوب" : "Phone is required"}
              </span>
            )}
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "المدينة *" : "City *"}
            </label>
            <div className="relative">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-12 px-4 pe-10 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all bg-white appearance-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name[isAr ? "ar" : "en"]}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-text-subtle absolute top-4 end-3 pointer-events-none" />
            </div>
          </div>

          {/* Detailed Address */}
          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "الحي واسم الشارع *" : "District & Street Address *"}
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder={isAr ? "مثال: حي النرجس، شارع أنس بن مالك" : "e.g. Al-Narjis District"}
              className="w-full h-12 px-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all"
            />
            {validated && !formData.address && (
              <span className="text-xs text-red-500 mt-1 block">
                {isAr ? "العنوان مطلوب" : "Address is required"}
              </span>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1.5">
              {isAr ? "ملاحظات إضافية أو وقت الزيارة المفضل" : "Preferred Installation Time / Notes"}
            </label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder={isAr ? "مثال: يفضل التركيب في الفترة المسائية بعد العصر" : "e.g. Afternoon visit preferred"}
              className="w-full p-4 rounded-xl border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm outline-none transition-all resize-none"
            />
          </div>

          {/* Payment Method Badge */}
          <div className="pt-4 border-t border-border-subtle">
            <h3 className="text-xs font-bold text-brand-deep mb-2">
              {isAr ? "طريقة الدفع المعتمدة" : "Payment Method"}
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500/40 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-emerald-900 block">
                  {isAr ? "الدفع عند الاستلام (COD)" : "Cash on Delivery (COD)"}
                </span>
                <p className="text-xs text-emerald-700 mt-0.5">
                  {isAr
                    ? "ادفع نقداً أو عبر بطاقة مدى/فيزا بعد استلام الجهاز وتثبيته وفحصه والتأكد من جودة المياه بنسبة 100%."
                    : "Pay by cash or card after installation, testing, and full verification."}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-button bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base shadow-elevated transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isAr ? "تأكيد الطلب عبر واتساب" : "Confirm Order via WhatsApp"}</span>
            </button>
            <p className="text-center text-[11px] text-text-subtle mt-2">
              {isAr
                ? "سيتم فتح محادثة واتساب الرسمية مع خدمة عملاء أكوا جارد بتفاصيل طلبك"
                : "Will open official Aqua Guard WhatsApp chat with pre-filled order"}
            </p>
          </div>
        </form>
      </div>

      {/* Order Summary Sidebar (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-subtle/60">
          <h3 className="text-lg font-bold text-brand-deep mb-4 pb-3 border-b border-border-subtle flex items-center justify-between">
            <span>{isAr ? "ملخص الطلب" : "Order Summary"}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-mist text-brand-primary">
              {items.length} {isAr ? "منتجات" : "items"}
            </span>
          </h3>

          {/* Products List */}
          <div className="divide-y divide-border-subtle max-h-80 overflow-y-auto mb-6">
            {items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl bg-surface-subtle p-2 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.product.thumbnailImage}
                    alt={item.product.name[isAr ? "ar" : "en"]}
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-brand-deep truncate">
                    {item.product.name[isAr ? "ar" : "en"]}
                  </h4>
                  <div className="text-xs text-text-subtle mt-0.5">
                    {isAr ? "الكمية:" : "Qty:"} {item.quantity}
                  </div>
                </div>
                <div className="text-sm font-bold text-brand-deep shrink-0">
                  {item.product.price * item.quantity} {isAr ? "ر.س" : "SAR"}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-3 border-t border-border-subtle text-sm">
            <div className="flex justify-between text-text-subtle">
              <span>{isAr ? "المجموع الفرعي:" : "Subtotal:"}</span>
              <span className="font-semibold text-brand-deep">{subtotal} {isAr ? "ر.س" : "SAR"}</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>{isAr ? "التوصيل والتركيب المنزلي:" : "Delivery & Installation:"}</span>
              <span className="font-bold">{isAr ? "مجاني" : "Free"}</span>
            </div>
            <div className="flex justify-between text-text-subtle">
              <span>{isAr ? "ضريبة القيمة المضافة:" : "VAT:"}</span>
              <span className="font-semibold text-brand-deep">{isAr ? "مشمولة" : "Included"}</span>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t-2 border-border-subtle">
              <span className="text-base font-bold text-brand-deep">
                {isAr ? "المجموع الكلي:" : "Grand Total:"}
              </span>
              <div className="text-2xl font-bold text-brand-primary">
                {subtotal}{" "}
                <span className="text-sm font-semibold">{isAr ? "ر.س" : "SAR"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees Box */}
        <div className="bg-surface-subtle rounded-2xl p-5 border border-border-subtle space-y-3 text-xs">
          <div className="flex items-center gap-2.5 font-bold text-brand-deep">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span>{isAr ? "ضمان شامل لمدة سنتين" : "2-Year Comprehensive Warranty"}</span>
          </div>
          <div className="flex items-center gap-2.5 font-bold text-brand-deep">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? "توصيل سريع خلال 24 - 48 ساعة" : "Fast 24-48h Delivery"}</span>
          </div>
          <div className="flex items-center gap-2.5 font-bold text-brand-deep">
            <Wrench className="w-4 h-4 text-brand-navy" />
            <span>{isAr ? "فريق فني معتمد للتركيب المباشر" : "Certified Installation Technicians"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
