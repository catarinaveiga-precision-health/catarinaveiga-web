import { Link } from "react-router-dom";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";

import { Hero } from "@/components/v2/home/Hero";
import { CredentialsMarquee } from "@/components/v2/home/CredentialsMarquee";
import { Problem } from "@/components/v2/home/Problem";
import { CondicoesGrid } from "@/components/v2/home/CondicoesGrid";
import { CuidadoContinuo } from "@/components/v2/home/CuidadoContinuo";
import { RigorClinico } from "@/components/v2/home/RigorClinico";
import { Outcome } from "@/components/v2/home/Outcome";
import { Resultado } from "@/components/v2/home/Resultado";
import { PrimeiraConsulta } from "@/components/v2/home/PrimeiraConsulta";
import { InsideOut } from "@/components/v2/home/InsideOut";
import { StatsRow } from "@/components/v2/home/StatsRow";
import { Comparison } from "@/components/v2/home/Comparison";
import { Qualification } from "@/components/v2/home/Qualification";
import { ImageBand } from "@/components/v2/home/ImageBand";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { VideoIntro } from "@/components/v2/home/VideoIntro";
import { FAQ } from "@/components/v2/home/FAQ";
import { Promessa } from "@/components/v2/home/Promessa";
import { FinalCTA } from "@/components/v2/home/FinalCTA";

/*
  Homepage · página de conversão única para a consulta inicial.

  Segue o Story Framework de 8 secções da skill monetization-copy, pela ordem
  que ela impõe: o produto só aparece depois de a dor estar validada e de o
  outcome estar vendido.

   1 STOP ......... Hero
     CredentialsMarquee: quem chega por recomendação vem confirmar quem ela é
   2 PROBLEMA ..... Problem, nas palavras das pacientes
     CondicoesGrid (Parsley): as condições com nome, portas de entrada
     Outcome: a tese, "não é fazer mais exames, é ler bem os que já tens"
   3 OUTCOME ...... Resultado, a vida depois. Compreensão, nunca cura
   4 REVEAL ....... PrimeiraConsulta, e só aqui é que o produto aparece
   5 INSIDE-OUT ... InsideOut, tudo o que está dentro, sem reservas
     CuidadoContinuo (Parsley): o acompanhamento depois da 1.ª consulta
     RigorClinico (Parsley): o rosto e a lista dura de credenciais
     StatsRow, Comparison, Qualification: autoridade, distinção, qualificação
   6 OBJEÇÕES ..... FAQ, 13 perguntas, a da credencial em primeiro
   7 PROVA ........ SocialProof, imediatamente antes do fecho
     VideoIntro: a cara e a voz dela antes da decisão (facade, só carrega ao clique)
     Promessa: reversão de risco, entregáveis e não resultado clínico
   8 CTA FINAL .... FinalCTA. Um botão, um preço, uma ação

  REGRA DA SKILL, absoluta: uma só CTA. Todos os botões levam ao mesmo sítio,
  marcar a consulta inicial. Sem lead magnet a competir, sem segunda oferta.

  Saíram desta página:
  - Foundation (Programa Fundação): decisão da Catarina, não existe
  - Method: substituído pelo InsideOut, que mostra o mesmo em detalhe
  - SobreCurta: a autoridade passou para a faixa de credenciais e os números
  - o link para a ferramenta gratuita no hero: era uma segunda ação a competir
*/
const IndexV2 = () => (
  <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
    <NavbarV2 />
    <main className="overflow-hidden">
      <Hero />
      <CredentialsMarquee />
      <Problem />
      <CondicoesGrid />
      <Outcome />
      <Resultado />
      <PrimeiraConsulta />
      <InsideOut />
      <CuidadoContinuo />
      <RigorClinico />
      <StatsRow />
      <Comparison />
      <Qualification />
      <ImageBand />
      <FAQ />
      <SocialProof />
      <VideoIntro />
      <Promessa />
      <FinalCTA />
      <section className="bg-v2-paper-deep border-t border-v2-paper-line py-8 text-center">
        <p className="font-sans text-sm text-v2-ink-mute px-6">
          English-speaking?{" "}
          <Link
            to="/english-consultations"
            className="text-v2-ink underline decoration-v2-paper-line hover:decoration-v2-ink transition-colors"
          >
            Consultations in English, online or in Cascais
          </Link>
        </p>
      </section>
    </main>
    <FooterV2 />
    <StickyMobileCTA />
  </div>
);

export default IndexV2;
