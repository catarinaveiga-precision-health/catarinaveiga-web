import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ButtonV2 } from "../ui/ButtonV2";
import { LeadMagnetTopBar } from "../leadmagnet/LeadMagnetTopBar";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Fundação", href: "/programa-fundacao" },
  { label: "Biblioteca", href: "/recursos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Interpretar análises", href: "/avaliacao" },
  { label: "Blog", href: "/blog" },
];

export const NavbarV2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fechar menu mobile ao navegar
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Bloquear scroll do body com o menu aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-v2-paper transition-[border-color] duration-300",
        scrolled || open
          ? "border-b border-v2-paper-line"
          : "border-b border-transparent",
      )}
    >
      <LeadMagnetTopBar />
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity"
        >
          <img
            src={logoIcon}
            alt="Catarina Veiga"
            className="h-9 w-9 object-contain"
            width={36}
            height={36}
          />
          <span className="font-serif text-xl text-v2-ink leading-none hidden sm:block">
            Catarina Veiga
          </span>
        </Link>

        {/* Nav links · centro */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="font-sans text-[11px] uppercase tracking-[0.18em] text-v2-graffiti hover:text-v2-ink transition-colors whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Direita · idioma + CTA + hambúrguer */}
        <div className="flex items-center gap-5 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 font-sans text-[11px] uppercase tracking-[0.14em] text-v2-graffiti">
            <span className="text-v2-ink">PT</span>
            <span className="opacity-40">|</span>
            <span>EN</span>
          </span>
          <ButtonV2
            as="a"
            href="https://catarinaveigaagendamento.as.me/"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            Agendar consulta
          </ButtonV2>

          {/* Hambúrguer · só < lg */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2"
          >
            <span
              className={cn(
                "block w-5 h-px bg-v2-ink transition-transform duration-200",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block w-5 h-px bg-v2-ink transition-transform duration-200",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile · overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-20 bg-v2-paper z-40 flex flex-col px-8 pt-12 pb-10 overflow-y-auto">
          <ul className="space-y-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="font-serif text-h3-v2 text-v2-ink hover:text-v2-ink-mute transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 pt-10 border-t border-v2-paper-line">
            <ButtonV2
              as="a"
              href="https://catarinaveigaagendamento.as.me/"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Agendar consulta
            </ButtonV2>
          </div>
        </div>
      )}
    </nav>
  );
};
