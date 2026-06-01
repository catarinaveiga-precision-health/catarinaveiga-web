import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const DataPoint = ({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "font-sans text-[12px] uppercase tracking-[0.14em] text-v2-sage tabular-nums",
      className,
    )}
    {...rest}
  />
);
