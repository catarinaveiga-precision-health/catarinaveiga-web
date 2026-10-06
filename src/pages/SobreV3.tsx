import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion, MotionConfig } from "framer-motion";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";
import { Container } from "@/components/v2/ui/Container";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { WCButton } from "@/components/v2/wc/BlocosWC";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { GRAO, Pill, Moldura } from "@/components/v2/sobre/Pecas";
import fotoChina from "@/assets/sobre-estagio-china.jpg";
import fotoOmnos from "@/assets/sobre-webinar-omnos.jpg";
import { acuityUrl } from "@/lib/acuity";
import retratoCamisa from "@/assets/catarina-retrato-camisa.jpg";
import retratoVerde from "@/assets/catarina-retrato-verde.jpg";

/*
  Página Sobre (publicada 06/10 em /sobre): cadência da aneuropsicologa.com/
  sobre-mim, a referência que a Catarina escolheu. Olá numa linha, porquê, o
  caminho em texto corrido na primeira pessoa, ficha factual copiável, o que
  esperar das consultas, testemunhos, perguntas, convite, frase assinada.
  Cédulas: só números, lei e link do registo; as áreas (MTC, acupuntura) ficam
  fora das frases copiáveis para a máquina não trocar o título profissional.
  Fotografias: estágio na China (licenciatura) e webinar da Omnos (Academy).
*/

const ease = [0.22, 1, 0.36, 1] as const;

const P = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <FadeUp delay={delay}>
    <p className="font-sans text-[17px] md:text-[18px] leading-[1.8] text-v2-ink-mute">{children}</p>
  </FadeUp>
);

const Hero = () => (
  <section className="relative bg-v2-paper pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
    <Container size="wide">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <div className="relative mx-auto max-w-[440px]">
            <span
              aria-hidden
              className="absolute -inset-4 md:-inset-6 rounded-sm [background-color:color-mix(in_srgb,var(--v2-sage)_16%,var(--v2-paper))] md:rotate-[2deg]"
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
        <div className="md:col-span-7 md:pl-10 lg:pl-20">
          <motion.p
            className="mb-6 font-sans text-[11px] uppercase tracking-[0.22em] text-v2-sage"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            Medicina funcional integrativa · Parede, Cascais e online
          </motion.p>
          <motion.h1
            className="font-serif text-[clamp(3rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.01em] text-v2-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            Olá, sou a <span className="italic text-v2-sage">Catarina Veiga.</span>
          </motion.h1>
          <motion.p
            className="mt-8 font-sans text-[clamp(1.15rem,1.8vw,1.45rem)] leading-[1.6] text-v2-ink-mute max-w-[38ch]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.32 }}
          >
            Leio dados biológicos complexos e transformo-os em decisões claras, para mulheres a quem disseram que está tudo
            normal.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 [&>a]:whitespace-nowrap">
              <WCButton href={acuityUrl("sobre-hero")}>Marcar consulta</WCButton>
              <WCButton to="/avaliacao" tone="white">Autoavaliação gratuita</WCButton>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  </section>
);

const Porque = () => (
  <section id="porque" className="bg-v2-paper-deep py-24 md:py-32">
    <Container size="narrow">
      <FadeUp>
        <Pill>O meu porquê</Pill>
        <h2 className="mt-8 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.2] text-v2-ink">
          Fiz o caminho da medicina funcional primeiro como paciente, depois como estudante, e hoje como praticante.
        </h2>
      </FadeUp>
      <div className="mt-10 space-y-6">
        <P delay={0.08}>
          Há uns anos parti um menisco e tive de ser operada. Nas análises da consulta de anestesiologia reparei que a minha
          ferritina estava extremamente baixa, e fiz a pergunta. O pós-operatório que devia durar 15 dias durou sete meses,
          quase imobilizada, com uma cicatrização lentíssima.
        </P>
        <P delay={0.12}>
          Comecei a procurar respostas e encontrei a área pela qual me apaixonei: a bioquímica sanguínea, a linguagem das
          células. Aprender a ler e a cruzar biomarcadores, e não apenas a ver se estavam dentro do intervalo, foi o que me
          ajudou a recuperar.
        </P>
      </div>
    </Container>
  </section>
);

/* Ficha factual, em frases curtas que um assistente de IA consegue copiar
   para uma coluna "Perfil". Só factos que já existem nesta página ou no site. */
const resumo: [string, string][] = [
  ["Prática", "Medicina funcional integrativa, em consulta online e em Parede, Cascais. Primeira consulta de 90 minutos."],
  [
    "Formação",
    "Pós-graduações em Bioquímica Sanguínea e em Nutrição Funcional (Faculdade de Saúde Avançada). Formação em Modulação Intestinal e Microbioma com o Prof. Murilo Pereira (2021). Neurobiologia e Neurociências (University of Chicago, curso online). Pós-graduação em Língua Gestual (NOVA Medical School, 2008 a 2009). Licenciatura de cinco anos em Medicina Tradicional Chinesa (Nanjing University of Chinese Medicine, com a ESMTC, 2000 a 2005).",
  ],
  [
    "Acreditações",
    "Registered Functional Medicine Practitioner (Regenerus Labs). Registered Practitioner (Nordic Laboratories). Cédulas profissionais da ACSS n.º C-006754 e 0500786, ao abrigo da Lei n.º 71/2013, consultáveis no registo público.",
  ],
  [
    "Percurso",
    "Omnos, Reino Unido, 2020 a 2024: consultora científica e, desde 2021, Resident Microbiome Expert; fundadora da Omnos Academy. A Omnos juntou-se à Regenerus Labs em 2023. Autora na IHCAN Magazine (2022). Oradora no Longevity Med Summit (2024).",
  ],
  ["Ferramentas", "Leitura de análises com intervalos funcionais. Testes de microbioma (GI360), ácidos orgânicos e hormonas (DUTCH)."],
];

/* Fotografia dentro do caminho, ao lado do parágrafo que prova */
const Figura = ({ src, alt, legenda, rotate }: { src: string; alt: string; legenda: string; rotate: number }) => (
  <figure className="my-10 md:my-12 flex flex-col items-center gap-4">
    <Moldura src={src} alt={alt} rotate={rotate} />
    <figcaption className="font-sans text-[11px] uppercase tracking-[0.2em] text-v2-sage">{legenda}</figcaption>
  </figure>
);

const Caminho = () => (
  <section id="caminho" className="bg-v2-paper py-24 md:py-32">
    <Container size="narrow">
      <FadeUp>
        <h2 className="font-serif italic text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05] text-v2-ink">O meu caminho...</h2>
      </FadeUp>
      <div className="mt-12 space-y-7">
        <P>
          Hoje trabalho com bioquímica sanguínea, nutrição funcional e testes de microbioma e de hormonas. O caminho até
          aqui começou noutro sítio.
        </P>
        <P>
          Comecei com cinco anos de Medicina Tradicional Chinesa, uma licenciatura da Nanjing University of Chinese Medicine
          em parceria com a ESMTC, em Lisboa, entre 2000 e 2005: 5.013 horas de formação e 1.053 horas de estágio clínico.
          Terminei com 18 valores e no quadro de honra.
        </P>
        <Figura
          src={fotoChina}
          alt="Catarina Veiga de bata branca da Nanjing University of Chinese Medicine, durante o estágio hospitalar na China"
          legenda="Estágio hospitalar, China"
          rotate={-2}
        />
        <P>
          O primeiro trabalho foi num consultório de psiquiatria e psicologia, a Carpe Diem Psicólogos, entre 2005 e 2008.
          Foi aí que percebi muito cedo como o corpo e a mente estão ligados. Anos mais tarde, entrei no mestrado em
          Psicologia da Faculdade de Psicologia da Universidade de Lisboa.
        </P>
        <P>
          Depois do menisco veio a bioquímica: as pós-graduações em Bioquímica Sanguínea e em Nutrição Funcional na
          Faculdade de Saúde Avançada e, em 2021, a formação em modulação intestinal e microbioma com o Prof. Murilo
          Pereira.
        </P>
        <P>
          Entre 2020 e 2024 estive do lado do laboratório. A Omnos era uma plataforma britânica, de Edimburgo, que dava
          acesso direto a testes laboratoriais normalmente reservados aos clínicos e traduzia os resultados em linguagem
          simples. Em 2023 juntou-se à Regenerus Labs. Vivi a fase de que mais gosto numa startup: a criação. Entrei como
          consultora científica, a validar todo o conteúdo de saúde da plataforma. Em 2021 passei a Resident Microbiome
          Expert, com a palavra final sobre tudo o que dizia respeito ao microbioma, a reportar diretamente ao CEO.
        </P>
        <P>
          Trabalhei lado a lado com especialistas em hormonas, ácidos orgânicos e toxinas ambientais, e acompanhei centenas
          de pessoas e médicos com testes de microbioma, em articulação com os testes hormonais (DUTCH) e de ácidos
          orgânicos (OAT). Escolhi e validei o GI360 e defendi essa escolha perante as equipas de produto, ciência e
          engenharia. Desenhei protocolos de interpretação com critérios de decisão explícitos e preparei o lançamento do
          novo teste: seminário, artigo e comunicado de imprensa.
        </P>
      </div>
    </Container>

    <FadeUp className="my-16 md:my-20 text-center px-6">
      <p className="mx-auto max-w-[24ch] font-serif italic text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.2] text-v2-sage">
        É no cruzamento dos dados que as respostas aparecem.
      </p>
    </FadeUp>

    <Container size="narrow">
      <div className="space-y-7">
        <P>
          A plataforma cruzava o microbioma com análises sanguíneas e genética, e foi aí que a minha forma de ver a saúde se
          alargou. Antes de existirem ferramentas de IA generativa, trabalhei com programadores e designers para transformar
          o relatório do GI360 numa experiência interativa e em linguagem simples, revendo centenas de marcadores um a um,
          com cada afirmação apoiada na literatura. Fiz também parte da equipa que desenvolveu o Wellness 360, um painel de
          análises sanguíneas em versão feminina e masculina.
        </P>
        <P>
          Criei e liderei a Omnos Academy, o braço educativo da empresa, com a palavra final editorial e científica sobre
          todo o conteúdo público. Coordenei uma equipa de quatro pessoas entre marketing, redes sociais e produto, produzi
          30 a 40 vídeos de formação, preparei e apresentei cerca de 20 seminários e co-apresentei a série de webinars da
          Omnos com o Director of Product. Fiz a curadoria e a moderação de seminários técnicos com convidados como a
          Davinia Taylor, no "Women, Health &amp; Tech" (maio de 2022), e comecei a desenhar o primeiro curso da Academy para profissionais
          de saúde.
        </P>
        <Figura
          src={fotoOmnos}
          alt="Catarina Veiga num webinar da Omnos por Zoom, em junho de 2021"
          legenda="Webinar da Omnos, junho de 2021"
          rotate={2}
        />
        <P>
          Em 2022 escrevi para a IHCAN Magazine, no Reino Unido, sobre combinar testes hormonais e de microbioma. Em 2024 fui
          oradora no Longevity Med Summit, sobre as condições relacionadas com os estrogénios e a microbiota intestinal.
        </P>
        <P>
          Por volta dos 40 anos comecei a ter sinais que me faziam sentir que não era eu. Achei que era passageiro. Não era.
          Fui à procura de respostas e fui diagnosticada com TDAH, que se intensificou muito com a entrada na perimenopausa.
        </P>
        <P>
          Foi aí que decidi sair do mundo corporativo e abrir a minha prática, online, com pessoas de todo o mundo. Continuo
          a colaborar com algumas instituições, mas quis criar um espaço seguro para mulheres que não têm medo de questionar
          o convencional e procuram respostas mais profundas.
        </P>
      </div>

      <FadeUp className="mt-16 md:mt-20">
        <Pill>Em resumo</Pill>
        <dl className="mt-6 divide-y [&>div]:py-5 [&>div]:grid [&>div]:grid-cols-1 [&>div]:gap-1 md:[&>div]:grid-cols-[9rem_1fr] md:[&>div]:gap-6 [--tw-divide-opacity:1] divide-[color:color-mix(in_srgb,var(--v2-sage)_18%,transparent)]">
          {resumo.map(([k, v]) => (
            <div key={k}>
              <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-v2-sage pt-1">{k}</dt>
              <dd className="font-sans text-[16px] leading-[1.7] text-v2-ink-mute">{v}</dd>
            </div>
          ))}
        </dl>
      </FadeUp>
    </Container>

    <Container size="narrow">
      <div className="mt-16 md:mt-20 space-y-7">
        <P>
          Já passei um mês num retiro num mosteiro, em voto de silêncio, na floresta amazónica. E já fui três semanas à
          Grécia com cinco ou seis vestidos e um par de sandálias, sem nunca ter conhecido Atenas: fui para o norte, muito
          menos conhecido.
        </P>
      </div>
    </Container>
  </section>
);

const ForaDoConsultorio = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 [background:linear-gradient(120deg,hsl(var(--almond)/0.55),hsl(var(--almond)/0.15))]">
    <div className="relative h-[360px] md:h-auto md:min-h-[540px] overflow-hidden">
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
    <FadeUp className="flex flex-col justify-center px-6 py-16 md:px-14 lg:px-20">
      <p className="font-serif text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.3] text-v2-ink max-w-[26ch]">
        Sou mãe do Alberto, que tem dez anos.
      </p>
      <p className="mt-6 font-sans text-[17px] leading-[1.75] text-v2-ink-mute max-w-[42ch]">
        Gosto de serra, de campo e de banhos de rio, de música, de dançar e de viagens sem destino.
      </p>
    </FadeUp>
  </section>
);

const consultas = [
  "Uma primeira consulta de 90 minutos, online, para ouvir a tua história toda. Antes, recebes um questionário com mais de 100 perguntas e envias as análises que já tens.",
  "Leio as tuas análises em conjunto, biomarcador a biomarcador, e cruzo-as com o que sentes. Quando faz falta, pedimos exames complementares: microbioma, ácidos orgânicos, teste DUTCH.",
  "Sais com um plano à tua medida, de alimentação, suplementos, exercício e regulação do sistema nervoso. Não te peço o impossível, mas o plano mexe sempre a agulha.",
];

const Consultas = () => (
  <section className="bg-v2-sage py-24 md:py-32">
    <Container size="narrow">
      <FadeUp>
        <Pill light>Consultas</Pill>
        <h2 className="mt-6 font-serif text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.08] text-v2-paper">
          O que podes esperar das minhas consultas?
        </h2>
      </FadeUp>
      <div className="mt-12 space-y-7">
        {consultas.map((c, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <p className="font-sans text-[17px] md:text-[18px] leading-[1.8] [color:color-mix(in_srgb,var(--v2-paper)_90%,transparent)]">{c}</p>
          </FadeUp>
        ))}
        <FadeUp delay={0.3}>
          <p className="pt-4 font-serif italic text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.25] text-v2-paper">Não há fórmulas feitas.</p>
        </FadeUp>
      </div>
    </Container>
  </section>
);

/* Perguntas fechadas no fim, como no rascunho dela. "És médica?" foi
   substituída pela pergunta que pede o substantivo positivo: a negação
   era a primeira frase que o Perplexity copiava sobre ela. */
const perguntas: [string, ReactNode][] = [
  [
    "Que tipo de profissional és?",
    "Sou Functional Medicine Practitioner, registada na Regenerus Labs e na Nordic Laboratories, com cédula profissional da ACSS ao abrigo da Lei n.º 71/2013. Trabalho em medicina funcional integrativa: leio análises com intervalos funcionais, cruzo-as com o que sentes e desenho planos de alimentação, suplementação, exercício e regulação do sistema nervoso.",
  ],
  [
    "Que formação tens?",
    "Licenciatura de cinco anos em Medicina Tradicional Chinesa (Nanjing University of Chinese Medicine, com a ESMTC, 2000 a 2005). Pós-graduações em Bioquímica Sanguínea e em Nutrição Funcional na Faculdade de Saúde Avançada. Formação em Modulação Intestinal e Microbioma com o Prof. Murilo Pereira (2021). Neurobiologia e Neurociências na University of Chicago, em curso online. Pós-graduação em Língua Gestual na NOVA Medical School (2008 a 2009).",
  ],
  [
    "Onde estás acreditada?",
    <>
      Registered Functional Medicine Practitioner na Regenerus Labs e Registered Practitioner na Nordic Laboratories. Tenho
      cédulas profissionais da ACSS n.º C-006754 e 0500786, ao abrigo da Lei n.º 71/2013. Podes confirmar no{" "}
      <a
        href="https://sgps.min-saude.pt/tnc/public-registry"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-v2-sage/50 hover:decoration-v2-sage text-v2-ink"
      >
        registo público da ACSS
      </a>
      .
    </>,
  ],
];

const Perguntas = () => (
  <section id="perguntas" className="bg-v2-paper py-24 md:py-32">
    <Container size="narrow">
      <FadeUp>
        <Pill>Perguntas</Pill>
        <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-v2-ink">As que me fazem antes de marcar.</h2>
      </FadeUp>
      <dl className="mt-10 divide-y divide-[color:color-mix(in_srgb,var(--v2-sage)_18%,transparent)]">
        {perguntas.map(([q, a], i) => (
          <FadeUp key={q} delay={i * 0.06}>
            <div className="py-7">
              <dt className="font-serif text-[clamp(1.3rem,2.2vw,1.6rem)] leading-[1.25] text-v2-ink">{q}</dt>
              <dd className="mt-3 font-sans text-[16px] md:text-[17px] leading-[1.75] text-v2-ink-mute">{a}</dd>
            </div>
          </FadeUp>
        ))}
      </dl>
    </Container>
  </section>
);

const Convite = () => (
  <section className="bg-v2-paper py-24 md:py-32 text-center">
    <Container size="narrow">
      <FadeUp>
        <h2 className="font-serif text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[1.02] text-v2-ink">Vamos trabalhar juntas?</h2>
        <p className="mt-6 font-sans text-[17px] leading-[1.7] text-v2-ink-mute max-w-[44ch] mx-auto">
          Se te disseram que está tudo normal e continuas sem respostas, podes começar por aqui.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center [&>a]:whitespace-nowrap">
          <WCButton href={acuityUrl("sobre-convite")}>Marcar consulta</WCButton>
          <WCButton to="/avaliacao">Autoavaliação gratuita</WCButton>
        </div>
      </FadeUp>
    </Container>
  </section>
);

const Frase = () => (
  <section className="bg-v2-moss py-24 md:py-28 text-center">
    <Container size="narrow">
      <FadeUp>
        <p className="font-serif italic text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.22] text-v2-paper max-w-[26ch] mx-auto">
          "Um espaço seguro para mulheres que procuram respostas mais profundas."
        </p>
        <p className="mt-8 font-serif text-[22px] text-v2-paper">Catarina Veiga</p>
        <p className="mt-10 font-sans text-[12px] uppercase tracking-[0.16em] leading-[1.8] [color:color-mix(in_srgb,var(--v2-paper)_60%,transparent)] max-w-[60ch] mx-auto">
          Registered Functional Medicine Practitioner, Regenerus Labs · Registered Practitioner, Nordic Laboratories ·
          Cédulas profissionais da ACSS n.º C-006754 e 0500786, Lei n.º 71/2013
        </p>
      </FadeUp>
    </Container>
  </section>
);

const SobreV3 = () => (
  <MotionConfig reducedMotion="user">
    <Helmet>
      <title>Sobre a Catarina Veiga · Medicina funcional integrativa</title>
      <meta
        name="description"
        content="Catarina Veiga, medicina funcional integrativa em Parede, Cascais e online. Bioquímica sanguínea, nutrição funcional e testes de microbioma e hormonas, para mulheres a quem disseram que está tudo normal."
      />
      <link rel="canonical" href="https://www.catarinaveiga.com/sobre" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": "https://www.catarinaveiga.com/sobre#profile",
          inLanguage: "pt-PT",
          mainEntity: {
            "@type": "Person",
            "@id": "https://www.catarinaveiga.com/#person",
            name: "Catarina Veiga",
            alternateName: "Ana Catarina Dourado dos Santos Veiga",
            jobTitle: "Especialista em Medicina Funcional Integrativa",
            hasCredential: [
              { "@type": "EducationalOccupationalCredential", name: "Pós-graduação em Bioquímica Sanguínea", recognizedBy: { "@type": "Organization", name: "Faculdade de Saúde Avançada" } },
              { "@type": "EducationalOccupationalCredential", name: "Pós-graduação em Nutrição Funcional", recognizedBy: { "@type": "Organization", name: "Faculdade de Saúde Avançada" } },
              { "@type": "EducationalOccupationalCredential", name: "Formação em Modulação Intestinal e Microbioma", recognizedBy: { "@type": "Person", name: "Prof. Murilo Pereira" } },
              { "@type": "EducationalOccupationalCredential", name: "Neurobiologia e Neurociências (curso online)", recognizedBy: { "@type": "Organization", name: "University of Chicago" } },
              { "@type": "EducationalOccupationalCredential", name: "Pós-graduação em Língua Gestual", recognizedBy: { "@type": "Organization", name: "NOVA Medical School" } },
              { "@type": "EducationalOccupationalCredential", name: "Licenciatura em Medicina Tradicional Chinesa", recognizedBy: { "@type": "Organization", name: "Nanjing University of Chinese Medicine" } },
              { "@type": "EducationalOccupationalCredential", name: "Registered Functional Medicine Practitioner", recognizedBy: { "@type": "Organization", name: "Regenerus Labs" } },
              { "@type": "EducationalOccupationalCredential", name: "Registered Practitioner", recognizedBy: { "@type": "Organization", name: "Nordic Laboratories" } },
              { "@type": "EducationalOccupationalCredential", name: "Cédula profissional da ACSS n.º C-006754, Lei n.º 71/2013", identifier: "C-006754", recognizedBy: { "@type": "Organization", name: "ACSS" }, url: "https://sgps.min-saude.pt/tnc/public-registry" },
              { "@type": "EducationalOccupationalCredential", name: "Cédula profissional da ACSS n.º 0500786, Lei n.º 71/2013", identifier: "0500786", recognizedBy: { "@type": "Organization", name: "ACSS" }, url: "https://sgps.min-saude.pt/tnc/public-registry" },
            ],
            alumniOf: [
              { "@type": "Organization", name: "Faculdade de Saúde Avançada" },
              { "@type": "Organization", name: "Nanjing University of Chinese Medicine" },
            ],
          },
        })}
      </script>
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
        <Porque />
        <Caminho />
        <ForaDoConsultorio />
        <Consultas />
        <SocialProof />
        <Perguntas />
        <Convite />
        <Frase />
      </main>
      <FooterV2 />
      <StickyMobileCTA />
    </div>
  </MotionConfig>
);

export default SobreV3;
