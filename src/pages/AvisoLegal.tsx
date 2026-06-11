import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import LegalBand from "@/components/LegalBand";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const AvisoLegal = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-v2-paper">
      <NavbarV2 />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="label-uppercase text-v2-golden mb-4">{t("legal_page.label")}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-v2-ink mb-12">{t("legal_page.title")}</h1>
          <div className="prose prose-lg max-w-none text-v2-ink-mute leading-relaxed space-y-6 text-[15px]">
            <p>{t("legal_page.p1")}</p>
            <h2 className="font-serif text-2xl text-v2-ink mt-10 mb-4">{t("legal_page.h2_1")}</h2>
            <p>{t("legal_page.p2")}</p>
            <h2 className="font-serif text-2xl text-v2-ink mt-10 mb-4">{t("legal_page.h2_2")}</h2>
            <p>{t("legal_page.p3")}</p>
            <h2 className="font-serif text-2xl text-v2-ink mt-10 mb-4">{t("legal_page.h2_3")}</h2>
            <p>{t("legal_page.p4")}</p>
            <h2 className="font-serif text-2xl text-v2-ink mt-10 mb-4">{t("legal_page.h2_4")}</h2>
            <p>{t("legal_page.p5")}</p>
          </div>
        </div>
      </main>
      <LegalBand />
      <FooterV2 />
    </div>
  );
};

export default AvisoLegal;
