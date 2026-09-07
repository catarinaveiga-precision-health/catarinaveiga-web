import { Helmet } from "react-helmet-async";

/* Página de links para a bio do Instagram (substitui um Linktree).
   Todo o tráfego chega em browser interno do IG, quase sempre mobile:
   layout de coluna única, botões grandes, UTM embutido em cada destino
   para o GA4 atribuir corretamente a origem instagram/bio. */

const UTM = "?utm_source=instagram&utm_medium=bio";

const LINKS = [
  {
    title: "Autoavaliação gratuita das tuas análises",
    desc: "17 biomarcadores lidos com intervalos funcionais, resultado imediato",
    href: `/avaliacao${UTM}`,
    primary: true,
  },
  {
    title: "TSH normal mas exausta? O artigo novo",
    desc: "Onde a conversão de T4 em T3 falha na perimenopausa",
    href: `/blog/conversao-t4-t3-tsh-normal-cansada${UTM}`,
  },
  {
    title: "Achas que tens insónia. Não tens.",
    desc: "Guia gratuito: reset circadiano de 4 semanas",
    href: `/guia-sono${UTM}`,
  },
  {
    title: "Fome constante? O guia da saciedade",
    desc: "Guia gratuito: porque tens fome 2 horas depois de comer",
    href: `/guia-saciedade${UTM}`,
  },
  {
    title: "Marcar consulta inicial",
    desc: "90 minutos, online, com plano escrito em 48h",
    href: `/consulta-inicial${UTM}`,
  },
];

const CONVERSAS = [
  {
    title: "O papel do ritmo circadiano na saúde",
    desc: "Conversa no podcast Osteotalks · 1h13",
    href: "https://www.youtube.com/watch?v=8O_Xs66lKF4",
  },
];

const Links = () => (
  <>
    <Helmet>
      <title>Links · Catarina Veiga</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <main
      className="min-h-screen px-5 py-12"
      style={{ background: "#FAF9F7", fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 420 }}>
        <div className="text-center">
          <img
            src="/catarina-hero-recorte.webp"
            alt="Catarina Veiga"
            className="mx-auto rounded-full object-cover"
            style={{ width: 96, height: 96, objectPosition: "top", border: "2px solid #16352C" }}
          />
          <h1
            className="mt-5"
            style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "#16352C", letterSpacing: "0.02em" }}
          >
            Catarina Veiga
          </h1>
          <p
            className="mt-1"
            style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#718281" }}
          >
            Medicina Funcional · Saúde da Mulher
          </p>
          <p className="mx-auto mt-4" style={{ fontSize: 15, lineHeight: 1.6, color: "#4a5350", maxWidth: 320 }}>
            Sintomas reais, análises "normais". É aqui que o meu trabalho começa.
          </p>
          <p className="mx-auto mt-3" style={{ fontSize: 13, lineHeight: 1.55, color: "#718281", maxWidth: 330 }}>
            Passei 4 anos a formar profissionais de saúde no departamento de microbioma de um laboratório clínico do Reino Unido. A mesma ciência que hoje aplico ao teu caso.
          </p>
        </div>

        <nav className="mt-9 flex flex-col gap-3.5">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block rounded-2xl px-5 py-4 text-left transition-transform duration-150 active:scale-[0.98]"
              style={
                l.primary
                  ? { background: "#16352C", color: "#FAF9F7", boxShadow: "0 6px 18px rgba(22,53,44,0.22)" }
                  : { background: "#FFFFFF", color: "#16352C", border: "1.5px solid #DFE5E2" }
              }
            >
              <span style={{ fontFamily: "Georgia, serif", fontSize: 17, display: "block", lineHeight: 1.3 }}>
                {l.title}
              </span>
              <span
                style={{
                  fontSize: 13,
                  display: "block",
                  marginTop: 4,
                  lineHeight: 1.45,
                  color: l.primary ? "rgba(250,249,247,0.75)" : "#718281",
                }}
              >
                {l.desc}
              </span>
            </a>
          ))}
        </nav>

        <p
          className="mt-10 mb-3 text-center"
          style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#718281" }}
        >
          Conversas
        </p>
        <nav className="flex flex-col gap-3.5">
          {CONVERSAS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="block rounded-2xl px-5 py-4 text-left transition-transform duration-150 active:scale-[0.98]"
              style={{ background: "#FFFFFF", color: "#16352C", border: "1.5px solid #DFE5E2" }}
            >
              <span style={{ fontFamily: "Georgia, serif", fontSize: 17, display: "block", lineHeight: 1.3 }}>
                {l.title}
              </span>
              <span style={{ fontSize: 13, display: "block", marginTop: 4, lineHeight: 1.45, color: "#718281" }}>
                {l.desc}
              </span>
            </a>
          ))}
        </nav>

        <p className="mt-9 text-center" style={{ fontSize: 12, color: "#9aa4a0" }}>
          <a href={`/${UTM}`} style={{ color: "#718281" }}>
            catarinaveiga.com
          </a>
        </p>
      </div>
    </main>
  </>
);

export default Links;
