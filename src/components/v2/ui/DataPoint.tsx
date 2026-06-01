import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const DataPoint = ({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "font-mono text-mono-v2 uppercase tracking-[0.04em] text-v2-sage",
      className,
    )}
    {...rest}
  />
);
