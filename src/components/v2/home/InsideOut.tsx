import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";
import { acuityUrl } from "@/lib/acuity";

/**
 * Secção 5 do Story Framework: INSIDE-OUT.
 * "Se não estás a vender o suficiente, não estás a contar às pessoas em
 * detalhe suficiente." Mostra-se tudo o que está dentro, sem reservas:
 * o que acontece antes, durante e depois, e o que fica na mão da pessoa.
 */
const passos = [
  {
    k: "Antes",
    t: "Recebes um questionário",
    d: "Chega por email quando marcas. Perguntas sobre o histórico, o sono, a digestão, a energia e o ciclo. Se tiveres análises, envias, mesmo as antigas. Se não tiveres, não é impedimento.",
  },
  {
    k: "Antes",
    t: "Leio tudo antes de te ver",
    d: "Chego à consulta com as tuas análises já lidas e com as perguntas preparadas. O tempo da consulta não se gasta a pôr-me a par.",
  },
  {
    k: "Durante",
    t: "Noventa minutos, sem relógio à vista",
    d: "Contas a história toda, sem a resumires a uma queixa. Olhamos para o histórico, sono, digestão, energia, ciclo, sintomas e contexto de vida.",
  },
  {
    k: "Durante",
    t: "Releio os valores contigo",
    d: "Cada marcador à luz dos outros, com intervalos funcionais e não apenas os de referência. Se faltar um painel que o laboratório de rotina não faz, sou praticante registada na Regenerus Labs e na Nordic Labs e é por aí que se pede.",
  },
  {
    k: "Depois",
    t: "Fica-te um plano escrito",
    d: "Hipóteses, prioridades e próximos passos, por escrito. É teu, e podes levá-lo ao teu médico.",
  },
  {
    k: "Depois",
    t: "Se for preciso médico, digo-o",
    d: "Não diagnostico nem prescrevo. Quando o quadro exige uma dessas coisas, digo-o com clareza e encaminho.",
  },
];

export const InsideOut = () => (
  <Section bg="paper">
    <Container size="default">
      <FadeUp>
        <Eyebrow>Sem surpresas</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[26ch]">
          Tudo o que acontece, do primeiro email ao plano escrito.
        </h2>
      </FadeUp>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {passos.map((p, i) => (
          <FadeUp key={p.t} delay={(i % 2) * 0.08}>
            <div className="border-t-2 border-v2-sage/40 pt-6">
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-v2-sage">
                {p.k}
              </span>
              <h3 className="mt-4 font-serif text-h3-v2 text-v2-ink leading-[1.3]">
                {p.t}
              </h3>
              <p className="mt-4 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.7]">
                {p.d}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.15} className="mt-16 flex flex-col items-start gap-4">
        <ButtonV2 as="a" href={acuityUrl("inside-out")} size="lg">
          Marcar consulta inicial · 120 €
        </ButtonV2>
        <p className="font-sans text-body-sm-v2 text-v2-ink-mute">
          90 minutos, online. Resposta em 48 horas úteis.
        </p>
      </FadeUp>
    </Container>
  </Section>
);
