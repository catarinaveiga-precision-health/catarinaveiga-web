import { useFadeUp } from "@/hooks/useFadeUp";

interface SEOComparisonProps {
  label?: string;
  title: string;
  conventional: { range: string; items: string[] };
  functional: { range: string; items: string[] };
  source?: string;
}

const SEOComparison = ({ label, title, conventional, functional, source }: SEOComparisonProps) => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-almond/20 py-28 md:py-36 px-6">
      <div className="max-w-4xl mx-auto fade-up">
        {label && (
          <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
            {label}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Conventional */}
          <div>
            <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-foreground/40 mb-2">
              O que os exames dizem
            </p>
            <p className="font-serif text-2xl font-light text-foreground/85 mb-6">{conventional.range}</p>
            <div className="space-y-4">
              {conventional.items.map((item, i) => (
                <p key={i} className="font-sans font-normal text-foreground/50 text-[15px] leading-relaxed border-l border-foreground/10 pl-5">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Functional */}
          <div>
            <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-2">
              O que a medicina funcional vê
            </p>
            <p className="font-serif text-2xl font-light text-foreground mb-6">{functional.range}</p>
            <div className="space-y-4">
              {functional.items.map((item, i) => (
                <p key={i} className="font-sans font-normal text-foreground/80 text-[15px] leading-relaxed border-l-2 border-matcha pl-5">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {source && (
          <p className="font-sans text-[11px] text-foreground/30 mt-12">{source}</p>
        )}
      </div>
    </section>
  );
};

export default SEOComparison;
