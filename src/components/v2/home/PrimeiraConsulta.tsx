import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonV2 } from "../ui/ButtonV2";
import { Divider } from "../ui/Divider";
import { FadeUp } from "../motion/FadeUp";
import { PlanoDoc } from "../clinical/PlanoDoc";
import editorialPhoto from "@/assets/editorial-featured.jpg";

const itens = [
  "Histórico clínico detalhado",
  "Sono",
  "Digestão",
  "Energia",
  "Ciclo",
  "Sintomas",
  "Exames anteriores (se existirem)",
];

export const PrimeiraConsulta = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <FadeUp className="lg:col-span-5">
          <Eyebrow>Consulta inicial · €120</Eyebrow>
          <h2 className="mt-6 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
            O que acontece na primeira consulta.
          </h2>
          <p className="mt-8 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[42ch]">
            60–90 min, em telemedicina. Resposta de marcação em 48h. Sem
            necessidade de teres exames já feitos.
          </p>

          {/* composição editorial: fotografia + documento do plano */}
          <div className="relative mt-14 hidden lg:block">
            <div className="aspect-[4/3] overflow-hidden bg-v2-paper-deep max-w-[400px]">
              <img
                src={editorialPhoto}
                alt="Livro e chá sobre lençóis de linho em luz natural"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-2 w-[260px]">
              <PlanoDoc />
            </div>
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
            O que olho contigo
          </p>
          <ul className="mt-10 space-y-5">
            {itens.map((item, i) => (
              <li
                key={i}
                className="font-serif text-h3-v2 text-v2-ink leading-[1.3] pl-7 relative"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.7em] w-3 h-px bg-v2-sage"
                />
                {item}
              </li>
            ))}
          </ul>

          <Divider className="mt-14" />

          <p className="mt-10 font-serif italic text-body-lg-v2 text-v2-ink leading-[1.55] max-w-[52ch]">
            Sais com hipóteses claras, prioridades definidas e próximos
            passos concretos.
          </p>

          <div className="mt-10">
            <ButtonV2
              as="a"
              href="https://catarinaveigaagendamento.as.me/"
              size="lg"
            >
              Marcar consulta inicial · €120
            </ButtonV2>
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
