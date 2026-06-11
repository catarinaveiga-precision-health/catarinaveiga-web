import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import NotFound from "./pages/NotFound";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUtilizacao from "./pages/TermosUtilizacao";
import BlogPage from "./pages/BlogPage";
import BlogArticle from "./pages/BlogArticle";
import Candidatura from "./pages/Candidatura";
import ProgramaFundacao from "./pages/ProgramaFundacao";
import Metodo from "./pages/Metodo";
import Sobre from "./pages/Sobre";
import Avaliacao from "./pages/Avaliacao";
import FerritinaBaixa from "./pages/FerritinaBaixa";
import Recursos from "./pages/Recursos";
import VitaminaD from "./pages/VitaminaD";
import InsulinaJejum from "./pages/InsulinaJejum";
import FadigaExamesNormais from "./pages/FadigaExamesNormais";
import TshNormal from "./pages/TshNormal";
import MedicinaFuncional from "./pages/MedicinaFuncional";
import PequenosAlmocosRicosProteina from "./pages/PequenosAlmocosRicosProteina";
import PequenosAlmocosProteinaEnergia from "./pages/PequenosAlmocosProteinaEnergia";
import Aletheia from "./pages/Aletheia";
import GuiaSaciedade from "./pages/GuiaSaciedade";
import { LeadMagnetPopup } from "./components/v2/leadmagnet/LeadMagnetPopup";
import { HelmetProvider } from "react-helmet-async";
import SEOCanonical from "./components/SEOCanonical";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SEOCanonical />
          <Routes>
            <Route path="/" element={<IndexV2 />} />
            <Route path="/v1" element={<Index />} />
            <Route path="/v2" element={<IndexV2 />} />
            <Route path="/candidatura" element={<Candidatura />} />
            <Route path="/programa-fundacao" element={<ProgramaFundacao />} />
            <Route path="/metodo" element={<Metodo />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/avaliacao" element={<Avaliacao />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-utilizacao" element={<TermosUtilizacao />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/ferritina-baixa-sintomas" element={<FerritinaBaixa />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/vitamina-d-valores-funcionais" element={<VitaminaD />} />
            <Route path="/vitamina-d" element={<VitaminaD />} />
            <Route path="/insulina-jejum-o-que-significa" element={<InsulinaJejum />} />
            <Route path="/fadiga-exames-normais" element={<FadigaExamesNormais />} />
            <Route path="/tsh-normal-mas-com-sintomas" element={<TshNormal />} />
            <Route path="/medicina-funcional" element={<MedicinaFuncional />} />
            <Route path="/pequenos-almocos-ricos-em-proteina" element={<PequenosAlmocosRicosProteina />} />
            <Route path="/pequenos-almocos-com-proteina-energia-equilibrio-hormonal-e-simplicidade-para-mulheres-em-peri-e-menopausa" element={<PequenosAlmocosProteinaEnergia />} />
            <Route path="/aletheia" element={<Aletheia />} />
            <Route path="/guia-saciedade" element={<GuiaSaciedade />} />
            <Route path="/especialidades/medicina-funcional/" element={<Navigate to="/medicina-funcional" replace />} />
            <Route path="/especialidades/" element={<Navigate to="/medicina-funcional" replace />} />
            
            <Route path="/insulina-jejum" element={<Navigate to="/insulina-jejum-o-que-significa" replace />} />
            <Route path="/pequenos-almocos-ricos-em-proteina-comeca-o-dia-com-energia-e-saude" element={<Navigate to="/pequenos-almocos-ricos-em-proteina" replace />} />
            <Route path="/pequenos-almocos-ricos-em-proteina-comeca-o-dia-com-energia-e-saude/" element={<Navigate to="/pequenos-almocos-ricos-em-proteina" replace />} />
            <Route path="/10-formas-de-estimular-o-nervo-vago-e-reequilibrar-o-sistema-nervoso" element={<Navigate to="/blog/nervo-vago-como-ativar-mulher" replace />} />
            <Route path="/adeus-obstipacao-dicas-naturais-para-um-intestino-feliz/" element={<Navigate to="/blog/intestino-preso-causas-hormonais-mulher" replace />} />
            <Route path="/nsdr-descanso-profundo-sem-dormir-para-melhorar-saude-e-produtividade/" element={<Navigate to="/blog/nervo-vago-como-ativar-mulher" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LeadMagnetPopup />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
