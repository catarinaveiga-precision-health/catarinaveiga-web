import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLParagraphElement> & {
  tone?: "sage" | "terracotta" | "ink-mute" | "paper";
};

const toneMap = {
  sage: "text-v2-sage",
  terracotta: "text-v2-terracotta",
  "ink-mute": "text-v2-ink-mute",
  paper: "text-v2-paper/70",
};

export const Eyebrow = ({ tone = "sage", className, ...rest }: Props) => (
  <p
    className={cn(
      "font-body text-eyebrow-v2 uppercase",
      toneMap[tone],
      className,
    )}
    {...rest}
  />
);
