import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ButtonV2 } from "../ui/ButtonV2";

const navLinks = [
  { label: "Início", href: "/v2" },
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
        "fixed top-0 inset-x-0 z-50 bg-v2-paper transition-[border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-v2-paper-line"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
        <Link
          to="/v2"
          className="font-display text-h3-v2 text-v2-ink leading-none hover:text-v2-ink/80 transition-colors"
        >
          Catarina Veiga
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="font-body text-eyebrow-v2 uppercase text-v2-ink-mute hover:text-v2-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline-flex items-center gap-2 font-mono text-mono-v2 text-v2-ink-mute">
            <span className="text-v2-ink">PT</span>
            <span className="opacity-40">/</span>
            <span>EN</span>
          </span>
          <ButtonV2 as="a" href="https://catarinaveigaagendamento.as.me/" variant="primary" className="hidden sm:inline-flex">
            Agendar consulta
          </ButtonV2>
        </div>
      </div>
    </nav>
  );
};
