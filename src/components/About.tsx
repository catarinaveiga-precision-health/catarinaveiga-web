import { useFadeUp } from "@/hooks/useFadeUp";
import heroImage from "@/assets/catarina-about.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const tags = [
  "Medicina Tradicional Chinesa",
  "Saúde Hormonal Feminina",
  "Perimenopausa",
  "Telemedicina",
  "PT",
  "EN",
];

const About = () => {
  const ref = useFadeUp();
  const { t } = useLanguage();

  return (
    <section ref={ref} id="sobre" className="bg-muted section-padding">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-start">
        <div className="fade-up md:col-span-3">
          <img src={heroImage} alt="Catarina Veiga" className="w-full h-auto object-cover max-h-[600px]" loading="lazy" decoding="async" width={600} height={600} />
        </div>
        <div className="fade-up md:col-span-2">
          <p className="label-uppercase text-amber mb-4">{t("about.label")}</p>
          <h2 className="font-serif text-4xl text-foreground mb-2">Catarina Veiga</h2>
          <p className="text-muted-foreground text-sm mb-6">{t("about.role")}</p>
          <div className="space-y-4 text-muted-foreground text-[15px]">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map((tag) => (
              <span key={tag} className="border border-border text-foreground label-uppercase text-[10px] px-3 py-1">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
