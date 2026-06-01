import { Container } from "../ui/Container";
import { FadeUp } from "../motion/FadeUp";

const institutions = [
  "Omnos Academy",
  "Regenerus Labs",
  "IHCAN",
  "Longevity Med Summit",
  "Osteoform",
  "Lowed",
  "PFTA",
  "Escola de Saúde Avançada",
];

export const CredibilityBand = () => (
  <section className="bg-v2-paper py-20 md:py-24 border-y border-v2-paper-line">
    <Container size="default">
      <FadeUp className="text-center">
        <p className="font-mono text-mono-v2 text-v2-sage uppercase tracking-[0.18em] max-w-[58ch] mx-auto leading-[1.8]">
          Instituto Van Nghi Portugal  ·  Cédula ACSS  ·  Quatro anos no
          Departamento de Microbioma da Regenerus Labs  ·  Longevity Med
          Summit 2024  ·  20 anos de prática clínica
        </p>
      </FadeUp>

      <FadeUp className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3" delay={0.1}>
        {institutions.map((inst, i) => (
          <span
            key={inst}
            className="font-body text-body-sm-v2 uppercase tracking-[0.14em] text-v2-ink-mute"
          >
            {inst}
            {i < institutions.length - 1 && (
              <span className="ml-10 text-v2-paper-line">·</span>
            )}
          </span>
        ))}
      </FadeUp>
    </Container>
  </section>
);
