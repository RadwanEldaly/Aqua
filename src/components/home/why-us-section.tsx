 "use client";

import React, { useRef } from "react";
import { ShieldCheck, Wrench, Droplets, Headphones } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/use-gsap";

interface WhyUsSectionProps {
  locale: "ar" | "en";
}

export function WhyUsSection({ locale }: WhyUsSectionProps) {
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".why-us-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const pillars = [
    {
      icon: Droplets,
      title: isAr ? "نقاء فائق بنسبة 100%" : "100% Pure Drinking Water",
      desc: isAr
        ? "تقنية التناضح العكسي RO المتقدمة لإزالة الكلور والشوائب والأملاح الثقيلة بنقاء معتمد."
        : "Advanced RO technology removing chlorine, sediments, and heavy metals.",
      color: "bg-blue-50 text-brand-primary",
    },
    {
      icon: Wrench,
      title: isAr ? "توصيل وتركيب فوري مجاني" : "Free Delivery & Installation",
      desc: isAr
        ? "فريق فنيين معتمدين ومحترفين لتركيب الأجهزة وفحص نسبة الأملاح وتجربة الماء أمامك."
        : "Certified professional technicians for fast installation and water testing.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: ShieldCheck,
      title: isAr ? "ضمان شامل لمدة سنتين" : "2-Year Full Warranty",
      desc: isAr
        ? "ضمان ذهبي معتمد يغطي القطع الكهربائية والكمبروسر مع خدمة صيانة ومتابعة دورية."
        : "Certified warranty covering electrical parts and compressors with scheduled maintenance.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Headphones,
      title: isAr ? "خدمة عملاء ودعم مستمر" : "Dedicated Customer Support",
      desc: isAr
        ? "فريقنا معك عبر واتساب والاتصال الهاتفي للرد الفوري على استفساراتك وخدمات ما بعد البيع."
        : "Instant assistance and after-sales support via WhatsApp and phone.",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface-subtle/50">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-3">
            {isAr ? "لماذا يثق بنا آلاف العملاء؟" : "Why Choose Aqua Guard?"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-deep">
            {isAr ? "معايير النقاء والجودة الفائقة" : "Standards of Pure Quality & Service"}
          </h2>
          <p className="text-sm sm:text-base text-text-subtle mt-2">
            {isAr
              ? "نحرص على تزويد كل منزل في المملكة العربية السعودية بأعلى معايير الأمان الصحي للمياه"
              : "Committed to delivering the highest standards of water safety for homes in Saudi Arabia"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="why-us-card bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-border-subtle/60 flex flex-col items-start text-start hover:shadow-hover transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}>
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-lg font-bold text-brand-deep mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-subtle leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
