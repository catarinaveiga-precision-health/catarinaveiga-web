import { Helmet } from "react-helmet-async";
import blogTiroide from "@/assets/blog-tiroide.jpg";
import catarinaAbout from "@/assets/catarina-about.jpeg";

const capaGuia = "/guia/mockup-capa.jpg";

/* Página de links para a bio do Instagram (substitui um Linktree).
   Referência visual aprovada (06/09): estilo Linktree premium, botões
   pílula com miniatura circular à esquerda, foto grande, credenciais
   sob o nome. Tráfego chega do browser interno do IG, quase sempre
   mobile. UTM embutido em cada destino para atribuição instagram/bio. */

const UTM = "?utm_source=instagram&utm_medium=bio";

const LINKS: { title: string; href: string; img?: string; primary?: boolean }[] = [
  {
    title: "Autoavaliação gratuita das tuas análises",
    href: `/avaliacao${UTM}`,
    primary: true,
  },
  {
    title: "TSH normal mas exausta? O artigo",
    href: `/blog/conversao-t4-t3-tsh-normal-cansada${UTM}`,
    img: blogTiroide,
  },
  {
    title: "Guia do sono · Achas que tens insónia",
    href: `/guia-sono${UTM}`,
    img: "/catarina-hero-mobile.jpg",
  },
  {
    title: "Guia da saciedade · Fome constante",
    href: `/guia-saciedade${UTM}`,
    img: capaGuia,
  },
  {
    title: "Marcar consulta inicial",
    href: `/consulta-inicial${UTM}`,
    img: "/catarina-hero-recorte.webp",
  },
  {
    title: "Podcast · O ritmo circadiano na saúde",
    href: "https://www.youtube.com/watch?v=8O_Xs66lKF4",
    img: catarinaAbout,
  },
];

const Links = () => (
  <>
    <Helmet>
      <title>Links · Catarina Veiga</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <main
      className="min-h-screen px-5 pb-16 pt-14"
      style={{
        background: "linear-gradient(175deg, #EFF1EF 0%, #FAF9F7 34%, #F3EFE8 100%)",
        fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 460 }}>
        <div className="text-center">
          <img
            src="/catarina-hero-recorte.webp"
            alt="Catarina Veiga"
            className="mx-auto rounded-full object-cover"
            style={{
              width: 148,
              height: 148,
              objectPosition: "top",
              border: "3px solid #FFFFFF",
              boxShadow: "0 10px 30px rgba(22,53,44,0.18)",
            }}
          />
          <h1
            className="mt-6"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 34,
              fontWeight: 400,
              color: "#16352C",
              letterSpacing: "0.01em",
              lineHeight: 1.15,
            }}
          >
            Catarina Veiga
          </h1>
          <div
            className="mx-auto mt-4"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 18.5,
              lineHeight: 1.5,
              color: "#2e4038",
              maxWidth: 380,
            }}
          >
            <p>Medicina Funcional Integrativa.</p>
            <p>Microbioma e bioquímica clínica</p>
            <p>aplicados à saúde da mulher.</p>
            <p style={{ marginTop: 10, fontSize: 16, color: "#5c6a64" }}>
              20+ anos de prática clínica · 4 anos no
            </p>
            <p style={{ fontSize: 16, color: "#5c6a64" }}>laboratório Omnos, Londres</p>
          </div>
        </div>

        <nav className="mt-10 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
              className="relative flex items-center transition-transform duration-150 active:scale-[0.985]"
              style={{
                background: l.primary ? "#16352C" : "#FFFFFF",
                color: l.primary ? "#FAF9F7" : "#33443d",
                borderRadius: 999,
                minHeight: 76,
                padding: "12px 56px 12px 14px",
                boxShadow: l.primary
                  ? "0 10px 26px rgba(22,53,44,0.30)"
                  : "0 6px 20px rgba(22,53,44,0.10)",
              }}
            >
              {l.img ? (
                <img
                  src={l.img}
                  alt=""
                  className="rounded-full object-cover"
                  style={{ width: 52, height: 52, objectPosition: "top", flexShrink: 0 }}
                />
              ) : (
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    background: "rgba(250,249,247,0.14)",
                    border: "1.5px solid rgba(250,249,247,0.45)",
                    fontFamily: "Georgia, serif",
                    fontSize: 22,
                  }}
                >
                  ✓
                </span>
              )}
              <span
                className="flex-1 text-center"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 17.5,
                  lineHeight: 1.3,
                  padding: "0 4px 0 8px",
                }}
              >
                {l.title}
              </span>
            </a>
          ))}
        </nav>

        <p className="mt-10 text-center" style={{ fontSize: 13 }}>
          <a href={`/${UTM}`} style={{ color: "#718281", textDecoration: "none", letterSpacing: "0.06em" }}>
            catarinaveiga.com
          </a>
        </p>
      </div>
    </main>
  </>
);

export default Links;
