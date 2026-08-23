import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/**
 * Reversão de risco, imediatamente antes do CTA final.
 *
 * Modelo: a "Bodylogics Promise" (bodylogics.co.uk), a única promessa deste
 * género encontrada em 213 sites de praticantes no Reino Unido e nos EUA.
 * Promete entregáveis, não resultado clínico, e por isso não obriga a
 * devolver dinheiro nem a prometer cura.
 *
 * Duas adaptações obrigatórias face ao original:
 * - "a clear diagnosis" NÃO pode ser usado: diagnóstico é ato médico e a
 *   Catarina não é médica. Passa a hipótese de trabalho, dito por extenso.
 * - "an expected timeframe for recovery" também não: implica prometer
 *   recuperação. Passa a ordem de prioridades e reavaliação.
 * Mantém-se a frase mais forte do original, "no vague answers, no false
 * promises", que aqui vira virtude: onde não sabe, diz que não sabe.
 */
const coisas = [
  {
    t: "Uma leitura do que se está a passar contigo",
    d: "Não um diagnóstico, que isso é ato médico e não é o meu trabalho. Uma hipótese explicada por palavras que percebes, e o que a sustenta.",
  },
  {
    t: "Porque é que chegaste aqui",
    d: "O que se foi somando ao longo dos anos até dar nisto. É a parte que quase ninguém tem tempo para te explicar.",
  },
  {
    t: "Por que ordem se trata, e o que esperar",
    d: "Sem respostas vagas e sem promessas falsas. Onde não souber, digo que não sei, e digo o que é preciso para saber.",
  },
  {
    t: "Um plano escrito que fica contigo",
    d: "Não são notas minhas. É um documento teu, que podes levar ao teu médico.",
  },
];

export const Promessa = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp>
        <Eyebrow>A minha promessa</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[24ch]">
          No fim dos 90 minutos sais sempre com quatro coisas.
        </h2>
      </FadeUp>

      <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {coisas.map((c, i) => (
          <FadeUp key={c.t} delay={(i % 2) * 0.08}>
            <li className="flex gap-6">
              <span
                aria-hidden
                className="shrink-0 font-serif text-[1.6rem] leading-none text-v2-sage tabular-nums pt-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-h3-v2 text-v2-ink leading-[1.3]">
                  {c.t}
                </h3>
                <p className="mt-3 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.7]">
                  {c.d}
                </p>
              </div>
            </li>
          </FadeUp>
        ))}
      </ol>
    </Container>
  </Section>
);
