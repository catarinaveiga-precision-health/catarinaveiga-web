import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { openAcuity } from "@/hooks/useAcuityModal";
import logoIcon from "@/assets/logo-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavLink } from "@/components/NavLink";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-0 font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
      <button
        onClick={() => setLang("pt")}
        className={`px-1 transition-colors ${lang === "pt" ? "text-accent font-medium" : "hover:text-foreground"}`}
      >
        PT
      </button>
      <span className="opacity-40">|</span>
      <button
        onClick={() => setLang("en")}
        className={`px-1 transition-colors ${lang === "en" ? "text-accent font-medium" : "hover:text-foreground"}`}
      >
        EN
      </button>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.programa"), href: "/programa-fundacao" },
    { label: "Aletheia", href: "/aletheia" },
    { label: t("nav.biblioteca"), href: "/recursos" },
    { label: t("nav.sobre"), href: "/sobre" },
    { label: t("nav.avaliacao"), href: "/avaliacao" },
    { label: t("nav.blog"), href: "/blog" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background ${
        scrolled ? "border-b border-border" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <img src={logoIcon} alt="Catarina Veiga" className="h-9 w-9" width={36} height={36} decoding="async" />
          <span className="font-serif text-xl text-foreground leading-tight">
            Catarina Veiga
          </span>
        </NavLink>

        {/* Desktop links — centered */}
        <div className="hidden lg:flex items-center justify-center gap-10 flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="relative font-sans font-normal text-[11px] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              activeClassName="text-foreground after:w-full"
              end={link.href === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA + Language Toggle */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <LanguageToggle />
          <Button
            variant="hero"
            size="sm"
            onClick={openAcuity}
            className="text-[11px] tracking-[0.08em] uppercase"
          >
            {t("nav.cta")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-40 flex flex-col px-8 pt-10 pb-8">
          <div className="flex flex-col gap-6 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="font-serif text-2xl text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground"
                onClick={() => setMobileOpen(false)}
                end={link.href === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <Button
            variant="hero"
            className="w-full mt-6"
            onClick={() => { setMobileOpen(false); openAcuity(); }}
          >
            {t("nav.cta")}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
