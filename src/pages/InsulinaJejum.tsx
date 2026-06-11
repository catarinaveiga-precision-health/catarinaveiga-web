import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOComparison from "@/components/seo/SEOComparison";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCalculator from "@/components/seo/SEOCalculator";
import SEOCTA from "@/components/seo/SEOCTA";
import { useFadeUp } from "@/hooks/useFadeUp";

const symptoms = [
  "Fadiga pós-prandial — cansaço a seguir às refeições",
  "Cravings intensos de açúcar ou hidratos de carbono",
  "Dificuldade em perder peso apesar de dieta controlada",
  "Peso concentrado na zona abdominal",
  "Nevoeiro mental após refeições",
  "Fome intensa poucas horas após comer",
  "Irritabilidade quando não come",
  "Alterações de humor relacionadas com refeições",
];

const patterns = [
  { title: "Insulina elevada + glicose normal", desc: "Hiperinsulinemia compensatória precoce" },
  { title: "Insulina elevada + triglicéridos altos", desc: "Síndrome metabólica clássica" },
  { title: "Insulina elevada + vitamina D baixa", desc: "Défice de vitamina D associado a resistência à insulina" },
  { title: "Insulina elevada + PCR elevada", desc: "Inflamação e resistência metabólica frequentemente coexistem" },
];

const insulinCalc = (values: string[]) => {
  const v = parseFloat(values[0]);
  if (isNaN(v) || v < 0) return null;

  let icon = "", text = "";
  if (v < 2) {
    icon = "⚠️"; text = "Insulina muito baixa (<2 µIU/mL). Requer contexto clínico — pode indicar hipoinsulinemia.";
  } else if (v <= 5) {
    icon = "🟢"; text = "Insulina dentro do intervalo funcional (2–5 µIU/mL). Boa sensibilidade celular à insulina.";
  } else if (v <= 10) {
    icon = "🟡"; text = "Insulina limítrofe (5–10 µIU/mL). O pâncreas pode já estar a compensar. Monitorização recomendada.";
  } else if (v <= 25) {
    icon = "🔴"; text = "Insulina elevada (>10 µIU/mL). Padrão de hiperinsulinemia — resistência metabólica e risco cardiovascular.";
  } else {
    icon = "⚠️"; text = "Insulina muito elevada (>25 µIU/mL). Avaliação clínica urgente — resistência à insulina significativa.";
  }

  return { icon, text };
};

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "Posso ter insulina elevada com glicose normal?",
      a: "Sim, e é um dos padrões mais precoces de resistência metabólica: chama-se hiperinsulinemia compensatória. A glicose pode estar normal enquanto o pâncreas já trabalha em excesso para a manter controlada. Este padrão pode preceder um diagnóstico de diabetes tipo 2 por uma década.",
    },
    {
      q: "Qual é o valor ideal de insulina em jejum?",
      a: "O intervalo funcional situa-se entre 2 e 5 µIU/mL, associado a boa sensibilidade celular à insulina. Valores acima de 5 a 7 já podem indicar resistência metabólica, e acima de 10 trata-se de hiperinsulinemia franca, com risco cardiovascular associado.",
    },
    {
      q: "Que sintomas pode dar a insulina elevada?",
      a: "Os sintomas frequentes incluem fadiga pós-prandial (cansaço a seguir às refeições), cravings intensos de açúcar ou hidratos, dificuldade em perder peso apesar de dieta controlada, peso concentrado na zona abdominal, nevoeiro mental após refeições, fome intensa poucas horas após comer e irritabilidade quando não come.",
    },
    {
      q: "Porque é que o exame de glicose não detecta o problema?",
      a: "Porque a glicose pode mascarar o problema durante anos. O intervalo laboratorial da insulina (2 a 25 µIU/mL) é muito amplo e está focado em diabetes manifesta, não em resistência inicial. A monitorização precoce da insulina em jejum permite prevenir a progressão para pré-diabetes.",
    },
    {
      q: "A insulina elevada está associada a outros marcadores alterados?",
      a: "Sim, há padrões combinados relevantes: insulina elevada com triglicéridos altos é a síndrome metabólica clássica, com vitamina D baixa associa-se a resistência à insulina, e com PCR elevada reflecte a coexistência frequente de inflamação e resistência metabólica.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          Perguntas frequentes
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          FAQ: insulina em jejum
        </h2>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="space-y-10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-sans font-normal text-foreground text-[17px] mb-3">
                {faq.q}
              </h3>
              <p className="font-sans font-light text-foreground/70 text-[15px] leading-[1.85]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InsulinaJejum = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Insulina em Jejum Elevada: O Que Significa",
    "description": "Insulina em jejum elevada com glicose normal? Descobre o que a hiperinsulinemia significa antes de um diagnóstico de pré-diabetes.",
    "url": "https://www.catarinaveiga.com/insulina-jejum-o-que-significa",
    "inLanguage": "pt",
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "publisher": { "@type": "Organization", "name": "Catarina Veiga — Medicina Funcional Integrativa", "url": "https://www.catarinaveiga.com" },
  };

  return (
    <SEOPageLayout
      title="Insulina em Jejum Elevada: O Que Significa | Catarina Veiga"
      description="Insulina em jejum elevada com glicose normal? Descobre o que a hiperinsulinemia significa antes de um diagnóstico de pré-diabetes."
      canonical="https://www.catarinaveiga.com/insulina-jejum-o-que-significa"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Metabolismo"
        title="Insulina em jejum elevada: o marcador que aparece anos antes do diagnóstico"
        intro="A glicose pode estar normal enquanto a insulina já está elevada há anos. Este padrão é um dos sinais mais precoces de resistência metabólica."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Insulina em jejum" },
        ]}
      />

      <SEOContentSection label="O essencial" title="O que é a insulina em jejum e o que mede">
        <p>
          A insulina é a hormona produzida pelo pâncreas para transportar glicose para as células. Em jejum, os seus níveis devem ser baixos. Quando a insulina em jejum está elevada com glicose normal, o pâncreas está a compensar — e isto pode preceder um diagnóstico de diabetes tipo 2 por uma década.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="A hiperinsulinemia é frequentemente invisível nos exames convencionais — porque a glicose ainda está normal. Mas o pâncreas já está a trabalhar em excesso." />

      <SEOSymptomGrid
        label="Reconheces isto?"
        title="Sintomas frequentes de hiperinsulinemia"
        symptoms={symptoms}
      />

      <SEOComparison
        label="A diferença que importa"
        title="Valores laboratoriais vs valores funcionais"
        conventional={{
          range: "2–25 µIU/mL",
          items: [
            "Intervalo muito amplo que não detecta hiperinsulinemia precoce",
            "Focado em diabetes manifesta, não em resistência inicial",
            "A glicose pode mascarar o problema durante anos",
          ],
        }}
        functional={{
          range: "2–5 µIU/mL",
          items: [
            "Valores acima de 5–7 já podem indicar resistência metabólica",
            "Acima de 10: hiperinsulinemia franca com risco cardiovascular",
            "Monitorização precoce previne progressão para pré-diabetes",
          ],
        }}
        source="Hanley AJ et al. Diabetes Care. 2002. PMID: 12145237"
      />

      <SEOCalculator
        label="Ferramenta"
        title="Verifica o teu valor de insulina"
        intro="Introduz o valor de insulina em jejum do teu último exame e recebe uma leitura funcional."
        fields={[
          { label: "Insulina em jejum (µIU/mL)", placeholder: "Ex: 7" },
        ]}
        onCalculate={insulinCalc}
        bg="almond"
      />

      <SEOPatternCards
        label="Contexto clínico"
        title="Padrões combinados relevantes"
        patterns={patterns}
      />

      <FAQSection />

      <SEOCTA
        title="A resistência à insulina começa anos antes do diagnóstico. Identificá-la cedo faz diferença."
        subtitle="A avaliação funcional analisa a insulina em conjunto com outros biomarcadores e mostra padrões que os valores isolados não revelam."
      />
    </SEOPageLayout>
  );
};

export default InsulinaJejum;
