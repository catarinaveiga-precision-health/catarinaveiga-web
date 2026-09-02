/**
 * Eventos GA4.
 *
 * Contexto (2026-08-28): até aqui o site não disparava evento nenhum. O GA4
 * só via page_view e, como a marcação acontece fora do domínio (Acuity), não
 * havia forma de saber se uma consulta veio do site nem de que secção da
 * página partiu o clique. Sem key event não é possível comparar páginas nem
 * avaliar se uma alteração resultou.
 *
 * Dois eventos, os únicos que valem como resultado de negócio:
 *   marcar_consulta ....... clique em qualquer caminho para o Acuity
 *   autoavaliacao_lead .... email entregue e gravado na /avaliacao
 *
 * Ambos têm de ser marcados como key event no GA4 (Administrador, Eventos).
 * Os parâmetros só aparecem nos relatórios depois de registados como
 * dimensões personalizadas.
 */

const ACUITY_HOST = "catarinaveigaagendamento.as.me";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  // O gtag é definido no index.html antes de o script do Google carregar: os
  // eventos disparados cedo ficam em fila no dataLayer e são processados
  // quando ele chega. Se um bloqueador o impedir, o push fica inócuo.
  window.gtag?.("event", event, {
    ...params,
    pagina: window.location.pathname,
  });
}

/**
 * Um listener delegado em vez de um onClick por botão: há mais de dez
 * caminhos para o Acuity espalhados pelo site, vários com o URL escrito à mão
 * e sem UTM. A delegação apanha todos, incluindo os que forem acrescentados
 * depois, e lê a origem do próprio utm_content quando existe.
 */
export function initOutboundTracking(): void {
  if (typeof document === "undefined") return;

  document.addEventListener(
    "click",
    (e) => {
      const alvo = e.target as Element | null;
      const link = alvo?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.origin);
      } catch {
        return;
      }
      if (url.hostname !== ACUITY_HOST) return;

      track("marcar_consulta", {
        origem: url.searchParams.get("utm_content") ?? "sem-origem",
      });
    },
    true,
  );
}
