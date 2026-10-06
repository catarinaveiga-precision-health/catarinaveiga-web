import { motion, MotionConfig } from "framer-motion";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { StickyMobileCTA } from "@/components/v2/layout/StickyMobileCTA";
import { Container } from "@/components/v2/ui/Container";
import { CredentialsMarquee } from "@/components/v2/home/CredentialsMarquee";
import { CondicoesGrid } from "@/components/v2/home/CondicoesGrid";
import { SocialProof } from "@/components/v2/home/SocialProof";
import { FAQ } from "@/components/v2/home/FAQ";
import { FinalCTA } from "@/components/v2/home/FinalCTA";
import {
  WCButton,
  BandaGuia,
  BlocoConsulta,
  DuasOfertas,
  CartaoVideo,
  GrelhaArtigos,
  SobreWC,
} from "@/components/v2/wc/BlocosWC";
import { acuityUrl } from "@/lib/acuity";

/*
  Variante da página inicial no formato do drwillcole.com (pedido da
  Catarina, 02/10): blocos inteiros, cada um com uma ideia, fotografia
  grande e um botão. Aprovada e publicada como página inicial a 02/10.
*/

const ease = [0.22, 1, 0.36, 1] as const;

const HeroWC = () => (
  <section className="relative bg-v2-paper pt-24 md:pt-28 overflow-hidden">
    <Container size="wide">
      <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-8 md:gap-0">
        <motion.div
          className="md:col-span-6 relative flex justify-center md:justify-start"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <div className="relative w-full max-w-[520px] h-[400px] md:h-[600px] overflow-hidden bg-v2-paper-deep">
            <div
              aria-hidden
              className="absolute inset-0 [background:radial-gradient(70%_60%_at_50%_40%,rgba(113,130,129,0.22),transparent_75%)]"
            />
            <motion.img
              src="/catarina-hero-recorte.webp"
              alt="Catarina Veiga"
              width={800}
              height={1200}
              loading="eager"
              decoding="async"
              className="absolute bottom-0 inset-x-0 mx-auto h-[96%] w-auto max-w-none"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease }}
            />
          </div>
        </motion.div>

        <div className="md:col-span-6 md:pl-4 lg:pl-12 pb-14 md:pb-20 text-center md:text-left">
          <motion.h1
            className="font-sans font-semibold uppercase text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-[0.01em] text-v2-ink-mute"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            Os teus exames estão normais.
            <span className="block text-v2-ink">O teu corpo não.</span>
          </motion.h1>
          <motion.p
            className="mt-6 font-serif text-[clamp(1.25rem,2vw,1.6rem)] text-v2-ink-mute"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
          >
            Medicina funcional integrativa para mulheres, online.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
          >
            <WCButton to="/avaliacao">Autoavaliação gratuita</WCButton>
            <WCButton href={acuityUrl("hero-wc")}>Marcar consulta</WCButton>
          </motion.div>
        </div>
      </div>
    </Container>
  </section>
);

const IndexV3 = () => (
  <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-v2-paper text-v2-ink font-sans antialiased selection:bg-v2-sage/20">
      <NavbarV2 />
      <main className="overflow-hidden">
        <HeroWC />
        <CredentialsMarquee />
        <BandaGuia />
        <BlocoConsulta />
        <CondicoesGrid />
        <DuasOfertas />
        <CartaoVideo />
        <GrelhaArtigos />
        <SobreWC />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <FooterV2 />
      <StickyMobileCTA />
    </div>
  </MotionConfig>
);

export default IndexV3;
