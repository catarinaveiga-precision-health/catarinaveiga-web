import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/* A experiência de cuidado, adaptada da "Your Complete Care experience"
   da Parsley: a secção que mostra que isto é acompanhamento clínico,
   não um serviço de leitura de análises. Conteúdo verificado com o
   modelo real de trabalho da Catarina: consulta longa, plano escrito
   (alimentar, suplementação, ritmo circadiano), consultas de seguimento
   disponíveis na página de marcação. Sem CTA própria: a página tem uma. */

const pilares = [
  {
    n: "01",
    t: "És ouvida a sério",
    d: "Noventa minutos para a história completa. Sem resumir anos de sintomas a uma queixa, sem olhar para o relógio.",
  },
  {
    n: "02",
    t: "Vamos mais fundo",
    d: "As tuas análises, incluindo as antigas, lidas em conjunto e com intervalos funcionais. O padrão importa mais do que cada valor sozinho.",
  },
  {
    n: "03",
    t: "Um plano só teu",
    d: "Alimentação, suplementação quando faz sentido, ritmo circadiano, sono e stress. Por escrito, com prioridades e ordem.",
  },
  {
    n: "04",
    t: "Não ficas sozinha",
    d: "Há consultas de seguimento para ajustar o plano à tua evolução. O corpo responde com tempo, e o plano acompanha-o.",
  },
];

export const CuidadoContinuo = () => (
  <Section bg="moss">
    <Container size="default">
      <FadeUp>
        <Eyebrow tone="paper">Mais do que análises</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-paper leading-[1.15] tracking-[-0.01em] max-w-[26ch]">
          A leitura é o ponto de partida. O acompanhamento é o trabalho.
        </h2>
      </FadeUp>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {pilares.map((p, i) => (
          <FadeUp key={p.n} delay={i * 0.08}>
            <div className="border-t border-v2-paper/25 pt-6">
              <span className="font-serif text-[1.4rem] text-v2-golden tabular-nums">
                {p.n}
              </span>
              <h3 className="mt-4 font-serif text-h3-v2 text-v2-paper leading-[1.25]">
                {p.t}
              </h3>
              <p className="mt-4 font-sans text-body-sm-v2 text-v2-paper/75 leading-[1.65]">
                {p.d}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
