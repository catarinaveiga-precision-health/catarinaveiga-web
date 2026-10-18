import { useFadeUp } from "@/hooks/useFadeUp";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Symptoms = () => {
  const ref = useFadeUp();
  const { t } = useLanguage();

  const items = [
    t("symptoms.1"), t("symptoms.2"), t("symptoms.3"), t("symptoms.4"),
    t("symptoms.5"), t("symptoms.6"), t("symptoms.7"),
  ];

  return (
    <section ref={ref} className="bg-muted section-padding">
      <div className="max-w-4xl mx-auto">
        <p className="fade-up label-uppercase text-amber mb-4">{t("symptoms.label")}</p>
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-foreground mb-12">{t("symptoms.title")}</h2>
        <div className="fade-up space-y-5 mb-10">
          {items.map((item, i) => (
            <div key={i} className="border-l-[3px] border-amber pl-5 py-1">
              <p className="text-foreground">{item}</p>
            </div>
          ))}
        </div>
        <p className="fade-up font-serif italic text-xl md:text-2xl text-foreground text-center mb-8">
          {t("symptoms.quote")}
        </p>
        <div className="fade-up text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="/consulta-inicial">Conhecer a consulta inicial</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Symptoms;
