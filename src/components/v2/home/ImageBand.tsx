import consultaFoto from "@/assets/en-consult-notes.jpg";

/**
 * Faixa de imagem de largura total, entre a qualificação e a prova social.
 * Serve dois fins: quebra a sequência de fundos claros, e mostra o trabalho
 * real (ler as análises e tirar notas) em vez de uma imagem decorativa.
 */
export const ImageBand = () => (
  <figure className="relative m-0 h-[clamp(260px,38vw,460px)] overflow-hidden bg-v2-paper-deep">
    <img
      src={consultaFoto}
      alt="Mulher a rever as suas análises à mesa, com um caderno de apontamentos ao lado"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-center"
    />
  </figure>
);
