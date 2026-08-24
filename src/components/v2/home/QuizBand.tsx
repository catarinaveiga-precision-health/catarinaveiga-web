import { Link } from "react-router-dom";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeUp } from "../motion/FadeUp";

/* A porta de baixo compromisso, em destaque (decisão da Catarina,
   2026-08-24). A regra da CTA única evolui para hierarquia por
   prontidão: a consulta continua a ser a oferta dominante (botões
   dourados), e a autoavaliação apanha quem ainda não está pronta
   para 120 EUR, que é a maioria do tráfego. Evidência: a concorrente
   com melhor conversão tem o quiz dela duas vezes na homepage, e a
   /avaliacao da Catarina converteu um pedido de consulta num domingo
   à meia-noite, partida e sem promoção nenhuma.
   Botão em sage, não em dourado: destacado, mas hierarquicamente
   abaixo da marcação. */

export const QuizBand = () => (
  <Section bg="paper-deep" tight>
    <Container size="prose">
      <FadeUp>
        <div className="rounded-3xl bg-white ring-1 ring-v2-sage/30 shadow-[0_28px_60px_-30px_rgba(22,53,44,0.45)] px-8 py-12 md:px-14 md:py-14 text-center">
          <p className="font-sans text-mono-v2 uppercase tracking-[0.16em] text-v2-sage">
            Autoavaliação gratuita · 2 minutos
          </p>
          <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] text-balance">
            Ainda não tens a certeza? Começa pelos teus valores.
          </h2>
          <p className="mt-6 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.6] max-w-[52ch] mx-auto">
            Mais de 15 biomarcadores analisados numa autoavaliação
            educativa, com a interpretação no ecrã. Ficas a saber que
            padrões investigar, sem custo e sem marcares nada.
          </p>
          <div className="mt-10">
            <Link
              to="/avaliacao"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-v2-sage text-white px-9 py-5 font-sans text-body-v2 uppercase tracking-[0.12em] shadow-[0_10px_28px_-10px_rgba(74,89,87,0.55)] transition-[background-color,box-shadow,transform] hover:bg-v2-sage-deep hover:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-v2-ink/40 focus-visible:ring-offset-2"
            >
              Fazer a autoavaliação
              <span aria-hidden>›</span>
            </Link>
          </div>
          <p className="mt-5 font-sans text-body-sm-v2 text-v2-ink-mute/80">
            Educativa, não substitui avaliação clínica. Podes levá-la à
            consulta, comigo ou com o teu médico.
          </p>
        </div>
      </FadeUp>
    </Container>
  </Section>
);
