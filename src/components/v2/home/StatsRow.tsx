import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/* Count-up ao entrar no ecrã, o gesto dos números da Parsley. Respeita
   prefers-reduced-motion (mostra logo o valor final) e números com
   vírgula decimal (4,8 conta em décimas). */
const CountUp = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : "0");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(value);
      return;
    }
    const decimal = value.includes(",");
    const target = parseFloat(value.replace(",", "."));
    const dur = 1100;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      setShown(
        decimal
          ? cur.toFixed(1).replace(".", ",")
          : String(Math.round(cur)),
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return <span ref={ref}>{shown}</span>;
};

const stats = [
  {
    n: "21",
    label: "anos",
    desc: "de prática clínica em saúde da mulher, a ler análises de quem ouviu que estava tudo normal.",
  },
  {
    n: "4000",
    label: "profissionais",
    desc: "de saúde no Reino Unido usavam a Omnos, que ajudei a fundar, hoje parte da Regenerus Labs.",
  },
  {
    n: "4,8",
    label: "em 21 avaliações",
    desc: "no Google, escritas por pacientes que passaram por esta consulta.",
  },
  {
    n: "90",
    label: "minutos",
    desc: "na consulta inicial, contra os quinze de uma consulta de rotina.",
  },
];

export const StatsRow = () => (
  <Section bg="moss">
    <Container size="default">
      <FadeUp>
        <Eyebrow tone="paper">Antes de decidires</Eyebrow>
      </FadeUp>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        {stats.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.08}>
            <div className="border-t border-v2-paper/20 pt-6">
              <span className="block font-serif text-[clamp(3rem,5vw,4.25rem)] leading-[0.95] text-v2-paper tabular-nums">
                <CountUp value={s.n} />
              </span>
              <span className="mt-3 block font-sans text-[11px] uppercase tracking-[0.18em] text-v2-paper/50">
                {s.label}
              </span>
              <p className="mt-5 font-sans text-body-sm-v2 text-v2-paper/75 leading-[1.65]">
                {s.desc}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
