import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Quote } from "../ui/Quote";
import { FadeUp } from "../motion/FadeUp";

const testimonials = [
  "Foi a primeira profissional de saúde a realmente olhar para o meu quadro em detalhe. Super metódica e cuidadosa nas análises. O acompanhamento é personalizado e ajustado em função dos sintomas e evolução.",
  "Finalmente consegui que alguém me escutasse, validasse e analisasse os meus sintomas com uma atenção que não tinha encontrado antes. Análises, hábitos, regime alimentar, sono, suplementação — tudo é abordado e trabalhado.",
  "Com o apoio e o conhecimento da Catarina comecei finalmente a olhar para as causas, não só para os sintomas. O maior ganho foi no sono. Hoje durmo melhor, acordo com mais energia e sinto mais equilíbrio no dia a dia.",
];

export const SocialProof = () => (
  <Section bg="paper">
    <Container size="default">
      <FadeUp className="text-center">
        <a
          href="https://www.google.com/maps/place/Catarina+Veiga"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-mono-v2 uppercase tracking-[0.12em] text-v2-ink-mute hover:text-v2-ink transition-colors"
        >
          <span className="text-v2-terracotta">★★★★★</span>
          <span>4,8 · 20 avaliações no Google</span>
        </a>
      </FadeUp>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
        {testimonials.map((t, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <Quote attribution="Paciente · Google Reviews" size="default">
              {t}
            </Quote>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16 text-center" delay={0.2}>
        <p className="font-body text-body-sm-v2 italic text-v2-ink-mute max-w-[60ch] mx-auto leading-[1.55]">
          Excertos de avaliações do Google, transcritos literalmente.
          Experiências subjetivas. Não representam promessa de resultados.
        </p>
      </FadeUp>
    </Container>
  </Section>
);
