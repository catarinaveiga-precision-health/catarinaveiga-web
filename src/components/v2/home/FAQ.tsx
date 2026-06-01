import { useState } from "react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Isto substitui consulta médica?",
    a: [
      "Não. Sou praticante de Medicina Tradicional Chinesa, não médica.",
      "Tenho pós-graduação em Saúde Hormonal e Funcional da Mulher, formação avançada em microbioma, saúde metabólica e interpretação funcional de biomarcadores, com vários anos de prática clínica focada em saúde feminina, fadiga persistente, alterações hormonais e quadros inflamatórios complexos.",
      "O acompanhamento não substitui consulta médica convencional, diagnóstico ou tratamento médico.",
      "Quando existe necessidade de avaliação médica, há articulação com a Dra. Patrícia Salvador (médica inscrita na Ordem dos Médicos) ou referenciação para outras especialidades.",
    ],
  },
  {
    q: "As consultas são online?",
    a: [
      "Sim. O acompanhamento é feito em telemedicina para pacientes em Portugal e estrangeiro.",
    ],
  },
  {
    q: "Posso fazer apenas uma consulta?",
    a: [
      "Sim. A consulta inicial é independente e não obriga a continuidade. Muitas pessoas começam aqui para perceber se faz sentido continuar.",
    ],
  },
  {
    q: "Em quanto tempo vejo resultados?",
    a: [
      "Depende do caso. Algumas mudanças (sono, energia, ciclo) podem surgir nas primeiras semanas. Reorganização hormonal e metabólica exige normalmente 6 a 12 semanas.",
    ],
  },
  {
    q: "Que análises devo trazer?",
    a: [
      "Idealmente as análises mais recentes (últimos 12 meses). Se não tens análises actualizadas, pedimo-las nós depois da consulta inicial.",
    ],
  },
  {
    q: "O que diferencia esta abordagem?",
    a: [
      "Leitura funcional integrada. Não trabalho sintomas isolados. Leio padrões fisiológicos, biomarcadores, histórico clínico e contexto longitudinal antes de intervir.",
    ],
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section bg="paper-deep">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <FadeUp className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Antes de marcares</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                Perguntas frequentes.
              </h2>
            </div>
          </FadeUp>

          <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ul className="divide-y divide-v2-paper-line border-y border-v2-paper-line">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={i}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left py-7 flex items-start justify-between gap-8 group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-body-lg-v2 text-v2-ink group-hover:text-v2-ink-mute transition-colors leading-[1.4]">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 mt-2 font-sans text-mono-v2 text-v2-sage transition-transform duration-300",
                          isOpen ? "rotate-45" : "",
                        )}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-8 space-y-5 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[64ch]">
                          {f.a.map((p, j) => (
                            <p key={j}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
};
