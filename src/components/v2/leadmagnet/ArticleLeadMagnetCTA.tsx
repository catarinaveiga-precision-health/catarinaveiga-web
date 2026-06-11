import { Link } from "react-router-dom";
import { GUIA_LANDING_URL } from "@/lib/leadMagnet";

/* Bloco de captura no final de artigos do blog e páginas educativas. */

export const ArticleLeadMagnetCTA = () => (
  <aside className="bg-v2-paper-deep border border-v2-paper-line px-8 py-12 md:px-12 md:py-14 my-16 text-center">
    <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
      Guia gratuito
    </p>
    <h2 className="mt-5 font-serif text-h2-v2 text-v2-ink leading-[1.2] tracking-[-0.01em] max-w-[26ch] mx-auto">
      Ainda sente fome pouco depois de comer?
    </h2>
    <p className="mt-6 font-sans text-body-v2 text-v2-ink-mute leading-[1.65] max-w-[48ch] mx-auto">
      Receba gratuitamente o guia com explicação clínica + 29 receitas
      ricas em proteína.
    </p>
    <div className="mt-9">
      <Link
        to={GUIA_LANDING_URL}
        className="inline-flex items-center justify-center font-sans text-body-sm-v2 uppercase tracking-[0.12em] bg-v2-golden text-v2-paper hover:bg-v2-golden-deep px-8 py-4 transition-colors"
      >
        Receber o guia
      </Link>
    </div>
  </aside>
);
