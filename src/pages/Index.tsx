import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredentialsBand from "@/components/CredentialsBand";
import TrustBand from "@/components/TrustBand";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import AcuityModal from "@/components/AcuityModal";
import { useAcuityModal, openAcuity } from "@/hooks/useAcuityModal";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const AmberHairline = ({ className = "" }: { className?: string }) => (
  <div className={`w-[60px] h-[1px] bg-amber mx-auto ${className}`} />
);

const Eyebrow = ({ children, center = false }: { children: React.ReactNode; center?: boolean }) => (
  <p
    className={`font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-8 ${
      center ? "text-center" : ""
    }`}
  >
    {children}
  </p>
);

/* ── 4. POSICIONAMENTO ── */
const PositioningQuote = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-3xl mx-auto text-center fade-up px-6">
        <p className="font-serif italic text-[clamp(1.5rem,3vw,2.5rem)] leading-snug text-foreground">
          Entre o normal laboratorial e sentir-se verdadeiramente bem existe muitas vezes um espaço que merece atenção.
        </p>
      </div>
    </section>
  );
};

/* ── 5. DOMÍNIOS DE ATUAÇÃO ── */
const dominios = [
  "Saúde hormonal feminina",
  "Transições hormonais (perimenopausa, pós-parto, pós-pílula)",
  "Digestão e metabolismo",
  "Fadiga e padrões de energia",
];

const Dominios = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up px-6">
        <Eyebrow>Domínios de atuação</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          Onde concentro a leitura clínica
        </h2>
        <ul className="space-y-5">
          {dominios.map((d) => (
            <li
              key={d}
              className="font-serif text-[1.125rem] md:text-[1.375rem] text-foreground/90 border-b border-border pb-5 last:border-b-0"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ── 6. COMO TRABALHO ── */
const comoTrabalhoCards = [
  {
    title: "Avaliação inicial",
    body: "Histórico clínico, sintomas, ciclo, sono, digestão, energia e contexto emocional.",
  },
  {
    title: "Leitura de padrões",
    body: "Interpretação integrada de sinais, sintomas e marcadores funcionais.",
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

const ComoTrabalho = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-4xl mx-auto fade-up px-6">
        <Eyebrow>Como trabalho</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-8 text-balance">
          Leio antes de propor.
        </h2>
        <p className="font-sans text-[1.0625rem] leading-[1.7] text-foreground/85 max-w-[60ch] mb-16">
          Avalio, interpreto e acompanho. Trabalho a partir dos teus sinais, do teu histórico e dos teus padrões, e a partir daí construo um plano individualizado, com acompanhamento longitudinal.
        </p>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14 max-w-3xl">
          {comoTrabalhoCards.map((c, i) => (
            <div key={c.title}>
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-amber mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-xl text-foreground mb-3">{c.title}</h3>
              <p className="font-sans text-[15px] text-foreground/80 leading-[1.65]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── 7. LEITURAS COMPLEMENTARES ── */
const leiturasRows = [
  ["Foco no valor isolado", "Foco no padrão integrado"],
  ["Intervalos de referência populacionais", "Intervalos funcionais adaptados ao contexto"],
  ["Resposta sintomática", "Resposta longitudinal"],
  ["Pontual", "Continuada"],
];

const LeiturasComplementares = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-4xl mx-auto fade-up px-6">
        <Eyebrow>Leituras complementares</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-6 text-balance">
          Diferentes formas de olhar para o mesmo quadro clínico
        </h2>
        <p className="font-sans text-[1.0625rem] leading-[1.7] text-foreground/80 max-w-[62ch] mb-14">
          A leitura convencional e a leitura funcional respondem a perguntas distintas. Não se opõem — complementam-se quando integradas.
        </p>
        <div className="border-t border-border">
          <div className="grid grid-cols-2 py-5 border-b border-border">
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Leitura convencional
            </p>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Leitura funcional
            </p>
          </div>
          {leiturasRows.map(([a, b]) => (
            <div key={a} className="grid grid-cols-2 gap-6 py-5 md:py-6 border-b border-border">
              <p className="font-serif text-[1rem] md:text-[1.125rem] text-foreground/85 leading-snug">
                {a}
              </p>
              <p className="font-serif text-[1rem] md:text-[1.125rem] text-foreground/85 leading-snug">
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── 8. ANTES DE MARCARES (teaser ferramenta) ── */
const FerramentaTeaser = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-2xl mx-auto fade-up px-6 text-center">
        <Eyebrow center>Antes de marcares</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-6 text-balance">
          Os teus exames estão normais. Mas estão bem?
        </h2>
        <p className="font-sans text-[1.0625rem] leading-[1.7] text-foreground/85 max-w-[58ch] mx-auto mb-10">
          Há uma diferença entre &ldquo;dentro dos intervalos&rdquo; e &ldquo;em funcionamento óptimo&rdquo;. Esta ferramenta deixa-te ver os teus marcadores nos dois.
        </p>
        <AmberHairline className="mb-10" />
        <Button variant="hero" size="lg" asChild>
          <Link to="/avaliacao">Ver os meus marcadores →</Link>
        </Button>
        <p className="font-sans text-[12px] italic text-muted-foreground/70 mt-8 max-w-[50ch] mx-auto">
          Conteúdo de leitura pessoal. Não constitui diagnóstico nem substitui consulta médica.
        </p>
      </div>
    </section>
  );
};

/* ── 9. TRÊS FORMAS DE COMEÇAR ── */
const formas = [
  {
    title: "Consulta inicial",
    body: "60–90 minutos de anamnese aprofundada. História clínica, sintomas e exames anteriores. Saímos com um plano estruturado.",
    micro: "Consulta inicial · 60–90 min · €120",
  },
  {
    title: "Checkup funcional",
    body: "Pedimos as análises. Tu fazes. Devolvemos uma leitura funcional dos teus biomarcadores, com integração de padrões.",
    micro: "Inclui pedido de análises + relatório escrito",
  },
  {
    title: "Revisão de análises",
    body: "Já tens análises feitas. Envias-nos. Devolvemos uma leitura funcional com padrões identificados e contexto integrado.",
    micro: "Relatório escrito",
  },
];

const TresFormas = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-6xl mx-auto fade-up px-6">
        <Eyebrow>Trabalhar comigo</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-6 text-balance">
          Três formas de começar
        </h2>
        <p className="font-sans text-[1.0625rem] leading-[1.7] text-foreground/80 max-w-[62ch] mb-14">
          Uma escada clara: a consulta inicial é a porta de entrada. A partir daí, podes optar por acompanhamento contínuo ou por uma leitura pontual das tuas análises.
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {formas.map((f) => (
            <div key={f.title} className="bg-bone p-8 md:p-10 flex flex-col">
              <h3 className="font-serif text-2xl text-foreground mb-4">{f.title}</h3>
              <p className="font-sans text-[15px] text-foreground/80 leading-[1.65] mb-6 flex-1">
                {f.body}
              </p>
              <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-6">
                {f.micro}
              </p>
              <Button variant="hero" size="default" onClick={openAcuity} className="w-full">
                Agendar consulta inicial
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── 10. PROGRAMA FUNDAÇÃO ── */
const programaFeatures = [
  ["Consultas estruturadas", "Sessões de revisão em momentos-chave do acompanhamento."],
  ["Leitura funcional de análises", "Marcadores além do padrão convencional."],
  ["Plano individualizado", "Nutrição, suplementação e estilo de vida à medida."],
  ["Suporte Maya", "Agente de apoio educativo entre consultas."],
  ["Reavaliação final", "Leitura comparativa dos 3 meses."],
  ["Materiais educativos", "Recursos e guias para autonomia em saúde."],
];

const ProgramaFundacao = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-5xl mx-auto fade-up px-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-amber mb-6">
          Acompanhamento estruturado
        </p>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-6 text-balance">
          Programa Fundação — acompanhamento de 3 meses
        </h2>
        <p className="font-sans text-[1.0625rem] leading-[1.7] text-foreground/85 max-w-[62ch] mb-12">
          Quando, após a consulta inicial, faz sentido um acompanhamento mais prolongado, proponho um plano estruturado para os próximos três meses.
        </p>

        <div className="border-l-2 border-amber pl-6 mb-14 max-w-[62ch]">
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
            Porquê 3 meses
          </p>
          <p className="font-sans text-[1rem] leading-[1.7] text-foreground/85">
            O corpo precisa de tempo para responder. O sistema hormonal demora 6 a 8 semanas a reagir a intervenções. A neuroplasticidade exige repetição consistente. Três meses é o mínimo para uma leitura comparativa robusta. Não é um número arbitrário — é fisiologia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mb-14">
          {programaFeatures.map(([title, body], i) => (
            <div key={title}>
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-amber mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-lg text-foreground mb-2">{title}</h3>
              <p className="font-sans text-[14px] text-foreground/75 leading-[1.6]">{body}</p>
            </div>
          ))}
        </div>

        <AmberHairline className="mb-10 mx-0" />
        <p className="font-sans text-sm text-muted-foreground mb-8">
          Investimento discutido na consulta inicial em função do enquadramento do caso.
        </p>
        <Button variant="hero" size="lg" onClick={openAcuity}>
          Agendar consulta inicial
        </Button>
      </div>
    </section>
  );
};

/* ── 11. O QUE NÃO FAÇO ── */
const naoFaco = [
  "O acompanhamento não substitui consulta médica convencional.",
  "Não é um serviço de urgência.",
  "Não envolve diagnóstico médico nem prescrição farmacológica.",
  "Quando existe necessidade de avaliação médica, há articulação com a Dra. Patrícia Salvador (médica inscrita na Ordem dos Médicos) ou referenciação para outras especialidades.",
];

const OQueNaoFaco = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up px-6">
        <Eyebrow>Enquadramento</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          O que não faço
        </h2>
        <ul className="space-y-6">
          {naoFaco.map((item) => (
            <li
              key={item}
              className="font-serif text-[1.0625rem] md:text-[1.1875rem] leading-[1.65] text-foreground/85 border-b border-border pb-6 last:border-b-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ── 13. FAQ ── */
const faqItems = [
  {
    q: "O que acontece na primeira consulta?",
    a: "Começamos pela tua história clínica completa — sintomas, ciclo, sono, digestão, energia, exames anteriores e contexto hormonal. Saio dessa consulta com uma leitura integrada do teu caso e com um plano estruturado.",
  },
  {
    q: "Como funciona o acompanhamento?",
    a: "A primeira consulta é o ponto de partida, não o fim. O plano vai sendo ajustado ao longo do tempo, com reavaliações periódicas conforme a tua evolução. É um processo, não um momento isolado.",
  },
  {
    q: "Em que casos é indicado este acompanhamento?",
    a: "Sintomas persistentes que não encontram resposta clara, transições hormonais (perimenopausa, pós-parto, pós-pílula), padrões funcionais que merecem atenção, e situações em que os exames estão dentro dos intervalos mas o corpo continua a sinalizar que algo não está bem.",
  },
  {
    q: "Isto é indicado se já tomo medicação ou terapia hormonal?",
    a: "Sim, frequentemente. O acompanhamento não interfere com medicação prescrita pelo teu médico nem altera prescrições. Trabalho em complementaridade, e quando faz sentido, há articulação com a Dra. Patrícia Salvador ou com o teu médico assistente.",
  },
  {
    q: "Isto substitui acompanhamento médico?",
    a: "Não. O meu trabalho não substitui consulta médica, diagnóstico ou tratamento. Quando existe necessidade de avaliação, prescrição ou referenciação médica, há articulação com a Dra. Patrícia Salvador ou outras especialidades indicadas.",
  },
  {
    q: "Como olhas para as análises clínicas?",
    a: "Como uma das camadas de leitura, não a única. Os valores laboratoriais dizem muito, mas não dizem tudo — sobretudo na perimenopausa, onde a fisiologia muda mais rapidamente do que os intervalos de referência conseguem captar. Integro essa informação com sintomas, padrões e histórico.",
  },
  {
    q: "Como costuma evoluir o acompanhamento?",
    a: "Cada corpo tem o seu ritmo. A evolução depende de muitos fatores e não é linear — algumas mudanças surgem cedo, outras pedem mais tempo. O que faço é acompanhar essa evolução de perto e ajustar conforme o que o teu corpo for mostrando.",
  },
];

const FAQSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} id="faq" className="bg-background section-padding">
      <div className="max-w-2xl mx-auto fade-up px-6">
        <Eyebrow>Antes de marcares</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="font-serif text-[1.0625rem] md:text-[1.25rem] text-foreground/90 text-left hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[15px] text-foreground/80 leading-[1.7] pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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

/* ── 14. CTA FINAL ── */
const CTAFinalSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto text-center fade-up px-6">
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-10 text-balance">
          Estás cansada de ouvir que está tudo normal?
        </h2>
        <p className="font-sans text-sm text-muted-foreground mb-8 tracking-wide">
          Consulta inicial · 60–90 min · €120 · telemedicina
        </p>
        <Button variant="hero" size="lg" onClick={openAcuity}>
          Agendar consulta inicial
        </Button>
        <p className="font-sans text-xs text-muted-foreground/60 mt-5 tracking-wide">
          Recebes o questionário prévio por email. Resposta em 48h.
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
        <TrustBand />
        <PositioningQuote />
        <Dominios />
        <ComoTrabalho />
        <LeiturasComplementares />
        <FerramentaTeaser />
        <TresFormas />
        <ProgramaFundacao />
        <OQueNaoFaco />
        <GoogleReviews />
        <FAQSection />
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
