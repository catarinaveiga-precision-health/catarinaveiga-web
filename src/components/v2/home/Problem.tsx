import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Divider } from "../ui/Divider";
import { Quote } from "../ui/Quote";
import { FadeUp } from "../motion/FadeUp";

const quotes = [
  "Fiz os exames e disseram-me que estava tudo normal. Mas continuo cansada mesmo dormindo.",
  "O meu corpo não responde como antes. Como se algo tivesse mudado e ninguém me soubesse explicar.",
  "Já tentei vários médicos, vários suplementos, várias dietas. Nada funcionou de forma duradoura.",
  "Sei que algo está errado. Mas todos os exames dão dentro dos intervalos.",
];

export const Problem = () => (
  <Section bg="paper-deep">
    <Container size="prose">
      <FadeUp className="text-center">
        <Eyebrow>Reconheces isto?</Eyebrow>
      </FadeUp>

      <div className="mt-16 space-y-12">
        {quotes.map((q, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <Quote className="text-center mx-auto">{q}</Quote>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-20 flex justify-center">
        <Divider />
      </FadeUp>

      <FadeUp className="mt-12 text-center" delay={0.15}>
        <p className="font-display text-h2-v2 italic text-v2-ink leading-[1.2] max-w-[34ch] mx-auto">
          Se duas ou mais destas frases são tuas, provavelmente o problema
          não está nos teus exames.
          <span className="block mt-4 not-italic font-display">
            Está na forma como foram lidos.
          </span>
        </p>
      </FadeUp>
    </Container>
  </Section>
);
