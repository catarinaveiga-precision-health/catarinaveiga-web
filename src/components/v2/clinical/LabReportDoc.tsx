/* Documento laboratorial estilizado · objecto clínico editorial.
   Valores ilustrativos (os mesmos usados na ferramenta /avaliacao).
   A tensão visual: tudo "dentro do intervalo" e ainda assim um corpo
   que continua a dar sinais. */

const rows = [
  { marker: "TSH", value: "2,8", unit: "mUI/L", ref: "0,4 – 4,0" },
  { marker: "Ferritina", value: "18", unit: "ng/mL", ref: "15 – 150" },
  { marker: "Vitamina D", value: "22", unit: "ng/mL", ref: "20 – 50" },
  { marker: "Vitamina B12", value: "315", unit: "pg/mL", ref: "200 – 900" },
  { marker: "PCR", value: "1,2", unit: "mg/L", ref: "< 5,0" },
];

export const LabReportDoc = () => (
  <figure className="relative max-w-[440px] mx-auto lg:mx-0">
    {/* folha por trás, ligeiramente rodada: profundidade física */}
    <div
      aria-hidden
      className="absolute inset-0 translate-x-2 translate-y-2 rotate-[0.6deg] bg-white border border-v2-paper-line"
    />
    <div className="relative bg-white border border-v2-paper-line px-7 py-8 shadow-[0_18px_48px_-18px_rgba(31,36,34,0.28)]">
      <div className="flex items-baseline justify-between border-b border-v2-paper-line pb-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-v2-ink-mute">
          Análises clínicas · resultados
        </p>
        <p className="font-sans text-[10px] tracking-[0.06em] text-v2-ink-mute/70">
          exemplo ilustrativo
        </p>
      </div>

      <table className="w-full mt-5">
        <thead>
          <tr className="font-sans text-[10px] uppercase tracking-[0.14em] text-v2-ink-mute/80">
            <th className="text-left font-normal pb-3">Marcador</th>
            <th className="text-right font-normal pb-3">Resultado</th>
            <th className="text-right font-normal pb-3">Referência</th>
          </tr>
        </thead>
        <tbody className="font-sans text-[13px] text-v2-ink">
          {rows.map((r) => (
            <tr key={r.marker} className="border-t border-v2-paper-line/70">
              <td className="py-2.5">{r.marker}</td>
              <td className="py-2.5 text-right tabular-nums">
                {r.value}{" "}
                <span className="text-v2-ink-mute text-[11px]">{r.unit}</span>
              </td>
              <td className="py-2.5 text-right tabular-nums text-v2-ink-mute">
                {r.ref} <span className="text-v2-sage-deep">✓</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* carimbo editorial */}
      <div className="mt-6 flex justify-end">
        <p className="font-serif italic text-h3-v2 text-v2-graffiti-soft -rotate-2 select-none">
          "está tudo normal"
        </p>
      </div>
    </div>
    <figcaption className="sr-only">
      Relatório de análises com todos os valores dentro dos intervalos de
      referência
    </figcaption>
  </figure>
);
