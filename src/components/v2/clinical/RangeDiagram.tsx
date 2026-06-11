/* Diagrama editorial · intervalo de referência vs intervalo funcional.
   Estilo publicação científica: linhas finas, legendas mono, sem cor
   decorativa. Exemplo com TSH (os mesmos limiares usados em /avaliacao:
   referência 0,4–4,0 · funcional 0,5–2,0). */

export const RangeDiagram = () => (
  <figure className="max-w-[640px] mx-auto">
    <svg
      viewBox="0 0 640 200"
      role="img"
      aria-label="Comparação entre intervalo de referência laboratorial e intervalo funcional, exemplo com TSH"
      className="w-full h-auto"
    >
      {/* eixo */}
      <line x1="60" y1="150" x2="600" y2="150" stroke="#DDD5C6" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line
            x1={60 + v * 108}
            y1="146"
            x2={60 + v * 108}
            y2="154"
            stroke="#9A9D99"
            strokeWidth="1"
          />
          <text
            x={60 + v * 108}
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="#6F7370"
            fontFamily="Jost, sans-serif"
          >
            {v.toString().replace(".", ",")}
          </text>
        </g>
      ))}
      <text
        x="600"
        y="192"
        textAnchor="end"
        fontSize="10"
        fill="#9A9D99"
        fontFamily="Jost, sans-serif"
        letterSpacing="1"
      >
        TSH · mUI/L
      </text>

      {/* intervalo de referência: 0,4 – 4,0 */}
      <line
        x1={60 + 0.4 * 108}
        y1="70"
        x2={60 + 4.0 * 108}
        y2="70"
        stroke="#9A9D99"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.5"
      />
      <text
        x={60 + 0.4 * 108}
        y="52"
        fontSize="11"
        fill="#6F7370"
        fontFamily="Jost, sans-serif"
        letterSpacing="1.5"
      >
        INTERVALO DE REFERÊNCIA · 0,4 – 4,0
      </text>

      {/* intervalo funcional: 0,5 – 2,0 */}
      <line
        x1={60 + 0.5 * 108}
        y1="112"
        x2={60 + 2.0 * 108}
        y2="112"
        stroke="#4A5957"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <text
        x={60 + 0.5 * 108}
        y="98"
        fontSize="11"
        fill="#2F3F36"
        fontFamily="Jost, sans-serif"
        letterSpacing="1.5"
      >
        INTERVALO FUNCIONAL · 0,5 – 2,0
      </text>

      {/* valor exemplo: 2,8 — dentro da referência, fora do funcional */}
      <line
        x1={60 + 2.8 * 108}
        y1="58"
        x2={60 + 2.8 * 108}
        y2="150"
        stroke="#9C5239"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle cx={60 + 2.8 * 108} cy="70" r="5" fill="#9C5239" />
      <text
        x={60 + 2.8 * 108 + 10}
        y="64"
        fontSize="11"
        fill="#9C5239"
        fontFamily="Jost, sans-serif"
      >
        2,8 · "normal"
      </text>
      <text
        x={60 + 2.8 * 108 + 10}
        y="128"
        fontSize="11"
        fill="#9C5239"
        fontFamily="Jost, sans-serif"
      >
        fora do óptimo
      </text>
    </svg>
    <figcaption className="mt-4 font-sans text-[11px] text-v2-ink-mute/80 text-center leading-[1.5] max-w-[52ch] mx-auto">
      O mesmo valor pode estar dentro da referência laboratorial e fora do
      intervalo funcional. Exemplo ilustrativo com TSH.
    </figcaption>
  </figure>
);
