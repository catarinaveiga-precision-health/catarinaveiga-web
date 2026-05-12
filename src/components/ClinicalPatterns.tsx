import { useFadeUp } from "@/hooks/useFadeUp";

const cases = [
  {
    sintomas: "Fadiga persistente · queda de cabelo · exames normais",
    marcadores: "Ferritina 18 · TSH 3.1 · Vitamina D 22",
    leitura: "Padrão de ferro funcionalmente baixo com cofactores tiroideus em défice — apesar dos valores estarem no 'normal' laboratorial.",
  },
  {
    sintomas: "Insónia · peso estagnado · irritabilidade",
    marcadores: "Insulina 14 · PCR 3.2 · Homocisteína 12",
    leitura: "Sinal precoce de resistência à insulina com inflamação subclínica de fundo. Frequente na perimenopausa.",
  },
  {
    sintomas: "Cansaço pós-prandial · nevoeiro mental · irregularidades de ciclo",
    marcadores: "Glicose 98 · TSH 3.8 · B12 baixo-normal",
    leitura: "Disregulação glicémica + tiroide subclínica + cofactor B12 abaixo do óptimo. Padrão que pede contexto antes de protocolo.",
  },
];

const ClinicalPatterns = () => {
  const ref = useFadeUp();

  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="fade-up label-uppercase text-amber mb-4">Leitura funcional</p>
          <h2 className="fade-up font-serif text-4xl md:text-5xl text-foreground">
            Padrões que aparecem em consulta
          </h2>
          <p className="fade-up text-muted-foreground text-[15px] font-sans max-w-2xl mx-auto mt-4 leading-relaxed">
            Exemplos ilustrativos de como leio combinações de sintomas e marcadores. Não são casos identificáveis nem promessas de resultado.
          </p>
        </div>

        <div className="fade-up grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className="bg-background p-6 border border-border"
            >
              <p className="label-uppercase text-amber text-[11px] mb-5">Padrão {i + 1}</p>

              <div className="mb-4">
                <p className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-1">Sintomas</p>
                <p className="font-sans text-foreground text-[15px] leading-relaxed">{c.sintomas}</p>
              </div>

              <div className="mb-4">
                <p className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-1">Marcadores</p>
                <p className="font-sans text-foreground text-[15px] leading-relaxed">{c.marcadores}</p>
              </div>

              <div className="w-full h-px bg-border my-4" />

              <div>
                <p className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-1">Leitura</p>
                <p className="font-sans text-foreground/85 text-[14px] leading-relaxed">{c.leitura}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="fade-up text-center text-muted-foreground text-[11px] font-sans mt-8 max-w-2xl mx-auto leading-relaxed">
          A leitura clínica oficial de análises é da Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos. Estes exemplos descrevem padrões de observação no âmbito da Medicina Tradicional Chinesa.
        </p>
      </div>
    </section>
  );
};

export default ClinicalPatterns;
