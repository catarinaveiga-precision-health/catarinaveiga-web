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
            Para mulheres em perimenopausa, com fadiga persistente,
            alterações hormonais, digestivas ou metabólicas que continuam
            sem explicação clara.
          </p>

          <Divider className="mt-12" />

          <div className="mt-12 flex flex-col items-start gap-5">
            <ButtonV2
              as="a"
              href="https://catarinaveigaagendamento.as.me/"
              size="lg"
            >
              Marcar consulta inicial · €120
            </ButtonV2>
            <ButtonV2 as="Link" to="/avaliacao" variant="link">
              Ou experimentar a ferramenta gratuita ›
            </ButtonV2>
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-v2-paper-deep">
              <picture>
                <source media="(max-width: 768px)" srcSet="/catarina-hero-mobile.jpg" />
                <img
                  src="/catarina-hero.jpg"
                  alt="Catarina Veiga"
                  width={800}
                  height={1200}
                  className="w-full h-full object-cover object-top grayscale-[0.15] contrast-[1.02]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
            {/* fragmento de análise · objecto clínico sobreposto */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white border border-v2-paper-line px-5 py-4 shadow-[0_16px_40px_-14px_rgba(31,36,34,0.3)] max-w-[230px]">
              <p className="font-sans text-[9px] uppercase tracking-[0.16em] text-v2-ink-mute/80 pb-2 border-b border-v2-paper-line">
                Leitura funcional
              </p>
              <div className="mt-2.5 space-y-1.5 font-sans text-[12px] tabular-nums">
                <div className="flex justify-between gap-4">
                  <span className="text-v2-ink">TSH · 2,8</span>
                  <span className="text-v2-brick">acima do óptimo</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-v2-ink">Ferritina · 18</span>
                  <span className="text-v2-brick">funcional baixo</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-v2-ink">Vit. D · 22</span>
                  <span className="text-v2-brick">insuficiente</span>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
