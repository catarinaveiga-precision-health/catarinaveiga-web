import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./index.css";

// Vercel Web Analytics. Motivo: e a unica forma direta de ver visitas vindas
// de chatgpt.com, perplexity.ai e gemini.google.com (referrerHostname), que e
// o marcador do projeto AEO. Autorizado pela Catarina a 23 ago 2026.
inject();

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
