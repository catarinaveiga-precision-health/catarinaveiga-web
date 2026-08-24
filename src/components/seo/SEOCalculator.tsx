import { useState } from "react";
import { Link } from "react-router-dom";
import { useFadeUp } from "@/hooks/useFadeUp";

interface Field {
  label: string;
  placeholder: string;
  optional?: boolean;
}

interface CalcResult {
  icon: string;
  text: string;
  note?: string;
}

interface SEOCalculatorProps {
  label?: string;
  title: string;
  intro: string;
  fields: Field[];
  onCalculate: (values: string[]) => CalcResult | null;
  bg?: "light" | "almond";
}

const SEOCalculator = ({ label, title, intro, fields, onCalculate, bg = "light" }: SEOCalculatorProps) => {
  const ref = useFadeUp();
  const [values, setValues] = useState<string[]>(fields.map(() => ""));
  const [result, setResult] = useState<CalcResult | null>(null);
  const bgClass = bg === "almond" ? "bg-almond/20" : "bg-background";

  const handleCalc = () => {
    const r = onCalculate(values);
    if (r) setResult(r);
  };

  return (
    <section ref={ref} className={`${bgClass} py-28 md:py-36 px-6`}>
      <div className="max-w-3xl mx-auto fade-up">
        {label && (
          <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
            {label}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-4">
          {title}
        </h2>
        <p className="font-sans font-normal text-foreground/75 text-[17px] leading-relaxed mb-12">
          {intro}
        </p>

        <div className="max-w-md">
          <div className="space-y-5 mb-8">
            {fields.map((f, i) => (
              <div key={i}>
                <label className="block font-sans text-sm text-foreground/85 mb-2">
                  {f.label}{f.optional && <span className="text-foreground/30 ml-1">— opcional</span>}
                </label>
                <input
                  type="number"
                  value={values[i]}
                  onChange={(e) => {
                    const next = [...values];
                    next[i] = e.target.value;
                    setValues(next);
                  }}
                  placeholder={f.placeholder}
                  className="w-full border-b border-foreground/15 bg-transparent px-0 py-3 font-sans font-normal text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-matcha transition-colors"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleCalc}
            className="bg-eclipse text-white font-sans text-sm font-normal tracking-wide px-8 py-3.5 rounded-sm hover:bg-eclipse/90 transition-colors"
          >
            Ver leitura funcional
          </button>

          {result && (
            <div className="mt-10 border-l-2 border-matcha pl-6 space-y-3">
              <p className="font-sans font-normal text-foreground/80 text-[15px] leading-relaxed">
                <span className="text-lg mr-2">{result.icon}</span>
                {result.text}
              </p>
              {result.note && (
                <p className="font-sans font-normal text-matcha text-sm leading-relaxed">{result.note}</p>
              )}
              <Link to="/avaliacao" className="inline-block font-sans text-sm text-matcha hover:underline mt-2">
                Ver avaliação completa →
              </Link>
            </div>
          )}
        </div>

        <p className="font-sans text-[11px] text-foreground/25 mt-8">
          Leitura educativa. Não constitui diagnóstico médico.
        </p>
      </div>
    </section>
  );
};

export default SEOCalculator;
