import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

const steps = [
  {
    n: "01",
    title: "Avaliação inicial",
    body: "Histórico clínico, sintomas, ciclo, sono, digestão, energia e contexto fisiológico.",
  },
  {
    n: "02",
    title: "Leitura de padrões",
    body: "Interpretação integrada de sinais, sintomas e biomarcadores funcionais.",
  },
  {
    n: "03",
    title: "Plano individualizado",
    body: "Intervenções adaptadas ao teu padrão e fase de vida.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    body: "Reavaliação contínua e ajustes ao longo do processo.",
  },
];

export const Method = () => (
  <Section bg="paper">
    <Container size="default">
      <FadeUp className="text-center">
        <Eyebrow>Como trabalho</Eyebrow>
        <h2 className="mt-6 font-display text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
          Leio antes de propor.
        </h2>
        <p className="mt-8 mx-auto font-body text-body-lg-v2 text-v2-ink-mute leading-[1.55] max-w-[58ch]">
          Avalio, interpreto e acompanho. Trabalho a partir dos teus sinais,
          do teu histórico e dos teus padrões — e a partir daí construo um
          plano individualizado, com acompanhamento longitudinal.
        </p>
      </FadeUp>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-x-12">
        {steps.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.06}>
            <p className="font-mono text-mono-v2 text-v2-sage uppercase tracking-[0.08em]">
              {s.n}
            </p>
            <h3 className="mt-5 font-display text-h3-v2 text-v2-ink leading-[1.25]">
              {s.title}
            </h3>
            <p className="mt-4 font-body text-body-v2 text-v2-ink-mute leading-[1.65] max-w-[34ch]">
              {s.body}
            </p>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
