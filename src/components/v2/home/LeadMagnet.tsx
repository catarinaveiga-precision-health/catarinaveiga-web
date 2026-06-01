import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { FadeUp } from "../motion/FadeUp";

export const LeadMagnet = () => (
  <Section bg="paper-deep">
    <Container size="narrow" className="text-center">
      <FadeUp>
        <Eyebrow>Antes de marcares consulta</Eyebrow>
      </FadeUp>

      <FadeUp delay={0.05}>
        <h2 className="mt-8 font-display text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[20ch] mx-auto">
          Vê primeiro o que dizem os teus marcadores.
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="mt-10 space-y-4 font-body text-body-v2 text-v2-ink-mute leading-[1.7]">
          <p>
            Há uma diferença entre <span className="italic">dentro dos
            intervalos</span> e <span className="italic">em funcionamento
            óptimo</span>.
          </p>
          <p>
            Esta ferramenta permite-te ver os teus marcadores nos dois
            contextos. Introduzes os valores e recebes uma leitura
            funcional imediata, com PDF descarregável.
          </p>
          <p className="text-v2-sage">Sem consulta.</p>
        </div>
      </FadeUp>

      <FadeUp delay={0.15} className="mt-12">
        <ButtonV2 as="Link" to="/avaliacao" size="lg">
          Ver os meus marcadores
        </ButtonV2>
        <p className="mt-6 font-mono text-mono-v2 text-v2-ink-mute uppercase tracking-[0.04em] max-w-[44ch] mx-auto">
          Cobre TSH, T3 e T4 livres, ferritina, vitamina D, B12, cortisol,
          estradiol, DHEA, PCR, homocisteína e mais.
        </p>
      </FadeUp>
    </Container>
  </Section>
);
