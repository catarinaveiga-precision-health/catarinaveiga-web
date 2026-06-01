import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  bg?: "paper" | "paper-deep" | "moss";
  tight?: boolean;
};

const bgMap = {
  paper: "bg-v2-paper text-v2-ink",
  "paper-deep": "bg-v2-paper-deep text-v2-ink",
  moss: "bg-v2-moss text-v2-paper",
};

export const Section = ({
  bg = "paper",
  tight,
  className,
  ...rest
}: Props) => (
  <section
    className={cn(
      bgMap[bg],
      tight ? "py-section-y-tight" : "py-section-y",
      className,
    )}
    {...rest}
  />
);
