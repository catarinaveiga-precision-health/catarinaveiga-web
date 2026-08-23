import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

const eParaTi = [
  "Tens sintomas que persistem e ninguém os ligou uns aos outros",
  "Tens análises feitas e ninguém as leu em conjunto, ou nunca chegaste a fazer nenhumas",
  "Já ouviste que está tudo normal mais do que uma vez",
  "Queres perceber o que se passa antes de mudar seja o que for",
  "Estás disposta a dar tempo ao processo, porque o corpo demora a responder",
];

const naoEParaTi = [
  "Procuras um diagnóstico médico ou uma receita",
  "Tens uma situação aguda que precisa de urgência",
  "Queres um resultado garantido em duas semanas",
  "Preferes um protocolo igual para toda a gente",
  "Não queres olhar para sono, alimentação nem carga de stress",
];

export const Qualification = () => (
  <Section bg="paper">
    <Container size="default">
      <FadeUp>
        <Eyebrow>Antes de marcares</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[24ch]">
          Isto não serve toda a gente.
        </h2>
      </FadeUp>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <FadeUp>
          <div className="h-full bg-v2-paper-deep px-8 py-9 md:px-10 md:py-11">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-v2-sage">
              É para ti se
            </p>
            <ul className="mt-8 space-y-5">
              {eParaTi.map((t) => (
                <li key={t} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-[3px] shrink-0 font-sans text-[13px] text-v2-sage"
                  >
                    &#10003;
                  </span>
                  <span className="font-sans text-body-sm-v2 text-v2-ink leading-[1.65]">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="h-full border border-v2-paper-line px-8 py-9 md:px-10 md:py-11">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-v2-ink-mute">
              Não é para ti se
            </p>
            <ul className="mt-8 space-y-5">
              {naoEParaTi.map((t) => (
                <li key={t} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-[3px] shrink-0 font-sans text-[13px] text-v2-ink-mute/60"
                  >
                    &#9671;
                  </span>
                  <span className="font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.65]">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
