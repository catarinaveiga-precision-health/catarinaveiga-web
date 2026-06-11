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
import guiaCapa from "@/assets/guia-capa.jpg";

/* Popup global do guia de saciedade.
   Dispara aos 45 s OU aos 50% de scroll (o que ocorrer primeiro).
   Mostra no máximo uma vez por 7 dias (localStorage), nunca a quem
   já subscreveu, e nunca na própria landing /guia-saciedade.
   Layout: capa do PDF como âncora visual (40%) + conteúdo (60%).
   Em mobile: imagem → copy → formulário. */

const beneficios = [
  "Explicação simples da fisiologia da saciedade",
  "Os erros mais comuns que aumentam a fome",
  "Estratégias práticas para energia e controlo alimentar",
  "29 receitas ricas em proteína",
];

const Check = () => (
  <span
    aria-hidden
    className="shrink-0 mt-[2px] w-5 h-5 rounded-full bg-[rgba(113,130,129,0.16)] text-v2-sage-deep flex items-center justify-center text-[11px] leading-none"
  >
    ✓
  </span>
);

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
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Guia gratuito"
    >
      {/* Overlay escuro com blur: separação clara da página */}
      <div
        className="absolute inset-0 bg-[rgba(31,36,34,0.66)] backdrop-blur-[2px]"
        onClick={close}
        aria-hidden
      />

      {/* Cartão: branco elevado, sombra profunda */}
      <div className="relative w-full max-w-[720px] bg-white shadow-[0_32px_80px_-12px_rgba(31,36,34,0.45)] ring-1 ring-[rgba(31,36,34,0.12)] max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center font-sans text-xl leading-none text-v2-ink bg-white border border-v2-paper-line rounded-full shadow-sm hover:bg-v2-paper transition-colors"
        >
          ×
        </button>

        {done ? (
          <div className="px-8 py-14 md:px-16 md:py-16 text-center">
            <p className="font-serif text-h2-v2 text-v2-ink leading-[1.2]">
              O guia está pronto para si.
            </p>
            <p className="mt-4 font-sans text-body-v2 text-v2-ink-mute leading-[1.65]">
              Pode descarregá-lo já:
            </p>
            <div className="mt-9">
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
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Capa do PDF · âncora visual · 40% */}
            <div className="md:col-span-2 relative bg-v2-moss">
              <img
                src={guiaCapa}
                alt='Capa do guia "Tens fome pouco depois de comer?"'
                className="w-full h-28 md:h-full object-cover object-top md:object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-[rgba(31,36,34,0.1)]"
              />
            </div>

            {/* Conteúdo · 60% */}
            <div className="md:col-span-3 px-6 py-7 md:px-8 md:py-8">
              <p className="font-sans text-mono-v2 uppercase tracking-[0.16em] text-v2-sage">
                Guia gratuito
              </p>
              <h2 className="mt-3 font-serif text-h3-v2 md:text-[26px] text-v2-ink leading-[1.18] tracking-[-0.01em]">
                Tem fome pouco depois de comer?
              </h2>
              <p className="mt-3 font-serif italic text-[16px] text-v2-ink leading-[1.45]">
                Receba o guia completo e descubra porque continua com fome
                pouco depois de comer.
              </p>

              <ul className="mt-5 space-y-2">
                {beneficios.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 font-sans text-[13px] text-v2-ink leading-[1.45]"
                  >
                    <Check />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={submit} className="mt-6 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    required
                    className="w-full bg-v2-paper border border-v2-paper-line px-4 py-3 font-sans text-[14px] text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full bg-v2-paper border border-v2-paper-line px-4 py-3 font-sans text-[14px] text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
                  />
                </div>
                {error && (
                  <p className="font-sans text-body-sm-v2 text-v2-brick">
                    {error}
                  </p>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
