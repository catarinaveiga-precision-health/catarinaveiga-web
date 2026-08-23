import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/**
 * Secção 3 do Story Framework: OUTCOME.
 * Vende a vida depois, não o produto. O produto só aparece na secção seguinte.
 * A promessa é compreensão e ordem, nunca cura: é a única coisa que se cumpre
 * sempre, e é o que ela pode prometer sem ser ato médico.
 */
const leva = [
  "Saberes que o que sentes é real e tem uma causa fisiológica",
  "Perceberes porque é que valores dentro do normal não te estão a servir",
  "Teres uma ordem: o que tratar primeiro, e porquê",
  "Deixares de repetir a mesma história de cada vez que mudas de consulta",
  "Um documento escrito que podes levar ao teu médico",
];

export const Resultado = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <FadeUp className="lg:col-span-6">
          <Eyebrow>O que levas daqui</Eyebrow>
          <h2 className="mt-6 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
            Não prometo cura.
            <span className="block mt-4 italic text-v2-ink-mute">
              Prometo que passas a perceber.
            </span>
          </h2>
          <p className="mt-10 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[44ch]">
            É a única coisa que garanto sempre, seja o que for que as análises
            mostrarem. O resto depende do que estiver por trás, e disso falamos
            com verdade.
          </p>
        </FadeUp>

        <FadeUp className="lg:col-span-6" delay={0.1}>
          <ul className="divide-y divide-v2-paper-line border-y border-v2-paper-line">
            {leva.map((t) => (
              <li
                key={t}
                className="py-6 font-serif text-h3-v2 text-v2-ink leading-[1.35]"
              >
                {t}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
