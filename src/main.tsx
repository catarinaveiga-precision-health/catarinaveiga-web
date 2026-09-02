import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import { LanguageProvider } from "./contexts/LanguageContext";
import { initOutboundTracking } from "./lib/analytics";
import "./index.css";

// Vercel Web Analytics. Motivo: e a unica forma direta de ver visitas vindas
// de chatgpt.com, perplexity.ai e gemini.google.com (referrerHostname), que e
// o marcador do projeto AEO. Autorizado pela Catarina a 23 ago 2026.
inject();

// Regista o clique em qualquer caminho para o Acuity como evento GA4. A
// marcação acontece fora do domínio, por isso sem isto o GA4 não vê nenhuma
// conversão do site.
initOutboundTracking();

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
