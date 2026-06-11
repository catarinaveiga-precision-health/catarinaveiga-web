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
  "Fadiga persistente sem causa aparente",
  "Infecções respiratórias frequentes",
  "Dores musculares ou ósseas difusas",
  "Alterações do humor, irritabilidade ou depressão sazonal",
  "Dificuldade de concentração e nevoeiro mental",
  "Queda de cabelo",
  "Cicatrização lenta",
  "Agravamento de condições autoimunes",
];

const patterns = [
  { title: "Vitamina D baixa + TSH elevado", desc: "Associação frequente em disfunção tiroideia" },
  { title: "Vitamina D baixa + ferritina baixa", desc: "Padrão de deplecção múltipla em fadiga crónica" },
  { title: "Vitamina D baixa + PCR elevada", desc: "Défice pode amplificar inflamação sistémica" },
  { title: "Vitamina D baixa + insulina elevada", desc: "Resistência à insulina associada a défice de vitamina D" },
];

const causes = [
  { title: "Exposição solar insuficiente", desc: "Trabalho em interior, horários urbanos" },
  { title: "Melanina e protector solar", desc: "Reduzem síntese cutânea de vitamina D" },
  { title: "Absorção intestinal reduzida", desc: "Permeabilidade intestinal compromete absorção" },
  { title: "Obesidade", desc: "A vitamina D é lipossolúvel e fica sequestrada no tecido adiposo" },
];

const vitDCalc = (values: string[]) => {
  const v = parseFloat(values[0]);
  if (isNaN(v) || v < 0) return null;

  let icon = "", text = "";
  if (v >= 50) {
    icon = "🟢"; text = "Vitamina D dentro do intervalo funcional (≥50 ng/mL). Níveis adequados para função imune e hormonal.";
  } else if (v >= 30) {
    icon = "🟡"; text = "Vitamina D insuficiente (30–49 ng/mL). Comum mas corrigível — pode associar-se a fadiga e alterações do humor.";
  } else if (v >= 12) {
    icon = "🔴"; text = "Défice de vitamina D (12–29 ng/mL). Insuficiência significativa — suplementação orientada recomendada.";
  } else {
    icon = "⚠️"; text = "Défice severo (<12 ng/mL). Avaliação urgente — risco de osteoporose e disfunção imune grave.";
  }

  return { icon, text };
};

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "Ter vitamina D acima de 20 ng/mL é suficiente?",
      a: "O laboratório considera suficiente qualquer valor acima de 20 ng/mL, mas esse limiar foi definido para prevenir raquitismo, não para garantir função óptima. O intervalo funcional associado a função imune e hormonal óptima situa-se entre 50 e 80 ng/mL, e valores entre 30 e 49 são frequentemente insuficientes em contexto clínico.",
    },
    {
      q: "Que sintomas pode causar a vitamina D insuficiente?",
      a: "Os sintomas frequentes incluem fadiga persistente sem causa aparente, infecções respiratórias frequentes, dores musculares ou ósseas difusas, alterações do humor (incluindo depressão sazonal), nevoeiro mental, queda de cabelo, cicatrização lenta e agravamento de condições autoimunes.",
    },
    {
      q: "Porque tenho vitamina D baixa se vivo em Portugal?",
      a: "Mesmo em clima mediterrânico, a exposição solar insuficiente nos meses de inverno, combinada com trabalho em interior, torna o défice extremamente comum. A melanina e o protector solar reduzem a síntese cutânea, a permeabilidade intestinal pode comprometer a absorção, e na obesidade a vitamina D fica sequestrada no tecido adiposo.",
    },
    {
      q: "A vitamina D é uma vitamina ou uma hormona?",
      a: "Tecnicamente, é uma hormona esteróide. É produzida pela pele mediante exposição solar e activa receptores em praticamente todos os tecidos: sistema imune, músculo, osso, cérebro e tiróide.",
    },
    {
      q: "A vitamina D baixa está ligada a outros desequilíbrios?",
      a: "Sim, há padrões combinados relevantes: vitamina D baixa com TSH elevado é uma associação frequente em disfunção tiroideia, com ferritina baixa forma um padrão de deplecção múltipla em fadiga crónica, com PCR elevada pode amplificar inflamação sistémica, e com insulina elevada associa-se a resistência à insulina.",
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
          FAQ: vitamina D
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

const VitaminaD = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Vitamina D Baixa: Valores Funcionais e Sintomas",
    "description": "Vitamina D dentro dos valores normais mas com fadiga e infecções frequentes? Descobre a diferença entre valores laboratoriais e funcionais.",
    "url": "https://www.catarinaveiga.com/vitamina-d-valores-funcionais",
    "inLanguage": "pt",
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "publisher": { "@type": "Organization", "name": "Catarina Veiga — Medicina Funcional Integrativa", "url": "https://www.catarinaveiga.com" },
  };

  return (
    <SEOPageLayout
      title="Vitamina D Baixa: Valores Funcionais e Sintomas | Catarina Veiga"
      description="Vitamina D dentro dos valores normais mas com fadiga e infecções frequentes? Descobre a diferença entre valores laboratoriais e funcionais."
      canonical="https://www.catarinaveiga.com/vitamina-d-valores-funcionais"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Vitamina D"
        title="Vitamina D baixa: o que os valores laboratoriais não explicam"
        intro="A maioria da população portuguesa tem vitamina D insuficiente — mas os valores considerados normais podem ainda assim ser insuficientes para função fisiológica óptima."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Vitamina D" },
        ]}
      />

      <SEOContentSection label="O essencial" title="O que é a vitamina D e porque é uma hormona">
        <p>
          A vitamina D é tecnicamente uma hormona esteróide. É produzida pela pele mediante exposição solar e activa receptores em praticamente todos os tecidos — sistema imune, músculo, osso, cérebro e tiróide.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="Em Portugal, a exposição solar insuficiente nos meses de inverno — combinada com trabalho em interior — torna o défice de vitamina D extremamente comum, mesmo em clima mediterrânico." />

      <SEOSymptomGrid
        label="Reconheces isto?"
        title="Sintomas frequentes de vitamina D insuficiente"
        symptoms={symptoms}
      />

      <SEOComparison
        label="A diferença que importa"
        title="Valores laboratoriais vs valores funcionais"
        conventional={{
          range: ">20 ng/mL",
          items: [
            "Considerado suficiente pelo laboratório",
            "Limiar baseado em prevenção de raquitismo, não em função óptima",
            "Não distingue insuficiência de suficiência funcional",
          ],
        }}
        functional={{
          range: "50–80 ng/mL",
          items: [
            "Intervalo associado a função imune e hormonal óptima",
            "Valores entre 30–50 frequentemente insuficientes em contexto clínico",
            "Défice severo (<12) associado a risco grave",
          ],
        }}
        source="Holick MF. N Engl J Med. 2007. PMID: 23107484"
      />

      <SEOCalculator
        label="Ferramenta"
        title="Verifica o teu valor de vitamina D"
        intro="Introduz o valor do teu último exame e recebe uma leitura baseada em intervalos funcionais."
        fields={[
          { label: "Vitamina D (ng/mL)", placeholder: "Ex: 32" },
        ]}
        onCalculate={vitDCalc}
        bg="almond"
      />

      <SEOPatternCards
        label="Contexto clínico"
        title="Padrões combinados relevantes"
        patterns={patterns}
      />

      <SEOPatternCards
        label="Causas"
        title="Porque o défice é tão prevalente em Portugal"
        patterns={causes}
        bg="almond"
      />

      <FAQSection />

      <SEOCTA
        title="O défice de vitamina D é corrigível. Mas precisa de ser identificado primeiro."
        subtitle="A avaliação funcional analisa vitamina D em conjunto com outros biomarcadores e mostra padrões que os valores isolados não revelam."
      />
    </SEOPageLayout>
  );
};

export default VitaminaD;
