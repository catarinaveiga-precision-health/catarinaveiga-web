import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ButtonV2 } from "../ui/ButtonV2";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Fundação", href: "/v2#fundacao" },
  { label: "Biblioteca", href: "/recursos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Interpretar análises", href: "/avaliacao" },
  { label: "Blog", href: "/blog" },
];

export const NavbarV2 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-v2-paper transition-[border-color] duration-300",
        scrolled
          ? "border-b border-v2-paper-line"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          to="/v2"
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

        {/* Direita · idioma + CTA */}
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
        </div>
      </div>
    </nav>
  );
};
