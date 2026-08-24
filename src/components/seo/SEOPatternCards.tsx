import { useFadeUp } from "@/hooks/useFadeUp";

interface Pattern {
  title: string;
  desc: string;
}

interface SEOPatternCardsProps {
  label?: string;
  title: string;
  patterns: Pattern[];
  bg?: "light" | "almond";
}

const SEOPatternCards = ({ label, title, patterns, bg = "light" }: SEOPatternCardsProps) => {
  const ref = useFadeUp();
  const bgClass = bg === "almond" ? "bg-almond/20" : "bg-background";
  return (
    <section ref={ref} className={`${bgClass} py-28 md:py-36 px-6`}>
      <div className="max-w-4xl mx-auto fade-up">
        {label && (
          <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
            {label}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          {title}
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {patterns.map((p, i) => (
            <div key={i} className="border-l-2 border-matcha/40 pl-6">
              <p className="font-sans font-normal text-foreground text-[15px] mb-2">{p.title}</p>
              <p className="font-sans font-normal text-foreground/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOPatternCards;
