const creds = [
  { nome: "Regenerus Labs", detalhe: "acreditação ativa · Reino Unido" },
  { nome: "Omnos", detalhe: "equipa fundadora · Head of Microbiome Department" },
  { nome: "Omnos Academy", detalhe: "Academy Manager · braço educativo" },
  { nome: "Nordic Labs", detalhe: "acreditação ativa" },
  { nome: "Longevity Med Summit", detalhe: "oradora · 2024" },
  { nome: "IHCAN Magazine", detalhe: "autora · setembro de 2022" },
];

const Item = ({ nome, detalhe }: { nome: string; detalhe: string }) => (
  <div className="flex items-baseline gap-3 whitespace-nowrap">
    <b className="font-serif text-[1.15rem] font-normal text-v2-ink">{nome}</b>
    <span className="font-sans text-[12.5px] text-v2-ink-mute">{detalhe}</span>
  </div>
);

const Separator = () => (
  <span aria-hidden className="self-center text-v2-sage/50">
    ◆
  </span>
);

export const CredentialsMarquee = () => (
  <div
    className="overflow-hidden border-y border-v2-paper-line bg-v2-paper-deep py-7"
    aria-label="Percurso e acreditações"
  >
    {/*
      Duas metades idênticas: `animate-marquee` (src/index.css) desloca -50%,
      por isso o ciclo fecha sem salto. Essa classe já traz a guarda de
      prefers-reduced-motion; aqui só se acrescenta o layout alternativo.
    */}
    <div className="flex w-max gap-16 animate-marquee [animation-duration:44s] hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-4">
      {creds.map((c) => (
        <div key={`a-${c.nome}`} className="flex gap-16">
          <Item {...c} />
          <Separator />
        </div>
      ))}
      {creds.map((c) => (
        <div
          key={`b-${c.nome}`}
          className="flex gap-16 motion-reduce:hidden"
          aria-hidden
        >
          <Item {...c} />
          <Separator />
        </div>
      ))}
    </div>
  </div>
);
