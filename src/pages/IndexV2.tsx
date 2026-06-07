import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";

import { Hero } from "@/components/v2/home/Hero";
import { Problem } from "@/components/v2/home/Problem";
import { Outcome } from "@/components/v2/home/Outcome";
import { PrimeiraConsulta } from "@/components/v2/home/PrimeiraConsulta";
import { Method } from "@/components/v2/home/Method";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { SobreCurta } from "@/components/v2/home/SobreCurta";
import { FAQ } from "@/components/v2/home/FAQ";
import { Foundation } from "@/components/v2/home/Foundation";
import { FinalCTA } from "@/components/v2/home/FinalCTA";

const IndexV2 = () => (
  <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
    <NavbarV2 />
    <main className="overflow-hidden">
      <Hero />
      <Problem />
      <Outcome />
      <PrimeiraConsulta />
      <Method />
      <SocialProof />
      <SobreCurta />
      <FAQ />
      <Foundation />
      <FinalCTA />
    </main>
    <FooterV2 />
    <StickyMobileCTA />
  </div>
);

export default IndexV2;
