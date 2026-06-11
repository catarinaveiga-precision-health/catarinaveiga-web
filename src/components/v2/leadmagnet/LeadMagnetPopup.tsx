import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  submitGuiaSaciedade,
  isDone,
  isDismissedRecently,
  markDismissed,
  GUIA_PDF_URL,
  GUIA_LANDING_URL,
} from "@/lib/leadMagnet";
import { ButtonV2 } from "../ui/ButtonV2";

/* Popup global do guia de saciedade.
   Dispara aos 45 s OU aos 50% de scroll (o que ocorrer primeiro).
   Mostra no máximo uma vez por 7 dias (localStorage), nunca a quem
   já subscreveu, e nunca na própria landing /guia-saciedade. */

const beneficios = [
  "explicação simples da fisiologia da saciedade",
  "os erros mais comuns que aumentam a fome",
  "estratégias práticas para aumentar energia e controlo alimentar",
  "29 receitas ricas em proteína",
];

export const LeadMagnetPopup = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggered = useRef(false);

  const blocked =
    location.pathname === GUIA_LANDING_URL || isDone() || isDismissedRecently();

  useEffect(() => {
    if (blocked || triggered.current) return;

    const show = () => {
      if (triggered.current) return;
      triggered.current = true;
      setVisible(true);
    };

    const timer = window.setTimeout(show, 45_000);

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total >= 0.5) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [blocked]);

  const close = () => {
    markDismissed();
    setVisible(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const r = await submitGuiaSaciedade(nome, email, "popup");
    setSaving(false);
    if (!r.ok) {
      setError(r.error || "Erro ao guardar. Tenta novamente.");
      return;
    }
    setDone(true);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Guia gratuito"
    >
      <div
        className="absolute inset-0 bg-v2-ink/50"
        onClick={close}
        aria-hidden
      />
      <div className="relative w-full max-w-[520px] bg-v2-paper border border-v2-paper-line shadow-xl px-8 py-10 md:px-12 md:py-12 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center font-sans text-xl text-v2-ink-mute hover:text-v2-ink transition-colors"
        >
          ×
        </button>

        {done ? (
          <div className="text-center py-6">
            <p className="font-serif text-h3-v2 text-v2-ink leading-[1.3]">
              O guia está pronto para si.
            </p>
            <p className="mt-4 font-sans text-body-v2 text-v2-ink-mute leading-[1.65]">
              Pode descarregá-lo já:
            </p>
            <div className="mt-8">
              <ButtonV2
                as="a"
                href={GUIA_PDF_URL}
                target="_blank"
                rel="noopener"
                size="lg"
              >
                Descarregar o guia
              </ButtonV2>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
              Tem fome pouco depois de comer?
            </h2>
            <p className="mt-5 font-sans text-body-v2 text-v2-ink-mute leading-[1.65]">
              Se está constantemente a pensar em comida, a petiscar ao longo
              do dia ou com energia instável, talvez o problema não seja
              falta de disciplina.
            </p>
            <p className="mt-5 font-sans text-body-v2 text-v2-ink leading-[1.65]">
              Receba gratuitamente o guia:
              <span className="block mt-1 font-serif italic text-body-lg-v2">
                "Porque tem fome pouco depois de comer?"
              </span>
            </p>

            <ul className="mt-6 space-y-2">
              {beneficios.map((b) => (
                <li
                  key={b}
                  className="font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.55] pl-5 relative"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.65em] w-2.5 h-px bg-v2-sage"
                  />
                  {b}
                </li>
              ))}
            </ul>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                required
                className="w-full bg-transparent border-b border-v2-paper-line py-3 font-sans text-body-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-transparent border-b border-v2-paper-line py-3 font-sans text-body-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
              />
              {error && (
                <p className="font-sans text-body-sm-v2 text-v2-brick">{error}</p>
              )}
              <ButtonV2
                type="submit"
                size="lg"
                className="w-full"
                disabled={saving}
              >
                {saving ? "A enviar..." : "Quero receber o guia"}
              </ButtonV2>
              <p className="font-sans text-[11px] text-v2-ink-mute/70 text-center">
                Sem spam. Pode cancelar a qualquer momento.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
