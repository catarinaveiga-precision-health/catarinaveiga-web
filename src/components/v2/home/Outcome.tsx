import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

export const Outcome = () => (
  <Section bg="paper">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <FadeUp className="lg:col-span-7 lg:col-start-1">
          <Eyebrow>O que muda quando lemos bem</Eyebrow>

          <h2 className="mt-8 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
            Acordar com energia<br />
            que não vem do café.
            <span className="block mt-6 italic text-v2-ink-mute">
              Saber que o problema é real<br />e tem causa.
            </span>
            <span className="block mt-6">
              Ter um mapa,<br />não mais sintomas.
            </span>
          </h2>
        </FadeUp>

        <FadeUp className="lg:col-span-4 lg:col-start-9 self-end" delay={0.15}>
          <div className="space-y-6 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[420px]">
            <p>
              Não é sobre fazer mais exames. É sobre ler bem os que já tens.
            </p>
            <p>
              Identificar padrões funcionais e perceber onde está a peça em
              falta.
            </p>
            <p>
              A maioria das mulheres que acompanho tinha análises “normais”
              há anos. O que mudou não foram os valores. Foi a leitura.
            </p>
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
