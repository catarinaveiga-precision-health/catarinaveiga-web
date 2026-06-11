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
  "Fadiga persistente, especialmente de manhã",
  "Intolerância ao frio",
  "Aumento de peso sem alteração da dieta",
  "Dificuldade em perder peso",
  "Queda de cabelo difusa",
  "Pele seca, unhas frágeis",
  "Obstipação crónica",
  "Lentificação cognitiva, nevoeiro mental",
  "Ciclo menstrual irregular",
  "Depressão ou humor baixo sem causa aparente",
];

const patterns = [
  { title: "TSH elevado + ferritina baixa", desc: "Défice de ferro compromete conversão de T4 em T3" },
  { title: "TSH elevado + vitamina D baixa", desc: "Associação frequente em disfunção tiroideia autoimune" },
  { title: "TSH elevado + PCR elevada", desc: "Inflamação pode inibir função tiroideia" },
  { title: "TSH elevado + homocisteína alta", desc: "Padrão de stress metabólico e disfunção de metilação" },
];

const tshCalc = (values: string[]) => {
  const v = parseFloat(values[0]);
  if (isNaN(v) || v < 0) return null;

  let icon = "", text = "";
  if (v < 0.5) {
    icon = "⚠️"; text = "TSH suprimido (<0.5 mUI/L). Pode indicar hipertiroidismo — avaliação clínica necessária.";
  } else if (v <= 2.0) {
    icon = "🟢"; text = "TSH dentro do intervalo funcional (0.5–2.0 mUI/L). Função tiroideia adequada.";
  } else if (v <= 3.0) {
    icon = "🟡"; text = "TSH na zona cinzenta (2.0–3.0 mUI/L). Pode associar-se a lentificação metabólica em mulheres sintomáticas.";
  } else if (v <= 4.5) {
    icon = "🔴"; text = "TSH elevado-normal (3.0–4.5 mUI/L). Sugere esforço tiroideia — investigação funcional recomendada.";
  } else {
    icon = "⚠️"; text = "TSH acima do intervalo laboratorial (>4.5 mUI/L). Hipotiroidismo provável — avaliação clínica necessária.";
  }

  const t3v = parseFloat(values[1]);
  if (!isNaN(t3v) && t3v > 0) {
    if (t3v < 2.3) text += " T3 livre baixo — pode indicar conversão insuficiente de T4 em T3.";
    else if (t3v <= 3.2) text += " T3 livre dentro do intervalo funcional.";
  }

  return { icon, text };
};

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "TSH normal exclui problemas de tiroide?",
      a: "Não necessariamente. O intervalo laboratorial aceita valores até 4.5 mUI/L como normais, mas em medicina funcional valores acima de 2.0 já podem associar-se a lentificação metabólica, sobretudo em mulheres com sintomas como fadiga, frio ou queda de cabelo.",
    },
    {
      q: "O que é o TSH e para que serve?",
      a: "O TSH é produzido pela hipófise e regula a produção das hormonas tiroideias T3 e T4. Quando a tiróide está lenta, a hipófise aumenta o TSH para a estimular. Por isso, valores elevados (mesmo dentro do intervalo laboratorial) podem indicar que a tiróide está a trabalhar com dificuldade.",
    },
    {
      q: "Qual é o intervalo funcional do TSH?",
      a: "O intervalo funcional associado a função tiroideia óptima situa-se entre 0.5 e 2.0 mUI/L. A zona cinzenta entre 2.0 e 4.5 mUI/L é frequentemente relevante em mulheres sintomáticas e merece avaliação em contexto clínico.",
    },
    {
      q: "Que sintomas posso ter com TSH dentro do normal?",
      a: "Os sintomas frequentes de hipotiroidismo subclínico incluem fadiga persistente (especialmente de manhã), intolerância ao frio, aumento de peso sem alteração da dieta, queda de cabelo difusa, pele seca, obstipação crónica, nevoeiro mental, ciclo menstrual irregular e humor baixo sem causa aparente.",
    },
    {
      q: "Porque é que a tiróide é tão sensível em mulheres?",
      a: "A função tiroideia é influenciada por estrogénio, cortisol, ferro, vitamina D e estado inflamatório: factores que flutuam significativamente ao longo do ciclo menstrual, gravidez, pós-parto e perimenopausa. Um défice de ferro, por exemplo, compromete a conversão de T4 em T3.",
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
          FAQ: TSH e função tiroideia
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

const TshNormal = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "TSH Normal Mas Com Sintomas: Função Tiroideia Funcional",
    "description": "TSH dentro dos valores normais mas com fadiga, frio, queda de cabelo? Descobre o que os intervalos laboratoriais não mostram.",
    "url": "https://www.catarinaveiga.com/tsh-normal-mas-com-sintomas",
    "inLanguage": "pt",
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "publisher": { "@type": "Organization", "name": "Catarina Veiga — Medicina Funcional Integrativa", "url": "https://www.catarinaveiga.com" },
  };

  return (
    <SEOPageLayout
      title="TSH Normal Mas Com Sintomas: Função Tiroideia Funcional | Catarina Veiga"
      description="TSH dentro dos valores normais mas com fadiga, frio, queda de cabelo? Descobre o que os intervalos laboratoriais não mostram."
      canonical="https://www.catarinaveiga.com/tsh-normal-mas-com-sintomas"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Tiróide"
        title="TSH normal mas com sintomas: o que a tiróide funcional explica"
        intro="O intervalo laboratorial aceita valores até 4.5 mUI/L como normais. Em medicina funcional, valores acima de 2.0 já podem associar-se a lentificação metabólica."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "TSH e função tiroideia" },
        ]}
      />

      <SEOContentSection label="O essencial" title="O que é o TSH e o que regula">
        <p>
          O TSH é produzido pela hipófise e regula a produção de hormonas tiroideias T3 e T4. Quando a tiróide está lenta, a hipófise aumenta o TSH para a estimular. Valores elevados — mesmo dentro do intervalo laboratorial — podem indicar que a tiróide está a trabalhar com dificuldade.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="O TSH é o termóstato da tiróide. Um valor alto significa que o sistema está a pedir mais calor — mesmo que a temperatura da casa ainda pareça normal." />

      <SEOSymptomGrid
        label="Reconheces isto?"
        title="Sintomas frequentes de hipotiroidismo subclínico"
        symptoms={symptoms}
      />

      <SEOComparison
        label="A diferença que importa"
        title="Valores laboratoriais vs valores funcionais"
        conventional={{
          range: "0.4–4.5 mUI/L",
          items: [
            "Intervalo muito amplo que inclui disfunção subclínica",
            "Baseado na distribuição estatística da população geral",
            "Não considera sintomas individuais",
          ],
        }}
        functional={{
          range: "0.5–2.0 mUI/L",
          items: [
            "Intervalo associado a função tiroideia óptima",
            "Valores acima de 2.0 merecem avaliação em contexto sintomático",
            "Zona cinzenta (2.0–4.5) frequentemente relevante em mulheres",
          ],
        }}
        source="Hoermann R et al. Endocr Rev. 2019. PMID: 29669113"
      />

      <SEOCalculator
        label="Ferramenta"
        title="Verifica o teu valor de TSH"
        intro="Introduz o valor do teu último exame e recebe uma leitura baseada em intervalos funcionais."
        fields={[
          { label: "TSH (mUI/L)", placeholder: "Ex: 2.8" },
          { label: "T3 livre (pg/mL)", placeholder: "Ex: 2.9", optional: true },
        ]}
        onCalculate={tshCalc}
        bg="almond"
      />

      <SEOPatternCards
        label="Contexto clínico"
        title="Padrões combinados relevantes"
        patterns={patterns}
      />

      <SEOContentSection label="Contexto hormonal" title="Porque a tiróide é tão sensível em mulheres" bg="almond">
        <p>
          A função tiroideia é influenciada por estrogénio, cortisol, ferro, vitamina D e estado inflamatório — todos factores que flutuam significativamente em mulheres ao longo do ciclo menstrual, gravidez, pós-parto e perimenopausa.
        </p>
      </SEOContentSection>

      <FAQSection />

      <SEOCTA
        title="A tiróide é um dos sistemas mais sensíveis ao contexto fisiológico. E um dos mais subestimados."
        subtitle="A avaliação funcional analisa o TSH em conjunto com outros biomarcadores e mostra padrões que os valores isolados não revelam."
      />
    </SEOPageLayout>
  );
};

export default TshNormal;
