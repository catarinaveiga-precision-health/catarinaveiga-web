import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";
import { Section } from "@/components/v2/ui/Section";
import { Container } from "@/components/v2/ui/Container";
import { Eyebrow } from "@/components/v2/ui/Eyebrow";
import { ButtonV2 } from "@/components/v2/ui/ButtonV2";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { StatsRow } from "@/components/v2/home/StatsRow";
import { ImageBand } from "@/components/v2/home/ImageBand";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { FinalCTA } from "@/components/v2/home/FinalCTA";
import { ComparacaoPares } from "@/components/v2/comparacao/ComparacaoPares";
import { JornadaMetodo } from "@/components/v2/comparacao/JornadaMetodo";
import { acuityUrl } from "@/lib/acuity";
import { cn } from "@/lib/utils";
import dados from "@/data/medicina-funcional-vs-convencional.json";

const Hero = () => (
  <Section bg="paper" tight className="pt-40 md:pt-48 lg:pt-52 pb-24 md:pb-32">
    <Container size="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <FadeUp className="lg:col-span-7">
          <Eyebrow>Medicina funcional integrativa</Eyebrow>
          <h1 className="mt-8 font-serif text-display-1 text-v2-ink leading-[1.05] tracking-[-0.02em]">
            Medicina funcional
            <br />
            <span className="italic text-v2-ink-mute">vs medicina convencional.</span>
          </h1>
          <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute max-w-[52ch] leading-[1.55]">
            {dados.shortAnswer}
          </p>
          <div className="mt-12 flex flex-col items-start gap-4">
            <ButtonV2 as="a" href={acuityUrl("funcional-vs-convencional")} size="lg">
              Marcar consulta
            </ButtonV2>
            <p className="font-sans text-body-sm-v2 text-v2-ink-mute">
              90 minutos, online. Resposta em 48 horas úteis. Não precisas de ter exames feitos.
            </p>
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <div className="relative flex items-end justify-center">
            <div
              aria-hidden
              className="absolute inset-x-0 top-6 bottom-0 [background:radial-gradient(75%_62%_at_50%_38%,rgba(113,130,129,0.18),transparent_75%)]"
            />
            <img
              src="/catarina-hero-recorte.webp"
              alt="Catarina Veiga"
              width={800}
              height={1200}
              className="relative w-full max-w-[420px] lg:max-w-[460px] h-auto [mask-image:linear-gradient(to_bottom,black_86%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,black_86%,transparent_99%)]"
              loading="eager"
              decoding="async"
            />
          </div>
        </FadeUp>
      </div>
    </Container>
  </Section>
);

const FAQComparacao = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section bg="paper-deep">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <FadeUp className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Antes de marcares</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                Perguntas frequentes.
              </h2>
            </div>
          </FadeUp>
          <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ul className="divide-y divide-v2-paper-line border-y border-v2-paper-line">
              {dados.faq.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left py-7 flex items-start justify-between gap-8 group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-body-lg-v2 text-v2-ink group-hover:text-v2-ink-mute transition-colors leading-[1.4]">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 mt-2 font-sans text-mono-v2 text-v2-sage transition-transform duration-300",
                          isOpen ? "rotate-45" : "",
                        )}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-8 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[64ch]">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
};

const MedicinaFuncionalVsConvencional = () => {
  const jsonLd = {
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
    <MotionConfig reducedMotion="user">
      <Helmet>
        <title>{dados.title}</title>
        <meta name="description" content={dados.description} />
        <link rel="canonical" href="https://www.catarinaveiga.com/medicina-funcional-vs-convencional" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
        <NavbarV2 />
        <main className="overflow-hidden">
          <Hero />
          <StatsRow />
          <ComparacaoPares head={dados.tableHead} pairs={dados.pairs} />
          <ImageBand />
          <JornadaMetodo title={dados.howTitle} steps={dados.steps} />
          <SocialProof />
          <FAQComparacao />
          <FinalCTA />
        </main>
        <FooterV2 />
        <StickyMobileCTA />
      </div>
    </MotionConfig>
  );
};

export default MedicinaFuncionalVsConvencional;
