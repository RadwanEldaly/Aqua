import React from "react";
import { cn } from "@/lib/utils";

export type HeadingAlignment = "start" | "center" | "end";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: HeadingAlignment;
  titleAs?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
}

const alignStyles: Record<HeadingAlignment, string> = {
  start: "text-start items-start",
  center: "text-center items-center mx-auto",
  end: "text-end items-end ms-auto",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  titleAs: TitleTag = "h2",
  tone = "dark",
  className,
  ...props
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col max-w-2xl gap-3",
        alignStyles[align],
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs md:text-sm font-bold ltr:tracking-wider ltr:uppercase",
            isLight ? "text-brand-champagne" : "text-brand-azure"
          )}
        >
          {eyebrow}
        </span>
      )}
      <TitleTag
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.2] ltr:tracking-tight",
          isLight ? "text-white" : "text-brand-deep"
        )}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg font-medium leading-relaxed max-w-xl",
            isLight ? "text-brand-foam/80" : "text-text-subtle-accessible"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
