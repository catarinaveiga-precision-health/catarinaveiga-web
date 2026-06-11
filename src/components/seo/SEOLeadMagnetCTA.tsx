import { Link } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";

interface SEOLeadMagnetCTAProps {
  label?: string;
  title?: string;
  body?: string;
  buttonText?: string;
  buttonTo?: string;
  note?: string;
}

const SEOLeadMagnetCTA = ({
  label = "Guia gratuito",
  title = "Porque tem fome pouco depois de comer?",
  body = "Se a fome volta uma ou duas horas depois do pequeno-almoço, o problema raramente é falta de disciplina: é fisiologia. Preparei um guia que explica como funciona a saciedade, os erros mais comuns que aumentam a fome e inclui 29 receitas ricas em proteína para manhãs com energia estável.",
  buttonText = "Receber o guia gratuito",
  buttonTo = "/guia-saciedade",
  note = "Gratuito · PDF · 29 receitas ricas em proteína",
}: SEOLeadMagnetCTAProps) => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-almond py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          {label}
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-8">
          {title}
        </h2>
        <p className="font-sans font-light text-foreground/70 text-[17px] leading-[1.85] mb-12 max-w-2xl">
          {body}
        </p>
        <Link
          to={buttonTo}
          className="inline-block bg-eclipse text-white font-sans text-sm font-normal tracking-wide px-10 py-4 rounded-sm hover:bg-eclipse/90 transition-colors"
        >
          {buttonText}
        </Link>
        <p className="font-sans text-foreground/40 text-xs mt-6">{note}</p>
      </div>
    </section>
  );
};

export default SEOLeadMagnetCTA;
