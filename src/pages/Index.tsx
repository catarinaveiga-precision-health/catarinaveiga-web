import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredentialsBand from "@/components/CredentialsBand";
import Footer from "@/components/Footer";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import AcuityModal from "@/components/AcuityModal";
import { useAcuityModal, openAcuity } from "@/hooks/useAcuityModal";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AmberHairline = ({ className = "" }: { className?: string }) => (
  <div className={`w-[60px] h-[1px] bg-amber mx-auto ${className}`} />
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-8">
    {children}
  </p>
);

/* ── POSICIONAMENTO ── */
const PositioningQuote = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-3xl mx-auto text-center fade-up">
        <p className="font-serif italic text-[clamp(1.5rem,3vw,2.5rem)] leading-snug text-foreground">
          Os teus exames podem estar normais.
          <br />
          O teu corpo não se resume a isso.
        </p>
      </div>
    </section>
  );
};

/* ── O MEU TRABALHO ── */
const OMeuTrabalho = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>O meu trabalho</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          Leio. Interpreto. Acompanho.
        </h2>
        <div className="space-y-6 text-foreground/85 font-sans text-[1.0625rem] leading-[1.7]">
          <p>
            Trabalho a partir dos teus sinais, do teu histórico e dos teus padrões. A partir daí construo um plano individualizado em Medicina Tradicional Chinesa, que pode incluir fitoterapia, dietética, regulação de ritmo e acompanhamento longitudinal.
          </p>
          <p>
            Não substituo acompanhamento médico. Trabalho em complementaridade com ele sempre que necessário.
          </p>
          <p>
            Quando existem necessidades de diagnóstico, prescrição ou avaliação médica, há articulação com a Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos, e com outras especialidades quando indicado.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── O MÉTODO ── */
const metodoSteps = [
  {
    title: "Avaliação inicial",
    body: "Histórico clínico, sintomas, ciclo, sono, digestão, energia e contexto emocional.",
  },
  {
    title: "Leitura de padrões",
    body: "Identificação de desequilíbrios funcionais dentro do sistema de leitura de padrões funcionais.",
  },
  {
    title: "Plano individualizado",
    body: "Intervenções adaptadas ao teu padrão e fase de vida.",
  },
  {
    title: "Acompanhamento",
    body: "Ajustes ao longo do tempo e reavaliação periódica.",
  },
];

const OMetodo = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-4xl mx-auto fade-up">
        <div className="text-center mb-16">
          <Eyebrow>O método</Eyebrow>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14 max-w-2xl mx-auto">
          {metodoSteps.map((step, i) => (
            <div key={step.title}>
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-amber mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-xl text-foreground mb-3">{step.title}</h3>
              <p className="font-sans text-[15px] text-foreground/80 leading-[1.65]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── COMO FUNCIONA ── */
const funcionaSteps = [
  "Marcas a primeira consulta. Recebes um questionário prévio.",
  "Consulta inicial em videochamada (60–90 min). Saímos com um plano estruturado.",
  "Acompanhamento e ajustes conforme evolução.",
];

const ComoFunciona = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>Como funciona</Eyebrow>
        <div className="space-y-8 md:space-y-10">
          {funcionaSteps.map((body, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 items-baseline">
              <p className="font-serif italic text-2xl md:text-3xl text-amber shrink-0">{String(i + 1).padStart(2, "0")}</p>
              <p className="font-sans text-[1rem] md:text-[1.0625rem] leading-[1.65] md:leading-[1.7] text-foreground/85">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FORMATO ── */
const FormatoLine = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center fade-up">
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
          Formato
        </p>
        <p className="font-serif text-[clamp(1.25rem,2vw,1.625rem)] text-foreground">
          Telemedicina · Portugal e estrangeiro
        </p>
      </div>
    </section>
  );
};

/* ── ANTES DE MARCARES (FAQ teaser) ── */
const faqQuestions = [
  "O que acontece na primeira consulta?",
  "Como funciona o acompanhamento?",
  "Em que casos é indicado este acompanhamento?",
  "Como olhas para as análises clínicas?",
  "O que posso esperar ao longo do tempo?",
];

const FAQTeaser = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>Antes de marcares</Eyebrow>
        <ul className="space-y-0">
          {faqQuestions.map((q, i) => (
            <li
              key={q}
              className={`font-serif text-[1.125rem] md:text-[1.375rem] text-foreground/90 py-4 md:py-5 ${
                i < faqQuestions.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {q}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            to="/sobre#faq"
            className="font-sans text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors border-b border-amber pb-1"
          >
            Mais perguntas →
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ── TESTEMUNHOS ── */
const testimonials = [
  { quote: "Pela primeira vez senti que alguém olhou para tudo ao mesmo tempo.", attr: "M., 44" },
  { quote: "Não preciso de promessas. Preciso de ser escutada com método.", attr: "A., 47" },
  { quote: "O sono mudou. Não num dia, mas mudou.", attr: "S., 49" },
];

const Testemunhos = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-3xl mx-auto fade-up">
        <div className="text-center mb-14">
          <Eyebrow>O que as pacientes descrevem</Eyebrow>
        </div>
        <div className="space-y-12 md:space-y-16">
          {testimonials.map((t) => (
            <blockquote key={t.attr} className="text-center">
              <p className="font-serif italic text-[clamp(1.25rem,2vw,1.5rem)] leading-snug text-foreground max-w-[44ch] mx-auto">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground mt-4">
                {t.attr}
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="text-center font-sans text-[12px] italic text-muted-foreground/70 mt-16 max-w-[50ch] mx-auto">
          Experiência subjetiva. Não representa promessa de resultados clínicos.
        </p>
      </div>
    </section>
  );
};

/* ── CTA FINAL ── */
const CTAFinalSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto text-center fade-up">
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-8">
          Pronta para começar.
        </h2>
        <p className="font-sans text-[1.0625rem] text-foreground/85 max-w-[48ch] mx-auto mb-3 leading-relaxed">
          Marca a primeira consulta.
        </p>
        <p className="font-sans text-[1.0625rem] text-foreground/85 max-w-[48ch] mx-auto mb-10 leading-relaxed">
          Saímos com um plano estruturado.
        </p>
        <AmberHairline className="mb-10" />
        <p className="font-sans text-sm text-muted-foreground mb-8 tracking-wide">
          Consulta inicial · 60–90 min · telemedicina
        </p>
        <Button variant="hero" size="lg" onClick={openAcuity}>
          Marcar consulta
        </Button>
        <p className="font-sans text-xs text-muted-foreground/60 mt-5 tracking-wide">
          Recebes o questionário prévio por email.
        </p>
      </div>
    </section>
  );
};

/* ── PAGE ── */
const Index = () => {
  const { open, onClose } = useAcuityModal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CredentialsBand />
        <PositioningQuote />
        <OMeuTrabalho />
        <OMetodo />
        <ComoFunciona />
        <FormatoLine />
        <FAQTeaser />
        <Testemunhos />
        <CTAFinalSection />
      </main>
      <LegalBand />
      <Footer />
      <MobileCTA />
      <AcuityModal open={open} onClose={onClose} />
    </>
  );
};

export default Index;
