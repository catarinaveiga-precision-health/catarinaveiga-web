import { useState } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import { Section } from "@/components/v2/ui/Section";
import { Container } from "@/components/v2/ui/Container";
import { Eyebrow } from "@/components/v2/ui/Eyebrow";
import { ButtonV2 } from "@/components/v2/ui/ButtonV2";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { submitGuiaSono, GUIA_SONO_PDF_URL } from "@/lib/leadMagnet";
import capaSono from "@/assets/guia-sono-capa.jpg";
import pagRitmo from "@/assets/guia-sono-ritmo.jpg";
import pagErro from "@/assets/guia-sono-erro.jpg";
import pagProtocolo from "@/assets/guia-sono-protocolo.jpg";

/* Landing de captura · Guia "Achas que tens insónia. Não tens."
   (Higiene de Sono · Edição I · Ciência Fêmea, 18 páginas, maio 2026).
   Mesmo padrão da landing do guia da saciedade: o PDF é o produto,
   capa em destaque, páginas reais como prova, um formulário. */

const inclui = [
  {
    img: pagRitmo,
    alt: "Página do guia sobre o ritmo circadiano, com o gráfico de cortisol e melatonina",
    title: "A máquina por trás do teu sono",
    body: "O ritmo circadiano explicado a sério: cortisol, melatonina e porque é que em perimenopausa a sensibilidade a um horário desorganizado aumenta.",
  },
  {
    img: pagErro,
    alt: "Página do guia sobre o erro de te deitares quando tens sono",
    title: "Os 3 erros que parecem insónia",
    body: "Deitares-te quando tens sono e não quando deves, a cama que deixou de significar sono, e a luz na hora errada. Cada erro com a sua correção.",
  },
  {
    img: pagProtocolo,
    alt: "Página do guia com a autoavaliação de dez perguntas",
    title: "Autoavaliação, protocolo de 4 semanas e tracker",
    body: "Medes onde estás, segues o protocolo semana a semana, e comparas no fim. Inclui as reservas honestas: os casos que precisam de investigação clínica.",
  },
];

const beneficios = [
  "Perceberes a diferença entre insónia clínica e higiene de sono inexistente",
  "Um protocolo de reset circadiano de 4 semanas, passo a passo",
  "A regra dos 20 minutos e o controlo de estímulo, explicados",
  "Autoavaliação de 10 perguntas com leitura clínica",
  "Fundamentado em Matthew Walker, Huberman Lab e Satchin Panda",
];

const CapaMockup = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative mx-auto w-[210px] sm:w-[240px] md:w-[270px] ${className}`}
    style={{ perspective: "1400px" }}
  >
    <div
      aria-hidden
      className="absolute inset-0 translate-x-3 translate-y-3 bg-v2-moss/20 blur-[2px]"
      style={{ transform: "rotateY(-8deg)" }}
    />
    <img
      src={capaSono}
      alt='Capa do guia "Achas que tens insónia. Não tens."'
      width={909}
      height={1287}
      className="relative w-full h-auto rounded-sm shadow-[0_30px_60px_-20px_rgba(22,53,44,0.45)] ring-1 ring-v2-paper-line"
      style={{ transform: "rotateY(-8deg)" }}
    />
  </div>
);

const GuiaSono = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const r = await submitGuiaSono(nome, email, "landing");
    setSaving(false);
    if (!r.ok) {
      setError(r.error || "Erro ao guardar. Tenta novamente.");
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased">
      <NavbarV2 />
      <main>
        {/* Hero */}
        <Section bg="paper" className="pt-40 md:pt-48 pb-20">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
              <FadeUp className="lg:col-span-7">
                <Eyebrow>Guia gratuito · Higiene de Sono · Edição I</Eyebrow>
                <h1 className="mt-8 font-serif text-display-1 text-v2-ink leading-[1.05] tracking-[-0.02em]">
                  Achas que tens insónia.
                  <span className="block italic text-v2-ink-mute">
                    Não tens.
                  </span>
                </h1>
                <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute max-w-[52ch] leading-[1.55]">
                  Um protocolo clínico de reset circadiano para mulheres em
                  perimenopausa. Os três erros que confundem higiene de sono
                  com insónia, e o que fazer em vez disso. 18 páginas,
                  sintetizadas a partir de mais de 200 consultas reais.
                </p>

                {done ? (
                  <div className="mt-10 rounded-2xl bg-v2-paper-deep ring-1 ring-v2-sage/30 px-8 py-8 max-w-[440px]">
                    <p className="font-serif text-h3-v2 text-v2-ink">
                      O guia é teu.
                    </p>
                    <div className="mt-5">
                      <ButtonV2
                        as="a"
                        href={GUIA_SONO_PDF_URL}
                        target="_blank"
                        rel="noopener"
                        size="lg"
                      >
                        Descarregar o guia
                      </ButtonV2>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={submit}
                    className="mt-10 max-w-[440px] space-y-4"
                  >
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome"
                      required
                      className="w-full rounded-full bg-white border border-v2-paper-line px-6 py-4 font-sans text-[15px] text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full rounded-full bg-white border border-v2-paper-line px-6 py-4 font-sans text-[15px] text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
                    />
                    {error && (
                      <p className="font-sans text-body-sm-v2 text-v2-brick">
                        {error}
                      </p>
                    )}
                    <ButtonV2 type="submit" size="lg" className="w-full" disabled={saving}>
                      {saving ? "A enviar..." : "Quero o guia gratuito"}
                    </ButtonV2>
                    <p className="font-sans text-[12px] text-v2-ink-mute/70 text-center">
                      Sem spam. Podes cancelar a qualquer momento.
                    </p>
                  </form>
                )}
              </FadeUp>

              <FadeUp className="lg:col-span-5" delay={0.15}>
                <CapaMockup />
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* O que inclui, com páginas reais */}
        <Section bg="paper-deep">
          <Container size="default">
            <FadeUp>
              <Eyebrow>O que está lá dentro</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[24ch]">
                Não é mais um truque para dormires melhor.
              </h2>
            </FadeUp>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {inclui.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-white border border-v2-paper-line overflow-hidden shadow-[0_16px_40px_-22px_rgba(22,53,44,0.35)]">
                    <img
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto border-b border-v2-paper-line"
                    />
                    <div className="px-7 py-7">
                      <h3 className="font-serif text-h3-v2 text-v2-ink leading-[1.25]">
                        {item.title}
                      </h3>
                      <p className="mt-3 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.6]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="mt-14" delay={0.1}>
              <ul className="mx-auto max-w-[62ch] space-y-3">
                {beneficios.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 font-sans text-body-v2 text-v2-ink leading-[1.55]"
                  >
                    <span aria-hidden className="mt-[2px] text-v2-sage">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </Container>
        </Section>

        {/* Ponte honesta para a consulta */}
        <Section bg="paper" tight>
          <Container size="prose" className="text-center">
            <FadeUp>
              <p className="font-serif italic text-body-lg-v2 text-v2-ink-mute leading-[1.6] max-w-[56ch] mx-auto">
                Este guia é educativo e não substitui avaliação clínica. Se ao
                fim das 4 semanas os despertares continuarem, o problema
                raramente é o sono: é o que está por trás dele. É aí que entra
                a consulta.
              </p>
            </FadeUp>
          </Container>
        </Section>
      </main>
      <LegalBand />
      <FooterV2 />
    </div>
  );
};

export default GuiaSono;
