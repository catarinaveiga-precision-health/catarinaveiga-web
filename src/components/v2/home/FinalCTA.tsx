import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";
import { acuityUrl } from "@/lib/acuity";

export const FinalCTA = () => (
  <Section bg="moss">
    <Container size="narrow" className="text-center">
      <FadeUp>
        <h2 className="font-serif text-display-2 text-v2-paper leading-[1.1] tracking-[-0.015em]">
          Estás cansada de ouvir que está tudo normal?
        </h2>
      </FadeUp>

      <FadeUp delay={0.08}>
        <p className="mt-10 font-sans text-body-lg-v2 text-v2-paper/80 leading-[1.6] max-w-[52ch] mx-auto">
          A primeira consulta serve para isto: olhar com atenção, fazer
          perguntas que ninguém te fez, e devolver-te um mapa claro do que
          o corpo está a mostrar.
        </p>
      </FadeUp>

      <FadeUp delay={0.15} className="mt-14">
        <ButtonV2
          as="a"
          href={acuityUrl("fecho")}
          size="lg"
        >
          Marcar consulta inicial
        </ButtonV2>
        <p className="mt-6 font-sans text-mono-v2 uppercase tracking-[0.12em] text-v2-paper/60">
          90 min · online · resposta em 48 horas úteis
        </p>
      </FadeUp>

      {/* O "Ou primeiro: ver os meus marcadores" saiu daqui. Era uma segunda
          ação no exato momento da decisão, e a regra da página é uma CTA só.
          A ferramenta continua acessível pelo menu. */}
    </Container>
  </Section>
);
