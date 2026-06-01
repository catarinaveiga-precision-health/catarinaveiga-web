import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Divider } from "../ui/Divider";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";

export const Hero = () => (
  <Section
    bg="paper"
    tight
    className="pt-40 md:pt-48 lg:pt-56 pb-24 md:pb-32"
  >
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <FadeUp className="lg:col-span-7 lg:col-start-1">
          <Eyebrow>
            Para mulheres a quem disseram que está tudo normal
          </Eyebrow>

          <h1 className="mt-8 font-serif text-display-1 text-v2-ink leading-[1.05] tracking-[-0.02em]">
            Os teus exames<br />estão normais.<br />
            <span className="italic text-v2-ink-mute">O teu corpo não.</span>
          </h1>

          <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute max-w-[480px] leading-[1.55]">
            Para mulheres em perimenopausa, com fadiga persistente, ciclos
            que mudaram, ou sintomas que ninguém conseguiu ligar — mas que
            tu sabes que são reais.
          </p>

          <Divider className="mt-12" />

          <div className="mt-12">
            <p className="font-sans text-mono-v2 text-v2-sage mb-5">
              Gratuito · 2 minutos · sem consulta
            </p>
            <ButtonV2 as="Link" to="/avaliacao" size="lg">
              Ver os meus marcadores
            </ButtonV2>
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden bg-v2-paper-deep">
            <img
              src="/catarina-hero.jpg"
              alt="Catarina Veiga · Medicina Tradicional Chinesa"
              className="w-full h-full object-cover object-top grayscale-[0.15] contrast-[1.02]"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
