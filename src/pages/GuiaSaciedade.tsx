import { useState } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import { Section } from "@/components/v2/ui/Section";
import { Container } from "@/components/v2/ui/Container";
import { Eyebrow } from "@/components/v2/ui/Eyebrow";
import { ButtonV2 } from "@/components/v2/ui/ButtonV2";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { submitGuiaSaciedade, GUIA_PDF_URL } from "@/lib/leadMagnet";
import catarinaPhoto from "@/assets/catarina-sobre-portrait.jpg";
import guiaCapa from "@/assets/guia-capa.jpg";
import pagFisiologia from "@/assets/guia-pag-fisiologia.jpg";
import pagRegras from "@/assets/guia-pag-regras.jpg";
import pagReceita from "@/assets/guia-pag-receita.jpg";

/* Landing de captura · Guia "Porque tem fome pouco depois de comer?"
   O PDF é o produto: capa em mockup no hero, páginas reais em
   "O que inclui", benefícios em cartões. */

const inclui = [
  {
    img: pagFisiologia,
    alt: "Página do guia: porque estas refeições funcionam",
    title: "A fisiologia da saciedade, explicada de forma simples",
    body: "Porque o corpo pede comida pouco depois de uma refeição completa, e o que estabiliza esse sinal.",
  },
  {
    img: pagRegras,
    alt: "Página do guia: regras simples que funcionam",
    title: "Os erros mais comuns e as regras que funcionam",
    body: "Cinco regras práticas, sem planos rígidos, para mais energia e controlo alimentar.",
  },
  {
    img: pagReceita,
    alt: "Página do guia: receita rica em proteína com fotografia",
    title: "29 receitas ricas em proteína",
    body: "Com fotografia, tempos de preparação e informação nutricional em todas as receitas.",
  },
];

const beneficios = [
  "Mais saciedade",
  "Menos vontade de petiscar",
  "Energia mais estável",
  "Refeições mais nutritivas",
  "Melhor compreensão do seu corpo",
];

const CapaMockup = ({ className = "" }: { className?: string }) => (
  <div className={`relative mx-auto w-[210px] sm:w-[240px] md:w-[270px] ${className}`} style={{ perspective: "1400px" }}>
    {/* lombada / espessura */}
    <div
      aria-hidden
      className="absolute inset-0 translate-x-3 translate-y-3 bg-v2-moss/20 blur-[2px]"
      style={{ transform: "rotateY(-8deg)" }}
    />
    <img
      src={guiaCapa}
      alt='Capa do guia "Tens fome pouco depois de comer?"'
      width={695}
      height={900}
      className="relative w-full h-auto shadow-[24px_32px_60px_-20px_rgba(31,36,34,0.45)] ring-1 ring-[rgba(31,36,34,0.12)]"
      style={{ transform: "rotateY(-8deg)" }}
    />
  </div>
);

const CaptureForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const r = await submitGuiaSaciedade(nome, email, "landing");
    setSaving(false);
    if (!r.ok) {
      setError(r.error || "Erro ao guardar. Tenta novamente.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-white border border-v2-paper-line px-8 py-10 text-center shadow-[0_18px_48px_-18px_rgba(31,36,34,0.25)]">
        <p className="font-serif text-h3-v2 text-v2-ink leading-[1.3]">
          O guia está pronto para si.
        </p>
        <div className="mt-7">
          <ButtonV2 as="a" href={GUIA_PDF_URL} target="_blank" rel="noopener" size="lg">
            Descarregar o guia
          </ButtonV2>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-v2-paper-line px-7 py-8 space-y-4 shadow-[0_18px_48px_-18px_rgba(31,36,34,0.25)]"
    >
      <p className="font-serif text-h3-v2 text-v2-ink leading-[1.25]">
        Receba gratuitamente o guia completo em PDF.
      </p>
      <p className="font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.55]">
        Introduza o seu email e receba acesso imediato.
      </p>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        required
        className="w-full bg-v2-paper border border-v2-paper-line px-4 py-3.5 font-sans text-body-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full bg-v2-paper border border-v2-paper-line px-4 py-3.5 font-sans text-body-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
      />
      {error && (
        <p className="font-sans text-body-sm-v2 text-v2-brick">{error}</p>
      )}
      <ButtonV2 type="submit" size="lg" className="w-full" disabled={saving}>
        {saving ? "A enviar..." : "Receber gratuitamente"}
      </ButtonV2>
      <p className="font-sans text-[11px] text-v2-ink-mute/70 text-center">
        Sem spam. Pode cancelar a qualquer momento.
      </p>
    </form>
  );
};

const GuiaSaciedade = () => (
  <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
    <NavbarV2 />

    <main className="overflow-hidden">
      {/* ── HERO · produto visível imediatamente ── */}
      <Section bg="paper" tight className="pt-36 md:pt-44 pb-16 md:pb-20">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* mobile: 1 título, 2 sub, 3 capa, 4 form */}
            <div className="lg:col-span-6 order-1">
              <FadeUp>
                <Eyebrow>Guia gratuito</Eyebrow>
                <h1 className="mt-6 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
                  Porque tem fome pouco depois de comer?
                </h1>
                <p className="mt-6 font-serif italic text-h3-v2 text-v2-ink-mute leading-[1.4]">
                  Os exames podem estar normais. O seu corpo não.
                </p>
              </FadeUp>

              <FadeUp delay={0.12} className="mt-10 lg:hidden">
                <CapaMockup />
              </FadeUp>
            </div>

            <div className="lg:col-span-6 order-2">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
                <FadeUp delay={0.1} className="hidden lg:block xl:col-span-5">
                  <CapaMockup />
                </FadeUp>
                <FadeUp delay={0.18} className="xl:col-span-7">
                  <CaptureForm />
                </FadeUp>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── O QUE INCLUI · páginas reais do guia ── */}
      <Section bg="paper-deep" tight>
        <Container size="default">
          <FadeUp className="text-center">
            <Eyebrow>O que está lá dentro</Eyebrow>
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {inclui.map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <article className="bg-white border border-v2-paper-line shadow-[0_14px_36px_-16px_rgba(31,36,34,0.2)] h-full">
                  <div className="bg-v2-paper border-b border-v2-paper-line px-6 pt-6 pb-0 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[210px] object-cover object-top ring-1 ring-[rgba(31,36,34,0.1)]"
                    />
                  </div>
                  <div className="px-6 py-6">
                    <h2 className="font-serif text-[19px] text-v2-ink leading-[1.3]">
                      {item.title}
                    </h2>
                    <p className="mt-3 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.6]">
                      {item.body}
                    </p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── O QUE MUDA · cartões ── */}
      <Section bg="paper" tight>
        <Container size="default">
          <FadeUp className="text-center">
            <Eyebrow>O que muda</Eyebrow>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {beneficios.map((b, i) => (
              <FadeUp key={b} delay={i * 0.05}>
                <div className="bg-white border border-v2-paper-line px-5 py-6 h-full flex items-start gap-3 shadow-[0_10px_28px_-14px_rgba(31,36,34,0.16)]">
                  <span
                    aria-hidden
                    className="shrink-0 mt-[1px] w-5 h-5 rounded-full bg-[rgba(113,130,129,0.16)] text-v2-sage-deep flex items-center justify-center text-[11px] leading-none"
                  >
                    ✓
                  </span>
                  <p className="font-sans text-body-sm-v2 text-v2-ink leading-[1.45]">
                    {b}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── QUEM ESCREVE · compacto ── */}
      <Section bg="paper-deep" tight>
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <FadeUp className="lg:col-span-3">
              <div className="relative aspect-square overflow-hidden bg-v2-paper max-w-[240px] mx-auto lg:mx-0">
                <img
                  src={catarinaPhoto}
                  alt="Catarina Veiga"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top grayscale-[0.2] contrast-[1.02]"
                />
              </div>
            </FadeUp>
            <FadeUp className="lg:col-span-8 lg:col-start-5" delay={0.1}>
              <Eyebrow>Quem escreve</Eyebrow>
              <h2 className="mt-4 font-serif text-h3-v2 text-v2-ink leading-[1.25]">
                Catarina Veiga.
              </h2>
              <p className="mt-5 font-sans text-body-v2 text-v2-ink-mute leading-[1.65] max-w-[60ch]">
                Trabalho com mulheres em perimenopausa, fadiga persistente,
                alterações hormonais, ansiedade, sono e metabolismo, casos em
                que os exames costumam ser considerados normais, mas o corpo
                continua a dar sinais. Vinte anos de prática clínica, com
                formação avançada em saúde hormonal feminina, bioquímica
                clínica e interpretação funcional de biomarcadores.
              </p>
              <div className="mt-6">
                <ButtonV2 as="Link" to="/sobre" variant="link">
                  Conhecer o meu percurso ›
                </ButtonV2>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── CTA FINAL ── */}
      <Section bg="moss" tight>
        <Container size="narrow" className="text-center">
          <FadeUp>
            <h2 className="font-serif text-h2-v2 text-v2-paper leading-[1.2] tracking-[-0.01em]">
              Comece pela fisiologia, não pela disciplina.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-9">
            <ButtonV2
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="lg"
            >
              Receber gratuitamente
            </ButtonV2>
          </FadeUp>
        </Container>
      </Section>
    </main>

    <LegalBand />
    <FooterV2 />
  </div>
);

export default GuiaSaciedade;
