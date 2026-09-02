import jsPDF from "jspdf";
import "jspdf-autotable";

const IVORY = "#F8F5F0";
const AMBER = "#9B7B5A";
const AMBER_LIGHT = "#B89B7A";
const DARK = "#1F1A14";
const MUTED = "#8C8279";
const BONE = "#E8E2DA";
const WHITE = "#ffffff";

const PAGE_DISCLAIMER =
  "Leitura educativa baseada em intervalos funcionais. Não constitui diagnóstico médico.";

const COVER_DISCLAIMER =
  "Este relatório apresenta uma leitura educativa baseada em intervalos funcionais descritos na literatura científica. Não constitui diagnóstico médico nem substitui avaliação clínica individual.";

const FUNCTIONAL_RANGES_DATA: Record<string, { min: string; max: string; unit: string }> = {
  Hemoglobina: { min: "13.5", max: "14.5", unit: "g/dL" },
  "Glicose em jejum": { min: "75", max: "86", unit: "mg/dL" },
  "Insulina em jejum": { min: "2", max: "5", unit: "µUI/mL" },
  TSH: { min: "1.0", max: "2.0", unit: "mUI/L" },
  "T3 Livre": { min: "3.0", max: "3.5", unit: "pg/mL" },
  "T4 Livre": { min: "1.0", max: "1.5", unit: "ng/dL" },
  Ferritina: { min: "30", max: "100", unit: "ng/mL" },
  "Ferro Sérico": { min: "85", max: "130", unit: "µg/dL" },
  "Saturação de Transferrina": { min: "24", max: "35", unit: "%" },
  PCR: { min: "0", max: "1.0", unit: "mg/L" },
  VS: { min: "0", max: "10", unit: "mm/h" },
  "Vitamina D": { min: "50", max: "90", unit: "ng/mL" },
  "Vitamina B12": { min: "545", max: "1100", unit: "pg/mL" },
  "Ácido Fólico": { min: "15", max: "27", unit: "ng/mL" },
  "Homocisteína": { min: "0", max: "7", unit: "µmol/L" },
  "Cortisol (manhã)": { min: "10", max: "15", unit: "µg/dL" },
  "DHEA-S": { min: "275", max: "390", unit: "µg/dL" },
};

const SYSTEM_EXPLANATIONS_PDF: Record<string, string> = {
  "Tiróide": "A tiróide regula o metabolismo, energia e temperatura corporal. Valores sub-óptimos de TSH, T3 ou T4 podem explicar fadiga, ganho de peso e dificuldade de concentração, mesmo quando estão dentro do 'normal' laboratorial.",
  "Ferro e Energia": "O ferro é essencial para o transporte de oxigénio e produção de energia celular. Ferritina funcionalmente baixa (< 40 ng/mL) é uma das causas mais comuns de fadiga crónica, queda de cabelo e intolerância ao frio.",
  "Inflamação": "A inflamação crónica de baixo grau está na base de muitas patologias modernas. PCR elevada e homocisteína alta são sinais precoces que o corpo está sob stress, antes de qualquer diagnóstico convencional.",
  "Metabolismo": "Vitamina D e B12 são cofactores essenciais para centenas de reações metabólicas, desde a imunidade à saúde neurológica. Níveis 'normais' podem ser insuficientes para um funcionamento óptimo.",
  "Eixo HPA": "O eixo hipotálamo-hipófise-adrenal regula a resposta ao stress. Cortisol desregulado pode causar insónia, ansiedade, fadiga matinal e dificuldade de recuperação.",
};

const BIOMARKER_INTERPRETATIONS: Record<string, Record<string, string>> = {
  Hemoglobina: {
    low: "A hemoglobina transporta o oxigénio. Valores abaixo do intervalo funcional, mesmo sem anemia laboratorial, podem associar-se a fadiga e menor tolerância ao esforço. Interpretar em conjunto com a ferritina e o painel de ferro.",
    high: "Hemoglobina acima do intervalo funcional pode ter várias causas, da desidratação a condições que merecem avaliação. Interpretar em contexto clínico.",
  },
  "Glicose em jejum": {
    high: "A glicose em jejum reflecte a regulação do metabolismo dos hidratos de carbono. Valores no limite superior do 'normal' podem indicar redução da sensibilidade à insulina antes de qualquer critério formal. Interpretar em conjunto com a insulina.",
    low: "Glicose em jejum baixa pode associar-se a padrões reactivos de energia. Interpretar em contexto.",
  },
  "Insulina em jejum": {
    high: "A insulina em jejum é um marcador precoce de resistência metabólica. Valores acima do óptimo funcional, mesmo com glicose normal, podem indicar compensação precoce, frequentemente associada a fadiga pós-refeição, dificuldade em perder peso e vontade de doces.",
  },
  TSH: {
    high: "O TSH regula a actividade da tiróide. Valores acima do intervalo funcional podem reflectir aumento do estímulo da hipófise para produzir hormonas tiroideias. Sintomas como fadiga, intolerância ao frio, dificuldade em perder peso ou queda de cabelo podem surgir antes de alterações evidentes nas hormonas tiroideias.",
    low: "TSH abaixo do intervalo funcional pode reflectir actividade tiroideia aumentada ou efeito de medicação tiroideia. A interpretação requer as hormonas tiroideias livres e contexto clínico.",
  },
  "T3 Livre": {
    low: "O T3 é a hormona tiroideia activa. Valores na metade inferior do intervalo podem associar-se a sintomas de hipofunção (fadiga, frio, lentidão cognitiva) mesmo com TSH normal, e podem reflectir conversão insuficiente de T4 em T3, um processo dependente de selénio.",
    high: "T3 livre acima do intervalo funcional pode reflectir actividade tiroideia aumentada. Interpretar com TSH, T4 livre e contexto clínico.",
  },
  "T4 Livre": {
    low: "O T4 é a hormona de reserva da tiróide. Valores abaixo do intervalo funcional podem reflectir produção tiroideia diminuída. Interpretar em conjunto com TSH e T3 livre.",
    high: "T4 livre acima do intervalo funcional pode reflectir actividade tiroideia aumentada ou dose de medicação a rever. Interpretar com TSH e T3 livre.",
  },
  Ferritina: {
    low: "A ferritina reflecte as reservas de ferro no organismo. Valores baixos podem associar-se a fadiga persistente, queda de cabelo, dificuldade de concentração e intolerância ao exercício. Em medicina funcional, reservas insuficientes podem coexistir com um hemograma dentro dos intervalos convencionais.",
    high: "A ferritina é também um reagente de fase aguda: valores elevados podem reflectir inflamação, e valores muito elevados podem indicar sobrecarga de ferro. A interpretação requer marcadores inflamatórios e contexto clínico.",
  },
  "Ferro Sérico": {
    low: "O ferro sérico reflecte o ferro em circulação. Valores abaixo do intervalo funcional, sobretudo com ferritina e saturação de transferrina baixas, sugerem disponibilidade de ferro insuficiente para a produção de energia e transporte de oxigénio.",
    high: "Ferro sérico elevado, sobretudo com saturação de transferrina alta, merece avaliação. O ferro sérico varia ao longo do dia; a interpretação requer o painel completo.",
  },
  "Saturação de Transferrina": {
    low: "A saturação de transferrina indica a percentagem da capacidade de transporte de ferro que está ocupada. Valores baixos sugerem disponibilidade de ferro insuficiente, mesmo quando outros marcadores parecem aceitáveis.",
    high: "Saturação de transferrina elevada pode indicar excesso de ferro em circulação e merece avaliação clínica, sobretudo se persistente em mais de uma análise.",
  },
  "Vitamina D": {
    low: "A vitamina D actua como hormona em múltiplos sistemas. Valores baixos associam-se a fadiga, maior susceptibilidade a infecções, alterações do humor e disfunção imune. A maioria da população europeia apresenta défice funcional, especialmente nos meses de inverno.",
    high: "Vitamina D acima do intervalo funcional é habitualmente resultado de suplementação. Vale a pena rever a dose com quem a acompanha.",
  },
  "Vitamina B12": {
    low: "A vitamina B12 é essencial para função neurológica, produção de glóbulos vermelhos e metabolismo energético. Valores baixo-normais podem associar-se a fadiga, nevoeiro mental, formigueiros e alterações do humor, mesmo sem anemia manifesta.",
    high: "B12 acima do intervalo funcional é habitualmente resultado de suplementação recente. Interpretar com o contexto.",
  },
  "Ácido Fólico": {
    low: "O folato participa na metilação e na produção de glóbulos vermelhos, em conjunto com a B12. Valores abaixo do intervalo funcional podem associar-se a homocisteína elevada e a fadiga. Interpretar sempre em conjunto com a B12.",
    high: "Folato elevado com B12 baixa merece atenção: pode mascarar um défice de B12. Interpretar os dois em conjunto.",
  },
  PCR: {
    high: "A proteína C reactiva é um marcador de inflamação sistémica. Valores elevados, mesmo dentro do intervalo laboratorial, podem indicar inflamação crónica de baixo grau associada a risco cardiovascular, resistência à insulina e disfunção imune.",
  },
  VS: {
    high: "A velocidade de sedimentação é um marcador inespecífico de inflamação. Valores acima do intervalo funcional, sobretudo com PCR também elevada, sugerem um processo inflamatório a investigar.",
  },
  "Homocisteína": {
    high: "A homocisteína é um aminoácido cujos níveis elevados se associam a risco cardiovascular, disfunção cognitiva e défice de vitaminas do complexo B. É sensível ao estado nutricional e ao metabolismo do folato e B12.",
  },
  "Cortisol (manhã)": {
    high: "O cortisol matinal elevado pode reflectir activação crónica do eixo HPA, associada a stress prolongado, insónia, ansiedade e resistência à insulina. Valores persistentemente altos merecem avaliação do padrão circadiano completo.",
    low: "Cortisol matinal baixo pode indicar hipofunção do eixo do stress, associada a exaustão, dificuldade em acordar, hipotensão e baixa tolerância ao stress. Este padrão surge frequentemente após períodos prolongados de stress crónico.",
  },
  "DHEA-S": {
    low: "A DHEA-S é a hormona adrenal mais abundante e declina naturalmente com a idade. Valores abaixo do intervalo funcional podem associar-se a fadiga, perda de resiliência ao stress e, após a menopausa, menor produção de estrogénios de origem adrenal.",
    high: "DHEA-S acima do intervalo funcional merece interpretação clínica, sobretudo se houver suplementação ou sintomas androgénicos.",
  },
};

const OPTIMAL_TEXT = "Valor dentro do intervalo funcional. A interpretação clínica completa considera este resultado em conjunto com sintomas e outros biomarcadores.";

interface Finding {
  marker: string;
  value: string;
  unit?: string;
  status: "optimal" | "suboptimal" | "flag" | "info";
  direction?: "low" | "high";
  note: string;
  implausible?: boolean;
}

// Convert logo to base64 for PDF embedding
let logoBase64Cache: string | null = null;

async function getLogoBase64(): Promise<string> {
  if (logoBase64Cache) return logoBase64Cache;
  try {
    const { default: logoUrl } = await import("@/assets/logo-full.png");
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        logoBase64Cache = reader.result as string;
        resolve(logoBase64Cache);
      };
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

function addPageBg(doc: jsPDF) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFillColor(IVORY);
  doc.rect(0, 0, pageW, pageH, "F");
}

function addAmberLine(doc: jsPDF, x: number, y: number, width: number) {
  doc.setDrawColor(AMBER);
  doc.setLineWidth(1.5);
  doc.line(x, y, x + width, y);
}

function addSectionTitle(doc: jsPDF, title: string, y: number): number {
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFontSize(22);
  doc.setTextColor(DARK);
  doc.text(title, 50, y);
  addAmberLine(doc, 50, y + 8, 60);
  doc.setDrawColor(BONE);
  doc.setLineWidth(0.5);
  doc.line(50, y + 14, pageW - 50, y + 14);
  return y + 36;
}

function addPageFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  doc.setDrawColor(BONE);
  doc.setLineWidth(0.5);
  doc.line(50, pageH - 35, pageW - 50, pageH - 35);

  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.setFont("helvetica", "italic");
  doc.text(PAGE_DISCLAIMER, 50, pageH - 24);
  doc.setFont("helvetica", "normal");

  doc.setFontSize(8);
  doc.setTextColor(AMBER_LIGHT);
  doc.text(`${pageNum} / ${totalPages}`, pageW - 50, pageH - 15, { align: "right" });
}

function statusWord(status: string, direction?: string): string {
  if (status === "optimal") return "Dentro do intervalo funcional";
  if (status === "info") return "Registado";
  const dir = direction === "high" ? "acima" : direction === "low" ? "abaixo" : "fora";
  if (status === "suboptimal") return `Sub-óptimo (${dir} do intervalo funcional)`;
  return `Atenção (${dir} do intervalo de referência)`;
}

function statusColor(status: string): string {
  if (status === "optimal") return "#5E6D41";
  if (status === "info") return MUTED;
  if (status === "suboptimal") return AMBER;
  return "#A04A2B";
}

function getInterpretation(marker: string, status: string, direction?: string): string {
  if (status === "optimal") return OPTIMAL_TEXT;
  if (status === "info") return "";
  const interp = BIOMARKER_INTERPRETATIONS[marker];
  const generic = "Valor fora do intervalo funcional. A interpretação clínica completa requer avaliação individualizada.";
  if (!interp) return generic;
  if (direction === "high") return interp.high || generic;
  if (direction === "low") return interp.low || generic;
  return interp.high || interp.low || generic;
}

function systemStatusLabel(status: string): string {
  if (status === "optimal") return "Dentro do intervalo funcional";
  if (status === "suboptimal") return "Padrão a monitorizar";
  return "Padrão a investigar";
}

export interface ScoreInfo {
  score: number;
  missing: { marker: string; why: string }[];
}

export async function generateFunctionalPDF(
  name: string,
  systems: [string, "optimal" | "suboptimal" | "flag"][],
  results: Finding[],
  scoreInfo?: ScoreInfo
): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const today = new Date().toLocaleDateString("pt-PT");

  const logoData = await getLogoBase64();

  // ── PAGE 1: Header ──
  addPageBg(doc);
  doc.setFillColor(AMBER);
  doc.rect(0, 0, pageW, 4, "F");

  if (logoData) {
    try {
      doc.addImage(logoData, "PNG", (pageW - 180) / 2, 100, 180, 50);
    } catch { /* continue */ }
  }

  addAmberLine(doc, (pageW - 60) / 2, 170, 60);

  doc.setFontSize(32);
  doc.setTextColor(DARK);
  doc.text("Avaliação Funcional", pageW / 2, 260, { align: "center" });
  doc.text("de Biomarcadores", pageW / 2, 298, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(MUTED);
  doc.text("Relatório educativo automatizado", pageW / 2, 340, { align: "center" });

  // Info card
  const cardW = 280;
  const cardH = 90;
  const cardX = (pageW - cardW) / 2;
  const cardY = 390;
  doc.setFillColor(BONE);
  doc.roundedRect(cardX, cardY, cardW, cardH, 4, 4, "F");

  doc.setFontSize(12);
  doc.setTextColor(DARK);
  doc.text(name, pageW / 2, cardY + 24, { align: "center" });
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  doc.text(today, pageW / 2, cardY + 42, { align: "center" });
  doc.text(
    scoreInfo
      ? `Biomarcadores registados: ${results.length}   ·   Score do check-up: ${scoreInfo.score}/100`
      : `Biomarcadores registados: ${results.length}`,
    pageW / 2, cardY + 60, { align: "center" });

  // Cover disclaimer
  doc.setFontSize(9);
  doc.setTextColor(MUTED);
  doc.setFont("helvetica", "italic");
  const disclaimerLines = doc.splitTextToSize(COVER_DISCLAIMER, pageW - 120);
  doc.text(disclaimerLines, pageW / 2, cardY + 120, { align: "center" });
  doc.setFont("helvetica", "normal");

  doc.setFillColor(AMBER);
  doc.rect(0, pageH - 4, pageW, 4, "F");

  // ── PAGE 2: Systems summary ──
  doc.addPage();
  addPageBg(doc);
  doc.setFillColor(AMBER);
  doc.rect(0, 0, pageW, 4, "F");

  let y = addSectionTitle(doc, "Resumo por sistemas", 55);

  doc.setFontSize(11);
  systems.forEach(([sysName, status]) => {
    // Estimate block height
    const explanation = status !== "optimal" ? SYSTEM_EXPLANATIONS_PDF[sysName] || "" : "";
    const explLines = explanation ? doc.splitTextToSize(explanation, pageW - 140) : [];
    const blockHeight = 28 + (explLines.length > 0 ? explLines.length * 12 + 8 : 0);

    if (y + blockHeight > pageH - 60) {
      doc.addPage();
      addPageBg(doc);
      doc.setFillColor(AMBER);
      doc.rect(0, 0, pageW, 4, "F");
      y = 55;
    }

    // System status row with background
    doc.setFillColor(BONE);
    doc.roundedRect(45, y - 14, pageW - 90, blockHeight, 3, 3, "F");

    doc.setFontSize(11);
    doc.setFillColor(statusColor(status));
    doc.circle(56, y - 3, 3.2, "F");
    doc.setTextColor(DARK);
    doc.text(systemStatusLabel(status), 66, y);
    doc.setFontSize(10);
    doc.setTextColor(MUTED);
    doc.text(sysName, pageW - 60, y, { align: "right" });

    // System interpretation text
    if (explLines.length > 0 && status !== "optimal") {
      doc.setFontSize(9);
      doc.setTextColor(MUTED);
      doc.setFont("helvetica", "italic");
      doc.text(explLines, 70, y + 16);
      doc.setFont("helvetica", "normal");
    }

    y += blockHeight + 8;
  });

  if (systems.length === 0) {
    doc.setTextColor(MUTED);
    doc.text("Nenhum valor laboratorial introduzido.", 60, y);
  }


  // ── PAGE 3: Biomarkers detail ──
  doc.addPage();
  addPageBg(doc);
  doc.setFillColor(AMBER);
  doc.rect(0, 0, pageW, 4, "F");

  y = addSectionTitle(doc, "Biomarcadores introduzidos", 55);

  results.forEach((r, idx) => {
    // Estimate space needed
    const interpretation = r.status === "info" ? r.note : getInterpretation(r.marker, r.status, r.direction);
    const interpLines = doc.splitTextToSize(interpretation, pageW - 120);
    const range = FUNCTIONAL_RANGES_DATA[r.marker];
    const blockHeight = 24 + 14 + (range ? 14 : 0) + 14 + interpLines.length * 12 + 16;

    if (y + blockHeight > pageH - 60) {
      doc.addPage();
      addPageBg(doc);
      doc.setFillColor(AMBER);
      doc.rect(0, 0, pageW, 4, "F");
      y = 55;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(BONE);
      doc.roundedRect(45, y - 12, pageW - 90, blockHeight, 3, 3, "F");
    }

    doc.setFillColor(statusColor(r.status));
    doc.circle(64, y + 1, 3.2, "F");
    doc.setTextColor(DARK);
    doc.setFontSize(12);
    doc.text(r.marker, 74, y + 4);
    doc.setFontSize(8);
    doc.setTextColor(statusColor(r.status));
    doc.text(statusWord(r.status, r.direction), pageW - 60, y + 4, { align: "right" });

    doc.setFontSize(9);
    doc.setTextColor(MUTED);
    const valueDisplay = `Valor introduzido: ${r.value}${r.unit ? ` ${r.unit}` : ""}${r.implausible ? " (unidade a confirmar)" : ""}`;
    doc.text(valueDisplay, 80, y + 20);

    let lineY = y + 20;
    if (range) {
      lineY += 14;
      doc.setTextColor(AMBER);
      doc.text(`Intervalo funcional: ${range.min} - ${range.max} ${range.unit}`, 80, lineY);
    }

    lineY += 16;
    doc.setTextColor(DARK);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(r.status === "info" ? "Nota:" : "Interpretação teórica:", 80, lineY);
    doc.setFont("helvetica", "normal");
    lineY += 12;
    doc.setTextColor(MUTED);
    doc.text(interpLines, 80, lineY);

    y += blockHeight + 8;
  });


  // ── PAGE 4 (opcional): O teu próximo painel ──
  if (scoreInfo && scoreInfo.missing.length > 0) {
    doc.addPage();
    addPageBg(doc);
    doc.setFillColor(AMBER);
    doc.rect(0, 0, pageW, 4, "F");

    y = addSectionTitle(doc, "O teu próximo painel", 55);

    doc.setFontSize(10);
    doc.setTextColor(DARK);
    const introLines = doc.splitTextToSize(
      `O teu check-up está a ver ${scoreInfo.score}% do painel funcional relevante para os objetivos que marcaste. Estas são as análises que faltam. Leva esta lista à próxima consulta: é o teu médico quem avalia e prescreve.`,
      pageW - 100
    );
    doc.text(introLines, 50, y);
    y += introLines.length * 14 + 16;

    scoreInfo.missing.forEach((m) => {
      const whyLines = m.why ? doc.splitTextToSize(m.why, pageW - 140) : [];
      const blockHeight = 18 + whyLines.length * 12 + 10;
      if (y + blockHeight > pageH - 60) {
        doc.addPage();
        addPageBg(doc);
        doc.setFillColor(AMBER);
        doc.rect(0, 0, pageW, 4, "F");
        y = 55;
      }
      doc.setFillColor(AMBER);
      doc.circle(56, y - 3, 2.6, "F");
      doc.setFontSize(11);
      doc.setTextColor(DARK);
      doc.text(m.marker, 66, y);
      if (whyLines.length > 0) {
        doc.setFontSize(9);
        doc.setTextColor(MUTED);
        doc.text(whyLines, 66, y + 13);
      }
      y += blockHeight;
    });

  }

  // ── PAGE 4: Context + CTA ──
  doc.addPage();
  addPageBg(doc);
  doc.setFillColor(AMBER);
  doc.rect(0, 0, pageW, 4, "F");

  if (logoData) {
    try {
      doc.addImage(logoData, "PNG", (pageW - 140) / 2, 60, 140, 38);
    } catch { /* continue */ }
  }

  addAmberLine(doc, (pageW - 60) / 2, 115, 60);

  y = addSectionTitle(doc, "O que significa este relatório", 150);

  const contextText1 = "Este relatório identifica padrões possíveis, mas não permite determinar causas clínicas. Alterações laboratoriais podem resultar de estado nutricional, stress fisiológico, inflamação, alterações hormonais ou factores individuais.";
  const contextText2 = "Uma avaliação clínica completa considera história médica, sintomas, exames adicionais e contexto metabólico individual.";

  doc.setFontSize(11);
  doc.setTextColor(DARK);
  const ctxLines1 = doc.splitTextToSize(contextText1, pageW - 100);
  doc.text(ctxLines1, 50, y);
  y += ctxLines1.length * 16 + 12;

  const ctxLines2 = doc.splitTextToSize(contextText2, pageW - 100);
  doc.text(ctxLines2, 50, y);
  y += ctxLines2.length * 16 + 30;

  // Summary box
  const evaluated = results.filter((r) => r.status !== "info");
  const optimalCount = evaluated.filter((r) => r.status === "optimal").length;
  const outsideCount = evaluated.length - optimalCount;
  const infoCount = results.length - evaluated.length;

  const boxW = pageW - 100;
  const boxH = 80;
  const boxX = 50;
  doc.setFillColor(BONE);
  doc.roundedRect(boxX, y, boxW, boxH, 4, 4, "F");

  doc.setFontSize(11);
  doc.setTextColor(DARK);
  doc.text(`Biomarcadores avaliados: ${evaluated.length}`, boxX + 20, y + 24);
  doc.text(`Fora do intervalo funcional: ${outsideCount}`, boxX + 20, y + 42);
  doc.text(`Dentro do intervalo funcional: ${optimalCount}${infoCount > 0 ? `   ·   Registados sem avaliação automática: ${infoCount}` : ""}`, boxX + 20, y + 60);

  y += boxH + 30;

  // CTA button
  const btnW = 240;
  const btnH = 48;
  const btnX = (pageW - btnW) / 2;
  doc.setFillColor(AMBER);
  doc.roundedRect(btnX, y, btnW, btnH, 8, 8, "F");

  doc.setFontSize(13);
  doc.setTextColor(WHITE);
  doc.textWithLink("Agendar consulta inicial", pageW / 2, y + 30, {
    align: "center",
    url: "https://catarinaveigaagendamento.as.me/",
  });

  doc.setFontSize(9);
  doc.setTextColor(MUTED);
  doc.text("info@catarinaveiga.com  ·  catarinaveiga.com", pageW / 2, y + 70, { align: "center" });

  doc.setFillColor(AMBER);
  doc.rect(0, pageH - 4, pageW, 4, "F");


  // Footers desenhados no fim, com o número real de páginas (o conteúdo
  // pode transbordar e criar páginas extra).
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addPageFooter(doc, i, pageCount);
  }

  return doc;
}

export async function generatePDFBase64(
  name: string,
  systems: [string, "optimal" | "suboptimal" | "flag"][],
  results: Finding[],
  scoreInfo?: ScoreInfo
): Promise<string> {
  const doc = await generateFunctionalPDF(name, systems, results, scoreInfo);
  return doc.output("datauristring").split(",")[1];
}

export async function downloadPDF(
  name: string,
  systems: [string, "optimal" | "suboptimal" | "flag"][],
  results: Finding[],
  scoreInfo?: ScoreInfo
) {
  const doc = await generateFunctionalPDF(name, systems, results, scoreInfo);
  const date = new Date().toISOString().slice(0, 10);
  const safeName = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  doc.save(`leitura-funcional-${safeName}-${date}.pdf`);
}
