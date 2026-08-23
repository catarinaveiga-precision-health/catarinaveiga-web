/**
 * Link de marcação, num sítio único.
 *
 * O `utm_source=site` é invisível para quem visita: serve para que a marcação
 * chegue ao Acuity identificada como vinda do site. Até agora não havia forma
 * de saber se uma consulta veio do site, do Instagram ou de recomendação, e
 * por isso não era possível dizer se uma alteração à página resultou.
 *
 * Para distinguir de onde na página veio o clique, passa-se `origem`:
 *   acuityUrl("hero") -> ...?utm_source=site&utm_content=hero
 */
const BASE = "https://catarinaveigaagendamento.as.me/";

export const ACUITY_URL = `${BASE}?utm_source=site&utm_medium=organico&utm_campaign=consulta-inicial`;

export function acuityUrl(origem: string): string {
  return `${ACUITY_URL}&utm_content=${encodeURIComponent(origem)}`;
}
