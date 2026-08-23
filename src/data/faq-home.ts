// FAQ da homepage.
// FONTE ÚNICA: faq-home.json (lido também pelo scripts/prerender.mjs, que a
// transforma no FAQPage em JSON-LD e no HTML estático que os crawlers leem).
//
// Se acrescentares ou mudares uma pergunta aqui, o schema acompanha sozinho.
// Antes existiam duas cópias à mão, uma no componente e outra no prerender,
// que podiam divergir em silêncio.
//
// Ordem importa: a primeira pergunta responde à objeção da credencial, que é
// a mais frequente. Tratamento por "tu", como no resto do site.

import dados from "./faq-home.json";

export interface PerguntaFrequente {
  /** A pergunta, tal como aparece no acordeão e no schema. */
  q: string;
  /** A resposta, um parágrafo por elemento. */
  a: string[];
}

export const faqHome: PerguntaFrequente[] = dados as PerguntaFrequente[];
