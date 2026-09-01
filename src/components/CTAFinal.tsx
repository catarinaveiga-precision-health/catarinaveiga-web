import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";

const CTAFinal = () => {
  const ref = useFadeUp();

  return (
    <section ref={ref} className="bg-dark section-padding" style={{ backgroundColor: "#1F1A14" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-ivory mb-6 leading-tight">
          Os teus exames podem estar normais.<br />Mas o teu corpo pode estar a pedir atenção.
        </h2>
        <p className="fade-up text-ivory/60 font-sans font-light mb-10 max-w-xl mx-auto">
          Muitas mulheres chegam à consulta depois de anos a ouvir que está tudo bem.
        </p>
        <div className="fade-up mb-4">
          <Button variant="heroAccent" size="lg" asChild>
            <a href="https://catarinaveigaagendamento.as.me/" target="_blank" rel="noopener noreferrer">
              Marcar Consulta Inicial
            </a>
          </Button>
        </div>
        <p className="fade-up text-ivory/40 text-sm font-sans font-light">
          Consulta online · 90 minutos · análise completa de sintomas e biomarcadores
        </p>
      </div>
    </section>
  );
};

export default CTAFinal;
