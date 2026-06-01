import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  attribution?: string;
  size?: "default" | "lg";
  className?: string;
};

const sizeMap = {
  default: "text-body-lg-v2",
  lg: "text-h3-v2",
};

export const Quote = ({
  children,
  attribution,
  size = "default",
  className,
}: Props) => (
  <blockquote className={cn("font-serif italic", className)}>
    <p className={cn(sizeMap[size], "leading-snug text-v2-ink")}>
      {children}
    </p>
    {attribution && (
      <footer className="mt-6 font-sans not-italic text-[11px] uppercase text-v2-sage tracking-[0.14em]">
        — {attribution}
      </footer>
    )}
  </blockquote>
);
