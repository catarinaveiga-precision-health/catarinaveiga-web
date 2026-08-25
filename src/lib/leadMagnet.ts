import { supabase } from "@/integrations/supabase/client";
import { notificarLead } from "@/lib/notificarLead";

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

  // Notificar sempre, mesmo que o Supabase falhe: o lead nao se perde.
  notificarLead({
    nome: cleanNome,
    email: cleanEmail,
    origem: `guia-saciedade (${origem})`,
    notas: error ? "NOTA: a gravacao na base de dados falhou; este lead so existe aqui." : "",
  });

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

/* ── Segundo lead magnet · Guia "Achas que tens insónia. Não tens." ──
   Higiene de Sono · Edição I (Ciência Fêmea), 18 páginas, protocolo de
   reset circadiano de 4 semanas. Destinado à porta de pesquisa nº 1
   (artigo das 4h, +186% cliques no GSC de 2026-08-25) e ao pilar
   /perimenopausa-sintomas. Mesmo pipeline do guia da saciedade. */

export const GUIA_SONO_TAG = "lead-magnet-guia-sono";
export const GUIA_SONO_PDF_URL = "/guia-sono.pdf";
export const GUIA_SONO_LANDING_URL = "/guia-sono";

export async function submitGuiaSono(
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
      objetivos: [GUIA_SONO_TAG, `origem:${origem}`],
      follow_up_sent: true,
    } as any,
  ]);

  notificarLead({
    nome: cleanNome,
    email: cleanEmail,
    origem: `guia-sono (${origem})`,
    notas: error ? "NOTA: a gravacao na base de dados falhou; este lead so existe aqui." : "",
  });

  if (error) {
    console.error("leadMagnet guia-sono submit error", error);
    return { ok: false, error: "Erro ao guardar. Tenta novamente." };
  }

  return { ok: true };
}
