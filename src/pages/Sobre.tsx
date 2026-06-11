import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import catarinaPhoto from "@/assets/catarina-sobre-portrait.jpg";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import AcuityModal from "@/components/AcuityModal";
import { useAcuityModal, openAcuity } from "@/hooks/useAcuityModal";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";

const AmberHairline = ({ className = "" }: { className?: string }) => (
  <div className={`w-[60px] h-[1px] bg-v2-golden mx-auto ${className}`} />
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-v2-ink-mute mb-8">
    {children}
  </p>
);

/* ── I  POSICIONAMENTO ── */
const PositioningSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto fade-up text-center">
        <Eyebrow>I  —  Sobre</Eyebrow>
        <p className="font-serif italic text-[clamp(1.5rem,2.8vw,2.25rem)] leading-snug text-v2-ink max-w-[42ch] mx-auto mb-12">
          Acompanho mulheres que sabem que algo não está certo — mesmo quando os números dizem o contrário.
        </p>
        <div className="flex justify-center mb-10">
          <img
            src={catarinaPhoto}
            alt="Catarina Veiga, especialista em Medicina Tradicional Chinesa"
            className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full object-cover object-top"
            loading="lazy"
            decoding="async"
            width={220}
            height={220}
          />
        </div>
        <p className="font-sans text-sm text-v2-ink-mute/80 leading-relaxed">
          Catarina Veiga  ·  Especialista em Medicina Tradicional Chinesa  ·  Telemedicina, Portugal e estrangeiro
        </p>
      </div>
    </section>
  );
};

/* ── II  PERCURSO ── */
const PercursoSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>II  —  Percurso</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-v2-ink mb-12 text-balance">
          Cheguei à Medicina Tradicional Chinesa por necessidade, não por convicção.
        </h2>

        <div className="space-y-6 text-v2-ink/85 font-sans text-[1.0625rem] leading-[1.7]">
          <p>
            Há vinte e poucos anos passei por um pós-operatório complexo ao menisco. Os exames estavam normais. Os sintomas não. Foi a primeira vez que vi, na primeira pessoa, a fenda entre o que se mede e o que se sente. Fui investigar as causas — e encontrei défices funcionais que a medicina convencional tinha classificado como dentro da normalidade. Foi essa experiência que mudou a forma como pratico.
          </p>
          <p>
            Foi por aí que cheguei à Medicina Tradicional Chinesa. Não pela estética, nem pela filosofia. Por método. A MTC dá-me uma forma de ler o corpo que não depende exclusivamente de marcadores isolados — observa padrões, contexto, ritmo. E isso, em mulheres com sintomas que escorregam por entre os exames, é raro.
          </p>
          <p>
            Comecei a prática em equipas multidisciplinares com psicólogos e psiquiatras. Foi cedo que percebi que fisiologia e saúde mental não se separam — uma serve a outra, sempre. Esse enquadramento nunca me largou.
          </p>
          <p>
            Formei-me no Instituto Van Nghi Portugal. Tenho cédula provisória da ACSS ao abrigo da Lei n.º 71/2013, em validação de créditos. Pratico há vinte anos. Em 2024, fui oradora no Longevity Med Summit, com a apresentação "Oestrogen-Related Conditions and Gut Microbiota".
          </p>
          <p>
            Entre 2020 e 2024 integrei a equipa da Omnos.me — hoje Regenerus Labs, um dos maiores laboratórios europeus de testes funcionais. Quatro anos no Departamento de Microbioma e à frente da Educação para a Saúde. Estive envolvida no desenvolvimento da interface clínica do teste de microbioma 360°, premiado no Reino Unido. Não foi um intervalo. Foi onde aprendi a ler análises funcionais com a profundidade que hoje trago para a consulta.
          </p>
          <p>
            A razão pela qual continuo a fazer este trabalho não está só no currículo. Está também na perimenopausa que vivo na primeira pessoa — e na frustração, repetida em vinte anos de prática, de ver mulheres saírem dos consultórios com "está tudo normal" quando claramente não está.
          </p>
        </div>

        <AmberHairline className="mt-20 mb-20" />

        <blockquote className="text-center max-w-[50ch] mx-auto">
          <p className="font-serif italic text-[clamp(1.25rem,2vw,1.625rem)] leading-snug text-v2-ink">
            "Entre o normal laboratorial e sentir-se verdadeiramente bem existe muitas vezes um espaço que merece atenção."
          </p>
          <footer className="font-sans text-[11px] uppercase tracking-[0.12em] text-v2-ink-mute mt-4">
            — Catarina Veiga
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ── III  TESE ── */
const TeseSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>III  —  Tese</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-v2-ink mb-12 text-balance">
          A maioria das respostas que as mulheres recebem ainda são demasiado curtas.
        </h2>
        <div className="space-y-6 text-v2-ink/85 font-sans text-[1.0625rem] leading-[1.7]">
          <p>
            Há um padrão que vejo repetidamente. Mulheres entre os 38 e os 55 anos. Sintomas reais. Exames normais. E uma sequência de consultas que termina em "é stress" ou "é da idade".
          </p>
          <p>
            Não é stress. Não é só da idade. É um corpo a sinalizar uma transição que merece ser lida com a complexidade que tem — perimenopausa, eixo hormonal, sistema nervoso, intestino, sono, ritmos. Tudo ligado. Raramente em silos.
          </p>
          <p>
            O sistema convencional faz coisas que eu não faço, e bem — diagnostica, prescreve, opera. Mas o tempo curto da consulta médica deixa pouco espaço para o que vem entre os silos. É nesse espaço que eu trabalho.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── IV  MÉTODO ── */
const MetodoSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>IV  —  Método</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-v2-ink mb-12 text-balance">
          Leio antes de propor.
        </h2>
        <div className="space-y-6 text-v2-ink/85 font-sans text-[1.0625rem] leading-[1.7]">
          <p>
            Cada acompanhamento começa com uma anamnese longa. Não vinte minutos. Sessenta a noventa. Histórico clínico, padrões energéticos, ciclo, sono, digestão, emocional. Exames recentes, se existem. Tudo no mesmo plano de leitura.
          </p>
          <p>
            Depois construo. Um plano por escrito que pode incluir fitoterapia chinesa, ajustes alimentares, ritmo, sono, gestão de stress. Reavaliações periódicas. Se houver indicação clínica — uma análise, uma prescrição, uma especialidade — encaminho. Não substituo o que não é meu para substituir.
          </p>
        </div>

        <AmberHairline className="mt-16 mb-10" />

        <p className="font-sans text-[15px] leading-relaxed text-v2-ink-mute italic text-center max-w-[58ch] mx-auto">
          Colaboro com a Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos, responsável pela componente médica do acompanhamento. Em rede com endocrinologia, ginecologia, psicologia, gastroenterologia e outras especialidades quando faz sentido.
        </p>
      </div>
    </section>
  );
};

/* ── V  FORMAÇÃO E PALCOS ── */
const formacao = [
  "Instituto Van Nghi Portugal — Medicina Tradicional Chinesa",
  "Nutrição Funcional e Interpretação de Exames Laboratoriais — Dr. Gabriel de Carvalho, FSA",
  "Modulação Intestinal — Prof. Murilo Pereira",
  "Nutrição Funcional Pediátrica",
  "Psicologia — Universidade de Lisboa",
  "Neurobiologia — University of Chicago",
  "Pós-graduação em Língua Gestual — FMUL",
];

const publicacoes = [
  'Longevity Med Summit 2024 — oradora · "Oestrogen-Related Conditions and Gut Microbiota"',
  "Artigos em publicações internacionais de saúde funcional",
  "Webinários e formação para profissionais de saúde · Reino Unido e Portugal",
  "Quatro anos no Departamento de Microbioma · Regenerus Labs (anteriormente Omnos.me)",
];

const FormacaoSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-4xl mx-auto fade-up">
        <Eyebrow>V  —  Formação e palcos</Eyebrow>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-v2-ink-mute mb-6">
              Formação
            </p>
            <ul>
              {formacao.map((f, i) => (
                <li
                  key={f}
                  className={`font-sans text-[15px] leading-[1.65] text-v2-ink/85 py-3 ${
                    i < formacao.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-v2-ink-mute mb-6">
              Publicações e palcos
            </p>
            <ul>
              {publicacoes.map((p, i) => (
                <li
                  key={p}
                  className={`font-sans text-[15px] leading-[1.65] text-v2-ink/85 py-3 ${
                    i < publicacoes.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── VI  TRANSPARÊNCIA ── */
const TransparenciaSection = () => {
  const ref = useFadeUp();
  const items = [
    "Não sou médica. Não estou inscrita na Ordem dos Médicos.",
    "Não sou nutricionista.",
    "Não prescrevo medicamentos. Não peço análises. Não emito diagnósticos médicos.",
    "O meu trabalho não substitui diagnóstico ou tratamento médico. Acompanho, dentro do âmbito da MTC, em complemento ao acompanhamento médico.",
  ];
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-2xl md:max-w-3xl mx-auto md:ml-[max(24px,8vw)] md:mr-auto fade-up">
        <Eyebrow>VI  —  Transparência</Eyebrow>
        <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.25rem)] leading-tight text-v2-ink mb-10">
          Para que não haja ambiguidade.
        </h2>
        <ul className="space-y-5 max-w-[55ch]">
          {items.map((item) => (
            <li
              key={item}
              className="font-sans text-base leading-relaxed text-v2-ink/85 pl-5 border-l border-v2-golden/40"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="font-sans text-[15px] text-v2-ink/85 mt-12 max-w-[55ch] leading-relaxed">
          A clareza sobre aquilo que faço — e aquilo que não faço — faz parte da forma como trabalho.
        </p>
        <p className="font-sans text-[15px] italic text-v2-ink-mute mt-4 max-w-[55ch]">
          Esta consulta integra-se numa rede de cuidados — não a substitui.
        </p>
      </div>
    </section>
  );
};

/* ── VII  FAQ ── */
const faqItems = [
  {
    q: "O que acontece na primeira consulta?",
    a: "A primeira consulta dura entre 60 e 90 minutos, em videochamada. Recebes um questionário prévio por email para preparar. Em consulta, exploramos o teu histórico clínico, sintomas, ciclo, sono, digestão, energia e contexto emocional. Sais com um plano estruturado por escrito, com revisões previstas.",
  },
  {
    q: "Como funciona o acompanhamento?",
    a: "O acompanhamento estende-se ao longo do tempo. Após a primeira consulta, há revisões periódicas para ajustar o plano à evolução. A frequência depende do teu caso — pode ser mais próxima nas fases iniciais e espaçar-se à medida que o equilíbrio se estabiliza. Não é uma consulta isolada. É um processo.",
  },
  {
    q: "Em que casos é indicado este acompanhamento?",
    a: "Acompanho mulheres em transições hormonais — perimenopausa, alterações de ciclo, fadiga persistente, sono alterado, equilíbrio emocional, digestão sensível. Trabalho sobretudo com sintomas reais e exames maioritariamente normais. Para descompensações agudas ou necessidade de intervenção médica imediata, refiro para médicos e outras especialidades.",
  },
  {
    q: "Como olhas para as análises clínicas?",
    a: "A leitura clínica oficial das análises é da Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos com quem colaboro. O que eu faço é integrar essa leitura no contexto mais amplo da Medicina Tradicional Chinesa e dos quatro anos que passei no Departamento de Microbioma da Regenerus Labs. Integro — não substituo — a interpretação médica.",
  },
  {
    q: "O que posso esperar ao longo do tempo?",
    a: "A evolução depende de vários fatores — o teu corpo, a tua fase de vida, a consistência com o plano. As pacientes descrevem mudanças subjetivas em sono, energia e equilíbrio ao longo de semanas a meses. Não prometo prazos nem resultados.",
  },
];

const FAQSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} id="faq" className="bg-v2-paper section-padding scroll-mt-24">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>VII  —  Antes de marcares</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-v2-ink mb-12 text-balance">
          Perguntas frequentes.
        </h2>
        <div className="space-y-0">
          {faqItems.map((item, i) => (
            <details
              key={item.q}
              className={`group py-6 md:py-7 ${i < faqItems.length - 1 ? "border-b border-border" : ""}`}
            >
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                <h3 className="font-serif text-[1.125rem] md:text-[1.25rem] text-v2-ink/90 group-open:text-v2-ink transition-colors">
                  {item.q}
                </h3>
                <span className="font-serif text-2xl text-v2-golden leading-none mt-0.5 transition-transform duration-200 group-open:rotate-45 shrink-0">
                  +
                </span>
              </summary>
              <p className="font-sans text-[15px] md:text-[1rem] leading-[1.7] text-v2-ink/80 mt-4 max-w-[60ch]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── VIII  CTA ── */
const CTASection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-2xl mx-auto text-center fade-up">
        <h2 className="font-serif text-[clamp(1.75rem,2.5vw,2.25rem)] leading-tight text-v2-ink mb-6">
          Se chegaste até aqui.
        </h2>
        <p className="font-sans text-[1.0625rem] text-v2-ink-mute max-w-[52ch] mx-auto mb-10">
          Provavelmente vale a pena conversarmos.
        </p>
        <Button variant="hero" size="lg" onClick={openAcuity}>
          Iniciar acompanhamento
        </Button>
        <p className="font-sans text-xs text-v2-ink-mute/60 mt-4 tracking-wide">
          Telemedicina  ·  60-90 minutos  ·  questionário prévio por email
        </p>
      </div>
    </section>
  );
};

/* ── PAGE ── */
const Sobre = () => {
  const { open, onClose } = useAcuityModal();

  return (
    <>
      <NavbarV2 />
      <main>
        <PositioningSection />
        <PercursoSection />
        <TeseSection />
        <MetodoSection />
        <FormacaoSection />
        <TransparenciaSection />
        <FAQSection />
        <CTASection />
      </main>
      <LegalBand />
      <FooterV2 />
      <MobileCTA />
      <AcuityModal open={open} onClose={onClose} />
    </>
  );
};

export default Sobre;
