import { useState } from "react";
import { Link } from "react-router-dom";
import { GUIA_LANDING_URL, isDone } from "@/lib/leadMagnet";

/* Barra discreta no topo do site, acima da navegação.
   Dismissible por sessão; não aparece a quem já subscreveu. */

const HIDE_KEY = "lm_guia_topbar_hidden";

export const LeadMagnetTopBar = () => {
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem(HIDE_KEY) === "1" || isDone();
    } catch {
      return false;
    }
  });

  if (hidden) return null;

  const hide = () => {
    try {
      sessionStorage.setItem(HIDE_KEY, "1");
    } catch {
      /* ignorar */
    }
    setHidden(true);
  };

  return (
    <div className="bg-v2-moss text-v2-paper">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12 h-10 flex items-center justify-center gap-3 relative">
        <p className="font-sans text-[12px] md:text-[13px] tracking-[0.02em] truncate">
          <span className="hidden sm:inline">Guia gratuito: </span>
          Porque tem fome pouco depois de comer?
        </p>
        <Link
          to={GUIA_LANDING_URL}
          className="font-sans text-[12px] md:text-[13px] uppercase tracking-[0.1em] underline underline-offset-4 decoration-v2-paper/40 hover:decoration-v2-paper transition-colors shrink-0"
        >
          Receber ›
        </Link>
        <button
          type="button"
          onClick={hide}
          aria-label="Fechar barra"
          className="absolute right-2 md:right-4 w-8 h-8 flex items-center justify-center text-v2-paper/60 hover:text-v2-paper transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};
