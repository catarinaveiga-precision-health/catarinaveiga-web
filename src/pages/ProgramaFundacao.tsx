import { useState } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import { Section } from "@/components/v2/ui/Section";
import { Container } from "@/components/v2/ui/Container";
import { Eyebrow } from "@/components/v2/ui/Eyebrow";
import { ButtonV2 } from "@/components/v2/ui/ButtonV2";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { AnnotatedLabFig } from "@/components/v2/clinical/AnnotatedLabFig";
import { cn } from "@/lib/utils";
import figMesa from "@/assets/catarina-brand-devices.jpg";
import figBiblioteca from "@/assets/catarina-sobre-portrait.jpg";

/* Programa Fundação · publicação clínica premium.
   Estrutura: Hero (Fig. 01) → Padrões → Fig. 02 → Fases (diagrama
   clínico) → O que inclui → Investimento → Casos típicos → FAQ →
   Fecho humano. */

const padroes = [
  "Fadiga que não melhora mesmo descansando",
  "Perimenopausa mais difícil do que esperava",
  "Ansiedade ou irritabilidade que apareceram nos últimos anos",
  "Alterações digestivas sem explicação clara",
  "Ganho de peso ou resistência à perda de peso",
  "Autoimunidade ou inflamação persistente",
  "Exames normais mas sintomas reais",
];

const fases = [
  {
    n: "Fase 1",
    title: "Investigar",
    semanas: "Semanas 1 a 3",
    intro:
      "Antes de propor qualquer intervenção, precisamos perceber o que está realmente a acontecer.",
    itens: [
      "Revisão de histórico",
      "Análise de sintomas",
      "Integração de exames existentes",
      "Identificação de padrões prioritários",
    ],
  },
  {
    n: "Fase 2",
    title: "Intervir",
    semanas: "Semanas 4 a 9",
    intro: "Construção de um protocolo individualizado.",
    itens: ["Não um protocolo genérico.", "O seu protocolo."],
  },
  {
    n: "Fase 3",
    title: "Consolidar",
    semanas: "Semanas 10 a 12",
    intro: "Avaliar resultados.",
    itens: ["Identificar o que funcionou.", "Definir próximos passos."],
  },
];

const inclui = [
  "4 consultas individuais",
  "Plano clínico escrito e atualizado ao longo do processo",
  "Interpretação integrada dos exames existentes",
  "Suporte entre consultas",
  "Ajustes terapêuticos ao longo das 12 semanas",
  "Plano de manutenção final",
];

const investimento = [
  "12 semanas",
  "4 consultas individuais",
  "Plano clínico personalizado",
  "Suporte entre consultas",
  "Acompanhamento estruturado",
];

const casos = [
  {
    id: "Caso A",
    idade: "42 anos",
    linhas: ["Fadiga persistente", "Ferritina baixa não identificada"],
  },
  {
    id: "Caso B",
    idade: "48 anos",
    linhas: ["Perimenopausa", "Insónia e ansiedade"],
  },
  {
    id: "Caso C",
    idade: "39 anos",
    linhas: ["Queixas digestivas", "Exames convencionais normais"],
  },
];

const faqs = [
  {
    q: "Qual o investimento total?",
    a: "€800 pelas 12 semanas completas, incluindo 4 consultas individuais, plano clínico escrito e suporte entre consultas.",
  },
  {
    q: "Posso entrar sem fazer a consulta inicial?",
    a: "Não. A consulta inicial (€120) é o critério de admissão.",
  },
  {
    q: "As consultas são presenciais?",
    a: "Todas online, em plataforma segura.",
  },
  {
    q: "O que acontece depois das 12 semanas?",
    a: "Sai com um plano de manutenção escrito, biomarcadores de referência estabelecidos e clareza sobre o que monitorizar.",
  },
];

const ProgramaFundacao = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
      <NavbarV2 />

      <main className="overflow-hidden">
        {/* ── HERO · Fig. 01 ── */}
        <Section bg="paper" tight className="pt-36 md:pt-44 pb-20">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <FadeUp className="lg:col-span-6">
                <Eyebrow>Programa Fundação · 12 semanas</Eyebrow>
                <h1 className="mt-7 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
                  Há uma diferença entre estar dentro dos valores de
                  referência e sentir-se verdadeiramente bem.
                </h1>
                <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.6] max-w-[52ch]">
                  O Programa Fundação foi criado para mulheres que sabem que
                  algo não está certo, mesmo quando os exames parecem
                  normais.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <ButtonV2 as="Link" to="/candidatura" size="lg">
                    Candidatar-me ao Programa
                  </ButtonV2>
                  <ButtonV2 as="a" href="#fases" variant="ghost" size="lg">
                    Como funciona
                  </ButtonV2>
                </div>
              </FadeUp>

              <FadeUp className="lg:col-span-6" delay={0.12}>
                <figure>
                  <div className="overflow-hidden bg-v2-paper-deep">
                    <img
                      src={figMesa}
                      alt="Mesa de trabalho com computador, café e caneta em luz natural"
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 font-sans text-[11px] uppercase tracking-[0.14em] text-v2-ink-mute/80">
                    Fig. 01 · Revisão clínica de caso
                  </figcaption>
                </figure>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* ── PADRÕES · checklist ── */}
        <Section bg="paper-deep" tight>
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <FadeUp className="lg:col-span-5">
                <Eyebrow>Antes de continuar</Eyebrow>
                <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                  Reconhece-se em algum destes padrões?
                </h2>
                <p className="mt-7 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[40ch]">
                  Se assinalou dois ou mais, o programa foi desenhado para
                  casos como o seu.
                </p>
              </FadeUp>

              <FadeUp className="lg:col-span-6 lg:col-start-7" delay={0.1}>
                <ul className="bg-white border border-v2-paper-line divide-y divide-v2-paper-line shadow-[0_18px_48px_-18px_rgba(31,36,34,0.22)]">
                  {padroes.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-4 px-6 py-4 font-sans text-body-v2 text-v2-ink leading-[1.5]"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 mt-[3px] w-[18px] h-[18px] border border-v2-graffiti-soft"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* ── FIG. 02 · investigação ── */}
        <Section bg="paper" tight>
          <Container size="prose">
            <FadeUp className="text-center">
              <Eyebrow>O método em prática</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1} className="mt-12">
              <AnnotatedLabFig />
            </FadeUp>
          </Container>
        </Section>

        {/* ── FASES · diagrama clínico ── */}
        <Section bg="paper-deep" tight id="fases">
          <Container size="default">
            <FadeUp className="text-center">
              <Eyebrow>O protocolo</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                Três fases. Doze semanas.
              </h2>
            </FadeUp>

            <div className="mt-16 max-w-[760px] mx-auto bg-white border border-v2-paper-line shadow-[0_22px_56px_-20px_rgba(31,36,34,0.25)]">
              {fases.map((f, i) => (
                <FadeUp key={f.n} delay={i * 0.08}>
                  <div
                    className={cn(
                      "relative px-8 py-9 md:px-12 md:py-10",
                      i > 0 && "border-t border-v2-paper-line",
                    )}
                  >
                    <div className="flex items-start gap-6 md:gap-8">
                      <span
                        aria-hidden
                        className="shrink-0 mt-1 w-3.5 h-3.5 rounded-full border-2 border-v2-golden bg-white"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-sans text-mono-v2 uppercase tracking-[0.16em] text-v2-golden-deep">
                            {f.n} · {f.title}
                          </p>
                          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-v2-ink-mute/70">
                            {f.semanas}
                          </p>
                        </div>
                        <p className="mt-4 font-serif text-h3-v2 text-v2-ink leading-[1.3]">
                          {f.intro}
                        </p>
                        <ul className="mt-5 space-y-2">
                          {f.itens.map((item) => (
                            <li
                              key={item}
                              className="font-sans text-body-v2 text-v2-ink-mute leading-[1.6] pl-5 relative"
                            >
                              <span
                                aria-hidden
                                className="absolute left-0 top-[0.65em] w-2.5 h-px bg-v2-golden"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* ── O QUE INCLUI ── */}
        <Section bg="paper" tight>
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <FadeUp className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow>O que inclui</Eyebrow>
                  <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                    Acompanhamento, não componentes.
                  </h2>
                </div>
              </FadeUp>
              <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
                <ul className="space-y-5">
                  {inclui.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 font-sans text-body-lg-v2 text-v2-ink leading-[1.5]"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 mt-[5px] w-5 h-5 rounded-full bg-[rgba(184,149,106,0.18)] text-v2-golden-deep flex items-center justify-center text-[11px] leading-none"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* ── INVESTIMENTO ── */}
        <Section bg="paper-deep" tight>
          <Container size="prose" className="text-center">
            <FadeUp>
              <Eyebrow>Investimento</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="mt-10 font-serif text-display-2 text-v2-golden-deep leading-none">
                €800
              </p>
            </FadeUp>
            <FadeUp delay={0.14}>
              <ul className="mt-10 space-y-3">
                {investimento.map((i) => (
                  <li
                    key={i}
                    className="font-sans text-body-v2 text-v2-ink leading-[1.5]"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-10 font-sans text-body-sm-v2 text-v2-ink-mute max-w-[44ch] mx-auto">
                Entrada apenas após consulta inicial e avaliação de
                enquadramento clínico.
              </p>
              <div className="mt-9">
                <ButtonV2 as="Link" to="/candidatura" size="lg">
                  Candidatar-me ao Programa
                </ButtonV2>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* ── CASOS TÍPICOS ── */}
        <Section bg="paper" tight>
          <Container size="default">
            <FadeUp className="text-center">
              <Eyebrow>Casos típicos</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                O tipo de casos que acompanho.
              </h2>
            </FadeUp>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {casos.map((c, i) => (
                <FadeUp key={c.id} delay={i * 0.08}>
                  <article className="bg-white border border-v2-paper-line px-8 py-8 h-full shadow-[0_14px_36px_-16px_rgba(31,36,34,0.18)]">
                    <div className="flex items-baseline justify-between border-b border-v2-paper-line pb-4">
                      <p className="font-sans text-mono-v2 uppercase tracking-[0.16em] text-v2-golden-deep">
                        {c.id}
                      </p>
                      <p className="font-sans text-[12px] text-v2-ink-mute">
                        {c.idade}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {c.linhas.map((l) => (
                        <li
                          key={l}
                          className="font-serif italic text-body-lg-v2 text-v2-ink leading-[1.45]"
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="mt-12 text-center" delay={0.2}>
              <p className="font-sans text-body-sm-v2 italic text-v2-ink-mute max-w-[64ch] mx-auto leading-[1.55]">
                Perfis ilustrativos do tipo de casos acompanhados. Cada
                percurso é individual. Não representam promessa de
                resultados.
              </p>
            </FadeUp>
          </Container>
        </Section>

        {/* ── FAQ ── */}
        <Section bg="paper-deep" tight>
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <FadeUp className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow>Antes de se candidatar</Eyebrow>
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
                          className="w-full text-left py-6 flex items-start justify-between gap-8 group"
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
                            <p className="pb-7 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[64ch]">
                              {f.a}
                            </p>
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

        {/* ── FECHO HUMANO ── */}
        <Section bg="moss" tight>
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <FadeUp className="lg:col-span-4">
                <div className="relative aspect-[4/5] overflow-hidden max-w-[340px] mx-auto lg:mx-0">
                  <img
                    src={figBiblioteca}
                    alt="Catarina Veiga na sua biblioteca"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </FadeUp>
              <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
                <h2 className="font-serif text-display-2 text-v2-paper leading-[1.1] tracking-[-0.015em]">
                  No final, não está a comprar um programa.
                  <span className="block mt-4 italic text-v2-paper/80">
                    Está a escolher quem lê a sua história.
                  </span>
                </h2>
                <div className="mt-10">
                  <ButtonV2 as="Link" to="/candidatura" size="lg">
                    Candidatar-me ao Programa
                  </ButtonV2>
                  <p className="mt-5 font-sans text-mono-v2 uppercase tracking-[0.12em] text-v2-paper/60">
                    12 semanas · telemedicina · entrada após consulta inicial
                  </p>
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>
      </main>

      <LegalBand />
      <FooterV2 />
    </div>
  );
};

export default ProgramaFundacao;
