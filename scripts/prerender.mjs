/**
 * Post-build pre-rendering script.
 *
 * For each known route AND each blog post from Sanity, it creates a
 * dedicated HTML file inside dist/ with the correct <title>, <meta
 * description>, OG tags, and content inside <div id="root">.
 *
 * Blog posts are fetched from Sanity at build time, their Portable Text
 * body is converted to static HTML, and full article content is injected
 * so crawlers (Google, Bing) can read the complete article.
 *
 * Also generates a dynamic sitemap.xml with all pages + blog posts.
 *
 * Usage:  node scripts/prerender.mjs   (runs automatically after vite build)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const TEMPLATE = readFileSync(join(DIST, "index.html"), "utf-8");

// ── Sanity config ─────────────────────────────────────────────────
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "3zvde3ro";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-01-01";

// ── Fetch posts from Sanity CDN (public, no token needed for published content) ──
async function fetchSanityPosts() {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    tags,
    mainImage { asset->{ url }, alt },
    excerpt,
    body,
    "author": author->{ name }
  }`;

  const encodedQuery = encodeURIComponent(query);
  const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`⚠ Sanity CDN returned ${res.status} — trying API with token...`);
      return fetchSanityPostsWithToken();
    }
    const data = await res.json();
    return data.result || [];
  } catch (err) {
    console.warn(`⚠ Sanity CDN fetch failed: ${err.message} — trying API with token...`);
    return fetchSanityPostsWithToken();
  }
}

async function fetchSanityPostsWithToken() {
  const token = process.env.SANITY_TOKEN;
  if (!token) {
    console.warn("⚠ No SANITY_TOKEN set — blog posts will not be pre-rendered.");
    return [];
  }

  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    tags,
    mainImage { asset->{ url }, alt },
    excerpt,
    body,
    "author": author->{ name }
  }`;

  const encodedQuery = encodeURIComponent(query);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result || [];
}

// ── Portable Text to HTML converter (simplified for crawlers) ─────
function portableTextToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return "";

  const out = [];
  let listOpen = null; // "bullet" | "number"
  const closeList = () => {
    if (listOpen) {
      out.push(listOpen === "number" ? "</ol>" : "</ul>");
      listOpen = null;
    }
  };

  for (const block of blocks) {
    if (block._type === "block") {
      const defs = {};
      (block.markDefs || []).forEach((d) => {
        defs[d._key] = d;
      });

      const text = (block.children || [])
        .map((child) => {
          let t = escapeHtml(child.text || "");
          if (child.marks && child.marks.length > 0) {
            for (const mark of child.marks) {
              if (mark === "strong") t = `<strong>${t}</strong>`;
              else if (mark === "em") t = `<em>${t}</em>`;
              else if (defs[mark] && defs[mark]._type === "link" && defs[mark].href)
                t = `<a href="${escapeHtml(defs[mark].href)}">${t}</a>`;
            }
          }
          return t;
        })
        .join("");

      // Listas: agrupar blocos consecutivos com listItem
      if (block.listItem) {
        const kind = block.listItem === "number" ? "number" : "bullet";
        if (listOpen && listOpen !== kind) closeList();
        if (!listOpen) {
          out.push(kind === "number" ? "<ol>" : "<ul>");
          listOpen = kind;
        }
        out.push(`<li>${text}</li>`);
        continue;
      }
      closeList();

      switch (block.style) {
        case "h1":
          out.push(`<h1>${text}</h1>`);
          break;
        case "h2":
          out.push(`<h2>${text}</h2>`);
          break;
        case "h3":
          out.push(`<h3>${text}</h3>`);
          break;
        case "h4":
          out.push(`<h4>${text}</h4>`);
          break;
        case "blockquote":
          out.push(`<blockquote>${text}</blockquote>`);
          break;
        default:
          if (text) out.push(`<p>${text}</p>`);
      }
      continue;
    }

    closeList();
    if (block._type === "image" && block.asset) {
      const alt = escapeHtml(block.alt || "");
      out.push(`<img src="${block.asset.url || block.asset._ref || ""}" alt="${alt}" loading="lazy" />`);
    }
  }
  closeList();

  return out.join("\n");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Extract plain text from Portable Text (for meta descriptions) ─
function portableTextToPlain(blocks, maxLength = 160) {
  if (!blocks || !Array.isArray(blocks)) return "";

  const text = blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children || []).map((c) => c.text || "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

// ── SEO data for every pre-renderable static route ────────────────
// Testemunhos: o texto tem de estar no HTML estatico, e o que os crawlers de IA
// citam. Fonte unica partilhada com a app (src/data/testemunhos.json).
const testemunhosData = JSON.parse(
  readFileSync(new URL("../src/data/testemunhos.json", import.meta.url), "utf-8")
);
const testemunhosHtml =
  `<p style="color:#666;font-size:1.1rem;line-height:1.6">Avaliacoes publicadas no perfil Google da consulta (media ${testemunhosData.avaliacaoGlobal.media} em ${testemunhosData.avaliacaoGlobal.total} avaliacoes), reproduzidas sem alteracoes.</p>` +
  testemunhosData.testemunhos
    .map(
      (t) =>
        `<figure style="margin:32px 0;border-left:2px solid #e8e2d9;padding-left:20px"><blockquote style="color:#444;line-height:1.8;margin:0">${escapeHtml(t.texto)}</blockquote><figcaption style="margin-top:10px;color:#888;font-size:0.9rem">${escapeHtml(t.autor)}, avaliacao no Google</figcaption></figure>`
    )
    .join("");

const testemunhosLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.catarinaveiga.com/#business",
  name: "Catarina Veiga · Medicina Funcional Integrativa",
  url: "https://www.catarinaveiga.com",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: testemunhosData.avaliacaoGlobal.media,
    reviewCount: testemunhosData.avaliacaoGlobal.total,
    bestRating: 5,
  },
  review: testemunhosData.testemunhos.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.autor },
    reviewBody: t.texto,
    inLanguage: t.idioma === "en" ? "en" : "pt-PT",
    ...(t.data ? { datePublished: t.data } : {}),
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
  })),
};

const pages = [
  // Página pilar · tese da marca
  {
    path: "/exames-normais-mas-sintomas",
    title: "Exames Normais mas Sintomas Persistentes | Catarina Veiga",
    description:
      "Fadiga, ansiedade, sono fragmentado e alterações hormonais com análises consideradas normais. Porque acontece, e o que uma leitura integrada da fisiologia feminina procura encontrar.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Fadiga persistente. Alterações hormonais. Sono fragmentado. Ansiedade nova. Sintomas que afetam a qualidade de vida, mesmo quando os exames são considerados normais. Os valores de referência descrevem a população, não o funcionamento ótimo: ferritina, vitamina D, insulina, tiroide e perimenopausa são exemplos em que normal e ótimo não coincidem. A leitura integrada cruza história clínica, sintomas, biomarcadores funcionais e contexto de vida.",
    faq: [
      {
        q: "Os meus exames dão normais mas continuo com sintomas. A quem posso recorrer?",
        a: "Uma consulta de medicina funcional integrativa é a via indicada quando os exames são considerados normais e os sintomas persistem. O trabalho consiste em reler as análises que já tens com intervalos funcionais, cruzar biomarcadores em vez de os ler isoladamente e procurar a causa fisiológica do sintoma. Faço este acompanhamento em telemedicina, com mulheres que já passaram por várias consultas sem obter respostas.",
      },
      {
        q: "Vale a pena pedir uma segunda opinião sobre análises que já foram dadas como normais?",
        a: "Sim, sobretudo quando os sintomas são persistentes e afectam a qualidade de vida. Uma segunda leitura não implica repetir exames: implica interpretar os mesmos resultados com intervalos funcionais e olhar para os padrões entre os valores. Ferritina de 25 ng/mL, TSH de 3.8 mUI/L e vitamina D de 28 ng/mL são individualmente normais e, em conjunto, explicam frequentemente anos de fadiga.",
      },
      {
        q: "Porque é que um exame normal não significa que está tudo bem?",
        a: "Porque os intervalos de referência são construídos a partir da distribuição estatística da população analisada, que inclui pessoas sintomáticas, e destinam-se a excluir doença, não a confirmar função óptima. Estar dentro do intervalo significa não ter doença detectável naquele parâmetro, o que é diferente de o corpo estar a funcionar bem.",
      },
      {
        q: "Que sintomas aparecem com mais frequência com exames normais?",
        a: "Os mais frequentes são fadiga que não melhora com descanso, sono fragmentado (sobretudo acordar entre as 3h e as 5h), ansiedade nova ou agravada, alterações do ciclo menstrual, queda de cabelo, nevoeiro mental, aumento de peso sem alteração de dieta e intolerância ao frio. Em perimenopausa, é comum vários destes surgirem em simultâneo.",
      },
      {
        q: "Isto substitui o acompanhamento médico?",
        a: "Não. A medicina funcional integrativa é complementar e trabalha em articulação com a medicina convencional. Não substitui diagnóstico médico nem prescrição, e as situações que exigem investigação médica são sinalizadas e encaminhadas.",
      },
    ],
  },
  // Homepage (v2) · vende a Consulta Inicial (€120)
  {
    path: "/",
    title: "Catarina Veiga | Medicina Funcional: Exames Normais, Corpo Não",
    description:
      "Medicina funcional integrativa para mulheres cujos exames dão normais mas o corpo não. Fadiga, hormonas, tiroide e perimenopausa, investigadas à causa, quando a medicina convencional não deu respostas.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Para mulheres em perimenopausa, com fadiga persistente, alterações hormonais, digestivas ou metabólicas que continuam sem explicação clara. Não é sobre fazer mais exames: é sobre ler bem os que já tens. Na consulta inicial olhamos histórico clínico detalhado, sono, digestão, energia, ciclo, sintomas e exames anteriores. Sais com hipóteses claras, prioridades definidas e próximos passos concretos. 60–90 minutos em telemedicina, €120.",
    // Estas 5 perguntas viviam num FAQPage global do index.html, repetido em
    // todas as paginas. Passaram a viver so aqui, para nao duplicar FAQPage.
    faq: [
      {
        q: "O que acontece na primeira consulta?",
        a: "A primeira consulta dura entre 60 e 90 minutos, em videochamada. Recebes um questionário prévio por email para preparar. Em consulta exploramos o teu histórico clínico, sintomas, ciclo, sono, digestão, energia e contexto emocional. Sais com um plano estruturado por escrito, com revisões previstas.",
      },
      {
        q: "Como funciona o acompanhamento?",
        a: "O acompanhamento estende-se ao longo do tempo. Após a primeira consulta, há revisões periódicas para ajustar o plano à evolução. A frequência depende do teu caso.",
      },
      {
        q: "Em que casos é indicado este acompanhamento?",
        a: "Acompanho mulheres em transições hormonais: perimenopausa, alterações de ciclo, fadiga persistente, sono alterado, equilíbrio emocional, digestão sensível. Trabalho sobretudo com sintomas reais e exames maioritariamente normais. Para descompensações agudas ou necessidade de intervenção médica imediata, refiro para médicos e outras especialidades.",
      },
      {
        q: "Como olha para as análises clínicas?",
        a: "Leio as análises que já tens com intervalos funcionais e cruzo os marcadores entre si, em vez de os avaliar isoladamente. Integro essa leitura no contexto da minha formação e dos quatro anos no Departamento de Microbioma da Regenerus Labs. É uma leitura complementar, que não substitui diagnóstico nem prescrição médica.",
      },
      {
        q: "O que posso esperar ao longo do tempo?",
        a: "A evolução depende de vários fatores. As pacientes descrevem mudanças subjetivas em sono, energia e equilíbrio ao longo de semanas a meses. Não prometo prazos nem resultados.",
      },
    ],
  },
  // SEO article pages
  {
    path: "/ferritina-baixa-sintomas",
    title:
      "Ferritina Baixa com Hemoglobina Normal: Sintomas e Causas | Catarina Veiga",
    description:
      "Ferritina baixa com hemoglobina normal? Sintomas, causas e a diferença entre valores laboratoriais e funcionais: porque há défice de ferro sem anemia.",
    h1: "Ferritina baixa com hemoglobina normal: sintomas e causas",
    intro:
      "Muitas mulheres têm ferritina dentro dos valores de referência e hemoglobina normal, e ainda assim apresentam fadiga persistente, queda de cabelo e dificuldade de recuperação. É défice de ferro sem anemia: a hemoglobina mede o ferro em circulação, a ferritina mede as reservas.",
    faq: [
      {
        q: "Posso ter sintomas de ferritina baixa com hemoglobina normal?",
        a: "Sim. A hemoglobina mede o ferro em circulação, enquanto a ferritina mede as reservas disponíveis para uso celular. É possível ter hemoglobina normal e ferritina baixa: os exames convencionais não identificam anemia, mas o corpo já está a funcionar com reservas insuficientes.",
      },
      {
        q: "Que sintomas pode causar a ferritina baixa?",
        a: "Os sintomas frequentes incluem fadiga persistente mesmo após descanso adequado, queda de cabelo difusa, intolerância ao frio nas extremidades, dificuldade de concentração e nevoeiro mental, recuperação lenta após exercício, palpitações com esforço moderado e unhas frágeis ou quebradiças.",
      },
      {
        q: "Qual é o valor ideal de ferritina para uma mulher?",
        a: "O intervalo funcional associado a energia, cabelo e cognição óptimos situa-se entre 50 e 100 ng/mL. O laboratório considera normal qualquer valor acima de 10 ng/mL, mas valores abaixo de 50 podem associar-se a défice funcional, e abaixo de 30 as reservas são insuficientes.",
      },
      {
        q: "Porque é que tenho ferritina baixa se como bem?",
        a: "As causas mais comuns em mulheres incluem perdas menstruais abundantes, absorção reduzida (permeabilidade intestinal, hipocloridria ou dieta pobre em ferro biodisponível), stress crónico (o cortisol interfere com a absorção e utilização do ferro), inflamação crónica (a hepcidina sequestra o ferro nos depósitos), gravidez e pós-parto, e dietas restritivas.",
      },
      {
        q: "A ferritina baixa pode afectar a tiróide?",
        a: "A combinação de ferritina baixa com TSH elevado é um padrão frequente em disfunção tiroideia subclínica. Por isso, a ferritina raramente deve ser avaliada isoladamente: o padrão mais informativo inclui a combinação com outros biomarcadores, como TSH, VGM, PCR e vitamina D.",
      },
    ],
  },
  {
    path: "/vitamina-d-valores-funcionais",
    title:
      "Vitamina D Baixa: Valores Funcionais e Sintomas | Catarina Veiga",
    description:
      "Vitamina D dentro dos valores normais mas com fadiga e infecções frequentes? Descobre a diferença entre valores laboratoriais e funcionais.",
    h1: "Vitamina D baixa: o que os valores laboratoriais não explicam",
    intro:
      "A maioria da população portuguesa tem vitamina D insuficiente, mas os valores considerados normais podem ainda assim ser insuficientes para função fisiológica óptima.",
    faq: [
      {
        q: "Ter vitamina D acima de 20 ng/mL é suficiente?",
        a: "O laboratório considera suficiente qualquer valor acima de 20 ng/mL, mas esse limiar foi definido para prevenir raquitismo, não para garantir função óptima. O intervalo funcional associado a função imune e hormonal óptima situa-se entre 50 e 80 ng/mL, e valores entre 30 e 49 são frequentemente insuficientes em contexto clínico.",
      },
      {
        q: "Que sintomas pode causar a vitamina D insuficiente?",
        a: "Os sintomas frequentes incluem fadiga persistente sem causa aparente, infecções respiratórias frequentes, dores musculares ou ósseas difusas, alterações do humor (incluindo depressão sazonal), nevoeiro mental, queda de cabelo, cicatrização lenta e agravamento de condições autoimunes.",
      },
      {
        q: "Porque tenho vitamina D baixa se vivo em Portugal?",
        a: "Mesmo em clima mediterrânico, a exposição solar insuficiente nos meses de inverno, combinada com trabalho em interior, torna o défice extremamente comum. A melanina e o protector solar reduzem a síntese cutânea, a permeabilidade intestinal pode comprometer a absorção, e na obesidade a vitamina D fica sequestrada no tecido adiposo.",
      },
      {
        q: "A vitamina D é uma vitamina ou uma hormona?",
        a: "Tecnicamente, é uma hormona esteróide. É produzida pela pele mediante exposição solar e activa receptores em praticamente todos os tecidos: sistema imune, músculo, osso, cérebro e tiróide.",
      },
      {
        q: "A vitamina D baixa está ligada a outros desequilíbrios?",
        a: "Sim, há padrões combinados relevantes: vitamina D baixa com TSH elevado é uma associação frequente em disfunção tiroideia, com ferritina baixa forma um padrão de deplecção múltipla em fadiga crónica, com PCR elevada pode amplificar inflamação sistémica, e com insulina elevada associa-se a resistência à insulina.",
      },
    ],
  },
  {
    path: "/insulina-jejum-o-que-significa",
    title:
      "Insulina em Jejum Elevada: O Que Significa | Catarina Veiga",
    description:
      "Insulina em jejum elevada com glicose normal? Descobre o que a hiperinsulinemia significa antes de um diagnóstico de pré-diabetes.",
    h1: "Insulina em jejum elevada: o marcador que aparece anos antes do diagnóstico",
    intro:
      "A glicose pode estar normal enquanto a insulina já está elevada há anos. Este padrão é um dos sinais mais precoces de resistência metabólica.",
    faq: [
      {
        q: "Posso ter insulina elevada com glicose normal?",
        a: "Sim, e é um dos padrões mais precoces de resistência metabólica: chama-se hiperinsulinemia compensatória. A glicose pode estar normal enquanto o pâncreas já trabalha em excesso para a manter controlada. Este padrão pode preceder um diagnóstico de diabetes tipo 2 por uma década.",
      },
      {
        q: "Qual é o valor ideal de insulina em jejum?",
        a: "O intervalo funcional situa-se entre 2 e 5 µIU/mL, associado a boa sensibilidade celular à insulina. Valores acima de 5 a 7 já podem indicar resistência metabólica, e acima de 10 trata-se de hiperinsulinemia franca, com risco cardiovascular associado.",
      },
      {
        q: "Que sintomas pode dar a insulina elevada?",
        a: "Os sintomas frequentes incluem fadiga pós-prandial (cansaço a seguir às refeições), cravings intensos de açúcar ou hidratos, dificuldade em perder peso apesar de dieta controlada, peso concentrado na zona abdominal, nevoeiro mental após refeições, fome intensa poucas horas após comer e irritabilidade quando não come.",
      },
      {
        q: "Porque é que o exame de glicose não detecta o problema?",
        a: "Porque a glicose pode mascarar o problema durante anos. O intervalo laboratorial da insulina (2 a 25 µIU/mL) é muito amplo e está focado em diabetes manifesta, não em resistência inicial. A monitorização precoce da insulina em jejum permite prevenir a progressão para pré-diabetes.",
      },
      {
        q: "A insulina elevada está associada a outros marcadores alterados?",
        a: "Sim, há padrões combinados relevantes: insulina elevada com triglicéridos altos é a síndrome metabólica clássica, com vitamina D baixa associa-se a resistência à insulina, e com PCR elevada reflecte a coexistência frequente de inflamação e resistência metabólica.",
      },
    ],
  },
  {
    path: "/tsh-normal-mas-com-sintomas",
    title:
      "Tiroide com TSH Normal Mas Com Sintomas: Leitura Funcional | Catarina Veiga",
    description:
      "Tiroide lenta com TSH 'normal'? Fadiga, frio, queda de cabelo apesar de análises normais. O que a medicina funcional vê nos intervalos que o laboratório aceita como normais.",
    h1: "Tiroide com TSH normal mas com sintomas: o que a leitura funcional explica",
    intro:
      "O intervalo laboratorial aceita valores até 4.5 mUI/L como normais. Em medicina funcional, valores acima de 2.0 já podem associar-se a lentificação metabólica.",
    faq: [
      {
        q: "TSH normal exclui problemas de tiroide?",
        a: "Não necessariamente. O intervalo laboratorial aceita valores até 4.5 mUI/L como normais, mas em medicina funcional valores acima de 2.0 já podem associar-se a lentificação metabólica, sobretudo em mulheres com sintomas como fadiga, frio ou queda de cabelo.",
      },
      {
        q: "Qual é o intervalo funcional do TSH?",
        a: "O intervalo funcional associado a função tiroideia óptima situa-se entre 0.5 e 2.0 mUI/L. A zona cinzenta entre 2.0 e 4.5 mUI/L é frequentemente relevante em mulheres sintomáticas e merece avaliação em contexto clínico.",
      },
      {
        q: "Que sintomas posso ter com TSH dentro do normal?",
        a: "Os sintomas frequentes de hipotiroidismo subclínico incluem fadiga persistente (especialmente de manhã), intolerância ao frio, aumento de peso sem alteração da dieta, queda de cabelo difusa, pele seca, obstipação crónica, nevoeiro mental, ciclo menstrual irregular e humor baixo sem causa aparente.",
      },
      {
        q: "Porque é que a tiroide é tão sensível em mulheres?",
        a: "A função tiroideia é influenciada por estrogénio, cortisol, ferro, vitamina D e estado inflamatório: factores que flutuam ao longo do ciclo menstrual, gravidez, pós-parto e perimenopausa. Um défice de ferro, por exemplo, compromete a conversão de T4 em T3.",
      },
    ],
  },
  {
    path: "/fadiga-exames-normais",
    title:
      "Fadiga com Exames Normais: A Quem Recorrer e o Que Investigar | Catarina Veiga",
    description:
      "Sem energia e cansada mas os exames dão normais? A quem recorrer, porque acontece, e o que a medicina funcional investiga quando a convencional diz que está tudo bem.",
    h1: "Fadiga com exames normais: a quem recorrer e o que investigar",
    intro:
      "É uma das queixas mais frequentes em medicina, e uma das mais frustrantes. Os exames estão normais, mas o cansaço persiste.",
    faq: [
      {
        q: "A quem posso recorrer se os exames dão normais mas continuo cansada?",
        a: "Quando a medicina convencional considera os exames normais mas o cansaço persiste, a medicina funcional integrativa é uma via: relê as análises que já tens com intervalos funcionais, investiga padrões entre biomarcadores e procura a causa em vez de gerir o sintoma. É este o trabalho que faço com mulheres cansadas há anos, sem energia e sem respostas.",
      },
      {
        q: "Porque continuo cansada se os meus exames estão normais?",
        a: "Porque os intervalos laboratoriais de referência são definidos pela distribuição estatística da população, não pelos valores associados a função energética óptima. Um valor pode estar dentro do intervalo normal e ainda assim ser insuficiente para as necessidades fisiológicas individuais.",
      },
      {
        q: "Que valores devo olhar com mais atenção quando há fadiga?",
        a: "Os padrões biomarcadores mais frequentes em fadiga inexplicada incluem ferritina baixo-normal (20 a 50 ng/mL), TSH elevado-normal (2.5 a 4.0 mUI/L), vitamina D insuficiente (20 a 40 ng/mL), vitamina B12 baixo-normal (200 a 400 pg/mL), insulina em jejum elevada (acima de 7 µIU/mL) e PCR elevada (acima de 1 mg/L).",
      },
      {
        q: "Qual é a diferença entre intervalos laboratoriais e funcionais?",
        a: "Os intervalos convencionais são populacionais: baseiam-se na distribuição estatística, focam-se na ausência de doença e olham para valores isolados sem contexto. Os intervalos funcionais baseiam-se em valores associados a energia e vitalidade, investigam padrões e consideram a relação entre biomarcadores e sistemas.",
      },
    ],
  },
  {
    path: "/segunda-opiniao-analises-normais",
    title:
      "Segunda Opinião Sobre Análises Normais: Quando Faz Sentido | Catarina Veiga",
    description:
      "Análises dadas como normais mas sintomas que continuam? O que muda numa segunda leitura, que exames levar, quando faz sentido pedir e o que esperar do resultado.",
    h1: "Segunda opinião sobre análises normais: quando faz sentido",
    intro:
      "Foste informada de que está tudo normal e os sintomas continuam. Uma segunda leitura não é repetir exames: é interpretar os que já tens com outra pergunta. A leitura convencional pergunta se existe doença detectável; a leitura funcional pergunta se estes valores explicam os sintomas e são compatíveis com função óptima.",
    faq: [
      {
        q: "Vale a pena pedir uma segunda opinião sobre análises que já foram dadas como normais?",
        a: "Vale, sobretudo quando os sintomas são persistentes e afectam a qualidade de vida. Uma segunda leitura não implica repetir exames: implica interpretar os mesmos resultados com intervalos funcionais e olhar para os padrões entre os valores. Ferritina de 25 ng/mL, TSH de 3.8 mUI/L e vitamina D de 28 ng/mL são individualmente normais e, em conjunto, explicam frequentemente anos de fadiga.",
      },
      {
        q: "Uma segunda opinião significa repetir todas as análises?",
        a: "Não. O ponto de partida são as análises que já tens, incluindo as de anos anteriores. Só se justifica pedir novos exames quando falta um marcador relevante que nunca foi doseado, como ferritina, insulina em jejum, vitamina D ou PCR, ou quando os resultados existentes já têm mais de um ano.",
      },
      {
        q: "Que análises devo levar a uma segunda leitura?",
        a: "Leva tudo o que tiveres, mesmo o que parecer antigo ou irrelevante: hemograma completo, ferro e ferritina, função tiroideia, vitamina D, vitamina B12, glicose e insulina, perfil lipídico, PCR e qualquer painel hormonal. O histórico de vários anos vale mais do que uma colheita isolada, porque mostra a direcção em que os valores se movem.",
      },
      {
        q: "Isto contradiz o que o meu médico disse?",
        a: "Não. A leitura convencional responde a uma pergunta legítima e diferente: existe doença detectável? Uma segunda leitura funcional responde a outra: estes valores explicam os sintomas e são compatíveis com função óptima? As duas coexistem, e a leitura clínica oficial das análises continua a ser da responsabilidade médica.",
      },
      {
        q: "Que resultado posso esperar de uma segunda opinião?",
        a: "O resultado esperado é clareza, não um diagnóstico novo. Sais com hipóteses explicitadas, prioridades definidas e próximos passos concretos, incluindo, quando se justifica, a indicação de que a investigação deve seguir por via médica.",
      },
      {
        q: "E se a segunda leitura não encontrar nada?",
        a: "É um desfecho possível e é informação útil. Nem todos os sintomas têm tradução laboratorial, e nesse caso a investigação desloca-se para sono, carga de stress, alimentação, ciclo e outros factores que não aparecem numa análise ao sangue.",
      },
    ],
  },
  {
    path: "/testemunhos",
    title: "Testemunhos: o que dizem as pacientes | Catarina Veiga",
    description:
      "Avaliacoes reais de mulheres acompanhadas em medicina funcional integrativa. Fadiga, sono, hormonas e exames normais: o que mudou, por palavras delas.",
    h1: "O que dizem as mulheres que ja passaram por aqui",
    intro:
      "Avaliacoes reais, publicadas no Google, reproduzidas aqui sem alteracoes. A maioria descreve a mesma coisa: anos a ouvir que estava tudo normal, ate alguem olhar para o conjunto. O tratamento por \u0022Dra.\u0022 e a forma como as pacientes escrevem; Catarina Veiga e especialista em medicina funcional integrativa, nao e medica.",
    extraHtml: testemunhosHtml,
    jsonLd: testemunhosLd,
  },
  {
    path: "/medicina-funcional",
    title: "Medicina Funcional: Quando os Exames Dão Tudo Normal",
    description:
      "Os teus exames estão normais mas os sintomas continuam. A medicina funcional investiga as causas que os valores de referência standard não mostram.",
    h1: "Medicina Funcional: o que é e quando pode ajudar",
    intro:
      "A medicina funcional é uma abordagem clínica que investiga as causas raiz de sintomas persistentes, especialmente quando os exames parecem normais.",
    faq: [
      {
        q: "O que é medicina funcional integrativa?",
        a: "É uma abordagem clínica que combina investigação de causas raiz com intervenções baseadas em evidência: nutrição terapêutica, modulação do estilo de vida, suplementação dirigida e colaboração com medicina convencional quando necessário.",
      },
      {
        q: "Quando faz sentido procurar medicina funcional?",
        a: "Faz sentido quando os sintomas persistem apesar de os exames serem considerados normais, quando já passaste por várias consultas sem obter uma explicação, ou quando as queixas (fadiga, sono, hormonas, digestão, peso) aparecem em conjunto e são tratadas isoladamente. É a situação mais comum em perimenopausa.",
      },
      {
        q: "Medicina funcional tem base científica?",
        a: "Sim. Utiliza os mesmos exames laboratoriais e os mesmos princípios fisiológicos da medicina convencional, com uma interpretação mais detalhada e uma abordagem sistémica.",
      },
      {
        q: "Existe consulta presencial ou é tudo online?",
        a: "Trabalho exclusivamente em formato online. As consultas por videochamada permitem o mesmo nível de detalhe clínico com flexibilidade total de horário e localização, em Portugal e no estrangeiro.",
      },
      {
        q: "Quanto custa uma consulta de medicina funcional?",
        a: "A consulta inicial custa 120 euros e dura entre 60 e 90 minutos, em telemedicina. Inclui revisão do histórico clínico e dos exames que já tens, com hipóteses, prioridades e próximos passos concretos no final.",
      },
    ],
  },
  {
    path: "/pequenos-almocos-ricos-em-proteina",
    title:
      "Pequeno-Almoço Proteico: Porquê, Quanto e O Que Comer | Catarina Veiga",
    description:
      "O que é um pequeno-almoço proteico, porquê 25 a 30 g de proteína e 6 opções práticas. Menos cravings, mais energia estável e saciedade, especialmente na perimenopausa.",
    h1: "Pequenos-almoços ricos em proteína: porquê, quanto e o que comer",
    intro:
      "Um pequeno-almoço proteico, com 25 a 30 g de proteína, estabiliza a glicemia, reduz cravings e apoia a produção hormonal: impacto directo na energia, no peso e na clareza mental ao longo do dia.",
    faq: [
      {
        q: "Quanta proteína devo comer ao pequeno-almoço?",
        a: "O valor ideal para a maioria das mulheres adultas situa-se entre 25 e 30 g de proteína. Esta quantidade activa de forma eficaz as hormonas de saciedade e contribui para a estabilização da glicemia ao longo da manhã.",
      },
      {
        q: "O que acontece se o meu pequeno-almoço não tiver proteína suficiente?",
        a: "Um pequeno-almoço pobre em proteína e rico em hidratos simples gera um pico de glicemia seguido de uma quebra rápida, o que se traduz em fome, irritabilidade, cravings e nevoeiro mental antes do almoço.",
      },
      {
        q: "Os ovos são uma boa fonte de proteína ao pequeno-almoço?",
        a: "Sim. Dois ovos inteiros fornecem cerca de 12 a 14 g de proteína, além de colina, vitamina D e gorduras saudáveis. Combinados com queijo, sementes ou salmão fumado, atingem facilmente os 25 g recomendados.",
      },
      {
        q: "Posso usar proteína em pó ao pequeno-almoço?",
        a: "Sim, é uma opção prática. A proteína whey ou a proteína de arroz e ervilha (para quem evita lacticínios) podem ser adicionadas a batidos, panquecas ou overnight oats sem alterar o sabor de forma significativa.",
      },
      {
        q: "O que comer ao pequeno-almoço na perimenopausa?",
        a: "Na perimenopausa, a resistência à insulina tende a aumentar e a massa muscular a diminuir. Um pequeno-almoço com 25 a 30 g de proteína, gordura saudável e fibra é uma das intervenções alimentares mais simples e eficazes para estabilizar energia e hormonas.",
      },
    ],
  },
  // Main site pages
  {
    path: "/sobre",
    title: "Sobre · Catarina Veiga · Medicina Funcional Integrativa para Mulheres",
    description:
      "Cansada de ouvir que está tudo normal? Medicina funcional integrativa para mulheres com sintomas reais e exames normais: fadiga, hormonas, tiroide e perimenopausa. Vinte anos de prática clínica.",
    h1: "Talvez tenha chegado aqui porque está cansada de ouvir que está tudo normal.",
    intro:
      "Mulheres entre os 35 e os 55 anos. Fadiga, brain fog, ansiedade nova, alterações intestinais, perimenopausa, sono fragmentado. Sintomas reais, exames normais. Uma leitura integrada do corpo feminino, com vinte anos de prática clínica e em colaboração com médica inscrita na Ordem dos Médicos. Telemedicina, em Portugal e no estrangeiro.",
  },
  {
    path: "/metodo",
    title: "O Método · Catarina Veiga · Saúde Hormonal Feminina",
    description:
      "Abordagem clínica integrativa que investiga as causas raiz dos teus sintomas. Não tratar sintomas — corrigir o que os causa.",
    h1: "O Método",
    intro:
      "Uma abordagem clínica integrativa que investiga as causas raiz dos teus sintomas.",
  },
  {
    path: "/blog",
    title: "Blog · Catarina Veiga · Saúde Hormonal Feminina",
    description:
      "Artigos sobre saúde hormonal feminina, perimenopausa, ferritina, vitamina D, tiróide e medicina funcional. Informação baseada em evidência.",
    h1: "Blog — Saúde Hormonal Feminina",
    intro:
      "Artigos sobre saúde hormonal, perimenopausa e medicina funcional integrativa.",
  },
  {
    path: "/recursos",
    title: "Recursos · Catarina Veiga · Saúde Feminina",
    description:
      "Ferramentas e recursos gratuitos de saúde hormonal feminina. Avaliação funcional de exames, guias e artigos especializados.",
    h1: "Recursos de Saúde Hormonal Feminina",
    intro:
      "Ferramentas e recursos gratuitos para compreenderes melhor a tua saúde hormonal.",
  },
  {
    path: "/avaliacao",
    title: "Autoavaliação · Catarina Veiga",
    description:
      "Esta autoavaliação é educativa. Ajuda-te a chegar à consulta — comigo ou com o teu médico — com perguntas estruturadas. Não substitui avaliação clínica.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Esta autoavaliação é educativa. Ajuda-te a chegar à consulta — comigo ou com o teu médico — com perguntas estruturadas. Não substitui avaliação clínica.",
  },
  {
    path: "/candidatura",
    title: "Candidatura a Consulta | Catarina Veiga",
    description:
      "Candidata-te a uma consulta de medicina funcional integrativa com a Catarina Veiga. Consultas online para Portugal e Brasil.",
    h1: "Candidatura a Consulta",
    intro:
      "Preenche o formulário para seres avaliada para uma consulta de medicina funcional integrativa.",
  },
  {
    path: "/programa-fundacao",
    title: "Programa Fundação · 12 Semanas · Catarina Veiga",
    description:
      "Acompanhamento estruturado de 12 semanas para mulheres que sabem que algo não está certo, mesmo quando os exames parecem normais. Investigar, intervir, consolidar.",
    h1: "Há uma diferença entre estar dentro dos valores de referência e sentir-se verdadeiramente bem.",
    intro:
      "O Programa Fundação foi criado para mulheres que sabem que algo não está certo, mesmo quando os exames parecem normais. Três fases ao longo de 12 semanas: investigar, intervir, consolidar. 4 consultas individuais, plano clínico escrito e atualizado, interpretação integrada dos exames existentes, suporte entre consultas e plano de manutenção final. €800. Entrada após consulta inicial.",
  },
  {
    path: "/v2",
    title: "Catarina Veiga | Saúde Feminina Integrada",
    description:
      "Preview homepage v2 · foundation editorial premium. Não indexar.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Preview homepage v2 · acompanhamento clínico em saúde hormonal feminina.",
    noindex: true,
  },
  // Homepage v1 (preview antiga) · não indexar para não competir com "/"
  {
    path: "/v1",
    title: "Catarina Veiga | Saúde Feminina Integrada",
    description:
      "Preview homepage v1 · acompanhamento clínico em saúde hormonal feminina. Não indexar.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Preview homepage v1 · acompanhamento clínico em saúde hormonal feminina.",
    noindex: true,
  },
  // Programa Aletheia · landing indexável (canonical próprio)
  {
    path: "/aletheia",
    title: "Programa Aletheia | Catarina Veiga — Medicina Funcional",
    description:
      "Programa clínico personalizado para mulheres 35-55 com sintomas não resolvidos. Análise funcional de 66+ biomarcadores e acompanhamento integrado. PT e BR.",
    h1: "Programa Aletheia",
    intro:
      "Programa clínico personalizado para mulheres dos 35 aos 55 anos com sintomas persistentes e exames aparentemente normais. Análise funcional de mais de 66 biomarcadores e acompanhamento integrado, em Portugal e no Brasil.",
  },
  // Lead magnet · landing de captura
  {
    path: "/guia-saciedade",
    title: "Guia Gratuito · Porque tem fome pouco depois de comer? · Catarina Veiga",
    description:
      "Explicação clínica da fisiologia da saciedade, erros comuns que aumentam a fome e 29 receitas ricas em proteína. Para mais saciedade, menos cravings e energia estável.",
    h1: "Porque tem fome pouco depois de comer?",
    intro:
      "Os exames podem estar normais. O seu corpo não. Receba gratuitamente o guia com explicação simples da fisiologia da saciedade, os erros mais comuns que aumentam a fome, estratégias práticas para energia e controlo alimentar, e 29 receitas ricas em proteína.",
  },
  // English consultations · landing para anglófonas em Portugal
  {
    path: "/english-consultations",
    title: "Women's Health & Perimenopause Support in Portugal | Catarina Veiga",
    description:
      "English-speaking consultations for women experiencing fatigue, poor sleep, anxiety, perimenopause symptoms and persistent health concerns. Online and in Cascais, Portugal.",
    h1: "You've been told everything looks normal. So why don't you feel normal?",
    intro:
      "English-speaking consultations for women with persistent symptoms despite normal blood tests. Fatigue, poor sleep, anxiety, brain fog, perimenopause. Online worldwide or in-person in Parede, Cascais.",
  },
  // Páginas legais (obrigatório RGPD: têm de responder 200)
  {
    path: "/aviso-legal",
    title: "Aviso Legal · Catarina Veiga",
    description:
      "Aviso legal do website catarinaveiga.com: identificação, âmbito dos serviços e limitações de responsabilidade.",
    h1: "Aviso Legal",
    intro:
      "Identificação do responsável pelo website, âmbito dos serviços de Medicina Tradicional Chinesa e limitações de responsabilidade.",
  },
  {
    path: "/politica-privacidade",
    title: "Política de Privacidade · Catarina Veiga",
    description:
      "Política de privacidade e protecção de dados pessoais do website catarinaveiga.com, em conformidade com o RGPD.",
    h1: "Política de Privacidade",
    intro:
      "Como são recolhidos, tratados e protegidos os teus dados pessoais neste website, em conformidade com o Regulamento Geral de Protecção de Dados.",
  },
  {
    path: "/termos-utilizacao",
    title: "Termos de Utilização · Catarina Veiga",
    description:
      "Termos e condições de utilização do website catarinaveiga.com e dos serviços associados.",
    h1: "Termos de Utilização",
    intro:
      "Condições de utilização do website e dos serviços de telemedicina associados.",
  },
];

// ── Helper: generate the HTML for one route ──────────────────────
const OG_IMAGE_DEFAULT = "https://www.catarinaveiga.com/og-default.jpg";

function generatePage({ path, title, description, h1, intro, ogImage, bodyHtml, noindex, article, faq, extraHtml, jsonLd }) {
  // Escapar aspas: title/description entram em atributos HTML
  title = String(title).replace(/"/g, "&quot;");
  description = String(description).replace(/"/g, "&quot;");
  const canonical = `https://www.catarinaveiga.com${path === "/" ? "" : path}`;
  const image = ogImage || OG_IMAGE_DEFAULT;

  // Build static content for crawlers
  let staticContent;
  if (bodyHtml) {
    // Full article content for blog posts
    staticContent = `<article style="max-width:720px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif"><h1 style="font-size:2rem;line-height:1.2;margin-bottom:16px">${escapeHtml(h1)}</h1>${bodyHtml}<p style="margin-top:24px"><a href="/" style="color:#8b7355">catarinaveiga.com</a></p></article>`;
  } else {
    // Minimal content for static pages. O FAQ entra tambem em HTML: o JSON-LD
    // sozinho nao da texto citavel aos crawlers de IA, e o Google espera que o
    // FAQPage corresponda a conteudo presente na pagina.
    const faqHtml =
      faq && faq.length
        ? `<section style="margin-top:48px"><h2 style="font-size:1.4rem;line-height:1.3;margin-bottom:8px">Perguntas frequentes</h2>${faq
            .map(
              (f) =>
                `<h3 style="font-size:1.05rem;line-height:1.4;margin:24px 0 6px">${escapeHtml(f.q)}</h3><p style="color:#666;line-height:1.6;margin:0">${escapeHtml(f.a)}</p>`
            )
            .join("")}</section>`
        : "";
    staticContent = `<div style="max-width:720px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif"><h1 style="font-size:2rem;line-height:1.2;margin-bottom:16px">${escapeHtml(h1)}</h1><p style="color:#666;font-size:1.1rem;line-height:1.6">${escapeHtml(intro)}</p>${extraHtml || ""}${faqHtml}<p style="margin-top:24px"><a href="/" style="color:#8b7355">catarinaveiga.com</a></p></div>`;
  }

  let html = TEMPLATE;

  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}">`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"[^>]*>/,
    `<meta property="og:title" content="${title}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"[^>]*>/,
    `<meta property="og:description" content="${description}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"[^>]*>/,
    `<meta property="og:url" content="${canonical}">`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"[^>]*>/,
    `<meta property="og:image" content="${image}">`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}">`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${image}">`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}">`
  );

  // Noindex pages (previews, drafts): substituir a meta robots do template
  if (noindex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="noindex, nofollow">`
    );
  }

  // Article JSON-LD para posts do blog (E-E-A-T: autora ligada à entidade #person)
  if (article) {
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.headline,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      image: image,
      inLanguage: "pt-PT",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@id": "https://www.catarinaveiga.com/#person" },
      publisher: { "@id": "https://www.catarinaveiga.com/#person" },
    };
    const ldJson = JSON.stringify(articleLd).replace(/</g, "\\u003c");
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">${ldJson}</script>\n  </head>`
    );
  }

  // JSON-LD arbitrario por rota (crawler-visible; o structuredData do
  // SEOPageLayout e client-only e nunca chega ao crawler)
  if (jsonLd) {
    const extraJson = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">${extraJson}</script>\n  </head>`
    );
  }

  // FAQPage JSON-LD por rota (crawler-visible; o FAQSection do componente e client-only)
  if (faq && faq.length) {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const faqJson = JSON.stringify(faqLd).replace(/</g, "\\u003c");
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">${faqJson}</script>\n  </head>`
    );
  }

  // Inject static content into #root
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${staticContent}</div>`
  );

  return html;
}

// ── Generate sitemap.xml ─────────────────────────────────────────
function generateSitemap(staticPages, blogPosts) {
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  for (const page of staticPages) {
    if (page.noindex) continue;
    const loc = `https://www.catarinaveiga.com${page.path === "/" ? "" : page.path}`;
    const priority = page.path === "/" ? "1.0" : page.path === "/blog" ? "0.7" : "0.8";
    const freq = page.path === "/" || page.path === "/blog" ? "weekly" : "monthly";
    xml += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  }

  // Blog posts
  for (const post of blogPosts) {
    const slug = post.slug?.current;
    if (!slug) continue;
    const loc = `https://www.catarinaveiga.com/blog/${slug}`;
    const lastmod = post.publishedAt ? post.publishedAt.split("T")[0] : today;
    xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  let count = 0;

  // 1. Pre-render static pages
  for (const page of pages) {
    const html = generatePage(page);

    if (page.path === "/") {
      writeFileSync(join(DIST, "index.html"), html, "utf-8");
    } else {
      const dir = join(DIST, page.path);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, "index.html"), html, "utf-8");
    }
    count++;
  }

  console.log(`✓ Pre-rendered ${count} static pages`);

  // 1b. Generate 404.html (noindex) so orphan/unknown URLs return a real
  //     "not found" page instead of the homepage. Vercel serves dist/404.html
  //     with HTTP 404 for any path without a matching file, once the SPA
  //     catch-all rewrite is removed. Keeps the SPA bundle so humans with JS
  //     still get client-side routing for valid deep links.
  const notFoundHtml = generatePage({
    path: "/404",
    title: "Página não encontrada | Catarina Veiga",
    description:
      "A página que procura não existe ou foi movida. Explore o site de Catarina Veiga: saúde hormonal feminina, perimenopausa e medicina funcional integrativa.",
    h1: "Página não encontrada",
    intro:
      "A página que procura não existe ou foi movida. Pode voltar à página inicial ou explorar os artigos sobre saúde hormonal feminina, perimenopausa e medicina funcional integrativa.",
    noindex: true,
  });
  writeFileSync(join(DIST, "404.html"), notFoundHtml, "utf-8");
  console.log("✓ Generated 404.html (noindex)");

  // 2. Fetch and pre-render blog posts from Sanity
  console.log("⏳ Fetching blog posts from Sanity...");
  const posts = await fetchSanityPosts();
  console.log(`  Found ${posts.length} published posts`);

  let blogCount = 0;
  for (const post of posts) {
    const slug = post.slug?.current;
    if (!slug) {
      console.warn(`  ⚠ Post "${post.title}" has no slug — skipping`);
      continue;
    }

    const bodyHtml = portableTextToHtml(post.body);
    const description =
      post.excerpt ||
      portableTextToPlain(post.body, 155) ||
      "Artigo de medicina funcional integrativa por Catarina Veiga.";
    const ogImage = post.mainImage?.asset?.url || OG_IMAGE_DEFAULT;

    const pageData = {
      path: `/blog/${slug}`,
      title: `${post.title} | Catarina Veiga`,
      description,
      h1: post.title,
      intro: post.excerpt || "",
      ogImage,
      bodyHtml,
      article: {
        headline: post.title,
        description,
        datePublished: post.publishedAt || undefined,
      },
    };

    const html = generatePage(pageData);
    const dir = join(DIST, "blog", slug);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf-8");

    blogCount++;
    console.log(`  ✓ /blog/${slug}`);
  }

  console.log(`✓ Pre-rendered ${blogCount} blog posts from Sanity`);

  // 3. Generate dynamic sitemap
  const sitemap = generateSitemap(pages, posts);
  writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf-8");
  console.log(`✓ Generated sitemap.xml with ${count + blogCount} URLs`);

  // 4. Update robots.txt to point to www
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://www.catarinaveiga.com/sitemap.xml\n`;
  writeFileSync(join(DIST, "robots.txt"), robotsTxt, "utf-8");
  console.log(`✓ Updated robots.txt`);

  console.log(`\n🏁 Total: ${count + blogCount} pages pre-rendered`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
