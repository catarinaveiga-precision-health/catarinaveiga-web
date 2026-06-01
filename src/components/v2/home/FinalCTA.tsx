import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { ButtonV2 } from "../ui/ButtonV2";
import { Divider } from "../ui/Divider";
import { FadeUp } from "../motion/FadeUp";

export const FinalCTA = () => (
  <Section bg="moss">
    <Container size="narrow" className="text-center">
      <FadeUp>
        <h2 className="font-display text-display-2 text-v2-paper leading-[1.1] tracking-[-0.015em]">
          Estás cansada de ouvir que está tudo normal?
        </h2>
      </FadeUp>

      <FadeUp delay={0.08}>
        <p className="mt-10 font-body text-body-lg-v2 text-v2-paper/80 leading-[1.6] max-w-[52ch] mx-auto">
          A primeira consulta serve para isto: olhar com atenção, fazer
          perguntas que ninguém te fez, e devolver-te um mapa claro do que
          o corpo está a mostrar.
        </p>
      </FadeUp>

      <FadeUp delay={0.15} className="mt-14">
        <ButtonV2
          as="a"
          href="https://catarinaveigaagendamento.as.me/"
          size="lg"
        >
          Marcar consulta inicial · €120
        </ButtonV2>
        <p className="mt-6 font-mono text-mono-v2 uppercase tracking-[0.12em] text-v2-paper/60">
          60–90 min · telemedicina · resposta em 48h
        </p>
      </FadeUp>

      <FadeUp delay={0.2} className="mt-16 flex justify-center">
        <Divider tone="paper-soft" />
      </FadeUp>

      <FadeUp delay={0.25} className="mt-14">
        <p className="font-body text-body-v2 text-v2-paper/60 mb-5">
          Ou primeiro:
        </p>
        <ButtonV2 as="Link" to="/avaliacao" variant="ghost" className="text-v2-paper border-v2-paper/30 hover:border-v2-paper/70">
          Ver os meus marcadores em 2 minutos
        </ButtonV2>
      </FadeUp>
    </Container>
  </Section>
);
