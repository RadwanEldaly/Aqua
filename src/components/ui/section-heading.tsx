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
        <span className="text-xs md:text-sm font-semibold tracking-wide text-brand-primary uppercase">
          {eyebrow}
        </span>
      )}
      <TitleTag className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
        {title}
      </TitleTag>
      {description && (
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
