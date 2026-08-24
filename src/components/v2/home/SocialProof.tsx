import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeUp } from "../motion/FadeUp";

/* Testemunhos em formato documental (estilo Google Review):
   cartão branco, estrelas, inicial em selo e nome da autora.
   Excertos LITERAIS e contíguos das avaliações públicas (fonte:
   src/data/testemunhos.json), com […] a marcar cortes. Ortografia
   original preservada: é isso que os torna verificáveis no Google.
   O estudo das 3000 landing pages aponta testemunhos identificados
   como um dos elementos do grupo que converte acima de 2%. */

const testimonials = [
  {
    initial: "C",
    author: "Claudia Soeiro",
    text: "A catarina é super metódica e cuidadosa nas analises que faz e todos os tratamentos são personalizados e ajustados de x em x tempo em função dos sintomas, resultados e evolução. Foi o primeiro profissional de saude a realmente olhar o meu quadro clinico em detalhe […]",
  },
  {
    initial: "A",
    author: "Alexandra Fernandes",
    text: "A Dra. Catarina escutou, validou, avaliou e analisou todos os meus sintomas como mais nenhum médico foi capaz de fazer. […] Recomendo a todos que se sintam perdidos, não validados e cujos sintomas de saúde física e mental condicionem o dia a dia.",
  },
  {
    initial: "Â",
    author: "Ângela Lourenço",
    text: "Com o apoio e o conhecimento da Catarina, comecei finalmente a olhar para as causas, não só para os sintomas. O maior ganho foi no sono. Hoje durmo melhor, acordo com mais energia e sinto mais equilíbrio no dia a dia.",
  },
];

export const SocialProof = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp className="text-center">
        <a
          href="https://www.google.com/maps/place/Catarina+Veiga"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-sans text-mono-v2 uppercase tracking-[0.12em] text-v2-ink-mute hover:text-v2-ink transition-colors"
        >
          <span className="text-v2-golden">★★★★★</span>
          <span>4,8 · 21 avaliações no Google</span>
        </a>
      </FadeUp>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
        {testimonials.map((t, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <article className="bg-white border border-v2-paper-line px-8 py-9 shadow-[0_14px_36px_-16px_rgba(31,36,34,0.18)] h-full">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-v2-paper-deep border border-v2-paper-line flex items-center justify-center font-serif text-[17px] text-v2-ink-mute">
                  {t.initial}
                </span>
                <span className="font-sans text-[12px] tracking-[0.04em] text-v2-golden">
                  ★★★★★
                </span>
              </div>
              <p className="mt-6 font-sans text-body-sm-v2 text-v2-ink leading-[1.7]">
                "{t.text}"
              </p>
              <p className="mt-6 pt-5 border-t border-v2-paper-line font-sans text-[10px] uppercase tracking-[0.16em] text-v2-ink-mute/80">
                {t.author} · Google Reviews
              </p>
            </article>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-14 text-center" delay={0.2}>
        <p className="font-sans text-body-sm-v2 italic text-v2-ink-mute max-w-[60ch] mx-auto leading-[1.55]">
          Excertos de avaliações do Google, transcritos literalmente.
          Experiências subjetivas. Não representam promessa de resultados.
        </p>
      </FadeUp>
    </Container>
  </Section>
);
