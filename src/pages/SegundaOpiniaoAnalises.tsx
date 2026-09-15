import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOComparison from "@/components/seo/SEOComparison";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCTA from "@/components/seo/SEOCTA";
import { Link } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";

const whatSecondReadingLooksFor = [
  { title: "Valores no limite do intervalo", desc: "Resultados aceites como normais que estão no extremo do intervalo e podem já ser insuficientes" },
  { title: "Padrões entre marcadores", desc: "A relação entre ferritina, TSH, vitamina D e inflamação, em vez de cada valor isolado" },
  { title: "Marcadores que não foram pedidos", desc: "Insulina em jejum, ferritina, PCR ou B12 ficam frequentemente de fora de um painel de rotina" },
  { title: "Evolução ao longo do tempo", desc: "Comparar análises de anos diferentes revela tendências que uma única colheita não mostra" },
  { title: "Correspondência com os sintomas", desc: "Verificar se os valores explicam ou não as queixas concretas que motivaram os exames" },
  { title: "Contexto fisiológico", desc: "Fase do ciclo, perimenopausa, sono, stress e alimentação alteram a leitura dos mesmos números" },
];

const whenItMakesSense = [
  "Ouviste que está tudo normal mas os sintomas mantêm-se",
  "Já fizeste análises em anos diferentes e nunca foram comparadas",
  "As queixas apareceram em conjunto: energia, sono, ciclo, peso, humor",
  "Nunca te pediram ferritina, insulina em jejum ou vitamina D",
  "Saíste da consulta sem uma explicação para o que sentes",
  "Estás em perimenopausa e os sintomas foram atribuídos à idade",
];

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "Vale a pena pedir uma segunda opinião sobre análises que já foram dadas como normais?",
      a: "Vale, sobretudo quando os sintomas são persistentes e afectam a qualidade de vida. Uma segunda leitura não implica repetir exames: implica interpretar os mesmos resultados com intervalos funcionais e olhar para os padrões entre os valores. Ferritina de 25 ng/mL, TSH de 3.8 mUI/L e vitamina D de 28 ng/mL são individualmente normais e, em conjunto, explicam frequentemente anos de fadiga.",
    },
    {
      q: "Uma segunda opinião significa repetir todas as análises?",
      a: "Não. O ponto de partida são as análises que já tens, incluindo as de anos anteriores. Só se justifica pedir novos exames quando falta um marcador relevante que nunca foi doseado, como ferritina, insulina em jejum, vitamina D ou PCR, ou quando os resultados existentes já têm mais de um ano.",
    },
    {
      q: "Que análises devo levar a uma segunda leitura?",
      a: "Leva tudo o que tiveres, mesmo o que parecer antigo ou irrelevante: hemograma completo, ferro e ferritina, função tiroideia, vitamina D, vitamina B12, glicose e insulina, perfil lipídico, PCR e qualquer painel hormonal. O histórico de vários anos vale mais do que uma colheita isolada, porque mostra a direcção em que os valores se movem.",
    },
    {
      q: "Isto contradiz o que o meu médico disse?",
      a: "Não. A leitura convencional responde a uma pergunta legítima e diferente: existe doença detectável? Uma segunda leitura funcional responde a outra: estes valores explicam os sintomas e são compatíveis com função óptima? As duas coexistem, e a leitura clínica oficial das análises continua a ser da responsabilidade médica.",
    },
    {
      q: "Que resultado posso esperar de uma segunda opinião?",
      a: "O resultado esperado é clareza, não um diagnóstico novo. Sais com hipóteses explicitadas, prioridades definidas e próximos passos concretos, incluindo, quando se justifica, a indicação de que a investigação deve seguir por via médica.",
    },
    {
      q: "E se a segunda leitura não encontrar nada?",
      a: "É um desfecho possível e é informação útil. Nem todos os sintomas têm tradução laboratorial, e nesse caso a investigação desloca-se para sono, carga de stress, alimentação, ciclo e outros factores que não aparecem numa análise ao sangue.",
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
          FAQ: segunda opinião sobre análises normais
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

const SegundaOpiniaoAnalises = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Segunda Opinião Sobre Análises Normais: Quando Faz Sentido",
    "description": "Análises dadas como normais mas sintomas persistentes? O que muda numa segunda leitura, que exames levar e quando faz sentido pedir.",
    "url": "https://www.catarinaveiga.com/segunda-opiniao-analises-normais",
    "inLanguage": "pt",
    "publisher": { "@type": "Organization", "name": "Catarina Veiga — Medicina Funcional Integrativa", "url": "https://www.catarinaveiga.com" },
  };

  return (
    <SEOPageLayout
      title="Segunda Opinião Sobre Análises Normais: Quando Faz Sentido | Catarina Veiga"
      description="Análises dadas como normais mas sintomas que continuam? O que muda numa segunda leitura, que exames levar, quando faz sentido pedir e o que esperar do resultado."
      canonical="https://www.catarinaveiga.com/segunda-opiniao-analises-normais"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Segunda Leitura"
        title="Segunda opinião sobre análises normais: quando faz sentido"
        intro="Foste informada de que está tudo normal e os sintomas continuam. Uma segunda leitura não é repetir exames: é interpretar os que já tens com outra pergunta."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Segunda opinião sobre análises" },
        ]}
      />

      <SEOContentSection label="O essencial" title="Duas perguntas diferentes feitas aos mesmos resultados">
        <p>
          A leitura convencional de uma análise responde a uma pergunta clara e legítima: existe doença detectável? Quando a resposta é não, o resultado é comunicado como normal, e é isso que o intervalo de referência foi construído para dizer.
        </p>
        <p>
          Uma segunda leitura funcional faz outra pergunta aos mesmos números: estes valores são compatíveis com o funcionamento que esta pessoa devia ter, e explicam os sintomas que a trouxeram aqui? São perguntas distintas, e podem ter respostas distintas sem que nenhuma esteja errada.
        </p>
        <p>
          É por isso que uma segunda opinião raramente começa por pedir exames novos. Começa por reler o que já existe, incluindo resultados de anos anteriores que nunca foram comparados entre si.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="Normal não é o mesmo que óptimo. O intervalo de referência descreve a população que foi analisada, não o corpo que está à minha frente." />

      <SEOPatternCards
        label="O que muda"
        title="O que uma segunda leitura procura nas mesmas análises"
        patterns={whatSecondReadingLooksFor}
        bg="almond"
      />

      <SEOSymptomGrid
        label="Quando pedir"
        title="Situações em que uma segunda opinião faz sentido"
        symptoms={whenItMakesSense}
      />

      <SEOComparison
        label="Primeira leitura vs segunda leitura"
        title="O que cada leitura procura responder"
        conventional={{
          range: "Leitura convencional",
          items: [
            "Pergunta: existe doença detectável neste parâmetro?",
            "Compara com o intervalo estatístico da população analisada",
            "Avalia cada valor isoladamente, numa única colheita",
          ],
        }}
        functional={{
          range: "Segunda leitura funcional",
          items: [
            "Pergunta: estes valores explicam os sintomas descritos?",
            "Compara com intervalos associados a função óptima",
            "Cruza marcadores entre si e ao longo dos anos",
          ],
        }}
      />

      <SEOContentSection label="Preparação" title="O que levar e o que esperar">
        <p>
          Leva todas as análises que tiveres, mesmo as antigas: hemograma, ferro e ferritina, função tiroideia, vitamina D, vitamina B12, glicose e insulina, perfil lipídico, PCR e qualquer painel hormonal. Um histórico de três anos diz mais do que uma colheita recente, porque mostra a direcção em que os valores se movem.
        </p>
        <p>
          O que sai de uma segunda leitura é clareza, não um diagnóstico alternativo: hipóteses explicitadas, prioridades definidas e próximos passos concretos. Quando o quadro exige investigação médica, é isso que fica indicado, com encaminhamento.
        </p>
        <p>
          Se o teu ponto de partida for a fadiga, a{" "}
          <Link to="/fadiga-exames-normais" className="text-amber hover:text-amber-light underline transition-colors">
            página sobre fadiga com exames normais
          </Link>{" "}
          detalha os seis padrões biomarcadores mais frequentes. Se a suspeita for a tiroide, a{" "}
          <Link to="/tsh-normal-mas-com-sintomas" className="text-amber hover:text-amber-light underline transition-colors">
            leitura funcional do TSH
          </Link>{" "}
          explica a zona entre 2.0 e 4.5 mUI/L.
        </p>
      </SEOContentSection>

      <FAQSection />

      <SEOCTA
        title="Os teus exames estão normais. O teu corpo não."
        subtitle="Uma segunda leitura começa pelas análises que já tens. A ferramenta de avaliação é o primeiro passo dessa releitura."
        buttonText="Começar avaliação funcional"
        note="Gratuita · 17 biomarcadores · leitura imediata"
      />
    </SEOPageLayout>
  );
};

export default SegundaOpiniaoAnalises;
