import { useFadeUp } from "@/hooks/useFadeUp";

const RecognizeThis = () => {
  const ref = useFadeUp();

  return (
    <section ref={ref} className="bg-muted section-padding">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="fade-up font-serif text-3xl md:text-4xl text-foreground mb-10 text-center">
          Reconheces isto?
        </h2>
        <div className="fade-up space-y-6 font-sans text-[1.0625rem] leading-[1.7] text-foreground/85">
          <p>
            Análises que voltam normais. A informação de que está tudo bem. E tu, que sabes que não está.
          </p>
          <p>
            Fadiga que não passa com descanso. Sono que não recupera. Peso que deixou de responder. O ciclo que mudou. A concentração que escapa. O humor que oscila sem razão aparente.
          </p>
          <p>
            Quarenta e tal anos. Tudo dentro dos valores de referência. E, ainda assim, cada vez menos reconhecida no teu próprio corpo.
          </p>
          <p className="font-serif text-foreground pt-2">
            É neste território que trabalho.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecognizeThis;
