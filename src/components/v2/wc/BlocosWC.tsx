import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { FadeUp } from "../motion/FadeUp";
import { acuityUrl } from "@/lib/acuity";
import consultaFoto from "@/assets/en-consult-desk.jpg";
import guiaCapa from "@/assets/guia-capa.jpg";
import guiaSonoCapa from "@/assets/guia-sono-capa.jpg";
import retrato from "@/assets/catarina-retrato-creme.jpg";

/* Blocos da página inicial no formato do drwillcole.com: cada bloco uma
   ideia, fotografia grande, um botão. Paleta da casa (sálvia, creme,
   dourado esbatido), sem cores novas. */

const ease = [0.22, 1, 0.36, 1] as const;

type BtnProps = { children: ReactNode; to?: string; href?: string; tone?: "beige" | "white" | "ink"; external?: boolean };

export const WCButton = ({ children, to, href, tone = "beige", external }: BtnProps) => {
  const cls = [
    "inline-flex items-center justify-center px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] transition-colors duration-300",
    tone === "beige" && "[background-color:color-mix(in_srgb,var(--v2-golden)_32%,var(--v2-paper))] text-v2-ink hover:[background-color:color-mix(in_srgb,var(--v2-golden)_50%,var(--v2-paper))]",
    tone === "white" && "rounded-full bg-v2-paper text-v2-ink hover:bg-white",
    tone === "ink" && "rounded-full bg-v2-ink text-v2-paper hover:[background-color:color-mix(in_srgb,var(--v2-ink)_85%,transparent)]",
  ]
    .filter(Boolean)
    .join(" ");
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
};

/* Banda do guia gratuito, o lugar do livro na página dele */
export const BandaGuia = () => (
  <section className="bg-v2-moss text-v2-paper overflow-hidden">
    <Container size="default" className="py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <FadeUp className="md:col-span-7">
          <p className="font-sans text-[12px] uppercase tracking-[0.22em] [color:color-mix(in_srgb,var(--v2-paper)_70%,transparent)]">Guia gratuito</p>
          <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] tracking-[-0.01em]">
            Achas que tens insónia.
            <span className="block italic [color:color-mix(in_srgb,var(--v2-paper)_80%,transparent)]">Não tens.</span>
          </h2>
          <div className="mt-9">
            <WCButton to="/guia-sono" tone="white">Receber o guia</WCButton>
          </div>
        </FadeUp>
        <motion.div
          className="md:col-span-5 flex justify-center"
          initial={{ opacity: 0, rotate: 8, y: 40 }}
          whileInView={{ opacity: 1, rotate: -4, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
        >
          <img
            src={guiaSonoCapa}
            alt="Capa do guia gratuito sobre sono"
            loading="lazy"
            decoding="async"
            className="w-[220px] md:w-[260px] rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
          />
        </motion.div>
      </div>
    </Container>
  </section>
);

/* Bloco dividido: fotografia à esquerda, painel sálvia à direita */
export const BlocoConsulta = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 bg-v2-sage overflow-hidden">
    <div className="relative h-[320px] md:h-auto md:min-h-[560px] overflow-hidden">
      <motion.img
        src={consultaFoto}
        alt="Secretária com análises, apontamentos e um portátil"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
    </div>
    <FadeUp className="flex flex-col items-center justify-center text-center px-8 py-16 md:px-14">
      <h2 className="font-serif text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.1] text-v2-paper max-w-[16ch]">
        Medicina funcional integrativa, onde quer que estejas.
      </h2>
      <span aria-hidden className="mt-8 block h-px w-40 [background-color:color-mix(in_srgb,var(--v2-paper)_50%,transparent)]" />
      <p className="mt-8 font-sans text-[15px] md:text-[17px] uppercase tracking-[0.08em] leading-[1.6] text-v2-paper max-w-[40ch]">
        Consultas online, em Portugal e no estrangeiro. 90 minutos para a tua história toda e um plano à tua medida.
      </p>
      <div className="mt-10">
        <WCButton to="/consulta-inicial" tone="white">Como funciona</WCButton>
      </div>
    </FadeUp>
  </section>
);

const marcadores = ["TSH", "Ferritina", "Vitamina D", "B12", "Insulina", "PCR"];

/* Duas ofertas lado a lado, como o "Supplement Collection" e o "The Shop" */
export const DuasOfertas = () => (
  <section className="grid grid-cols-1 md:grid-cols-2">
    <FadeUp className="bg-v2-paper flex flex-col items-center text-center px-8 py-16 md:py-24">
      <p className="font-sans text-[12px] uppercase tracking-[0.22em] text-v2-sage">2 minutos · sem custo</p>
      <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-[360px]">
        {marcadores.map((m, i) => (
          <motion.span
            key={m}
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
            className="rounded-full border [border-color:color-mix(in_srgb,var(--v2-sage)_40%,transparent)] bg-v2-paper-deep px-4 py-2 font-sans text-[14px] text-v2-ink"
          >
            {m}
          </motion.span>
        ))}
      </div>
      <h2 className="mt-10 font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.12] text-v2-ink">Autoavaliação gratuita</h2>
      <p className="mt-5 font-sans text-[16px] leading-[1.65] text-v2-ink-mute max-w-[40ch]">
        Mais de 15 biomarcadores numa autoavaliação educativa, com a interpretação no ecrã. Ficas a saber que padrões investigar.
      </p>
      <div className="mt-9">
        <WCButton to="/avaliacao">Fazer a autoavaliação</WCButton>
      </div>
    </FadeUp>

    <FadeUp delay={0.1} className="flex flex-col items-center text-center px-8 py-16 md:py-24 [background:linear-gradient(120deg,hsl(var(--almond)/0.55),hsl(var(--almond)/0.15))]">
      <p className="font-sans text-[12px] uppercase tracking-[0.22em] text-v2-sage">Para começares já</p>
      <div className="relative mt-10 h-[200px] w-[260px]">
        <motion.img
          src={guiaCapa}
          alt="Capa do guia sobre fome pouco depois de comer"
          loading="lazy"
          decoding="async"
          className="absolute left-0 top-2 w-[150px] rounded-md shadow-[0_20px_40px_-18px_rgba(22,53,44,0.5)]"
          initial={{ rotate: 0, x: 40 }}
          whileInView={{ rotate: -7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        />
        <motion.img
          src={guiaSonoCapa}
          alt="Capa do guia sobre sono"
          loading="lazy"
          decoding="async"
          className="absolute right-0 top-0 w-[150px] rounded-md shadow-[0_20px_40px_-18px_rgba(22,53,44,0.5)]"
          initial={{ rotate: 0, x: -40 }}
          whileInView={{ rotate: 6, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
        />
      </div>
      <h2 className="mt-10 font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.12] text-v2-ink">Guias gratuitos</h2>
      <p className="mt-5 font-sans text-[16px] leading-[1.65] text-v2-ink-mute max-w-[40ch]">
        Fome pouco depois de comer, sono que não descansa. Dois guias práticos, escritos para o dia a dia.
      </p>
      <div className="mt-9">
        <WCButton to="/recursos" tone="white">Ver os guias</WCButton>
      </div>
    </FadeUp>
  </section>
);

const VIDEO_ID = "8O_Xs66lKF4";

/* Cartão do vídeo, no lugar do cartão do podcast */
export const CartaoVideo = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="bg-v2-paper-deep px-4 py-14 md:py-20">
      <FadeUp className="mx-auto max-w-[1180px] rounded-sm border [border-color:color-mix(in_srgb,var(--v2-golden)_40%,transparent)] bg-v2-paper px-6 py-10 md:px-14 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-video overflow-hidden rounded-md bg-v2-ink">
              {playing ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
                  title="O papel do ritmo circadiano na saúde · osteotalks com Catarina Veiga"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label="Ver a conversa">
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full [background-color:color-mix(in_srgb,var(--v2-paper)_90%,transparent)] text-v2-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                      ▶
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.12] text-v2-ink">Ouve-me antes de marcares</h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.65] text-v2-ink-mute max-w-[48ch]">
              Uma conversa sobre ritmo circadiano e sono, em português. É a forma mais rápida de saberes se a minha maneira de explicar te serve.
            </p>
            <div className="mt-8">
              <WCButton href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} tone="ink" external>Ver a conversa</WCButton>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
};

const artigos = [
  { slug: "acordar-as-4-da-manha-perimenopausa", t: "Acordar às 4 da manhã na perimenopausa: porquê", img: "8895c2e36ee322c18007621c4482b3d0ca4f6d71-1478x1086.png" },
  { slug: "conversao-t4-t3-tsh-normal-cansada", t: "Conversão T4 em T3: porque estás cansada com TSH normal", img: "e45c5d93b2ae8a6bfba16671f39f97cd4f08d16d-1598x1136.png" },
  { slug: "ferritina-baixa", t: "Ferritina baixa em mulheres: quando \"normal\" não chega", img: "6d3996bbdb659c365674f4255f12888a3e64cfba-2320x1416.png" },
  { slug: "jejum-intermitente-perimenopausa", t: "Jejum intermitente na perimenopausa: o que ninguém te explica sobre as hormonas", img: "80ce4f77536fa9f27fcaa2e98ca8f1966b7adeee-2316x1512.png" },
  { slug: "progesterona-baixa-sintomas-fase-lutea", t: "Irritável, ansiosa e sem dormir antes do período. Pode ser a progesterona", img: "5607ae3c74633f3633958a516a75e129c4357171-2234x1236.png" },
  { slug: "nervo-vago-como-ativar-mulher", t: "O nervo vago não é uma tendência. É o motivo pelo qual não consegues descansar", img: "91039f626d2ed4702de7b2f42c78893209d93e58-2240x1244.png" },
];

/* Grelha de artigos com fotografia, título em serif e botão bege */
export const GrelhaArtigos = () => (
  <section className="bg-v2-paper py-20 md:py-28">
    <Container size="default">
      <FadeUp className="text-center">
        <p className="font-sans text-[12px] uppercase tracking-[0.22em] text-v2-sage">Artigos</p>
        <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-v2-ink">Para leres com calma</h2>
      </FadeUp>
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {artigos.map((a, i) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: (i % 3) * 0.12 }}
          >
            <Link to={`/blog/${a.slug}`} className="group relative block h-[300px] overflow-hidden rounded-sm">
              <img
                src={`https://cdn.sanity.io/images/3zvde3ro/production/${a.img}?w=800&auto=format`}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span aria-hidden className="absolute inset-0 [background-color:color-mix(in_srgb,var(--v2-ink)_55%,transparent)] transition-colors duration-500 group-hover:[background-color:color-mix(in_srgb,var(--v2-ink)_45%,transparent)]" />
              <span className="relative flex h-full flex-col items-center justify-center gap-6 px-7 text-center">
                <span className="font-serif text-[22px] md:text-[24px] leading-[1.2] text-v2-paper">{a.t}</span>
                <span className="[background-color:color-mix(in_srgb,var(--v2-golden)_75%,var(--v2-paper))] px-6 py-3 font-sans text-[12px] uppercase tracking-[0.18em] text-v2-ink transition-colors group-hover:bg-v2-golden">
                  Ler mais
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <WCButton to="/blog">Ver todos os artigos</WCButton>
      </div>
    </Container>
  </section>
);

const credenciais = [
  "21 anos de prática clínica em saúde da mulher",
  "Functional Medicine Practitioner, acreditada pela Regenerus Labs e pela Nordic Labs, no Reino Unido",
  "Equipa fundadora da Omnos, hoje parte da Regenerus Labs",
  "Oradora no Longevity Med Summit 2024",
];

/* "Sobre", como o bloco final da página dele */
export const SobreWC = () => (
  <section className="bg-v2-paper-deep py-20 md:py-28">
    <Container size="default">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-sm max-w-[420px] shadow-[0_24px_50px_-24px_rgba(22,53,44,0.4)]">
            <img src={retrato} alt="Catarina Veiga" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          </div>
        </motion.div>
        <FadeUp className="md:col-span-7" delay={0.1}>
          <h2 className="font-serif text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05] text-v2-ink">Catarina Veiga</h2>
          <p className="mt-4 font-sans text-[13px] uppercase tracking-[0.2em] text-v2-sage">Especialista em medicina funcional integrativa</p>
          <ul className="mt-10 space-y-5">
            {credenciais.map((c) => (
              <li key={c} className="relative pl-8 font-sans text-[17px] leading-[1.55] text-v2-ink">
                <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-4 bg-v2-sage" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <WCButton to="/sobre">Conhecer a Catarina</WCButton>
            <WCButton href={acuityUrl("sobre-wc")}>Marcar consulta</WCButton>
          </div>
        </FadeUp>
      </div>
    </Container>
  </section>
);
