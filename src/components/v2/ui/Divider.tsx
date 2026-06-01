import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  tone?: "sage" | "paper-line" | "paper-soft";
  width?: "hairline" | "section";
};

const toneMap = {
  sage: "bg-v2-sage",
  "paper-line": "bg-v2-paper-line",
  "paper-soft": "bg-v2-paper/20",
};

const widthMap = {
  hairline: "w-[60px] h-px",
  section: "w-full h-px",
};

export const Divider = ({
  className,
  tone = "sage",
  width = "hairline",
}: Props) => (
  <div
    role="separator"
    className={cn(toneMap[tone], widthMap[width], className)}
  />
);
