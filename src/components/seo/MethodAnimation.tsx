import { useEffect, useRef, useState } from "react";

type Step = { short: string; title: string; text: string };

const DURATION = 7000;

const css = `
@keyframes mf-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes mf-pop { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes mf-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes mf-ring { from { stroke-dashoffset: 264; } to { stroke-dashoffset: 0; } }
.mf-pop { opacity: 0; animation: mf-pop .6s cubic-bezier(.22,1,.36,1) forwards; }
.mf-fill { transform-origin: left; transform: scaleX(0); animation: mf-fill 1.6s cubic-bezier(.22,1,.36,1) forwards; }
.mf-ring { stroke-dasharray: 264; stroke-dashoffset: 264; animation: mf-ring 2.4s cubic-bezier(.22,1,.36,1) .2s forwards; }
@media (prefers-reduced-motion: reduce) {
  .mf-pop, .mf-fill, .mf-ring { animation: none; opacity: 1; transform: none; stroke-dashoffset: 0; }
}
`;

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const Check = () => (
  <svg viewBox="0 0 20 20" className="w-5 h-5 shrink-0 text-matcha" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" />
    <path d="M6.5 10.3l2.4 2.4 4.6-5" />
  </svg>
);

const Row = ({ label, aside, ms, children }: { label: string; aside?: string; ms: number; children?: React.ReactNode }) => (
  <div className="mf-pop rounded-2xl bg-background border border-border px-5 py-4" style={delay(ms)}>
    <div className="flex items-center gap-3">
      <Check />
      <span className="font-sans text-[15px] text-foreground">{label}</span>
      {aside && <span className="ml-auto font-sans text-[13px] text-muted-foreground">{aside}</span>}
    </div>
    {children}
  </div>
);

const Chip = ({ children, ms }: { children: React.ReactNode; ms: number }) => (
  <span className="mf-pop inline-block rounded-full border border-matcha/40 bg-background px-4 py-2 font-sans text-[14px] text-foreground" style={delay(ms)}>
    {children}
  </span>
);

const Ring = ({ minutes }: { minutes: number }) => (
  <div className="relative w-28 h-28 shrink-0">
    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" strokeWidth="5" className="stroke-border" />
      <circle cx="50" cy="50" r="42" fill="none" strokeWidth="5" strokeLinecap="round" className="mf-ring stroke-matcha" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="font-serif text-3xl font-light text-foreground leading-none">{minutes}</span>
      <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-1">min</span>
    </div>
  </div>
);

const Visual = ({ step }: { step: number }) => {
  if (step === 0)
    return (
      <div className="space-y-3 w-full max-w-md">
        <Row label="Boas-vindas da clínica" ms={0} />
        <Row label="Questionário" aside="mais de 100 perguntas" ms={350}>
          <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
            <div className="mf-fill h-full rounded-full bg-matcha" style={delay(700)} />
          </div>
        </Row>
        <Row label="Exames que já tenhas feitos" aside="por email" ms={700} />
      </div>
    );
  if (step === 1)
    return (
      <div className="flex items-center gap-8 w-full max-w-md">
        <Ring minutes={90} />
        <div className="space-y-3">
          <Chip ms={500}>Toda a tua história</Chip>
          <br />
          <Chip ms={900}>Um plano à tua medida</Chip>
        </div>
      </div>
    );
  if (step === 2)
    return (
      <div className="w-full max-w-md">
        <p className="mf-pop font-sans text-[11px] tracking-[0.2em] uppercase text-matcha mb-3" style={delay(0)}>No plano</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip ms={150}>Suplementos</Chip>
          <Chip ms={300}>Alimentação</Chip>
          <Chip ms={450}>Exercício</Chip>
          <Chip ms={600}>Regulação do sistema nervoso</Chip>
        </div>
        <p className="mf-pop font-sans text-[11px] tracking-[0.2em] uppercase text-matcha mb-3" style={delay(800)}>Se for preciso</p>
        <div className="flex flex-wrap gap-2">
          <Chip ms={950}>Análises clínicas</Chip>
          <Chip ms={1100}>Microbioma</Chip>
          <Chip ms={1250}>Ácidos orgânicos</Chip>
          <Chip ms={1400}>Teste Dutch</Chip>
        </div>
      </div>
    );
  return (
    <div className="flex items-center gap-8 w-full max-w-md">
      <Ring minutes={60} />
      <div className="space-y-3">
        <Chip ms={500}>Resultados dos exames</Chip>
        <br />
        <Chip ms={900}>Como correu o mês</Chip>
        <br />
        <Chip ms={1300}>Plano ajustado a ti</Chip>
      </div>
    </div>
  );
};

const MethodAnimation = ({ steps }: { steps: Step[] }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !reduced;

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{css}</style>
      <div role="tablist" aria-label="Passos do método" className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {steps.map((s, i) => (
          <button
            key={s.short}
            role="tab"
            aria-selected={active === i}
            aria-controls="mf-panel"
            onClick={() => setActive(i)}
            className={`relative overflow-hidden rounded-full px-4 py-3 font-sans text-[14px] transition-colors ${
              active === i ? "bg-foreground text-background" : "bg-almond/40 text-foreground/70 hover:text-foreground"
            }`}
          >
            <span className="relative z-10">{s.short}</span>
            {active === i && !reduced && (
              <span
                key={`bar-${active}`}
                className="absolute left-0 bottom-0 h-[3px] w-full origin-left bg-matcha"
                style={{
                  animation: `mf-progress ${DURATION}ms linear forwards`,
                  animationPlayState: running ? "running" : "paused",
                }}
                onAnimationEnd={() => setActive((a) => (a + 1) % steps.length)}
              />
            )}
          </button>
        ))}
      </div>

      <div id="mf-panel" role="tabpanel" className="rounded-[24px] bg-almond/30 p-6 md:p-10">
        <div key={active} className="min-h-[250px] flex items-center justify-center">
          <Visual step={active} />
        </div>
        <div key={`t-${active}`} className="mf-pop mt-8 border-t border-border pt-6" style={delay(200)}>
          <h3 className="font-serif text-xl md:text-2xl font-normal text-foreground mb-2">{steps[active].title}</h3>
          <p className="font-sans text-[16px] leading-[1.8] text-foreground/85">{steps[active].text}</p>
        </div>
      </div>
    </div>
  );
};

export default MethodAnimation;
