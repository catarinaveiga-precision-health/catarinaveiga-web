import { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft, ChevronDown, Download, BookOpen } from "lucide-react";
import { BIOMARKER_REFERENCES } from "@/data/biomarkerReferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
// PDF helpers carregados via dynamic import nos pontos de uso (lazy chunk)
// para evitar 599 KB no bundle inicial.
import AcuityModal from "@/components/AcuityModal";
import { LAB_UNIT_CONFIG, LabKey, getDefaultUnit, isImplausible } from "@/lib/labUnits";

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
  "Tiróide",
  "Ferro",
  "Inflamação",
  "Metabolismo",
  "Pré-resultado",
  "Relatório",
  "Próximos passos",
];

// Step icons removed — using numbered tabs instead

const SYSTEM_LABELS: Record<string, string> = {
  TSH: "Tiróide",
  "T3 Livre": "Tiróide",
  "T4 Livre": "Tiróide",
  Ferritina: "Ferro e Energia",
  "Ferro Sérico": "Ferro e Energia",
  Transferrina: "Ferro e Energia",
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
  TSH: "Intervalo funcional: 0.5–2.0 mUI/L",
  Ferritina: "Intervalo funcional: 40–100 ng/mL",
  PCR: "Intervalo funcional: < 1.0 mg/L",
  "Vitamina D": "Intervalo funcional: 50–80 ng/mL",
  "Vitamina B12": "Intervalo funcional: 500–900 pg/mL",
  "Homocisteína": "Intervalo funcional: < 7 µmol/L",
  "Cortisol (manhã)": "Intervalo funcional: 10–18 µg/dL",
};

const SYSTEM_EXPLANATIONS: Record<string, string> = {
  "Tiróide": "A tiróide regula o metabolismo, energia e temperatura corporal. Valores sub-óptimos de TSH, T3 ou T4 podem explicar fadiga, ganho de peso e dificuldade de concentração — mesmo quando estão dentro do 'normal' laboratorial.",
  "Ferro e Energia": "O ferro é essencial para o transporte de oxigénio e produção de energia celular. Ferritina funcionalmente baixa (< 40 ng/mL) é uma das causas mais comuns de fadiga crónica, queda de cabelo e intolerância ao frio.",
  "Inflamação": "A inflamação crónica de baixo grau está na base de muitas patologias modernas. PCR elevada e homocisteína alta são sinais precoces que o corpo está sob stress — antes de qualquer diagnóstico convencional.",
  "Metabolismo": "Vitamina D e B12 são cofactores essenciais para centenas de reações metabólicas, desde a imunidade à saúde neurológica. Níveis 'normais' podem ser insuficientes para um funcionamento óptimo.",
  "Eixo HPA": "O eixo hipotálamo-hipófise-adrenal regula a resposta ao stress. Cortisol desregulado pode causar insónia, ansiedade, fadiga matinal e dificuldade de recuperação.",
};

function evaluateResults(labValues: LabValues, labUnits: LabUnits) {
  const findings: { marker: string; value: string; unit: string; status: "optimal" | "suboptimal" | "flag"; note: string; implausible?: boolean }[] = [];

  const v = (key: keyof LabValues) => {
    const raw = labValues[key];
    return raw ? parseFloat(raw.replace(",", ".")) : null;
  };
  const u = (key: keyof LabValues) => labUnits[key] || getDefaultUnit(key as LabKey) || "";
  const flag = (key: keyof LabValues, raw: string | undefined, unit: string) =>
    raw ? isImplausible(key as LabKey, raw, unit) : false;

  const tsh = v("tsh");
  if (tsh !== null) {
    const unit = u("tsh");
    const implausible = flag("tsh", labValues.tsh, unit);
    if (tsh >= 0.5 && tsh <= 2.0) findings.push({ marker: "TSH", value: `${tsh}`, unit, status: "optimal", note: "Dentro do intervalo funcional óptimo.", implausible });
    else if (tsh > 2.0 && tsh <= 4.5) findings.push({ marker: "TSH", value: `${tsh}`, unit, status: "suboptimal", note: "Dentro do intervalo convencional, mas acima do óptimo funcional (0.5–2.0).", implausible });
    else findings.push({ marker: "TSH", value: `${tsh}`, unit, status: "flag", note: "Fora do intervalo de referência. Vale a pena explorar com o teu médico.", implausible });
  }

  const ferritina = v("ferritina");
  if (ferritina !== null) {
    const unit = u("ferritina");
    const implausible = flag("ferritina", labValues.ferritina, unit);
    if (ferritina >= 40 && ferritina <= 100) findings.push({ marker: "Ferritina", value: `${ferritina}`, unit, status: "optimal", note: "Nível óptimo para energia e função tiroideia.", implausible });
    else if (ferritina >= 12 && ferritina < 40) findings.push({ marker: "Ferritina", value: `${ferritina}`, unit, status: "suboptimal", note: "Dentro do 'normal' laboratorial, mas funcionalmente baixa.", implausible });
    else if (ferritina < 12) findings.push({ marker: "Ferritina", value: `${ferritina}`, unit, status: "flag", note: "Depleção de ferro. Requer intervenção.", implausible });
    else findings.push({ marker: "Ferritina", value: `${ferritina}`, unit, status: "suboptimal", note: "Elevada — pode indicar inflamação.", implausible });
  }

  const pcr = v("pcr");
  if (pcr !== null) {
    const unit = u("pcr");
    const implausible = flag("pcr", labValues.pcr, unit);
    if (pcr < 1) findings.push({ marker: "PCR", value: `${pcr}`, unit, status: "optimal", note: "Sem inflamação sistémica detectável.", implausible });
    else if (pcr >= 1 && pcr <= 3) findings.push({ marker: "PCR", value: `${pcr}`, unit, status: "suboptimal", note: "Inflamação de baixo grau. Investigar causa.", implausible });
    else findings.push({ marker: "PCR", value: `${pcr}`, unit, status: "flag", note: "Inflamação elevada. Vale a pena explorar com o teu médico.", implausible });
  }

  const vitD = v("vitamina_d");
  if (vitD !== null) {
    const unit = u("vitamina_d");
    const implausible = flag("vitamina_d", labValues.vitamina_d, unit);
    if (vitD >= 50 && vitD <= 80) findings.push({ marker: "Vitamina D", value: `${vitD}`, unit, status: "optimal", note: "Nível óptimo funcional.", implausible });
    else if (vitD >= 30 && vitD < 50) findings.push({ marker: "Vitamina D", value: `${vitD}`, unit, status: "suboptimal", note: "Suficiente mas abaixo do óptimo funcional (50–80).", implausible });
    else if (vitD < 30) findings.push({ marker: "Vitamina D", value: `${vitD}`, unit, status: "flag", note: "Insuficiência de vitamina D.", implausible });
    else findings.push({ marker: "Vitamina D", value: `${vitD}`, unit, status: "suboptimal", note: "Acima do intervalo óptimo.", implausible });
  }

  const b12 = v("vitamina_b12");
  if (b12 !== null) {
    const unit = u("vitamina_b12");
    const implausible = flag("vitamina_b12", labValues.vitamina_b12, unit);
    if (b12 >= 500 && b12 <= 900) findings.push({ marker: "Vitamina B12", value: `${b12}`, unit, status: "optimal", note: "Nível óptimo funcional.", implausible });
    else if (b12 >= 200 && b12 < 500) findings.push({ marker: "Vitamina B12", value: `${b12}`, unit, status: "suboptimal", note: "Normal laboratorial mas funcionalmente insuficiente.", implausible });
    else if (b12 < 200) findings.push({ marker: "Vitamina B12", value: `${b12}`, unit, status: "flag", note: "Deficiência de B12. Requer suplementação.", implausible });
    else findings.push({ marker: "Vitamina B12", value: `${b12}`, unit, status: "optimal", note: "Nível adequado.", implausible });
  }

  const hom = v("homocisteina");
  if (hom !== null) {
    const unit = u("homocisteina");
    const implausible = flag("homocisteina", labValues.homocisteina, unit);
    if (hom < 7) findings.push({ marker: "Homocisteína", value: `${hom}`, unit, status: "optimal", note: "Nível óptimo.", implausible });
    else if (hom >= 7 && hom <= 10) findings.push({ marker: "Homocisteína", value: `${hom}`, unit, status: "suboptimal", note: "Ligeiramente elevada. Verificar B12, B6 e folato.", implausible });
    else findings.push({ marker: "Homocisteína", value: `${hom}`, unit, status: "flag", note: "Elevada — risco cardiovascular e neuroinflamatório.", implausible });
  }

  const cortisol = v("cortisol");
  if (cortisol !== null) {
    const unit = u("cortisol");
    const implausible = flag("cortisol", labValues.cortisol, unit);
    if (cortisol >= 10 && cortisol <= 18) findings.push({ marker: "Cortisol (manhã)", value: `${cortisol}`, unit, status: "optimal", note: "Dentro do intervalo funcional.", implausible });
    else findings.push({ marker: "Cortisol (manhã)", value: `${cortisol}`, unit, status: "suboptimal", note: "Fora do intervalo óptimo. Avaliar eixo HPA.", implausible });
  }

  return findings;
}

function getSystemSummary(results: ReturnType<typeof evaluateResults>) {
  const systemMap = new Map<string, "optimal" | "suboptimal" | "flag">();
  results.forEach((r) => {
    const sys = SYSTEM_LABELS[r.marker] || r.marker;
    const current = systemMap.get(sys);
    if (!current || r.status === "flag" || (r.status === "suboptimal" && current === "optimal")) {
      systemMap.set(sys, r.status);
    }
  });
  return Array.from(systemMap.entries());
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
      <label className="text-sm font-sans text-muted-foreground">{label}</label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "—"}
          className="bg-transparent border-matcha/30 focus:border-matcha sm:flex-1"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          aria-label={`Unidade de ${label}`}
          className="h-10 rounded-md border border-matcha/30 bg-transparent px-2 text-sm font-sans text-foreground focus:border-matcha focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:w-auto sm:min-w-[110px]"
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
        <p className="text-xs font-sans text-amber">
          Este valor parece invulgar para a unidade seleccionada. Verifica no relatório original se a unidade está correcta.
        </p>
      )}
    </div>
  );
};

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-bone rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-sans text-foreground hover:bg-bone/50 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-custom transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm font-sans text-muted-custom leading-relaxed">{children}</div>}
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
        className="flex items-center gap-1 text-[11px] text-muted-custom hover:text-foreground/60 transition-colors font-sans"
      >
        <BookOpen className="w-3 h-3" />
        <span>Ver estudos</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mt-1.5 space-y-1 pl-4">
          {refs.map((ref) => (
            <li key={ref.pmid} className="text-[10px] text-muted-custom font-sans leading-relaxed">
              {ref.authors} <span className="italic">{ref.journal}</span>. {ref.year}.{" "}
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground/60"
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
    // Steps 2–5 = painéis laboratoriais. Bloquear avanço se houver valor sem unidade.
    if (step >= 2 && step <= 5 && missingUnits.length > 0) return false;
    if (step === 6) return form.nome.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return true;
  };

  const goNext = async () => {
    setError(null);
    if (!canProceed()) {
      if (step === 0) setError("Seleciona pelo menos um objetivo.");
      else if (step === 1) setError("Seleciona o sexo biológico.");
      else if (step >= 2 && step <= 5 && missingUnits.length > 0) setError("Indica em que unidade está cada valor preenchido.");
      else if (step === 6) setError("Nome e email válido são obrigatórios.");
      return;
    }

    if (step === 6) {
      setSaving(true);
      const evalResults = evaluateResults(form.labValues, form.labUnits);
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
        valores_laboratoriais: JSON.parse(JSON.stringify({ values: form.labValues, units: form.labUnits })),
        resultados: JSON.parse(JSON.stringify(evalResults)),
        tem_exames: temExames,
      };

      const [{ data: leadRows, error: leadError }, { error: applicationsError }] = await Promise.all([
        supabase.from("leads_avaliacao").insert([{
          nome: insertData.nome,
          email: insertData.email,
          idade: insertData.idade,
          sexo: insertData.sexo,
          objetivos: insertData.objetivos,
          valores_laboratoriais: insertData.valores_laboratoriais,
          resultados: insertData.resultados,
          tem_exames: insertData.tem_exames,
        } as any]).select("id"),
        supabase.from("applications").insert([{
          nome: insertData.nome,
          email: insertData.email,
          idade: insertData.idade,
          pais: insertData.pais,
          sexo: insertData.sexo,
          objetivos: insertData.objetivos,
          valores_laboratoriais: insertData.valores_laboratoriais,
          resultados: insertData.resultados,
          rgpd_aceite: true,
        }]),
      ]);

      setSaving(false);
      if (leadError || applicationsError) {
        console.error("Avaliacao save error", { leadError, applicationsError });
        setError("Erro ao guardar. Tenta novamente.");
        return;
      }
      setSaved(true);

      // Generate PDF base64 for email attachment
      const systemSummary = getSystemSummary(evalResults);
      let pdfBase64: string | undefined;
      try {
        const { generatePDFBase64 } = await import("@/lib/generatePDF");
        pdfBase64 = await generatePDFBase64(form.nome.trim(), systemSummary, evalResults);
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

    setStep((s) => Math.min(s + 1, 8));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const results = evaluateResults(form.labValues, form.labUnits);
  const systems = getSystemSummary(results);
  const hasAnyLabValue = Object.values(form.labValues).some((v) => v && v.trim() !== "");
  const optimalCount = systems.filter(([, s]) => s === "optimal").length;
  const flagCount = systems.filter(([, s]) => s !== "optimal").length;

  const handleExportPDF = async () => {
    const { downloadPDF } = await import("@/lib/generatePDF");
    await downloadPDF(form.nome || "utilizador", systems, results);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 text-center bg-background">
        <p className="label-uppercase text-matcha mb-4 tracking-widest text-xs">Autoavaliação</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
          Os teus exames estão normais.<br />O teu corpo não.
        </h1>
        <p className="mt-6 text-muted-custom max-w-2xl mx-auto text-base font-sans leading-relaxed">
          Esta autoavaliação é educativa. Ajuda-te a chegar à consulta — comigo ou com o teu médico — com perguntas estruturadas. Não substitui avaliação clínica.
        </p>
        <p className="mt-2 text-muted-custom font-sans text-sm">
          Mais de 15 biomarcadores analisados em menos de 2 minutos.
        </p>
      </section>

      {/* Progress — numbered tabs */}
      <section className="px-6 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex items-end gap-0 overflow-x-auto pb-0 mb-3">
            {STEP_TITLES.slice(0, 7).map((title, i) => {
              const isActive = i === step;
              const isPast = i < step;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { if (isPast) { setError(null); setStep(i); } }}
                  className={`flex-1 min-w-0 flex flex-col items-center gap-1 pb-2 border-b-2 transition-all ${
                    isActive
                      ? "border-matcha"
                      : isPast
                        ? "border-transparent cursor-pointer hover:border-matcha/30"
                        : "border-transparent cursor-default"
                  }`}
                >
                  <span className={`font-sans text-sm font-medium transition-colors ${
                    isActive ? "text-matcha" : isPast ? "text-foreground/60" : "text-muted-foreground/40"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`hidden md:block label-uppercase text-[10px] transition-colors ${
                    isActive ? "text-matcha" : isPast ? "text-foreground/50" : "text-muted-foreground/30"
                  }`}>
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Linear progress bar */}
          <div className="h-[2px] bg-bone rounded-full overflow-hidden">
            <div className="h-full bg-matcha rounded-full transition-all duration-500 ease-out" style={{ width: `${((step + 1) / 9) * 100}%` }} />
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
              <h2 className="font-serif text-3xl text-foreground">Quais são os teus principais objetivos?</h2>
              <p className="text-sm text-muted-foreground font-sans">Seleciona todos os que se aplicam.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => toggleObjective(obj)}
                    className={`h-[52px] px-4 rounded text-sm font-sans transition-all duration-200 border text-center ${
                      form.objetivos.includes(obj)
                        ? "bg-eclipse text-white border-eclipse"
                        : "bg-transparent text-foreground border-matcha/40 hover:border-matcha"
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
              <h2 className="font-serif text-3xl text-foreground">Perfil básico</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-sans text-muted-foreground mb-3 block">Sexo biológico</label>
                  <div className="grid grid-cols-2 gap-3 max-w-xs">
                    {["Feminino", "Masculino"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, sexo: s }))}
                        className={`h-[52px] px-6 rounded text-sm font-sans transition-all border text-center ${
                          form.sexo === s
                            ? "bg-eclipse text-white border-eclipse"
                            : "bg-transparent text-foreground border-matcha/40 hover:border-matcha"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-sans text-muted-foreground mb-1 block">Idade (opcional)</label>
                  <Input
                    type="number"
                    min={18}
                    max={80}
                    value={form.idade}
                    onChange={(e) => setForm((prev) => ({ ...prev, idade: e.target.value }))}
                    placeholder="Ex: 38"
                    className="bg-transparent border-matcha/40 focus:border-matcha max-w-[120px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Thyroid */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-foreground">Painel Tiroideu</h2>
                <p className="text-sm text-muted-foreground font-sans mt-2">Preenche apenas os valores que tens disponíveis.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LabInput label="TSH" labKey="tsh" value={form.labValues.tsh || ""} unit={form.labUnits.tsh || ""} onChange={(v) => updateLab("tsh", v)} onUnitChange={(u) => updateUnit("tsh", u)} placeholder="Ex: 2.5" />
                <LabInput label="T3 Livre" labKey="t3_livre" value={form.labValues.t3_livre || ""} unit={form.labUnits.t3_livre || ""} onChange={(v) => updateLab("t3_livre", v)} onUnitChange={(u) => updateUnit("t3_livre", u)} placeholder="Ex: 3.1" />
                <LabInput label="T4 Livre" labKey="t4_livre" value={form.labValues.t4_livre || ""} unit={form.labUnits.t4_livre || ""} onChange={(v) => updateLab("t4_livre", v)} onUnitChange={(u) => updateUnit("t4_livre", u)} placeholder="Ex: 1.2" />
              </div>
            </div>
          )}

          {/* Step 3: Iron */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-foreground">Painel de Ferro</h2>
                <p className="text-sm text-muted-foreground font-sans mt-2">Preenche apenas os valores que tens disponíveis.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LabInput label="Ferritina" labKey="ferritina" value={form.labValues.ferritina || ""} unit={form.labUnits.ferritina || ""} onChange={(v) => updateLab("ferritina", v)} onUnitChange={(u) => updateUnit("ferritina", u)} placeholder="Ex: 45" />
                <LabInput label="Ferro Sérico" labKey="ferro_serico" value={form.labValues.ferro_serico || ""} unit={form.labUnits.ferro_serico || ""} onChange={(v) => updateLab("ferro_serico", v)} onUnitChange={(u) => updateUnit("ferro_serico", u)} placeholder="Ex: 80" />
                <LabInput label="Transferrina" labKey="transferrina" value={form.labValues.transferrina || ""} unit={form.labUnits.transferrina || ""} onChange={(v) => updateLab("transferrina", v)} onUnitChange={(u) => updateUnit("transferrina", u)} placeholder="Ex: 250" />
              </div>
            </div>
          )}

          {/* Step 4: Inflammation */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-foreground">Marcadores Inflamatórios</h2>
                <p className="text-sm text-muted-foreground font-sans mt-2">Preenche apenas os valores que tens disponíveis.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LabInput label="PCR (Proteína C-Reactiva)" labKey="pcr" value={form.labValues.pcr || ""} unit={form.labUnits.pcr || ""} onChange={(v) => updateLab("pcr", v)} onUnitChange={(u) => updateUnit("pcr", u)} placeholder="Ex: 0.5" />
                <LabInput label="Homocisteína" labKey="homocisteina" value={form.labValues.homocisteina || ""} unit={form.labUnits.homocisteina || ""} onChange={(v) => updateLab("homocisteina", v)} onUnitChange={(u) => updateUnit("homocisteina", u)} placeholder="Ex: 8" />
                <LabInput label="VS (Velocidade de Sedimentação)" labKey="vsg" value={form.labValues.vsg || ""} unit={form.labUnits.vsg || ""} onChange={(v) => updateLab("vsg", v)} onUnitChange={(u) => updateUnit("vsg", u)} placeholder="Ex: 10" />
              </div>
            </div>
          )}

          {/* Step 5: Metabolism */}
          {step === 5 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-foreground">Metabolismo e Hormonas</h2>
                <p className="text-sm text-muted-foreground font-sans mt-2">Preenche apenas os valores que tens disponíveis.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LabInput label="Vitamina D" labKey="vitamina_d" value={form.labValues.vitamina_d || ""} unit={form.labUnits.vitamina_d || ""} onChange={(v) => updateLab("vitamina_d", v)} onUnitChange={(u) => updateUnit("vitamina_d", u)} placeholder="Ex: 35" />
                <LabInput label="Vitamina B12" labKey="vitamina_b12" value={form.labValues.vitamina_b12 || ""} unit={form.labUnits.vitamina_b12 || ""} onChange={(v) => updateLab("vitamina_b12", v)} onUnitChange={(u) => updateUnit("vitamina_b12", u)} placeholder="Ex: 400" />
                <LabInput label="Ácido Fólico" labKey="acido_folico" value={form.labValues.acido_folico || ""} unit={form.labUnits.acido_folico || ""} onChange={(v) => updateLab("acido_folico", v)} onUnitChange={(u) => updateUnit("acido_folico", u)} placeholder="Ex: 8" />
                <LabInput label="Cortisol (manhã)" labKey="cortisol" value={form.labValues.cortisol || ""} unit={form.labUnits.cortisol || ""} onChange={(v) => updateLab("cortisol", v)} onUnitChange={(u) => updateUnit("cortisol", u)} placeholder="Ex: 15" />
                <LabInput label="DHEA-S" labKey="dhea" value={form.labValues.dhea || ""} unit={form.labUnits.dhea || ""} onChange={(v) => updateLab("dhea", v)} onUnitChange={(u) => updateUnit("dhea", u)} placeholder="Ex: 200" />
              </div>
            </div>
          )}

          {/* Step 6: PRÉ-RESULTADO + Lead capture */}
          {step === 6 && (
            <div className="space-y-8">
              {/* Summary card */}
              <div className="bg-ivory rounded-2xl p-8 border border-bone space-y-6">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center">
                  A tua leitura funcional
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-bone/50 rounded-xl py-4 px-2">
                    <p className="font-serif text-3xl text-foreground">{systems.length}</p>
                    <p className="text-xs text-muted-custom font-sans mt-1">Sistemas avaliados</p>
                  </div>
                  <div className="bg-bone/50 rounded-xl py-4 px-2">
                    <p className="font-serif text-3xl text-foreground">{optimalCount}</p>
                    <p className="text-xs text-muted-custom font-sans mt-1">No intervalo funcional</p>
                  </div>
                  <div className="bg-bone/50 rounded-xl py-4 px-2">
                    <p className="font-serif text-3xl text-foreground">{flagCount}</p>
                    <p className="text-xs text-muted-custom font-sans mt-1">Padrões a investigar</p>
                  </div>
                </div>

                {/* System list with status dots only */}
                <div className="space-y-2">
                  {systems.map(([name, status]) => (
                    <div key={name} className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-background/60">
                      <span className="text-sm font-sans font-medium text-foreground mr-1">
                        {status === "optimal" ? "\u25CF" : status === "suboptimal" ? "\u26A0" : "\u2193"}
                      </span>
                      <span className="text-sm font-sans text-foreground">{name}</span>
                    </div>
                  ))}
                  {systems.length === 0 && (
                    <p className="text-sm text-muted-custom font-sans text-center py-4">
                      Nenhum valor laboratorial foi introduzido.
                    </p>
                  )}
                </div>
              </div>

              {/* Information gap message */}
              <p className="text-sm font-sans text-muted-foreground italic text-center leading-relaxed max-w-[480px] mx-auto">
                "Identificámos alguns padrões nos teus biomarcadores. Para ver a interpretação completa de cada marcador, os rácios calculados e os próximos passos possíveis, introduz o teu email."
              </p>

              {/* Lead capture form */}
              <div className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="text-sm font-sans text-muted-foreground mb-1 block">Nome</label>
                  <Input
                    value={form.nome}
                    onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
                    placeholder="Nome completo"
                    className="bg-transparent border-matcha/30 focus:border-matcha"
                  />
                </div>
                <div>
                  <label className="text-sm font-sans text-muted-foreground mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                    className="bg-transparent border-matcha/30 focus:border-matcha"
                  />
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={goNext}
                  disabled={saving}
                >
                  {saving ? "A guardar..." : "Ver relatório completo →"}
                </Button>
                <p className="text-xs text-muted-custom font-sans text-center">
                  Sem spam. Apenas a tua leitura.
                </p>
              </div>
            </div>
          )}

          {/* Step 7: RESULTADO COMPLETO */}
          {step === 7 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-amber" />
                </div>
                <h2 className="font-serif text-3xl text-foreground">A tua leitura — para levares à consulta.</h2>
                <p className="text-muted-custom font-sans mt-2">Análise baseada em intervalos funcionais — não apenas de referência.</p>
              </div>

              {!hasAnyLabValue ? (
                <div className="space-y-6">
                  <div className="bg-ivory border border-bone rounded-2xl p-8 md:p-10 space-y-5">
                    <p className="label-uppercase text-matcha tracking-widest text-xs">Resultado Preliminar</p>
                    <p className="text-foreground/85 font-sans text-base leading-relaxed">
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
                        <li key={sintoma} className="flex items-start gap-3 font-sans text-foreground/85">
                          <span className="text-matcha mt-1 leading-none">◆</span>
                          <span>{sintoma}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-foreground/85 font-sans text-base leading-relaxed pt-2">
                      Mesmo sem análises laboratoriais, estes padrões já justificam uma investigação mais aprofundada.
                    </p>
                    <p className="text-muted-custom font-sans text-sm leading-relaxed">
                      Nos próximos dias vais receber orientações para perceber melhor quais os fatores que podem estar por trás destes sintomas e quais os exames que vale a pena considerar.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
                    <p className="text-sm font-sans text-foreground leading-relaxed">
                      Se preferes ir directamente para uma avaliação clínica completa — onde cruzamos sintomas, história e exames — podes agendar a consulta inicial.
                    </p>
                    <Button variant="hero" size="sm" onClick={() => setAcuityOpen(true)}>
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
                        "bg-red-50 border-red-200"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-sans font-bold">
                              {r.status === "optimal" ? "\u25CF" : r.status === "suboptimal" ? "\u26A0" : "\u2193"}
                            </span>
                            <span className="font-sans font-medium text-foreground text-sm">{r.marker}</span>
                          </div>
                          <span className={`text-xs font-sans px-2 py-0.5 rounded-full ${
                            r.status === "optimal" ? "bg-green-100 text-green-800" :
                            r.status === "suboptimal" ? "bg-amber-100 text-amber-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {r.status === "optimal" ? "Funcional" : r.status === "suboptimal" ? "Sub-óptimo" : "Atenção"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-custom font-sans">
                          {r.value} {r.unit}
                          {r.implausible && <span className="text-amber"> · valor invulgar para a unidade seleccionada</span>}
                        </p>
                        {FUNCTIONAL_RANGES[r.marker] && (
                          <p className="text-xs text-muted-custom font-sans mt-0.5 italic">{FUNCTIONAL_RANGES[r.marker]}</p>
                        )}
                        <p className="text-sm text-foreground/80 font-sans mt-1">{r.note}</p>
                        {refs.length > 0 && <BiomarkerRefs refs={refs} />}
                        {r.marker === "Ferritina" && (
                          <a href="/ferritina-baixa-sintomas" className="inline-block text-amber font-sans text-xs hover:underline mt-2">
                            Saber mais sobre ferritina →
                          </a>
                        )}
                      </div>
                      );
                    })}
                  </div>

                  {/* System explanations as accordions */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-foreground mb-3">Saber mais sobre cada sistema</h3>
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
                      <p className="text-sm font-sans text-foreground leading-relaxed">
                        Encontrámos <strong>{flagCount}</strong> biomarcador{flagCount > 1 ? "es" : ""} fora do intervalo funcional. Estes padrões podem associar-se a sintomas como fadiga, alterações hormonais ou dificuldade de recuperação. Uma consulta clínica permite interpretar estes padrões no seu contexto individual.
                      </p>
                      <Button variant="hero" size="sm" onClick={() => setAcuityOpen(true)}>
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

              {/* Disclaimer */}
              <div className="bg-bone rounded-xl p-6 text-center space-y-4">
                <p className="text-sm font-sans text-foreground/85 leading-relaxed max-w-[60ch] mx-auto">
                  Para além dos intervalos de referência laboratoriais, vale a pena olhar para intervalos funcionais — uma leitura complementar usada por laboratórios portugueses (como o Joaquim Chaves) e pela literatura científica internacional. Não substitui a interpretação clínica do médico.
                </p>
                <p className="text-xs text-muted-custom font-sans">
                  Esta autoavaliação é uma ferramenta educativa. Para diagnóstico, interpretação clínica de análises, prescrição ou tratamento médico, consulta o teu médico. Se quiseres acompanhamento de Medicina Tradicional Chinesa em complemento, podes marcar uma consulta comigo.
                </p>
              </div>

              {/* Next step button */}
              <div className="flex justify-center pt-4">
                <Button variant="hero" size="lg" onClick={() => setStep(8)}>
                  Ver próximos passos →
                </Button>
              </div>
            </div>
          )}

          {/* Step 8: CONFIRMAÇÃO — Dark CTA */}
          {step === 8 && (
            <div className="bg-[#1F1A14] rounded-2xl p-10 md:p-14 text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-ivory italic leading-tight">
                Os teus exames contam uma história.<br />Queres ouvi-la?
              </h2>
              <p className="text-ivory/70 font-sans text-sm max-w-md mx-auto leading-relaxed">
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
                  className="border-ivory/30 text-ivory hover:bg-ivory/10"
                >
                  <a href="/programa-fundacao">Conhecer o Programa Fundação</a>
                </Button>
              </div>
            </div>
          )}

          {/* Navigation buttons (steps 0–5 only, step 6 has its own button) */}
          {step < 6 && (
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
      <Footer />
    </div>
  );
};

export default Avaliacao;
