import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

const rows = [
  ["Foco no valor isolado", "Foco no padrão integrado"],
  ["Intervalos populacionais", "Intervalos adaptados ao contexto"],
  ["Resposta sintomática", "Resposta longitudinal"],
  ["Pontual", "Continuada"],
];

export const Comparison = () => (
  <Section bg="paper-deep">
    <Container size="prose">
      <FadeUp>
        <Eyebrow>Leituras complementares</Eyebrow>
        <h2 className="mt-6 font-display text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
          Diferentes formas de olhar para o mesmo quadro clínico.
        </h2>
        <p className="mt-8 font-body text-body-lg-v2 text-v2-ink-mute leading-[1.55]">
          A leitura convencional e a leitura funcional respondem a perguntas
          diferentes. Não se opõem. Complementam-se quando integradas.
        </p>
      </FadeUp>

      <FadeUp className="mt-20" delay={0.1}>
        <div className="grid grid-cols-2 gap-px bg-v2-paper-line">
          <div className="bg-v2-paper-deep pb-6">
            <p className="font-mono text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
              Leitura convencional
            </p>
          </div>
          <div className="bg-v2-paper-deep pb-6 pl-8">
            <p className="font-mono text-mono-v2 uppercase tracking-[0.14em] text-v2-terracotta">
              Leitura funcional
            </p>
          </div>

          {rows.map((r, i) => (
            <>
              <div
                key={`l-${i}`}
                className="bg-v2-paper-deep py-6 font-body text-body-v2 text-v2-ink-mute border-t border-v2-paper-line"
              >
                {r[0]}
              </div>
              <div
                key={`r-${i}`}
                className="bg-v2-paper-deep py-6 pl-8 font-body text-body-v2 text-v2-ink border-t border-v2-paper-line"
              >
                {r[1]}
              </div>
            </>
          ))}
        </div>
      </FadeUp>
    </Container>
  </Section>
);
