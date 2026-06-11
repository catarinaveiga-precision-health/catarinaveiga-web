import { useEffect, useRef } from "react";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";

/* ── Stagger hook ── */
const useStaggerFadeUp = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll(".stagger-item");
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 80);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ── Section Divider ── */
const SectionDivider = () => (
  <div className="max-w-5xl mx-auto px-6">
    <Separator className="bg-v2-paper-deep" />
  </div>
);

/* ── HERO ── */
const Hero = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding pt-32">
      <div className="max-w-3xl mx-auto text-center">
        <div className="fade-up flex justify-center mb-6">
          <div className="w-[60px] h-[2px] bg-v2-golden" />
        </div>
        <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
          Método RAIZ
        </span>
        <h1 className="fade-up font-serif text-4xl md:text-5xl lg:text-[48px] text-v2-ink mb-6 leading-tight font-light">
          Medicina que investiga. Não que suprime.
        </h1>
        <p className="fade-up text-v2-ink-mute max-w-[560px] mx-auto mb-10 text-[19px]">
          O Método RAIZ parte da hipótese de que sintomas persistentes têm causas
          identificáveis. O trabalho é encontrá-las.
        </p>
        <a
          href="#como-funciona"
          className="fade-up text-sm font-sans text-v2-golden hover:text-v2-ink transition-colors"
        >
          Como funciona na prática ↓
        </a>
      </div>
    </section>
  );
};

/* ── CONTRAST BLOCK ── */
const ContrastBlock = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-ink text-center mb-14">
          Não é o mesmo que ir ao médico. Mas não substitui.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="fade-up bg-v2-paper rounded-[24px] p-8">
            <h3 className="font-serif text-2xl text-v2-ink mb-4">Medicina Convencional</h3>
            <ul className="space-y-3 text-v2-ink-mute text-[15px]">
              <li>Diagnóstico de doença estabelecida</li>
              <li>Sintoma → fármaco</li>
              <li>Especialidade por órgão</li>
            </ul>
          </div>
          <div className="fade-up bg-v2-paper rounded-[24px] p-8 border-l-2 border-v2-golden">
            <h3 className="font-serif text-2xl text-v2-ink mb-4">Medicina Funcional</h3>
            <ul className="space-y-3 text-v2-ink-mute text-[15px]">
              <li>Padrão disfuncional antes da doença</li>
              <li>Causa raiz → protocolo</li>
              <li>Visão sistémica</li>
            </ul>
          </div>
        </div>
        <p className="fade-up text-center text-v2-ink-mute text-[15px] italic">
          Trabalho sempre em complemento com o teu médico — nunca em substituição.
        </p>
      </div>
    </section>
  );
};

/* ── 4 PILLARS ── */
const pillars = [
  {
    num: "01",
    label: "Raiz",
    title: "A pergunta não é o que tens. É porquê tens.",
    body: "Análise de 5 sistemas — eixo HPA, função tiroideia, estado nutricional, microbioma, metabolismo hormonal. Com biomarcadores e com contexto clínico.",
  },
  {
    num: "02",
    label: "Protocolo",
    title: "A ordem importa. A dose importa. O timing importa.",
    body: "Intervenção sequencial com critérios de progressão definidos. Nutrição terapêutica, suplementação baseada em análises, regulação do ritmo circadiano.",
  },
  {
    num: "03",
    label: "Monitorização",
    title: "O que não é medido não é gerido.",
    body: "Reavaliação analítica a 6-8 semanas. Comparação de biomarcadores documentada. Ajuste do protocolo com base nos dados, não em sensações subjectivas.",
  },
  {
    num: "04",
    label: "Autonomia",
    title: "No fim, sais com ferramentas. Não com dependência.",
    body: "Conhecimento clínico transferido para a paciente com plano de manutenção escrito. Clareza sobre o que monitorizar e porquê.",
  },
];

const Pillars = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} id="como-funciona" className="bg-v2-paper section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-ink text-center mb-16">
          Os quatro pilares
        </h2>
        <div className="space-y-0">
          {pillars.map((p, i) => (
            <div key={i}>
              {i > 0 && <Separator className="bg-v2-paper-deep" />}
              <div className="fade-up relative py-14 pl-4 md:pl-6">
                <span className="font-serif text-[96px] leading-none text-bone absolute -top-2 right-0 select-none hidden md:block opacity-50">
                  {p.num}
                </span>
                <span className="label-uppercase text-v2-golden text-xs">{p.label}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-v2-ink mt-2 mb-3">
                  {p.title}
                </h3>
                <p className="text-v2-ink-mute text-[15px] max-w-2xl">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── WHAT I ANALYSE ── */
const analyses = [
  { title: "Eixo HPA", desc: "stress crónico, cortisol, ritmo circadiano" },
  { title: "Função Tiroideia", desc: "T3 livre, rT3, anticorpos, ferritina" },
  { title: "Estado Nutricional", desc: "vitamina D, B12, ferro, magnésio, zinco" },
  { title: "Microbioma", desc: "disbiose, permeabilidade intestinal, histamina" },
  { title: "Metabolismo Hormonal", desc: "insulina, estrogénios, progesterona, androgénios" },
];

const WhatIAnalyse = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-5xl mx-auto">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-ink text-center mb-14">
          O que investigo
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {analyses.map((a, i) => (
            <div
              key={i}
              className="fade-up bg-v2-paper rounded-[24px] p-6 border-t-2 border-v2-golden"
            >
              <h4 className="font-serif text-lg text-v2-ink mb-2">{a.title}</h4>
              <p className="text-v2-ink-mute text-[13px]">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── LAB RANGES ── */
const LabRanges = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-ink text-center mb-14">
          Por que os teus exames estão normais e tu não te sentes bem
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="fade-up bg-v2-paper-deep rounded-[24px] p-8">
            <h3 className="font-serif text-2xl text-v2-ink mb-4">Referências Convencionais</h3>
            <p className="text-v2-ink-mute text-[15px]">
              Calculadas a partir da população geral — incluindo pessoas doentes. Representam
              ausência de doença diagnosticável, não presença de saúde óptima.
            </p>
          </div>
          <div className="fade-up bg-v2-paper-deep rounded-[24px] p-8 border-l-2 border-v2-golden">
            <h3 className="font-serif text-2xl text-v2-ink mb-4">
              Referências Funcionais (ODX)
            </h3>
            <p className="text-v2-ink-mute text-[15px]">
              Representam a faixa onde o organismo funciona de forma óptima. São mais exigentes,
              mais informativas, e mais úteis clinicamente.
            </p>
          </div>
        </div>
        <p className="fade-up text-center font-serif italic text-[28px] text-v2-ink leading-relaxed max-w-2xl mx-auto">
          "A diferença entre 'sem doença' e 'com saúde óptima' pode ser anos de sintomas."
        </p>
      </div>
    </section>
  );
};

/* ── CONDITIONS ── */
const conditions = [
  "Disfunção tiroideia subclínica",
  "Fadiga crónica",
  "Resistência insulínica",
  "Perimenopausa multissintomática",
  "Intolerância à histamina",
  "Défice de ferritina",
  "Disbiose intestinal",
  "Burnout neuroendócrino",
  "SOP",
  "Fibromialgia funcional",
];

const Conditions = () => {
  const ref = useStaggerFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-v2-ink text-center mb-14">
          Condições que acompanho com mais frequência
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {conditions.map((c, i) => (
            <span
              key={i}
              className="stagger-item fade-up inline-block rounded-full border border-v2-golden px-5 py-2 text-v2-ink text-[14px] font-sans bg-v2-paper-deep"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── CREDENTIALS ── */
const CredentialsBar = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper py-16 px-6">
      <p className="fade-up text-center text-v2-ink-mute text-[14px] font-sans">
        20+ anos de experiência{" "}
        <span className="text-v2-golden mx-2">·</span> Omnos London (4 anos){" "}
        <span className="text-v2-golden mx-2">·</span> Regenerus Labs UK{" "}
        <span className="text-v2-golden mx-2">·</span> Formação certificada internacional
      </p>
    </section>
  );
};

/* ── FAQ ── */
const faqItems = [
  {
    q: "Medicina funcional tem base científica?",
    a: "Sim. Baseia-se em fisiologia, bioquímica e endocrinologia — as mesmas disciplinas da medicina convencional. A diferença está nos intervalos de referência e na abordagem sistémica.",
  },
  {
    q: "Trabalha em complemento com o meu médico?",
    a: "Sim, sempre. Não substituo cuidados médicos. Complemento com investigação funcional que o sistema convencional não tem capacidade de fazer com o detalhe que o teu caso requer.",
  },
  {
    q: "O que são intervalos de referência funcionais?",
    a: "Os intervalos laboratoriais convencionais são calculados a partir da população geral, incluindo pessoas doentes. Os intervalos funcionais (ODX) representam a faixa onde o organismo funciona de forma óptima.",
  },
  {
    q: "Quais as condições que acompanha?",
    a: "Disfunção tiroideia subclínica, fadiga crónica, resistência insulínica, perimenopausa multissintomática, intolerância à histamina, défice de ferritina, disbiose intestinal, burnout neuroendócrino.",
  },
];

const FAQSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-2xl mx-auto">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-ink text-center mb-12">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="fade-up">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="font-serif text-lg text-v2-ink hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-v2-ink-mute text-[15px]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

/* ── FINAL CTA ── */
const FinalCTA = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-moss section-padding" style={{ backgroundColor: "#1F1A14" }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-paper mb-6">
          Curiosa sobre se esta abordagem é certa para o teu caso?
        </h2>
        <div className="fade-up">
          <Button
            variant="outline"
            size="lg"
            className="border-ivory/30 text-v2-paper hover:bg-v2-paper hover:text-v2-ink transition-all duration-300 font-sans font-normal tracking-wide"
            asChild
          >
            <a href="/candidatura">Fazer a triagem gratuita</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

/* ── PAGE ── */
const Metodo = () => {
  return (
    <div className="min-h-screen">
      <NavbarV2 />
      <Hero />
      <SectionDivider />
      <ContrastBlock />
      <SectionDivider />
      <Pillars />
      <SectionDivider />
      <WhatIAnalyse />
      <SectionDivider />
      <LabRanges />
      <SectionDivider />
      <Conditions />
      <CredentialsBar />
      <FAQSection />
      <FinalCTA />
      <FooterV2 />
      <LegalBand />
    </div>
  );
};

export default Metodo;
