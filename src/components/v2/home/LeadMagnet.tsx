import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";

const reportRows = [
  { marker: "TSH", value: "2,8 mUI/L", ref: "0,4 – 4,0", optimal: "1,0 – 2,0", flag: true },
  { marker: "Ferritina", value: "18 ng/mL", ref: "15 – 150", optimal: "60 – 90", flag: true },
  { marker: "Vitamina D", value: "22 ng/mL", ref: "20 – 50", optimal: "50 – 80", flag: true },
  { marker: "B12", value: "315 pg/mL", ref: "200 – 900", optimal: "500 – 900", flag: true },
  { marker: "PCR", value: "1,2 mg/L", ref: "< 5,0", optimal: "< 1,0", flag: true },
];

export const LeadMagnet = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Texto · col esq */}
        <FadeUp className="lg:col-span-6">
          <Eyebrow>Antes de marcares consulta</Eyebrow>

          <h2 className="mt-8 font-serif font-light text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[18ch]">
            Vê primeiro o que dizem os teus marcadores.
          </h2>

          <p className="mt-10 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[44ch]">
            Há uma diferença entre <span className="italic">dentro dos intervalos</span> e <span className="italic">em funcionamento óptimo</span>. Esta ferramenta permite-te introduzir até 15 biomarcadores e receber uma leitura funcional imediata, com PDF descarregável.
          </p>

          <div className="mt-12">
            <ButtonV2 as="Link" to="/avaliacao" size="lg">
              Ver os meus marcadores em 2 minutos
            </ButtonV2>
            <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.18em] text-v2-graffiti">
              Gratuito · sem consulta · interpretação imediata
            </p>
          </div>
        </FadeUp>

        {/* Mockup editorial PDF · col dir */}
        <FadeUp className="lg:col-span-6" delay={0.15}>
          <div className="relative">
            {/* Sombra editorial subtil */}
            <div
              className="bg-v2-paper border border-v2-paper-line p-10 lg:p-12"
              style={{
                boxShadow:
                  "rgba(31, 36, 34, 0.04) 0 1px 0 0, rgba(31, 36, 34, 0.06) 0 8px 24px -8px",
              }}
            >
              {/* Header do relatório */}
              <div className="flex items-center justify-between pb-6 border-b border-v2-paper-line">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-v2-graffiti">
                    Relatório funcional
                  </p>
                  <p className="mt-1 font-serif text-base text-v2-ink">
                    Leitura integrada de biomarcadores
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-graffiti">
                    Confidencial
                  </p>
                </div>
              </div>

              {/* Tabela de marcadores */}
              <div className="mt-8 space-y-5">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-6 pb-3 border-b border-v2-paper-line">
                  <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-graffiti">
                    Marcador
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-graffiti text-right">
                    Valor
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-graffiti text-right hidden sm:block">
                    Ref.
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-golden text-right">
                    Óptimo
                  </p>
                </div>

                {reportRows.map((r) => (
                  <div
                    key={r.marker}
                    className="grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          r.flag ? "bg-v2-brick" : "bg-v2-sage"
                        }`}
                      />
                      <p className="font-serif text-base text-v2-ink">{r.marker}</p>
                    </div>
                    <p className="font-sans text-sm text-v2-ink text-right tabular-nums">
                      {r.value}
                    </p>
                    <p className="font-sans text-xs text-v2-graffiti text-right tabular-nums hidden sm:block">
                      {r.ref}
                    </p>
                    <p className="font-sans text-xs text-v2-golden text-right tabular-nums">
                      {r.optimal}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer do relatório */}
              <div className="mt-10 pt-6 border-t border-v2-paper-line">
                <p className="font-sans italic text-xs text-v2-ink-mute leading-[1.6]">
                  Os marcadores assinalados indicam padrão funcional sub-óptimo.
                  Recomenda-se leitura integrada do quadro clínico.
                </p>
              </div>
            </div>

            {/* Tag flutuante */}
            <div className="absolute -top-3 right-8 bg-v2-paper border border-v2-paper-line px-4 py-2">
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-graffiti">
                Exemplo · ilustrativo
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
