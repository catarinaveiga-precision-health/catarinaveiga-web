import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCTA from "@/components/seo/SEOCTA";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const whenUseful = [
  "Fadiga que não melhora com descanso",
  "Exames \"normais\" mas sintomas reais",
  "Desequilíbrios hormonais — ciclos irregulares, sintomas pré-menstruais intensos, perimenopausa",
  "Problemas digestivos crónicos — obstipação, inchaço, digestão lenta",
  "Inflamação crónica de baixo grau",
  "Disfunção tiroideia subclínica",
  "Sistema nervoso cronicamente activado",
];

const biomarkers = [
  { title: "Ferritina", desc: "Essencial para energia, cabelo e função cognitiva" },
  { title: "TSH, T3 e T4 livres", desc: "Avaliação completa da função tiroideia" },
  { title: "Insulina em jejum", desc: "Sobe anos antes da glicemia" },
  { title: "Vitamina D", desc: "Envolvida na imunidade, humor e regulação hormonal" },
  { title: "PCR de alta sensibilidade", desc: "Detecta inflamação crónica de baixo grau" },
];

const whoCanBenefit = [
  "Tens sintomas persistentes há meses ou anos sem explicação clara",
  "Já passaste por vários especialistas e cada um vê uma peça isolada",
  "Estás em perimenopausa e sentes que o teu corpo mudou",
  "Queres perceber o que os teus biomarcadores estão realmente a dizer",
];

const faqs = [
  {
    q: "O que é medicina funcional integrativa?",
    a: "É uma abordagem clínica que combina investigação de causas raiz com intervenções baseadas em evidência — nutrição terapêutica, modulação do estilo de vida, suplementação dirigida e colaboração com medicina convencional quando necessário.",
  },
  {
    q: "Medicina funcional tem base científica?",
    a: "Sim. Utiliza os mesmos exames laboratoriais e os mesmos princípios fisiológicos da medicina convencional — com uma interpretação mais detalhada e uma abordagem sistémica.",
  },
  {
    q: "Medicina funcional em Cascais — existe consulta presencial?",
    a: "Trabalho exclusivamente em formato online. As consultas por videochamada permitem o mesmo nível de detalhe clínico com flexibilidade total de horário e localização.",
  },
  {
    q: "Quanto custa uma consulta de medicina funcional?",
    a: "Os valores estão disponíveis na página de avaliação. A primeira consulta é uma avaliação funcional inicial.",
  },
];

const FAQSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          Perguntas frequentes
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          FAQ — Medicina Funcional
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-sans font-normal text-foreground py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[15px] pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const MedicinaFuncional = () => {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Medicina Funcional: o que é e quando pode ajudar",
    "description": "A medicina funcional investiga as causas raiz de sintomas persistentes — especialmente quando os exames parecem normais.",
    "url": "https://www.catarinaveiga.com/medicina-funcional",
    "inLanguage": "pt",
    "publisher": {
      "@type": "Organization",
      "name": "Catarina Veiga — Medicina Funcional Integrativa",
      "url": "https://www.catarinaveiga.com",
    },
    /* FAQPage aninhado removido (auditoria 2026-08-24): coexistia com o
       FAQPage do prerender e dava uma resposta de preço diferente na mesma
       página. O prerender é a fonte única do FAQPage desta rota. */
  };

  return (
    <SEOPageLayout
      title="Medicina Funcional: Quando os Exames Dão Tudo Normal"
      description="Os teus exames estão normais mas os sintomas continuam. A medicina funcional investiga as causas que os valores de referência standard não mostram."
      canonical="https://www.catarinaveiga.com/medicina-funcional"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional Integrativa"
        title="Medicina Funcional: o que é e quando pode ajudar"
        intro={"A medicina funcional é uma abordagem clínica que investiga as causas raiz de sintomas persistentes — especialmente quando os exames parecem \"normais\". Em vez de perguntar \"qual é o diagnóstico?\", pergunta \"porque é que este corpo específico está a funcionar assim?\""}
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Medicina Funcional" },
        ]}
      />

      <SEOContentSection label="O essencial" title="O que é a medicina funcional">
        <p>
          A medicina funcional parte de um princípio fisiológico simples: o corpo é um sistema interligado. Um problema hormonal pode ter origem num intestino inflamado. Uma fadiga persistente pode estar enraizada num défice de ferritina que o laboratório não sinalizou. Uma ansiedade cíclica pode ser progesterona — não stress.
        </p>
        <p>
          A medicina convencional é excelente a tratar doenças estabelecidas. A medicina funcional intervém mais cedo — quando os sistemas do corpo já mostram sinais de desequilíbrio, mesmo antes de surgir um diagnóstico claro.
        </p>
        <p>
          A diferença não está nos exames em si. Está em como são interpretados. Os intervalos de referência laboratoriais são construídos com base em médias estatísticas — não em valores óptimos para um corpo saudável.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="A diferença não está nos exames em si. Está em como são interpretados." />

      <SEOSymptomGrid
        label="Sinais a considerar"
        title="Quando esta abordagem pode ser útil"
        symptoms={whenUseful}
      />

      <SEOPatternCards
        label="Biomarcadores"
        title="Medicina funcional e interpretação de análises"
        patterns={biomarkers}
        bg="almond"
      />

      <SEOContentSection label="Complementaridade" title="Diferença entre medicina funcional e medicina convencional" bg="light">
        <p>
          A medicina funcional não substitui a medicina convencional. Complementa-a. Actua numa zona diferente: os sintomas que existem antes do diagnóstico estabelecido. O trabalho é sempre documentado e partilhável com o médico de família ou especialista.
        </p>
      </SEOContentSection>

      <SEOContentSection label="Para quem" title="Quem pode beneficiar desta abordagem" bg="almond">
        <p>Trabalho exclusivamente com mulheres, com foco nos anos 35–55.</p>
        <p className="font-sans font-normal text-foreground text-[15px] mt-2">É para ti se:</p>
        <ul className="space-y-3 mt-4">
          {whoCanBenefit.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-matcha mt-1 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SEOContentSection>

      <SEOContentSection label="Localização" title="Consultas de medicina funcional em Cascais, Lisboa e online">
        <p>
          Trabalho exclusivamente em formato telehealth — consultas por videochamada para toda a região de Lisboa, Cascais e Portugal, e para pacientes internacionais. As consultas são em português europeu ou inglês.
        </p>
      </SEOContentSection>

      <FAQSection />

      <SEOCTA
        title="Por onde começar"
        subtitle={"Muitas mulheres chegam aqui depois de anos a ouvir que \"está tudo normal\". A avaliação funcional serve exactamente para investigar esses casos — com os biomarcadores certos, os intervalos certos, e o contexto clínico que falta."}
        buttonText="Faz a tua avaliação funcional inicial"
        buttonTo="/avaliacao"
        note=""
      />
    </SEOPageLayout>
  );
};

export default MedicinaFuncional;
