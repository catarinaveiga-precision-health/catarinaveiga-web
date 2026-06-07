import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";

export const Foundation = () => (
  <Section bg="paper" id="fundacao">
    <Container size="prose" className="text-center">
      <FadeUp>
        <Eyebrow>Acompanhamento estruturado</Eyebrow>
      </FadeUp>

      <FadeUp delay={0.08}>
        <h2 className="mt-8 font-serif text-h2-v2 text-v2-ink leading-[1.2] tracking-[-0.01em]">
          Para algumas mulheres,
          <br />
          uma única consulta não é suficiente.
        </h2>
      </FadeUp>

      <FadeUp delay={0.15}>
        <p className="mt-10 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.65] max-w-[56ch] mx-auto">
          O Programa Fundação foi criado para quem necessita de
          acompanhamento estruturado ao longo de três meses.
        </p>
      </FadeUp>

      <FadeUp delay={0.2} className="mt-12">
        <ButtonV2 as="Link" to="/programa-fundacao" variant="ghost" size="lg">
          Conhecer o Programa Fundação
        </ButtonV2>
      </FadeUp>
    </Container>
  </Section>
);
