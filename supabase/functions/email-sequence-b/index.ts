// Edge function: email-sequence-b
// Despacha os emails 2, 3, 4 e 5 da Sequência B (Segmento B: leads sem exames).
// Corre periodicamente (pg_cron, 1x/dia). Cada email é marcado na DB para
// idempotência.
//
// Calendário (relativo a created_at do lead):
//   email 2 → +2 dias  · "Porque tantas mulheres ouvem 'está tudo normal'"
//   email 3 → +4 dias  · "Os três sinais que vejo antes de pedir exames"
//   email 4 → +6 dias  · "Os exames que costumo analisar nestes casos"
//   email 5 → +8 dias  · "Quando faz sentido marcar uma consulta?"

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = "info@catarinaveiga.com";
const BOOKING_URL = "https://catarinaveigaagendamento.as.me/";

// ── Email helpers (mesmo wrapper visual do send-emails para consistência) ──

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#F8F5F0;font-family:'Jost',Arial,sans-serif;font-weight:300;color:#1F1A14;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5F0;">
<tr><td align="center" style="padding:40px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;">
<tr><td style="padding:40px 36px;">
${content}
</td></tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:24px 36px 0;text-align:center;font-size:12px;color:#8C8279;">
Catarina Veiga · Medicina Funcional Integrativa
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function heading(text: string): string {
  return `<h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:600;color:#1F1A14;margin:0 0 24px;">${text}</h1>`;
}

function paragraph(text: string): string {
  return `<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:15px;line-height:1.7;color:#3D3529;margin:0 0 16px;">${text}</p>`;
}

function bullets(items: string[]): string {
  return `<ul style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:15px;color:#3D3529;line-height:1.8;margin:0 0 16px;padding-left:20px;">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

function ctaButton(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr><td style="background-color:#9B7B5A;border-radius:6px;padding:14px 32px;"><a href="${url}" style="font-family:'Jost',Arial,sans-serif;font-weight:400;font-size:15px;color:#ffffff;text-decoration:none;display:inline-block;">${text}</a></td></tr></table>`;
}

function divider(): string {
  return `<hr style="border:none;border-top:1px solid #E8E2DA;margin:24px 0;"/>`;
}

function signature(): string {
  return `${divider()}${paragraph("Catarina Veiga")}<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:13px;color:#8C8279;margin:0;">Medicina Funcional Integrativa</p>`;
}

// ── Conteúdo dos emails (texto verbatim do documento de implementação) ──

const emails = {
  2: {
    subject: 'Porque tantas mulheres ouvem "está tudo normal"',
    html: (name: string) => emailWrapper(`
${heading('Porque tantas mulheres ouvem "está tudo normal"')}
${paragraph(`Olá ${name},`)}
${paragraph('Há dois dias falei-te sobre como os sintomas contam parte da história — mesmo sem análises à mão.')}
${paragraph('Hoje quero explicar uma coisa que vejo todos os dias na clínica: valores dentro do intervalo de referência laboratorial nem sempre significam que o teu corpo está a funcionar bem.')}
${paragraph('Os intervalos laboratoriais foram desenhados para detectar doença — não para optimizar função. Por isso, é comum ouvir "está tudo normal" enquanto o cansaço, o peso ou as alterações de ciclo continuam.')}
${paragraph('Sintomas e contexto clínico também contam. Muitas vezes, são eles que apontam para o que vale a pena investigar primeiro.')}
${paragraph('Responde a este email com o sintoma que mais te incomoda neste momento — leio todas as respostas.')}
${signature()}
    `),
    text: (name: string) => `Olá ${name},

Há dois dias falei-te sobre como os sintomas contam parte da história — mesmo sem análises à mão.

Hoje quero explicar uma coisa que vejo todos os dias na clínica: valores dentro do intervalo de referência laboratorial nem sempre significam que o teu corpo está a funcionar bem.

Os intervalos laboratoriais foram desenhados para detectar doença — não para optimizar função. Por isso, é comum ouvir "está tudo normal" enquanto o cansaço, o peso ou as alterações de ciclo continuam.

Sintomas e contexto clínico também contam. Muitas vezes, são eles que apontam para o que vale a pena investigar primeiro.

Responde a este email com o sintoma que mais te incomoda neste momento — leio todas as respostas.

Catarina Veiga
Medicina Funcional Integrativa`,
  },
  3: {
    subject: 'Os três sinais que vejo antes de pedir exames',
    html: (name: string) => emailWrapper(`
${heading('Os três sinais que vejo antes de pedir exames')}
${paragraph(`Olá ${name},`)}
${paragraph('Antes mesmo de olhar para análises, há três padrões que aparecem repetidamente nas mulheres que chegam até mim:')}
${bullets([
  '<strong>Fadiga persistente</strong> — cansaço que não passa com sono, café, ou férias.',
  '<strong>Dificuldade em perder peso</strong> — mesmo com alimentação cuidada e atividade física.',
  '<strong>Alterações hormonais ou emocionais</strong> — ciclos diferentes, oscilações de humor, ansiedade ou irritabilidade sem causa aparente.',
])}
${paragraph('Quando dois ou mais destes sinais aparecem juntos, é altamente provável que exista um padrão fisiológico por trás — não uma característica da idade nem do stress.')}
${paragraph('Se queres perceber como olho para estes padrões na prática clínica, podes conhecer a minha abordagem aqui:')}
${ctaButton('Conhecer a abordagem clínica', 'https://www.catarinaveiga.com/metodo')}
${signature()}
    `),
    text: (name: string) => `Olá ${name},

Antes mesmo de olhar para análises, há três padrões que aparecem repetidamente nas mulheres que chegam até mim:

• Fadiga persistente — cansaço que não passa com sono, café, ou férias.
• Dificuldade em perder peso — mesmo com alimentação cuidada e atividade física.
• Alterações hormonais ou emocionais — ciclos diferentes, oscilações de humor, ansiedade ou irritabilidade sem causa aparente.

Quando dois ou mais destes sinais aparecem juntos, é altamente provável que exista um padrão fisiológico por trás — não uma característica da idade nem do stress.

Se queres perceber como olho para estes padrões na prática clínica, podes conhecer a minha abordagem aqui:
https://www.catarinaveiga.com/metodo

Catarina Veiga
Medicina Funcional Integrativa`,
  },
  4: {
    subject: 'Os exames que costumo analisar nestes casos',
    html: (name: string) => emailWrapper(`
${heading('Os exames que costumo analisar nestes casos')}
${paragraph(`Olá ${name},`)}
${paragraph('Quando uma mulher chega à consulta com fadiga, alterações de ciclo ou dificuldade em perder peso, há famílias de exames que valem quase sempre a pena olhar:')}
${bullets([
  '<strong>Tiróide</strong> — TSH, T3 livre, T4 livre, anticorpos.',
  '<strong>Metabolismo</strong> — insulina em jejum, HbA1c, perfil lipídico.',
  '<strong>Inflamação</strong> — PCR, homocisteína, VS.',
  '<strong>Nutrientes</strong> — ferritina, vitamina D, B12, folato.',
  '<strong>Hormonas</strong> — consoante fase do ciclo e contexto clínico.',
])}
${paragraph('Isto não é uma prescrição — é uma referência educativa. Os exames certos para ti dependem do que estás a sentir e do teu histórico.')}
${paragraph('Numa consulta inicial, fazemos esse mapeamento contigo: que marcadores fazem sentido, em que ordem, e como interpretá-los à luz dos teus sintomas.')}
${ctaButton('Agendar consulta inicial', BOOKING_URL)}
${signature()}
    `),
    text: (name: string) => `Olá ${name},

Quando uma mulher chega à consulta com fadiga, alterações de ciclo ou dificuldade em perder peso, há famílias de exames que valem quase sempre a pena olhar:

• Tiróide — TSH, T3 livre, T4 livre, anticorpos.
• Metabolismo — insulina em jejum, HbA1c, perfil lipídico.
• Inflamação — PCR, homocisteína, VS.
• Nutrientes — ferritina, vitamina D, B12, folato.
• Hormonas — consoante fase do ciclo e contexto clínico.

Isto não é uma prescrição — é uma referência educativa. Os exames certos para ti dependem do que estás a sentir e do teu histórico.

Numa consulta inicial, fazemos esse mapeamento contigo: que marcadores fazem sentido, em que ordem, e como interpretá-los à luz dos teus sintomas.

Agendar consulta inicial: ${BOOKING_URL}

Catarina Veiga
Medicina Funcional Integrativa`,
  },
  5: {
    subject: 'Quando faz sentido marcar uma consulta?',
    html: (name: string) => emailWrapper(`
${heading('Quando faz sentido marcar uma consulta?')}
${paragraph(`Olá ${name},`)}
${paragraph('Ao longo das últimas duas semanas falei-te sobre sintomas, padrões e exames. Hoje quero ser concreta sobre quando uma consulta comigo faz, de facto, sentido.')}
${paragraph('A consulta inicial é útil sobretudo quando:')}
${bullets([
  'Estás em perimenopausa ou notas que o teu corpo mudou nos últimos 1–3 anos.',
  'Sentes fadiga persistente que não melhora com descanso ou alimentação.',
  'Tens dificuldade em perder peso sem causa aparente.',
  'Os teus exames são "normais" mas os sintomas continuam.',
])}
${paragraph('Se duas ou mais destas frases são tuas, vale a pena dar o próximo passo. Numa consulta inicial cruzamos sintomas, história clínica e exames (se existirem) para perceber o que está realmente a acontecer no teu corpo.')}
${ctaButton('Marcar consulta inicial', BOOKING_URL)}
${signature()}
    `),
    text: (name: string) => `Olá ${name},

Ao longo das últimas duas semanas falei-te sobre sintomas, padrões e exames. Hoje quero ser concreta sobre quando uma consulta comigo faz, de facto, sentido.

A consulta inicial é útil sobretudo quando:

• Estás em perimenopausa ou notas que o teu corpo mudou nos últimos 1–3 anos.
• Sentes fadiga persistente que não melhora com descanso ou alimentação.
• Tens dificuldade em perder peso sem causa aparente.
• Os teus exames são "normais" mas os sintomas continuam.

Se duas ou mais destas frases são tuas, vale a pena dar o próximo passo. Numa consulta inicial cruzamos sintomas, história clínica e exames (se existirem) para perceber o que está realmente a acontecer no teu corpo.

Marcar consulta inicial: ${BOOKING_URL}

Catarina Veiga
Medicina Funcional Integrativa`,
  },
};

// ── Envio via Resend ──

async function sendResend(to: string, subject: string, html: string, text: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Catarina Veiga <${FROM_EMAIL}>`,
        reply_to: FROM_EMAIL,
        to: [to],
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ── Handler ──

type EmailNum = 2 | 3 | 4 | 5;

// Cada email tem (delayDays, flagColumn). Lead é elegível para o email N se:
//   created_at < now() - delayDays
//   AND flagColumn = false
//   AND tem_exames = false
const SCHEDULE: Array<{ n: EmailNum; delayDays: number; flag: string }> = [
  { n: 2, delayDays: 2, flag: "seq_b_email_2_sent" },
  { n: 3, delayDays: 4, flag: "seq_b_email_3_sent" },
  { n: 4, delayDays: 6, flag: "seq_b_email_4_sent" },
  { n: 5, delayDays: 8, flag: "seq_b_email_5_sent" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const stats = { processed: 0, sent: 0, errors: 0, by_email: {} as Record<string, number> };

  // Processa do email mais antigo para o mais recente. Cada email N só vai a
  // leads que já estão >= N dias na lista E ainda não receberam o email N.
  for (const slot of SCHEDULE) {
    const cutoff = new Date(Date.now() - slot.delayDays * 24 * 60 * 60 * 1000).toISOString();

    const { data: leads, error: queryError } = await supabase
      .from("leads_avaliacao")
      .select("id, nome, email")
      .eq("tem_exames", false)
      .eq(slot.flag, false)
      .lt("created_at", cutoff)
      .not("email", "is", null);

    if (queryError) {
      console.error(`[email ${slot.n}] query error`, queryError);
      stats.errors++;
      continue;
    }

    if (!leads || leads.length === 0) continue;

    const tpl = emails[slot.n];
    for (const lead of leads) {
      if (!lead.email) continue;
      stats.processed++;

      const name = lead.nome || "Olá";
      const r = await sendResend(lead.email, tpl.subject, tpl.html(name), tpl.text(name));

      if (!r.ok) {
        console.error(`[email ${slot.n}] send error for ${lead.id}`, r.error);
        stats.errors++;
        continue;
      }

      const { error: updErr } = await supabase
        .from("leads_avaliacao")
        .update({ [slot.flag]: true } as any)
        .eq("id", lead.id);

      if (updErr) {
        console.error(`[email ${slot.n}] update flag error for ${lead.id}`, updErr);
        stats.errors++;
        continue;
      }

      stats.sent++;
      stats.by_email[String(slot.n)] = (stats.by_email[String(slot.n)] || 0) + 1;
    }
  }

  console.log("email-sequence-b done", stats);
  return new Response(JSON.stringify(stats), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
