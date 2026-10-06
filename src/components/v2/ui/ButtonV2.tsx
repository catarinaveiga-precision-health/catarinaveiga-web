import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";
type Size = "sm" | "default" | "lg";

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
  "inline-flex items-center justify-center font-body tracking-wide transition-colors duration-[180ms] ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-v2-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-v2-paper disabled:opacity-50";

/* Pill (2026-08-24, decisão da Catarina): cantos totalmente redondos
   nos botões, o gesto da Parsley. A sombra dourada suave no primary dá
   o relevo "clicável" que o retângulo plano não tinha. */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-v2-golden text-v2-paper hover:bg-v2-golden-deep px-7 py-3.5 uppercase tracking-[0.16em] rounded-full shadow-[0_10px_28px_-10px_rgba(154,123,83,0.55)] hover:shadow-[0_14px_32px_-10px_rgba(154,123,83,0.65)] transition-[background-color,box-shadow,transform] hover:-translate-y-px",
  ghost:
    "bg-transparent text-v2-ink border border-v2-ink/15 hover:border-v2-ink/40 px-7 py-3.5 uppercase tracking-[0.16em] rounded-full",
  link:
    "bg-transparent text-current underline-offset-4 hover:underline px-0 py-0",
};

/* Uma escala só para todo o site (2026-10-06, pedido da Catarina: o
   "Agendar consulta" do menu estava grande demais e os botões não eram
   todos iguais). default = 12px; sm = menu; lg = fecho de página. */
const sizeClasses: Record<Size, string> = {
  sm: "text-[11px] px-5 py-2.5 tracking-[0.14em]",
  default: "text-[12px]",
  lg: "text-[13px] px-8 py-4",
};

export const ButtonV2 = (props: Props) => {
  const { variant = "primary", size = "default", className, children } = props;
  const cls = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
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
