import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

export const Outcome = () => (
  <Section bg="paper">
    <Container size="prose" className="text-center">
      <FadeUp>
        <Eyebrow>A tese</Eyebrow>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h2 className="mt-10 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
          Não é sobre fazer
          <br />
          mais exames.
          <span className="block mt-6 italic text-v2-ink-mute">
            É sobre ler bem
            <br />
            os que já tens.
          </span>
        </h2>
      </FadeUp>
    </Container>
  </Section>
);
