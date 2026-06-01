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
  <blockquote className={cn("font-display italic", className)}>
    <p className={cn(sizeMap[size], "leading-snug text-v2-ink")}>
      {children}
    </p>
    {attribution && (
      <footer className="mt-6 font-body not-italic text-mono-v2 uppercase text-v2-sage tracking-[0.12em]">
        — {attribution}
      </footer>
    )}
  </blockquote>
);
