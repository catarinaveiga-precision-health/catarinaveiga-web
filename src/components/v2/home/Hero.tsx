import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Divider } from "../ui/Divider";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";
import { acuityUrl } from "@/lib/acuity";

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
            Consulta de medicina funcional integrativa para mulheres em
            perimenopausa. Cansaço que não passa, sono que não descansa,
            exames que dizem que está tudo bem. Sais com uma explicação e
            uma ordem: o que tratar primeiro, e porquê.
          </p>

          <Divider className="mt-12" />

          {/* Uma CTA só. O link para a ferramenta gratuita saiu daqui de
              propósito: era uma segunda ação a competir com a marcação, e a
              página tem um objetivo único. A ferramenta continua no menu. */}
          <div className="mt-12 flex flex-col items-start gap-4">
            <ButtonV2 as="a" href={acuityUrl("hero")} size="lg">
              Marcar consulta inicial
            </ButtonV2>
            <p className="font-sans text-body-sm-v2 text-v2-ink-mute">
              90 minutos, online. Resposta em 48 horas úteis.
              Não precisas de ter exames feitos.
            </p>
          </div>
        </FadeUp>

        {/* Hero imersivo com o retrato original (escolha da Catarina,
            2026-08-24): o fundo do estúdio foi removido a sério (rembg,
            local, só recorte, zero retoque no rosto) e o WebP com alpha
            funde com qualquer fundo. Atrás dela, um halo radial sage
            muito ténue dá profundidade sem criar caixa. O fade inferior
            dissolve o corte das calças na página. */}
        <FadeUp className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <div className="relative flex items-end justify-center">
            <div
              aria-hidden
              className="absolute inset-x-0 top-6 bottom-0 [background:radial-gradient(75%_62%_at_50%_38%,rgba(113,130,129,0.16),transparent_75%)]"
            />
            <img
              src="/catarina-hero-recorte.webp"
              alt="Catarina Veiga"
              width={800}
              height={1200}
              className="relative w-full max-w-[420px] lg:max-w-[460px] h-auto [mask-image:linear-gradient(to_bottom,black_86%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,black_86%,transparent_99%)]"
              loading="eager"
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
            {/* fragmento de análise · objecto clínico sobreposto */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 rounded-xl bg-white border border-v2-paper-line px-5 py-4 shadow-[0_16px_40px_-14px_rgba(31,36,34,0.3)] max-w-[230px] backdrop-blur">
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
