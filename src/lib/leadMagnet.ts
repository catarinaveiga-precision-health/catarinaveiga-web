import { supabase } from "@/integrations/supabase/client";

/* ─────────────────────────────────────────────────────────────────
   Lead magnet · Guia "Tens fome pouco depois de comer?"
   Ponto único de captura para popup, barra, landing e CTAs de artigo.

   Persistência actual: tabela leads_avaliacao (sistema existente),
   com marcador objetivos = [LEAD_MAGNET_TAG] para segmentação.
   follow_up_sent = true impede o email de 48h da leitura funcional
   (não se aplica a estas leads).

   Ligação a email marketing: trocar apenas o corpo de
   submitGuiaSaciedade quando a automação existir. A interface
   (nome, email, origem) mantém-se.
───────────────────────────────────────────────────────────────── */

export const LEAD_MAGNET_TAG = "lead-magnet-guia-saciedade";
export const GUIA_PDF_URL = "/guia-saciedade.pdf";
export const GUIA_LANDING_URL = "/guia-saciedade";

const DONE_KEY = "lm_guia_done";
const DISMISSED_KEY = "lm_guia_dismissed_at";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export type LeadMagnetOrigem =
  | "popup"
  | "topbar"
  | "landing"
  | "artigo";

export async function submitGuiaSaciedade(
  nome: string,
  email: string,
  origem: LeadMagnetOrigem,
): Promise<{ ok: boolean; error?: string }> {
  const cleanNome = nome.trim();
  const cleanEmail = email.trim();

  if (!cleanNome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { ok: false, error: "Nome e email válido são obrigatórios." };
  }

  const { error } = await supabase.from("leads_avaliacao").insert([
    {
      nome: cleanNome,
      email: cleanEmail,
      objetivos: [LEAD_MAGNET_TAG, `origem:${origem}`],
      follow_up_sent: true,
    } as any,
  ]);

  if (error) {
    console.error("leadMagnet submit error", error);
    return { ok: false, error: "Erro ao guardar. Tenta novamente." };
  }

  markDone();
  return { ok: true };
}

/* ── Estado local (frequência do popup) ── */

export function markDone() {
  try {
    localStorage.setItem(DONE_KEY, "1");
  } catch {
    /* storage indisponível: ignorar */
  }
}

export function isDone(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    /* ignorar */
  }
}

export function isDismissedRecently(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISSED_KEY) || 0);
    return at > 0 && Date.now() - at < SEVEN_DAYS_MS;
  } catch {
    return false;
  }
}
