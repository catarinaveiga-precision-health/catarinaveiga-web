import { Link } from "react-router-dom";
import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCTA from "@/components/seo/SEOCTA";
import SEOLeadMagnetCTA from "@/components/seo/SEOLeadMagnetCTA";
import { useFadeUp } from "@/hooks/useFadeUp";

const sintomas = [
  "Fome intensa antes do almoço, mesmo tendo tomado pequeno-almoço",
  "Vontade de doces ou hidratos no meio da manhã",
  "Quebra de energia ou nevoeiro mental a meio da manhã",
  "Dificuldade de concentração nas primeiras horas de trabalho",
  "Irritabilidade ou ansiedade sem causa aparente pela manhã",
  "Fadiga persistente apesar de ter dormido o suficiente",
  "Aumento de peso gradual, sobretudo abdominal",
  "Dificuldade em manter massa muscular com a idade",
];

const opcoes = [
  {
    title: "Ovos mexidos com espinafres e queijo feta",
    desc: "Dois ovos inteiros + 30 g de queijo feta + punhado de espinafres = ~25 g de proteína. Pronto em 5 minutos.",
  },
  {
    title: "Iogurte grego com sementes e nozes",
    desc: "170 g de iogurte grego (não magro) + 1 colher de sopa de sementes de cânhamo + nozes = ~22 g de proteína.",
  },
  {
    title: "Panquecas de aveia com proteína",
    desc: "1 ovo + 40 g de aveia + 1 dose de proteína whey + canela. Bater e cozinhar na frigideira = ~28 g de proteína.",
  },
  {
    title: "Torrada com salmão fumado e ovo",
    desc: "1 fatia de pão de fermentação lenta + 50 g de salmão fumado + 1 ovo cozido = ~24 g de proteína.",
  },
  {
    title: "Batido proteico com manteiga de amendoim",
    desc: "200 ml de leite + 1 dose de proteína + 1 colher de manteiga de amendoim + banana = ~30 g de proteína.",
  },
  {
    title: "Overnight oats com proteína",
    desc: "40 g de aveia + 170 g de iogurte grego + sementes de chia + frutos vermelhos. Preparar na noite anterior = ~20 g de proteína.",
  },
];

const beneficios = [
  {
    title: "Estabilização da glicemia",
    desc: "A proteína atrasa a absorção de glucose e previne picos de insulina que causam quebras de energia.",
  },
  {
    title: "Saciedade prolongada",
    desc: "A proteína activa hormonas de saciedade (GLP-1, PYY) de forma mais sustentada do que hidratos simples.",
  },
  {
    title: "Preservação de massa muscular",
    desc: "A partir dos 35 anos, a perda de massa muscular acelera. A distribuição proteica ao longo do dia é essencial.",
  },
  {
    title: "Suporte à função tiroideia e hormonal",
    desc: "Aminoácidos como a tirosina são precursores de hormonas tiroideias e neurotransmissores.",
  },
];

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "Quanta proteína devo comer ao pequeno-almoço?",
      a: "O valor ideal para a maioria das mulheres adultas situa-se entre 25 e 30 g de proteína. Esta quantidade activa de forma eficaz as hormonas de saciedade e contribui para a estabilização da glicemia ao longo da manhã.",
    },
    {
      q: "O que acontece se o meu pequeno-almoço não tiver proteína suficiente?",
      a: "Um pequeno-almoço pobre em proteína e rico em hidratos simples gera um pico de glicemia seguido de uma quebra rápida — o que se traduz em fome, irritabilidade, cravings e nevoeiro mental antes do almoço.",
    },
    {
      q: "Os ovos são uma boa fonte de proteína ao pequeno-almoço?",
      a: "Sim. Dois ovos inteiros fornecem cerca de 12 a 14 g de proteína, além de colina, vitamina D e gorduras saudáveis. Combinados com queijo, sementes ou salmão fumado, atingem facilmente os 25 g recomendados.",
    },
    {
      q: "Posso usar proteína em pó ao pequeno-almoço?",
      a: "Sim, é uma opção prática. A proteína whey ou a proteína de arroz e ervilha (para quem evita lacticínios) podem ser adicionadas a batidos, panquecas ou overnight oats sem alterar o sabor de forma significativa.",
    },
    {
      q: "O que comer ao pequeno-almoço na perimenopausa?",
      a: "Na perimenopausa, a resistência à insulina tende a aumentar e a massa muscular a diminuir. Um pequeno-almoço com 25–30 g de proteína, gordura saudável e fibra é uma das intervenções alimentares mais simples e eficazes para estabilizar energia e hormonas.",
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
          FAQ — Pequenos-almoços ricos em proteína
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

const PequenosAlmocosRicosProteina = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: "Pequenos-Almoços Ricos em Proteína: Porquê, Quanto e O Que Comer",
    description:
      "Descubra porque um pequeno-almoço com 25–30 g de proteína estabiliza energia, reduz cravings e apoia a saúde hormonal — especialmente na perimenopausa.",
    url: "https://www.catarinaveiga.com/pequenos-almocos-ricos-em-proteina",
    inLanguage: "pt",
    author: {
      "@type": "Person",
      name: "Catarina Veiga",
      url: "https://www.catarinaveiga.com/sobre",
    },
    publisher: {
      "@type": "Organization",
      name: "Catarina Veiga — Medicina Funcional Integrativa",
      url: "https://www.catarinaveiga.com",
    },
  };

  return (
    <SEOPageLayout
      title="Pequeno-Almoço Proteico: Porquê, Quanto e O Que Comer | Catarina Veiga"
      description="O que é um pequeno-almoço proteico, porquê 25 a 30 g de proteína e 6 opções práticas. Menos cravings, mais energia estável e saciedade, especialmente na perimenopausa."
      canonical="https://www.catarinaveiga.com/pequenos-almocos-ricos-em-proteina"
      structuredData={structuredData}
      hideLeadMagnet
    >
      <SEOHero
        label="Nutrição Funcional · Proteína"
        title="Pequenos-almoços ricos em proteína: porquê, quanto e o que comer"
        intro="Um pequeno-almoço proteico, com 25 a 30 g de proteína, estabiliza a glicemia, reduz cravings e apoia a produção hormonal: impacto directo na energia, no peso e na clareza mental ao longo do dia."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "Pequenos-almoços proteicos" },
        ]}
      />

      <SEOContentSection
        label="A ciência"
        title="Porque é que a proteína ao pequeno-almoço importa tanto"
      >
        <p>
          A maioria dos pequenos-almoços tradicionais em Portugal — pão com
          manteiga, cereais, tostas com compota — são compostos quase
          exclusivamente por hidratos de carbono simples. O resultado é um pico
          rápido de glicemia seguido de uma queda acentuada, que desencadeia
          fome, irritabilidade e dificuldade de concentração ainda antes do
          almoço.
        </p>
        <p>
          A proteína altera este padrão de forma significativa. Ao atrasar o
          esvaziamento gástrico e estimular a libertação de hormonas de
          saciedade — como o GLP-1 e o PYY — a proteína mantém os níveis de
          glucose mais estáveis durante mais tempo. Isto traduz-se numa manhã
          sem fome descontrolada, sem quebras de energia e com melhor capacidade
          cognitiva.
        </p>
        <p>
          Como defende a Dra. Lara Briden, especialista em saúde hormonal
          feminina e autora de <em>Period Repair Manual</em>: a proteína ao
          pequeno-almoço é uma das intervenções alimentares mais simples e
          eficazes para mulheres em qualquer fase da vida — especialmente na{" "}
          <Link
            to="/blog/nervo-vago-como-ativar-mulher"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            fase de transição hormonal
          </Link>
          , em que a sensibilidade à insulina diminui e a preservação de massa
          muscular se torna prioritária.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="Não é apenas o que você come — é o que come primeiro. A proteína ao pequeno-almoço define o perfil metabólico do resto do dia." />

      <SEOSymptomGrid
        label="Reconhece estes sinais?"
        title="Sinais de que o seu pequeno-almoço não tem proteína suficiente"
        symptoms={sintomas}
      />

      <SEOContentSection
        label="Quanto é suficiente"
        title="A quantidade mínima que faz diferença: 25 a 30 g"
        bg="almond"
      >
        <p>
          A investigação em metabolismo proteico sugere que são necessários pelo
          menos 25 g de proteína por refeição para activar de forma eficaz a
          síntese proteica muscular e as hormonas de saciedade. Abaixo deste
          limiar, o efeito anabólico e saciante é significativamente menor.
        </p>
        <p>
          Para colocar este valor em perspectiva: uma fatia de pão com queijo
          contém cerca de 6 a 8 g de proteína. Uma tigela de cereais com leite,
          aproximadamente 7 g. Duas torradas com manteiga de amendoim, cerca de
          10 g. A maioria dos pequenos-almoços convencionais fica muito aquém
          do limiar funcional.
        </p>
        <p>
          A solução não é complicada — mas exige intencionalidade. Duas a três
          fontes proteicas combinadas numa refeição matinal (por exemplo, ovos +
          queijo, ou iogurte grego + sementes + proteína em pó) atingem
          facilmente os 25 g necessários. Se está a lidar com{" "}
          <Link
            to="/fadiga-exames-normais"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            fadiga com exames normais
          </Link>
          , esta pode ser uma das primeiras alterações a considerar.
        </p>
      </SEOContentSection>

      <SEOPatternCards
        label="Opções práticas"
        title="6 pequenos-almoços com 20 a 30 g de proteína"
        patterns={opcoes}
      />

      <SEOContentSection
        label="Perimenopausa e proteína"
        title="Porque é que a proteína é ainda mais importante a partir dos 40"
      >
        <p>
          A partir da perimenopausa, ocorrem duas alterações metabólicas
          relevantes: a resistência à insulina tende a aumentar — mesmo em
          mulheres magras — e a perda de massa muscular acelera (sarcopenia). A
          proteína actua directamente em ambas as frentes.
        </p>
        <p>
          A distribuição proteica ao longo do dia — e não apenas a quantidade
          total — é determinante. Muitas mulheres consomem a maior parte da sua
          proteína ao jantar, deixando o pequeno-almoço e o almoço
          insuficientes. Este padrão limita a síntese muscular e contribui para
          flutuações de energia e de humor.
        </p>
        <p>
          Se você está a notar alterações no peso, na energia ou no sono, vale a
          pena avaliar a{" "}
          <Link
            to="/insulina-jejum-o-que-significa"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            insulina em jejum
          </Link>{" "}
          como parte de uma avaliação funcional mais abrangente. A insulina é
          muitas vezes o marcador mais precoce de desequilíbrio metabólico — e
          responde bem a intervenções alimentares como o aumento proteico ao
          pequeno-almoço.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="A perda de massa muscular após os 40 não é inevitável — é, em grande parte, uma consequência de ingestão proteica insuficiente e mal distribuída ao longo do dia." />

      <SEOPatternCards
        label="Benefícios"
        title="O que muda quando começa o dia com proteína"
        patterns={beneficios}
        bg="almond"
      />

      <SEOContentSection
        label="Na prática"
        title="Dicas para aumentar a proteína sem complicar a manhã"
      >
        <p>
          A principal barreira não é a falta de informação — é o hábito. A
          maioria das pessoas repete o mesmo pequeno-almoço há anos. Mudá-lo
          exige uma fase de adaptação, mas os resultados tendem a ser evidentes
          nas primeiras duas semanas: menos fome, mais energia estável e menos
          dependência de café.
        </p>
        <p>
          Algumas estratégias simples: preparar overnight oats na noite anterior
          com iogurte grego e sementes; cozinhar ovos em lote ao domingo para a
          semana; ter sempre proteína em pó como recurso rápido; manter salmão
          fumado ou queijo cottage no frigorífico. A ideia é remover atrito, não
          acrescentar complicação.
        </p>
        <p>
          Se tem dúvidas sobre quais marcadores avaliar antes de alterar a sua
          alimentação, a{" "}
          <Link
            to="/ferritina-baixa-sintomas"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            ferritina
          </Link>{" "}
          é um bom ponto de partida — reservas insuficientes de ferro podem
          agravar fadiga e dificultar a adaptação a qualquer mudança alimentar.
        </p>
      </SEOContentSection>

      <FAQSection />

      <SEOLeadMagnetCTA />

      <SEOCTA
        title="O que come ao pequeno-almoço pode estar a definir o resto do seu dia."
        subtitle="A avaliação funcional identifica padrões metabólicos e hormonais que influenciam energia, peso e saciedade — e mostra o que ajustar primeiro."
      />
    </SEOPageLayout>
  );
};

export default PequenosAlmocosRicosProteina;
