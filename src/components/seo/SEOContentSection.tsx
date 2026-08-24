import { useFadeUp } from "@/hooks/useFadeUp";

interface SEOContentSectionProps {
  label?: string;
  title: string;
  children: React.ReactNode;
  bg?: "light" | "almond";
}

const SEOContentSection = ({ label, title, children, bg = "light" }: SEOContentSectionProps) => {
  const ref = useFadeUp();
  const bgClass = bg === "almond" ? "bg-almond/20" : "bg-background";
  return (
    <section ref={ref} className={`${bgClass} py-28 md:py-36 px-6`}>
      <div className="max-w-3xl mx-auto fade-up">
        {label && (
          <p className="font-sans text-[11px] font-normal tracking-[0.25em] uppercase text-matcha mb-6">
            {label}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-light text-foreground leading-tight mb-10">
          {title}
        </h2>
        <div className="space-y-6 font-sans font-normal text-foreground/85 text-[17px] leading-[1.85]">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SEOContentSection;
