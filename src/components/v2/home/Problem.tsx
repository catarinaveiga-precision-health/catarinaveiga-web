import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";
import { LabReportDoc } from "../clinical/LabReportDoc";

/* Redesenho de 2026-08-24 a pedido da Catarina: a lista anterior era
   itálico cinzento com travessões, "uma coisa morta". Passa a citações
   com aspas grandes em sage e serif regular escuro, em escala de
   leitura, não de rodapé.

   A copy vem dos 191 formulários de admissão reais (Google Forms),
   agregada e anonimizada: peso, cansaço e energia são as queixas mais
   repetidas, e à pergunta "quando foi a última vez que se sentiu bem?"
   as respostas mais comuns são "não me lembro" e "há muito tempo".
   Esse achado fecha a secção. Nenhuma frase é atribuível a uma
   paciente concreta. */

const vozes = [
  "Fiz análises e disseram que estava tudo normal.",
  "Continuo cansada mesmo depois de dormir.",
  "Falta de energia. Cansaço mental.",
  "Ganhei peso sem perceber porquê.",
  "Ando sempre inchada.",
  "Sei que algo não está bem, mas ninguém liga as peças.",
];

export const Problem = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp>
        <Eyebrow>Porque chegam até mim</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[26ch]">
          As mesmas frases, consulta após consulta.
        </h2>
      </FadeUp>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <ul className="space-y-9 max-w-[50ch]">
            {vozes.map((v, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <li className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 -top-2 font-serif text-[2.6rem] leading-none text-v2-sage select-none"
                  >
                    “
                  </span>
                  <span className="font-serif text-[clamp(1.25rem,1.8vw,1.55rem)] text-v2-ink leading-[1.4] tracking-[-0.005em]">
                    {v}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>

        <FadeUp className="lg:col-span-5 lg:col-start-8" delay={0.2}>
          <LabReportDoc />
        </FadeUp>
      </div>
    </Container>

    {/* O achado dos formulários, em bloco próprio: a pergunta e as duas
        respostas que mais se repetem. Verdade literal dos dados dela. */}
    <Container size="prose" className="mt-24">
      <FadeUp className="text-center border-t border-v2-paper-line pt-16">
        <p className="font-sans text-mono-v2 uppercase tracking-[0.16em] text-v2-ink-mute">
          Do meu questionário de primeira consulta
        </p>
        <p className="mt-8 font-serif text-display-2 text-v2-ink leading-[1.12] tracking-[-0.015em]">
          "Quando foi a última vez que te sentiste bem?"
        </p>
        <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.6] max-w-[54ch] mx-auto">
          As duas respostas que mais leio:{" "}
          <span className="font-serif italic text-v2-ink">"não me lembro"</span>{" "}
          e{" "}
          <span className="font-serif italic text-v2-ink">"há muito tempo"</span>.
          Se a tua resposta se parece com estas, é exatamente por aí que a
          primeira consulta começa.
        </p>
      </FadeUp>
    </Container>
  </Section>
);
