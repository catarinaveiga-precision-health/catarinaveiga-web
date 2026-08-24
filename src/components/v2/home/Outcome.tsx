import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";
import { RangeDiagram } from "../clinical/RangeDiagram";

/* A tese, compactada a pedido da Catarina (2026-08-24): era um ecrã
   inteiro com título em tamanho de hero e o gráfico empilhado por baixo.
   Passa a duas colunas, texto e prova visual lado a lado, metade da
   altura, sem perder a ideia que prepara a matriz comparativa. */

export const Outcome = () => (
  <Section bg="paper" tight>
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <FadeUp className="lg:col-span-5">
          <Eyebrow>A tese</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
            Não é sobre fazer mais exames.
            <span className="block mt-3 italic text-v2-ink-mute">
              É sobre ler bem os que já tens.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.12} className="lg:col-span-7">
          <RangeDiagram />
        </FadeUp>
      </div>
    </Container>
  </Section>
);
