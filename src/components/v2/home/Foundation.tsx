import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { Divider } from "../ui/Divider";
import { FadeUp } from "../motion/FadeUp";

const forWhom = [
  "continuam sintomáticas apesar de exames “normais”",
  "sentem alterações hormonais e metabólicas sem resposta clara",
  "vivem há demasiado tempo em compensação fisiológica",
  "precisam de acompanhamento contínuo e não apenas orientação pontual",
];

const includes = [
  {
    title: "Consulta inicial · 90 min",
    body: "Anamnese aprofundada, leitura de exames anteriores, hipóteses clínicas escritas.",
  },
  {
    title: "Pedido personalizado de análises",
    body: "Painel ajustado ao caso (15 a 30 biomarcadores). Pedido em PDF para o laboratório.",
  },
  {
    title: "Consulta de devolução · 60 min",
    body: "~3 semanas depois. Leitura integrada, identificação de padrões, plano dos 3 meses.",
  },
  {
    title: "3 revisões mensais · 45 min",
    body: "Ajustes, novas hipóteses, aprofundamento conforme evolução.",
  },
  {
    title: "Suporte assíncrono · Maya",
    body: "Agente educativo para dúvidas operacionais entre consultas.",
  },
  {
    title: "Reavaliação final · 3 meses",
    body: "Painel comparativo. Leitura objectiva do que mudou.",
  },
  {
    title: "Materiais escritos",
    body: "Plano alimentar, suplementação dirigida, rotina circadiana, protocolos.",
  },
];

export const Foundation = () => (
  <Section bg="paper-deep" id="fundacao">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <FadeUp className="lg:col-span-5">
          <Eyebrow>Fundação</Eyebrow>
          <h2 className="mt-6 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
            O primeiro ciclo de reorganização clínica.
          </h2>
          <p className="mt-10 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[42ch]">
            Criado para mulheres que:
          </p>
          <ul className="mt-6 space-y-4">
            {forWhom.map((w, i) => (
              <li
                key={i}
                className="font-sans text-body-v2 text-v2-ink leading-[1.65] pl-6 relative"
              >
                <span className="absolute left-0 top-[0.65em] w-2 h-px bg-v2-sage" />
                {w}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
            O que está incluído · 3 meses
          </p>
          <ul className="mt-10 space-y-8">
            {includes.map((item, i) => (
              <li key={i}>
                <h3 className="font-serif text-h3-v2 text-v2-ink leading-[1.3]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-body-v2 text-v2-ink-mute leading-[1.65]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>

      <FadeUp className="mt-32 lg:mt-40 flex justify-center" delay={0.15}>
        <Divider />
      </FadeUp>

      <FadeUp className="mt-16 mx-auto max-w-[58ch] text-center" delay={0.2}>
        <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
          Porquê 3 meses
        </p>
        <p className="mt-6 font-sans text-body-lg-v2 text-v2-ink leading-[1.6]">
          O corpo precisa de tempo para responder. O sistema hormonal demora
          6 a 8 semanas a reagir a intervenções. A neuroplasticidade exige
          repetição consistente. Três meses é o mínimo para uma leitura
          comparativa robusta. Não é um número arbitrário — é fisiologia.
        </p>
      </FadeUp>

      <FadeUp className="mt-24 text-center" delay={0.25}>
        <p className="font-serif text-display-2 text-v2-terracotta leading-none">
          €800
        </p>
        <p className="mt-3 font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-ink-mute">
          3 meses · acompanhamento contínuo
        </p>
        <p className="mt-6 font-sans text-body-sm-v2 text-v2-ink-mute max-w-[44ch] mx-auto">
          Entrada apenas após consulta inicial e avaliação de enquadramento
          clínico.
        </p>
        <div className="mt-10">
          <ButtonV2 as="Link" to="/candidatura" size="lg">
            Candidatar-me ao Fundação
          </ButtonV2>
        </div>
      </FadeUp>
    </Container>
  </Section>
);
