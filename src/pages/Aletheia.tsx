import { Helmet } from "react-helmet-async";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import catarinaPhoto from "@/assets/catarina-sobre-portrait.jpg";

const ACUITY_URL = "https://catarinaveigaagendamento.as.me/";

/* ── I — HERO ── */
const HeroSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-ivory section-padding pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto text-center fade-up">
        <h1 className="font-serif text-[2.5rem] md:text-6xl lg:text-7xl text-foreground leading-tight mb-8">
          Os teus exames estão normais.<br className="hidden md:block" /> O teu corpo discorda.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Catarina Veiga lê as análises que já tens com leitura funcional integrada. Observa o que os intervalos de referência convencionais deixam escapar — e o que isso tem a ver com a tua fadiga, o teu sono e os teus ciclos.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href={ACUITY_URL} target="_blank" rel="noopener noreferrer">
            Marcar avaliação inicial
          </a>
        </Button>
      </div>
    </section>
  );
};

/* ── II — TICKER CLÍNICO ── */
const TickerSection = () => (
  <section className="bg-background border-y border-border">
    <div className="max-w-6xl mx-auto section-padding py-8 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-center">
        <p className="label-uppercase text-foreground text-xs">4,8 ★ no Google · 18 críticas verificadas</p>
        <span className="hidden md:block text-amber">·</span>
        <p className="label-uppercase text-foreground text-xs">20+ anos de prática clínica</p>
        <span className="hidden md:block text-amber">·</span>
        <p className="label-uppercase text-foreground text-xs">Portugal e Brasil</p>
      </div>
    </div>
  </section>
);

/* ── III — RECONHECES-TE? ── */
const symptoms = [
  "Acordas cansada mesmo depois de dormir oito horas. O cansaço deixou de ser proporcional ao esforço.",
  "O peso mudou sem que a tua alimentação tivesse mudado. A gordura abdominal aumentou e não responde ao que já tentaste.",
  "O ciclo ficou diferente — fluxo, duração, TPM mais pesada, suores nocturnos, insónia entre as 2h e as 4h.",
  "A cabeça fica em névoa a meio da tarde. Esqueces palavras, concentras-te menos, demoras mais em tudo.",
  "A ansiedade voltou ou tem outra intensidade. Irritas-te com o que antes não te incomodava.",
  "O cabelo caiu mais. A pele ficou mais seca, sem vida. A digestão ficou lenta.",
  "Tens uma doença autoimune diagnosticada — ou sintomas que ninguém conseguiu explicar.",
  'Já ouviste "está tudo bem" mais vezes do que consegues contar. E continuas a sentir que algo não está certo.',
];

const ReconhecesSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-3xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-4">
          Se te reconheces nisto, este programa foi pensado para ti.
        </h2>
        <p className="text-muted-foreground text-lg mb-10 italic">
          O corpo continua a falar. O sistema é que não está a ouvir.
        </p>
        <ul className="space-y-4 mb-10">
          {symptoms.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground text-[15px] leading-relaxed">
              <span className="text-amber mt-1.5 text-xs shrink-0">●</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground text-[15px] leading-relaxed border-l-[3px] border-amber pl-6">
          Estes sintomas não são imaginados. São sinais mensuráveis de disfunção em sistemas específicos — que os painéis convencionais não foram desenhados para ver.
        </p>
      </div>
    </section>
  );
};

/* ── IV — O CONCEITO ── */
const ConceitoSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-ivory section-padding">
      <div className="max-w-3xl mx-auto fade-up">
        <p className="label-uppercase text-amber mb-4">O conceito</p>
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-10">
          A medicina convencional olha para médias. Nós olhamos para o teu óptimo.
        </h2>
        <div className="text-muted-foreground text-[15px] leading-relaxed space-y-5 mb-10">
          <p>
            Os intervalos de referência laboratoriais detectam doença instalada. Não detectam o que se passa entre estar saudável e estar doente — que é exactamente onde a maioria das mulheres entre os 35 e os 55 anos vive.
          </p>
          <p className="text-foreground font-medium">Três exemplos concretos:</p>
        </div>
        <ul className="space-y-5">
          {[
            'Uma TSH de 3,8 aparece como "normal" no laboratório. Em intervalos funcionais, é disfunção tiroideia subclínica.',
            "Um HOMA-IR de 1,84 não é diabetes — mas pode ser a razão biológica pela qual o teu peso não responde.",
            'Ferritina de 18 imprime-se como "dentro dos limites normais". Esta mulher está funcionalmente deficiente em ferro.',
          ].map((s, i) => (
            <li key={i} className="border-l-[3px] border-amber pl-6 text-foreground text-[15px] leading-relaxed">
              {s}
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground text-[15px] mt-10 italic">
          São lentes diferentes sobre os mesmos dados.
        </p>
      </div>
    </section>
  );
};

/* ── V — QUEM VAI ACOMPANHAR ── */
const QuemAcompanhaSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-5xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-10">
          Quem vai acompanhar o teu caso
        </h2>
        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
          <img
            src={catarinaPhoto}
            alt="Catarina Veiga, especialista em Medicina Funcional Integrativa"
            className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full object-cover object-top mx-auto md:mx-0"
            loading="lazy"
            decoding="async"
            width={280}
            height={280}
          />
          <div className="text-muted-foreground text-[15px] leading-relaxed space-y-4">
            <p>
              Catarina Veiga é especialista em Medicina Funcional Integrativa, com 20 anos de prática clínica e cédula provisória da ACSS ao abrigo da Lei n.º 71/2013. Formação em psicologia, análises funcionais e neurobiologia. Quatro anos no Departamento de Microbioma da Regenerus Labs (anteriormente Omnos.me), um dos maiores laboratórios europeus de testes funcionais. Pioneira em Portugal na construção de painéis de avaliação biofuncional e plataformas de interpretação de análises funcionais.
            </p>
            <p>
              Em Maio de 2024, foi speaker convidada no Longevity Med Summit, em Lisboa, com a apresentação <em>Exploring the link between oestrogen-related conditions and gut microbiota</em> — ao lado dos directores médicos da Clinique La Prairie, Lanserhof e Cleveland Clinic Abu Dhabi.
            </p>
            <p>
              Conhece a diferença entre ler um artigo sobre flutuações hormonais e dormir mal cinco noites por semana durante meses sem conseguir dizer porquê. A especialização não é apenas académica.
            </p>
            <p className="text-foreground">
              A Aletheia não é uma consulta a solo. A equipa inclui profissionais parceiros em yoga terapêutico, libertação somática e coaching — seleccionados pela Catarina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── VI — O QUE ESTÁ INCLUÍDO ── */
const inclusions: { title: string; desc: string }[] = [
  { title: "Relatório de Avaliação BioFuncional ODX", desc: "Interpretação funcional de 66+ biomarcadores em 12 sistemas. O mapa que fundamenta todo o resto." },
  { title: "Consultas de medicina funcional integrativa", desc: "Frequência adaptada ao teu plano. Revisão de dados, ajuste de plano, leitura funcional integrada." },
  { title: "Plano alimentar adaptado e revisto", desc: "Com base nos teus marcadores e sintomas. Não é uma dieta genérica de perimenopausa." },
  { title: "Orientação e análise de dados de wearables", desc: "Monitor contínuo de glicose, Oura Ring e outros. Os dados do teu corpo lidos clinicamente." },
  { title: "App totalmente personalizada", desc: "Tracking de sintomas, sono, ciclo, energia. A Catarina lê os dados antes de cada consulta." },
  { title: "Sessões com profissionais parceiros", desc: "Yoga terapêutico, libertação somática, coaching e outros conforme o contexto clínico." },
  { title: "Relatórios de progresso ao longo do plano", desc: "Não uma avaliação inicial e outra final. Dados intermédios que mostram o que mudou." },
  { title: "Gestão activa de suplementos", desc: "Prescrição, ajuste de dose, rotação. Sem frascos que ninguém reviu." },
  { title: "Recomendação de testes especializados com desconto", desc: "Microbioma, ácidos orgânicos, DUTCH, ADN e outros quando o caso beneficia." },
  { title: "Gestão total do processo", desc: "Uma pessoa responsável por tudo durante o plano inteiro." },
];

const IncluidoSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-ivory section-padding">
      <div className="max-w-4xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-4">
          O que está incluído
        </h2>
        <p className="text-muted-foreground text-lg italic mb-12">
          Tudo coordenado pela Catarina. Tu não articulas nada.
        </p>
        <ol className="space-y-6">
          {inclusions.map((item, i) => (
            <li key={i} className="grid grid-cols-[40px_1fr] gap-4 border-b border-border pb-6 last:border-0">
              <span className="font-serif text-2xl text-amber">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-foreground font-medium mb-1">{item.title}</p>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ── VII — COMO FUNCIONA ── */
const steps = [
  {
    n: "01",
    title: "Avaliação inicial",
    desc: "Uma conversa clínica em que a Catarina revê a tua história, os teus sintomas e os exames que já fizeste. Determina se o programa é indicado para ti — e se não for, diz-te. Se for, explica exactamente como avançar.",
  },
  {
    n: "02",
    title: "Relatório BioFuncional",
    desc: "Análise dos teus 66+ biomarcadores em intervalos funcionais. Identificação dos padrões cruzados entre sistemas — não marcador a marcador, mas o quadro completo.",
  },
  {
    n: "03",
    title: "Plano clínico personalizado",
    desc: "Com base no relatório, define-se a duração do plano, a frequência de consultas, os profissionais parceiros a activar e os testes adicionais a fazer — sempre conforme o teu caso, dados, análises e estilo de vida.",
  },
  {
    n: "04",
    title: "Acompanhamento e ajuste",
    desc: "O plano é revisto todos os meses com base no que os dados mostram. Não é um protocolo estático — evolui à medida que a tua fisiologia muda.",
  },
];

const ComoFuncionaSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-4xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-12">
          Como funciona
        </h2>
        <ol className="space-y-8">
          {steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 border-l-[3px] border-amber pl-6 md:pl-8 py-2">
              <span className="font-serif text-3xl md:text-4xl text-amber">{s.n}</span>
              <div>
                <p className="font-serif text-xl md:text-2xl text-foreground mb-2">{s.title}</p>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ── VIII — CONTRA-DTC ── */
const ContraDtcSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-ivory section-padding">
      <div className="max-w-3xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-10">
          Já fizeste testes — e ficaste com papel?
        </h2>
        <div className="text-muted-foreground text-[15px] leading-relaxed space-y-5">
          <p>
            Muitas pessoas compram testes de microbioma, genéticos ou hormonais online. Ficam com dados. Não ficam com uma estratégia.
          </p>
          <p>
            O problema não é o teste. É não ter ninguém a ler tudo junto — e a decidir o que fazer primeiro, o que esperar, e o que não vale a pena tratar se não tratar outra coisa antes.
          </p>
          <p className="text-foreground font-medium">
            Na Aletheia tens um único ponto de contacto. A Catarina coordena tudo — testes, suplementos, profissionais parceiros, dados de wearables, análises de progresso. Tu executas. Nós gerimos.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── IX — TESTEMUNHOS ── */
const Stars5 = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className="fill-amber text-amber" />
    ))}
  </div>
);

const testimonials = [
  {
    name: "Alexandra Fernandes",
    text: "Finalmente consegui que alguém me escutasse. A Dra. Catarina escutou, validou, avaliou e analisou todos os meus sintomas como mais nenhum médico foi capaz de fazer. Ainda estamos em processo mas muitos aspectos já foram esclarecidos e melhorados. Recomendo a todos que se sintam perdidos, não validados e cujos sintomas condicionem o dia a dia.",
  },
  {
    name: "Mariana Fernandes",
    text: "Os resultados que tenho obtido são incríveis, tanto nos níveis de energia, como na clareza mental, e acredite-se ou não, nos quilos que perco... sem fazer dieta absolutamente nenhuma. O acompanhamento no programa é muito próximo e contínuo. Recomendo muito, sobretudo a quem acorda cansada, está sem energia e tem um peso corporal daqueles que nos faz arrastar.",
  },
  {
    name: "Vanessa Lima",
    text: "Em cerca de 4 consultas, tenho o meu vitiligo em remissão, algo que nunca aconteceu antes sem recurso a imunossupressores ou corticóides. Melhorei muito os sintomas intestinais e a disposição e energia estão francamente melhores. É um caminho que não é simples, mas compensa quando percebemos que é o caminho certo.",
  },
  {
    name: "Cliente",
    text: "Foi o primeiro profissional de saúde a realmente olhar o meu quadro clínico em detalhe e ajudar-me a ver melhorias significativas num espaço relativamente curto de tempo. Nunca me sinto como sendo mais uma. Recomendo principalmente se não encontras respostas nos sistemas convencionais.",
  },
];

const TestemunhosSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-6xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-4">
          O que dizem as clientes
        </h2>
        <p className="text-muted-foreground text-sm mb-12">
          4,8 ★ no Google · 18 críticas verificadas
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-border p-8">
              <Stars5 />
              <blockquote className="font-serif italic text-lg text-foreground leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <p className="label-uppercase text-muted-foreground text-xs">
                &mdash; {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── X — INVESTIMENTO ── */
const InvestimentoSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-ivory section-padding">
      <div className="max-w-4xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-12 text-center">
          Investimento
        </h2>
        <div className="text-center mb-16">
          <div className="inline-block border border-amber rounded-[16px] px-12 py-8 mb-6">
            <p className="font-serif text-7xl md:text-8xl text-foreground">€199</p>
            <p className="text-muted-foreground text-sm mt-2">/mês</p>
          </div>
          <p className="text-foreground text-[15px] mb-2">
            Pagamento em prestações mensais equivalentes à duração do plano.
          </p>
          <p className="text-amber text-sm font-medium">
            Pagamento único com desconto disponível — referir na avaliação inicial.
          </p>
        </div>

        {/* Comparativo */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px] md:text-[15px]">
            <thead>
              <tr>
                <th className="text-left p-4 border border-border bg-background"></th>
                <th className="text-left p-4 border border-border bg-background font-serif text-foreground">Consultas avulsas</th>
                <th className="text-left p-4 border border-border bg-background font-serif text-foreground">Clínicas premium</th>
                <th className="text-left p-4 border border-amber bg-background font-serif text-amber">Programa Aletheia</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Abordagem", "Por sintoma, em silos", "Personalizada", "Causa raiz, integrada"],
                ["Quem coordena", "Tu", "Tu", "A Catarina"],
                ["Wearables", "Não", "Manual", "Integrado no plano"],
                ["Custo estimado", "€1.500–2.500 avulso", "€3.000–5.000", "A partir de €199/mês"],
                ["Acompanhamento", "Consulta a consulta", "Mensal", "Contínuo"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-4 border border-border text-foreground font-medium">{row[0]}</td>
                  <td className="p-4 border border-border">{row[1]}</td>
                  <td className="p-4 border border-border">{row[2]}</td>
                  <td className="p-4 border border-amber text-foreground">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-[15px] leading-relaxed mt-8 border-l-[3px] border-amber pl-6">
          As consultas, relatório ODX, planos alimentares mensais e sessões com profissionais parceiros equivalentes somam entre €1.500 e €2.500 em serviços avulso. €199/mês é o resultado de integrar tudo num único plano conduzido por uma única profissional — sem duplicação de avaliações, sem tu teres de articular nada.
        </p>
      </div>
    </section>
  );
};

/* ── XI — FAQ ── */
const faqs = [
  {
    q: "Já tenho análises. Posso usá-las?",
    a: "Sim. A Catarina lê as que já tens. Se faltarem marcadores importantes, indica quais pedir a seguir.",
  },
  {
    q: "Qual a duração do plano?",
    a: "O plano é personalizado — a duração é definida na avaliação inicial, conforme o teu contexto clínico, dados, análises e estilo de vida.",
  },
  {
    q: "Os suplementos estão incluídos?",
    a: "A gestão clínica está incluída — prescrição, ajuste e rotação. O custo dos produtos é à parte.",
  },
  {
    q: "É 100% online?",
    a: "Sim. Consultas por videochamada, acessíveis de qualquer lugar em Portugal e no Brasil.",
  },
  {
    q: "Preciso de ter um Oura Ring?",
    a: "É recomendado mas não obrigatório. Outros wearables com dados de sono e frequência cardíaca funcionam igualmente.",
  },
  {
    q: "Já fiz testes de microbioma ou genéticos. Podem ser integrados?",
    a: "Sim. Esses dados entram na análise.",
  },
  {
    q: "Como é o suporte entre consultas?",
    a: "Via app personalizada. Os dados que registas são lidos pela Catarina antes de cada consulta.",
  },
  {
    q: "Como começa o programa?",
    a: "Com uma avaliação inicial — uma conversa clínica para perceber se o programa é indicado para ti. Se não for, a Catarina diz-te.",
  },
];

const FaqSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="max-w-3xl mx-auto fade-up">
        <h2 className="font-serif text-3xl md:text-[2.75rem] text-foreground leading-tight mb-12">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-foreground hover:text-amber hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

/* ── XII — CTA FINAL ── */
const CTAFinalSection = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="section-padding" style={{ backgroundColor: "#1F1A14" }}>
      <div className="max-w-3xl mx-auto text-center fade-up">
        <h2 className="font-serif text-3xl md:text-5xl text-ivory leading-tight mb-8">
          O teu corpo não está a mentir.
        </h2>
        <p className="font-serif text-xl md:text-2xl text-ivory/80 leading-relaxed mb-6 max-w-2xl mx-auto">
          Os teus sintomas têm explicação bioquímica. E a bioquímica tem caminho.
        </p>
        <p className="text-ivory/70 text-[15px] leading-relaxed mb-4 max-w-2xl mx-auto">
          O programa começa com uma avaliação inicial — uma conversa clínica em que a Catarina revê a tua história, os teus sintomas e os exames que já fizeste.
        </p>
        <p className="text-ivory/70 text-[15px] leading-relaxed mb-10 max-w-2xl mx-auto">
          Se o programa não for indicado para ti, ela diz-te. Se for, explica exactamente como avançar.
        </p>
        <Button variant="heroAccent" size="lg" asChild>
          <a href={ACUITY_URL} target="_blank" rel="noopener noreferrer">
            Marcar avaliação inicial
          </a>
        </Button>
        <p className="text-ivory/50 text-xs mt-8 italic">
          Consultas online. Portugal e Brasil.
        </p>
      </div>
    </section>
  );
};

/* ── PAGE ── */
const Aletheia = () => (
  <>
    <Helmet>
      <title>Programa Aletheia | Catarina Veiga — Medicina Funcional</title>
      <meta name="description" content="Programa clínico personalizado para mulheres 35-55 com sintomas não resolvidos. Análise funcional de 66+ biomarcadores e acompanhamento integrado. PT e BR." />
      <link rel="canonical" href="https://www.catarinaveiga.com/aletheia" />
      <meta property="og:title" content="Programa Aletheia | Catarina Veiga — Medicina Funcional" />
      <meta property="og:description" content="Programa clínico personalizado para mulheres 35-55 com sintomas não resolvidos. Análise funcional de 66+ biomarcadores e acompanhamento integrado. PT e BR." />
      <meta property="og:url" content="https://www.catarinaveiga.com/aletheia" />
      <meta property="og:type" content="website" />
    </Helmet>
    <Navbar />
    <main>
      <HeroSection />
      <TickerSection />
      <ReconhecesSection />
      <ConceitoSection />
      <QuemAcompanhaSection />
      <IncluidoSection />
      <ComoFuncionaSection />
      <ContraDtcSection />
      <TestemunhosSection />
      <InvestimentoSection />
      <FaqSection />
      <CTAFinalSection />
    </main>
    <LegalBand />
    <Footer />
    <MobileCTA />
  </>
);

export default Aletheia;
