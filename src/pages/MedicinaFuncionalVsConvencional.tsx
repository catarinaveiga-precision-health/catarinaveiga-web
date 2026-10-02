import { Link } from "react-router-dom";
import SEOPageLayout from "@/components/seo/SEOPageLayout";
import SEOHero from "@/components/seo/SEOHero";
import SEOContentSection from "@/components/seo/SEOContentSection";
import SEOCTA from "@/components/seo/SEOCTA";
import MethodAnimation from "@/components/seo/MethodAnimation";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import dados from "@/data/medicina-funcional-vs-convencional.json";

const ComparisonTable = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-almond/20 py-28 md:py-36 px-6">
      <div className="max-w-4xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          Lado a lado
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-10">
          As diferenças, ponto a ponto
        </h2>
        <div className="md:hidden space-y-8">
          {dados.rows.map((row, i) => (
            <div key={i} className="border-b border-border pb-8">
              <h3 className="font-serif text-xl font-normal text-foreground mb-4">{row[0]}</h3>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-matcha mb-1">{dados.tableHead[1]}</p>
              <p className="font-sans text-[15px] leading-relaxed text-foreground/85 mb-4">{row[1]}</p>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-matcha mb-1">{dados.tableHead[2]}</p>
              <p className="font-sans text-[15px] leading-relaxed text-foreground/85">{row[2]}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <table className="w-full border-collapse text-left font-sans text-[15px] leading-relaxed">
            <thead>
              <tr>
                {dados.tableHead.map((h, i) => (
                  <th key={i} scope="col" className="border-b border-border py-4 pr-6 font-normal text-[11px] tracking-[0.2em] uppercase text-matcha align-bottom">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.rows.map((row, i) => (
                <tr key={i} className="align-top">
                  <th scope="row" className="border-b border-border py-5 pr-6 font-serif text-lg font-normal text-foreground">
                    {row[0]}
                  </th>
                  <td className="border-b border-border py-5 pr-6 text-foreground/85">{row[1]}</td>
                  <td className="border-b border-border py-5 text-foreground/85">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          O método
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-14">
          {dados.howTitle}
        </h2>
        <MethodAnimation steps={dados.steps} />
      </div>
    </section>
  );
};

const FAQSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
          Perguntas frequentes
        </p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          Medicina funcional e convencional
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {dados.faq.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-sans font-normal text-foreground py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[15px] pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const MedicinaFuncionalVsConvencional = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dados.h1,
    description: dados.description,
    url: "https://www.catarinaveiga.com/medicina-funcional-vs-convencional",
    inLanguage: "pt",
    publisher: {
      "@type": "Organization",
      name: "Catarina Veiga",
      url: "https://www.catarinaveiga.com",
    },
  };

  return (
    <SEOPageLayout
      title={dados.title}
      description={dados.description}
      canonical="https://www.catarinaveiga.com/medicina-funcional-vs-convencional"
      structuredData={structuredData}
    >
      <SEOHero
        label="Medicina funcional integrativa"
        title={dados.h1}
        intro={dados.shortAnswer}
        breadcrumb={[
          { label: "Início", to: "/" },
          { label: "Medicina funcional", to: "/medicina-funcional" },
          { label: "Funcional vs convencional" },
        ]}
      />

      <ComparisonTable />

      <HowItWorks />

      <SEOContentSection label="Honestidade" title={dados.evidenceTitle}>
        {dados.evidence.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p>
          Para a explicação geral da abordagem, vê{" "}
          <Link to="/medicina-funcional" className="underline underline-offset-4">
            O que é a medicina funcional
          </Link>{" "}
          e{" "}
          <Link to="/metodo" className="underline underline-offset-4">
            o método
          </Link>
          .
        </p>
      </SEOContentSection>

      <SEOContentSection label="Segurança" title={dados.whenConventionalTitle} bg="almond">
        <p>{dados.whenConventional}</p>
      </SEOContentSection>

      <SEOContentSection label="Transparência" title={dados.framingTitle}>
        <p>{dados.framing}</p>
      </SEOContentSection>

      <FAQSection />

      <SEOCTA
        title="Por onde começar"
        subtitle="Se os teus sintomas persistem e as análises estão dentro do normal, a consulta inicial serve para organizar o que já tens e definir os próximos passos."
        buttonText="Marcar consulta inicial"
        buttonTo="/consulta-inicial"
        note=""
      />
    </SEOPageLayout>
  );
};

export default MedicinaFuncionalVsConvencional;
