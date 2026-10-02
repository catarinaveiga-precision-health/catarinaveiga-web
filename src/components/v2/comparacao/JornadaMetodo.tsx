import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

type Step = { title: string; text: string };

const ease = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "-80px" } as const;

const Ring = ({ minutes }: { minutes: number }) => (
  <div className="relative w-24 h-24 shrink-0">
    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" strokeWidth="5" className="stroke-v2-paper-line" />
      <motion.circle
        cx="50" cy="50" r="42" fill="none" strokeWidth="5" strokeLinecap="round"
        className="stroke-v2-sage"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ duration: 1.8, ease, delay: 0.4 }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="font-serif text-[28px] leading-none text-v2-ink">{minutes}</span>
      <span className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-v2-ink-mute">min</span>
    </div>
  </div>
);

const Chips = ({ items, base = 0.5 }: { items: string[]; base?: number }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((c, i) => (
      <motion.span
        key={c}
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.5, ease, delay: base + i * 0.12 }}
        className="rounded-full border border-v2-sage/40 bg-v2-paper-deep px-3.5 py-1.5 font-sans text-[13px] text-v2-ink"
      >
        {c}
      </motion.span>
    ))}
  </div>
);

const visuals = [
  <Chips key="0" items={["Boas-vindas da clínica", "Questionário com mais de 100 perguntas", "Email para os teus exames"]} />,
  <div key="1" className="flex flex-wrap items-center gap-5">
    <Ring minutes={90} />
    <Chips items={["Toda a tua história", "Plano à tua medida"]} base={0.9} />
  </div>,
  <div key="2" className="space-y-3">
    <Chips items={["Suplementos", "Alimentação", "Exercício", "Sistema nervoso"]} />
    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-v2-sage pt-1">Se for preciso</p>
    <Chips items={["Análises", "Microbioma", "Ácidos orgânicos", "Teste Dutch"]} base={1.1} />
  </div>,
  <div key="3" className="flex flex-wrap items-center gap-5">
    <Ring minutes={60} />
    <Chips items={["Resultados dos exames", "Como correu o mês"]} base={0.9} />
  </div>,
];

export const JornadaMetodo = ({ title, steps }: { title: string; steps: Step[] }) => (
  <Section bg="paper">
    <Container size="default">
      <FadeUp>
        <Eyebrow>O método</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[24ch]">
          {title}
        </h2>
      </FadeUp>

      <div className="relative mt-20">
        <svg
          className="absolute left-0 top-[16px] w-full h-6 hidden xl:block"
          viewBox="0 0 1000 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0 12 C 125 -6, 250 30, 375 12 S 625 -6, 750 12 S 900 26, 1000 12"
            fill="none"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="stroke-v2-sage/60"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inView}
            transition={{ duration: 2.2, ease }}
          />
        </svg>

        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, ease, delay: i * 0.18 }}
              className="relative"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.5, ease, delay: i * 0.18 }}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-v2-sage font-serif text-[24px] text-v2-paper shadow-[0_10px_24px_-10px_rgba(22,53,44,0.55)]"
              >
                {i + 1}
              </motion.span>
              <div className="mt-6 rounded-2xl border border-v2-paper-line bg-v2-paper-deep p-6 h-[calc(100%-5rem)]">
                <h3 className="font-serif text-h3-v2 text-v2-ink leading-[1.25]">{s.title}</h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.65] text-v2-ink-mute">{s.text}</p>
                <div className="mt-6">{visuals[i]}</div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Container>
  </Section>
);
