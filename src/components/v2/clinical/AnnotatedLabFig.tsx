/* Fig. 02 · análise com apontamentos à mão.
   Documento laboratorial com valores ligeiramente desfocados (sem
   dados identificáveis) e camada de anotações: círculo, setas e notas
   manuscritas. Comunica investigação, não decoração. */

const rows = [
  { m: "TSH", v: "2,8 mUI/L", ref: "0,4 – 4,0" },
  { m: "T4 livre", v: "1,1 ng/dL", ref: "0,8 – 1,8" },
  { m: "Ferritina", v: "18 ng/mL", ref: "15 – 150" },
  { m: "Vitamina D", v: "22 ng/mL", ref: "20 – 50" },
  { m: "Vitamina B12", v: "315 pg/mL", ref: "200 – 900" },
  { m: "PCR", v: "1,2 mg/L", ref: "< 5,0" },
  { m: "Insulina jejum", v: "11 µUI/mL", ref: "2 – 25" },
];

export const AnnotatedLabFig = () => (
  <figure className="relative max-w-[560px] mx-auto">
    <div className="relative bg-white border border-v2-paper-line px-8 py-8 shadow-[0_22px_56px_-20px_rgba(31,36,34,0.3)]">
      {/* documento · ligeiramente desfocado */}
      <div className="blur-[1.5px] select-none" aria-hidden>
        <div className="flex items-baseline justify-between border-b border-v2-paper-line pb-3">
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-v2-ink-mute">
            Bioquímica · soro
          </p>
          <p className="font-sans text-[10px] text-v2-ink-mute/70">
            pág. 2 de 4
          </p>
        </div>
        <table className="w-full mt-4">
          <tbody className="font-sans text-[12.5px] text-v2-ink">
            {rows.map((r) => (
              <tr key={r.m} className="border-t border-v2-paper-line/60">
                <td className="py-2">{r.m}</td>
                <td className="py-2 text-right tabular-nums">{r.v}</td>
                <td className="py-2 text-right tabular-nums text-v2-ink-mute">
                  {r.ref}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* camada de anotações · nítida */}
      <svg
        viewBox="0 0 560 360"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        {/* círculo à mão na ferritina */}
        <ellipse
          cx="320"
          cy="152"
          rx="92"
          ry="20"
          fill="none"
          stroke="#9C5239"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform="rotate(-1.2 320 152)"
          strokeDasharray="2 0 240"
        />
        {/* seta ferritina → nota */}
        <path
          d="M 415 150 C 460 145, 478 132, 488 112"
          fill="none"
          stroke="#9C5239"
          strokeWidth="1.5"
        />
        <path d="M 484 120 L 488 110 L 478 112" fill="none" stroke="#9C5239" strokeWidth="1.5" />
        {/* sublinhado ondulado na vit D */}
        <path
          d="M 252 196 q 8 -4 16 0 t 16 0 t 16 0 t 16 0 t 16 0"
          fill="none"
          stroke="#9A7B53"
          strokeWidth="1.4"
        />
        {/* seta lateral TSH */}
        <path
          d="M 60 96 C 40 100, 34 116, 38 132"
          fill="none"
          stroke="#9A7B53"
          strokeWidth="1.4"
        />
      </svg>

      {/* notas manuscritas */}
      <p className="absolute top-[58px] right-6 font-serif italic text-[15px] text-v2-brick -rotate-2 leading-tight">
        baixa para<br />sintomas
      </p>
      <p className="absolute bottom-[88px] left-6 font-serif italic text-[14px] text-v2-golden-deep -rotate-1">
        cruzar com sono
      </p>
      <p className="absolute top-[150px] left-3 font-serif italic text-[14px] text-v2-golden-deep rotate-1">
        padrão?
      </p>
    </div>
    <figcaption className="mt-4 font-sans text-[11px] uppercase tracking-[0.14em] text-v2-ink-mute/80 text-center">
      Fig. 02 · Integração de biomarcadores e sintomas
    </figcaption>
  </figure>
);
