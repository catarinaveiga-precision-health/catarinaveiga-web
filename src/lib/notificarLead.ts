/* ─────────────────────────────────────────────────────────────────
   Notificação de leads · Google Apps Script

   Cada lead capturado no site é enviado TAMBÉM para um recetor no
   Google da Catarina, que grava numa folha de cálculo ("Leads
   catarinaveiga.com") e envia email para info@catarinaveiga.com.

   Isto NÃO substitui a gravação no Supabase: é um segundo caminho,
   para que um lead nunca se perca se o outro falhar (e porque o
   acesso de leitura ao Supabase do site está, à data, indisponível).

   O envio é deliberadamente "à prova de falha": qualquer erro é
   engolido e nunca bloqueia nem quebra o fluxo do utilizador.
   Usa keepalive para sobreviver à navegação logo após submeter.
───────────────────────────────────────────────────────────────── */

const RECETOR_URL =
  "https://script.google.com/macros/s/AKfycbySZdJus-rySLH1W-MXCuETZAGnPAMfyQyLEAM8GX8yjXSVcCtu628UfwTj_qfVVPmruw/exec";

export interface LeadNotificacao {
  nome?: string;
  email: string;
  origem: string;
  notas?: string;
}

export function notificarLead(lead: LeadNotificacao): void {
  try {
    if (!lead?.email) return;

    const corpo = JSON.stringify({
      nome: lead.nome || "",
      email: lead.email,
      origem: lead.origem || "",
      pagina: typeof window !== "undefined" ? window.location.pathname : "",
      notas: lead.notas || "",
    });

    // text/plain evita o preflight CORS: o Apps Script não responde a OPTIONS.
    // no-cors porque não precisamos de ler a resposta, só de a entregar.
    void fetch(RECETOR_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: corpo,
    }).catch(() => {
      /* silencioso por design: nunca estragar a experiência da utilizadora */
    });
  } catch {
    /* idem */
  }
}
