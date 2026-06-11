/* Mockup editorial do plano por escrito entregue após a consulta.
   Documento físico: folha com cabeçalho, secções e linhas de texto
   sugeridas (sem conteúdo clínico real). */

const SectionLines = ({
  title,
  lines,
}: {
  title: string;
  lines: number[];
}) => (
  <div className="mt-5">
    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-v2-sage-deep">
      {title}
    </p>
    <div className="mt-2.5 space-y-2">
      {lines.map((w, i) => (
        <div
          key={i}
          className="h-[5px] bg-v2-paper-deep rounded-full"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  </div>
);

export const PlanoDoc = () => (
  <figure className="relative max-w-[380px]">
    <div
      aria-hidden
      className="absolute inset-0 -translate-x-2 translate-y-2 -rotate-[0.5deg] bg-white border border-v2-paper-line"
    />
    <div className="relative bg-white border border-v2-paper-line px-7 py-7 shadow-[0_18px_48px_-18px_rgba(31,36,34,0.25)]">
      <div className="flex items-baseline justify-between border-b border-v2-paper-line pb-3.5">
        <p className="font-serif text-[15px] text-v2-ink">Plano clínico</p>
        <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-ink-mute/70">
          por escrito
        </p>
      </div>

      <SectionLines title="Hipóteses clínicas" lines={[92, 78, 64]} />
      <SectionLines title="Prioridades" lines={[70, 84]} />
      <SectionLines title="Próximos passos" lines={[88, 58, 73]} />

      <div className="mt-6 pt-4 border-t border-v2-paper-line flex items-center justify-between">
        <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-ink-mute/70">
          Revisões previstas
        </p>
        <p className="font-serif italic text-[13px] text-v2-ink-mute">
          Catarina Veiga
        </p>
      </div>
    </div>
    <figcaption className="sr-only">
      Documento do plano clínico escrito entregue após a primeira consulta
    </figcaption>
  </figure>
);
