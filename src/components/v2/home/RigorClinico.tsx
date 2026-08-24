import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";
import retrato from "@/assets/catarina-sobre-portrait.jpg";

/* Rigor clínico com rosto, adaptado da secção "Clinical rigor and
   root-cause depth, without compromise" da Parsley (retrato da
   fundadora + lista dura de credenciais). Todos os factos já estão
   verificados no schema do site; o último ponto transforma o limite
   legal (não é médica) em prova de rigor, como o resto da página faz. */

const credenciais = [
  "21 anos de prática clínica em saúde da mulher",
  "Functional Medicine Practitioner, acreditação ativa pela Regenerus Labs e pela Nordic Labs, no Reino Unido",
  "Equipa fundadora da Omnos, hoje parte da Regenerus Labs, onde liderou o departamento de microbioma",
  "Oradora no Longevity Med Summit 2024",
  "Autora na IHCAN Magazine, setembro de 2022",
  "Não diagnostica nem prescreve: quando o quadro exige médico, di-lo e encaminha",
];

export const RigorClinico = () => (
  <Section bg="paper">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <FadeUp className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-v2-paper-deep max-w-[420px]">
            <img
              src={retrato}
              alt="Catarina Veiga, especialista em medicina funcional integrativa"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top grayscale-[0.15] contrast-[1.02]"
            />
          </div>
          <p className="mt-6 font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-ink-mute">
            Catarina Veiga · medicina funcional integrativa
          </p>
        </FadeUp>

        <FadeUp className="lg:col-span-7" delay={0.1}>
          <Eyebrow>Rigor clínico</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[22ch]">
            Profundidade funcional, sem atalhos.
          </h2>
          <ul className="mt-10 space-y-5">
            {credenciais.map((c) => (
              <li
                key={c}
                className="flex items-start gap-4 font-sans text-body-v2 text-v2-ink leading-[1.55]"
              >
                <span
                  aria-hidden
                  className="shrink-0 mt-[0.65em] w-4 h-px bg-v2-sage"
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </Container>
  </Section>
);
