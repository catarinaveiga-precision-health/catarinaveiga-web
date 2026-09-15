import { Link } from "react-router-dom";
import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCTA from "@/components/seo/SEOCTA";
import { useFadeUp } from "@/hooks/useFadeUp";

const sinaisDesequilibrio = [
  "Acorda cansada mesmo depois de dormir 7–8 horas",
  "Tem fome constante ou vontade de doces ao longo do dia",
  "Sente nevoeiro mental ou dificuldade de concentração pela manhã",
  "O peso aumentou nos últimos meses sem alteração de hábitos",
  "Sente irritabilidade ou ansiedade sem causa clara",
  "Tem afrontamentos, suores nocturnos ou alterações de humor",
  "A energia cai a pique a meio da manhã ou a meio da tarde",
  "Perdeu massa muscular ou sente-se mais fraca do que antes",
];

const refeicoes = [
  {
    title: "Omelete de dois ovos com abacate e sementes de abóbora",
    desc: "Proteína completa + gordura saudável + magnésio. Ideal para estabilizar cortisol pela manhã. ~22 g de proteína.",
  },
  {
    title: "Iogurte grego com nozes, canela e sementes de linhaça",
    desc: "O iogurte grego fornece proteína e probióticos; a linhaça moída contém lignanas que modulam estrogénio. ~20 g de proteína.",
  },
  {
    title: "Torrada de centeio com ricotta, salmão fumado e rúcula",
    desc: "Omega-3 do salmão + proteína da ricotta. Anti-inflamatório e saciante sem ser pesado. ~24 g de proteína.",
  },
  {
    title: "Papas de aveia com proteína whey, manteiga de amêndoa e mirtilos",
    desc: "Fibra + proteína + antioxidantes. A aveia fornece beta-glucanos que ajudam a regular colesterol. ~28 g de proteína.",
  },
  {
    title: "Wrap integral com ovo, espinafres e queijo cottage",
    desc: "Prático para levar. Os espinafres adicionam ferro e magnésio; o queijo cottage é rico em caseína de absorção lenta. ~26 g de proteína.",
  },
  {
    title: "Batido verde com proteína, espinafres, gengibre e banana",
    desc: "Para manhãs sem tempo. O gengibre apoia a digestão e tem propriedades anti-inflamatórias. ~25 g de proteína.",
  },
];

const pilares = [
  {
    title: "Proteína: o alicerce metabólico",
    desc: "25–30 g por refeição para activar síntese muscular, estabilizar glicemia e sustentar neurotransmissores.",
  },
  {
    title: "Gordura saudável: suporte hormonal",
    desc: "Abacate, azeite, nozes e sementes fornecem os lípidos necessários para a produção de progesterona e estrogénio.",
  },
  {
    title: "Fibra: regulação intestinal e estrogénica",
    desc: "A fibra liga-se ao estrogénio em excesso no intestino e facilita a sua excreção. Sementes de linhaça são particularmente eficazes.",
  },
  {
    title: "Simplicidade: a sustentabilidade do hábito",
    desc: "Um pequeno-almoço que demora mais de 10 minutos a preparar não vai sobreviver à rotina. As opções mais eficazes são as mais simples.",
  },
];

const ajustesHormonais = [
  {
    title: "Resistência à insulina na perimenopausa",
    desc: "A diminuição de estrogénio reduz a sensibilidade à insulina. A proteína ao pequeno-almoço atenua picos de glicemia e previne acumulação de gordura visceral.",
  },
  {
    title: "Cortisol e stress matinal",
    desc: "O cortisol está naturalmente elevado de manhã. Um pequeno-almoço equilibrado evita que a resposta ao stress se prolongue e desregule o restante do dia.",
  },
  {
    title: "Progesterona em declínio",
    desc: "Na perimenopausa, a progesterona diminui antes do estrogénio. A estabilidade glicémica e a redução de inflamação apoiam os níveis remanescentes de progesterona.",
  },
  {
    title: "Serotonina e bem-estar matinal",
    desc: "O triptofano (aminoácido precursor da serotonina) compete com outros aminoácidos pela passagem ao cérebro. Um pequeno-almoço proteico equilibrado facilita esta síntese.",
  },
];

const FAQSection = () => {
  const ref = useFadeUp();
  const faqs = [
    {
      q: "Qual é o melhor pequeno-almoço para mulheres na perimenopausa?",
      a: "Um pequeno-almoço com 25–30 g de proteína, gordura saudável e fibra. Esta combinação estabiliza a glicemia, reduz cravings e apoia a produção hormonal numa fase em que a sensibilidade à insulina diminui e as flutuações hormonais se acentuam.",
    },
    {
      q: "A proteína ao pequeno-almoço ajuda com afrontamentos e suores nocturnos?",
      a: "Indirectamente, sim. A estabilização da glicemia reduz picos de insulina que podem amplificar a instabilidade vasomotora. Não é uma solução isolada, mas faz parte de uma abordagem integrativa eficaz.",
    },
    {
      q: "Posso fazer jejum intermitente na perimenopausa?",
      a: "O jejum intermitente pode ser contraproducente para muitas mulheres na perimenopausa, especialmente se o cortisol já está elevado. A Dra. Lara Briden recomenda cautela e prioriza a ingestão proteica ao pequeno-almoço em vez de a saltar.",
    },
    {
      q: "A soja é uma boa fonte de proteína para a menopausa?",
      a: "A soja fermentada (tempeh, miso) pode ser benéfica em quantidades moderadas, dado o seu conteúdo em isoflavonas. Contudo, não deve ser a fonte proteica exclusiva. A variedade proteica — ovos, peixe, lacticínios, leguminosas — é preferível.",
    },
    {
      q: "Quanta proteína total devo comer por dia na perimenopausa?",
      a: "A maioria da evidência funcional aponta para 1,2 a 1,6 g de proteína por kg de peso corporal por dia, distribuída em 3 a 4 refeições. Para uma mulher de 65 kg, isto representa entre 78 e 104 g por dia.",
    },
    {
      q: "Como sei se os meus sintomas são hormonais ou alimentares?",
      a: "Muitas vezes são ambos. Uma avaliação funcional que inclua insulina em jejum, ferritina, vitamina D, TSH e hormonas sexuais pode esclarecer quais marcadores estão fora do intervalo funcional e orientar as intervenções certas.",
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
          FAQ — Proteína, energia e equilíbrio hormonal
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

const PequenosAlmocosProteinaEnergia = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: "Pequenos-Almoços com Proteína, Energia, Equilíbrio Hormonal e Simplicidade para Mulheres em Peri e Menopausa",
    description:
      "Proteína ao pequeno-almoço estabiliza energia, reduz cravings e apoia o equilíbrio hormonal na perimenopausa. 6 opções simples, rápidas e sem meal prep.",
    url: "https://www.catarinaveiga.com/pequenos-almocos-com-proteina-energia-equilibrio-hormonal-e-simplicidade-para-mulheres-em-peri-e-menopausa",
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
      title="Pequenos-Almoços com Proteína para Mulheres na Peri e Menopausa | Catarina Veiga"
      description="Proteína ao pequeno-almoço estabiliza energia, reduz cravings e apoia o equilíbrio hormonal na perimenopausa. 6 opções simples, rápidas e sem meal prep."
      canonical="https://www.catarinaveiga.com/pequenos-almocos-com-proteina-energia-equilibrio-hormonal-e-simplicidade-para-mulheres-em-peri-e-menopausa"
      structuredData={structuredData}
    >
      <SEOHero
        label="Nutrição Funcional · Perimenopausa"
        title="Pequenos-almoços com proteína, energia, equilíbrio hormonal e simplicidade para mulheres em peri e menopausa"
        intro="Se está na perimenopausa ou menopausa, o que come ao pequeno-almoço tem um impacto directo na energia, no peso, no humor e no equilíbrio hormonal. A proteína é o nutriente mais negligenciado — e o mais transformador — desta refeição."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "Proteína na perimenopausa" },
        ]}
      />

      <SEOContentSection
        label="O contexto hormonal"
        title="Porque é que a perimenopausa muda tudo no pequeno-almoço"
      >
        <p>
          A perimenopausa — a fase de transição que pode começar já aos 38–40
          anos e prolongar-se por uma década — é marcada por flutuações
          hormonais que afectam directamente o metabolismo, o apetite e a
          composição corporal. A progesterona diminui primeiro, seguida pelo
          estrogénio, e a sensibilidade à insulina tende a reduzir-se mesmo em
          mulheres sem excesso de peso.
        </p>
        <p>
          Estas alterações significam que o mesmo pequeno-almoço que funcionava
          aos 30 pode estar a contribuir para ganho de peso, fadiga e
          instabilidade emocional aos 45. Não é falta de disciplina — é uma
          mudança fisiológica que exige uma resposta nutricional diferente.
        </p>
        <p>
          Como a Dra. Lara Briden explica em{" "}
          <em>Hormone Repair Manual</em>, a proteína ao pequeno-almoço é uma
          das primeiras intervenções alimentares a considerar na perimenopausa,
          porque actua simultaneamente na{" "}
          <Link
            to="/insulina-jejum-o-que-significa"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            regulação da insulina
          </Link>
          , na saciedade e na preservação de massa muscular — três pilares que
          se tornam críticos nesta fase.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="O pequeno-almoço não é apenas a primeira refeição do dia — é a refeição que programa a resposta metabólica e hormonal das horas seguintes." />

      <SEOSymptomGrid
        label="Reconhece estes sinais?"
        title="Sinais de que o seu pequeno-almoço não está a servir as suas hormonas"
        symptoms={sinaisDesequilibrio}
      />

      <SEOContentSection
        label="Os quatro pilares"
        title="O que um pequeno-almoço funcional precisa de ter"
        bg="almond"
      >
        <p>
          Um pequeno-almoço adequado à perimenopausa não é apenas uma questão
          de proteína. É a combinação de quatro elementos que, em conjunto,
          estabilizam a glicemia, apoiam a produção hormonal e sustentam a
          energia ao longo da manhã.
        </p>
        <p>
          A proteína é o pilar central — sem ela, os outros componentes perdem
          eficácia metabólica. Mas a gordura saudável é igualmente essencial,
          porque as hormonas esteróides (incluindo estrogénio e progesterona)
          são sintetizadas a partir de colesterol. E a fibra actua como
          regulador intestinal e estrogénico, ligando-se ao estrogénio em
          excesso e facilitando a sua eliminação.
        </p>
        <p>
          Se está a lidar com{" "}
          <Link
            to="/fadiga-exames-normais"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            fadiga com exames aparentemente normais
          </Link>
          , o pequeno-almoço é um dos primeiros hábitos a reavaliar — porque
          pode estar a contribuir para um padrão de desgaste metabólico que os
          exames convencionais não identificam.
        </p>
      </SEOContentSection>

      <SEOPatternCards
        label="Os 4 pilares"
        title="Anatomia de um pequeno-almoço funcional na perimenopausa"
        patterns={pilares}
      />

      <SEOContentSection
        label="Opções práticas"
        title="6 pequenos-almoços simples, rápidos e hormonalmente inteligentes"
      >
        <p>
          Nenhuma destas opções demora mais de 10 minutos a preparar. Algumas
          podem ser preparadas na noite anterior. Todas contêm entre 20 e 30 g
          de proteína, gordura saudável e fibra. O objectivo é que sejam
          suficientemente simples para se tornarem rotina — porque a
          consistência é mais importante do que a perfeição.
        </p>
      </SEOContentSection>

      <SEOPatternCards
        label="Receitas"
        title="6 opções com 20–30 g de proteína cada"
        patterns={refeicoes}
        bg="almond"
      />

      <SEOImpactQuote quote="Não precisa de transformar a cozinha num laboratório. Precisa de proteína, gordura e fibra ao pequeno-almoço — de forma consistente." />

      <SEOPatternCards
        label="Hormonas e metabolismo"
        title="Como a proteína ao pequeno-almoço apoia o equilíbrio hormonal"
        patterns={ajustesHormonais}
      />

      <SEOContentSection
        label="Suplementação estratégica"
        title="Para além do prato: o que pode complementar"
        bg="almond"
      >
        <p>
          A alimentação é o pilar central, mas na perimenopausa há nutrientes
          cuja necessidade aumenta e que podem beneficiar de suplementação
          orientada. O magnésio (glicinato ou treonato) apoia o sono, o
          sistema nervoso e a sensibilidade à insulina. A{" "}
          <Link
            to="/vitamina-d-valores-funcionais"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            vitamina D
          </Link>{" "}
          é essencial para a função imune, óssea e hormonal — e a maioria das
          mulheres portuguesas tem valores insuficientes.
        </p>
        <p>
          A{" "}
          <Link
            to="/ferritina-baixa-sintomas"
            className="text-amber hover:text-amber-light underline transition-colors"
          >
            ferritina
          </Link>{" "}
          é outro marcador crítico: reservas de ferro insuficientes agravam
          fadiga, queda de cabelo e intolerância ao exercício — sintomas que se
          sobrepõem aos da perimenopausa e dificultam o diagnóstico
          diferencial. Uma avaliação funcional que inclua estes biomarcadores
          permite identificar exactamente onde intervir.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="Erros comuns"
        title="O que evitar ao pequeno-almoço na perimenopausa"
      >
        <p>
          Há padrões alimentares muito enraizados que podem estar a prejudicar
          a transição hormonal sem que a mulher se aperceba. O jejum
          intermitente prolongado, por exemplo, pode elevar o cortisol e
          agravar a instabilidade hormonal — a Dra. Lara Briden desaconselha-o
          activamente nesta fase, salvo em casos específicos e acompanhados.
        </p>
        <p>
          Outros erros frequentes: pequenos-almoços exclusivamente à base de
          fruta e sumo (frutose sem fibra nem proteína = pico glicémico),
          café em jejum (estimula cortisol em excesso), e o recurso a
          alimentos "light" ou "zero" que substituem gordura por açúcar ou
          adoçantes artificiais.
        </p>
        <p>
          A mudança não precisa de ser radical. Começar por adicionar uma fonte
          de proteína ao que já come — um ovo ao lado da torrada, iogurte grego
          em vez de iogurte normal, uma colher de proteína no café — já altera
          significativamente o perfil metabólico da manhã.
        </p>
      </SEOContentSection>

      <FAQSection />

      <SEOCTA
        title="A sua energia e as suas hormonas merecem atenção — não apenas exames de rotina."
        subtitle="A avaliação funcional analisa 17 biomarcadores — incluindo insulina, ferritina, vitamina D e marcadores tiroideus — e identifica padrões que orientam intervenções concretas."
      />
    </SEOPageLayout>
  );
};

export default PequenosAlmocosProteinaEnergia;
