"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { DisplayNumeral, RippleRings } from "@/components/ui/brand-patterns";
import { ShoppingCart, MessageCircle, Truck } from "lucide-react";
import { useGSAP, gsap, isReducedMotionPreferred } from "@/hooks/use-gsap";

export function HowOrderingWorks() {
  const t = useTranslations("HomePage.howOrderingWorks");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isReducedMotionPreferred()) return;

      const heading = sectionRef.current?.querySelector(".how-heading-anim");
      const stepCards = sectionRef.current?.querySelectorAll(".how-step-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "opacity,transform",
          }
        );
      }

      if (stepCards && stepCards.length > 0) {
        tl.fromTo(
          stepCards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          heading ? "-=0.35" : 0
        );
      }
    },
    { scope: sectionRef }
  );

  const steps = [
    {
      numeral: 1,
      icon: ShoppingCart,
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      numeral: 2,
      icon: MessageCircle,
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      numeral: 3,
      icon: Truck,
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
  ];

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-white border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <div className="how-heading-anim">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="start"
          />
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.numeral}
                className="how-step-card relative rounded-3xl bg-brand-pearl p-6 sm:p-8 shadow-card border border-border-subtle/80 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Ripple Rings Accent */}
                <div className="absolute -top-10 -end-10 w-44 h-44 opacity-25 pointer-events-none">
                  <RippleRings className="w-full h-full text-brand-ocean/15" />
                </div>

                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-subtle text-brand-azure flex items-center justify-center">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <DisplayNumeral
                    number={step.numeral}
                    tone="azure"
                    className="text-3xl font-extrabold opacity-60"
                  />
                </div>

                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-deep">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-subtle-accessible leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
