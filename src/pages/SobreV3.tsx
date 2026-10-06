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
import { GRAO, Pill } from "@/components/v2/sobre/Pecas";
import { acuityUrl } from "@/lib/acuity";
import retratoCamisa from "@/assets/catarina-retrato-camisa.jpg";
import fotoChina from "@/assets/sobre-estagio-china.jpg";
import fotoExpert from "@/assets/sobre-omnos-expert.jpg";
import fotoOmnos from "@/assets/sobre-webinar-omnos.jpg";
import fotoPainel from "@/assets/sobre-omnos-painel.jpg";
import fotoLongevity from "@/assets/sobre-longevity.jpg";
import fotoRio from "@/assets/sobre-rio-eucalipto.jpg";
import fotoGravida from "@/assets/sobre-gravida.jpg";

/*
  Página Sobre (/sobre). Regra única, copiada da referência que a Catarina
  escolheu (aneuropsicologa.com/sobre-mim): hero numa faixa de cor com
  fotografia em cartão; "O meu caminho" com uma coluna central tracejada e
  marcos iguais entre si: um parágrafo curto com marcador (traço + ponto) de
  um lado, um cartão do mesmo tamanho do outro (fotografia, ou factos em
  bullets onde não há fotografia), lados alternados. Texto dela, verbatim,
  só dividido em parágrafos curtos. Cédulas só por número e lei.
*/

const ease = [0.22, 1, 0.36, 1] as const;

/* Parágrafo curto: letra maior e mais escura, medida de ~52 caracteres */
const P = ({ children, claro }: { children: ReactNode; claro?: boolean }) => (
  <p
    className={`font-sans text-[18px] md:text-[19px] leading-[1.65] max-w-[52ch] ${
      claro ? "text-v2-paper" : "text-v2-ink"
    }`}
  >
    {children}
  </p>
);

/* Marcador da referência: traço, ponto, e a data */
const Marcador = ({ quando }: { quando?: string }) => (
  <div className="flex items-center gap-3">
    <span aria-hidden className="h-px w-10 bg-v2-sage" />
    <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-v2-golden" />
    {quando && <span className="ml-1 font-sans text-[12px] uppercase tracking-[0.2em] text-v2-ink-mute">{quando}</span>}
  </div>
);

const sombra = "shadow-[0_24px_48px_-28px_rgba(22,53,44,0.35)]";

/* Cartão de fotografia: largura fixa, cantos redondos, sem rotação */
const CartaoFoto = ({ src, alt, legenda, aspect = "4/5" }: { src: string; alt: string; legenda?: string; aspect?: "4/5" | "1/1" }) => (
  <figure className="w-full max-w-[400px]">
    <div className={`overflow-hidden rounded-[1.25rem] bg-v2-paper-deep ${sombra} ${aspect === "1/1" ? "aspect-square" : "aspect-[4/5]"}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
    </div>
    {legenda && (
      <figcaption className="mt-3 text-center font-sans text-[12px] uppercase tracking-[0.18em] text-v2-ink-mute">{legenda}</figcaption>
    )}
  </figure>
);

/* Cartão de factos: o destaque em bullets, com imagem opcional no topo */
const CartaoFactos = ({ titulo, itens, imagem, alt }: { titulo: string; itens: ReactNode[]; imagem?: string; alt?: string }) => (
  <div className={`w-full max-w-[400px] overflow-hidden rounded-[1.25rem] bg-v2-paper-deep ${sombra}`}>
    {imagem && (
      <div className="aspect-[4/3] overflow-hidden">
        <img src={imagem} alt={alt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      </div>
    )}
    <div className="p-8 md:p-9">
      <p className="font-serif text-[1.55rem] leading-[1.15] text-v2-ink">{titulo}</p>
      <ul className="mt-5 space-y-3">
        {itens.map((it, i) => (
          <li key={i} className="flex gap-3 font-sans text-[15.5px] leading-[1.5] text-v2-ink">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-v2-sage" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* Cartão de citação, para o marco que tem a frase dela */
const CartaoCitacao = ({ children }: { children: ReactNode }) => (
  <div className={`w-full max-w-[400px] rounded-[1.25rem] bg-v2-sage ${sombra} p-9 md:p-10 flex items-center min-h-[280px]`}>
    <p className="font-serif italic text-[clamp(1.6rem,2.6vw,2rem)] leading-[1.25] text-v2-paper">{children}</p>
  </div>
);

/* Marco: parágrafo de um lado, cartão do outro; lados alternados; igual em todos */
const Marco = ({ quando, lado, cartao, children }: { quando?: string; lado: "esq" | "dir"; cartao: ReactNode; children: ReactNode }) => {
  const texto = lado === "esq" ? "md:order-1 md:justify-end md:pr-14 lg:pr-20" : "md:order-2 md:justify-start md:pl-14 lg:pl-20";
  const visual = lado === "esq" ? "md:order-2 md:justify-start md:pl-14 lg:pl-20" : "md:order-1 md:justify-end md:pr-14 lg:pr-20";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 py-10 md:py-14 items-center">
      <div className={`flex ${texto}`}>
        <FadeUp className="w-full max-w-[52ch]">
          <Marcador quando={quando} />
          <div className="mt-5 space-y-5">{children}</div>
        </FadeUp>
      </div>
      <div className={`flex justify-center ${visual}`}>
        <FadeUp className="w-full flex justify-center md:block md:w-auto">{cartao}</FadeUp>
      </div>
    </div>
  );
};

const ligacao = "underline underline-offset-4 decoration-v2-sage/50 hover:decoration-v2-sage text-v2-ink";

/* Ligação a um artigo arquivado no Wayback Machine (o omnos.me já não existe) */
const Arq = ({ url, children }: { url: string; children: ReactNode }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className={ligacao}>
    {children}
  </a>
);

/* Ligação a um vídeo do canal da Omnos no YouTube */
const Yt = ({ id, children }: { id: string; children: ReactNode }) => (
  <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className={ligacao}>
    {children}
  </a>
);

const Hero = () => (
  <section className="bg-v2-sage pt-28 md:pt-36 pb-16 md:pb-24">
    <Container size="wide">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
        <div className="md:col-span-7 md:pr-6">
          <motion.p
            className="font-sans text-[12px] uppercase tracking-[0.2em] text-v2-paper"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            Medicina funcional integrativa · Parede, Cascais e online
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-[clamp(2.8rem,6vw,4.8rem)] leading-[1] tracking-[-0.01em] text-v2-paper"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            Olá, sou a <span className="italic">Catarina Veiga.</span>
          </motion.h1>
          <motion.div
            className="mt-8 space-y-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.32 }}
          >
            <P claro>
              Leio dados biológicos complexos e transformo-os em decisões claras, para mulheres a quem disseram que está tudo
              normal.
            </P>
            <P claro>Fiz o caminho da medicina funcional primeiro como paciente, depois como estudante, e hoje como praticante.</P>
          </motion.div>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
          >
            <WCButton href={acuityUrl("sobre-hero")} tone="white">
              Marcar consulta
            </WCButton>
            <a
              href="/avaliacao"
              className="font-sans text-[13px] uppercase tracking-[0.18em] text-v2-paper underline underline-offset-[6px] decoration-v2-paper/40 hover:decoration-v2-paper"
            >
              Autoavaliação gratuita
            </a>
          </motion.div>
        </div>
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <div className={`mx-auto md:ml-auto max-w-[420px] overflow-hidden rounded-[1.25rem] aspect-[4/5] bg-v2-paper-deep ${sombra}`}>
            <img src={retratoCamisa} alt="Catarina Veiga" loading="eager" decoding="async" className="h-full w-full object-cover object-top" />
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

const Porque = () => (
  <section id="porque" className="bg-v2-paper py-20 md:py-28">
    <Container size="narrow">
      <FadeUp>
        <Pill>O meu porquê</Pill>
      </FadeUp>
      <div className="mt-8 space-y-5">
        <FadeUp>
          <P>
            Há uns anos parti um menisco e tive de ser operada. Nas análises da consulta de anestesiologia reparei que a minha
            ferritina estava extremamente baixa, e fiz a pergunta. O pós-operatório que devia durar 15 dias durou sete meses,
            quase imobilizada, com uma cicatrização lentíssima.
          </P>
        </FadeUp>
        <FadeUp delay={0.08}>
          <P>
            Comecei a procurar respostas e encontrei a área pela qual me apaixonei: a bioquímica sanguínea, a linguagem das
            células. Aprender a ler e a cruzar biomarcadores, e não apenas a ver se estavam dentro do intervalo, foi o que me
            ajudou a recuperar.
          </P>
        </FadeUp>
      </div>
    </Container>
  </section>
);

const Caminho = () => (
  <section id="caminho" className="bg-v2-paper pb-20 md:pb-28">
    <Container size="narrow">
      <FadeUp className="text-center">
        <h2 className="font-serif italic text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05] text-v2-ink">O meu caminho...</h2>
        <p className="mx-auto mt-6 max-w-[48ch] font-sans text-[18px] leading-[1.6] text-v2-ink-mute">
          Hoje trabalho com bioquímica sanguínea, nutrição funcional e testes de microbioma e de hormonas. O caminho até aqui
          começou noutro sítio.
        </p>
      </FadeUp>
    </Container>

    <Container size="wide">
      <div className="relative mt-10 md:mt-16">
        <span
          aria-hidden
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed [border-color:color-mix(in_srgb,var(--v2-sage)_45%,transparent)]"
        />

        <Marco
          quando="2000 a 2005"
          lado="esq"
          cartao={
            <CartaoFoto
              src={fotoChina}
              alt="Catarina Veiga de bata branca da Nanjing University of Chinese Medicine, durante o estágio hospitalar na China"
              legenda="Estágio hospitalar, China"
            />
          }
        >
          <P>
            Comecei com cinco anos de Medicina Tradicional Chinesa, uma licenciatura da Nanjing University of Chinese Medicine
            em parceria com a ESMTC, em Lisboa: 5.013 horas de formação e 1.053 horas de estágio clínico. Terminei com 18
            valores e no quadro de honra.
          </P>
        </Marco>

        <Marco
          quando="2005 a 2008"
          lado="dir"
          cartao={
            <CartaoFactos
              titulo="Corpo e mente"
              itens={[
                "Consultório de psiquiatria e psicologia, Carpe Diem Psicólogos, 2005 a 2008",
                "Mestrado em Psicologia, Faculdade de Psicologia da Universidade de Lisboa",
                "Pós-graduação em Língua Gestual, NOVA Medical School, 2008 a 2009",
                "Neurobiologia e Neurociências, University of Chicago, curso online",
              ]}
            />
          }
        >
          <P>
            O primeiro trabalho foi num consultório de psiquiatria e psicologia, a Carpe Diem Psicólogos. Foi aí que percebi
            muito cedo como o corpo e a mente estão ligados. Anos mais tarde, entrei no mestrado em Psicologia da Faculdade de
            Psicologia da Universidade de Lisboa.
          </P>
        </Marco>

        <Marco
          quando="Depois do menisco"
          lado="esq"
          cartao={
            <CartaoFactos
              titulo="Bioquímica e microbioma"
              itens={[
                "Pós-graduação em Bioquímica Sanguínea, Faculdade de Saúde Avançada",
                "Pós-graduação em Nutrição Funcional, Faculdade de Saúde Avançada",
                "Modulação Intestinal e Microbioma, Prof. Murilo Pereira, 2021",
              ]}
            />
          }
        >
          <P>
            Depois do menisco veio a bioquímica: as pós-graduações em Bioquímica Sanguínea e em Nutrição Funcional na
            Faculdade de Saúde Avançada e, em 2021, a formação em modulação intestinal e microbioma com o Prof. Murilo
            Pereira.
          </P>
        </Marco>

        <Marco
          quando="2020 a 2024"
          lado="dir"
          cartao={
            <CartaoFoto
              src={fotoExpert}
              alt="Publicação da Omnos no Instagram: Meet our expert Catarina Veiga, our microbiome expert"
              legenda="Expert Profiles, omnos.me, maio de 2023"
            />
          }
        >
          <P>
            A Omnos era uma plataforma britânica, de Edimburgo, que dava acesso direto a testes laboratoriais normalmente
            reservados aos clínicos e traduzia os resultados em linguagem simples. Em 2023 juntou-se à Regenerus Labs.
          </P>
          <P>
            Vivi a fase de que mais gosto numa startup: a criação. Entrei como consultora científica, a validar todo o
            conteúdo de saúde da plataforma. Em 2021 passei a Resident Microbiome Expert, com a palavra final sobre tudo o
            que dizia respeito ao microbioma, a reportar diretamente ao CEO.
          </P>
        </Marco>

        <Marco
          quando="Omnos · microbioma"
          lado="esq"
          cartao={
            <CartaoFoto
              src={fotoOmnos}
              alt="Catarina Veiga num webinar da Omnos por Zoom, em junho de 2021"
              legenda="Webinar da Omnos, junho de 2021"
            />
          }
        >
          <P>
            Trabalhei lado a lado com especialistas em hormonas, ácidos orgânicos e toxinas ambientais, e acompanhei centenas
            de pessoas e médicos com testes de microbioma, em articulação com os testes hormonais (DUTCH) e de ácidos
            orgânicos (OAT).
          </P>
          <P>
            Escolhi e validei o GI360 e defendi essa escolha perante as equipas de produto, ciência e engenharia. Desenhei
            protocolos de interpretação com critérios de decisão explícitos e preparei o lançamento do novo teste: seminário,
            artigo e comunicado de imprensa.
          </P>
        </Marco>

        <Marco
          quando="Omnos · plataforma"
          lado="dir"
          cartao={<CartaoCitacao>É no cruzamento dos dados que as respostas aparecem.</CartaoCitacao>}
        >
          <P>
            A plataforma cruzava o microbioma com análises sanguíneas e genética, e foi aí que a minha forma de ver a saúde
            se alargou.
          </P>
          <P>
            Antes de existirem ferramentas de IA generativa, trabalhei com programadores e designers para transformar o
            relatório do GI360 numa experiência interativa e em linguagem simples, revendo centenas de marcadores um a um,
            com cada afirmação apoiada na literatura. Fiz também parte da equipa que desenvolveu o Wellness 360, um painel de
            análises sanguíneas em versão feminina e masculina.
          </P>
        </Marco>

        <Marco
          quando="Omnos Academy · 2022"
          lado="esq"
          cartao={
            <CartaoFoto
              src={fotoPainel}
              alt="Gráfico da Omnos para o painel Women, Health and Tech, 31 de maio de 2022, com as anfitriãs e as quatro oradoras"
              legenda="Women, Health & Tech, maio de 2022"
              aspect="1/1"
            />
          }
        >
          <P>
            Criei e liderei a Omnos Academy, o braço educativo da empresa, com a palavra final editorial e científica sobre
            todo o conteúdo público. Coordenei uma equipa de quatro pessoas entre marketing, redes sociais e produto.
          </P>
        </Marco>

        <Marco
          quando="Webinars · 2022"
          lado="dir"
          cartao={
            <CartaoFactos
              titulo="Webinars que apresentei"
              itens={[
                <Yt id="RqAW98xlfe4">Thomas Olivier: Connecting the Dots, com o fundador da Omnos (fevereiro de 2022)</Yt>,
                <Yt id="JJfqkvNWWdM">The glass ceiling within you, com Cristiana Santos (março de 2022)</Yt>,
                <Yt id="WJ3_sOhijOs">Women, Health &amp; Tech Panel, com Davinia Taylor (junho de 2022)</Yt>,
                <Yt id="EcqdiVZ_2Us">Understanding the Omnos Microbiome Test (julho de 2022)</Yt>,
                <Yt id="9fkMLuwZK5s">Nutrition, Physiology, Function &amp; Perception of Health, com Sinead Roberts (julho de 2022)</Yt>,
                <Yt id="G1e-zO9mFRA">What is vitamin D and what does it do for your body? (agosto de 2022)</Yt>,
                <Yt id="blnXEICQcYY">Why men should talk, com Dr. Mark Cox (novembro de 2022)</Yt>,
              ]}
            />
          }
        >
          <P>
            Produzi 30 a 40 vídeos de formação, preparei e apresentei cerca de 20 seminários e co-apresentei a série de
            webinars da Omnos com o Director of Product. Fiz a curadoria e a moderação de seminários técnicos com convidados
            como a Davinia Taylor, no "Women, Health &amp; Tech", e comecei a desenhar o primeiro curso da Academy para
            profissionais de saúde.
          </P>
        </Marco>

        <Marco
          quando="2022 a 2024"
          lado="esq"
          cartao={
            <CartaoFactos
              imagem={fotoLongevity}
              alt="Gráfico do Longevity Med Summit 2024 com Catarina Veiga, Specialist in Microbiome and Integrative Functional Medicine, Portugal"
              titulo="Participações"
              itens={[
                <>
                  IHCAN Magazine, Reino Unido, 2022: artigo sobre estrogénios e microbiota intestinal (o mesmo texto no{" "}
                  <a href="https://web.archive.org/web/20240226203608/https://www.omnos.me/articles/how-oestrogen-can-be-connected-to-the-gut-microbiota-with-test-pairing" target="_blank" rel="noopener noreferrer" className={ligacao}>
                    omnos.me
                  </a>
                  , 12 de agosto de 2022)
                </>,
                "Women, Health & Tech Panel, Omnos, maio de 2022: anfitriã, com Davinia Taylor",
                <>
                  <a href="https://longevitymedsummit.com/catarina-veiga/" target="_blank" rel="noopener noreferrer" className={ligacao}>
                    Longevity Med Summit
                  </a>
                  , Lisboa, 9 de maio de 2024: oradora, sobre condições relacionadas com os estrogénios e a microbiota intestinal
                </>,
                "gcrew.life, 2 de maio de 2024: live sobre como a saúde impacta as nossas conversas",
                <>
                  <a href="https://www.youtube.com/watch?v=8O_Xs66lKF4" target="_blank" rel="noopener noreferrer" className={ligacao}>
                    osteotalks
                  </a>
                  , Osteoform, outubro de 2024: conversa sobre o papel do ritmo circadiano na saúde
                </>,
              ]}
            />
          }
        >
          <P>
            Em 2022 escrevi para a IHCAN Magazine, no Reino Unido, sobre combinar testes hormonais e de microbioma. Em 2024
            fui oradora no Longevity Med Summit, sobre as condições relacionadas com os estrogénios e a microbiota
            intestinal, e dei uma live para a comunidade gcrew.life sobre como a saúde impacta as nossas conversas.
          </P>
        </Marco>

        <Marco
          quando="Artigos · 2022 a 2023"
          lado="dir"
          cartao={
            <CartaoFactos
              titulo="Artigos no omnos.me"
              itens={[
                <Arq url="https://web.archive.org/web/20240226203608/https://www.omnos.me/articles/how-oestrogen-can-be-connected-to-the-gut-microbiota-with-test-pairing">How Oestrogen Can Be Connected to The Gut Microbiota with Test Pairing (2022)</Arq>,
                <Arq url="https://web.archive.org/web/20240226195929/https://www.omnos.me/articles/what-is-the-first-phase-of-detoxification">What is the first phase of detoxification?</Arq>,
                <Arq url="https://web.archive.org/web/20240226200520/https://www.omnos.me/articles/detoxification-phase-2-what-is-conjugation">Detoxification Phase 2: what is Conjugation?</Arq>,
                <Arq url="https://web.archive.org/web/20240522122620/https://www.omnos.me/articles/male-hormones">Male Hormones</Arq>,
              ]}
            />
          }
        >
          <P>
            Escrevi para o site da Omnos sobre hormonas, microbioma e desintoxicação. O artigo sobre estrogénios e
            microbiota intestinal foi o que saiu na IHCAN Magazine. O site já não existe; os textos ficaram no arquivo da
            web.
          </P>
        </Marco>

        <Marco
          quando="Hoje"
          lado="esq"
          cartao={
            <CartaoFactos
              titulo="A minha clínica"
              itens={[
                "Medicina funcional integrativa, em consulta online e em Parede, Cascais",
                "Primeira consulta de 90 minutos",
                "Registered Functional Medicine Practitioner, Regenerus Labs",
                "Registered Practitioner, Nordic Laboratories",
                <>
                  Cédulas profissionais da ACSS n.º C-006754 e 0500786, Lei n.º 71/2013, no{" "}
                  <a href="https://sgps.min-saude.pt/tnc/public-registry" target="_blank" rel="noopener noreferrer" className={ligacao}>
                    registo público
                  </a>
                </>,
              ]}
            />
          }
        >
          <P>
            Por volta dos 40 anos comecei a ter sinais que me faziam sentir que não era eu. Achei que era passageiro. Não
            era. Fui à procura de respostas e fui diagnosticada com TDAH, que se intensificou muito com a entrada na
            perimenopausa.
          </P>
          <P>
            Foi aí que decidi sair do mundo corporativo e abrir a minha prática, online, com pessoas de todo o mundo.
            Continuo a colaborar com algumas instituições, mas quis criar um espaço seguro para mulheres que não têm medo de
            questionar o convencional e procuram respostas mais profundas.
          </P>
        </Marco>
      </div>
    </Container>
  </section>
);

const ForaDoConsultorio = () => (
  <section id="fora" className="bg-v2-paper-deep py-20 md:py-28">
    <Container size="wide">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
        <div className="md:col-span-5">
          <div className={`mx-auto max-w-[440px] overflow-hidden rounded-[1.25rem] aspect-[4/5] ${sombra}`}>
            <img src={fotoRio} alt="Catarina Veiga sentada entre troncos de eucalipto, junto ao rio" loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_60%]" />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <FadeUp>
            <Pill>Fora do consultório</Pill>
            <h2 className="mt-6 font-serif text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.15] text-v2-ink max-w-[22ch]">
              Sou mãe do Alberto, que tem dez anos.
            </h2>
          </FadeUp>
          <div className="mt-7 space-y-5">
            <FadeUp>
              <P>Gosto de serra, de campo e de banhos de rio, de música, de dançar e de viagens sem destino.</P>
            </FadeUp>
            <FadeUp delay={0.06}>
              <P>
                Já passei um mês num retiro num mosteiro, em voto de silêncio, na floresta amazónica. E já fui três semanas à
                Grécia com cinco ou seis vestidos e um par de sandálias, sem nunca ter conhecido Atenas: fui para o norte,
                muito menos conhecido.
              </P>
            </FadeUp>
          </div>
          <FadeUp className="mt-10">
            <div className="max-w-[220px]">
              <CartaoFoto src={fotoGravida} alt="Catarina Veiga grávida, ao espelho, em março de 2016" legenda="À espera do Alberto, 2016" />
            </div>
          </FadeUp>
        </div>
      </div>
    </Container>
  </section>
);

const consultas = [
  "Uma primeira consulta de 90 minutos, online, para ouvir a tua história toda. Antes, recebes um questionário com mais de 100 perguntas e envias as análises que já tens.",
  "Leio as tuas análises em conjunto, biomarcador a biomarcador, e cruzo-as com o que sentes. Quando faz falta, pedimos exames complementares: microbioma, ácidos orgânicos, teste DUTCH.",
  "Sais com um plano à tua medida, de alimentação, suplementos, exercício e regulação do sistema nervoso. Não te peço o impossível, mas o plano mexe sempre a agulha.",
];

const Consultas = () => (
  <section id="consultas" className="bg-v2-sage py-24 md:py-32">
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
  <section className="bg-v2-moss py-24 md:py-32 text-center">
    <Container size="narrow">
      <FadeUp>
        <p className="font-serif italic text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.25] text-v2-paper max-w-[28ch] mx-auto">
          “Um espaço seguro para mulheres que procuram respostas mais profundas.”
        </p>
        <h2 className="mt-10 font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.02] text-v2-paper">Vamos trabalhar juntas?</h2>
        <p className="mt-6 font-sans text-[18px] leading-[1.65] text-v2-paper max-w-[44ch] mx-auto">
          Se te disseram que está tudo normal e continuas sem respostas, podes começar por aqui.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <WCButton href={acuityUrl("sobre-convite")} tone="white">
            Marcar consulta
          </WCButton>
          <a
            href="/avaliacao"
            className="font-sans text-[13px] uppercase tracking-[0.18em] text-v2-paper underline underline-offset-[6px] decoration-v2-paper/40 hover:decoration-v2-paper"
          >
            Autoavaliação gratuita
          </a>
        </div>
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
            jobTitle: "Functional Medicine Practitioner",
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
      </main>
      <FooterV2 />
      <StickyMobileCTA />
    </div>
  </MotionConfig>
);

export default SobreV3;
