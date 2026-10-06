import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Peças partilhadas pelas versões da página Sobre */

const ease = [0.22, 1, 0.36, 1] as const;

/* Grão de papel, fixo e sem eventos, por cima de tudo */
export const GRAO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

/* Texto que falta, visível na pré-visualização para a Catarina preencher */
export const Falta = ({ children }: { children: string }) => (
  <span className="inline rounded-sm px-1.5 py-0.5 font-sans text-[0.85em] italic [background-color:color-mix(in_srgb,var(--v2-golden)_45%,transparent)]">
    [falta: {children}]
  </span>
);

/* Etiqueta em pílula antes dos títulos */
export const Pill = ({ children, light }: { children: string; light?: boolean }) => (
  <span
    className={cn(
      "inline-block rounded-full px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em]",
      light
        ? "[background-color:color-mix(in_srgb,var(--v2-paper)_14%,transparent)] [color:color-mix(in_srgb,var(--v2-paper)_85%,transparent)]"
        : "[background-color:color-mix(in_srgb,var(--v2-sage)_12%,transparent)] text-v2-sage",
    )}
  >
    {children}
  </span>
);

/* Moldura dupla para fotografia: tabuleiro exterior e imagem interior */
export const Moldura = ({ src, alt, rotate = 0, falta, aspect = "4/5" }: { src?: string; alt?: string; rotate?: number; falta?: string; aspect?: "4/5" | "1/1" }) => {
  const md = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  return (
  <motion.div
    className="w-full max-w-[380px]"
    initial={{ opacity: 0, y: 50, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: md ? rotate : 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease }}
  >
    <div className="rounded-[1.25rem] p-2 ring-1 [--tw-ring-color:color-mix(in_srgb,var(--v2-sage)_18%,transparent)] [background-color:color-mix(in_srgb,var(--v2-golden)_30%,var(--v2-paper))] shadow-[0_30px_60px_-30px_rgba(22,53,44,0.35)]">
      <div className={cn("relative overflow-hidden rounded-[calc(1.25rem-0.5rem)] bg-v2-paper-deep", aspect === "1/1" ? "aspect-square" : "aspect-[4/5]")}>
        {src ? (
          <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center [background:radial-gradient(90%_80%_at_50%_35%,color-mix(in_srgb,var(--v2-sage)_34%,transparent),color-mix(in_srgb,var(--v2-sage)_10%,transparent))]">
            <span aria-hidden className="font-serif text-[40px] leading-none text-v2-sage">◇</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-v2-sage">Fotografia</span>
            <span className="font-serif italic text-[19px] leading-[1.3] text-v2-ink-mute">{falta}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
  );
};
