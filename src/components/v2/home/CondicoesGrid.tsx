import { Link } from "react-router-dom";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/* Grelha de condições como portas de entrada, o mecanismo central da
   homepage da Parsley ("Symptoms and conditions we treat at the root"):
   cada condição nomeia os sintomas na voz da paciente e liga à página
   que o site já tem sobre o tema. Responde à pergunta "ela trata o que
   EU tenho?" e desfaz a ideia de que isto é só leitura de análises. */

const condicoes = [
  {
    nome: "Fadiga persistente",
    sintomas:
      "Cansaço que não passa com sono, energia a desaparecer a meio da tarde, ouvir que é do stress.",
    href: "/fadiga-exames-normais",
  },
  {
    nome: "Tiroide",
    sintomas:
      "TSH dentro da referência mas com sintomas: frio, queda de cabelo, metabolismo lento, névoa mental.",
    href: "/tsh-normal-mas-com-sintomas",
  },
  {
    nome: "Ferro e ferritina",
    sintomas:
      "Ferritina baixa com hemoglobina normal, cansaço, falta de ar a subir escadas, cabelo e unhas frágeis.",
    href: "/ferritina-baixa-sintomas",
  },
  {
    nome: "Perimenopausa",
    sintomas:
      "Acordar às 4 da manhã, ciclos a mudar, ansiedade que não existia, calores, memória que falha.",
    href: "/blog/acordar-as-4-da-manha-perimenopausa",
  },
  {
    nome: "Hormonas e ciclo",
    sintomas:
      "SPM que piorou, fase lútea difícil, seios sensíveis, sono frágil na semana antes do período.",
    href: "/blog/progesterona-baixa-sintomas-fase-lutea",
  },
  {
    nome: "Metabolismo e insulina",
    sintomas:
      "Peso que não mexe apesar do esforço, fome pouco depois de comer, glicemia normal mas algo não bate certo.",
    href: "/insulina-jejum-o-que-significa",
  },
  {
    nome: "Digestão",
    sintomas:
      "Inchaço ao fim do dia, intestino preso, sensibilidade a comidas que antes não davam problema.",
    href: "/blog/intestino-preso-nao-e-um-problema-de-fibra-e-um-problema-hormonal",
  },
  {
    nome: "Sintomas sem explicação",
    sintomas:
      "Vários sintomas ao mesmo tempo, exames repetidamente normais, e ninguém a ligar as peças.",
    href: "/exames-normais-mas-sintomas",
  },
];

export const CondicoesGrid = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp>
        <Eyebrow>O que acompanho</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[24ch]">
          Sintomas com nome, tratados na raiz.
        </h2>
        <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.55] max-w-[52ch]">
          Quase tudo isto costuma chegar com a mesma frase: "os exames
          estão normais". Cada tema tem uma página onde explico como o
          abordo.
        </p>
      </FadeUp>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-v2-paper-line border border-v2-paper-line">
        {condicoes.map((c, i) => (
          <FadeUp key={c.nome} delay={(i % 4) * 0.06} className="h-full">
            <Link
              to={c.href}
              className="group flex flex-col h-full bg-v2-paper px-7 py-8 transition-colors hover:bg-white"
            >
              <h3 className="font-serif text-h3-v2 text-v2-ink leading-[1.25]">
                {c.nome}
              </h3>
              <p className="mt-4 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.6] flex-1">
                {c.sintomas}
              </p>
              <span className="mt-6 font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage group-hover:text-v2-sage-deep transition-colors">
                Como abordo ›
              </span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
