import { useFadeUp } from "@/hooks/useFadeUp";

interface SEOSymptomGridProps {
  label?: string;
  title: string;
  symptoms: string[];
}

const SEOSymptomGrid = ({ label, title, symptoms }: SEOSymptomGridProps) => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-background py-28 md:py-36 px-6">
      <div className="max-w-4xl mx-auto fade-up">
        {label && (
          <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
            {label}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-16">
          {title}
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
          {symptoms.map((s, i) => (
            <div key={i} className="flex items-start gap-5">
              <span className="font-serif text-2xl text-matcha/60 leading-none mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans font-normal text-foreground/80 text-[15px] leading-relaxed">
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOSymptomGrid;
