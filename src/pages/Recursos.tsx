import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import AcuityModal from "@/components/AcuityModal";
import { useAcuityModal } from "@/hooks/useAcuityModal";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import catarinaPhoto from "@/assets/catarina-about.jpeg";

import editorialFeatured from "@/assets/editorial-featured.jpg";
import editorialThyroid from "@/assets/editorial-thyroid.jpg";
import editorialVitaminD from "@/assets/editorial-vitamind.jpg";
import editorialInsulin from "@/assets/editorial-insulin.jpg";
import editorialFatigue from "@/assets/editorial-fatigue.jpg";
import editorialFunctional from "@/assets/editorial-functional.jpg";

const featured = {
  title: "Ferritina Baixa: sintomas que os teus exames podem não mostrar",
  subtitle:
    "A diferença entre valores laboratoriais e funcionais — e porque podes ter sintomas mesmo com resultados 'normais'.",
  href: "/ferritina-baixa-sintomas",
  image: editorialFeatured,
};

const coreArticles = [
  {
    title: "TSH Normal Mas Com Sintomas",
    description:
      "O intervalo laboratorial aceita TSH até 4.5. A medicina funcional começa a investigar a partir de 2.0.",
    href: "/tsh-normal-mas-com-sintomas",
    image: editorialThyroid,
    related: ["/ferritina-baixa-sintomas", "/fadiga-exames-normais"],
  },
  {
    title: "Vitamina D: o intervalo normal pode não ser suficiente",
    description:
      "Percebe porque o valor 'normal' pode ainda assim ser insuficiente para a tua saúde e energia.",
    href: "/vitamina-d-valores-funcionais",
    image: editorialVitaminD,
    related: ["/fadiga-exames-normais"],
  },
  {
    title: "Insulina em Jejum: o marcador que aparece antes da diabetes",
    description:
      "Glicose normal com insulina elevada — o que significa e porque importa investigar cedo.",
    href: "/insulina-jejum-o-que-significa",
    image: editorialInsulin,
    related: ["/vitamina-d-valores-funcionais"],
  },
];

const secondaryArticles = [
  {
    title: "Fadiga Com Exames Normais",
    description:
      "O que a medicina funcional investiga quando os exames convencionais parecem normais.",
    href: "/fadiga-exames-normais",
    image: editorialFatigue,
  },
  {
    title: "O Que É a Medicina Funcional Integrativa",
    description:
      "Como a medicina de causa-raiz investiga os sintomas de forma diferente.",
    href: "/medicina-funcional",
    image: editorialFunctional,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Recursos — Compreender as Tuas Análises e Sintomas",
      description:
        "Artigos educativos sobre biomarcadores, análises laboratoriais e conceitos de medicina funcional.",
      url: "https://catarinaveiga.lovable.app/recursos",
      publisher: {
        "@type": "Organization",
        name: "Catarina Veiga — Medicina Funcional",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          featured,
          ...coreArticles,
          ...secondaryArticles,
        ].map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://catarinaveiga.lovable.app${a.href}`,
          name: a.title,
        })),
      },
    },
    {
      "@type": "Person",
      name: "Catarina Veiga",
      jobTitle: "Practitioner de Medicina Funcional",
      url: "https://catarinaveiga.lovable.app/sobre",
      sameAs: [],
    },
    ...[featured, ...coreArticles, ...secondaryArticles].map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: `https://catarinaveiga.lovable.app${a.href}`,
      author: {
        "@type": "Person",
        name: "Catarina Veiga",
      },
      publisher: {
        "@type": "Organization",
        name: "Catarina Veiga — Medicina Funcional",
      },
      datePublished: "2025-01-15",
      medicalSpecialty: "Functional Medicine",
    })),
  ],
};

const Recursos = () => {
  const { open, onClose } = useAcuityModal();
  const heroRef = useFadeUp();
  const featuredRef = useFadeUp();
  const coreRef = useFadeUp();
  const secondaryRef = useFadeUp();
  const authorRef = useFadeUp();
  const ctaRef = useFadeUp();

  return (
    <>
      <Helmet>
        <title>
          Compreender as Tuas Análises e Sintomas | Catarina Veiga — Medicina
          Funcional
        </title>
        <meta
          name="description"
          content="Artigos educativos sobre biomarcadores como ferritina, TSH, insulina e vitamina D. Descobre porque podes ter sintomas mesmo com análises normais. Biblioteca curada de medicina funcional."
        />
        <link
          rel="canonical"
          href="https://catarinaveiga.lovable.app/recursos"
        />
        <meta
          property="og:title"
          content="Compreender as Tuas Análises e Sintomas | Catarina Veiga"
        />
        <meta
          property="og:description"
          content="Artigos educativos sobre biomarcadores, análises laboratoriais e conceitos de medicina funcional."
        />
        <meta
          property="og:url"
          content="https://catarinaveiga.lovable.app/recursos"
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <NavbarV2 />

      <main>
        {/* ─── 1. SEO Header ─── */}
        <section
          ref={heroRef}
          className="fade-up pt-40 pb-24 md:pb-32 px-6"
          style={{ backgroundColor: "#F7F4EF" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="font-sans text-[11px] tracking-[0.18em] uppercase mb-6"
              style={{ color: "#9B7B5A" }}
            >
              Biblioteca de Medicina Funcional
            </p>
            <h1
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]"
              style={{ color: "#1A1A1A" }}
            >
              Compreender as Tuas Análises e Sintomas
            </h1>
            <p
              className="mt-8 font-sans text-[15px] md:text-[17px] leading-[1.8] max-w-2xl mx-auto"
              style={{ color: "#6B6560" }}
            >
              Muitas pessoas vivem com fadiga, queda de cabelo, alterações de
              humor ou dificuldade em perder peso — mesmo quando os exames de
              sangue aparecem "normais". Isto acontece porque os intervalos de
              referência laboratoriais nem sempre refletem o funcionamento ótimo
              do organismo. A medicina funcional investiga mecanismos mais
              profundos: analisa biomarcadores como ferritina, TSH, insulina em
              jejum e vitamina D através de intervalos funcionais mais
              restritivos, procurando as causas-raiz dos sintomas em vez de
              apenas excluir doença. Nesta biblioteca encontras artigos
              educativos que explicam os marcadores laboratoriais mais
              relevantes, o que significam para a tua saúde e como interpretar os
              teus resultados de forma funcional.
            </p>
          </div>
        </section>

        {/* ─── 2. Featured Article ─── */}
        <section
          ref={featuredRef}
          className="fade-up px-6 pb-28"
          style={{ backgroundColor: "#F7F4EF" }}
        >
          <div className="max-w-6xl mx-auto">
            <Link to={featured.href} className="group block">
              <div className="relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-[360px] md:h-[560px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <p
                    className="font-sans text-[11px] tracking-[0.18em] uppercase mb-4"
                    style={{ color: "hsl(33, 39%, 64%)" }}
                  >
                    Artigo em Destaque
                  </p>
                  <h2 className="font-serif text-2xl md:text-[2.75rem] font-light leading-[1.15] text-white max-w-2xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 font-sans text-[14px] md:text-[15px] text-white/70 max-w-lg leading-relaxed hidden md:block">
                    {featured.subtitle}
                  </p>
                  <span className="inline-block mt-6 font-sans text-[11px] tracking-[0.12em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                    Ler artigo completo →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-6xl mx-auto px-6" style={{ backgroundColor: "#F7F4EF" }}>
          <div className="h-px" style={{ backgroundColor: "#E8E2D9" }} />
        </div>

        {/* ─── 3. Core Articles (3 columns) ─── */}
        <section
          ref={coreRef}
          className="fade-up px-6 py-28"
          style={{ backgroundColor: "#F7F4EF" }}
        >
          <div className="max-w-6xl mx-auto">
            <p
              className="font-sans text-[11px] tracking-[0.18em] uppercase mb-14"
              style={{ color: "#9B7B5A" }}
            >
              Biomarcadores Essenciais
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
              {coreArticles.map((article) => (
                <Link
                  key={article.href}
                  to={article.href}
                  className="group block"
                >
                  <div className="overflow-hidden mb-6">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-[240px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <h2
                    className="font-serif text-xl md:text-[22px] font-light leading-snug mb-3"
                    style={{ color: "#1A1A1A" }}
                  >
                    <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-[length:100%_1px]">
                      {article.title}
                    </span>
                  </h2>
                  <p
                    className="font-sans text-[13px] leading-[1.7] mb-4"
                    style={{ color: "#6B6560" }}
                  >
                    {article.description}
                  </p>
                  <span
                    className="font-sans text-[11px] tracking-[0.12em] uppercase transition-colors group-hover:opacity-80"
                    style={{ color: "#9B7B5A" }}
                  >
                    Ler artigo completo →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-6xl mx-auto px-6" style={{ backgroundColor: "#F7F4EF" }}>
          <div className="h-px" style={{ backgroundColor: "#E8E2D9" }} />
        </div>

        {/* ─── 4. Secondary Resources (2 columns) ─── */}
        <section
          ref={secondaryRef}
          className="fade-up px-6 py-28"
          style={{ backgroundColor: "#F7F4EF" }}
        >
          <div className="max-w-6xl mx-auto">
            <p
              className="font-sans text-[11px] tracking-[0.18em] uppercase mb-14"
              style={{ color: "#9B7B5A" }}
            >
              Mais Recursos
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
              {secondaryArticles.map((article) => (
                <Link
                  key={article.href}
                  to={article.href}
                  className="group block"
                >
                  <div className="overflow-hidden mb-5">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-[220px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <h2
                    className="font-serif text-xl md:text-2xl font-light leading-snug mb-3"
                    style={{ color: "#1A1A1A" }}
                  >
                    <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-[length:100%_1px]">
                      {article.title}
                    </span>
                  </h2>
                  <p
                    className="font-sans text-[13px] leading-[1.7] mb-4"
                    style={{ color: "#6B6560" }}
                  >
                    {article.description}
                  </p>
                  <span
                    className="font-sans text-[11px] tracking-[0.12em] uppercase transition-colors group-hover:opacity-80"
                    style={{ color: "#9B7B5A" }}
                  >
                    Ler artigo completo →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-6xl mx-auto px-6" style={{ backgroundColor: "#F7F4EF" }}>
          <div className="h-px" style={{ backgroundColor: "#E8E2D9" }} />
        </div>

        {/* ─── 5. About the Author (E-E-A-T) ─── */}
        <section
          ref={authorRef}
          className="fade-up px-6 py-28"
          style={{ backgroundColor: "#F7F4EF" }}
        >
          <div className="max-w-4xl mx-auto">
            <p
              className="font-sans text-[11px] tracking-[0.18em] uppercase mb-10"
              style={{ color: "#9B7B5A" }}
            >
              Sobre a Autora
            </p>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <img
                src={catarinaPhoto}
                alt="Catarina Veiga — Medicina Funcional"
                className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full flex-shrink-0"
                loading="lazy"
              />
              <div>
                <h2
                  className="font-serif text-2xl md:text-3xl font-light mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  Catarina Veiga
                </h2>
                <p
                  className="font-sans text-[13px] uppercase tracking-[0.1em] mb-5"
                  style={{ color: "#9B7B5A" }}
                >
                  Medicina Funcional Integrativa
                </p>
                <p
                  className="font-sans text-[15px] leading-[1.8] max-w-xl mb-6"
                  style={{ color: "#6B6560" }}
                >
                  Catarina Veiga é practitioner de medicina funcional
                  especializada na investigação das causas-raiz de sintomas
                  persistentes, através da interpretação avançada de análises
                  laboratoriais e estratégias de saúde personalizadas. Foca-se em
                  biomarcadores como ferritina, TSH, insulina e vitamina D,
                  utilizando intervalos funcionais para identificar padrões que
                  os exames convencionais frequentemente não revelam.
                </p>
                <Link
                  to="/sobre"
                  className="font-sans text-[12px] tracking-[0.1em] uppercase transition-colors hover:opacity-70"
                  style={{ color: "#9B7B5A" }}
                >
                  Saber mais sobre Catarina →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. CTA ─── */}
        <section
          ref={ctaRef}
          className="fade-up px-6 py-28 md:py-36"
          style={{ backgroundColor: "#1A3636" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-[2.5rem] font-light text-white leading-snug mb-6">
              Precisas de ajuda a interpretar as tuas análises?
            </h2>
            <p className="font-sans text-[15px] text-white/50 leading-[1.8] mb-12 max-w-2xl mx-auto">
              Os resultados laboratoriais podem parecer normais enquanto os
              sintomas persistem. A avaliação funcional analisa 14 biomarcadores
              através de intervalos funcionais — não apenas os intervalos de
              referência convencionais.
            </p>
            <Link
              to="/avaliacao"
              className="inline-block bg-white text-[#1A3636] font-sans text-[13px] font-medium tracking-[0.06em] px-10 py-4 hover:bg-white/90 transition-colors"
            >
              Interpretar as minhas análises
            </Link>
            <p className="font-sans text-white/25 text-[11px] mt-6">
              Gratuita · 14 biomarcadores · leitura imediata
            </p>
            <p className="font-sans text-white/15 text-[11px] mt-10 max-w-xl mx-auto leading-relaxed">
              Esta página tem fins educativos e não constitui diagnóstico médico.
            </p>
          </div>
        </section>
      </main>

      <LegalBand />
      <FooterV2 />
      <MobileCTA />
      <AcuityModal open={open} onClose={onClose} />
    </>
  );
};

export default Recursos;
