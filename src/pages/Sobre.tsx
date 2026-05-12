import Navbar from "@/components/Navbar";
import catarinaPhoto from "@/assets/catarina-sobre-portrait.jpg";
import Footer from "@/components/Footer";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import AcuityModal from "@/components/AcuityModal";
import { useAcuityModal, openAcuity } from "@/hooks/useAcuityModal";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";

const AmberHairline = ({ className = "" }: { className?: string }) => (
  <div className={`w-[60px] h-[1px] bg-amber mx-auto ${className}`} />
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-8">
    {children}
  </p>
);

/* ── I  POSICIONAMENTO ── */
const PositioningSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto fade-up text-center">
        <Eyebrow>I  —  Sobre</Eyebrow>
        <p className="font-serif italic text-[clamp(1.5rem,2.8vw,2.25rem)] leading-snug text-foreground max-w-[42ch] mx-auto mb-12">
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
        <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed">
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
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>II  —  Percurso</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          Cheguei à Medicina Tradicional Chinesa por necessidade, não por convicção.
        </h2>

        <div className="space-y-6 text-foreground/85 font-sans text-[1.0625rem] leading-[1.7]">
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
          <p className="font-serif italic text-[clamp(1.25rem,2vw,1.625rem)] leading-snug text-foreground">
            "Entre o normal laboratorial e sentir-se verdadeiramente bem existe muitas vezes um espaço que merece atenção."
          </p>
          <footer className="font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground mt-4">
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
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>III  —  Tese</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          A maioria das respostas que as mulheres recebem ainda são demasiado curtas.
        </h2>
        <div className="space-y-6 text-foreground/85 font-sans text-[1.0625rem] leading-[1.7]">
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
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl mx-auto fade-up">
        <Eyebrow>IV  —  Método</Eyebrow>
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-tight text-foreground mb-12 text-balance">
          Leio antes de propor.
        </h2>
        <div className="space-y-6 text-foreground/85 font-sans text-[1.0625rem] leading-[1.7]">
          <p>
            Cada acompanhamento começa com uma anamnese longa. Não vinte minutos. Sessenta a noventa. Histórico clínico, padrões energéticos, ciclo, sono, digestão, emocional. Exames recentes, se existem. Tudo no mesmo plano de leitura.
          </p>
          <p>
            Depois construo. Um plano por escrito que pode incluir fitoterapia chinesa, ajustes alimentares, ritmo, sono, gestão de stress. Reavaliações periódicas. Se houver indicação clínica — uma análise, uma prescrição, uma especialidade — encaminho. Não substituo o que não é meu para substituir.
          </p>
        </div>

        <AmberHairline className="mt-16 mb-10" />

        <p className="font-sans text-[15px] leading-relaxed text-muted-foreground italic text-center max-w-[58ch] mx-auto">
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
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-4xl mx-auto fade-up">
        <Eyebrow>V  —  Formação e palcos</Eyebrow>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-6">
              Formação
            </p>
            <ul>
              {formacao.map((f, i) => (
                <li
                  key={f}
                  className={`font-sans text-[15px] leading-[1.65] text-foreground/85 py-3 ${
                    i < formacao.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-6">
              Publicações e palcos
            </p>
            <ul>
              {publicacoes.map((p, i) => (
                <li
                  key={p}
                  className={`font-sans text-[15px] leading-[1.65] text-foreground/85 py-3 ${
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
    <section ref={ref} className="bg-bone section-padding">
      <div className="max-w-2xl md:max-w-3xl mx-auto md:ml-[max(24px,8vw)] md:mr-auto fade-up">
        <Eyebrow>VI  —  Transparência</Eyebrow>
        <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.25rem)] leading-tight text-foreground mb-10">
          Para que não haja ambiguidade.
        </h2>
        <ul className="space-y-5 max-w-[55ch]">
          {items.map((item) => (
            <li
              key={item}
              className="font-sans text-base leading-relaxed text-foreground/85 pl-5 border-l border-amber/40"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="font-sans text-[15px] text-foreground/85 mt-12 max-w-[55ch] leading-relaxed">
          A clareza sobre aquilo que faço — e aquilo que não faço — faz parte da forma como trabalho.
        </p>
        <p className="font-sans text-[15px] italic text-muted-foreground mt-4 max-w-[55ch]">
          Esta consulta integra-se numa rede de cuidados — não a substitui.
        </p>
      </div>
    </section>
  );
};

/* ── VII  CTA ── */
const CTASection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-2xl mx-auto text-center fade-up">
        <h2 className="font-serif text-[clamp(1.75rem,2.5vw,2.25rem)] leading-tight text-foreground mb-6">
          Se chegaste até aqui.
        </h2>
        <p className="font-sans text-[1.0625rem] text-muted-foreground max-w-[52ch] mx-auto mb-10">
          Provavelmente vale a pena conversarmos.
        </p>
        <Button variant="hero" size="lg" onClick={openAcuity}>
          Iniciar acompanhamento
        </Button>
        <p className="font-sans text-xs text-muted-foreground/60 mt-4 tracking-wide">
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
      <Navbar />
      <main>
        <PositioningSection />
        <PercursoSection />
        <TeseSection />
        <MetodoSection />
        <FormacaoSection />
        <TransparenciaSection />
        <CTASection />
      </main>
      <LegalBand />
      <Footer />
      <MobileCTA />
      <AcuityModal open={open} onClose={onClose} />
    </>
  );
};

export default Sobre;
