-- Funil Pós Lead Magnet · Fase 1
-- Segmentação automática (A com exames / B sem exames) + sequência email B.

-- 1. Coluna tem_exames + flags da sequência B (emails 2..5 — o 1 é imediato e
--    é enviado pela edge function send-emails no submit).
ALTER TABLE public.leads_avaliacao
  ADD COLUMN IF NOT EXISTS tem_exames boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS seq_b_email_1_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS seq_b_email_2_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS seq_b_email_3_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS seq_b_email_4_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS seq_b_email_5_sent boolean NOT NULL DEFAULT false;

-- 2. Backfill tem_exames para os registos históricos: detectar se há pelo menos
--    um valor laboratorial preenchido em valores_laboratoriais.values.
UPDATE public.leads_avaliacao
SET tem_exames = EXISTS (
  SELECT 1
  FROM jsonb_each_text(
    COALESCE(valores_laboratoriais -> 'values', '{}'::jsonb)
  )
  WHERE value IS NOT NULL AND btrim(value) <> ''
)
WHERE valores_laboratoriais IS NOT NULL;

-- 3. Índice para o cron do email-sequence-b: filtra rapidamente por
--    tem_exames=false e flags por enviar.
CREATE INDEX IF NOT EXISTS idx_leads_avaliacao_seq_b
  ON public.leads_avaliacao (created_at)
  WHERE tem_exames = false;

-- 4. Atualizar pg_cron do follow-up-48h: restringir ao Segmento A
--    (tem_exames = true) para não duplicar com a sequência B.
--    Implementação: a edge function follow-up-48h já lê leads_avaliacao;
--    o filtro tem_exames é aplicado dentro da função (ver código TS).
--    Aqui apenas garantimos que o cron existente continua a apontar para a
--    função certa — sem alterações de schedule.

-- 5. Comentários documentais (para futuras leituras na DB).
COMMENT ON COLUMN public.leads_avaliacao.tem_exames IS
  'TRUE se a lead submeteu pelo menos 1 valor laboratorial. Define o segmento A (true) vs B (false).';
COMMENT ON COLUMN public.leads_avaliacao.seq_b_email_1_sent IS
  'Email 1 da sequência B (imediato). Marcado pela edge function send-emails.';
COMMENT ON COLUMN public.leads_avaliacao.seq_b_email_2_sent IS
  'Email 2 da sequência B (+2 dias). Marcado pela edge function email-sequence-b.';
COMMENT ON COLUMN public.leads_avaliacao.seq_b_email_3_sent IS
  'Email 3 da sequência B (+4 dias).';
COMMENT ON COLUMN public.leads_avaliacao.seq_b_email_4_sent IS
  'Email 4 da sequência B (+6 dias).';
COMMENT ON COLUMN public.leads_avaliacao.seq_b_email_5_sent IS
  'Email 5 da sequência B (+8 dias).';
