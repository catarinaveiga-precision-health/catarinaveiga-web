import { useState } from "react";
import { CheckCircle, AlertCircle, Shield, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { supabase } from "@/integrations/supabase/client";

const COUNTRIES = [
  "Portugal", "Brasil", "Angola", "Moçambique", "Cabo Verde",
  "Reino Unido", "França", "Alemanha", "Suíça", "Espanha",
  "Estados Unidos", "Canadá", "Outro"
];

const SYMPTOM_OPTIONS = [
  "Fadiga persistente", "Insónia", "Ansiedade", "Peso", "Tiroide",
  "Digestão", "Pele", "Hormonal", "Perimenopausa", "Outro"
];

const DURATION_OPTIONS = [
  "Menos de 6 meses",
  "6 meses – 1 ano",
  "1 – 3 anos",
  "Mais de 3 anos"
];

interface FormData {
  nome: string;
  email: string;
  idade: string;
  pais: string;
  sintomas: string[];
  duracao_sintomas: string;
  historico_tratamentos: string;
  diagnosticos: string;
  rgpd_aceite: boolean;
}

const initialFormData: FormData = {
  nome: "",
  email: "",
  idade: "",
  pais: "",
  sintomas: [],
  duracao_sintomas: "",
  historico_tratamentos: "",
  diagnosticos: "",
  rgpd_aceite: false,
};

const Candidatura = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const updateField = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const toggleSymptom = (symptom: string) => {
    setForm((prev) => ({
      ...prev,
      sintomas: prev.sintomas.includes(symptom)
        ? prev.sintomas.filter((s) => s !== symptom)
        : [...prev.sintomas, symptom],
    }));
  };

  const goNext = () => {
    setDirection("left");
    setStep((s) => Math.min(s + 1, 4));
  };
  const goBack = () => {
    setDirection("right");
    setStep((s) => Math.max(s - 1, 1));
  };

  const validateStep1 = () => {
    if (!form.nome.trim()) return "O nome é obrigatório.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email inválido.";
    const age = Number(form.idade);
    if (form.idade && (isNaN(age) || age < 18 || age > 80)) return "Idade deve ser entre 18 e 80.";
    return null;
  };

  const handleNext = () => {
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
    }
    goNext();
  };

  const handleSubmit = async () => {
    if (!form.rgpd_aceite) {
      setError("Deve aceitar a Política de Privacidade.");
      return;
    }
    setLoading(true);
    setError(null);

    // Primary: save to leads_candidatura
    const { error: dbError } = await supabase.from("leads_candidatura").insert({
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: null,
      sintomas: form.sintomas,
      historico: form.historico_tratamentos.trim() || null,
      objetivos: form.diagnosticos.trim() || null,
      informacao_adicional: form.duracao_sintomas
        ? `Idade: ${form.idade || "—"}, País: ${form.pais || "—"}, Duração: ${form.duracao_sintomas}`
        : `Idade: ${form.idade || "—"}, País: ${form.pais || "—"}`,
    });

    // Backup: also save to applications
    supabase.from("applications").insert({
      nome: form.nome.trim(),
      email: form.email.trim(),
      idade: form.idade ? Number(form.idade) : null,
      pais: form.pais || null,
      sintomas: form.sintomas,
      duracao_sintomas: form.duracao_sintomas || null,
      historico_tratamentos: form.historico_tratamentos.trim() || null,
      diagnosticos: form.diagnosticos.trim() || null,
      rgpd_aceite: form.rgpd_aceite,
    }).then(() => {});

    setLoading(false);
    if (dbError) {
      setError("Ocorreu um erro ao enviar. Tenta novamente.");
    } else {
      setSubmitted(true);

      // Fire-and-forget: send transactional emails
      supabase.functions.invoke('send-emails', {
        body: {
          table: 'leads_candidatura',
          record: {
            nome: form.nome.trim(),
            email: form.email.trim(),
            telefone: null,
            created_at: new Date().toISOString(),
          },
        },
      }).catch((err) => console.error('Email send error:', err));
    }
  };

  return (
    <div className="min-h-screen bg-v2-paper">
      <NavbarV2 />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center bg-v2-paper">
        <p className="label-uppercase text-v2-golden mb-4 tracking-widest text-xs">Triagem Gratuita</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-v2-ink leading-tight max-w-3xl mx-auto">
          Primeiro, vou perceber se te posso ajudar.
        </h1>
        <p className="mt-6 text-v2-ink-mute max-w-xl mx-auto text-base md:text-lg font-sans leading-relaxed">
          A triagem existe para garantir que o Programa Fundação é a abordagem certa para o teu caso específico — antes de avançares.
        </p>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-20 px-6 bg-v2-paper-deep">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between relative">
            {/* Connector line */}
            <div className="absolute top-5 left-[calc(16.67%)] right-[calc(16.67%)] h-px bg-v2-golden/30 hidden md:block" />

            {[
              { num: 1, title: "Preenches", desc: "5 minutos. Respondo pessoalmente." },
              { num: 2, title: "Avaliação", desc: "Analiso o teu caso em 48h úteis." },
              { num: 3, title: "Se houver fit", desc: "Marcamos consulta inicial (€120)." },
            ].map((s) => (
              <div key={s.num} className="flex-1 text-center relative z-10">
                <div className="w-10 h-10 rounded-full bg-v2-golden text-primary-foreground flex items-center justify-center mx-auto font-serif text-lg">
                  {s.num}
                </div>
                <h3 className="font-serif text-lg text-v2-ink mt-3">{s.title}</h3>
                <p className="text-v2-ink-mute text-sm font-sans mt-1 max-w-[180px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-v2-ink-mute text-sm font-sans mt-10 italic">
            Se não for a abordagem certa, digo-o. Sem rodeios.
          </p>
        </div>
      </section>

      {/* MULTI-STEP FORM */}
      <section className="py-20 px-6 bg-v2-paper">
        <div className="max-w-[680px] mx-auto">
          {submitted ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-v2-golden/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-v2-golden" />
              </div>
              <h2 className="font-serif text-3xl text-v2-ink">Candidatura recebida.</h2>
              <p className="text-v2-ink-mute font-sans mt-4">Respondo pessoalmente em 48h úteis.</p>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-10 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        i <= step ? "bg-v2-golden" : "bg-v2-paper-deep"
                      }`}
                    />
                    {i < 4 && (
                      <div className={`w-8 h-0.5 transition-colors duration-300 ${
                        i < step ? "bg-v2-golden" : "bg-v2-paper-deep"
                      }`} />
                    )}
                  </div>
                ))}
                <span className="ml-3 text-xs text-v2-ink-mute font-sans">{step}/4</span>
              </div>

              {/* Error banner */}
              {error && (
                <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-lg px-4 py-3 mb-6 text-sm font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Steps */}
              <div className="overflow-hidden">
                <div
                  key={step}
                  className={`animate-slide-${direction === "left" ? "in-left" : "in-right"}`}
                >
                  {step === 1 && (
                    <StepWrapper title="Sobre si">
                      <FieldGroup label="Nome completo *">
                        <Input
                          value={form.nome}
                          onChange={(e) => updateField("nome", e.target.value)}
                          placeholder="Nome completo"
                          className="bg-v2-paper-deep border-v2-paper-line focus:border-v2-golden"
                        />
                      </FieldGroup>
                      <FieldGroup label="Email *">
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="email@exemplo.com"
                          className="bg-v2-paper-deep border-v2-paper-line focus:border-v2-golden"
                        />
                      </FieldGroup>
                      <FieldGroup label="Idade">
                        <Input
                          type="number"
                          min={18}
                          max={80}
                          value={form.idade}
                          onChange={(e) => updateField("idade", e.target.value)}
                          placeholder="Ex: 35"
                          className="bg-v2-paper-deep border-v2-paper-line focus:border-v2-golden"
                        />
                      </FieldGroup>
                      <FieldGroup label="País de residência">
                        <select
                          value={form.pais}
                          onChange={(e) => updateField("pais", e.target.value)}
                          className="w-full h-10 rounded-md border border-v2-paper-line bg-v2-paper-deep px-3 py-2 text-sm font-sans text-v2-ink focus:outline-none focus:border-v2-golden"
                        >
                          <option value="">Seleccionar</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </FieldGroup>
                      <div className="flex justify-end pt-4">
                        <Button variant="eclipse" onClick={handleNext}>Continuar →</Button>
                      </div>
                    </StepWrapper>
                  )}

                  {step === 2 && (
                    <StepWrapper title="Sintomas principais">
                      <FieldGroup label="Selecciona os teus sintomas">
                        <div className="flex flex-wrap gap-2">
                          {SYMPTOM_OPTIONS.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggleSymptom(s)}
                              className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 border ${
                                form.sintomas.includes(s)
                                  ? "bg-v2-golden text-primary-foreground border-v2-golden"
                                  : "bg-v2-paper text-v2-ink border-v2-paper-line hover:border-v2-golden/50"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </FieldGroup>
                      <FieldGroup label="Há quanto tempo tens estes sintomas?">
                        <select
                          value={form.duracao_sintomas}
                          onChange={(e) => updateField("duracao_sintomas", e.target.value)}
                          className="w-full h-10 rounded-md border border-v2-paper-line bg-v2-paper-deep px-3 py-2 text-sm font-sans text-v2-ink focus:outline-none focus:border-v2-golden"
                        >
                          <option value="">Seleccionar</option>
                          {DURATION_OPTIONS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </FieldGroup>
                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={goBack}>← Anterior</Button>
                        <Button variant="eclipse" onClick={handleNext}>Continuar →</Button>
                      </div>
                    </StepWrapper>
                  )}

                  {step === 3 && (
                    <StepWrapper title="Histórico">
                      <FieldGroup label="Já tentaste algum tratamento? O que aconteceu?">
                        <div className="relative">
                          <Textarea
                            value={form.historico_tratamentos}
                            onChange={(e) => {
                              if (e.target.value.length <= 500) updateField("historico_tratamentos", e.target.value);
                            }}
                            placeholder="Descreve brevemente..."
                            className="bg-v2-paper-deep border-v2-paper-line focus:border-v2-golden min-h-[120px]"
                          />
                          <span className="absolute bottom-2 right-3 text-xs text-v2-ink-mute">
                            {form.historico_tratamentos.length}/500
                          </span>
                        </div>
                      </FieldGroup>
                      <FieldGroup label="Tens diagnósticos estabelecidos? Quais?">
                        <Textarea
                          value={form.diagnosticos}
                          onChange={(e) => updateField("diagnosticos", e.target.value)}
                          placeholder="Ex: Hipotiroidismo, SII..."
                          className="bg-v2-paper-deep border-v2-paper-line focus:border-v2-golden min-h-[100px]"
                        />
                      </FieldGroup>
                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={goBack}>← Anterior</Button>
                        <Button variant="eclipse" onClick={handleNext}>Continuar →</Button>
                      </div>
                    </StepWrapper>
                  )}

                  {step === 4 && (
                    <StepWrapper title="Revisão">
                      <div className="space-y-4 bg-v2-paper-deep rounded-xl p-6 text-sm font-sans">
                        <SummaryRow label="Nome" value={form.nome} />
                        <SummaryRow label="Email" value={form.email} />
                        <SummaryRow label="Idade" value={form.idade || "—"} />
                        <SummaryRow label="País" value={form.pais || "—"} />
                        <SummaryRow label="Sintomas" value={form.sintomas.join(", ") || "—"} />
                        <SummaryRow label="Duração" value={form.duracao_sintomas || "—"} />
                        <SummaryRow label="Histórico" value={form.historico_tratamentos || "—"} />
                        <SummaryRow label="Diagnósticos" value={form.diagnosticos || "—"} />
                      </div>
                      <div className="flex items-start gap-3 mt-6">
                        <Checkbox
                          id="rgpd"
                          checked={form.rgpd_aceite}
                          onCheckedChange={(checked) => updateField("rgpd_aceite", !!checked)}
                          className="mt-0.5"
                        />
                        <label htmlFor="rgpd" className="text-sm font-sans text-v2-ink-mute leading-snug cursor-pointer">
                          Li e aceito a{" "}
                          <a href="/politica-privacidade" className="text-v2-golden underline" target="_blank">
                            Política de Privacidade
                          </a>{" "}
                          e o tratamento dos meus dados para fins clínicos.
                        </label>
                      </div>
                      <div className="flex justify-between pt-6">
                        <Button variant="outline" onClick={goBack}>← Anterior</Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="flex-1 ml-4 h-12 rounded-full bg-foreground text-primary-foreground hover:bg-foreground/90 font-sans text-sm tracking-wide"
                        >
                          {loading ? "A enviar..." : "Submeter Candidatura"}
                        </Button>
                      </div>
                    </StepWrapper>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="py-16 px-6 bg-v2-paper-deep">
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: MessageCircle, text: "Resposta pessoal — nunca automatizada" },
            { icon: Shield, text: "Dados protegidos — RGPD compliant" },
            { icon: Calendar, text: "Sem compromisso até consulta inicial" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <item.icon className="w-5 h-5 text-v2-golden" />
              <p className="text-sm font-sans text-v2-ink">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-v2-paper">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-v2-ink text-center mb-10">Questões frequentes</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "A triagem tem algum custo?", a: "Não. A triagem é gratuita." },
              { q: "O que acontece se não for seleccionada?", a: "Respondo sempre — para avançar, ajustar timing, ou encaminhar." },
              { q: "Posso candidatar-me sem ter decidido fazer o Programa?", a: "Sim. A candidatura leva à consulta inicial — não ao Programa. Sem pressão." },
              { q: "Quanto tempo demora a ter resposta?", a: "48 horas úteis após submissão." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-v2-paper-line">
                <AccordionTrigger className="font-sans text-sm text-v2-ink hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-v2-ink-mute font-sans text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FooterV2 />
    </div>
  );
};

/* Sub-components */
const StepWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h2 className="font-serif text-2xl text-v2-ink">{title}</h2>
    {children}
  </div>
);

const FieldGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-sm font-sans text-v2-ink">{label}</label>
    {children}
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-background pb-2 last:border-0">
    <span className="text-v2-ink-mute">{label}</span>
    <span className="text-v2-ink text-right max-w-[60%]">{value}</span>
  </div>
);

export default Candidatura;
