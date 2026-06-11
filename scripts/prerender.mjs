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

  return blocks
    .map((block) => {
      if (block._type === "block") {
        const text = (block.children || [])
          .map((child) => {
            let t = escapeHtml(child.text || "");
            if (child.marks && child.marks.length > 0) {
              for (const mark of child.marks) {
                if (mark === "strong") t = `<strong>${t}</strong>`;
                else if (mark === "em") t = `<em>${t}</em>`;
              }
            }
            return t;
          })
          .join("");

        switch (block.style) {
          case "h1":
            return `<h1>${text}</h1>`;
          case "h2":
            return `<h2>${text}</h2>`;
          case "h3":
            return `<h3>${text}</h3>`;
          case "h4":
            return `<h4>${text}</h4>`;
          case "blockquote":
            return `<blockquote>${text}</blockquote>`;
          default:
            return text ? `<p>${text}</p>` : "";
        }
      }

      if (block._type === "image" && block.asset) {
        const alt = escapeHtml(block.alt || "");
        return `<img src="${block.asset.url || block.asset._ref || ""}" alt="${alt}" loading="lazy" />`;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n");
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
const pages = [
  // Homepage (v2) · vende a Consulta Inicial (€120)
  {
    path: "/",
    title: "Catarina Veiga · Medicina Tradicional Chinesa Feminina",
    description:
      "Consulta de Medicina Tradicional Chinesa em telemedicina para mulheres em perimenopausa, fadiga persistente e ciclos que mudaram.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Para mulheres em perimenopausa, com fadiga persistente, alterações hormonais, digestivas ou metabólicas que continuam sem explicação clara. Não é sobre fazer mais exames: é sobre ler bem os que já tens. Na consulta inicial olhamos histórico clínico detalhado, sono, digestão, energia, ciclo, sintomas e exames anteriores. Sais com hipóteses claras, prioridades definidas e próximos passos concretos. 60–90 minutos em telemedicina, €120.",
  },
  // SEO article pages
  {
    path: "/ferritina-baixa-sintomas",
    title:
      "Ferritina Baixa: Sintomas, Causas e Intervalos Funcionais | Catarina Veiga",
    description:
      "Ferritina dentro do normal mas com fadiga e queda de cabelo? Descobre a diferença entre valores laboratoriais e funcionais.",
    h1: "Ferritina baixa: sintomas, causas e o que os exames podem não mostrar",
    intro:
      "Muitas mulheres têm ferritina dentro dos valores de referência, e ainda assim apresentam fadiga persistente, queda de cabelo e dificuldade de recuperação.",
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
  },
  {
    path: "/tsh-normal-mas-com-sintomas",
    title:
      "TSH Normal Mas Com Sintomas: Função Tiroideia Funcional | Catarina Veiga",
    description:
      "TSH dentro dos valores normais mas com fadiga, frio, queda de cabelo? Descobre o que os intervalos laboratoriais não mostram.",
    h1: "TSH normal mas com sintomas: o que a tiróide funcional explica",
    intro:
      "O intervalo laboratorial aceita valores até 4.5 mUI/L como normais. Em medicina funcional, valores acima de 2.0 já podem associar-se a lentificação metabólica.",
  },
  {
    path: "/fadiga-exames-normais",
    title:
      "Fadiga com Exames Normais: Causas e Investigação Funcional | Catarina Veiga",
    description:
      "Cansaço persistente com exames normais? Descobre os padrões biomarcadores mais frequentes em mulheres com fadiga inexplicada.",
    h1: "Fadiga com exames normais: porque acontece e o que investigar",
    intro:
      "É uma das queixas mais frequentes em medicina, e uma das mais frustrantes. Os exames estão normais, mas o cansaço persiste.",
  },
  {
    path: "/medicina-funcional",
    title: "Medicina Funcional: Quando os Exames Dão Tudo Normal",
    description:
      "Os teus exames estão normais mas os sintomas continuam. A medicina funcional investiga as causas que os valores de referência standard não mostram.",
    h1: "Medicina Funcional: o que é e quando pode ajudar",
    intro:
      "A medicina funcional é uma abordagem clínica que investiga as causas raiz de sintomas persistentes, especialmente quando os exames parecem normais.",
  },
  {
    path: "/pequenos-almocos-ricos-em-proteina",
    title:
      "Pequenos-Almoços Ricos em Proteína: Porquê, Quanto e O Que Comer | Catarina Veiga",
    description:
      "Descubra porque um pequeno-almoço com 25–30 g de proteína estabiliza energia, reduz cravings e apoia a saúde hormonal, especialmente na perimenopausa.",
    h1: "Pequenos-almoços ricos em proteína: porquê, quanto e o que comer",
    intro:
      "Um pequeno-almoço com 25 a 30 g de proteína estabiliza a glicemia, reduz cravings e apoia a produção hormonal, com impacto directo na energia, no peso e na clareza mental ao longo do dia.",
  },
  {
    path: "/pequenos-almocos-com-proteina-energia-equilibrio-hormonal-e-simplicidade-para-mulheres-em-peri-e-menopausa",
    title:
      "Pequenos-Almoços com Proteína para Mulheres na Peri e Menopausa | Catarina Veiga",
    description:
      "Proteína ao pequeno-almoço estabiliza energia, reduz cravings e apoia o equilíbrio hormonal na perimenopausa. 6 opções simples, rápidas e sem meal prep.",
    h1: "Pequenos-almoços com proteína, energia, equilíbrio hormonal e simplicidade para mulheres em peri e menopausa",
    intro:
      "Se está na perimenopausa ou menopausa, o que come ao pequeno-almoço tem um impacto directo na energia, no peso, no humor e no equilíbrio hormonal.",
  },
  // Main site pages
  {
    path: "/sobre",
    title: "Sobre · Catarina Veiga · Saúde Feminina e Perimenopausa",
    description:
      "Uma leitura integrada do corpo feminino. Para mulheres com sintomas reais e exames aparentemente normais: fadiga, alterações hormonais, ansiedade, sono, metabolismo.",
    h1: "Talvez tenha chegado aqui porque está cansada de ouvir que está tudo normal.",
    intro:
      "Mulheres entre os 35 e os 55 anos. Fadiga, brain fog, ansiedade nova, alterações intestinais, perimenopausa, sono fragmentado. Sintomas reais, exames normais. Uma leitura integrada do corpo feminino, com vinte anos de prática clínica e em colaboração com médica inscrita na Ordem dos Médicos. Telemedicina, em Portugal e no estrangeiro.",
  },
  {
    path: "/metodo",
    title: "O Método · Catarina Veiga · Medicina Tradicional Chinesa",
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
    title: "Recursos · Catarina Veiga · Medicina Tradicional Chinesa",
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
    title: "Programa Fundação 3M | Catarina Veiga",
    description:
      "Programa de acompanhamento em Medicina Funcional Integrativa com duração de 3 meses. Investigação profunda das causas dos teus sintomas.",
    h1: "Programa Fundação 3M",
    intro:
      "Um programa estruturado de 3 meses focado na identificação das causas raiz dos teus desequilíbrios hormonais e metabólicos.",
  },
  {
    path: "/v2",
    title: "Catarina Veiga · Medicina Tradicional Chinesa para Saúde Hormonal Feminina",
    description:
      "Preview homepage v2 · foundation editorial premium. Não indexar.",
    h1: "Os teus exames estão normais. O teu corpo não.",
    intro:
      "Preview homepage v2 · acompanhamento clínico em saúde hormonal feminina.",
    noindex: true,
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
const OG_IMAGE_DEFAULT =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9855dba8-f6e3-4815-8dc5-a5c3c55085dc/id-preview-d882e72b--1b66c010-57ae-47c6-80d8-0bf8d63e429e.lovable.app-1772398965070.png";

function generatePage({ path, title, description, h1, intro, ogImage, bodyHtml }) {
  const canonical = `https://www.catarinaveiga.com${path === "/" ? "" : path}`;
  const image = ogImage || OG_IMAGE_DEFAULT;

  // Build static content for crawlers
  let staticContent;
  if (bodyHtml) {
    // Full article content for blog posts
    staticContent = `<article style="max-width:720px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif"><h1 style="font-size:2rem;line-height:1.2;margin-bottom:16px">${escapeHtml(h1)}</h1>${bodyHtml}<p style="margin-top:24px"><a href="/" style="color:#8b7355">catarinaveiga.com</a></p></article>`;
  } else {
    // Minimal content for static pages
    staticContent = `<div style="max-width:720px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif"><h1 style="font-size:2rem;line-height:1.2;margin-bottom:16px">${escapeHtml(h1)}</h1><p style="color:#666;font-size:1.1rem;line-height:1.6">${escapeHtml(intro)}</p><p style="margin-top:24px"><a href="/" style="color:#8b7355">catarinaveiga.com</a></p></div>`;
  }

  let html = TEMPLATE;

  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
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
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${description}">`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${image}">`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${canonical}">`
  );

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

  // Legal pages
  const legalPages = ["/aviso-legal", "/politica-privacidade", "/termos-utilizacao"];
  for (const p of legalPages) {
    xml += `  <url>\n    <loc>https://www.catarinaveiga.com${p}</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n`;
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
