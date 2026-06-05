import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const FROM_EMAIL = 'info@catarinaveiga.com';
const INTERNAL_EMAIL = 'info@catarinaveiga.com';

interface EmailAttachment {
  content: string; // base64
  filename: string;
}

interface EmailPayload {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: EmailAttachment[];
}

async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return { ok: false, error: err };
    }
    await res.json();
    return { ok: true };
  } catch (e) {
    console.error('Send failed:', e);
    return { ok: false, error: String(e) };
  }
}

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

function ctaButton(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:28px 0;">
<tr><td style="background-color:#9B7B5A;border-radius:6px;padding:14px 32px;">
<a href="${url}" style="font-family:'Jost',Arial,sans-serif;font-weight:400;font-size:15px;color:#ffffff;text-decoration:none;display:inline-block;">${text}</a>
</td></tr>
</table>`;
}

function divider(): string {
  return `<hr style="border:none;border-top:1px solid #E8E2DA;margin:24px 0;"/>`;
}

function signature(): string {
  return `${divider()}${paragraph('Catarina Veiga')}<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:13px;color:#8C8279;margin:0;">Medicina Funcional Integrativa</p>`;
}

// ── AVALIAÇÃO EMAILS · SEGMENTO B (sem exames) ──
// Email 1 da sequência B é enviado imediatamente no submit. Os 4 emails
// seguintes (2/4/6/8 dias) são despachados pela edge function email-sequence-b.

function avaliacaoLeadHtmlSemExames(name: string): string {
  return emailWrapper(`
${heading('Não precisas dos exames para começar')}
${paragraph(`Olá ${name},`)}
${paragraph('Vi que procuras melhorar a tua energia, metabolismo ou composição corporal.')}
${paragraph('Também reparei que não submeteste valores laboratoriais.')}
${paragraph('Isso acontece frequentemente.')}
${paragraph('A maioria das mulheres que chega até mim sabe que algo não está bem, mas não tem os exames à mão ou não sabe quais os marcadores mais relevantes para analisar.')}
${paragraph('A boa notícia é que os sintomas contam uma parte importante da história.')}
${paragraph('Antes mesmo de olhar para análises, existem padrões clínicos que ajudam a identificar possíveis desequilíbrios hormonais, metabólicos e inflamatórios.')}
${paragraph('Nos próximos dias vou enviar-te algumas orientações para te ajudar a compreender melhor o que pode estar por trás do que estás a sentir.')}
${paragraph('Até breve,')}
${signature()}
  `);
}

function avaliacaoLeadTextSemExames(name: string): string {
  return `Olá ${name},

Vi que procuras melhorar a tua energia, metabolismo ou composição corporal.

Também reparei que não submeteste valores laboratoriais.

Isso acontece frequentemente.

A maioria das mulheres que chega até mim sabe que algo não está bem, mas não tem os exames à mão ou não sabe quais os marcadores mais relevantes para analisar.

A boa notícia é que os sintomas contam uma parte importante da história.

Antes mesmo de olhar para análises, existem padrões clínicos que ajudam a identificar possíveis desequilíbrios hormonais, metabólicos e inflamatórios.

Nos próximos dias vou enviar-te algumas orientações para te ajudar a compreender melhor o que pode estar por trás do que estás a sentir.

Até breve,

Catarina Veiga
Medicina Funcional Integrativa`;
}

// ── AVALIAÇÃO EMAILS · SEGMENTO A (com exames) ──

function avaliacaoLeadHtml(name: string, resultados?: unknown): string {
  return emailWrapper(`
${heading('Recebemos a tua leitura funcional')}
${paragraph(`Olá ${name},`)}
${paragraph('Recebemos os dados da tua avaliação funcional de análises.')}
${paragraph('Os valores que introduziste foram analisados dentro de um modelo de medicina funcional, que procura identificar padrões fisiológicos entre biomarcadores — não apenas verificar se estão dentro dos valores laboratoriais de referência.')}
${paragraph('Muitas pessoas descobrem que os seus exames estavam "normais", mas não necessariamente funcionais.')}
${resultados ? `${divider()}${paragraph('<strong>Resumo da tua leitura:</strong>')}${formatResultsHtml(resultados)}` : ''}
${paragraph('Em alguns casos, estes padrões podem ajudar a explicar sintomas persistentes como fadiga, alterações hormonais, dificuldades digestivas ou stress fisiológico.')}
${paragraph('Se quiseres uma leitura clínica completa — integrando sintomas, história clínica e exames — podes agendar uma consulta inicial aqui:')}
${ctaButton('Agendar consulta inicial', 'https://catarinaveigaagendamento.as.me/')}
<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:12px;color:#8C8279;margin:24px 0 0;font-style:italic;">Esta avaliação tem fins educativos e não substitui uma avaliação clínica individual.</p>
${signature()}
  `);
}

function avaliacaoLeadText(name: string, resultados?: unknown): string {
  const resultsBlock = resultados ? `\n---\nResumo da tua leitura:\n${formatResultsText(resultados)}\n` : '';
  return `Olá ${name},

Recebemos os dados da tua avaliação funcional de análises.

Os valores que introduziste foram analisados dentro de um modelo de medicina funcional, que procura identificar padrões fisiológicos entre biomarcadores — não apenas verificar se estão dentro dos valores laboratoriais de referência.

Muitas pessoas descobrem que os seus exames estavam "normais", mas não necessariamente funcionais.
${resultsBlock}
Em alguns casos, estes padrões podem ajudar a explicar sintomas persistentes como fadiga, alterações hormonais, dificuldades digestivas ou stress fisiológico.

Se quiseres uma leitura clínica completa — integrando sintomas, história clínica e exames — podes agendar uma consulta inicial aqui:
https://catarinaveigaagendamento.as.me/

---
Esta avaliação tem fins educativos e não substitui uma avaliação clínica individual.

Catarina Veiga
Medicina Funcional Integrativa`;
}

function formatLabValues(labValues: Record<string, unknown> | undefined): string {
  if (!labValues || typeof labValues !== 'object') return '—';
  const labels: Record<string, string> = {
    tsh: 'TSH', t3_livre: 'T3 Livre', t4_livre: 'T4 Livre',
    ferritina: 'Ferritina', ferro_serico: 'Ferro Sérico', transferrina: 'Transferrina',
    pcr: 'PCR', homocisteina: 'Homocisteína', vsg: 'VS',
    vitamina_d: 'Vitamina D', vitamina_b12: 'Vitamina B12', acido_folico: 'Ácido Fólico',
    cortisol: 'Cortisol (manhã)', dhea: 'DHEA-S', estradiol: 'Estradiol',
  };
  // Suporta o novo formato { values, units } e o antigo (valores soltos).
  const lv = labValues as { values?: Record<string, unknown>; units?: Record<string, unknown> };
  const values = (lv.values && typeof lv.values === 'object') ? lv.values : labValues;
  const units = (lv.units && typeof lv.units === 'object') ? lv.units : {};
  const rows = Object.entries(values)
    .filter(([, v]) => v && String(v).trim() !== '')
    .map(([k, v]) => {
      const unit = units[k] ? ` ${units[k]}` : '';
      return `<tr><td style="padding-right:12px;font-weight:400;">${labels[k] || k}:</td><td>${v}${unit}</td></tr>`;
    })
    .join('');
  return rows || '—';
}

function formatResultsHtml(resultados: unknown): string {
  if (!Array.isArray(resultados) || resultados.length === 0) return paragraph('Sem resultados.');
  return resultados.map((r: { marker?: string; value?: string; unit?: string; note?: string; implausible?: boolean }) => {
    const valueLine = `${r.value || '—'}${r.unit ? ` ${r.unit}` : ''}${r.implausible ? ' &nbsp;<span style="color:#9B7B5A;">⚠ FORA de intervalo plausível — confirmar unidade</span>' : ''}`;
    return `<p style="font-family:'Jost',Arial,sans-serif;font-weight:400;font-size:14px;color:#1F1A14;margin:0 0 2px;"><strong>${r.marker || '—'}:</strong> ${valueLine}</p>
<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:13px;color:#3D3529;margin:0 0 16px;">${r.note || ''}</p>`;
  }).join('');
}

function formatResultsText(resultados: unknown): string {
  if (!Array.isArray(resultados) || resultados.length === 0) return 'Sem resultados.';
  return resultados.map((r: { marker?: string; value?: string; unit?: string; note?: string; implausible?: boolean }) =>
    `${r.marker || '—'}: ${r.value || '—'}${r.unit ? ` ${r.unit}` : ''}${r.implausible ? '  [⚠ FORA de intervalo plausível — confirmar unidade]' : ''}\n${r.note || ''}`
  ).join('\n\n');
}

function avaliacaoInternalHtml(data: Record<string, unknown>): string {
  const goals = Array.isArray(data.objetivos) ? data.objetivos.join(', ') : (data.objetivos || '—');
  const labRows = formatLabValues(data.valores_laboratoriais as Record<string, unknown> | undefined);
  return emailWrapper(`
${heading('Nova avaliação submetida')}
${paragraph('Nova avaliação funcional recebida.')}
<table style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:14px;color:#3D3529;line-height:1.8;">
<tr><td style="padding-right:12px;font-weight:400;">Nome:</td><td>${data.nome || '—'}</td></tr>
<tr><td style="padding-right:12px;font-weight:400;">Email:</td><td>${data.email || '—'}</td></tr>
<tr><td style="padding-right:12px;font-weight:400;">Idade:</td><td>${data.idade || '—'}</td></tr>
<tr><td style="padding-right:12px;font-weight:400;">Sexo:</td><td>${data.sexo || '—'}</td></tr>
<tr><td style="padding-right:12px;font-weight:400;">Objetivos:</td><td>${goals}</td></tr>
</table>
${divider()}
${paragraph('<strong>Valores laboratoriais:</strong>')}
<table style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:14px;color:#3D3529;line-height:1.8;">
${labRows}
</table>
${divider()}
${paragraph('<strong>Resumo por marcador:</strong>')}
${formatResultsHtml(data.resultados)}
${divider()}
<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:12px;color:#8C8279;">Data: ${data.created_at || new Date().toISOString()}</p>
  `);
}

function formatLabValuesText(labValues: Record<string, unknown> | undefined): string {
  if (!labValues || typeof labValues !== 'object') return '—';
  const labels: Record<string, string> = {
    tsh: 'TSH', t3_livre: 'T3 Livre', t4_livre: 'T4 Livre',
    ferritina: 'Ferritina', ferro_serico: 'Ferro Sérico', transferrina: 'Transferrina',
    pcr: 'PCR', homocisteina: 'Homocisteína', vsg: 'VS',
    vitamina_d: 'Vitamina D', vitamina_b12: 'Vitamina B12', acido_folico: 'Ácido Fólico',
    cortisol: 'Cortisol (manhã)', dhea: 'DHEA-S', estradiol: 'Estradiol',
  };
  const lv = labValues as { values?: Record<string, unknown>; units?: Record<string, unknown> };
  const values = (lv.values && typeof lv.values === 'object') ? lv.values : labValues;
  const units = (lv.units && typeof lv.units === 'object') ? lv.units : {};
  return Object.entries(values)
    .filter(([, v]) => v && String(v).trim() !== '')
    .map(([k, v]) => `${labels[k] || k}: ${v}${units[k] ? ` ${units[k]}` : ''}`)
    .join('\n') || '—';
}

function avaliacaoInternalText(data: Record<string, unknown>): string {
  const goals = Array.isArray(data.objetivos) ? data.objetivos.join(', ') : (data.objetivos || '—');
  return `Nova avaliação submetida.

Nome: ${data.nome || '—'}
Email: ${data.email || '—'}
Idade: ${data.idade || '—'}
Sexo: ${data.sexo || '—'}
Objetivos: ${goals}

Valores laboratoriais:
${formatLabValuesText(data.valores_laboratoriais as Record<string, unknown> | undefined)}

Resumo por marcador:
${formatResultsText(data.resultados)}

Data: ${data.created_at || new Date().toISOString()}`;
}

// ── CANDIDATURA EMAILS ──

function candidaturaLeadHtml(name: string): string {
  return emailWrapper(`
${heading('Recebemos a tua candidatura')}
${paragraph(`Olá ${name},`)}
${paragraph('Recebemos a tua candidatura ao Programa Fundação.')}
${paragraph('Este programa envolve acompanhamento clínico estruturado e, por isso, todas as candidaturas são analisadas antes de confirmar a entrada.')}
${paragraph('Nos próximos dias úteis iremos rever a informação enviada e entrar em contacto contigo para indicar o próximo passo.')}
${paragraph('Obrigada pelo interesse no meu trabalho.')}
${signature()}
  `);
}

function candidaturaLeadText(name: string): string {
  return `Olá ${name},

Recebemos a tua candidatura ao Programa Fundação.

Este programa envolve acompanhamento clínico estruturado e, por isso, todas as candidaturas são analisadas antes de confirmar a entrada.

Nos próximos dias úteis iremos rever a informação enviada e entrar em contacto contigo para indicar o próximo passo.

Obrigada pelo interesse no meu trabalho.

Catarina Veiga
Medicina Funcional Integrativa`;
}

function candidaturaInternalHtml(data: Record<string, unknown>): string {
  return emailWrapper(`
${heading('🔔 Nova candidatura ao Programa Fundação')}
${paragraph('Nova candidatura recebida.')}
<table style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:14px;color:#3D3529;line-height:1.8;">
<tr><td style="padding-right:12px;font-weight:400;">Nome:</td><td>${data.nome || '—'}</td></tr>
<tr><td style="padding-right:12px;font-weight:400;">Email:</td><td>${data.email || '—'}</td></tr>
<tr><td style="padding-right:12px;font-weight:400;">Telefone:</td><td>${data.telefone || '—'}</td></tr>
</table>
${divider()}
<p style="font-family:'Jost',Arial,sans-serif;font-weight:300;font-size:12px;color:#8C8279;">Data: ${data.created_at || new Date().toISOString()}</p>
  `);
}

function candidaturaInternalText(data: Record<string, unknown>): string {
  return `Nova candidatura recebida.

Nome: ${data.nome || '—'}
Email: ${data.email || '—'}
Telefone: ${data.telefone || '—'}

Data: ${data.created_at || new Date().toISOString()}`;
}

// ── HANDLER ──

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { table, record, pdf_attachment } = body;

    if (!table || !record) {
      return new Response(JSON.stringify({ error: 'Missing table or record' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: { email: string; ok: boolean; error?: string }[] = [];

    if (table === 'leads_avaliacao') {
      const name = record.nome || 'Olá';
      const leadEmail = record.email;
      // Segmentação: tem_exames vem do frontend; fallback inspecciona o JSON
      // para registos antigos ou casos em que a flag não foi enviada.
      const lv = record.valores_laboratoriais as { values?: Record<string, unknown> } | undefined;
      const hasAnyValue = lv?.values && typeof lv.values === 'object'
        ? Object.values(lv.values).some((v) => v && String(v).trim() !== '')
        : false;
      const temExames: boolean = typeof record.tem_exames === 'boolean'
        ? record.tem_exames
        : hasAnyValue;

      if (leadEmail) {
        if (temExames) {
          // SEGMENTO A — com exames: leitura funcional + PDF anexo
          const attachments: EmailAttachment[] = [];
          if (pdf_attachment?.content && pdf_attachment?.filename) {
            attachments.push({ content: pdf_attachment.content, filename: pdf_attachment.filename });
          }
          const rA = await sendEmail({
            from: FROM_EMAIL,
            to: [leadEmail],
            reply_to: FROM_EMAIL,
            subject: 'Recebemos a tua leitura funcional',
            html: avaliacaoLeadHtml(name, record.resultados),
            text: avaliacaoLeadText(name, record.resultados),
            attachments: attachments.length > 0 ? attachments : undefined,
          });
          results.push({ email: leadEmail, segmento: 'A', ...rA });
        } else {
          // SEGMENTO B — sem exames: email 1 da sequência B (imediato)
          const rB1 = await sendEmail({
            from: FROM_EMAIL,
            to: [leadEmail],
            reply_to: FROM_EMAIL,
            subject: 'Não precisas dos exames para começar',
            html: avaliacaoLeadHtmlSemExames(name),
            text: avaliacaoLeadTextSemExames(name),
          });
          results.push({ email: leadEmail, segmento: 'B', email_seq: 1, ...rB1 });

          // Marcar seq_b_email_1_sent = true na DB (best effort).
          if (rB1.ok && record.id) {
            try {
              const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
              await supabase
                .from('leads_avaliacao')
                .update({ seq_b_email_1_sent: true } as any)
                .eq('id', record.id);
            } catch (e) {
              console.error('Failed to mark seq_b_email_1_sent', e);
            }
          }
        }
      }

      const r2 = await sendEmail({
        from: FROM_EMAIL,
        to: [INTERNAL_EMAIL],
        subject: 'Nova avaliação submetida',
        html: avaliacaoInternalHtml(record),
        text: avaliacaoInternalText(record),
      });
      results.push({ email: INTERNAL_EMAIL + ' (internal)', ...r2 });

    } else if (table === 'leads_candidatura') {
      const name = record.nome || 'Olá';
      const leadEmail = record.email;

      if (leadEmail) {
        const r3 = await sendEmail({
          from: FROM_EMAIL,
          to: [leadEmail],
          reply_to: FROM_EMAIL,
          subject: 'Recebemos a tua candidatura',
          html: candidaturaLeadHtml(name),
          text: candidaturaLeadText(name),
        });
        results.push({ email: leadEmail, ...r3 });
      }

      const r4 = await sendEmail({
        from: FROM_EMAIL,
        to: [INTERNAL_EMAIL],
        subject: '🔔 Nova candidatura ao Programa Fundação',
        html: candidaturaInternalHtml(record),
        text: candidaturaInternalText(record),
      });
      results.push({ email: INTERNAL_EMAIL + ' (internal)', ...r4 });

    } else {
      return new Response(JSON.stringify({ error: `Unknown table: ${table}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error('Edge function error:', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
