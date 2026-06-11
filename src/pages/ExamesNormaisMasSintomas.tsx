import { Link } from "react-router-dom";
import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOImpactQuote from "@/components/seo/SEOImpactQuote";
import SEOPatternCards from "@/components/seo/SEOPatternCards";
import { useFadeUp } from "@/hooks/useFadeUp";

const frasesOuvidas = [
  "Os exames estão normais.",
  "É stress.",
  "É da idade.",
  "Não vejo nada de preocupante.",
  "Experimente descansar mais.",
];

const padroes = [
  {
    title: "Mulher, 42 anos",
    desc: "Fadiga que não cede ao descanso. Ferritina considerada normal, mas longe do intervalo funcional. Sono leve, sem fase profunda. Três especialidades consultadas, nenhuma explicação integrada.",
  },
  {
    title: "Mulher, 48 anos",
    desc: "Perimenopausa. Ansiedade nova, sem história prévia. Acorda às 4h da manhã com o coração acelerado. As análises hormonais pontuais não captam a flutuação que os sintomas descrevem.",
  },
  {
    title: "Mulher, 39 anos",
    desc: "Alterações digestivas persistentes. Exames de rotina normais. Sinais de inflamação de baixo grau que nunca foram lidos em conjunto: pele, intestino, energia, ciclo.",
  },
];

const puzzlePecas = [
  "Sono",
  "Stress",
  "Hormonas",
  "Ferritina",
  "Tiroide",
  "Metabolismo",
  "Digestão",
  "Sistema nervoso",
];

const HeroManifesto = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-almond/20 pt-28 pb-32 md:pb-40 px-6">
      <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto mb-16 md:mb-20">
        <ol className="flex gap-2 text-xs font-sans text-foreground/40">
          <li className="flex items-center gap-2">
            <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
          </li>
          <li className="flex items-center gap-2">
            <span>/</span>
            <span className="text-foreground/60">Exames normais, sintomas reais</span>
          </li>
        </ol>
      </nav>

      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          A tese de Catarina Veiga
        </p>
        <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-light text-foreground leading-[1.1] mb-8">
          Os teus exames estão normais. O teu corpo não.
        </h1>
        <p className="font-sans font-light text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl mb-12">
          Fadiga persistente. Alterações hormonais. Sono fragmentado. Ansiedade
          nova. Sintomas que afetam a qualidade de vida, mesmo quando os exames
          são considerados normais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/metodo"
            className="inline-block text-center bg-eclipse text-white font-sans text-sm font-normal tracking-wide px-10 py-4 rounded-sm hover:bg-eclipse/90 transition-colors"
          >
            Conhecer o Método
          </Link>
          <Link
            to="/avaliacao"
            className="inline-block text-center border border-eclipse/30 text-foreground font-sans text-sm font-normal tracking-wide px-10 py-4 rounded-sm hover:border-eclipse/60 transition-colors"
          >
            Marcar Avaliação
          </Link>
        </div>
      </div>
    </section>
  );
};

const FrasesSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          Talvez já tenha ouvido isto.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {frasesOuvidas.map((frase, i) => (
            <div
              key={i}
              className={`border border-foreground/10 rounded-sm px-8 py-10 ${i === frasesOuvidas.length - 1 ? "sm:col-span-2" : ""}`}
            >
              <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/60 leading-snug">
                "{frase}"
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-6 font-sans font-light text-foreground/70 text-[17px] leading-[1.85]">
          <p>
            Muitas mulheres chegam à consulta depois de anos a ouvir versões
            destas respostas.
          </p>
          <p>
            Os sintomas continuam. A qualidade de vida diminui. Mas continua a
            faltar uma explicação que faça sentido.
          </p>
        </div>
      </div>
    </section>
  );
};

const PuzzleSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-almond/20 py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          O puzzle
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-8">
          Quando olhamos apenas para uma peça do puzzle.
        </h2>
        <p className="font-sans font-light text-foreground/70 text-[17px] leading-[1.85] mb-16 max-w-2xl">
          Cada especialidade olha para a sua peça. Mas um sintoma raramente
          pertence a uma peça só: vive nas ligações entre elas.
        </p>

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto" aria-label="Diagrama: um sintoma no centro, ligado a sono, stress, hormonas, ferritina, tiroide, metabolismo, digestão e sistema nervoso">
          {[...puzzlePecas.slice(0, 4), "__centro__", ...puzzlePecas.slice(4)].map(
            (peca, i) =>
              peca === "__centro__" ? (
                <div
                  key={i}
                  className="aspect-square rounded-full bg-eclipse flex items-center justify-center"
                >
                  <span className="font-serif text-lg md:text-2xl font-light italic text-white">
                    Sintoma
                  </span>
                </div>
              ) : (
                <div
                  key={i}
                  className="aspect-square rounded-sm border border-foreground/15 bg-background/60 flex items-center justify-center px-2"
                >
                  <span className="font-sans text-xs md:text-sm font-light text-foreground/70 text-center leading-tight">
                    {peca}
                  </span>
                </div>
              )
          )}
        </div>

        <p className="font-serif text-2xl md:text-3xl font-light italic text-foreground/80 text-center mt-16">
          O corpo não funciona por especialidades.
        </p>
      </div>
    </section>
  );
};

const ProximosPassos = () => {
  const ref = useFadeUp();
  const caminhos = [
    {
      eyebrow: "Guia gratuito",
      title: "Porque tem fome pouco depois de comer?",
      desc: "A fisiologia da saciedade explicada de forma simples, com 29 receitas ricas em proteína. Um primeiro passo sem compromisso.",
      to: "/guia-saciedade",
      cta: "Receber o guia",
    },
    {
      eyebrow: "Primeiro contacto clínico",
      title: "Avaliação Inicial",
      desc: "60 a 90 minutos em telemedicina. Histórico clínico, sono, digestão, energia, ciclo e exames anteriores. Sais com hipóteses claras e prioridades definidas.",
      to: "/avaliacao",
      cta: "Conhecer a Avaliação",
    },
    {
      eyebrow: "Acompanhamento estruturado",
      title: "Programa Fundação",
      desc: "12 semanas, três fases: investigar, intervir, consolidar. Para quadros que precisam de tempo e método, não de mais um exame isolado.",
      to: "/programa-fundacao",
      cta: "Ver o programa",
    },
  ];
  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          Próximos passos
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          Três caminhos, consoante o momento em que estás.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caminhos.map((c, i) => (
            <div
              key={i}
              className="border border-foreground/10 rounded-sm p-10 flex flex-col"
            >
              <p className="font-sans text-[10px] font-normal tracking-[0.2em] uppercase text-matcha mb-4">
                {c.eyebrow}
              </p>
              <h3 className="font-serif text-xl font-light text-foreground leading-snug mb-4">
                {c.title}
              </h3>
              <p className="font-sans font-light text-foreground/60 text-[15px] leading-[1.8] mb-8 flex-1">
                {c.desc}
              </p>
              <Link
                to={c.to}
                className="font-sans text-sm text-foreground underline underline-offset-4 hover:text-matcha transition-colors"
              >
                {c.cta} ›
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExamesNormaisMasSintomas = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Os teus exames estão normais. O teu corpo não.",
    name: "Exames normais mas sintomas persistentes",
    description:
      "Porque é que tantas mulheres têm fadiga, ansiedade, sono fragmentado e alterações hormonais com análises consideradas normais, e o que uma leitura integrada da fisiologia feminina procura.",
    url: "https://www.catarinaveiga.com/exames-normais-mas-sintomas",
    inLanguage: "pt-PT",
    author: {
      "@type": "Person",
      name: "Catarina Veiga",
      url: "https://www.catarinaveiga.com/sobre",
    },
    about: [
      "exames normais mas sintomas",
      "fadiga com exames normais",
      "sintomas persistentes",
      "ferritina normal mas baixa",
      "perimenopausa sintomas",
      "tiroide sintomas com análises normais",
    ],
  };

  return (
    <SEOPageLayout
      title="Exames Normais mas Sintomas Persistentes | Catarina Veiga"
      description="Fadiga, ansiedade, sono fragmentado e alterações hormonais com análises consideradas normais. Porque acontece, e o que uma leitura integrada da fisiologia feminina procura encontrar."
      canonical="https://www.catarinaveiga.com/exames-normais-mas-sintomas"
      structuredData={structuredData}
      hideLeadMagnet
    >
      <HeroManifesto />

      <FrasesSection />

      <SEOContentSection
        label="Onde está o problema"
        title="O problema nem sempre está nos exames."
        bg="almond"
      >
        <p>
          Os valores de referência de um exame descrevem a população que faz
          análises, não o funcionamento ótimo de um corpo. Estar dentro do
          intervalo significa que não há doença declarada. Não significa que a
          fisiologia esteja a funcionar bem.
        </p>
        <p>
          Uma{" "}
          <Link to="/ferritina-baixa-sintomas" className="text-amber hover:text-amber-light underline transition-colors">
            ferritina
          </Link>{" "}
          de 20 ng/mL é "normal" no papel e, ao mesmo tempo, compatível com
          fadiga, queda de cabelo e sono leve. Uma{" "}
          <Link to="/vitamina-d-valores-funcionais" className="text-amber hover:text-amber-light underline transition-colors">
            vitamina D
          </Link>{" "}
          de 22 ng/mL passa no critério de laboratório e fica longe do intervalo
          funcional. Uma{" "}
          <Link to="/insulina-jejum-o-que-significa" className="text-amber hover:text-amber-light underline transition-colors">
            insulina em jejum
          </Link>{" "}
          raramente é pedida, e é muitas vezes o marcador mais precoce de
          desequilíbrio metabólico. Uma{" "}
          <Link to="/tsh-normal-mas-com-sintomas" className="text-amber hover:text-amber-light underline transition-colors">
            TSH normal
          </Link>{" "}
          não exclui um padrão tiroideu funcional. E na{" "}
          <Link to="/blog/progesterona-baixa-sintomas-fase-lutea" className="text-amber hover:text-amber-light underline transition-colors">
            perimenopausa
          </Link>
          , análises pontuais captam um momento de uma flutuação que dura anos.
        </p>
        <p>
          A peça que falta não é, na maioria dos casos, mais um exame. É
          contexto clínico: os sintomas, a história, o sono, o ciclo, a
          digestão, a energia. Os números só ganham significado quando são
          lidos dentro dessa história.
        </p>
      </SEOContentSection>

      <PuzzleSection />

      <SEOPatternCards
        label="Casos típicos, sem nomes"
        title="Os padrões que vejo com mais frequência"
        patterns={padroes}
      />

      <SEOImpactQuote quote="Não é sobre fazer mais exames. É sobre ler bem os que já existem, dentro da história de cada mulher." />

      <SEOContentSection
        label="A leitura integrada"
        title="É aqui que trabalho."
      >
        <p>
          O meu trabalho começa onde os exames "normais" param: na leitura
          integrada. História clínica detalhada, sintomas e a sua linha
          temporal, biomarcadores interpretados em intervalos funcionais, e o
          contexto de vida real: sono, stress, alimentação, ciclo, fase
          hormonal.
        </p>
        <p>
          Nenhuma destas peças, sozinha, explica um quadro persistente. Lidas em
          conjunto, formam padrões reconhecíveis. E um padrão reconhecido é o
          contrário de "não vejo nada de preocupante": é uma hipótese clara,
          com prioridades definidas e passos concretos.
        </p>
        <p>
          Se quiseres ver como este raciocínio se aplica passo a passo, está
          descrito na página do{" "}
          <Link to="/metodo" className="text-amber hover:text-amber-light underline transition-colors">
            método
          </Link>
          . Se preferes começar pela tua{" "}
          <Link to="/fadiga-exames-normais" className="text-amber hover:text-amber-light underline transition-colors">
            fadiga com exames normais
          </Link>
          , também há por onde.
        </p>
      </SEOContentSection>

      <SEOContentSection
        label="Quem escreve"
        title="Sobre Catarina Veiga"
        bg="almond"
      >
        <p>
          Vinte anos de prática clínica em saúde feminina, com formação em
          Medicina Tradicional Chinesa. Quatro anos no Departamento de
          Microbioma da Regenerus Labs, num dos laboratórios de medicina
          funcional de referência no Reino Unido. Presença na Longevity Med
          Summit. O foco de trabalho é um só: mulheres com sintomas reais e
          exames aparentemente normais.
        </p>
        <p>
          <Link to="/sobre" className="text-amber hover:text-amber-light underline transition-colors">
            Conhecer o percurso completo ›
          </Link>
        </p>
      </SEOContentSection>

      <ProximosPassos />
    </SEOPageLayout>
  );
};

export default ExamesNormaisMasSintomas;
