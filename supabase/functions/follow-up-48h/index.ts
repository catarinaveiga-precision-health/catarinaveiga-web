import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function buildEmailHtml(name: string): string {
  const safeName = name || "there";
  return `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;">
  <tr><td style="background:#9B7B5A;height:4px;"></td></tr>
  <tr><td style="padding:40px 40px 0;">
    <p style="font-family:Georgia,serif;font-size:13px;color:#9B7B5A;text-transform:uppercase;letter-spacing:2px;margin:0 0 24px;">Catarina Veiga · Medicina Funcional</p>
  </td></tr>
  <tr><td style="padding:0 40px;">
    <p style="font-family:Georgia,serif;font-size:18px;color:#1F1A14;line-height:1.6;margin:0 0 20px;">Olá ${safeName},</p>
    <p style="font-family:'Jost',Helvetica,Arial,sans-serif;font-size:15px;color:#4A4540;line-height:1.7;margin:0 0 16px;">Há dois dias recebeste a tua leitura funcional de análises.</p>
    <p style="font-family:'Jost',Helvetica,Arial,sans-serif;font-size:15px;color:#4A4540;line-height:1.7;margin:0 0 16px;">Muitas pessoas que usam esta ferramenta dizem-me a mesma coisa: os exames estavam "normais", mas os sintomas continuam.</p>
    <p style="font-family:'Jost',Helvetica,Arial,sans-serif;font-size:15px;color:#4A4540;line-height:1.7;margin:0 0 16px;">Isto acontece porque os intervalos laboratoriais são definidos para detectar doença — não para optimizar função fisiológica.</p>
    <p style="font-family:'Jost',Helvetica,Arial,sans-serif;font-size:15px;color:#4A4540;line-height:1.7;margin:0 0 8px;">Na consulta inicial analisamos:</p>
    <ul style="font-family:'Jost',Helvetica,Arial,sans-serif;font-size:15px;color:#4A4540;line-height:1.8;margin:0 0 24px;padding-left:20px;">
      <li>padrões entre biomarcadores</li>
      <li>sintomas e história clínica</li>
      <li>possíveis défices funcionais que não aparecem na leitura convencional</li>
    </ul>
  </td></tr>
  <tr><td align="center" style="padding:8px 40px 32px;">
    <a href="https://catarinaveigaagendamento.as.me/" style="display:inline-block;background:#9B7B5A;color:#ffffff;font-family:'Jost',Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;text-decoration:none;padding:14px 32px;border-radius:4px;letter-spacing:0.5px;">Agendar consulta inicial</a>
  </td></tr>
  <tr><td style="padding:0 40px 32px;">
    <p style="font-family:Georgia,serif;font-size:14px;color:#1F1A14;margin:0;">Catarina Veiga</p>
    <p style="font-family:'Jost',Helvetica,Arial,sans-serif;font-size:12px;color:#8C8279;margin:4px 0 0;">Medicina Funcional Integrativa</p>
  </td></tr>
  <tr><td style="background:#9B7B5A;height:2px;"></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Query leads do SEGMENTO A (com exames) com >48h e sem follow-up.
    // Segmento B (sem exames) é processado pela edge function email-sequence-b.
    const { data: leads, error: queryError } = await supabase
      .from("leads_avaliacao")
      .select("id, nome, email")
      .eq("follow_up_sent", false)
      .eq("tem_exames", true)
      .lt("created_at", new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString())
      .not("email", "is", null);

    if (queryError) {
      console.error("Query error:", queryError);
      return new Response(JSON.stringify({ error: queryError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!leads || leads.length === 0) {
      console.log("No leads to follow up.");
      return new Response(JSON.stringify({ sent: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Found ${leads.length} leads for follow-up.`);
    let sentCount = 0;
    let errorCount = 0;

    for (const lead of leads) {
      if (!lead.email) continue;

      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Catarina Veiga <info@catarinaveiga.com>",
            reply_to: "info@catarinaveiga.com",
            to: [lead.email],
            subject: "Uma pergunta sobre os teus exames",
            html: buildEmailHtml(lead.nome || ""),
          }),
        });

        if (!resendRes.ok) {
          const errBody = await resendRes.text();
          console.error(`Resend error for ${lead.id}:`, errBody);
          errorCount++;
          continue; // Don't update follow_up_sent on failure
        }

        console.log(`Email sent to ${lead.id}`);

        // Mark as sent
        const { error: updateError } = await supabase
          .from("leads_avaliacao")
          .update({ follow_up_sent: true } as any)
          .eq("id", lead.id);

        if (updateError) {
          console.error(`Update error for ${lead.id}:`, updateError);
        }

        sentCount++;
      } catch (sendErr) {
        console.error(`Send error for ${lead.id}:`, sendErr);
        errorCount++;
      }
    }

    console.log(`Follow-up complete: ${sentCount} sent, ${errorCount} errors.`);

    return new Response(
      JSON.stringify({ sent: sentCount, errors: errorCount, total: leads.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
