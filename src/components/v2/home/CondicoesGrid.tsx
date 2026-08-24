import { Link } from "react-router-dom";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

import imgFadiga from "@/assets/condicoes/fadiga.jpg";
import imgTiroide from "@/assets/condicoes/tiroide.jpg";
import imgFerro from "@/assets/condicoes/ferro.jpg";
import imgPerimenopausa from "@/assets/condicoes/perimenopausa.jpg";
import imgCiclo from "@/assets/condicoes/ciclo.jpg";
import imgMetabolismo from "@/assets/condicoes/metabolismo.jpg";
import imgDigestao from "@/assets/condicoes/digestao.jpg";
import imgExames from "@/assets/condicoes/exames.jpg";

/* Terceira forma desta secção (2026-08-24), decalcada do desenho real da
   "Symptoms and conditions we treat at the root" da Parsley: cartões
   brancos com fotografia circular no topo, sintomas em texto pequeno e
   link próprio, mais o marquee de sintomas por baixo. Adaptações ao
   sistema da casa: cartões retos (não arredondados), serif nos nomes,
   losango ◆ como separador do marquee, tudo na paleta híbrida.

   As fotografias são still-life geradas em série com a mesma luz e
   paleta para consistência; substituíveis um-para-um por fotografia
   real quando houver sessão. Em mobile a grelha vira carrossel com
   scroll-snap, como na referência. */

const condicoes = [
  {
    nome: "Fadiga persistente",
    img: imgFadiga,
    alt: "Cama de linho desfeita com luz de manhã e uma chávena de chá",
    sintomas:
      "Cansaço que não passa com sono, energia a desaparecer a meio da tarde, ouvir que é do stress.",
    href: "/fadiga-exames-normais",
  },
  {
    nome: "Tiroide",
    img: imgTiroide,
    alt: "Cachecol de lã dobrado ao lado de uma chávena de chá quente",
    sintomas:
      "TSH dentro da referência mas com sintomas: frio, queda de cabelo, metabolismo lento, névoa mental.",
    href: "/tsh-normal-mas-com-sintomas",
  },
  {
    nome: "Ferro e ferritina",
    img: imgFerro,
    alt: "Folhas verdes escuras e lentilhas numa taça de cerâmica",
    sintomas:
      "Ferritina baixa com hemoglobina normal, falta de ar a subir escadas, cabelo e unhas frágeis.",
    href: "/ferritina-baixa-sintomas",
  },
  {
    nome: "Perimenopausa",
    img: imgPerimenopausa,
    alt: "Despertador analógico a marcar as quatro na mesa de cabeceira",
    sintomas:
      "Acordar às 4 da manhã, ciclos a mudar, ansiedade que não existia, calores, memória que falha.",
    href: "/blog/acordar-as-4-da-manha-perimenopausa",
  },
  {
    nome: "Hormonas e ciclo",
    img: imgCiclo,
    alt: "Diário aberto com caneta e um cartão com as fases da lua",
    sintomas:
      "SPM que piorou, fase lútea difícil, seios sensíveis, sono frágil na semana antes do período.",
    href: "/blog/progesterona-baixa-sintomas-fase-lutea",
  },
  {
    nome: "Metabolismo e insulina",
    img: imgMetabolismo,
    alt: "Prato de pequeno-almoço equilibrado com ovos e verduras",
    sintomas:
      "Peso que não mexe apesar do esforço, fome pouco depois de comer, glicemia normal mas algo não bate certo.",
    href: "/insulina-jejum-o-que-significa",
  },
  {
    nome: "Digestão",
    img: imgDigestao,
    alt: "Chá de hortelã e um copo de kefir numa mesa de madeira clara",
    sintomas:
      "Inchaço ao fim do dia, intestino preso, sensibilidade a comidas que antes não davam problema.",
    href: "/blog/intestino-preso-nao-e-um-problema-de-fibra-e-um-problema-hormonal",
  },
  {
    nome: "Sintomas sem explicação",
    img: imgExames,
    alt: "Folhas de análises impressas com óculos de leitura e caneta",
    sintomas:
      "Vários sintomas ao mesmo tempo, exames repetidamente normais, e ninguém a ligar as peças.",
    href: "/exames-normais-mas-sintomas",
  },
];

const sintomasMarquee = [
  "Cansaço constante",
  "Acordar às 4h",
  "Névoa mental",
  "Queda de cabelo",
  "Ferritina baixa",
  "TSH “normal”",
  "Inchaço",
  "SPM",
  "Peso resistente",
  "Sono frágil",
  "Ansiedade nova",
  "Frio constante",
  "Fome pouco depois de comer",
  "Intestino preso",
  "Ciclos irregulares",
  "Calores",
];

export const CondicoesGrid = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp className="max-w-[62ch]">
        <Eyebrow>O que acompanho</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
          Sintomas com nome, tratados na raiz.
        </h2>
        <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.55]">
          Quase tudo isto costuma chegar com a mesma frase: "os exames
          estão normais". Cada tema tem uma página onde explico como o
          abordo.
        </p>
      </FadeUp>
    </Container>

    {/* grelha em desktop, carrossel com snap em mobile */}
    <Container size="wide" className="mt-14">
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {condicoes.map((c, i) => (
          <FadeUp
            key={c.nome}
            delay={(i % 4) * 0.06}
            className="snap-start shrink-0 w-[78vw] max-w-[300px] lg:w-auto lg:max-w-none"
          >
            <Link
              to={c.href}
              className="group flex flex-col h-full rounded-2xl bg-white border border-v2-paper-line px-7 pt-8 pb-7 shadow-[0_14px_36px_-20px_rgba(22,53,44,0.35)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_24px_48px_-18px_rgba(22,53,44,0.5)] hover:-translate-y-1"
            >
              <span className="block w-24 h-24 rounded-full overflow-hidden ring-1 ring-v2-paper-line">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <h3 className="mt-6 font-serif text-h3-v2 text-v2-ink leading-[1.25]">
                {c.nome}
              </h3>
              <p className="mt-3 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.6] flex-1">
                {c.sintomas}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage-deep border-b border-v2-sage/40 self-start pb-1 transition-colors group-hover:text-v2-ink group-hover:border-v2-ink">
                Como abordo
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  ›
                </span>
              </span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </Container>

    {/* marquee de sintomas, o gesto da Parsley por baixo da grelha */}
    <div
      aria-hidden
      className="mt-14 border-y border-v2-paper-line py-5 overflow-hidden"
    >
      <div className="flex w-max gap-8 animate-marquee [animation-duration:60s] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center">
        {[0, 1].map((metade) => (
          <div key={metade} className="flex gap-8 items-center">
            {sintomasMarquee.map((s) => (
              <span
                key={`${metade}-${s}`}
                className="flex items-center gap-8 font-sans text-[13px] tracking-[0.04em] text-v2-ink-mute whitespace-nowrap"
              >
                {s}
                <span className="text-v2-sage text-[8px]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </Section>
);
