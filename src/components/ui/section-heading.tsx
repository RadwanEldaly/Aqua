import React from "react";
import { cn } from "@/lib/utils";

export type HeadingAlignment = "start" | "center" | "end";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: HeadingAlignment;
  titleAs?: "h1" | "h2" | "h3";
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
  className,
  ...props
}: SectionHeadingProps) {
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
        <span className="text-xs md:text-sm font-bold ltr:tracking-wider text-brand-primary ltr:uppercase">
          {eyebrow}
        </span>
      )}
      <TitleTag className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-[1.2] ltr:tracking-tight">
        {title}
      </TitleTag>
      {description && (
        <p className="text-base sm:text-lg text-text-subtle-accessible font-medium leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
