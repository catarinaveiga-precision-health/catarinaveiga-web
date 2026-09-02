// Configuração de unidades laboratoriais e intervalos de plausibilidade.
// Cada marcador do formulário tem uma lista de unidades disponíveis,
// uma unidade pré-seleccionada e (quando aplicável) um intervalo plausível
// que serve apenas para alertar o utilizador de valores improváveis para
// a unidade escolhida — nunca bloqueia a submissão.

export interface UnitOption {
  value: string;
  label: string;
}

export interface MarkerUnitConfig {
  /** Nome legível do marcador (usado em emails/PDF). */
  marker: string;
  /** Unidades disponíveis no dropdown, na ordem desejada. */
  units: UnitOption[];
  /** Unidade pré-seleccionada. Vazio = sem default. */
  defaultUnit: string;
  /** Intervalos plausíveis [min, max] por unidade (apenas alerta visual). */
  plausibleRanges?: Record<string, [number, number]>;
}

// Chaves correspondentes a LabValues no formulário.
export type LabKey =
  | "hemoglobina"
  | "glicose"
  | "insulina"
  | "tsh"
  | "t3_livre"
  | "t4_livre"
  | "ferritina"
  | "ferro_serico"
  | "transferrina"
  | "pcr"
  | "homocisteina"
  | "vsg"
  | "vitamina_d"
  | "vitamina_b12"
  | "acido_folico"
  | "cortisol"
  | "dhea"
  | "estradiol";

export const LAB_UNIT_CONFIG: Record<LabKey, MarkerUnitConfig> = {
  hemoglobina: {
    marker: "Hemoglobina",
    units: [
      { value: "g/dL", label: "g/dL" },
      { value: "g/L", label: "g/L" },
    ],
    defaultUnit: "g/dL",
    plausibleRanges: {
      "g/dL": [4, 22],
      "g/L": [40, 220],
    },
  },
  glicose: {
    marker: "Glicose em jejum",
    units: [
      { value: "mg/dL", label: "mg/dL" },
      { value: "mmol/L", label: "mmol/L" },
    ],
    defaultUnit: "mg/dL",
    plausibleRanges: {
      "mg/dL": [40, 400],
      "mmol/L": [2.2, 22],
    },
  },
  insulina: {
    marker: "Insulina em jejum",
    units: [
      { value: "µUI/mL", label: "µUI/mL" },
      { value: "mUI/L", label: "mUI/L" },
    ],
    defaultUnit: "µUI/mL",
    plausibleRanges: {
      "µUI/mL": [0.5, 100],
      "mUI/L": [0.5, 100],
    },
  },
  tsh: {
    marker: "TSH",
    units: [
      { value: "mUI/L", label: "mUI/L" },
      { value: "µUI/mL", label: "µUI/mL" },
    ],
    defaultUnit: "mUI/L",
    plausibleRanges: {
      "mUI/L": [0.01, 100],
      "µUI/mL": [0.01, 100],
    },
  },
  t3_livre: {
    marker: "T3 Livre",
    units: [
      { value: "pg/mL", label: "pg/mL" },
      { value: "pmol/L", label: "pmol/L" },
    ],
    defaultUnit: "pg/mL",
    plausibleRanges: {
      "pg/mL": [1.0, 10.0],
      "pmol/L": [1.5, 15.0],
    },
  },
  t4_livre: {
    marker: "T4 Livre",
    units: [
      { value: "ng/dL", label: "ng/dL" },
      { value: "pmol/L", label: "pmol/L" },
    ],
    defaultUnit: "ng/dL",
    plausibleRanges: {
      "ng/dL": [0.3, 5.0],
      "pmol/L": [4.0, 65.0],
    },
  },
  ferritina: {
    marker: "Ferritina",
    units: [
      { value: "ng/mL", label: "ng/mL" },
      { value: "µg/L", label: "µg/L" },
    ],
    defaultUnit: "ng/mL",
    plausibleRanges: {
      "ng/mL": [1, 2000],
      "µg/L": [1, 2000],
    },
  },
  ferro_serico: {
    marker: "Ferro Sérico",
    units: [
      { value: "µg/dL", label: "µg/dL" },
      { value: "µmol/L", label: "µmol/L" },
    ],
    defaultUnit: "µg/dL",
    // TODO: confirmar intervalos de plausibilidade com a Catarina
  },
  transferrina: {
    marker: "Transferrina",
    units: [
      { value: "mg/dL", label: "mg/dL" },
      { value: "g/L", label: "g/L" },
    ],
    defaultUnit: "mg/dL",
    // TODO: confirmar intervalos de plausibilidade com a Catarina
  },
  pcr: {
    marker: "PCR",
    units: [
      { value: "mg/L", label: "mg/L" },
      { value: "mg/dL", label: "mg/dL" },
    ],
    defaultUnit: "mg/L",
    plausibleRanges: {
      "mg/L": [0.01, 300],
      // TODO: confirmar intervalo plausível para mg/dL
    },
  },
  homocisteina: {
    marker: "Homocisteína",
    units: [{ value: "µmol/L", label: "µmol/L" }],
    defaultUnit: "µmol/L",
    // TODO: confirmar intervalo plausível
  },
  vsg: {
    marker: "VS",
    units: [{ value: "mm/h", label: "mm/h" }],
    defaultUnit: "mm/h",
    // TODO: confirmar intervalo plausível
  },
  vitamina_d: {
    marker: "Vitamina D",
    units: [
      { value: "ng/mL", label: "ng/mL" },
      { value: "nmol/L", label: "nmol/L" },
    ],
    defaultUnit: "ng/mL",
    plausibleRanges: {
      "ng/mL": [3, 200],
      "nmol/L": [7, 500],
    },
  },
  vitamina_b12: {
    marker: "Vitamina B12",
    units: [
      { value: "pg/mL", label: "pg/mL" },
      { value: "pmol/L", label: "pmol/L" },
    ],
    defaultUnit: "pg/mL",
    // TODO: confirmar intervalos de plausibilidade
  },
  acido_folico: {
    marker: "Ácido Fólico",
    units: [
      { value: "ng/mL", label: "ng/mL" },
      { value: "nmol/L", label: "nmol/L" },
    ],
    defaultUnit: "ng/mL",
    // TODO: confirmar intervalos de plausibilidade
  },
  cortisol: {
    marker: "Cortisol (manhã)",
    units: [
      { value: "µg/dL", label: "µg/dL" },
      { value: "nmol/L", label: "nmol/L" },
    ],
    defaultUnit: "µg/dL",
    plausibleRanges: {
      "µg/dL": [1, 60],
      "nmol/L": [30, 1700],
    },
  },
  dhea: {
    marker: "DHEA-S",
    units: [
      { value: "µg/dL", label: "µg/dL" },
      { value: "µmol/L", label: "µmol/L" },
    ],
    defaultUnit: "µg/dL",
    // TODO: confirmar intervalos de plausibilidade
  },
  estradiol: {
    marker: "Estradiol",
    units: [
      { value: "pg/mL", label: "pg/mL" },
      { value: "pmol/L", label: "pmol/L" },
    ],
    defaultUnit: "pg/mL",
    plausibleRanges: {
      "pg/mL": [1, 5000],
      "pmol/L": [4, 18000],
    },
  },
};

/**
 * Verifica se um valor está fora do intervalo plausível para a unidade dada.
 * Retorna `false` se não houver intervalo definido (não há aviso a mostrar).
 */
export function isImplausible(key: LabKey, value: string, unit: string): boolean {
  const cfg = LAB_UNIT_CONFIG[key];
  if (!cfg?.plausibleRanges) return false;
  const range = cfg.plausibleRanges[unit];
  if (!range) return false;
  const num = parseFloat(value.replace(",", "."));
  if (Number.isNaN(num)) return false;
  return num < range[0] || num > range[1];
}

export function getDefaultUnit(key: LabKey): string {
  return LAB_UNIT_CONFIG[key]?.defaultUnit ?? "";
}
