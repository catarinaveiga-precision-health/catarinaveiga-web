import { Helmet } from "react-helmet-async";
import "@/styles/consulta.css";

import heroPortrait from "@/assets/catarina-hero.jpg";
import bandPhoto from "@/assets/en-consult-notes.jpg";
import signPortrait from "@/assets/catarina-sobre-portrait.jpg";

import { acuityUrl } from "@/lib/acuity";
import faqHome from "@/data/faq-home.json";

/*
  Página da consulta inicial.

  Base: a landing de 22 de agosto, escolhida pela Catarina pelo desenho
  (verde da Parsley, botões redondos, Petrona + Jost). O sistema visual vive
  em src/styles/consulta.css, todo dentro de .cv-consulta para não colidir
  com o sistema v2 do resto do site.

  Conteúdo: modelo da Parsley Health (matriz comparativa, passos do percurso
  à vista, preço à vista, prova em camadas).

  Ordem: Story Framework de 8 secções da skill monetization-copy.
    1 STOP ......... hero, com o outcome e a barreira removida
    2 PROBLEMA ..... os sintomas, no corpo dela e não no sistema de saúde
    3 OUTCOME ...... "não prometo cura, prometo que vai perceber"
    4 REVEAL ....... o que é diferente, e só aqui o produto
    5 INSIDE-OUT ... os cinco passos, mais a matriz e a qualificação
    6 OBJEÇÕES ..... FAQ
    7 PROVA ........ avaliações e testemunhos, colados ao fecho
    8 CTA FINAL .... um botão, um preço

  Três desvios face à landing original, todos com razão:
  - os sintomas subiram para antes de "o que é diferente": o problema tem de
    vir antes do produto, é a regra que dá nome ao framework
  - saiu o bloco do quiz gratuito: era uma segunda CTA a competir
  - "24 horas úteis" passou a 48, que é o que o resto do site promete
*/

const stats = [
  { n: "21", p: "anos a ler análises de mulheres a quem disseram que estava tudo normal" },
  { n: "4000", p: "profissionais de saúde no Reino Unido usavam a Omnos, plataforma de que fez parte da equipa fundadora" },
  { n: "4,8", p: "média em 21 avaliações no Google" },
  { n: "90", p: "minutos de consulta, contra os 15 de uma consulta de rotina" },
];

const creds = [
  { b: "Regenerus Labs", s: "acreditação ativa · Reino Unido" },
  { b: "Omnos", s: "equipa fundadora · Head of Microbiome Department" },
  { b: "Omnos Academy", s: "Academy Manager · braço educativo" },
  { b: "Nordic Labs", s: "acreditação ativa" },
  { b: "Longevity Med Summit", s: "oradora · 2024" },
  { b: "IHCAN Magazine", s: "autora · setembro de 2022" },
];

const sintomas = [
  ["Cansaço que não passa", "Dorme, descansa, abranda. A energia não volta."],
  ["Acorda às três ou quatro", "Adormece bem e acorda de madrugada, sem razão."],
  ["Nevoeiro mental", "Perde palavras, relê a mesma linha, custa concentrar."],
  ["O ciclo mudou", "Mais curto, mais irregular, mais intenso, ou a desaparecer."],
  ["Calor e suores", "Sobretudo de noite, e sem explicação."],
  ["Humor diferente", "Ansiedade nova, irritabilidade, tristeza sem motivo."],
  ["O corpo mudou", "Peso na barriga, cabelo a cair, pele seca."],
  ["Dores e rigidez", "Articulações que doem de manhã."],
];

const leva = [
  "Saber que o que sente é real e tem uma causa fisiológica",
  "Perceber porque é que valores dentro do normal não a estão a servir",
  "Ter prioridades: o que tratar primeiro, e porquê",
  "Deixar de repetir a mesma história em cada consulta nova",
  "Um documento escrito que pode levar ao seu médico",
];

const diferenca = [
  ["01", "Noventa minutos, não quinze", "Tempo para contar a história toda sem ter de a resumir a uma queixa."],
  ["02", "Valores cruzados, não isolados", "Cada marcador lido à luz dos outros, com intervalos funcionais. Ferro, tiroide, vitaminas, inflamação, metabolismo: o que estiver nas suas análises."],
  ["03", "As análises que já tem", "Incluindo as antigas, que mostram para onde os valores se moveram. E se não tiver nenhumas, começamos à mesma."],
  ["04", "Um plano escrito", "Hipóteses, prioridades e próximos passos. Fica consigo."],
];

const passos = [
  ["Passo 1", "Questionário", "Recebe-o por email. Se tiver análises, envia-as, mesmo as antigas. Se não tiver, não é impedimento."],
  ["Passo 2", "A consulta", "90 minutos. Histórico, sono, digestão, energia, ciclo e contexto."],
  ["Passo 3", "A leitura", "Os seus valores relidos com intervalos funcionais e cruzados entre si. Se faltar um painel que o laboratório de rotina não faz, como microbioma, hormonas ou ácidos orgânicos, sou praticante registada na Regenerus Labs e na Nordic Labs e é por aí que se pede."],
  ["Passo 4", "O plano", "Hipóteses, prioridades e próximos passos, por escrito."],
  ["Passo 5", "Encaminhamento", "Se o quadro exigir diagnóstico ou receita, digo-o e encaminho."],
];

const matriz = [
  ["Tempo consigo", "15 a 20 minutos", "nenhum", "90 minutos"],
  ["Como lê os valores", "um a um, contra o intervalo do laboratório", "relatório automático", "cruzados entre si, com intervalos funcionais"],
  ["Usa as análises antigas", "raramente", "não", "sim, quanto mais antigas melhor"],
  ["Diagnóstico e receita", "sim", "não", "não, encaminha"],
  ["Plano escrito no fim", "nem sempre", "não", "sim"],
];

const paraSi = [
  "Tem sintomas persistentes e exames considerados normais",
  "Já passou por várias consultas sem obter explicação",
  "Tem análises feitas e ninguém as leu em conjunto, ou nunca chegou a fazer nenhumas",
  "Está em perimenopausa e atribuíram tudo à idade",
  "Quer perceber a causa, não só gerir o sintoma",
];

const naoParaSi = [
  "Precisa de diagnóstico médico ou de prescrição",
  "Procura resolver tudo numa consulta só",
  "Tem uma situação aguda que exige urgência",
  "Não está disponível para ajustar hábitos ao longo de meses",
  "Quer um plano genérico para seguir sozinha",
];

const testemunhos = [
  ["Finalmente consegui que alguém me escutasse.", "Alexandra Fernandes"],
  ["Comecei finalmente a olhar para as causas, não só para os sintomas. O maior ganho foi no sono.", "Ângela Lourenço"],
  ["Foi o primeiro profissional de saúde a realmente olhar o meu quadro clínico em detalhe.", "Cláudia Soeiro"],
];

const ConsultaInicial = () => (
  <div className="cv-consulta">
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </Helmet>

    {/* ── 1 · STOP ─────────────────────────────────────────────── */}
    <section className="hero">
      <div className="page hero-grid">
        <div>
          <p className="lab">Consulta inicial · online</p>
          <h1>
            A pergunta não é o que tem. <em>É porquê.</em>
          </h1>
          <p className="sub">
            Para mulheres que já contaram esta história a várias pessoas,
            ouviram que está tudo normal, e saíram sem explicação nenhuma.
            Em 90 minutos sai a saber o que se está a passar e por que ordem tratar.
          </p>
          <a className="btn" href={acuityUrl("hero")}>
            Marcar consulta inicial
          </a>
          <p className="fine">
            90 minutos · online · Portugal e estrangeiro.
            Não precisa de ter análises feitas.
          </p>
          <p className="cred-line">
            Catarina Veiga · Functional Medicine Practitioner, acreditada pela
            Regenerus Labs e pela Nordic Labs, Reino Unido
          </p>
        </div>

        <div className="hero-fig">
          <img
            src={heroPortrait}
            alt="Catarina Veiga, especialista em medicina funcional integrativa"
            width={800}
            height={1000}
            loading="eager"
            fetchPriority="high"
          />
          <div className="badge">
            <span className="n">90</span>
            <p>minutos de consulta, contra os quinze de uma consulta de rotina</p>
          </div>
        </div>
      </div>

      <div className="page">
        <div className="stat">
          {stats.map((s) => (
            <div key={s.n}>
              <span className="n">{s.n}</span>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* faixa deslizante · quem chega por recomendação vem confirmar quem ela é */}
    <div className="marquee" aria-label="Percurso e acreditações">
      <div className="marquee-track">
        {[0, 1].map((half) =>
          creds.map((c) => (
            <div className="m" key={`${half}-${c.b}`} aria-hidden={half === 1}>
              <b>{c.b}</b>
              <span>{c.s}</span>
              <span className="dot">&#9670;</span>
            </div>
          )),
        )}
      </div>
    </div>

    {/* ── 2 · PROBLEMA ─────────────────────────────────────────── */}
    <section>
      <div className="page mid">
        <p className="lab">Se está aqui</p>
        <h2 style={{ marginTop: 18 }}>
          Talvez não seja <em>só uma fase</em>
        </h2>
        <p style={{ marginTop: 20, color: "var(--ink-soft)" }}>
          Não precisa de se reconhecer em todos. Basta que um ou dois sejam
          persistentes ou tenham mudado recentemente.
        </p>
      </div>
      <div className="page">
        <div className="sy">
          {sintomas.map(([t, d]) => (
            <div className="i" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="band-img">
      <img
        src={bandPhoto}
        alt="Análises impressas e apontamentos à mão sobre uma mesa de trabalho"
        loading="lazy"
        decoding="async"
      />
    </div>

    {/* ── 3 · OUTCOME ──────────────────────────────────────────── */}
    <section className="sand">
      <div className="page">
        <p className="lab">O que leva desta consulta</p>
        <div className="res">
          <div>
            <h2 className="big">
              Não prometo cura.
              <br />
              <em>Prometo que vai perceber.</em>
            </h2>
            <p className="note">
              É a única coisa que garanto sempre, independentemente do que as
              análises mostrarem. O resto depende do que estiver por trás, e
              disso falamos com verdade.
            </p>
          </div>
          <ul style={{ margin: 0, padding: 0 }}>
            {leva.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* ── 4 · REVEAL ───────────────────────────────────────────── */}
    <section>
      <div className="page">
        <p className="lab">O que é diferente</p>
        <h2 style={{ marginTop: 18, maxWidth: "20ch" }}>
          Ninguém precisa de mais exames.{" "}
          <em>Precisa que alguém leia os que já tem.</em>
        </h2>
        <div className="cards">
          {diferenca.map(([n, t, d]) => (
            <div className="card" key={n} style={{ background: "var(--sand)" }}>
              <span className="n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 5 · INSIDE-OUT ───────────────────────────────────────── */}
    <section className="sand">
      <div className="page">
        <p className="lab">Como funciona</p>
        <h2 style={{ marginTop: 18, maxWidth: "18ch" }}>
          Do primeiro email <em>ao plano escrito</em>
        </h2>
        <p style={{ marginTop: 20, color: "var(--ink-soft)", maxWidth: "52ch" }}>
          Cinco passos, sem surpresas. Sabe exatamente o que vai acontecer
          antes de marcar.
        </p>
        <div className="steps">
          {passos.map(([k, t, d]) => (
            <div className="s" key={k}>
              <span className="k">{k}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* matriz comparativa · o elemento da Parsley que ninguém em PT tem */}
    <section>
      <div className="page">
        <p className="lab">Comparação</p>
        <h2 style={{ marginTop: 18, maxWidth: "16ch" }}>
          Onde é que isto <em>encaixa</em>
        </h2>
        <p style={{ marginTop: 20, color: "var(--ink-soft)" }}>
          Não substitui o seu médico. Faz outra coisa.
        </p>
        <div className="matrix-wrap">
          <table>
            <thead>
              <tr>
                <th />
                <th>Consulta de rotina</th>
                <th>Análises online</th>
                <th className="me">Esta consulta</th>
              </tr>
            </thead>
            <tbody>
              {matriz.map(([crit, a, b, c]) => (
                <tr key={crit}>
                  <td>{crit}</td>
                  <td className="off">{a}</td>
                  <td className="off">{b}</td>
                  <td className="me">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* qualificação */}
    <section className="sand">
      <div className="page">
        <p className="lab">Antes de marcar</p>
        <h2 style={{ marginTop: 18, maxWidth: "16ch" }}>
          {/* nowrap: sem isto a linha parte em "serve-" / "lhe" no hífen */}
          <span style={{ whiteSpace: "nowrap" }}>Isto serve-lhe,</span>{" "}
          <em>ou não serve</em>
        </h2>
        <div className="fit">
          <div className="yes">
            <h3>É para si se</h3>
            <ul>
              {paraSi.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="no">
            <h3>Não é para si se</h3>
            <ul>
              {naoParaSi.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mesmo botão, mesma acção: a regra da skill é uma CTA, não um
            botão. Numa página de nove mil pixéis, este é o ponto onde
            ela acaba de decidir que se reconhece. */}
        <div style={{ marginTop: "var(--s7)" }}>
          <a className="btn" href={acuityUrl("qualificacao")}>
            Marcar consulta inicial
          </a>
          <p className="fine">90 minutos · online · Portugal e estrangeiro</p>
        </div>
      </div>
    </section>

    {/* ── 6 · OBJEÇÕES ─────────────────────────────────────────── */}
    <section>
      <div className="page mid">
        <p className="lab">Perguntas frequentes</p>
        <h2 style={{ margin: "18px 0 var(--s6)" }}>
          Respostas <em>diretas</em>
        </h2>
        {faqHome.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            {f.a.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </details>
        ))}
      </div>
    </section>

    {/* ── 7 · PROVA ────────────────────────────────────────────── */}
    <section className="sand">
      <div className="page">
        <p className="lab">Pacientes</p>
        <div className="score">
          <span className="b">4,8</span>
          <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
            média em 21 avaliações no Google
          </p>
        </div>
        <div className="quotes">
          {testemunhos.map(([q, a]) => (
            <blockquote key={a}>
              {q}
              <cite>{a}</cite>
            </blockquote>
          ))}
        </div>

        <div className="sign">
          <img
            src={signPortrait}
            alt="Catarina Veiga"
            width={88}
            height={88}
            loading="lazy"
          />
          <p>
            <b>Catarina Veiga, Functional Medicine Practitioner</b>
            Especialista em medicina funcional integrativa, acreditada pela
            Regenerus Labs e pela Nordic Labs, no Reino Unido. Vinte e um anos
            de prática clínica em saúde feminina. Fez parte da equipa fundadora
            da Omnos, no Reino Unido, onde foi Head of Microbiome Department
            durante quatro anos e Academy Manager. Interpreta painéis funcionais
            de microbioma, hormonas e ácidos orgânicos.
          </p>
        </div>
      </div>
    </section>

    {/* ── 8 · CTA FINAL ────────────────────────────────────────── */}
    <section className="forest close">
      <div className="page">
        <p className="lab">Marcar consulta</p>
        <h2 style={{ marginTop: 18 }}>
          A pergunta não é o que tem. <em>É porquê.</em>
        </h2>
        <p>
          Consulta inicial de 90 minutos, online. Traga as análises que já tem.
          Se não tiver, começamos à mesma.
        </p>
        <a className="btn pale" href={acuityUrl("fecho")}>
          Marcar consulta inicial
        </a>
        <p className="fine">
          Resposta em 48 horas úteis · português e inglês
        </p>
      </div>
    </section>
  </div>
);

export default ConsultaInicial;
