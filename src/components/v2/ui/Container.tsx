import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "prose" | "narrow" | "wide";
};

const sizeMap = {
  default: "max-w-[1280px]",
  prose: "max-w-prose",
  narrow: "max-w-prose-narrow",
  wide: "max-w-[1440px]",
};

export const Container = ({ size = "default", className, ...rest }: Props) => (
  <div
    className={cn(
      "w-full mx-auto px-6 md:px-8 lg:px-12",
      sizeMap[size],
      className,
    )}
    {...rest}
  />
);
