import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

type Props = {
  head: string[];
  pairs: string[][];
};

const ease = [0.22, 1, 0.36, 1] as const;

const Tick = () => (
  <svg viewBox="0 0 20 20" className="w-5 h-5 shrink-0 mt-[3px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" />
    <path d="M6.5 10.3l2.4 2.4 4.6-5" />
  </svg>
);

export const ComparacaoPares = ({ head, pairs }: Props) => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp>
        <Eyebrow>Lado a lado</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[22ch]">
          Duas formas de olhar para a tua saúde.
        </h2>
      </FadeUp>

      <div className="mt-16 hidden md:grid grid-cols-[minmax(150px,0.7fr)_1.6fr_1.2fr] gap-x-4">
        <div />
        <p className="rounded-t-2xl bg-v2-sage px-7 py-5 font-sans text-[11px] uppercase tracking-[0.16em] text-v2-paper">
          {head[1]}
        </p>
        <p className="px-7 py-5 font-sans text-[11px] uppercase tracking-[0.16em] text-v2-ink-mute">
          {head[2]}
        </p>
      </div>

      <div className="md:mt-0 mt-12 space-y-4 md:space-y-0">
        {pairs.map(([word, fn, conv], i) => (
          <div key={word} className="md:grid md:grid-cols-[minmax(150px,0.7fr)_1.6fr_1.2fr] md:gap-x-4 rounded-2xl md:rounded-none border md:border-0 border-v2-paper-line md:bg-transparent bg-v2-paper overflow-hidden md:overflow-visible">
            <motion.h3
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="px-6 pt-6 md:px-0 md:py-7 font-serif text-h3-v2 text-v2-ink leading-[1.25] md:self-center"
            >
              {word}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className={[
                "flex gap-4 bg-v2-sage text-v2-paper px-7 py-6 md:py-7 mx-4 md:mx-0 mt-4 md:mt-0 rounded-2xl md:rounded-none",
                i === pairs.length - 1 ? "md:rounded-b-2xl" : "",
                i < pairs.length - 1 ? "md:border-b md:border-v2-paper/15" : "",
              ].join(" ")}
            >
              <Tick />
              <p className="font-sans text-[17px] leading-[1.55]">{fn}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className={[
                "px-7 py-6 md:py-7 md:border-b md:border-v2-paper-line",
              ].join(" ")}
            >
              <p className="font-sans text-[15px] leading-[1.6] text-v2-ink-mute">{conv}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);
