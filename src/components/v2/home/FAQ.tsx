import { useState } from "react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";
import { cn } from "@/lib/utils";
import { faqHome as faqs } from "@/data/faq-home";

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section bg="paper-deep">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <FadeUp className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Antes de marcares</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
                Perguntas frequentes.
              </h2>
            </div>
          </FadeUp>

          <FadeUp className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ul className="divide-y divide-v2-paper-line border-y border-v2-paper-line">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={i}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left py-7 flex items-start justify-between gap-8 group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-body-lg-v2 text-v2-ink group-hover:text-v2-ink-mute transition-colors leading-[1.4]">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 mt-2 font-sans text-mono-v2 text-v2-sage transition-transform duration-300",
                          isOpen ? "rotate-45" : "",
                        )}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-8 space-y-5 font-sans text-body-v2 text-v2-ink-mute leading-[1.7] max-w-[64ch]">
                          {f.a.map((p, j) => (
                            <p key={j}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
};
