import { Link } from "react-router-dom";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/* Índice clínico editorial. Redesenho de 2026-08-24: a primeira versão
   era uma grelha 4x2 de caixas iguais e lia-se como uma tabela de
   widgets. Passa a lista editorial em duas colunas, cada condição uma
   entrada de índice: numeração pequena, nome em serif grande, sintomas
   em itálico como voz da paciente, linha fina a separar. O mecanismo da
   Parsley ("conditions we treat" com portas de entrada) mantém-se; a
   forma passa a ser a da página, editorial e não SaaS. */

const condicoes = [
  {
    nome: "Fadiga persistente",
    sintomas:
      "cansaço que não passa com sono, energia a desaparecer a meio da tarde, ouvir que é do stress",
    href: "/fadiga-exames-normais",
  },
  {
    nome: "Tiroide",
    sintomas:
      "TSH dentro da referência mas com sintomas: frio, queda de cabelo, metabolismo lento, névoa mental",
    href: "/tsh-normal-mas-com-sintomas",
  },
  {
    nome: "Ferro e ferritina",
    sintomas:
      "ferritina baixa com hemoglobina normal, falta de ar a subir escadas, cabelo e unhas frágeis",
    href: "/ferritina-baixa-sintomas",
  },
  {
    nome: "Perimenopausa",
    sintomas:
      "acordar às 4 da manhã, ciclos a mudar, ansiedade que não existia, calores, memória que falha",
    href: "/blog/acordar-as-4-da-manha-perimenopausa",
  },
  {
    nome: "Hormonas e ciclo",
    sintomas:
      "SPM que piorou, fase lútea difícil, seios sensíveis, sono frágil na semana antes do período",
    href: "/blog/progesterona-baixa-sintomas-fase-lutea",
  },
  {
    nome: "Metabolismo e insulina",
    sintomas:
      "peso que não mexe apesar do esforço, fome pouco depois de comer, glicemia normal mas algo não bate certo",
    href: "/insulina-jejum-o-que-significa",
  },
  {
    nome: "Digestão",
    sintomas:
      "inchaço ao fim do dia, intestino preso, sensibilidade a comidas que antes não davam problema",
    href: "/blog/intestino-preso-nao-e-um-problema-de-fibra-e-um-problema-hormonal",
  },
  {
    nome: "Sintomas sem explicação",
    sintomas:
      "vários sintomas ao mesmo tempo, exames repetidamente normais, e ninguém a ligar as peças",
    href: "/exames-normais-mas-sintomas",
  },
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

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-20 border-t border-[rgba(31,36,34,0.15)]">
        {condicoes.map((c, i) => (
          <FadeUp key={c.nome} delay={(i % 2) * 0.06}>
            <Link
              to={c.href}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-8 border-b border-[rgba(31,36,34,0.15)]"
            >
              <span
                aria-hidden
                className="font-sans text-mono-v2 tabular-nums text-v2-sage"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-serif text-[clamp(1.5rem,2.2vw,1.9rem)] text-v2-ink leading-[1.2] tracking-[-0.01em] transition-colors group-hover:text-v2-sage-deep">
                  {c.nome}
                </span>
                <span className="mt-2.5 block font-serif italic text-[15px] text-v2-ink-mute leading-[1.55] max-w-[46ch]">
                  {c.sintomas}
                </span>
              </span>
              <span
                aria-hidden
                className="font-serif text-[1.4rem] text-v2-sage self-center transition-transform duration-300 group-hover:translate-x-1.5"
              >
                ›
              </span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
