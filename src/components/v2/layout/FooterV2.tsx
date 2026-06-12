import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { ButtonV2 } from "../ui/ButtonV2";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Fundação", href: "/programa-fundacao" },
  { label: "Interpretar análises", href: "/avaliacao" },
  { label: "Sobre", href: "/sobre" },
  { label: "Biblioteca", href: "/recursos" },
  { label: "Blog", href: "/blog" },
  { label: "English consultations", href: "/english-consultations" },
];

export const FooterV2 = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-v2-paper border-t border-v2-paper-line">
      <Container size="default" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Coluna 1 — Identidade + NAP */}
          <div>
            <p className="font-serif text-h3-v2 text-v2-ink leading-tight">
              Catarina Veiga
            </p>
            <p className="mt-4 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.7] max-w-[28ch]">
              Medicina Tradicional Chinesa · Saúde Funcional Feminina
              <br />
              Cédula ACSS
              <br />
              Telemedicina · Portugal e estrangeiro
            </p>
            <address className="not-italic mt-6 font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.7]">
              Rua Luanda 738
              <br />
              2775-232 Parede, Portugal
              <br />
              <a
                href="https://maps.google.com/?q=Rua+Luanda+738,+2775-232+Parede"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-v2-paper-line hover:decoration-v2-ink hover:text-v2-ink transition-colors"
              >
                Ver no Google Maps
              </a>
            </address>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage mb-6">
              Navegação
            </p>
            <ul className="space-y-3">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    to={n.href}
                    className="font-sans text-body-sm-v2 text-v2-ink-mute hover:text-v2-ink transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Contacto */}
          <div>
            <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage mb-6">
              Contacto
            </p>
            <ul className="space-y-3 font-sans text-body-sm-v2 text-v2-ink-mute">
              <li>
                <a
                  href="mailto:info@catarinaveiga.com"
                  className="hover:text-v2-ink transition-colors"
                >
                  info@catarinaveiga.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+351917823906"
                  className="hover:text-v2-ink transition-colors"
                >
                  +351 917 823 906
                </a>
              </li>
              <li>
                Português ·{" "}
                <Link to="/english-consultations" className="hover:text-v2-ink transition-colors underline decoration-v2-paper-line">
                  English
                </Link>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-6 font-sans text-body-sm-v2 text-v2-ink-mute">
              <a
                href="https://instagram.com/catarina__veiga"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-v2-ink transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/catarina-veiga-medicina-funcional-integrativa/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-v2-ink transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Coluna 4 — Newsletter */}
          <div>
            <p className="font-sans text-mono-v2 uppercase tracking-[0.14em] text-v2-sage mb-6">
              Newsletter
            </p>
            <p className="font-sans text-body-sm-v2 text-v2-ink-mute leading-[1.65] mb-6 max-w-[32ch]">
              Leituras clínicas mensais sobre saúde hormonal feminina.
              <br />
              Sem promoção. Sem spam.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // hook posterior
              }}
              className="space-y-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                required
                className="w-full bg-transparent border-b border-v2-paper-line py-3 font-sans text-body-sm-v2 text-v2-ink placeholder:text-v2-ink-mute/50 focus:outline-none focus:border-v2-sage transition-colors"
              />
              <ButtonV2 variant="ghost" size="default">
                Subscrever
              </ButtonV2>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-v2-paper-line flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-sans text-mono-v2 uppercase tracking-[0.08em] text-v2-ink-mute">
            © 2026 Catarina Veiga · Todos os direitos reservados
          </p>
          <ul className="flex gap-8 font-sans text-body-sm-v2 text-v2-ink-mute">
            <li>
              <Link to="/aviso-legal" className="hover:text-v2-ink transition-colors">
                Aviso Legal
              </Link>
            </li>
            <li>
              <Link to="/politica-privacidade" className="hover:text-v2-ink transition-colors">
                Privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos-utilizacao" className="hover:text-v2-ink transition-colors">
                Termos
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center font-sans text-body-sm-v2 italic text-v2-ink-mute/80 max-w-[64ch] mx-auto leading-[1.55]">
          Conteúdo deste website tem natureza educativa e informativa. Não
          substitui consulta médica, diagnóstico ou tratamento.
        </p>
      </Container>
    </footer>
  );
};
