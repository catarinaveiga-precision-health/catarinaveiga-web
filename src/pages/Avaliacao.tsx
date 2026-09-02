import { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft, ChevronDown, Download, BookOpen } from "lucide-react";
import { BIOMARKER_REFERENCES } from "@/data/biomarkerReferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { supabase } from "@/integrations/supabase/client";
import { notificarLead } from "@/lib/notificarLead";
// PDF helpers carregados via dynamic import nos pontos de uso (lazy chunk)
// para evitar 599 KB no bundle inicial.
import AcuityModal from "@/components/AcuityModal";
import { LAB_UNIT_CONFIG, LabKey, getDefaultUnit, isImplausible } from "@/lib/labUnits";
import { track } from "@/lib/analytics";

const OBJECTIVES = [
  "Fadiga persistente",
  "Energia e metabolismo",
  "Alterações hormonais",
  "Digestão e bem-estar intestinal",
  "Imunidade e inflamação",
  "Perda de peso",
  "Equilíbrio emocional e sono",
  "Optimização geral",
];

interface LabValues {
  hemoglobina?: string;
  glicose?: string;
  insulina?: string;
  tsh?: string;
  t3_livre?: string;
  t4_livre?: string;
  ferritina?: string;
  ferro_serico?: string;
  transferrina?: string;
  pcr?: string;
  homocisteina?: string;
  vsg?: string;
  vitamina_d?: string;
  vitamina_b12?: string;
  acido_folico?: string;
  cortisol?: string;
  dhea?: string;
  estradiol?: string;
}

type LabUnits = Partial<Record<keyof LabValues, string>>;

interface FormState {
  objetivos: string[];
  consentimento: boolean;
  sexo: string;
  idade: string;
  labValues: LabValues;
  labUnits: LabUnits;
  nome: string;
  email: string;
}

// Pré-popular unidades com defaults para cada marcador.
const initialUnits: LabUnits = (Object.keys(LAB_UNIT_CONFIG) as LabKey[]).reduce(
  (acc, k) => ({ ...acc, [k]: getDefaultUnit(k) }),
  {} as LabUnits,
);

const initialForm: FormState = {
  objetivos: [],
  consentimento: false,
  sexo: "",
  idade: "",
  labValues: {},
  labUnits: initialUnits,
  nome: "",
  email: "",
};

const STEP_TITLES = [
  "Objetivos",
  "Perfil",
  "O teu relatório",
  "Análises",
  "Mais valores",
  "Score",
  "Relatório",
  "Próximos passos",
];

// Step icons removed — using numbered tabs instead

const SYSTEM_LABELS: Record<string, string> = {
  Hemoglobina: "Ferro e Energia",
  "Glicose em jejum": "Metabolismo Glicémico",
  "Insulina em jejum": "Metabolismo Glicémico",
  TSH: "Tiróide",
  "T3 Livre": "Tiróide",
  "T4 Livre": "Tiróide",
  Ferritina: "Ferro e Energia",
  "Ferro Sérico": "Ferro e Energia",
  Transferrina: "Ferro e Energia",
  "Saturação de Transferrina": "Ferro e Energia",
  PCR: "Inflamação",
  "Homocisteína": "Inflamação",
  VS: "Inflamação",
  "Vitamina D": "Metabolismo",
  "Vitamina B12": "Metabolismo",
  "Ácido Fólico": "Metabolismo",
  "Cortisol (manhã)": "Eixo HPA",
  "DHEA-S": "Eixo HPA",
};

const FUNCTIONAL_RANGES: Record<string, string> = {
  Hemoglobina: "Intervalo funcional: 13.5–14.5 g/dL (mulher)",
  "Glicose em jejum": "Intervalo funcional: 75–86 mg/dL",
  "Insulina em jejum": "Intervalo funcional: 2–5 µUI/mL",
  TSH: "Intervalo funcional: 1.0–2.0 mUI/L",
  "T3 Livre": "Intervalo funcional: 3.0–3.5 pg/mL",
  "T4 Livre": "Intervalo funcional: 1.0–1.5 ng/dL",
  Ferritina: "Intervalo funcional: 30–100 ng/mL",
  "Ferro Sérico": "Intervalo funcional: 85–130 µg/dL",
  "Saturação de Transferrina": "Intervalo funcional: 24–35%",
  PCR: "Intervalo funcional: < 1.0 mg/L",
  VS: "Intervalo funcional: < 10 mm/h",
  "Vitamina D": "Intervalo funcional: 50–90 ng/mL",
  "Vitamina B12": "Intervalo funcional: 545–1100 pg/mL",
  "Ácido Fólico": "Intervalo funcional: 15–27 ng/mL",
  "Homocisteína": "Intervalo funcional: < 7 µmol/L",
  "Cortisol (manhã)": "Intervalo funcional: 10–15 µg/dL",
  "DHEA-S": "Intervalo funcional: 275–390 µg/dL (mulher)",
};

const SYSTEM_EXPLANATIONS: Record<string, string> = {
  "Tiróide": "A tiróide regula o metabolismo, energia e temperatura corporal. Valores sub-óptimos de TSH, T3 ou T4 podem explicar fadiga, ganho de peso e dificuldade de concentração, mesmo quando estão dentro do 'normal' laboratorial.",
  "Ferro e Energia": "O ferro é essencial para o transporte de oxigénio e produção de energia celular. Ferritina funcionalmente baixa (< 40 ng/mL) é uma das causas mais comuns de fadiga crónica, queda de cabelo e intolerância ao frio.",
  "Inflamação": "A inflamação crónica de baixo grau está na base de muitas patologias modernas. PCR elevada e homocisteína alta são sinais precoces que o corpo está sob stress, antes de qualquer diagnóstico convencional.",
  "Metabolismo": "Vitamina D e B12 são cofactores essenciais para centenas de reações metabólicas, desde a imunidade à saúde neurológica. Níveis 'normais' podem ser insuficientes para um funcionamento óptimo.",
  "Eixo HPA": "O eixo hipotálamo-hipófise-adrenal regula a resposta ao stress. Cortisol desregulado pode causar insónia, ansiedade, fadiga matinal e dificuldade de recuperação.",
  "Metabolismo Glicémico": "A insulina sobe anos antes da glicose. Valores de insulina em jejum acima do óptimo funcional, mesmo com glicose 'normal', são um sinal precoce de perda de sensibilidade à insulina, associada a fadiga pós-refeição e dificuldade em perder peso.",
};

type FindingStatus = "optimal" | "suboptimal" | "flag" | "info";

interface EvalFinding {
  marker: string;
  value: string;
  unit: string;
  status: FindingStatus;
  direction?: "low" | "high";
  note: string;
  implausible?: boolean;
}

// Conversão de unidades alternativas para a unidade base de cada marcador.
// A avaliação é sempre feita na unidade base; o valor mostrado é o introduzido.
const UNIT_TO_BASE: Partial<Record<LabKey, Record<string, number>>> = {
  hemoglobina: { "g/dL": 1, "g/L": 0.1 },
  glicose: { "mg/dL": 1, "mmol/L": 18.016 },
  insulina: { "µUI/mL": 1, "mUI/L": 1 },
  t3_livre: { "pg/mL": 1, "pmol/L": 1 / 1.536 },
  t4_livre: { "ng/dL": 1, "pmol/L": 1 / 12.87 },
  ferro_serico: { "µg/dL": 1, "µmol/L": 5.587 },
  transferrina: { "mg/dL": 1, "g/L": 100 },
  pcr: { "mg/L": 1, "mg/dL": 10 },
  vitamina_d: { "ng/mL": 1, "nmol/L": 1 / 2.5 },
  vitamina_b12: { "pg/mL": 1, "pmol/L": 1.355 },
  acido_folico: { "ng/mL": 1, "nmol/L": 1 / 2.266 },
  cortisol: { "µg/dL": 1, "nmol/L": 1 / 27.59 },
  dhea: { "µg/dL": 1, "µmol/L": 1 / 0.02714 },
};

function toBase(key: LabKey, value: number, unit: string): number {
  const factors = UNIT_TO_BASE[key];
  if (!factors) return value;
  const f = factors[unit];
  return f === undefined ? value : value * f;
}

// Bandas por marcador, na unidade base, do mais baixo para o mais alto:
// [flagLow, subLow, optimalMin, optimalMax, subHigh, flagHigh]
// (limites abertos com null quando a banda não se aplica)
interface Bands {
  marker: string;
  flagLow?: number; // abaixo disto: flag (direção low)
  subLow?: number; // abaixo disto (e acima de flagLow): suboptimal low
  optMin: number;
  optMax: number;
  subHigh?: number; // acima de optMax até isto: suboptimal high; acima: flag high
  notes: Partial<Record<"optimal" | "subLow" | "subHigh" | "flagLow" | "flagHigh", string>>;
}

const MARKER_BANDS: Partial<Record<LabKey, Bands>> = {
  hemoglobina: {
    marker: "Hemoglobina",
    flagLow: 12,
    subLow: 13.5,
    optMin: 13.5,
    optMax: 14.5,
    subHigh: 16,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo (mulher).",
      subLow: "Sem anemia laboratorial, mas abaixo do óptimo funcional (13.5–14.5). Interpretar com a ferritina.",
      subHigh: "Acima do óptimo funcional.",
      flagLow: "Abaixo do intervalo de referência. Vale a pena explorar com o teu médico.",
      flagHigh: "Acima do intervalo de referência. Vale a pena explorar com o teu médico.",
    },
  },
  glicose: {
    marker: "Glicose em jejum",
    flagLow: 65,
    subLow: 75,
    optMin: 75,
    optMax: 86,
    subHigh: 99,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo.",
      subLow: "Abaixo do óptimo funcional (75–86).",
      subHigh: "Dentro do 'normal' laboratorial, mas acima do óptimo funcional (75–86). Interpretar com a insulina.",
      flagLow: "Baixa. Vale a pena explorar com o teu médico.",
      flagHigh: "Acima do intervalo de referência. Vale a pena explorar com o teu médico.",
    },
  },
  insulina: {
    marker: "Insulina em jejum",
    optMin: 2,
    optMax: 5,
    subHigh: 19,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo.",
      subLow: "Abaixo do intervalo funcional. Interpretar em contexto.",
      subHigh: "Dentro do intervalo laboratorial, mas acima do óptimo funcional (2–5). Interpretar com a glicose.",
      flagHigh: "Elevada. Vale a pena explorar com o teu médico.",
    },
  },
  tsh: {
    marker: "TSH",
    flagLow: 0.45,
    subLow: 1.0,
    optMin: 1.0,
    optMax: 2.0,
    subHigh: 4.5,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo.",
      subLow: "Abaixo do óptimo funcional (1.0–2.0). Interpretar com T3 e T4 livres.",
      subHigh: "Dentro do intervalo convencional, mas acima do óptimo funcional (1.0–2.0).",
      flagLow: "Abaixo do intervalo de referência. Vale a pena explorar com o teu médico.",
      flagHigh: "Fora do intervalo de referência. Vale a pena explorar com o teu médico.",
    },
  },
  t3_livre: {
    marker: "T3 Livre",
    flagLow: 2.3,
    subLow: 3.0,
    optMin: 3.0,
    optMax: 3.5,
    subHigh: 4.2,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo.",
      subLow: "Na metade inferior do intervalo convencional. Avaliar conversão T4 para T3.",
      subHigh: "Acima do óptimo funcional.",
      flagLow: "Abaixo do intervalo de referência. Vale a pena explorar com o teu médico.",
      flagHigh: "Acima do intervalo de referência. Vale a pena explorar com o teu médico.",
    },
  },
  t4_livre: {
    marker: "T4 Livre",
    flagLow: 0.8,
    subLow: 1.0,
    optMin: 1.0,
    optMax: 1.5,
    subHigh: 1.8,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo.",
      subLow: "Abaixo do óptimo funcional (1.0–1.5).",
      subHigh: "Acima do óptimo funcional.",
      flagLow: "Abaixo do intervalo de referência. Vale a pena explorar com o teu médico.",
      flagHigh: "Acima do intervalo de referência. Vale a pena explorar com o teu médico.",
    },
  },
  ferritina: {
    marker: "Ferritina",
    flagLow: 12,
    subLow: 30,
    optMin: 30,
    optMax: 100,
    subHigh: 300,
    notes: {
      optimal: "Nível óptimo para energia e função tiroideia.",
      subLow: "Dentro do 'normal' laboratorial, mas funcionalmente baixa.",
      subHigh: "Elevada. Pode refletir inflamação; interpretar com PCR.",
      flagLow: "Reservas de ferro muito baixas. Vale a pena explorar com o teu médico.",
      flagHigh: "Muito elevada. Vale a pena explorar com o teu médico.",
    },
  },
  ferro_serico: {
    marker: "Ferro Sérico",
    flagLow: 65,
    subLow: 85,
    optMin: 85,
    optMax: 130,
    subHigh: 175,
    notes: {
      optimal: "Dentro do intervalo funcional óptimo.",
      subLow: "Abaixo do óptimo funcional (85–130 µg/dL). Interpretar com ferritina e saturação.",
      subHigh: "Acima do óptimo funcional.",
      flagLow: "Abaixo do intervalo de referência. Vale a pena explorar com o teu médico.",
      flagHigh: "Acima do intervalo de referência. Vale a pena explorar com o teu médico.",
    },
  },
  pcr: {
    marker: "PCR",
    optMin: 0,
    optMax: 1,
    subHigh: 3,
    notes: {
      optimal: "Sem inflamação sistémica detectável.",
      subHigh: "Inflamação de baixo grau. Investigar causa.",
      flagHigh: "Inflamação elevada. Vale a pena explorar com o teu médico.",
    },
  },
  homocisteina: {
    marker: "Homocisteína",
    optMin: 0,
    optMax: 7,
    subHigh: 10,
    notes: {
      optimal: "Nível óptimo.",
      subHigh: "Ligeiramente elevada. Verificar B12, B6 e folato.",
      flagHigh: "Elevada. Vale a pena explorar com o teu médico.",
    },
  },
  vsg: {
    marker: "VS",
    optMin: 0,
    optMax: 10,
    subHigh: 20,
    notes: {
      optimal: "Dentro do intervalo funcional.",
      subHigh: "Acima do óptimo funcional. Interpretar com PCR.",
      flagHigh: "Elevada. Vale a pena explorar com o teu médico.",
    },
  },
  vitamina_d: {
    marker: "Vitamina D",
    flagLow: 30,
    subLow: 50,
    optMin: 50,
    optMax: 90,
    notes: {
      optimal: "Nível óptimo funcional.",
      subLow: "Suficiente mas abaixo do óptimo funcional (50–90).",
      subHigh: "Acima do intervalo óptimo. Rever dose de suplementação.",
      flagLow: "Insuficiência de vitamina D.",
    },
  },
  vitamina_b12: {
    marker: "Vitamina B12",
    flagLow: 200,
    subLow: 545,
    optMin: 545,
    optMax: 1100,
    notes: {
      optimal: "Nível óptimo funcional.",
      subLow: "Normal laboratorial mas funcionalmente insuficiente.",
      subHigh: "Acima do intervalo funcional. Rever suplementação.",
      flagLow: "Deficiência de B12. Vale a pena explorar com o teu médico.",
    },
  },
  acido_folico: {
    marker: "Ácido Fólico",
    flagLow: 5.5,
    subLow: 15,
    optMin: 15,
    optMax: 27,
    notes: {
      optimal: "Nível óptimo funcional.",
      subLow: "Dentro do 'normal' laboratorial, mas abaixo do óptimo funcional (15–27).",
      subHigh: "Acima do intervalo funcional. Interpretar com B12.",
      flagLow: "Baixo. Vale a pena explorar com o teu médico.",
    },
  },
  cortisol: {
    marker: "Cortisol (manhã)",
    flagLow: 4,
    subLow: 10,
    optMin: 10,
    optMax: 15,
    subHigh: 22,
    notes: {
      optimal: "Dentro do intervalo funcional.",
      subLow: "Abaixo do óptimo funcional. Avaliar eixo HPA.",
      subHigh: "Acima do óptimo funcional. Avaliar eixo HPA.",
      flagLow: "Baixo. Vale a pena explorar com o teu médico.",
      flagHigh: "Elevado. Vale a pena explorar com o teu médico.",
    },
  },
  dhea: {
    marker: "DHEA-S",
    optMin: 275,
    optMax: 390,
    notes: {
      optimal: "Dentro do intervalo funcional (mulher).",
      subLow: "Abaixo do óptimo funcional (275–390 µg/dL, mulher). Declina com a idade.",
      subHigh: "Acima do intervalo funcional. Vale a pena explorar com o teu médico.",
    },
  },
};

function classify(bands: Bands, x: number): { status: FindingStatus; direction?: "low" | "high"; note: string } {
  if (bands.flagLow !== undefined && x < bands.flagLow)
    return { status: "flag", direction: "low", note: bands.notes.flagLow || "Abaixo do intervalo de referência." };
  if (x < bands.optMin)
    return { status: "suboptimal", direction: "low", note: bands.notes.subLow || "Abaixo do óptimo funcional." };
  if (x <= bands.optMax)
    return { status: "optimal", note: bands.notes.optimal || "Dentro do intervalo funcional." };
  if (bands.subHigh === undefined || x <= bands.subHigh)
    return { status: "suboptimal", direction: "high", note: bands.notes.subHigh || "Acima do óptimo funcional." };
  return { status: "flag", direction: "high", note: bands.notes.flagHigh || "Acima do intervalo de referência." };
}

export function evaluateResults(labValues: LabValues, labUnits: LabUnits) {
  const findings: EvalFinding[] = [];

  const raw = (key: keyof LabValues) => {
    const r = labValues[key];
    return r ? parseFloat(r.replace(",", ".")) : null;
  };
  const u = (key: keyof LabValues) => labUnits[key] || getDefaultUnit(key as LabKey) || "";
  const implausibleFor = (key: keyof LabValues, unit: string) =>
    labValues[key] ? isImplausible(key as LabKey, labValues[key] as string, unit) : false;

  const evaluatedKeys: LabKey[] = [
    "hemoglobina",
    "glicose",
    "insulina",
    "tsh",
    "t3_livre",
    "t4_livre",
    "ferritina",
    "ferro_serico",
    "pcr",
    "homocisteina",
    "vsg",
    "vitamina_d",
    "vitamina_b12",
    "acido_folico",
    "cortisol",
    "dhea",
  ];

  evaluatedKeys.forEach((key) => {
    const value = raw(key);
    if (value === null || Number.isNaN(value)) return;
    const unit = u(key);
    const bands = MARKER_BANDS[key];
    if (!bands) return;
    const base = toBase(key, value, unit);
    const { status, direction, note } = classify(bands, base);
    findings.push({
      marker: bands.marker,
      value: `${value}`,
      unit,
      status,
      direction,
      note,
      implausible: implausibleFor(key, unit),
    });
  });

  // Transferrina: sem intervalo funcional próprio; entra no cálculo da saturação.
  const transferrina = raw("transferrina");
  const ferro = raw("ferro_serico");
  if (transferrina !== null && !Number.isNaN(transferrina)) {
    const unit = u("transferrina");
    const transferrinaBase = toBase("transferrina", transferrina, unit); // mg/dL
    if (ferro !== null && !Number.isNaN(ferro)) {
      const ferroBase = toBase("ferro_serico", ferro, u("ferro_serico")); // µg/dL
      // TIBC (µg/dL) ≈ transferrina (mg/dL) × 1.389; saturação = ferro / TIBC
      const tibc = transferrinaBase * 1.389;
      if (tibc > 0) {
        const sat = Math.round((ferroBase / tibc) * 1000) / 10;
        let satResult: { status: FindingStatus; direction?: "low" | "high"; note: string };
        if (sat < 20) satResult = { status: "flag", direction: "low", note: "Saturação baixa. Interpretar com ferritina; vale a pena explorar com o teu médico." };
        else if (sat < 24) satResult = { status: "suboptimal", direction: "low", note: "Abaixo do óptimo funcional (24–35%)." };
        else if (sat <= 35) satResult = { status: "optimal", note: "Dentro do intervalo funcional." };
        else if (sat <= 48) satResult = { status: "suboptimal", direction: "high", note: "Acima do óptimo funcional (24–35%)." };
        else satResult = { status: "flag", direction: "high", note: "Saturação elevada. Vale a pena explorar com o teu médico." };
        findings.push({
          marker: "Saturação de Transferrina",
          value: `${sat}`,
          unit: "%",
          status: satResult.status,
          direction: satResult.direction,
          note: `Calculada a partir do ferro sérico e da transferrina. ${satResult.note}`,
        });
      }
      findings.push({
        marker: "Transferrina",
        value: `${transferrina}`,
        unit,
        status: "info",
        note: "Usada no cálculo da saturação de transferrina (acima).",
      });
    } else {
      findings.push({
        marker: "Transferrina",
        value: `${transferrina}`,
        unit,
        status: "info",
        note: "Registada. Para calcular a saturação de transferrina, preenche também o ferro sérico.",
      });
    }
  }

  // Estradiol: varia com a fase do ciclo e o estado hormonal; não é avaliado automaticamente.
  const estradiol = raw("estradiol");
  if (estradiol !== null && !Number.isNaN(estradiol)) {
    findings.push({
      marker: "Estradiol",
      value: `${estradiol}`,
      unit: u("estradiol"),
      status: "info",
      note: "Varia com a fase do ciclo e o estado hormonal; é interpretado em consulta, não automaticamente.",
    });
  }

  return findings;
}

function getSystemSummary(results: ReturnType<typeof evaluateResults>) {
  const systemMap = new Map<string, "optimal" | "suboptimal" | "flag">();
  results.forEach((r) => {
    if (r.status === "info") return;
    const sys = SYSTEM_LABELS[r.marker] || r.marker;
    const current = systemMap.get(sys);
    if (!current || r.status === "flag" || (r.status === "suboptimal" && current === "optimal")) {
      systemMap.set(sys, r.status as "optimal" | "suboptimal" | "flag");
    }
  });
  return Array.from(systemMap.entries());
}

// ─── Score do check-up ───────────────────────────────────────────────
// O score NÃO avalia a saúde da pessoa: mede quanto do painel funcional
// relevante para os objetivos dela está coberto pelas análises que tem.
// RASCUNHO CLÍNICO: os painéis por objetivo são propostos a partir do guia
// de intervalos funcionais e devem ser validados pela Catarina antes de
// publicar.

const ALL_MARKER_KEYS: LabKey[] = [
  "hemoglobina", "ferritina", "ferro_serico", "transferrina", "tsh",
  "t4_livre", "t3_livre", "vitamina_b12", "acido_folico", "vitamina_d",
  "pcr", "vsg", "homocisteina", "cortisol", "dhea", "glicose", "insulina",
];

const IDEAL_PANELS: Record<string, LabKey[]> = {
  "Fadiga persistente": ["hemoglobina", "ferritina", "ferro_serico", "transferrina", "tsh", "t4_livre", "t3_livre", "vitamina_b12", "acido_folico", "vitamina_d", "pcr"],
  "Energia e metabolismo": ["glicose", "insulina", "tsh", "ferritina", "vitamina_d"],
  "Alterações hormonais": ["tsh", "t4_livre", "t3_livre", "dhea", "cortisol"],
  "Digestão e bem-estar intestinal": ["pcr", "vsg", "ferritina", "vitamina_b12", "acido_folico", "vitamina_d"],
  "Imunidade e inflamação": ["vitamina_d", "pcr", "vsg", "ferritina", "hemoglobina"],
  "Perda de peso": ["glicose", "insulina", "tsh", "t4_livre", "t3_livre", "cortisol"],
  "Equilíbrio emocional e sono": ["cortisol", "dhea", "tsh", "vitamina_b12", "homocisteina", "vitamina_d"],
  "Optimização geral": ALL_MARKER_KEYS,
};

// Porquê de cada marcador em falta, em linguagem de leitora.
const WHY_MISSING: Partial<Record<LabKey, string>> = {
  hemoglobina: "Base do transporte de oxigénio; sem ela não se lê energia.",
  ferritina: "Hemoglobina normal não exclui reservas de ferro baixas; a ferritina mede as reservas.",
  ferro_serico: "Com a transferrina, permite calcular a saturação: o ferro realmente disponível.",
  transferrina: "Com o ferro sérico, permite calcular a saturação de transferrina.",
  tsh: "O sinal da hipófise para a tiróide; o ponto de partida do painel tiroideu.",
  t4_livre: "A forma de reserva da hormona tiroideia. O TSH sozinho não a mostra.",
  t3_livre: "A hormona tiroideia ativa. Sem T4L e T3L não se vê se a conversão está a acontecer.",
  vitamina_b12: "Essencial para energia e sistema nervoso; níveis 'normais' podem ser insuficientes.",
  acido_folico: "Trabalha em par com a B12 na metilação.",
  vitamina_d: "Atua como hormona em múltiplos sistemas; défice funcional é muito comum.",
  pcr: "Inflamação de baixo grau; também contextualiza uma ferritina 'boa demais'.",
  vsg: "Segundo marcador de inflamação, complementa a PCR.",
  homocisteina: "Mostra se a B12 e o folato estão a funcionar dentro das células.",
  cortisol: "O eixo do stress não aparece no check-up standard; só se vê medindo-o.",
  dhea: "A hormona adrenal que equilibra o cortisol; declina com a idade.",
  glicose: "O ponto de partida do metabolismo dos açúcares.",
  insulina: "Sobe anos antes da glicose; só as duas juntas mostram a sensibilidade à insulina.",
};

interface CheckupScore {
  score: number;
  tier: "baixo" | "medio" | "alto";
  needed: LabKey[];
  have: LabKey[];
  missing: LabKey[];
  categorias: { nome: string; total: number; cobertos: number }[];
}

function computeCheckupScore(objetivos: string[], labValues: LabValues): CheckupScore {
  const needed = new Set<LabKey>();
  objetivos.forEach((o) => (IDEAL_PANELS[o] || []).forEach((k) => needed.add(k)));
  if (needed.size === 0) ALL_MARKER_KEYS.forEach((k) => needed.add(k));

  const neededArr = Array.from(needed);
  const have = neededArr.filter((k) => ((labValues as Record<string, string | undefined>)[k] || "").trim() !== "");
  const missing = neededArr.filter((k) => !have.includes(k));
  const score = Math.round((have.length / neededArr.length) * 100);
  const tier: CheckupScore["tier"] = score < 40 ? "baixo" : score <= 70 ? "medio" : "alto";

  const catMap = new Map<string, { total: number; cobertos: number }>();
  neededArr.forEach((k) => {
    const nome = SYSTEM_LABELS[LAB_UNIT_CONFIG[k].marker] || "Outros";
    const cur = catMap.get(nome) || { total: 0, cobertos: 0 };
    cur.total += 1;
    if (have.includes(k)) cur.cobertos += 1;
    catMap.set(nome, cur);
  });
  const categorias = Array.from(catMap.entries()).map(([nome, c]) => ({ nome, ...c }));

  return { score, tier, needed: neededArr, have, missing, categorias };
}

const LabInput = ({
  label,
  labKey,
  value,
  unit,
  onChange,
  onUnitChange,
  placeholder,
}: {
  label: string;
  labKey: LabKey;
  value: string;
  unit: string;
  onChange: (v: string) => void;
  onUnitChange: (u: string) => void;
  placeholder?: string;
}) => {
  const cfg = LAB_UNIT_CONFIG[labKey];
  const showImplausible = value.trim() !== "" && unit && isImplausible(labKey, value, unit);
  const valueWithoutUnit = value.trim() !== "" && !unit;

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-sans text-v2-ink-mute">{label}</label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "—"}
          className="bg-transparent border-v2-sage/30 focus:border-v2-sage sm:flex-1"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          aria-label={`Unidade de ${label}`}
          className="h-10 rounded-md border border-v2-sage/30 bg-transparent px-2 text-sm font-sans text-v2-ink focus:border-v2-sage focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:w-auto sm:min-w-[110px]"
        >
          {cfg.units.length > 1 && <option value="">Unidade…</option>}
          {cfg.units.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label}
            </option>
          ))}
        </select>
      </div>
      {valueWithoutUnit && (
        <p className="text-xs font-sans text-destructive">
          Indica em que unidade está este valor.
        </p>
      )}
      {showImplausible && (
        <p className="text-xs font-sans text-v2-golden">
          Este valor parece invulgar para a unidade seleccionada. Verifica no relatório original se a unidade está correcta.
        </p>
      )}
    </div>
  );
};

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-v2-paper-line rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-sans text-v2-ink hover:bg-v2-paper-deep/50 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-v2-ink-mute transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm font-sans text-v2-ink-mute leading-relaxed">{children}</div>}
    </div>
  );
};

const BiomarkerRefs = ({ refs }: { refs: { authors: string; journal: string; year: string; pmid: string }[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[11px] text-v2-ink-mute hover:text-v2-ink/60 transition-colors font-sans"
      >
        <BookOpen className="w-3 h-3" />
        <span>Ver estudos</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mt-1.5 space-y-1 pl-4">
          {refs.map((ref) => (
            <li key={ref.pmid} className="text-[10px] text-v2-ink-mute font-sans leading-relaxed">
              {ref.authors} <span className="italic">{ref.journal}</span>. {ref.year}.{" "}
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-v2-ink/60"
              >
                PMID: {ref.pmid}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Avaliacao = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [acuityOpen, setAcuityOpen] = useState(false);

  const updateLab = (key: keyof LabValues, value: string) => {
    setForm((prev) => ({ ...prev, labValues: { ...prev.labValues, [key]: value } }));
  };

  const updateUnit = (key: keyof LabValues, unit: string) => {
    setForm((prev) => ({ ...prev, labUnits: { ...prev.labUnits, [key]: unit } }));
  };

  /** Marcadores onde valor está preenchido mas unidade está vazia. */
  const missingUnits = (Object.keys(form.labValues) as (keyof LabValues)[]).filter(
    (k) => (form.labValues[k] || "").trim() !== "" && !(form.labUnits[k] || "").trim(),
  );

  const toggleObjective = (obj: string) => {
    setForm((prev) => ({
      ...prev,
      objetivos: prev.objetivos.includes(obj)
        ? prev.objetivos.filter((o) => o !== obj)
        : [...prev.objetivos, obj],
    }));
  };

  const canProceed = () => {
    if (step === 0) return form.objetivos.length > 0;
    if (step === 1) return form.sexo !== "";
    // Step 2 = captura: nome, email e consentimento RGPD (dados de saúde).
    if (step === 2) return form.nome.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.consentimento;
    // Steps 3–4 = painéis laboratoriais. Bloquear avanço se houver valor sem unidade.
    if (step >= 3 && step <= 4 && missingUnits.length > 0) return false;
    return true;
  };

  const goNext = async () => {
    setError(null);
    if (!canProceed()) {
      if (step === 0) setError("Seleciona pelo menos um objetivo.");
      else if (step === 1) setError("Seleciona o sexo biológico.");
      else if (step === 2 && !form.consentimento) setError("Para continuar é necessário o teu consentimento para tratar os dados.");
      else if (step === 2) setError("Nome e email válido são obrigatórios.");
      else if (step >= 3 && step <= 4 && missingUnits.length > 0) setError("Indica em que unidade está cada valor preenchido.");
      return;
    }

    if (step === 5) {
      setSaving(true);
      const evalResults = evaluateResults(form.labValues, form.labUnits);
      const checkupData = computeCheckupScore(form.objetivos, form.labValues);
      const localeCountryCode = typeof navigator !== "undefined" && navigator.language.includes("-")
        ? navigator.language.split("-")[1]?.toUpperCase() ?? null
        : null;

      // Segmentação automática: tem_exames = true se houver pelo menos 1 valor
      // laboratorial preenchido. Define a sequência de emails subsequente
      // (Segmento A vs Segmento B).
      const temExames = Object.values(form.labValues).some(
        (v) => v && String(v).trim() !== "",
      );

      const insertData = {
        nome: form.nome.trim(),
        email: form.email.trim(),
        idade: form.idade ? parseInt(form.idade) : null,
        pais: localeCountryCode,
        sexo: form.sexo || null,
        objetivos: form.objetivos,
        valores_laboratoriais: JSON.parse(JSON.stringify({
          values: form.labValues,
          units: form.labUnits,
          consentimento_rgpd: form.consentimento,
          checkup: { score: checkupData.score, tier: checkupData.tier, em_falta: checkupData.missing },
        })),
        resultados: JSON.parse(JSON.stringify(evalResults)),
        tem_exames: temExames,
      };

      // Notificar antes de gravar: se a base de dados falhar, o lead chega na mesma.
      notificarLead({
        nome: insertData.nome,
        email: insertData.email,
        origem: "avaliacao-14-biomarcadores",
        notas:
          "Idade: " + (insertData.idade ?? "") +
          " | Sexo: " + (insertData.sexo ?? "") +
          " | Tem exames: " + (insertData.tem_exames ? "sim" : "nao") +
          " | Objetivos: " + (Array.isArray(insertData.objetivos) ? insertData.objetivos.join(", ") : ""),
      });

      const [{ data: leadRows, error: leadError }, { error: applicationsError }] = await Promise.all([
        supabase.from("leads_avaliacao").insert([{
          nome: insertData.nome,
          email: insertData.email,
          idade: insertData.idade,
          sexo: insertData.sexo,
          objetivos: insertData.objetivos,
          valores_laboratoriais: insertData.valores_laboratoriais,
          resultados: insertData.resultados,
          // Coluna criada em producao a 23 ago 2026 via SQL editor do Lovable
          // Cloud (estava em falta desde 5 jun e partia o insert com PGRST204).
          tem_exames: insertData.tem_exames,
          // Sem .select("id"): a RLS permite INSERT anonimo mas nao SELECT,
          // e pedir a linha de volta fazia a gravacao inteira falhar com 401.
          // leadRows fica null e o leadId ja tolerava null.
        } as any]),
        supabase.from("applications").insert([{
          nome: insertData.nome,
          email: insertData.email,
          idade: insertData.idade,
          pais: insertData.pais,
          sexo: insertData.sexo,
          objetivos: insertData.objetivos,
          valores_laboratoriais: insertData.valores_laboratoriais,
          resultados: insertData.resultados,
          rgpd_aceite: form.consentimento,
        }]),
      ]);

      setSaving(false);
      if (leadError || applicationsError) {
        console.error("Avaliacao save error", { leadError, applicationsError });
        setError("Erro ao guardar. Tenta novamente.");
        return;
      }
      setSaved(true);

      // Key event: o lead só conta depois de a gravação passar. com_analises
      // separa o segmento A do B, que é a distinção que muda a sequência de
      // emails e o valor real do lead.
      track("autoavaliacao_lead", {
        com_analises: temExames,
        marcadores_preenchidos: evalResults.length,
        score_checkup: checkupData.score,
      });

      // Generate PDF base64 for email attachment
      const systemSummary = getSystemSummary(evalResults);
      let pdfBase64: string | undefined;
      try {
        const { generatePDFBase64 } = await import("@/lib/generatePDF");
        pdfBase64 = await generatePDFBase64(form.nome.trim(), systemSummary, evalResults, {
          score: checkupData.score,
          missing: checkupData.missing.map((k) => ({ marker: LAB_UNIT_CONFIG[k].marker, why: WHY_MISSING[k] || "" })),
        });
      } catch (e) {
        console.error('PDF generation error:', e);
      }

      const dateSafe = new Date().toISOString().slice(0, 10);
      const safeName = form.nome.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      // Fire-and-forget: send transactional emails. Segmento A recebe leitura
      // funcional + PDF; Segmento B recebe email 1 da sequência B (sem PDF).
      const leadId = (leadRows && leadRows[0] ? (leadRows[0] as any).id : null) as string | null;
      supabase.functions.invoke('send-emails', {
        body: {
          table: 'leads_avaliacao',
          record: {
            id: leadId,
            nome: form.nome.trim(),
            email: form.email.trim(),
            idade: form.idade ? parseInt(form.idade) : null,
            sexo: form.sexo || null,
            objetivos: form.objetivos,
            valores_laboratoriais: { values: form.labValues, units: form.labUnits },
            resultados: evalResults,
            tem_exames: temExames,
            created_at: new Date().toISOString(),
          },
          pdf_attachment: temExames && pdfBase64 ? {
            content: pdfBase64,
            filename: `leitura-funcional-${safeName}-${dateSafe}.pdf`,
          } : undefined,
        },
      }).catch((err) => console.error('Email send error:', err));
    }

    setStep((s) => Math.min(s + 1, 7));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const results = evaluateResults(form.labValues, form.labUnits);
  const systems = getSystemSummary(results);
  const checkup = computeCheckupScore(form.objetivos, form.labValues);
  const hasAnyLabValue = Object.values(form.labValues).some((v) => v && v.trim() !== "");
  const optimalCount = systems.filter(([, s]) => s === "optimal").length;
  const flagCount = systems.filter(([, s]) => s !== "optimal").length;

  const handleExportPDF = async () => {
    const { downloadPDF } = await import("@/lib/generatePDF");
    await downloadPDF(form.nome || "utilizador", systems, results, {
      score: checkup.score,
      missing: checkup.missing.map((k) => ({ marker: LAB_UNIT_CONFIG[k].marker, why: WHY_MISSING[k] || "" })),
    });
  };

  return (
    <div className="min-h-screen bg-v2-paper">
      <NavbarV2 />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 text-center bg-v2-paper">
        <p className="label-uppercase text-v2-sage mb-4 tracking-widest text-xs">Autoavaliação</p>
        <h1 className="font-serif text-4xl md:text-5xl text-v2-ink leading-tight max-w-3xl mx-auto">
          Os teus exames estão normais.<br />O teu corpo não.
        </h1>
        <p className="mt-6 text-v2-ink-mute max-w-2xl mx-auto text-base font-sans leading-relaxed">
          Esta autoavaliação é educativa. Ajuda-te a chegar à consulta, comigo ou com o teu médico, com perguntas estruturadas. Não substitui avaliação clínica.
        </p>
        <p className="mt-2 text-v2-ink-mute font-sans text-sm">
          Mais de 15 biomarcadores analisados em menos de 2 minutos.
        </p>
      </section>

      {/* Progress — numbered tabs */}
      <section className="px-6 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex items-end gap-0 overflow-x-auto pb-0 mb-3">
            {STEP_TITLES.slice(0, 6).map((title, i) => {
              const isActive = i === step;
              const isPast = i < step;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { if (isPast) { setError(null); setStep(i); } }}
                  className={`flex-1 min-w-0 flex flex-col items-center gap-1 pb-2 border-b-2 transition-all ${
                    isActive
                      ? "border-v2-sage"
                      : isPast
                        ? "border-transparent cursor-pointer hover:border-v2-sage/30"
                        : "border-transparent cursor-default"
                  }`}
                >
                  <span className={`font-sans text-sm font-medium transition-colors ${
                    isActive ? "text-v2-sage" : isPast ? "text-v2-ink/60" : "text-v2-ink-mute/40"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`hidden md:block label-uppercase text-[10px] transition-colors ${
                    isActive ? "text-v2-sage" : isPast ? "text-v2-ink/50" : "text-v2-ink-mute/30"
                  }`}>
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Linear progress bar */}
          <div className="h-[2px] bg-v2-paper-deep rounded-full overflow-hidden">
            <div className="h-full bg-v2-sage rounded-full transition-all duration-500 ease-out" style={{ width: `${((step + 1) / 9) * 100}%` }} />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-20">
        <div className="max-w-[640px] mx-auto">
          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-lg px-4 py-3 mb-6 text-sm font-sans">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Step 0: Objectives */}
          {step === 0 && (
            <div className="space-y-8">
              <h2 className="font-serif text-3xl text-v2-ink">Quais são os teus principais objetivos?</h2>
              <p className="text-sm text-v2-ink-mute font-sans">Seleciona todos os que se aplicam.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => toggleObjective(obj)}
                    className={`h-[52px] px-4 rounded text-sm font-sans transition-all duration-200 border text-center ${
                      form.objetivos.includes(obj)
                        ? "bg-v2-moss text-white border-v2-moss"
                        : "bg-transparent text-v2-ink border-v2-sage/40 hover:border-v2-sage"
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="font-serif text-3xl text-v2-ink">Perfil básico</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-sans text-v2-ink-mute mb-3 block">Sexo biológico</label>
                  <div className="grid grid-cols-2 gap-3 max-w-xs">
                    {["Feminino", "Masculino"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, sexo: s }))}
                        className={`h-[52px] px-6 rounded text-sm font-sans transition-all border text-center ${
                          form.sexo === s
                            ? "bg-v2-moss text-white border-v2-moss"
                            : "bg-transparent text-v2-ink border-v2-sage/40 hover:border-v2-sage"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-sans text-v2-ink-mute mb-1 block">Idade (opcional)</label>
                  <Input
                    type="number"
                    min={18}
                    max={80}
                    value={form.idade}
                    onChange={(e) => setForm((prev) => ({ ...prev, idade: e.target.value }))}
                    placeholder="Ex: 38"
                    className="bg-transparent border-v2-sage/40 focus:border-v2-sage max-w-[120px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: CAPTURA — nome, email, consentimento RGPD */}
          {step === 2 && (
            <div className="space-y-8 max-w-md mx-auto">
              <div className="text-center">
                <h2 className="font-serif text-3xl text-v2-ink">Onde enviamos o teu relatório?</h2>
                <p className="text-sm text-v2-ink-mute font-sans mt-2">
                  No fim recebes o score do teu check-up, a leitura funcional dos valores que tiveres e a lista do que ainda falta medir, em PDF, no teu email.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-sans text-v2-ink-mute mb-1 block">Nome</label>
                  <Input
                    value={form.nome}
                    onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
                    placeholder="Nome completo"
                    className="bg-transparent border-v2-sage/30 focus:border-v2-sage"
                  />
                </div>
                <div>
                  <label className="text-sm font-sans text-v2-ink-mute mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                    className="bg-transparent border-v2-sage/30 focus:border-v2-sage"
                  />
                </div>
                <label className="flex items-start gap-3 text-xs text-v2-ink-mute font-sans leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consentimento}
                    onChange={(e) => setForm((prev) => ({ ...prev, consentimento: e.target.checked }))}
                    className="mt-0.5 accent-v2-sage"
                  />
                  <span>
                    Autorizo o tratamento dos dados que introduzir neste questionário, incluindo valores de análises (dados de saúde), para gerar o meu relatório educativo e receber a comunicação associada. Posso retirar o consentimento a qualquer momento.{" "}
                    <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-v2-ink">Política de Privacidade</a>.
                  </span>
                </label>
                <p className="text-xs text-v2-ink-mute font-sans text-center">Sem spam. Apenas a tua leitura.</p>
              </div>
            </div>
          )}

          {/* Step 3: ANÁLISES COMUNS — o que quase toda a gente tem */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-v2-ink">As tuas análises</h2>
                <p className="text-sm text-v2-ink-mute font-sans mt-2">
                  Preenche os valores que tens à mão. Não tens análises? Segue em frente: o teu relatório mostra exatamente o que vale a pena medir.
                </p>
                <p className="text-xs text-v2-ink-mute font-sans mt-1 italic">
                  Intervalos aplicáveis a mulheres adultas, não grávidas.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LabInput label="Hemoglobina" labKey="hemoglobina" value={form.labValues.hemoglobina || ""} unit={form.labUnits.hemoglobina || ""} onChange={(v) => updateLab("hemoglobina", v)} onUnitChange={(u) => updateUnit("hemoglobina", u)} placeholder="Ex: 13.8" />
                <LabInput label="Ferritina" labKey="ferritina" value={form.labValues.ferritina || ""} unit={form.labUnits.ferritina || ""} onChange={(v) => updateLab("ferritina", v)} onUnitChange={(u) => updateUnit("ferritina", u)} placeholder="Ex: 45" />
                <LabInput label="TSH" labKey="tsh" value={form.labValues.tsh || ""} unit={form.labUnits.tsh || ""} onChange={(v) => updateLab("tsh", v)} onUnitChange={(u) => updateUnit("tsh", u)} placeholder="Ex: 2.5" />
                <LabInput label="Vitamina B12" labKey="vitamina_b12" value={form.labValues.vitamina_b12 || ""} unit={form.labUnits.vitamina_b12 || ""} onChange={(v) => updateLab("vitamina_b12", v)} onUnitChange={(u) => updateUnit("vitamina_b12", u)} placeholder="Ex: 400" />
                <LabInput label="Ácido Fólico" labKey="acido_folico" value={form.labValues.acido_folico || ""} unit={form.labUnits.acido_folico || ""} onChange={(v) => updateLab("acido_folico", v)} onUnitChange={(u) => updateUnit("acido_folico", u)} placeholder="Ex: 8" />
                <LabInput label="Vitamina D" labKey="vitamina_d" value={form.labValues.vitamina_d || ""} unit={form.labUnits.vitamina_d || ""} onChange={(v) => updateLab("vitamina_d", v)} onUnitChange={(u) => updateUnit("vitamina_d", u)} placeholder="Ex: 35" />
                <LabInput label="PCR (Proteína C-Reactiva)" labKey="pcr" value={form.labValues.pcr || ""} unit={form.labUnits.pcr || ""} onChange={(v) => updateLab("pcr", v)} onUnitChange={(u) => updateUnit("pcr", u)} placeholder="Ex: 0.5" />
                <LabInput label="Glicose em jejum" labKey="glicose" value={form.labValues.glicose || ""} unit={form.labUnits.glicose || ""} onChange={(v) => updateLab("glicose", v)} onUnitChange={(u) => updateUnit("glicose", u)} placeholder="Ex: 88" />
                <LabInput label="Insulina em jejum" labKey="insulina" value={form.labValues.insulina || ""} unit={form.labUnits.insulina || ""} onChange={(v) => updateLab("insulina", v)} onUnitChange={(u) => updateUnit("insulina", u)} placeholder="Ex: 6" />
              </div>
            </div>
          )}

          {/* Step 4: TENS MAIS VALORES? — marcadores menos comuns */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-v2-ink">Tens mais valores?</h2>
                <p className="text-sm text-v2-ink-mute font-sans mt-2">
                  Estes marcadores são menos comuns nas análises de rotina. Se não os tens, é normal, e é exatamente isso que o teu score vai mostrar.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LabInput label="T3 Livre" labKey="t3_livre" value={form.labValues.t3_livre || ""} unit={form.labUnits.t3_livre || ""} onChange={(v) => updateLab("t3_livre", v)} onUnitChange={(u) => updateUnit("t3_livre", u)} placeholder="Ex: 3.1" />
                <LabInput label="T4 Livre" labKey="t4_livre" value={form.labValues.t4_livre || ""} unit={form.labUnits.t4_livre || ""} onChange={(v) => updateLab("t4_livre", v)} onUnitChange={(u) => updateUnit("t4_livre", u)} placeholder="Ex: 1.2" />
                <LabInput label="Ferro Sérico" labKey="ferro_serico" value={form.labValues.ferro_serico || ""} unit={form.labUnits.ferro_serico || ""} onChange={(v) => updateLab("ferro_serico", v)} onUnitChange={(u) => updateUnit("ferro_serico", u)} placeholder="Ex: 80" />
                <LabInput label="Transferrina" labKey="transferrina" value={form.labValues.transferrina || ""} unit={form.labUnits.transferrina || ""} onChange={(v) => updateLab("transferrina", v)} onUnitChange={(u) => updateUnit("transferrina", u)} placeholder="Ex: 250" />
                <LabInput label="VS (Velocidade de Sedimentação)" labKey="vsg" value={form.labValues.vsg || ""} unit={form.labUnits.vsg || ""} onChange={(v) => updateLab("vsg", v)} onUnitChange={(u) => updateUnit("vsg", u)} placeholder="Ex: 10" />
                <LabInput label="Homocisteína" labKey="homocisteina" value={form.labValues.homocisteina || ""} unit={form.labUnits.homocisteina || ""} onChange={(v) => updateLab("homocisteina", v)} onUnitChange={(u) => updateUnit("homocisteina", u)} placeholder="Ex: 8" />
                <LabInput label="Cortisol (manhã)" labKey="cortisol" value={form.labValues.cortisol || ""} unit={form.labUnits.cortisol || ""} onChange={(v) => updateLab("cortisol", v)} onUnitChange={(u) => updateUnit("cortisol", u)} placeholder="Ex: 15" />
                <LabInput label="DHEA-S" labKey="dhea" value={form.labValues.dhea || ""} unit={form.labUnits.dhea || ""} onChange={(v) => updateLab("dhea", v)} onUnitChange={(u) => updateUnit("dhea", u)} placeholder="Ex: 200" />
              </div>
            </div>
          )}

          {/* Step 5: SCORE DO CHECK-UP — pré-resultado */}
          {step === 5 && (
            <div className="space-y-8">
              <div className="bg-v2-paper rounded-2xl p-8 border border-v2-paper-line space-y-6">
                <div className="text-center space-y-3">
                  <p className="text-xs font-sans uppercase tracking-widest text-v2-sage">O score do teu check-up</p>
                  <p className="font-serif text-6xl text-v2-ink leading-none">
                    {checkup.score}<span className="text-2xl text-v2-ink-mute">/100</span>
                  </p>
                  <p className="text-sm text-v2-ink-mute font-sans max-w-[46ch] mx-auto leading-relaxed">
                    Este número não avalia a tua saúde. Mede quanto as análises que tens conseguem ver dos sistemas relevantes para os teus objetivos.
                  </p>
                </div>
                <div className="space-y-2">
                  {checkup.categorias.map((c) => (
                    <div key={c.nome} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-v2-paper/60 border border-v2-paper-line">
                      <span className="text-sm font-sans text-v2-ink">{c.nome}</span>
                      <span className={`text-xs font-sans px-2 py-0.5 rounded-full ${
                        c.cobertos === c.total ? "bg-green-100 text-green-800" :
                        c.cobertos > 0 ? "bg-amber-100 text-amber-800" :
                        "bg-v2-paper-deep text-v2-ink-mute"
                      }`}>
                        {c.cobertos === c.total ? "Coberto" : c.cobertos > 0 ? `Parcial (${c.cobertos}/${c.total})` : "Sem dados"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                <Button variant="hero" size="lg" className="w-full" onClick={goNext} disabled={saving}>
                  {saving ? "A preparar o teu relatório..." : "Ver o relatório completo →"}
                </Button>
                <p className="text-xs text-v2-ink-mute font-sans text-center">
                  Recebes também o PDF em {form.email || "no teu email"}.
                </p>
              </div>
            </div>
          )}

          {/* Step 6: RESULTADO COMPLETO */}
          {step === 6 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-v2-golden/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-v2-golden" />
                </div>
                <h2 className="font-serif text-3xl text-v2-ink">A tua leitura, para levares à consulta.</h2>
                <p className="text-v2-ink-mute font-sans mt-2">Análise baseada em intervalos funcionais, não apenas de referência.</p>
              </div>

              {/* Score do check-up */}
              <div className="flex items-center justify-center gap-4 bg-v2-paper border border-v2-paper-line rounded-2xl px-6 py-4 max-w-md mx-auto">
                <p className="font-serif text-4xl text-v2-ink leading-none">{checkup.score}<span className="text-base text-v2-ink-mute">/100</span></p>
                <p className="text-xs text-v2-ink-mute font-sans leading-relaxed">
                  Score do teu check-up: quanto as tuas análises conseguem ver dos sistemas relevantes para os teus objetivos.
                </p>
              </div>

              {!hasAnyLabValue ? (
                <div className="space-y-6">
                  <div className="bg-v2-paper border border-v2-paper-line rounded-2xl p-8 md:p-10 space-y-5">
                    <p className="label-uppercase text-v2-sage tracking-widest text-xs">Resultado Preliminar</p>
                    <p className="text-v2-ink/85 font-sans text-base leading-relaxed">
                      Com base na tua idade e objetivos, o teu perfil é semelhante ao de muitas mulheres que procuram apoio por sintomas como:
                    </p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "Fadiga persistente",
                        "Dificuldade em perder peso",
                        "Alterações hormonais",
                        "Mudanças associadas à perimenopausa",
                        "Quebra de energia e metabolismo",
                      ].map((sintoma) => (
                        <li key={sintoma} className="flex items-start gap-3 font-sans text-v2-ink/85">
                          <span className="text-v2-sage mt-1 leading-none">◆</span>
                          <span>{sintoma}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-v2-ink/85 font-sans text-base leading-relaxed pt-2">
                      Mesmo sem análises laboratoriais, estes padrões já justificam uma investigação mais aprofundada.
                    </p>
                    <p className="text-v2-ink-mute font-sans text-sm leading-relaxed">
                      Nos próximos dias vais receber orientações para perceber melhor quais os fatores que podem estar por trás destes sintomas e quais os exames que vale a pena considerar.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
                    <p className="text-sm font-sans text-v2-ink leading-relaxed">
                      Se preferes ir directamente para uma avaliação clínica completa, onde cruzamos sintomas, história e exames, podes agendar a consulta inicial.
                    </p>
                    <Button variant="hero" size="sm" onClick={() => { track("marcar_consulta", { origem: "avaliacao-sem-analises" }); setAcuityOpen(true); }}>
                      Agendar consulta inicial →
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Detailed biomarker results */}
                  <div className="space-y-3">
                    {results.map((r, i) => {
                      const refs = BIOMARKER_REFERENCES[r.marker] || [];
                      return (
                      <div key={i} className={`rounded-xl p-5 border ${
                        r.status === "optimal" ? "bg-green-50 border-green-200" :
                        r.status === "suboptimal" ? "bg-amber-50 border-amber-200" :
                        r.status === "info" ? "bg-v2-paper border-v2-paper-line" :
                        "bg-red-50 border-red-200"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-sans font-bold">
                              {r.status === "optimal" ? "\u25CF" : r.status === "suboptimal" ? "\u26A0" : r.status === "info" ? "\u00B7" : "\u2193"}
                            </span>
                            <span className="font-sans font-medium text-v2-ink text-sm">{r.marker}</span>
                          </div>
                          <span className={`text-xs font-sans px-2 py-0.5 rounded-full ${
                            r.status === "optimal" ? "bg-green-100 text-green-800" :
                            r.status === "suboptimal" ? "bg-amber-100 text-amber-800" :
                            r.status === "info" ? "bg-v2-paper-deep text-v2-ink-mute" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {r.status === "optimal" ? "Funcional" : r.status === "suboptimal" ? "Sub-óptimo" : r.status === "info" ? "Registado" : "Atenção"}
                          </span>
                        </div>
                        <p className="text-xs text-v2-ink-mute font-sans">
                          {r.value} {r.unit}
                          {r.implausible && <span className="text-v2-golden"> · valor invulgar para a unidade seleccionada</span>}
                        </p>
                        {FUNCTIONAL_RANGES[r.marker] && (
                          <p className="text-xs text-v2-ink-mute font-sans mt-0.5 italic">{FUNCTIONAL_RANGES[r.marker]}</p>
                        )}
                        <p className="text-sm text-v2-ink/80 font-sans mt-1">{r.note}</p>
                        {refs.length > 0 && <BiomarkerRefs refs={refs} />}
                        {r.marker === "Ferritina" && (
                          <a href="/ferritina-baixa-sintomas" className="inline-block text-v2-golden font-sans text-xs hover:underline mt-2">
                            Saber mais sobre ferritina →
                          </a>
                        )}
                      </div>
                      );
                    })}
                  </div>

                  {/* System explanations as accordions */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-v2-ink mb-3">Saber mais sobre cada sistema</h3>
                    {systems.map(([name]) => (
                      SYSTEM_EXPLANATIONS[name] && (
                        <Accordion key={name} title={name}>
                          {SYSTEM_EXPLANATIONS[name]}
                        </Accordion>
                      )
                    ))}
                  </div>

                  {/* Post-generation summary */}
                  {flagCount > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
                      <p className="text-sm font-sans text-v2-ink leading-relaxed">
                        Encontrámos <strong>{flagCount}</strong> biomarcador{flagCount > 1 ? "es" : ""} fora do intervalo funcional. Estes padrões podem associar-se a sintomas como fadiga, alterações hormonais ou dificuldade de recuperação. Uma consulta clínica permite interpretar estes padrões no seu contexto individual.
                      </p>
                      <Button variant="hero" size="sm" onClick={() => { track("marcar_consulta", { origem: "avaliacao-com-flags" }); setAcuityOpen(true); }}>
                        Agendar consulta inicial →
                      </Button>
                    </div>
                  )}

                  {/* PDF Export */}
                  <div className="flex justify-center pt-2">
                    <Button variant="outline" size="lg" onClick={handleExportPDF} className="gap-2">
                      <Download className="w-4 h-4" />
                      Exportar relatório (PDF)
                    </Button>
                  </div>
                </>
              )}

              {/* O teu próximo painel — análises em falta para os objetivos marcados */}
              {checkup.missing.length > 0 && (
                <div className="bg-v2-paper border border-v2-paper-line rounded-2xl p-8 space-y-4">
                  <p className="text-xs font-sans uppercase tracking-widest text-v2-sage">O teu próximo painel</p>
                  <p className="text-sm font-sans text-v2-ink/85 leading-relaxed">
                    Para os objetivos que marcaste, estas são as análises que ainda faltam ao teu check-up. Leva esta lista à próxima consulta: é o teu médico quem avalia e prescreve.
                  </p>
                  <ul className="space-y-3">
                    {checkup.missing.map((k) => (
                      <li key={k} className="flex items-start gap-3">
                        <span className="text-v2-golden mt-1 leading-none">◆</span>
                        <div>
                          <p className="text-sm font-sans font-medium text-v2-ink">{LAB_UNIT_CONFIG[k].marker}</p>
                          {WHY_MISSING[k] && <p className="text-xs font-sans text-v2-ink-mute leading-relaxed">{WHY_MISSING[k]}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-v2-paper-deep rounded-xl p-6 text-center space-y-4">
                <p className="text-sm font-sans text-v2-ink/85 leading-relaxed max-w-[60ch] mx-auto">
                  Para além dos intervalos de referência laboratoriais, vale a pena olhar para intervalos funcionais, uma leitura complementar descrita na literatura científica internacional. Não substitui a interpretação clínica do médico.
                </p>
                <p className="text-xs text-v2-ink-mute font-sans">
                  Esta autoavaliação é uma ferramenta educativa. Para diagnóstico, interpretação clínica de análises, prescrição ou tratamento médico, consulta o teu médico. Se quiseres acompanhamento de medicina funcional integrativa em complemento, podes marcar uma consulta comigo.
                </p>
              </div>

              {/* Next step button */}
              <div className="flex justify-center pt-4">
                <Button variant="hero" size="lg" onClick={() => setStep(7)}>
                  Ver próximos passos →
                </Button>
              </div>
            </div>
          )}

          {/* Step 7: CONFIRMAÇÃO — Dark CTA */}
          {step === 7 && (
            <div className="bg-v2-moss rounded-2xl p-10 md:p-14 text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-v2-paper italic leading-tight">
                Os teus exames contam uma história.<br />Queres ouvi-la?
              </h2>
              <p className="text-v2-paper/70 font-sans text-sm max-w-md mx-auto leading-relaxed">
                Se identificaste padrões nos teus biomarcadores, o próximo passo é uma avaliação funcional personalizada com a nossa equipa clínica.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="/candidatura">Quero investigar as causas</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-ivory/30 text-v2-paper hover:bg-v2-paper/10"
                >
                  <a href="/consulta-inicial">Conhecer a consulta inicial</a>
                </Button>
              </div>
            </div>
          )}

          {/* Navigation buttons (steps 0–4 only, step 5 has botão próprio) */}
          {step < 5 && (
            <div className="flex justify-between pt-8">
              {step > 0 ? (
                <Button variant="outline" onClick={goBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
                </Button>
              ) : <div />}
              <Button variant="eclipse" onClick={goNext}>
                Continuar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <AcuityModal open={acuityOpen} onClose={() => setAcuityOpen(false)} />
      <FooterV2 />
    </div>
  );
};

export default Avaliacao;
