import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoFull from "@/assets/logo-full.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers" as any).insert({ email: email.trim(), source: "website" } as any);
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: t("footer.already_subscribed"), variant: "default" });
      } else {
        toast({ title: t("footer.error"), variant: "destructive" });
      }
    } else {
      toast({ title: t("footer.success") });
      setEmail("");
    }
  };

  const navItems = [
    { label: t("nav.sobre"), href: "/sobre" },
    { label: t("nav.programa"), href: "/programa-fundacao" },
    { label: "Aletheia", href: "/aletheia" },
    { label: t("nav.biblioteca"), href: "/recursos" },
    { label: t("nav.avaliacao"), href: "/avaliacao" },
    { label: t("nav.blog"), href: "/blog" },
  ];

  return (
    <footer className="bg-dark-footer text-ivory/80 section-padding pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        <div>
          <img src={logoFull} alt="Catarina Veiga" className="h-12 mb-4 brightness-0 invert opacity-90" loading="lazy" decoding="async" width={200} height={48} />
          <p className="text-[14px] text-ivory/60 mb-4">{t("footer.desc")}</p>
          <p className="text-[13px] text-ivory/50">{t("footer.online")}</p>
        </div>
        <div>
          <p className="label-uppercase text-ivory text-xs mb-4">{t("footer.nav")}</p>
          <nav className="space-y-2">
            {navItems.map((l) => (
              <Link key={l.href} to={l.href} className="block text-[14px] text-ivory/60 hover:text-ivory transition-colors">{l.label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="label-uppercase text-ivory text-xs mb-4">{t("footer.contact")}</p>
          <div className="space-y-2 text-[14px] text-ivory/60">
            <p>info@catarinaveiga.com</p>
            <p>+351 917 823 906</p>
            <p>{t("footer.international")}</p>
            <p>{t("footer.consultations")}</p>
          </div>
        </div>
        <div>
          <p className="label-uppercase text-ivory text-xs mb-4">{t("footer.social")}</p>
          <div className="space-y-2 text-[14px] mb-6">
            <a href="https://instagram.com/catarina__veiga" target="_blank" rel="noopener noreferrer" className="block text-ivory/60 hover:text-ivory transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/company/catarina-veiga-medicina-funcional-integrativa/" target="_blank" rel="noopener noreferrer" className="block text-ivory/60 hover:text-ivory transition-colors">LinkedIn</a>
          </div>
          <p className="label-uppercase text-ivory text-xs mb-3">{t("footer.newsletter")}</p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="flex-1 bg-transparent border border-ivory/20 px-3 py-2 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-amber" />
            <Button variant="amber" size="sm" type="submit" disabled={loading}>{t("footer.subscribe")}</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-ivory/10 pt-6">
        <p className="text-center text-[11px] text-ivory/40 mb-4">Cédula provisória ACSS</p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/40">
          <p>{t("footer.copyright")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/aviso-legal" className="hover:text-ivory/60 transition-colors">{t("footer.legal")}</Link>
            <Link to="/politica-privacidade" className="hover:text-ivory/60 transition-colors">{t("footer.privacy")}</Link>
            <Link to="/termos-utilizacao" className="hover:text-ivory/60 transition-colors">{t("footer.terms")}</Link>
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="hover:text-ivory/60 transition-colors">Livro de Reclamações</a>
          </div>
        </div>
        <p className="text-center text-[11px] text-ivory/30 mt-4 max-w-2xl mx-auto leading-relaxed">
          Esta prática não substitui acompanhamento médico convencional nem inclui atos médicos reservados. Informação de carácter educativo. Não substitui avaliação médica, diagnóstico ou tratamento. Consulte sempre um profissional de saúde qualificado.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
