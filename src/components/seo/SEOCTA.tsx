import { Link } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";

interface SEOCTAProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonTo?: string;
  note?: string;
}

const SEOCTA = ({
  title,
  subtitle,
  buttonText = "Começar avaliação funcional",
  buttonTo = "/avaliacao",
  note = "Gratuita · 14 biomarcadores · leitura imediata",
}: SEOCTAProps) => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-eclipse py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto text-center fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-white leading-snug mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="font-sans font-normal text-white/50 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <Link
          to={buttonTo}
          className="inline-block bg-white text-eclipse font-sans text-sm font-normal tracking-wide px-10 py-4 rounded-sm hover:bg-white/90 transition-colors"
        >
          {buttonText}
        </Link>
        {note && (
          <p className="font-sans text-white/30 text-xs mt-6">{note}</p>
        )}
        <p className="font-sans text-white/20 text-[11px] mt-10 max-w-xl mx-auto leading-relaxed">
          Esta página tem fins educativos e não constitui diagnóstico médico.
        </p>
      </div>
    </section>
  );
};

export default SEOCTA;
