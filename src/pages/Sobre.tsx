import { useState } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import catarinaPhoto from "@/assets/catarina-sobre-portrait.jpg";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import AcuityModal from "@/components/AcuityModal";
import { useAcuityModal, openAcuity } from "@/hooks/useAcuityModal";
import { Section } from "@/components/v2/ui/Section";
import { Container } from "@/components/v2/ui/Container";
import { Eyebrow } from "@/components/v2/ui/Eyebrow";
import { Divider } from "@/components/v2/ui/Divider";
import { ButtonV2 } from "@/components/v2/ui/ButtonV2";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Página Sobre · centrada na mulher que chega ao site
   Reconhecimento → Território → Tese → Método → Credenciais →
   Transparência → FAQ → CTA
   Posicionamento: saúde feminina complexa · microbioma · bioquímica
   clínica · perimenopausa. MTC aparece apenas em credenciais e
   transparência.
───────────────────────────────────────────────────────────────── */

const territorio = [
  "Fadiga",
  "Brain fog",
  "Ansiedade nova",
  "Alterações intestinais",
  "Perimenopausa",
  "Sono fragmentado",
];

const metodoPassos = [
  {
    n: "01",
    title: "Anamnese longa",
    body: "Sessenta a noventa minutos. História clínica, sintomas, sono, digestão, ciclo, contexto de vida.",
  },
  {
    n: "02",
    title: "Leitura integrada",
    body: "Exames disponíveis, padrões fisiológicos e contexto, tudo no mesmo plano de leitura.",
  },
  {
    n: "03",
    title: "Plano individualizado",
    body: "Por escrito. Alimentação, ritmo, sono, gestão de stress, suplementação dirigida quando faz sentido.",
  },
  {
    n: "04",
    title: "Reavaliação",
    body: "Revisões periódicas para ajustar o plano à evolução. Encaminhamento médico sempre que houver indicação clínica.",
  },
];

const percurso = [
  {
    period: "Formação de base",
    text: "Licenciatura de cinco anos em Medicina Tradicional Chinesa pela Nanjing University.",
  },
  {
    period: "20 anos",
    text: "Prática clínica contínua, iniciada em equipas multidisciplinares com psicólogos e psiquiatras.",
  },
  {
    period: "2020 a 2024",
    text: "Equipa Omnos.me, hoje Regenerus Labs. Quatro anos no Departamento de Microbioma e à frente da Educação para a Saúde.",
  },
  {
    period: "GI360",
    text: "Envolvida no desenvolvimento da interface clínica do teste de microbioma GI360, premiado no Reino Unido.",
  },
  {
    period: "Formação de profissionais",
    text: "Webinários e formação para profissionais de saúde, Reino Unido e Portugal.",
  },
  {
    period: "2024",
    text: "Oradora no Longevity Med Summit, com a apresentação “Oestrogen-Related Conditions and Gut Microbiota”.",
  },
];

const transparencia = [
  "Não sou médica. Não estou inscrita na Ordem dos Médicos.",
  "Não sou nutricionista.",
  "Não prescrevo medicamentos.",
  "Não faço diagnósticos médicos.",
  "Não substituo acompanhamento médico.",
];

const faqs = [
  {
    q: "O que acontece na primeira consulta?",
    a: [
      "A primeira consulta dura entre 60 e 90 minutos, em videochamada. Recebes um questionário prévio por email para preparar. Em consulta, exploramos o teu histórico clínico, sintomas, ciclo, sono, digestão, energia e contexto emocional. Sais com um plano estruturado por escrito, com revisões previstas.",
    ],
  },
  {
    q: "Como funciona o acompanhamento?",
    a: [
      "O acompanhamento estende-se ao longo do tempo. Após a primeira consulta, há revisões periódicas para ajustar o plano à evolução. A frequência depende do teu caso: pode ser mais próxima nas fases iniciais e espaçar-se à medida que o equilíbrio se estabiliza. Não é uma consulta isolada. É um processo.",
    ],
  },
  {
    q: "Em que casos é indicado este acompanhamento?",
    a: [
      "Acompanho mulheres em transições hormonais: perimenopausa, alterações de ciclo, fadiga persistente, sono alterado, equilíbrio emocional, digestão sensível. Trabalho sobretudo com sintomas reais e exames maioritariamente normais. Para descompensações agudas ou necessidade de intervenção médica imediata, refiro para médicos e outras especialidades.",
    ],
  },
  {
    q: "Como olhas para as análises clínicas?",
    a: [
      "A leitura clínica oficial das análises é da Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos com quem colaboro. O que eu faço é integrar essa leitura no contexto mais amplo da minha formação e dos quatro anos que passei no Departamento de Microbioma da Regenerus Labs. Integro, não substituo, a interpretação médica.",
    ],
  },
  {
    q: "O que posso esperar ao longo do tempo?",
    a: [
      "A evolução depende de vários fatores: o teu corpo, a tua fase de vida, a consistência com o plano. As pacientes descrevem mudanças subjetivas em sono, energia e equilíbrio ao longo de semanas a meses. Não prometo prazos nem resultados.",
    ],
  },
];

const Sobre = () => {
  const acuity = useAcuityModal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
      <NavbarV2 />

      <main className="overflow-hidden">
        {/* ── HERO · reconhecimento ─────────────────────────── */}
        <Section bg="paper" tight className="pt-40 md:pt-48 lg:pt-56 pb-24 md:pb-32">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <FadeUp className="lg:col-span-7">
                <Eyebrow>Sobre</Eyebrow>
                <h1 className="mt-8 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
                  Talvez tenha chegado aqui porque está cansada de ouvir que
                  está tudo normal.
                </h1>
                <div className="mt-10 space-y-1 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.6]">
                  <p>Os exames não explicam o cansaço.</p>
                  <p>O sono continua leve.</p>
                  <p>A ansiedade apareceu sem aviso.</p>
                  <p>O corpo mudou.</p>
                </div>
                <p className="mt-8 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[48ch]">
                  E, apesar disso, as respostas continuam frequentemente as
                  mesmas:
                </p>
                <p className="mt-4 font-serif italic text-h3-v2 text-v2-ink">
                  "Os exames estão normais."
                </p>
                <div className="mt-12">
                  <ButtonV2 onClick={openAcuity} size="lg">
                    Marcar primeira consulta
                  </ButtonV2>
                </div>
              </FadeUp>

              <FadeUp className="lg:col-span-4 lg:col-start-9" delay={0.15}>
                <div className="relative aspect-[4/5] overflow-hidden bg-v2-paper-deep">
                  <img
                    src={catarinaPhoto}
                    alt="Catarina Veiga"
                    className="w-full h-full object-cover object-top grayscale-[0.2] contrast-[1.02]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* ── 1 · O TERRITÓRIO ─────────────────────────────── */}
        <Section bg="paper-deep">
          <Container size="prose">
            <FadeUp className="text-center">
              <Eyebrow>O território onde trabalho</Eyebrow>
            </FadeUp>

            <FadeUp delay={0.08}>
              <p className="mt-12 font-sans text-body-lg-v2 text-v2-ink leading-[1.65] text-center max-w-[52ch] mx-auto">
                Mulheres entre os 35 e os 55 anos. Sintomas reais.
              </p>
            </FadeUp>

            <FadeUp delay={0.12}>
              <ul className="mt-12 max-w-[360px] mx-auto space-y-4">
                {territorio.map((t) => (
                  <li
                    key={t}
                    className="font-serif italic text-h3-v2 text-v2-ink leading-[1.4] text-center"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.16} className="mt-14 flex justify-center">
              <Divider />
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-12 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.65] text-center max-w-[44ch] mx-auto">
                Exames normais. E a sensação constante de que ninguém
                consegue juntar todas as peças.
              </p>
            </FadeUp>
          </Container>
        </Section>

        {/* ── 2 · A TESE ───────────────────────────────────── */}
        <Section bg="paper">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <FadeUp className="lg:col-span-6">
                <Eyebrow>A tese</Eyebrow>
                <h2 className="mt-6 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
                  A maioria das respostas continua demasiado curta.
                </h2>
              </FadeUp>
              <FadeUp className="lg:col-span-5 lg:col-start-8 self-end" delay={0.12}>
                <div className="space-y-6 font-sans text-body-v2 text-v2-ink-mute leading-[1.7]">
                  <p>
                    O sistema médico é excelente a diagnosticar doença. Faz
                    coisas que eu não faço, e bem: diagnostica, prescreve,
                    opera.
                  </p>
                  <p>
                    Mas muitas mulheres ficam numa zona intermédia. Não estão
                    "bem". E também não existe um diagnóstico claro.
                  </p>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.18} className="mt-24 lg:mt-32">
              <blockquote className="font-serif italic text-h2-v2 text-v2-ink leading-[1.3] text-center max-w-[44ch] mx-auto">
                Entre o normal laboratorial e sentir-se verdadeiramente bem
                existe muitas vezes um espaço que merece atenção.
              </blockquote>
            </FadeUp>
          </Container>
        </Section>

        {/* ── 3 · COMO TRABALHO ────────────────────────────── */}
        <Section bg="paper-deep">
          <Container size="default">
            <FadeUp className="text-center">
              <Eyebrow>Como trabalho</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                Leio antes de propor.
              </h2>
            </FadeUp>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 lg:gap-x-12">
              {metodoPassos.map((s, i) => (
                <FadeUp key={s.n} delay={i * 0.06}>
                  <p className="font-sans text-mono-v2 text-v2-sage uppercase tracking-[0.08em]">
                    {s.n}
                  </p>
                  <h3 className="mt-5 font-serif text-h3-v2 text-v2-ink leading-[1.25]">
                    {s.title}
                  </h3>
                  <p className="mt-4 font-sans text-body-v2 text-v2-ink-mute leading-[1.65] max-w-[34ch]">
                    {s.body}
                  </p>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* ── 4 · PERCURSO E CREDENCIAIS · timeline editorial ── */}
        <Section bg="paper">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <FadeUp className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow>Percurso</Eyebrow>
                  <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                    Porque desenvolvi esta abordagem.
                  </h2>
                  <p className="mt-8 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[38ch]">
                    A razão pela qual faço este trabalho não está só no
                    percurso. Está também na perimenopausa que vivo na
                    primeira pessoa, e em vinte anos a ver mulheres saírem
                    dos consultórios com "está tudo normal" quando
                    claramente não está.
                  </p>
                </div>
              </FadeUp>

              <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
                <ul className="border-l border-v2-paper-line">
                  {percurso.map((p, i) => (
                    <li key={i} className="relative pl-10 pb-12 last:pb-0">
                      <span
                        aria-hidden
                        className="absolute left-[-3px] top-[0.55em] w-[5px] h-[5px] rounded-full bg-v2-sage"
                      />
                      <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
                        {p.period}
                      </p>
                      <p className="mt-3 font-sans text-body-v2 text-v2-ink leading-[1.65] max-w-[58ch]">
                        {p.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* ── 5 · TRANSPARÊNCIA ────────────────────────────── */}
        <Section bg="paper-deep">
          <Container size="prose">
            <FadeUp className="text-center">
              <Eyebrow>Transparência</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                O que faço e o que não faço.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <ul className="mt-14 max-w-[480px] mx-auto space-y-5">
                {transparencia.map((t) => (
                  <li
                    key={t}
                    className="font-sans text-body-lg-v2 text-v2-ink leading-[1.55] pl-7 relative"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] w-3 h-px bg-v2-sage"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="mt-14 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] text-center max-w-[52ch] mx-auto">
                A formação de base é a Medicina Tradicional Chinesa, com
                cédula da ACSS ao abrigo da Lei n.º 71/2013. Acompanho dentro
                desse âmbito, em complemento ao acompanhamento médico. Quando
                existe necessidade de avaliação médica, há articulação com a
                Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos,
                ou referenciação para outras especialidades.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-8 font-serif italic text-body-lg-v2 text-v2-ink text-center max-w-[44ch] mx-auto leading-[1.5]">
                A clareza sobre aquilo que faço, e aquilo que não faço, faz
                parte da forma como trabalho.
              </p>
            </FadeUp>
          </Container>
        </Section>

        {/* ── 6 · FAQ · acordeão ───────────────────────────── */}
        <Section bg="paper">
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

        {/* ── CTA FINAL · fundo moss ───────────────────────── */}
        <Section bg="moss">
          <Container size="narrow" className="text-center">
            <FadeUp>
              <h2 className="font-serif text-display-2 text-v2-paper leading-[1.1] tracking-[-0.015em]">
                Se chegou até aqui, talvez não esteja à procura de mais
                informação.
              </h2>
            </FadeUp>

            <FadeUp delay={0.08}>
              <p className="mt-10 font-sans text-body-lg-v2 text-v2-paper/80 leading-[1.6] max-w-[48ch] mx-auto">
                Talvez esteja à procura de uma forma diferente de olhar para
                aquilo que lhe está a acontecer.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="mt-14">
              <ButtonV2 onClick={openAcuity} size="lg">
                Marcar primeira consulta
              </ButtonV2>
              <p className="mt-6 font-sans text-mono-v2 uppercase tracking-[0.12em] text-v2-paper/60">
                Telemedicina · 60 a 90 minutos · questionário prévio por email
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-12">
              <ButtonV2
                as="Link"
                to="/programa-fundacao"
                variant="ghost"
                className="text-v2-paper border-v2-paper/30 hover:border-v2-paper/70"
              >
                Conhecer o acompanhamento
              </ButtonV2>
            </FadeUp>
          </Container>
        </Section>
      </main>

      <LegalBand />
      <FooterV2 />
      <MobileCTA />
      <AcuityModal open={acuity.open} onClose={acuity.onClose} />
    </div>
  );
};

export default Sobre;
