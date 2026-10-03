import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";
import { Container } from "@/components/v2/ui/Container";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { WCButton } from "@/components/v2/wc/BlocosWC";
import { acuityUrl } from "@/lib/acuity";
import { cn } from "@/lib/utils";
import retratoCamisa from "@/assets/catarina-retrato-camisa.jpg";
import retratoCreme from "@/assets/catarina-retrato-creme.jpg";
import retratoVerde from "@/assets/catarina-retrato-verde.jpg";
import consultaFoto from "@/assets/en-consult-desk.jpg";

/*
  Nova página Sobre (03/10), sobre a Catarina e não sobre a paciente.
  Estrutura: título, problema, como trabalho, porquê, linha do tempo,
  números, formação, fora do consultório, testemunhos, perguntas, CTA.
  Texto aprovado no rascunho docs/apps/rascunho-pagina-sobre.md.
  Em pré-visualização em /sobre-nova (noindex) até ela aprovar.
*/

const ease = [0.22, 1, 0.36, 1] as const;

/* Grão de papel, fixo e sem eventos, por cima de tudo */
const GRAO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

/* Texto que falta, visível na pré-visualização para a Catarina preencher */
const Falta = ({ children }: { children: string }) => (
  <span className="inline rounded-sm px-1.5 py-0.5 font-sans text-[0.85em] italic [background-color:color-mix(in_srgb,var(--v2-golden)_45%,transparent)]">
    [falta: {children}]
  </span>
);

/* Etiqueta em pílula antes dos títulos */
const Pill = ({ children, light }: { children: string; light?: boolean }) => (
  <span
    className={cn(
      "inline-block rounded-full px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em]",
      light
        ? "[background-color:color-mix(in_srgb,var(--v2-paper)_14%,transparent)] [color:color-mix(in_srgb,var(--v2-paper)_85%,transparent)]"
        : "[background-color:color-mix(in_srgb,var(--v2-sage)_12%,transparent)] text-v2-sage",
    )}
  >
    {children}
  </span>
);

/* Moldura dupla para fotografia: tabuleiro exterior e imagem interior */
const Moldura = ({ src, alt, rotate = 0, falta }: { src?: string; alt?: string; rotate?: number; falta?: string }) => {
  const md = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  return (
  <motion.div
    className="w-full max-w-[380px]"
    initial={{ opacity: 0, y: 50, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: md ? rotate : 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease }}
  >
    <div className="rounded-[1.25rem] p-2 ring-1 [--tw-ring-color:color-mix(in_srgb,var(--v2-sage)_18%,transparent)] [background-color:color-mix(in_srgb,var(--v2-golden)_30%,var(--v2-paper))] shadow-[0_30px_60px_-30px_rgba(22,53,44,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.25rem-0.5rem)] bg-v2-paper-deep">
        {src ? (
          <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center [background:radial-gradient(90%_80%_at_50%_35%,color-mix(in_srgb,var(--v2-sage)_34%,transparent),color-mix(in_srgb,var(--v2-sage)_10%,transparent))]">
            <span aria-hidden className="font-serif text-[40px] leading-none text-v2-sage">◇</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-v2-sage">Fotografia</span>
            <span className="font-serif italic text-[19px] leading-[1.3] text-v2-ink-mute">{falta}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
  );
};

const comoTrabalho = [
  "Uma primeira consulta de 90 minutos sobre a tua história toda, preparada com um questionário de mais de 100 perguntas.",
  "As tuas análises lidas em conjunto, biomarcador a biomarcador, e cruzadas com o que sentes.",
  "Exames complementares quando fazem falta: microbioma, ácidos orgânicos, teste DUTCH.",
  "Um plano à tua medida (alimentação, suplementos, exercício, regulação do sistema nervoso). Não te peço o impossível, mas mexe sempre a agulha.",
  "Cinco anos do lado do laboratório, numa plataforma britânica de testes, a acompanhar centenas de pessoas com testes de microbioma.",
];

const capitulos: { quando: string; titulo: string; texto: string; foto: string }[] = [
  {
    foto: "licenciatura, ESMTC",
    quando: "2000 a 2005",
    titulo: "A formação",
    texto:
      "Licenciatura de cinco anos em Medicina Tradicional Chinesa pela Nanjing University of Chinese Medicine, em parceria com a ESMTC, em Lisboa. Nota final de 18 valores e quadro de honra.",
  },
  {
    quando: "2005 a 2008",
    foto: "no consultório, 2005 a 2008",
    titulo: "Corpo e mente",
    texto:
      "Comecei a trabalhar num consultório de psiquiatria e psicologia e percebi muito cedo como o corpo e a mente estão ligados. Anos mais tarde, entrei no mestrado em Psicologia da Faculdade de Psicologia da Universidade de Lisboa.",
  },
  {
    quando: "O ponto de viragem",
    foto: "a estudar, com análises",
    titulo: "A linguagem das células",
    texto:
      "Depois do menisco, apaixonei-me pela bioquímica sanguínea. Fiz as pós-graduações em Bioquímica Sanguínea e em Nutrição Funcional na Faculdade de Saúde Avançada e a formação em Modulação Intestinal e Microbioma com o Prof. Murilo Pereira.",
  },
  {
    quando: "2020 a 2025",
    foto: "na Omnos ou num seminário",
    titulo: "Do lado do laboratório",
    texto:
      "Na Omnos, plataforma britânica de testes laboratoriais (hoje Regenerus Labs), vivi a fase de que mais gosto numa startup: a criação. Fui consultora científica, depois Resident Microbiome Expert, com a palavra final sobre tudo o que dizia respeito ao microbioma. Escolhi e validei o teste GI360, criei e liderei a Omnos Academy, coordenei uma equipa de quatro pessoas e apresentei cerca de 20 seminários, com convidadas como a Davinia Taylor.",
  },
  {
    quando: "2022 e 2024",
    foto: "no Longevity Med Summit",
    titulo: "Reconhecimento",
    texto:
      "Artigo na IHCAN Magazine (Reino Unido) sobre combinar testes hormonais e de microbioma. Oradora no Longevity Med Summit, sobre condições relacionadas com os estrogénios e a microbiota intestinal.",
  },
  {
    quando: "Por volta dos 40",
    foto: "pessoal, opcional",
    titulo: "Quando deixei de me reconhecer",
    texto:
      "Comecei a ter sinais que me faziam sentir que não era eu. Achei que era passageiro. Não era. Fui à procura de respostas e fui diagnosticada com TDAH, que se intensificou muito com a entrada na perimenopausa.",
  },
  {
    quando: "Hoje",
    foto: "em consulta online",
    titulo: "A minha clínica",
    texto:
      "Saí do mundo corporativo e abri a minha prática, online, com pessoas de todo o mundo. Continuo a colaborar com algumas instituições, mas quis criar um espaço seguro para mulheres que não têm medo de questionar o convencional e procuram respostas mais profundas.",
  },
];

const numeros = [
  { n: "5.013", l: "horas de formação clínica" },
  { n: "1.053", l: "horas de estágio clínico" },
  { n: "18", l: "valores de nota final" },
  { n: "5", l: "anos do lado do laboratório" },
];

const formacao = [
  "Medicina Tradicional Chinesa, ESMTC Lisboa com a Nanjing University of Chinese Medicine",
  "Pós-graduação em Bioquímica Sanguínea, Faculdade de Saúde Avançada",
  "Pós-graduação em Nutrição Funcional, Faculdade de Saúde Avançada",
  "Modulação Intestinal e Microbioma, Prof. Murilo Pereira",
  "Neurobiologia e Neurociências, University of Chicago",
  "Pós-graduação em Língua Gestual, NOVA Medical School",
  "Registered Functional Medicine Practitioner, Regenerus Labs e Nordic Laboratories (Reino Unido)",
  "Cédula profissional da ACSS, ao abrigo da Lei n.º 71/2013",
];

const perguntas = [
  {
    q: "Que formação tens?",
    a: "Licenciatura de cinco anos em Medicina Tradicional Chinesa (Nanjing University of Chinese Medicine com a ESMTC), pós-graduações em Bioquímica Sanguínea e em Nutrição Funcional na Faculdade de Saúde Avançada e formação em microbioma. A lista completa está acima.",
  },
  {
    q: "Onde estás acreditada?",
    a: "Sou Registered Functional Medicine Practitioner pela Regenerus Labs e pela Nordic Laboratories, no Reino Unido, e tenho cédula profissional da ACSS ao abrigo da Lei n.º 71/2013.",
  },
  {
    q: "És médica?",
    a: "Sou especialista em medicina funcional integrativa, com 21 anos de prática clínica em saúde da mulher, acreditada como Functional Medicine Practitioner pela Regenerus Labs e pela Nordic Labs, no Reino Unido, e com cédula profissional da ACSS ao abrigo da Lei n.º 71/2013. O meu trabalho é investigar o que está por trás dos sintomas e ler as tuas análises em conjunto, com um plano à tua medida.",
  },
];

const Hero = () => (
  <section className="relative bg-v2-paper pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
    <Container size="wide">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        <div className="md:col-span-7 md:pr-8 lg:pr-16 order-2 md:order-1">
          <motion.p
            className="font-serif italic text-[clamp(1.6rem,2.6vw,2.1rem)] text-v2-sage"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Olá, sou a Catarina Veiga.
          </motion.p>
          <motion.h1
            className="mt-5 font-sans font-semibold uppercase text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] tracking-[0.01em] text-v2-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            Respostas para o que as tuas análises não explicaram.
          </motion.h1>
          <motion.p
            className="mt-6 font-serif text-[clamp(1.25rem,2vw,1.6rem)] text-v2-ink-mute"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            Mais poder para as mulheres, mais rigor no cuidado.
          </motion.p>
          <motion.p
            className="mt-8 font-sans text-[17px] leading-[1.7] text-v2-ink-mute max-w-[56ch]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.42 }}
          >
            Tens fadiga, dormes mal, o teu corpo mudou, e as análises voltam "normais". Conheço esse lugar por dentro: a
            minha ferritina estava baixíssima e um pós-operatório de 15 dias durou sete meses. Foi a ler e a cruzar os meus
            próprios biomarcadores que encontrei respostas. Hoje faço o mesmo contigo: transformo as perguntas que ficaram
            sem resposta em decisões concretas e mensuráveis.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
          >
            <WCButton href={acuityUrl("sobre-hero")}>Marcar consulta</WCButton>
            <WCButton to="/avaliacao">Autoavaliação gratuita</WCButton>
          </motion.div>
        </div>
        <motion.div
          className="md:col-span-5 order-1 md:order-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <div className="relative mx-auto max-w-[460px]">
            <span
              aria-hidden
              className="absolute -inset-4 md:-inset-6 rounded-sm [background-color:color-mix(in_srgb,var(--v2-golden)_22%,var(--v2-paper))] rotate-[-3deg]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-v2-paper-deep">
              <motion.img
                src={retratoCamisa}
                alt="Catarina Veiga"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-top"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

const ComoTrabalho = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 bg-v2-sage overflow-hidden">
    <div className="relative h-[300px] md:h-auto md:min-h-[620px] overflow-hidden">
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
    <div className="px-8 py-16 md:px-14 lg:px-20 flex flex-col justify-center">
      <FadeUp>
        <Pill light>Como trabalho</Pill>
        <h2 className="mt-5 font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] text-v2-paper max-w-[18ch]">
          Junto análises avançadas e acompanhamento próximo.
        </h2>
      </FadeUp>
      <ol className="mt-10 space-y-6">
        {comoTrabalho.map((t, i) => (
          <motion.li
            key={i}
            className="flex gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
          >
            <span className="shrink-0 font-serif text-[28px] leading-none [color:color-mix(in_srgb,var(--v2-golden)_70%,var(--v2-paper))]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-sans text-[16px] md:text-[17px] leading-[1.6] text-v2-paper">{t}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

const Porque = () => (
  <section className="bg-v2-moss text-v2-paper py-20 md:py-28">
    <Container size="default">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <FadeUp className="md:col-span-5">
          <Pill light>O meu porquê</Pill>
          <p className="mt-6 font-serif italic text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.15]">
            Fiz este caminho primeiro como paciente, depois como estudante, e hoje como praticante.
          </p>
        </FadeUp>
        <FadeUp className="md:col-span-6 md:col-start-7 space-y-6 font-sans text-[17px] leading-[1.75] [color:color-mix(in_srgb,var(--v2-paper)_88%,transparent)]" delay={0.12}>
          <p>
            Há uns anos parti um menisco e tive de ser operada. Nas análises pedidas pela anestesiologia reparei que a minha
            ferritina estava extremamente baixa e perguntei o que isso significava. <Falta>o que te responderam</Falta> O
            pós-operatório, que devia durar 15 dias, durou sete meses, quase imobilizada, com uma cicatrização lentíssima.{" "}
            <Falta>quando e como percebeste que a ferritina explicava a cicatrização lenta</Falta>
          </p>
          <p>
            Comecei a procurar respostas e encontrei a área pela qual me apaixonei: a bioquímica sanguínea, a linguagem das
            células. Aprender a ler e a cruzar biomarcadores, e não apenas a ver se estavam dentro do intervalo, foi o que
            me ajudou a recuperar.
          </p>
        </FadeUp>
      </div>
    </Container>
  </section>
);

const LinhaDoTempo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  return (
    <section className="bg-v2-paper py-20 md:py-28">
      <Container size="default">
        <FadeUp className="text-center">
          <Pill>O percurso</Pill>
          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-v2-ink">Como cheguei aqui</h2>
        </FadeUp>
        <div ref={ref} className="relative mt-16 md:mt-20">
          <span aria-hidden className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-v2-paper-line" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top bg-v2-sage"
          />
          <ol className="space-y-14 md:space-y-20">
            {capitulos.map((c, i) => {
              const right = i % 2 === 1;
              return (
                <li key={c.titulo} className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16 md:items-center">
                  <motion.span
                    aria-hidden
                    className="absolute left-[11px] md:left-1/2 top-2 h-[14px] w-[14px] -translate-x-1/2 rounded-full border-2 border-v2-sage bg-v2-paper"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, ease }}
                  />
                  <motion.div
                    className={cn("pl-10 md:pl-0", right ? "md:col-start-2" : "md:text-right")}
                    initial={{ opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-v2-sage">{c.quando}</p>
                    <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.15] text-v2-ink">{c.titulo}</h3>
                    <p className={cn("mt-4 font-sans text-[16px] leading-[1.7] text-v2-ink-mute max-w-[52ch]", !right && "md:ml-auto")}>
                      {c.texto}
                    </p>
                  </motion.div>
                  <div
                    className={cn(
                      "mt-8 pl-10 md:mt-0 md:pl-0 flex",
                      right ? "md:col-start-1 md:row-start-1 md:justify-end" : "md:justify-start",
                    )}
                  >
                    <Moldura falta={c.foto} rotate={right ? -2 : 2} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
};

const Numeros = () => (
  <section className="bg-v2-paper-deep py-16 md:py-20">
    <Container size="default">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center">
        {numeros.map((x, i) => (
          <motion.div
            key={x.l}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
          >
            <p className="font-serif text-[clamp(2.8rem,6vw,4.4rem)] leading-none text-v2-ink">{x.n}</p>
            <p className="mt-3 font-sans text-[13px] uppercase tracking-[0.16em] text-v2-sage">{x.l}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

const Formacao = () => (
  <section className="bg-v2-paper py-20 md:py-28">
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
            <img src={retratoCreme} alt="Catarina Veiga" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          </div>
        </motion.div>
        <FadeUp className="md:col-span-7" delay={0.1}>
          <Pill>Formação e acreditações</Pill>
          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-v2-ink">
            Quando o cuidado parte da evidência, os resultados aparecem.
          </h2>
          <ul className="mt-10 space-y-4">
            {formacao.map((f) => (
              <li key={f} className="relative pl-8 font-sans text-[16px] md:text-[17px] leading-[1.55] text-v2-ink">
                <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-4 bg-v2-sage" />
                {f}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </Container>
  </section>
);

const ForaDoConsultorio = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 [background:linear-gradient(120deg,hsl(var(--almond)/0.55),hsl(var(--almond)/0.15))]">
    <FadeUp className="order-2 md:order-1 flex flex-col justify-center px-8 py-16 md:px-14 lg:px-20">
      <Pill>Fora do consultório</Pill>
      <h2 className="mt-5 font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] text-v2-ink">Serra, rio e música.</h2>
      <p className="mt-6 font-sans text-[17px] leading-[1.7] text-v2-ink-mute max-w-[44ch]">
        Sou mãe do Alberto, que tem dez anos. Gosto de serra, de campo e de banhos de rio, de música, de dançar e de
        viagens sem destino.
      </p>
    </FadeUp>
    <div className="order-1 md:order-2 relative h-[340px] md:h-auto md:min-h-[520px] overflow-hidden">
      <motion.img
        src={retratoVerde}
        alt="Catarina Veiga em casa"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
    </div>
  </section>
);

const Perguntas = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-v2-paper py-20 md:py-28">
      <Container size="narrow">
        <FadeUp className="text-center">
          <Pill>Perguntas</Pill>
          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-v2-ink">Antes de marcares</h2>
        </FadeUp>
        <ul className="mt-12 divide-y divide-v2-paper-line border-y border-v2-paper-line">
          {perguntas.map((p, i) => {
            const isOpen = open === i;
            return (
              <li key={p.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-8"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[22px] leading-[1.35] text-v2-ink">{p.q}</span>
                  <span className={cn("shrink-0 mt-1 text-v2-sage text-[22px] transition-transform duration-300", isOpen && "rotate-45")}>+</span>
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="pb-7 font-sans text-[16px] leading-[1.7] text-v2-ink-mute max-w-[64ch]">{p.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

const Fecho = () => (
  <section className="bg-v2-sage py-20 md:py-28 text-center">
    <Container size="narrow">
      <FadeUp>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] text-v2-paper">Vamos trabalhar juntas?</h2>
        <p className="mt-6 font-sans text-[17px] leading-[1.65] [color:color-mix(in_srgb,var(--v2-paper)_85%,transparent)] max-w-[44ch] mx-auto">
          Um espaço seguro para mulheres que procuram respostas mais profundas.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center [&>a]:whitespace-nowrap">
          <WCButton href={acuityUrl("sobre-fecho")} tone="white">Marcar consulta</WCButton>
          <WCButton to="/avaliacao">Autoavaliação gratuita</WCButton>
        </div>
        <p className="mt-8 font-sans text-[12px] uppercase tracking-[0.16em] [color:color-mix(in_srgb,var(--v2-paper)_65%,transparent)]">
          Online · 90 minutos · questionário prévio por email
        </p>
      </FadeUp>
    </Container>
  </section>
);

const SobreV2 = () => (
  <MotionConfig reducedMotion="user">
    <Helmet>
      <title>Sobre a Catarina Veiga · Medicina funcional integrativa</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: `url("${GRAO}")` }}
      />
      <NavbarV2 />
      <main className="overflow-hidden">
        <Hero />
        <ComoTrabalho />
        <Porque />
        <LinhaDoTempo />
        <Numeros />
        <Formacao />
        <ForaDoConsultorio />
        <SocialProof />
        <Perguntas />
        <Fecho />
      </main>
      <FooterV2 />
      <StickyMobileCTA />
    </div>
  </MotionConfig>
);

export default SobreV2;
