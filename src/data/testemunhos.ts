// Avaliações reais do perfil Google de Catarina Veiga (4.8 · 21 avaliações).
// FONTE ÚNICA: testemunhos.json (lido também pelo scripts/prerender.mjs, para
// o texto chegar ao HTML estático, que é o que os crawlers de IA citam).
//
// Texto VERBATIM: não corrigir, não traduzir, não suavizar. O tratamento por
// "Dra." é mantido porque são palavras das pacientes. Avaliações que descrevem
// diagnósticos, medicação ou resultados clínicos concretos ficaram de fora.

import dados from "./testemunhos.json";

export interface Testemunho {
  autor: string;
  texto: string;
  data?: string;
  idioma?: "pt" | "en";
}

export const testemunhos: Testemunho[] = dados.testemunhos as Testemunho[];
export const avaliacaoGlobal = dados.avaliacaoGlobal;
