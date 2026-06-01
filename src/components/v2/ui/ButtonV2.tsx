import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";
type Size = "default" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
    to?: never;
  };

type AnchorProps = CommonProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  to?: never;
};

type LinkProps = CommonProps & {
  as: "Link";
  to: string;
  href?: never;
};

type Props = ButtonProps | AnchorProps | LinkProps;

const baseClasses =
  "inline-flex items-center justify-center font-body text-body-sm-v2 tracking-wide transition-colors duration-[180ms] ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-v2-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-v2-paper disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-v2-golden text-v2-paper hover:bg-v2-golden-deep px-7 py-4 uppercase tracking-[0.12em]",
  ghost:
    "bg-transparent text-v2-ink border border-v2-ink/15 hover:border-v2-ink/40 px-7 py-4 uppercase tracking-[0.12em]",
  link:
    "bg-transparent text-current underline-offset-4 hover:underline px-0 py-0",
};

const sizeClasses: Record<Size, string> = {
  default: "text-body-sm-v2",
  lg: "text-body-v2 px-9 py-5",
};

export const ButtonV2 = (props: Props) => {
  const { variant = "primary", size = "default", className, children } = props;
  const cls = cn(
    baseClasses,
    variantClasses[variant],
    size === "lg" && sizeClasses.lg,
    className,
  );

  if (props.as === "a") {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={cls}
      >
        {children}
      </a>
    );
  }
  if (props.as === "Link") {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    );
  }

  // Default button
  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...buttonRest } =
    props as ButtonProps;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
};
