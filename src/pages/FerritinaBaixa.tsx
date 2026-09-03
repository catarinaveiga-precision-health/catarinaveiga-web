import { useState } from "react";
import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOComparison from "@/components/seo/SEOComparison";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCalculator from "@/components/seo/SEOCalculator";
import SEOCTA from "@/components/seo/SEOCTA";
import { Link } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";

const symptoms = [
  "Fadiga persistente, mesmo após descanso adequado",
  "Queda de cabelo difusa ou aumento de queda sazonal",
  "Intolerância ao frio, especialmente nas extremidades",
  "Dificuldade de concentração e nevoeiro mental",
  "Recuperação lenta após exercício físico",
  "Palpitações ou falta de ar com esforço moderado",
  "Unhas frágeis, quebradiças ou com estrias",
  "Sintomas de hipotiroidismo com TSH normal",
];

const patterns = [
  { title: "Ferritina + TSH elevado", desc: "Padrão frequente em disfunção tiroideia subclínica" },
  { title: "Ferritina baixa + VGM aumentado", desc: "Pode indicar coexistência de défice de B12 ou folato" },
  { title: "Ferritina baixa + PCR elevada", desc: "A inflamação pode falsear a ferritina para cima" },
  { title: "Ferritina baixa + vitamina D baixa", desc: "Padrão de deplecção múltipla em fadiga crónica" },
];

const causes = [
  { title: "Perdas menstruais", desc: "Ciclos abundantes aumentam as necessidades de ferro" },
  { title: "Absorção reduzida", desc: "Permeabilidade intestinal, hipocloridria ou dieta pobre em ferro biodisponível" },
  { title: "Stress crónico", desc: "Cortisol elevado interfere com absorção e utilização de ferro" },
  { title: "Inflamação crónica", desc: "A hepcidina sequestra o ferro nos depósitos" },
  { title: "Gravidez e pós-parto", desc: "Necessidades aumentadas e recuperação lenta" },
  { title: "Dietas restritivas", desc: "Vegetariana, vegana ou baixo consumo de proteína animal" },
];

const ferritinCalc = (values: string[]) => {
  const f = parseFloat(values[0]);
  if (isNaN(f) || f < 0) return null;
  const h = parseFloat(values[1]);

  let icon = "", text = "";
  if (f > 150) {
    icon = "◆"; text = "Ferritina elevada. Valores elevados podem associar-se a inflamação, sobrecarga de ferro ou outras condições que merecem avaliação.";
  } else if (f >= 70) {
    icon = "✓"; text = "Ferritina dentro do intervalo funcional (70 a 120 ng/mL). As reservas de ferro parecem adequadas.";
  } else if (f >= 50) {
    icon = "◐"; text = "Ferritina abaixo do intervalo funcional (50 a 69 ng/mL). O laboratório considera normal, mas pode não ser suficiente para energia, cabelo e cognição.";
  } else if (f >= 30) {
    icon = "◐"; text = "Ferritina limítrofe (30 a 49 ng/mL). Pode associar-se a fadiga, queda de cabelo ou dificuldade de concentração.";
  } else {
    icon = "◇"; text = "Ferritina baixa (abaixo de 30 ng/mL). Reservas de ferro insuficientes: merece investigação clínica.";
  }

  let note: string | undefined;
  if (!isNaN(h) && h >= 12 && f < 70) {
    note = "Hemoglobina normal com ferritina abaixo do intervalo funcional: padrão compatível com défice de ferro sem anemia. Vale a pena pedir também a saturação de transferrina.";
  }

  return { icon, text, note };
};

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "Posso ter sintomas de ferritina baixa com hemoglobina normal?",
      a: "Sim. A hemoglobina mede o ferro em circulação, enquanto a ferritina mede as reservas disponíveis para uso celular. É possível ter hemoglobina normal e ferritina baixa: os exames convencionais não identificam anemia, mas o corpo já está a funcionar com reservas insuficientes.",
    },
    {
      q: "Que sintomas pode causar a ferritina baixa?",
      a: "Os sintomas frequentes incluem fadiga persistente mesmo após descanso adequado, queda de cabelo difusa, intolerância ao frio nas extremidades, dificuldade de concentração e nevoeiro mental, recuperação lenta após exercício, palpitações com esforço moderado e unhas frágeis ou quebradiças.",
    },
    {
      q: "Qual é o valor ideal de ferritina para uma mulher?",
      a: "O intervalo funcional que uso na prática clínica situa-se entre 70 e 120 ng/mL. O laboratório considera normal qualquer valor acima de 10 ng/mL, o que é um limiar de ausência de anemia e não de suficiência. Entre 50 e 70 muitas mulheres já têm sintomas, abaixo de 50 o défice funcional é comum, e abaixo de 30 as reservas são insuficientes.",
    },
    {
      q: "Porque é que tenho ferritina baixa se como bem?",
      a: "As causas mais comuns em mulheres incluem perdas menstruais abundantes, absorção reduzida (permeabilidade intestinal, hipocloridria ou dieta pobre em ferro biodisponível), stress crónico (o cortisol interfere com a absorção e utilização do ferro), inflamação crónica (a hepcidina sequestra o ferro nos depósitos), gravidez e pós-parto, e dietas restritivas.",
    },
    {
      q: "Que outros valores devo pedir além da ferritina?",
      a: "A saturação de transferrina é o mais importante e o que mais falta nas análises que recebo: abaixo de 20 por cento, os tecidos já estão em falta mesmo com ferritina aparentemente aceitável. Vale também pedir PCR, porque a inflamação faz a ferritina subir e pode dar um valor falsamente tranquilizador, e o hemograma completo com VGM.",
    },
    {
      q: "Porque é que a ferritina baixa causa sintomas se a hemoglobina está normal?",
      a: "Porque o corpo raciona. Quando as reservas descem, retira ferro dos músculos, da tiroide, do folículo piloso e do cérebro para proteger a produção de glóbulos vermelhos. O hemograma continua normal enquanto tudo o resto começa a falhar. A anemia é o último degrau, não o primeiro.",
    },
    {
      q: "E se a ferritina não subir com suplementação?",
      a: "Se fizeres suplementação correctamente durante três meses ou mais e a ferritina não subir de forma significativa, raramente é falta de ferro na alimentação. Ou há uma perda contínua que ninguém contabilizou, e nas mulheres a causa mais frequente é ginecológica (miomas, pólipos, endometriose), ou há um problema de absorção. Este é um cenário que exige investigação médica.",
    },
    {
      q: "A ferritina baixa pode afectar a tiróide?",
      a: "A combinação de ferritina baixa com TSH elevado é um padrão frequente em disfunção tiroideia subclínica. Por isso, a ferritina raramente deve ser avaliada isoladamente: o padrão mais informativo inclui a combinação com outros biomarcadores, como TSH, VGM, PCR e vitamina D.",
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
          FAQ: ferritina baixa
        </h2>
        <div className="space-y-10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-sans font-normal text-foreground text-[17px] mb-3">
                {faq.q}
              </h3>
              <p className="font-sans font-normal text-foreground/85 text-[16px] leading-[1.85]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FerritinaBaixa = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ferritina Baixa com Hemoglobina Normal: Sintomas e Causas",
    "description": "Ferritina baixa com hemoglobina normal? Sintomas, causas e a diferença entre valores laboratoriais e funcionais: porque há défice de ferro sem anemia.",
    "url": "https://www.catarinaveiga.com/ferritina-baixa-sintomas",
    "inLanguage": "pt",
    "publisher": { "@type": "Organization", "name": "Catarina Veiga · Medicina Funcional Integrativa", "url": "https://www.catarinaveiga.com" },
  };

  return (
    <SEOPageLayout
      title="Ferritina Baixa com Hemoglobina Normal: Sintomas e Causas | Catarina Veiga"
      description="Ferritina baixa com hemoglobina normal? Sintomas, causas e a diferença entre valores laboratoriais e funcionais: porque há défice de ferro sem anemia."
      canonical="https://www.catarinaveiga.com/ferritina-baixa-sintomas"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Ferro"
        title="Ferritina baixa com hemoglobina normal: sintomas e causas"
        intro="Muitas mulheres têm ferritina dentro dos valores de referência e hemoglobina normal, e ainda assim apresentam fadiga persistente, queda de cabelo e dificuldade de recuperação. É défice de ferro sem anemia."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Ferritina" },
        ]}
      />

      <SEOContentSection label="O essencial" title="O que é a ferritina e porque importa">
        <p>
          A ferritina é a principal proteína de armazenamento de ferro no organismo. Ao contrário da hemoglobina, que mede o ferro em circulação, a ferritina mede as reservas disponíveis para uso celular.
        </p>
        <p>
          O ferro é necessário para produção de energia mitocondrial, síntese de neurotransmissores, função tiroideia e manutenção do folículo piloso. Quando as reservas são insuficientes, estes processos são os primeiros a ser comprometidos, mesmo antes de a hemoglobina descer.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="O mecanismo"
        title="Porque é que a hemoglobina continua normal"
      >
        <p>
          O corpo não trata todos os tecidos por igual. Quando as reservas de
          ferro começam a descer, entra num modo de racionamento: retira ferro
          dos músculos, da tiroide, do folículo piloso e do cérebro para
          proteger uma única função, a produção de glóbulos vermelhos.
        </p>
        <p>
          É por isso que o hemograma continua a dar normal enquanto tudo o
          resto começa a falhar. A anemia é o último degrau, não o primeiro. Se
          esperares por ela para agir, esperaste anos a mais.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="É possível ter hemoglobina normal e ferritina baixa. Os exames convencionais não identificam anemia, mas o corpo já está a funcionar com reservas insuficientes." />

      <SEOSymptomGrid
        label="Reconheces isto?"
        title="Sintomas frequentes de ferritina baixa ou insuficiente"
        symptoms={symptoms}
      />

      <SEOComparison
        label="A diferença que importa"
        title="Valores laboratoriais vs valores funcionais"
        conventional={{
          range: "10 a 150 ng/mL",
          items: [
            "Qualquer valor acima de 10 é considerado normal",
            "Intervalo baseado na distribuição estatística da população",
            "Não distingue entre ausência de anemia e reservas óptimas",
          ],
        }}
        functional={{
          range: "70 a 120 ng/mL",
          items: [
            "Abaixo de 70 deixa de haver garantia de ferro nas reservas da medula",
            "Intervalo associado a energia, cabelo e cognição óptimos",
            "Considera as necessidades fisiológicas individuais",
          ],
        }}
        source="Rushton DH. Nutritional factors and hair loss. Clin Exp Dermatol. 2002;27(5):396-404. Soppi ET. Iron deficiency without anemia. Clin Case Rep. 2018. PMID: 29468045"
      />

      <SEOContentSection
        label="De onde vem o número"
        title="Porquê 70, e não 30"
      >
        <p>
          O limite inferior de 70 não é arbitrário nem é uma preferência
          minha. Vem de um trabalho de Rushton, publicado em 2002 no Clinical
          and Experimental Dermatology: abaixo de 70 ng/mL, o limite de
          confiança de 99 por cento deixa de garantir que existe ferro corado
          nas reservas da medula óssea. Ou seja, com 45 ou 60 podes já ter as
          reservas vazias sem que o valor o diga.
        </p>
        <p>
          É por isso que uso 70 como piso e não 30, que é o número a partir do
          qual o laboratório deixa de sinalizar. Entre esses dois valores há
          uma faixa enorme de mulheres a quem foi dito que estava tudo bem.
        </p>
        <p>
          Sou transparente sobre o resto: outras escolas funcionais usam
          intervalos mais baixos. A Optimal DX publica 45 a 79 ng/mL, e há
          clínicas que trabalham com 50 a 100. O tecto de 120 que uso vem da
          minha prática clínica, não de um estudo. Onde há evidência, digo qual
          é. Onde é experiência, digo que é experiência.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="O que pedir"
        title="A ferritina sozinha não chega"
      >
        <p>
          A ferritina é uma proteína de fase aguda: sobe com inflamação,
          infecção ou excesso de peso. Isso significa que pode dar um valor
          tranquilizador enquanto as reservas estão de facto vazias. Para saber
          o que se passa a sério, há três valores que fazem a diferença.
        </p>
        <p>
          <strong>Saturação de transferrina.</strong> Mostra que percentagem do
          ferro está a ser efectivamente transportada. Abaixo de 20 por cento,
          os tecidos já estão em falta, mesmo com ferritina aparentemente
          aceitável. É o valor que mais falta nas análises que recebo.
        </p>
        <p>
          <strong>PCR ou proteína C reactiva.</strong> Se estiver elevada, a
          ferritina está inflada e não pode ser lida à letra. Uma ferritina de
          80 com PCR alta pode corresponder a reservas muito mais baixas.
        </p>
        <p>
          <strong>Hemograma completo, incluindo VGM.</strong> Um volume
          globular médio no limite inferior sugere que o défice já começou a
          afectar a produção. Um VGM aumentado ao mesmo tempo que a ferritina
          está baixa levanta outra hipótese: défice simultâneo de B12 ou
          folato, que mascara os dois.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="Ferritina e tiroide"
        title="Porque é que a ferritina baixa imita o hipotiroidismo"
      >
        <p>
          Esta é a ligação que explica muitas consultas. A tiroide produz
          sobretudo T4, que é a forma de reserva. Para funcionar, o corpo tem
          de a converter em T3, a forma activa. Essa conversão precisa de
          ferro, e a própria peroxidase tiroideia, a enzima que fabrica as
          hormonas, é uma enzima que depende de ferro.
        </p>
        <p>
          Com ferritina baixa, essa conversão fica comprometida. O resultado é
          uma mulher com frio, cansaço, queda de cabelo, obstipação e
          pensamento lento, com um TSH perfeitamente normal. É-lhe dito que a
          tiroide está bem, e está: o problema é o ferro que ela precisa para
          trabalhar.
        </p>
        <p>
          É por isso que a combinação de ferritina baixa com TSH no limite
          superior é um dos padrões que mais procuro. Tratar só a tiroide, com
          uma ferritina de 25, costuma dar mau resultado.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="O sinal que não se deve ignorar"
        title="Quando a ferritina não sobe, mesmo com suplementação"
      >
        <p>
          Há um cenário que merece atenção diferente de todos os outros: fazer
          suplementação de ferro correctamente, durante três meses ou mais, e a
          ferritina não subir de forma significativa.
        </p>
        <p>
          Quando isso acontece, raramente é falta de ferro na alimentação. Ou
          há uma perda contínua que ninguém contabilizou, ou há um problema de
          absorção. Nas mulheres, a causa mais frequente de perda contínua é
          ginecológica: miomas, pólipos ou endometriose, muitas vezes com
          ciclos que a própria considera normais porque sempre foram assim.
        </p>
        <p>
          Este é um ponto em que o meu trabalho para e começa o de um médico.
          Não diagnostico nem prescrevo. O que faço é reconhecer o padrão, dizer
          com clareza o que está a acontecer, e encaminhar para investigação
          médica com a pergunta certa já formulada.
        </p>
      </SEOContentSection>

      <SEOContentSection label="Tens um valor concreto?" title="Se já sabes o teu número de ferritina">
        <p>
          Esta página explica os sintomas e o que significa ter ferritina baixa com hemoglobina normal. Se o que procuras é interpretar um valor específico, ferritina de 18, 25, 35 ou 40, e perceber a partir de que número deixa de ser suficiente numa mulher, o artigo{" "}
          <Link to="/blog/ferritina-baixa" className="text-amber hover:text-amber-light underline transition-colors">
            ferritina baixa em mulheres: quando normal não chega
          </Link>{" "}
          percorre os valores um a um.
        </p>
      </SEOContentSection>

      <SEOCalculator
        label="Ferramenta"
        title="Verifica o teu valor de ferritina"
        intro="Introduz o valor do teu último exame e recebe uma leitura baseada em intervalos funcionais."
        fields={[
          { label: "Ferritina (ng/mL)", placeholder: "Ex: 28" },
          { label: "Hemoglobina (g/dL)", placeholder: "Ex: 13.2", optional: true },
        ]}
        onCalculate={ferritinCalc}
        bg="almond"
      />

      <SEOPatternCards
        label="Contexto clínico"
        title="Quando vale a pena investigar mais"
        patterns={patterns}
      />

      <SEOImpactQuote quote="A ferritina raramente deve ser avaliada isoladamente. O padrão mais informativo inclui a combinação com outros biomarcadores." />

      <SEOPatternCards
        label="Causas"
        title="Porque a ferritina baixa é tão comum em mulheres"
        patterns={causes}
        bg="almond"
      />

      <FAQSection />

      <SEOCTA
        title="Os teus exames podem estar normais. Mas o teu corpo pode estar a pedir atenção."
        subtitle="A avaliação funcional analisa ferritina em conjunto com outros 14 biomarcadores, e mostra padrões que os intervalos convencionais não identificam."
      />
    </SEOPageLayout>
  );
};

export default FerritinaBaixa;
