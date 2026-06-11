import { useState } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import { Section } from "@/components/v2/ui/Section";
import { Container } from "@/components/v2/ui/Container";
import { Eyebrow } from "@/components/v2/ui/Eyebrow";
import { Divider } from "@/components/v2/ui/Divider";
import { ButtonV2 } from "@/components/v2/ui/ButtonV2";
import { FadeUp } from "@/components/v2/motion/FadeUp";
import { submitGuiaSaciedade, GUIA_PDF_URL } from "@/lib/leadMagnet";
import catarinaPhoto from "@/assets/catarina-sobre-portrait.jpg";

/* Landing de captura · Guia "Porque tem fome pouco depois de comer?" */

const beneficios = [
  "Mais saciedade",
  "Menos cravings",
  "Energia mais estável",
  "Refeições mais nutritivas",
  "Melhor compreensão do seu corpo",
];

const inclui = [
  "explicação simples da fisiologia da saciedade",
  "os erros mais comuns que aumentam a fome",
  "estratégias práticas para aumentar energia e controlo alimentar",
  "29 receitas ricas em proteína",
];

const CaptureForm = ({ origem }: { origem: "landing" }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const r = await submitGuiaSaciedade(nome, email, origem);
    setSaving(false);
    if (!r.ok) {
      setError(r.error || "Erro ao guardar. Tenta novamente.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-v2-paper border border-v2-paper-line px-8 py-10 text-center">
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
      className="bg-v2-paper border border-v2-paper-line px-8 py-10 space-y-5"
    >
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        required
        className="w-full bg-transparent border-b border-v2-paper-line py-3 font-sans text-body-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full bg-transparent border-b border-v2-paper-line py-3 font-sans text-body-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
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
      {/* ── HERO + FORM ── */}
      <Section bg="paper" tight className="pt-40 md:pt-48 pb-24">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <FadeUp className="lg:col-span-6">
              <Eyebrow>Guia gratuito</Eyebrow>
              <h1 className="mt-8 font-serif text-display-2 text-v2-ink leading-[1.1] tracking-[-0.015em]">
                Porque tem fome pouco depois de comer?
              </h1>
              <p className="mt-8 font-serif italic text-h3-v2 text-v2-ink-mute leading-[1.4]">
                Os exames podem estar normais. O seu corpo não.
              </p>

              <Divider className="mt-10" />

              <p className="mt-10 font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage">
                O que inclui
              </p>
              <ul className="mt-6 space-y-3">
                {inclui.map((b) => (
                  <li
                    key={b}
                    className="font-sans text-body-v2 text-v2-ink leading-[1.6] pl-6 relative"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.65em] w-3 h-px bg-v2-sage"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp className="lg:col-span-5 lg:col-start-8" delay={0.12}>
              <CaptureForm origem="landing" />
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── BENEFÍCIOS ── */}
      <Section bg="paper-deep">
        <Container size="prose" className="text-center">
          <FadeUp>
            <Eyebrow>O que muda</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.08}>
            <ul className="mt-12 space-y-5">
              {beneficios.map((b) => (
                <li
                  key={b}
                  className="font-serif italic text-h3-v2 text-v2-ink leading-[1.35]"
                >
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>
        </Container>
      </Section>

      {/* ── SOBRE CATARINA ── */}
      <Section bg="paper">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <FadeUp className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-v2-paper-deep max-w-[360px]">
                <img
                  src={catarinaPhoto}
                  alt="Catarina Veiga"
                  className="w-full h-full object-cover object-top grayscale-[0.2] contrast-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </FadeUp>
            <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
              <Eyebrow>Quem escreve</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.2] tracking-[-0.01em]">
                Catarina Veiga.
              </h2>
              <div className="mt-7 space-y-5 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[54ch]">
                <p>
                  Trabalho com mulheres em perimenopausa, fadiga persistente,
                  alterações hormonais, ansiedade, sono e metabolismo, casos
                  em que os exames costumam ser considerados normais, mas o
                  corpo continua a dar sinais.
                </p>
                <p>Uma leitura integrada da saúde feminina.</p>
                <p>
                  Vinte anos de prática clínica, com formação avançada em
                  saúde hormonal feminina, bioquímica clínica e
                  interpretação funcional de biomarcadores.
                </p>
              </div>
              <div className="mt-8">
                <ButtonV2 as="Link" to="/sobre" variant="link">
                  Conhecer o meu percurso ›
                </ButtonV2>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── CTA FINAL ── */}
      <Section bg="moss">
        <Container size="narrow" className="text-center">
          <FadeUp>
            <h2 className="font-serif text-h2-v2 text-v2-paper leading-[1.2] tracking-[-0.01em]">
              Comece pela fisiologia, não pela disciplina.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-10">
            <ButtonV2
              as="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
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
