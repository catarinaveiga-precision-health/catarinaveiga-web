import { useFadeUp } from "@/hooks/useFadeUp";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GOOGLE_URL =
  "https://www.google.com/maps/place/Catarina+Veiga+%E2%80%93+Medicina+Funcional+Integrativa+%7C+Parede,+Cascais/";

const reviews = [
  {
    quote:
      "Estou a ser acompanhada pela Catarina vai fazer um ano e posso dizer que tem sido dos melhores investimentos que já fiz. A Catarina é super metódica e cuidadosa nas análises que faz e o acompanhamento é personalizado e ajustado de x em x tempo em função dos sintomas e evolução. Foi a primeira profissional de saúde a realmente olhar para o meu quadro em detalhe. A Catarina, para além de ser uma excelente profissional, também é uma pessoa super simpática, acessível, com a qual é possível estabelecer uma relação de confiança, proximidade e apoio. Nunca me sinto como sendo mais uma. Recomendo mesmo muito trabalharem com a Catarina, principalmente se não encontram respostas nos sistemas convencionais.",
    name: "Cláudia Soeiros",
  },
  {
    quote:
      "Não podia estar mais satisfeita. Finalmente consegui que alguém me escutasse. A Catarina escutou, validou e analisou todos os meus sintomas com uma atenção que não tinha encontrado antes. Estamos em processo de acompanhamento, mas muitos aspetos já foram esclarecidos. Análises, hábitos, regime alimentar, sono, suplementação — tudo é abordado e trabalhado em consulta. Recomendo a todas que se sintam perdidas e cujos sintomas condicionem o dia a dia. Precisamos de mais Catarinas neste mundo.",
    name: "Alexandra Fernandes",
  },
  {
    quote:
      "Durante muitos anos senti-me cansada, com o sono desregulado e sem perceber o que se passava no meu corpo. Foram anos exigentes de uma condição autoimune complexa. Com o apoio e o conhecimento da Catarina, comecei finalmente a olhar para as causas, não só para os sintomas. O maior ganho foi no sono. Hoje durmo melhor, acordo com mais energia e sinto mais equilíbrio no dia a dia. A Catarina está a ajudar-me a completar 'peças fundamentais do meu puzzle'. Obrigada, Catarina.",
    name: "Ângela Lourenço",
  },
];

const GoogleReviews = () => {
  const ref = useFadeUp();
  const { lang } = useLanguage();
  const badgeText =
    lang === "en" ? "4.8 ★ · 20 reviews on Google" : "4,8 ★ · 20 avaliações no Google";
  const seeAll = lang === "en" ? "See all 20 reviews on Google →" : "Ver as 20 avaliações no Google →";
  const disclaimer =
    lang === "en"
      ? "Subjective experience. Does not represent a promise of results."
      : "Experiência subjetiva. Não representa promessa de resultados.";

  return (
    <section ref={ref} className="bg-muted section-padding">
      <div className="max-w-4xl mx-auto text-center px-6">
        <a
          href={GOOGLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fade-up inline-flex flex-col items-center gap-3 group mb-14"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber text-amber" />
            ))}
          </div>
          <p className="label-uppercase text-muted-foreground text-[11px] group-hover:text-foreground transition-colors">
            {badgeText}
          </p>
        </a>

        <div className="space-y-12 md:space-y-16 text-left max-w-3xl mx-auto">
          {reviews.map((r) => (
            <blockquote key={r.name} className="fade-up">
              <p className="font-serif italic text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.7] text-foreground/90 mb-4">
                &ldquo;{r.quote}&rdquo;
              </p>
              <footer className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                — {r.name}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-14">
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors border-b border-amber pb-1"
          >
            {seeAll}
          </a>
        </div>

        <p className="font-sans text-[12px] italic text-muted-foreground/70 mt-10 max-w-[50ch] mx-auto">
          {disclaimer}
        </p>
      </div>
    </section>
  );
};

export default GoogleReviews;
