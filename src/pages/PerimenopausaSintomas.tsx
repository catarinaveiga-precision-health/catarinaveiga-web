import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOCTA from "@/components/seo/SEOCTA";
import { Link } from "react-router-dom";

/* Página criada pela Fase 2 da auditoria SEO (2026-08-24): a consulta
   "perimenopausa sintomas" era a maior oportunidade do território e não
   tinha página. Conteúdo consolidado a partir do material já publicado
   pela Catarina (posts do blog: acordar às 4h, progesterona/fase lútea,
   biomarcadores) + fontes externas (NICE NG23, Santoro 2016), no tom
   empático em prosa que o SERP recompensa. Texto em prosa corrida de
   propósito: a auditoria mostrou que layouts em cards entregam ~8% do
   texto aos extratores de IA. */

const PerimenopausaSintomas = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sintomas da perimenopausa: o que é normal e o que merece investigação",
    "description":
      "Os sintomas mais comuns da perimenopausa, porque começam anos antes da menopausa, e porque é que as análises podem dar normais mesmo quando o corpo já mudou.",
    "url": "https://www.catarinaveiga.com/perimenopausa-sintomas",
    "inLanguage": "pt",
    "dateModified": "2026-08-24",
    "publisher": {
      "@type": "Organization",
      "name": "Catarina Veiga · Medicina Funcional Integrativa",
      "url": "https://www.catarinaveiga.com",
    },
  };

  return (
    <SEOPageLayout
      title="Sintomas da Perimenopausa: 10 Sinais e Porque as Análises Dão Normais | Catarina Veiga"
      description="Acordar às 4h, ciclos a mudar, ansiedade nova, calores, memória que falha. Os sintomas da perimenopausa explicados, e porque as análises podem dar normais."
      canonical="https://www.catarinaveiga.com/perimenopausa-sintomas"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Perimenopausa"
        title="Sintomas da perimenopausa: o que é normal, o que merece investigação"
        intro="Se tens entre 38 e 52 anos e o teu corpo mudou sem explicação, provavelmente já perguntaste ao Google se aquilo que sentes é normal. Esta página é a resposta longa e honesta: o que é a perimenopausa, os sintomas que vejo repetidamente em consulta, e porque é que as análises tantas vezes dizem que está tudo bem quando tu sabes que não está."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Recursos", to: "/recursos" },
          { label: "Perimenopausa" },
        ]}
      />

      <SEOContentSection label="O essencial" title="O que é a perimenopausa">
        <p>
          A perimenopausa é a transição que antecede a menopausa: os anos em
          que os ovários vão mudando de ritmo até à última menstruação. Não é
          um interruptor, é um processo, e costuma durar vários anos. Começa
          tipicamente depois dos 40, por vezes antes, e muitas mulheres
          passam a primeira metade dela sem ninguém lhe pôr o nome certo.
        </p>
        <p>
          O detalhe que quase ninguém explica: a primeira hormona a cair não
          é o estrogénio, é a progesterona, anos antes. E como a progesterona
          tem um efeito calmante sobre o sistema nervoso, os primeiros
          sintomas raramente são calores. São sono frágil, ansiedade nova,
          uma sensação de alerta que não existia. É por isso que tantas
          mulheres começam esta fase a ouvir que "é stress".
        </p>
        <p>
          A palavra que melhor define a perimenopausa é flutuação. As
          hormonas não descem em linha reta: oscilam, com meses melhores e
          meses piores. Essa flutuação explica os sintomas, e explica também
          porque é que uma análise feita num único dia pode não mostrar nada
          de errado.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="Reconheces-te?"
        title="Os sintomas mais comuns, um a um"
      >
        <p>
          <strong>Acordar entre as 3h e as 5h da manhã.</strong> Adormeces
          sem dificuldade, dormes duas ou três horas, e o corpo desperta em
          alerta, por vezes com o coração acelerado. A queda da progesterona
          retira ao sono a sua proteção natural, e junta-se muitas vezes ao
          cortisol e à glicemia noturna. Escrevi um artigo inteiro sobre{" "}
          <Link to="/blog/acordar-as-4-da-manha-perimenopausa">
            porque acordas sempre às 4h da manhã
          </Link>
          , e um{" "}
          <Link to="/guia-sono">
            guia gratuito de 18 páginas com um protocolo de reset circadiano
          </Link>{" "}
          de 4 semanas.
        </p>
        <p>
          <strong>Ciclos que mudaram.</strong> Mais curtos, mais longos, mais
          intensos ou mais imprevisíveis do que eram. É frequentemente o
          sinal mais objetivo de que a transição começou, e é dos primeiros
          que desvalorizamos.
        </p>
        <p>
          <strong>Uma SPM que piorou.</strong> A semana antes do período
          tornou-se difícil: irritabilidade, seios sensíveis, sono pior,
          humor em baixo. A fase lútea é onde a queda da progesterona se
          sente primeiro; expliquei o mecanismo no artigo sobre{" "}
          <Link to="/blog/progesterona-baixa-sintomas-fase-lutea">
            progesterona baixa e sintomas da fase lútea
          </Link>
          .
        </p>
        <p>
          <strong>Ansiedade que não existia.</strong> Sem motivo novo na
          vida, o corpo passou a reagir como se houvesse. Muitas mulheres
          descrevem-na como "não me reconheço". Tem base fisiológica, e
          merece mais do que um encolher de ombros.
        </p>
        <p>
          <strong>Calores e suores noturnos.</strong> O sintoma mais
          conhecido, mas raramente o primeiro. Ondas de calor durante o dia
          ou acordar encharcada durante a noite, mesmo com o quarto fresco.
        </p>
        <p>
          <strong>Névoa mental e memória que falha.</strong> Nomes que não
          vêm, fio de pensamento que se perde, dificuldade em concentrar-te
          em coisas que antes eram automáticas. Assusta muita gente, e na
          maioria dos casos acompanha a flutuação hormonal e o sono
          fragmentado.
        </p>
        <p>
          <strong>Peso que não mexe.</strong> A comer como sempre comeste, o
          corpo responde de outra maneira, sobretudo na zona abdominal. A
          sensibilidade à insulina muda nesta fase; vale a pena perceber{" "}
          <Link to="/insulina-jejum-o-que-significa">
            o que significa a insulina em jejum
          </Link>{" "}
          e porque a glicemia "normal" não conta a história toda.
        </p>
        <p>
          <strong>Cansaço que o sono não resolve.</strong> Dormes as horas e
          acordas gasta. Quando se junta a ferritina baixa, mesmo sem
          anemia, o cansaço instala-se; é um dos padrões que mais encontro,
          e escrevi sobre ele em{" "}
          <Link to="/fadiga-exames-normais">
            fadiga com exames normais
          </Link>
          .
        </p>
        <p>
          <strong>E ainda:</strong> libido em baixo, pele mais seca, queda
          de cabelo, articulações que se queixam de manhã, palpitações
          ocasionais. Nenhum destes sintomas, sozinho, define a
          perimenopausa. É o conjunto, e a idade, que contam a história.
        </p>
      </SEOContentSection>

      <SEOImpactQuote quote="A perimenopausa não se vê numa análise feita num único dia. Vê-se na história: nos ciclos, no sono, no que mudou. As análises ajudam a excluir outras causas e a orientar prioridades, não a validar o que sentes." />

      <SEOContentSection
        label="A pergunta que trouxe até aqui"
        title="Porque é que as análises dão normais"
      >
        <p>
          Este é o ponto onde a maioria das mulheres desiste de procurar
          respostas. Fizeste análises, talvez até hormonais, e vieram
          "normais". A explicação é menos misteriosa do que parece: as
          hormonas da perimenopausa flutuam tanto, de semana para semana e
          até de dia para dia, que uma medição isolada apanha apenas uma
          fotografia de um filme inteiro.
        </p>
        <p>
          Não sou eu que o digo: a orientação clínica britânica (NICE,
          guideline NG23 sobre menopausa) recomenda que, em mulheres com
          mais de 45 anos, a perimenopausa seja identificada pelos sintomas
          e pela história, sem análises hormonais de rotina, precisamente
          porque os valores flutuantes confundem mais do que esclarecem.
        </p>
        <p>
          Isto não significa que as análises não sirvam para nada. Servem, e
          muito, para o resto do quadro: a ferritina que explica o cansaço,
          a tiroide que trabalha no limite, a insulina que sobe há anos, a
          vitamina D insuficiente. É essa leitura em conjunto, com
          intervalos funcionais e não apenas os de referência, que faço na{" "}
          <Link to="/consulta-inicial">consulta inicial</Link>. E se ainda
          não tens a certeza, a{" "}
          <Link to="/avaliacao">autoavaliação gratuita de biomarcadores</Link>{" "}
          é um bom primeiro passo.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="Honestidade primeiro"
        title="Quando deves falar com um médico"
      >
        <p>
          Nem tudo o que acontece nesta fase é perimenopausa, e há sinais
          que exigem avaliação médica, não funcional: sangramentos muito
          abundantes ou prolongados, sangramento depois de mais de um ano
          sem menstruação, dor incaracterística, ou qualquer sintoma que te
          preocupe de forma aguda. Eu não diagnostico nem prescrevo: quando
          o quadro exige médico, digo-o com clareza e encaminho. O trabalho
          que faço é complementar, nunca substituto.
        </p>
      </SEOContentSection>

      <SEOContentSection label="Por onde começar" title="O que podes fazer já">
        <p>
          Antes de qualquer protocolo, há uma base que ajuda quase todos os
          quadros: luz natural na primeira hora do dia, para reancorar o
          ritmo do cortisol; 25 a 30 g de proteína ao pequeno-almoço, para
          estabilizar a glicemia desde a primeira refeição; reduzir o álcool
          durante duas a três semanas e observar o efeito nas noites; e
          horários de sono consistentes, fim de semana incluído. Se o sono é
          a tua queixa principal, o{" "}
          <Link to="/guia-sono">guia gratuito de higiene de sono</Link>{" "}
          organiza tudo isto num protocolo de 4 semanas.
        </p>
        <p>
          Depois, investigar em vez de adivinhar: rever a ferritina, a
          glicemia e a insulina em conjunto, situar os sintomas na fase do
          ciclo, e olhar para o quadro inteiro de uma vez. É exatamente isso
          que a primeira consulta faz: 90 minutos, a tua história completa,
          as tuas análises lidas em conjunto, e um plano escrito com
          prioridades que fica contigo.
        </p>
      </SEOContentSection>

      <SEOContentSection label="Fontes" title="Em que se baseia esta página">
        <p>
          NICE. Menopause: diagnosis and management (NG23), National
          Institute for Health and Care Excellence,{" "}
          <a
            href="https://www.nice.org.uk/guidance/ng23"
            target="_blank"
            rel="noopener noreferrer"
          >
            nice.org.uk/guidance/ng23
          </a>
          . Santoro N., "Perimenopause: From Research to Practice", Journal
          of Women's Health, 2016,{" "}
          <a
            href="https://doi.org/10.1089/jwh.2015.5556"
            target="_blank"
            rel="noopener noreferrer"
          >
            doi:10.1089/jwh.2015.5556
          </a>
          . E a prática clínica de 21 anos em saúde da mulher que informa
          todos os padrões descritos. Página atualizada a 24 de agosto de
          2026.
        </p>
      </SEOContentSection>

      <SEOCTA
        title="Reconheceste-te em três ou mais sintomas?"
        subtitle="A consulta inicial serve para ligar as peças: a tua história, o teu sono, o teu ciclo e as tuas análises, lidas em conjunto. Sais com hipóteses claras e um plano escrito. E se preferes começar sem marcar nada, a autoavaliação gratuita é o primeiro passo."
        buttonText="Fazer a autoavaliação gratuita"
        buttonTo="/avaliacao"
      />
    </SEOPageLayout>
  );
};

export default PerimenopausaSintomas;
