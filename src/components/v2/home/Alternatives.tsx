import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";
import { ButtonV2 } from "../ui/ButtonV2";

const cards = [
  {
    label: "Consulta inicial",
    price: "€120",
    body: "60–90 minutos de anamnese aprofundada, leitura de exames anteriores e hipóteses clínicas escritas. Sem compromisso de continuidade.",
    cta: { label: "Marcar consulta", href: "https://catarinaveigaagendamento.as.me/" },
  },
  {
    label: "Revisão de análises",
    price: "Sob consulta",
    body: "Já tens análises feitas. Envias os teus biomarcadores e recebes uma leitura funcional integrada com padrões identificados e contexto clínico.",
    cta: { label: "Saber mais", href: "#contacto" },
  },
];

export const Alternatives = () => (
  <Section bg="paper">
    <Container size="default">
      <FadeUp className="text-center">
        <Eyebrow>Antes do Fundação</Eyebrow>
        <h2 className="mt-6 font-display text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
          Nem todos os casos precisam de acompanhamento contínuo.
        </h2>
      </FadeUp>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {cards.map((c, i) => (
          <FadeUp key={c.label} delay={i * 0.08}>
            <div className="border-t border-v2-paper-line pt-10">
              <p className="font-mono text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
                {c.label}  ·  {c.price}
              </p>
              <p className="mt-8 font-body text-body-v2 text-v2-ink leading-[1.7] max-w-[44ch]">
                {c.body}
              </p>
              <div className="mt-10">
                <ButtonV2 as="a" href={c.cta.href} variant="ghost">
                  {c.cta.label}
                </ButtonV2>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
