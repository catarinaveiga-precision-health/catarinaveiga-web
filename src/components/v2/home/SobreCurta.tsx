import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";

export const SobreCurta = () => (
  <Section bg="paper">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <FadeUp className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-v2-paper-deep max-w-[420px]">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/catarina-hero-mobile.jpg"
              />
              <img
                src="/catarina-hero.jpg"
                alt="Catarina Veiga"
                width={800}
                height={1200}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top grayscale-[0.15] contrast-[1.02]"
              />
            </picture>
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <Eyebrow>Sobre mim</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.2] tracking-[-0.01em]">
            Catarina Veiga.
          </h2>
          <div className="mt-8 space-y-5 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[52ch]">
            <p>
              Trabalho com mulheres em perimenopausa, fadiga persistente,
              alterações hormonais, ansiedade, sono e metabolismo, casos
              em que os exames costumam ser considerados normais, mas o
              corpo continua a dar sinais.
            </p>
            <p>Uma leitura integrada da saúde feminina.</p>
            <p>
              Vinte anos de prática clínica, com formação avançada em
              saúde hormonal feminina, bioquímica clínica e interpretação
              funcional de biomarcadores.
            </p>
            <p>
              Sempre que necessário, o acompanhamento articula-se com
              médicos e outras especialidades para garantir uma abordagem
              integrada e adequada a cada situação.
            </p>
          </div>

          <div className="mt-10">
            <ButtonV2 as="Link" to="/sobre" variant="link">
              Conhecer o meu percurso ›
            </ButtonV2>
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
