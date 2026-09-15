import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOSymptomGrid from "@/components/seo/SEOSymptomGrid";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import SEOCTA from "@/components/seo/SEOCTA";

const sinaisMenopausa = [
  "Acordar com energia mas colapsar a meio da manhã",
  "Fome constante apesar de comer o suficiente",
  "Dificuldade crescente em manter peso estável",
  "Perda de massa muscular mesmo com exercício",
  "Cravings intensos por doces, especialmente à tarde",
  "Insónia ou sono fragmentado que piora com a alimentação",
  "Nevoeiro mental e dificuldade de foco que não tinha antes",
  "Irritabilidade desproporcional ao contexto",
];

const mudancasHormonais = [
  { title: "Queda de estrogénio", desc: "Reduz a eficiência da síntese proteica muscular. Precisas de mais proteína por refeição para obter o mesmo resultado." },
  { title: "Resistência à insulina", desc: "Aumenta na perimenopausa mesmo sem ganho de peso. A proteína ao pequeno-almoço ajuda a estabilizar a glicose logo de manhã." },
  { title: "Cortisol matinal elevado", desc: "Comum na transição menopáusica. Um pequeno-almoço proteico amortece o pico de cortisol e reduz a ansiedade matinal." },
  { title: "Perda de massa muscular", desc: "A sarcopenia acelera a partir dos 40. Sem estímulo proteico distribuído ao longo do dia, a perda muscular progride silenciosamente." },
  { title: "Alterações de humor", desc: "A serotonina depende de triptofano (aminoácido). Sem proteína adequada, a produção de serotonina é comprometida." },
  { title: "Sono fragmentado", desc: "Refeições ricas em hidratos simples ao pequeno-almoço destabilizam a glicose — e a glicose instável fragmenta o sono na noite seguinte." },
];

const opcoesMenopausa = [
  { title: "Omeleta com legumes e queijo feta", desc: "3 ovos + legumes salteados + 30g feta = 27g proteína. Rico em colina, essencial para o fígado e o cérebro." },
  { title: "Iogurte grego com proteína e sementes de linhaça", desc: "200g iogurte grego + 1 scoop proteína + linhaça moída = 35g proteína. A linhaça fornece fitoestrogénios suaves." },
  { title: "Tosta de centeio com ovo e abacate", desc: "2 ovos + abacate + pão centeio = 22g proteína. A gordura do abacate apoia a absorção de vitaminas lipossolúveis." },
  { title: "Bowl de cottage cheese com nozes e canela", desc: "200g cottage + nozes + canela = 26g proteína. A canela ajuda a modular a resposta glicémica." },
  { title: "Batido proteico simples", desc: "1 scoop proteína + leite + banana + manteiga de amendoim = 30g proteína. Ideal para manhãs sem apetite." },
  { title: "Overnight oats com proteína e sementes de abóbora", desc: "Aveia + proteína + sementes abóbora + leite. 28g proteína. As sementes de abóbora são ricas em magnésio e zinco." },
];

const PequenosAlmocosProteinaMenopausa = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "name": "Pequenos-Almoços com Proteína Para Mulheres em Peri e Menopausa",
    "description": "Proteína, energia, equilíbrio hormonal e simplicidade. Pequenos-almoços desenhados para mulheres na perimenopausa e menopausa — com ciência e praticidade.",
    "url": "https://www.catarinaveiga.com/pequenos-almocos-com-proteina-energia-equilibrio-hormonal-e-simplicidade-para-mulheres-em-peri-e-menopausa",
    "inLanguage": "pt",
    "publisher": { "@type": "Organization", "name": "Catarina Veiga — Medicina Funcional Integrativa", "url": "https://www.catarinaveiga.com" },
  };

  return (
    <SEOPageLayout
      title="Pequenos-Almoços com Proteína Para Mulheres em Peri e Menopausa | Catarina Veiga"
      description="Proteína, energia, equilíbrio hormonal e simplicidade. Pequenos-almoços desenhados para mulheres na perimenopausa e menopausa — com ciência e praticidade."
      canonical="https://www.catarinaveiga.com/pequenos-almocos-com-proteina-energia-equilibrio-hormonal-e-simplicidade-para-mulheres-em-peri-e-menopausa"
      structuredData={structuredData}
    >
      <SEOHero
        label="Nutrição Funcional · Menopausa"
        title="Pequenos-almoços com proteína, energia e equilíbrio hormonal para mulheres em peri e menopausa"
        intro="Na perimenopausa, o corpo muda as regras sem avisar. O pequeno-almoço que funcionava aos 30 deixa de funcionar aos 42. A proteína não é um luxo — é a base que sustenta energia, humor e massa muscular nesta fase."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Pequenos-Almoços · Menopausa" },
        ]}
      />

      <SEOContentSection label="O contexto" title="Porque é que a perimenopausa muda tudo na alimentação">
        <p>
          A partir dos 40, o corpo feminino entra numa fase de transição hormonal que altera profundamente a forma como processa nutrientes. A queda progressiva de estrogénio reduz a sensibilidade à insulina, aumenta a tendência para acumular gordura visceral e diminui a eficiência da síntese proteica muscular.
        </p>
        <p>
          Isto significa que o mesmo pequeno-almoço que funcionava perfeitamente aos 30 — torrada com manteiga, fruta, café com leite — pode agora deixar-te com fome às 10h, irritável ao meio-dia e exausta às 15h.
        </p>
        <p>
          A solução não é comer menos. É comer de forma diferente — começando pela primeira refeição do dia com proteína suficiente para activar saciedade, proteger massa muscular e estabilizar a glicose.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="Na perimenopausa, cada refeição é uma oportunidade hormonal. O pequeno-almoço é a primeira — e a mais importante." />

      <SEOSymptomGrid
        label="Reconheces isto?"
        title="Sinais de que a tua alimentação matinal precisa de ajuste"
        symptoms={sinaisMenopausa}
      />

      <SEOPatternCards
        label="O que está a mudar"
        title="Como as alterações hormonais afectam as necessidades nutricionais"
        patterns={mudancasHormonais}
      />

      <SEOContentSection label="A ciência" title="Porque é que 25-30g de proteína é o mínimo por refeição" bg="almond">
        <p>
          A investigação em nutrição mostra que o limiar para activar a síntese proteica muscular é de aproximadamente 25-30g de proteína por refeição. Abaixo deste valor, o estímulo anabólico é insuficiente — mesmo que o total diário pareça adequado.
        </p>
        <p>
          Na perimenopausa, este limiar torna-se ainda mais crítico: a resistência anabólica associada à queda de estrogénio significa que o músculo responde menos ao mesmo estímulo. Para compensar, cada refeição precisa de atingir ou ultrapassar o limiar.
        </p>
        <p>
          Distribuir a proteína ao longo do dia — em vez de concentrar ao jantar — é uma das estratégias mais eficazes para preservar massa muscular, estabilizar o humor e manter a energia consistente.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="O objectivo não é perfeição — é consistência. Um pequeno-almoço proteico 5 dias por semana já muda o padrão metabólico." />

      <SEOPatternCards
        label="Opções práticas"
        title="6 pequenos-almoços desenhados para a perimenopausa"
        patterns={opcoesMenopausa}
        bg="almond"
      />

      <SEOContentSection label="Simplicidade" title="Como tornar isto sustentável no dia-a-dia">
        <p>
          A maior barreira não é o conhecimento — é a praticidade. Se o pequeno-almoço proteico demora mais de 10 minutos ou requer ingredientes especiais, não vai durar.
        </p>
        <p>
          Estratégias que funcionam: cozinhar ovos em batch ao domingo, ter sempre iogurte grego e cottage cheese no frigorífico, e manter proteína em pó como backup para manhãs apressadas. O objectivo é eliminar a decisão — ter sempre uma opção proteica pronta.
        </p>
        <p>
          Se não tens fome de manhã, começa por algo pequeno mas proteico: um iogurte grego, um batido simples, ou dois ovos cozidos. O apetite matinal constrói-se com o hábito — ao fim de duas semanas, o corpo começa a pedir a primeira refeição.
        </p>
      </SEOContentSection>

      <SEOCTA
        title="Queres perceber como o teu corpo está a responder às mudanças hormonais?"
        subtitle="A avaliação funcional analisa 17 biomarcadores — incluindo insulina, cortisol e marcadores inflamatórios — e mostra padrões que os exames convencionais não captam."
      />
    </SEOPageLayout>
  );
};

export default PequenosAlmocosProteinaMenopausa;
