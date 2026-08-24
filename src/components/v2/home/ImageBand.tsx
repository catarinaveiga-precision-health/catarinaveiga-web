import consultaFoto from "@/assets/en-consult-notes.jpg";

/**
 * Faixa de imagem de largura total, entre a qualificação e a prova social.
 * Serve dois fins: quebra a sequência de fundos claros, e mostra o trabalho
 * real (ler as análises e tirar notas) em vez de uma imagem decorativa.
 */
/* Frase de benefício sobre a imagem (elemento 6 do estudo das 3000
   landing pages, era a última lacuna): scrim de verde profundo a subir
   do fundo, frase em serif claro. A imagem deixa de ser decorativa. */
export const ImageBand = () => (
  <figure className="relative m-0 h-[clamp(300px,42vw,520px)] overflow-hidden bg-v2-paper-deep">
    <img
      src={consultaFoto}
      alt="Mulher a rever as suas análises à mesa, com um caderno de apontamentos ao lado"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-center"
    />
    <div
      aria-hidden
      className="absolute inset-0 [background:linear-gradient(to_top,rgba(22,53,44,0.72)_0%,rgba(22,53,44,0.25)_45%,transparent_70%)]"
    />
    <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 md:pb-14">
      <p className="mx-auto max-w-[1280px] font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] tracking-[-0.01em] text-v2-paper text-balance">
        Deixas de adivinhar o que o teu corpo tem.
        <span className="block italic text-v2-paper/80">
          Passas a saber por onde começar.
        </span>
      </p>
    </figcaption>
  </figure>
);
