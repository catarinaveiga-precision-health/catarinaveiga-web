import { Button } from "@/components/ui/button";
import { openAcuity } from "@/hooks/useAcuityModal";
import { useFadeUp } from "@/hooks/useFadeUp";

const Hero = () => {
  const ref = useFadeUp();

  return (
    <section ref={ref} className="bg-background pt-24 pb-12 md:pt-40 md:pb-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="fade-up text-center md:text-left order-1">
          <p className="label-uppercase text-muted-foreground text-[11px] tracking-[0.18em] mb-6">
            Medicina Tradicional Chinesa  ·  Cédula ACSS  ·  20 anos de prática
          </p>
          <h1 className="font-serif font-light text-[36px] md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-6 md:mb-8">
            Uma leitura mais profunda das transições hormonais femininas na perimenopausa.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-sans max-w-[58ch]">
            Integrando sintomas, histórico clínico, padrões funcionais e contexto metabólico — com foco em perimenopausa e saúde da mulher.
          </p>
          <div className="hidden md:block w-[60px] h-[1px] bg-amber mb-10" />
          <div className="hidden md:flex flex-col items-start gap-3 mb-10">
            <Button variant="hero" size="lg" className="rounded-[4px] max-w-[280px] w-full" onClick={openAcuity}>
              Agendar consulta inicial
            </Button>
            <p className="text-muted-foreground/60 text-xs font-sans tracking-wide">
              Telemedicina  ·  Portugal e estrangeiro
            </p>
          </div>
        </div>

        <div className="fade-up relative order-2">
          <div className="relative overflow-hidden md:overflow-visible">
            <img
              src="/catarina-hero.jpg"
              alt="Catarina Veiga, especialista em Medicina Tradicional Chinesa"
              className="w-full h-[300px] md:h-auto object-cover object-top md:translate-y-4"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={800}
              height={960}
            />
          </div>
        </div>

        <div className="fade-up flex flex-col items-center gap-3 order-3 md:hidden">
          <Button variant="hero" size="lg" className="rounded-[4px] max-w-[320px] w-full" onClick={openAcuity}>
            Agendar consulta inicial
          </Button>
          <p className="text-muted-foreground/60 text-xs font-sans tracking-wide">
            Telemedicina  ·  Portugal e estrangeiro
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
