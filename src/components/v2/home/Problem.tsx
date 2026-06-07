import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Divider } from "../ui/Divider";
import { FadeUp } from "../motion/FadeUp";

const reasons = [
  "Fiz análises e disseram que estava tudo normal.",
  "Continuo cansada mesmo depois de dormir.",
  "O meu ciclo mudou.",
  "Ganhei peso sem perceber porquê.",
  "Sinto que algo mudou no meu corpo.",
  "Já tentei várias abordagens sem resultados duradouros.",
  "Sei que algo não está bem, mas ninguém consegue ligar as peças.",
];

export const Problem = () => (
  <Section bg="paper-deep">
    <Container size="prose">
      <FadeUp className="text-center">
        <Eyebrow>Porque chegam até mim</Eyebrow>
      </FadeUp>

      <ul className="mt-16 space-y-6 max-w-[60ch] mx-auto">
        {reasons.map((r, i) => (
          <FadeUp key={i} delay={i * 0.05}>
            <li className="flex items-start gap-5 font-serif italic text-body-lg-v2 text-v2-ink leading-[1.5]">
              <span aria-hidden className="mt-[0.6em] w-3 h-px bg-v2-sage shrink-0" />
              <span>{r}</span>
            </li>
          </FadeUp>
        ))}
      </ul>

      <FadeUp className="mt-20 flex justify-center">
        <Divider />
      </FadeUp>

      <FadeUp className="mt-12 text-center" delay={0.15}>
        <p className="font-serif text-h2-v2 italic text-v2-ink leading-[1.2] max-w-[40ch] mx-auto">
          Muitas vezes o problema não está nos exames.
          <span className="block mt-4 not-italic font-serif">
            Está na forma como a história foi lida.
          </span>
        </p>
      </FadeUp>
    </Container>
  </Section>
);
