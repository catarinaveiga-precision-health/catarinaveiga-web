import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";

import { Hero } from "@/components/v2/home/Hero";
import { Problem } from "@/components/v2/home/Problem";
import { CredibilityBand } from "@/components/v2/home/CredibilityBand";
import { Outcome } from "@/components/v2/home/Outcome";
import { LeadMagnet } from "@/components/v2/home/LeadMagnet";
import { Method } from "@/components/v2/home/Method";
import { Comparison } from "@/components/v2/home/Comparison";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { Foundation } from "@/components/v2/home/Foundation";
import { Alternatives } from "@/components/v2/home/Alternatives";
import { FAQ } from "@/components/v2/home/FAQ";
import { FinalCTA } from "@/components/v2/home/FinalCTA";

const IndexV2 = () => (
  <div className="min-h-screen bg-v2-paper text-v2-ink font-body antialiased selection:bg-v2-sage/20">
    <NavbarV2 />
    <main className="overflow-hidden">
      <Hero />
      <Problem />
      <CredibilityBand />
      <Outcome />
      <LeadMagnet />
      <Method />
      <Comparison />
      <SocialProof />
      <Foundation />
      <Alternatives />
      <FAQ />
      <FinalCTA />
    </main>
    <FooterV2 />
    <StickyMobileCTA />
  </div>
);

export default IndexV2;
