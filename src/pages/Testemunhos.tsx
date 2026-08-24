import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOCTA from "@/components/seo/SEOCTA";
import { Link } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";
import { testemunhos, avaliacaoGlobal } from "@/data/testemunhos";

const TestemunhosGrid = () => {
  const ref = useFadeUp();

  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          Palavras das pacientes
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          O que dizem quem já passou por aqui
        </h2>

        <div className="space-y-14">
          {testemunhos.map((t, i) => (
            <figure key={i} className="border-l border-almond pl-6 md:pl-8">
              <blockquote
                lang={t.idioma === "en" ? "en" : "pt"}
                className="font-sans font-normal text-foreground/80 text-[15px] md:text-[16px] leading-[1.9]"
              >
                {t.texto}
              </blockquote>
              <figcaption className="mt-4 font-sans text-[13px] text-foreground/50">
                {t.autor}
                <span className="text-foreground/30"> · avaliação no Google</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testemunhos = () => {
  /* Sem Review/AggregateRating: reviews self-serving no próprio domínio
     violam a política do Google para Review snippets (auditoria 2026-08-24).
     O texto das avaliações continua visível na página; o rating vive no
     Google Business Profile, que é a fonte que conta. */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Testemunhos: o que dizem as pacientes",
    url: "https://www.catarinaveiga.com/testemunhos",
    inLanguage: "pt-PT",
    about: { "@id": "https://www.catarinaveiga.com/#business" },
  };

  return (
    <SEOPageLayout
      title="Testemunhos: o que dizem as pacientes | Catarina Veiga"
      description="Avaliações reais de mulheres acompanhadas em medicina funcional integrativa. Fadiga, sono, hormonas e exames normais: o que mudou, por palavras delas."
      canonical="https://www.catarinaveiga.com/testemunhos"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina Funcional · Testemunhos"
        title="O que dizem as mulheres que já passaram por aqui"
        intro="Avaliações reais, publicadas no Google, reproduzidas aqui sem alterações. A maioria descreve a mesma coisa: anos a ouvir que estava tudo normal, até alguém olhar para o conjunto."
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Testemunhos" },
        ]}
      />

      <SEOContentSection label="Contexto" title="Porque estão aqui">
        <p>
          Estas avaliações foram escritas por pacientes no perfil Google da consulta, onde a média é de {avaliacaoGlobal.media} em {avaliacaoGlobal.total} avaliações. Estão reproduzidas tal como foram escritas, incluindo o tratamento por "Dra.", que é a forma como as pacientes escrevem e não uma descrição da minha profissão: sou especialista em medicina funcional integrativa, não sou médica.
        </p>
        <p>
          Algumas descrevem melhorias concretas em situações clínicas específicas. São a experiência de cada uma delas, não uma previsão do que acontece a outra pessoa: cada caso é um caso, e nada aqui substitui avaliação médica.
        </p>
      </SEOContentSection>

      <TestemunhosGrid />

      <SEOContentSection label="O padrão" title="A frase que se repete">
        <p>
          Lidas em conjunto, quase todas dizem a mesma coisa por palavras diferentes: que foram escutadas, que alguém olhou para o conjunto em vez de para um valor isolado, e que a explicação apareceu depois de anos sem ela. É esse o trabalho.
        </p>
        <p>
          Se é esse o ponto onde está,{" "}
          <Link to="/exames-normais-mas-sintomas" className="text-amber hover:text-amber-light underline transition-colors">
            a página sobre exames normais com sintomas persistentes
          </Link>{" "}
          explica o que uma leitura funcional procura, e{" "}
          <Link to="/segunda-opiniao-analises-normais" className="text-amber hover:text-amber-light underline transition-colors">
            a da segunda opinião
          </Link>{" "}
          explica o que muda ao reler as análises que já tem.
        </p>
      </SEOContentSection>

      <SEOCTA
        title="Os teus exames estão normais. O teu corpo não."
        subtitle="A consulta inicial começa exactamente onde estas mulheres começaram: pelo histórico e pelas análises que já tens."
        buttonText="Começar avaliação funcional"
        note="Gratuita · 14 biomarcadores · leitura imediata"
      />
    </SEOPageLayout>
  );
};

export default Testemunhos;
