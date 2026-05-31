-- ============================================================
-- Aletheia · Seed actionables do modo "Regulação do Sistema Nervoso"
-- MVP: 7 actionables · 1 por prioridade validada no modo regulacao_snc
-- ============================================================
-- Pré-requisitos:
--   1. O modo regulacao_snc já existe em clinical_modes.
--   2. A tabela actionables já existe com as colunas:
--      id, mode_key, "order", label, threshold, why,
--      external_link, link_label, tier.
--
-- Nota: docs/apps/aletheia-replit-schema.sql ainda não define actionables.
-- Este ficheiro não cria schema, apenas popula dados.
--
-- Aplicar via:
--   PGCLIENTENCODING=UTF8 psql "$DATABASE_URL" -f docs/apps/aletheia-snc-actionables-seed.sql
-- ============================================================

SET CLIENT_ENCODING = 'UTF8';

INSERT INTO actionables (
  id,
  mode_key,
  "order",
  label,
  threshold,
  why,
  external_link,
  link_label,
  tier
) VALUES
(
  'snc-nsdr-morning',
  'regulacao_snc',
  1,
  'NSDR matinal · 10-20 min',
  'Ouvi áudio NSDR em horizontal, hoje, dentro de 1h após acordar',
  'Reset do estado autonómico antes do dia começar. Em peri e burnout, baixa cortisol matinal e activa ramo ventral do vago.',
  'https://www.youtube.com/watch?v=M0u9GST_j3s',
  'Abrir áudio (Ally Boothroyd · 13 min)',
  'medium'
),
(
  'snc-breath-478-meals',
  'regulacao_snc',
  2,
  'Respiração 4-7-8 · antes das refeições',
  'Fiz 4 ciclos de 4-7-8 antes do almoço, jantar e ao deitar',
  'Activa o vago e prepara digestão. Marca transição entre simpático e parassimpático.',
  'https://www.drweil.com/videos-features/videos/breathing-exercises-4-7-8-breath/',
  'Ver técnica (Dr Andrew Weil · 2 min)',
  'easy'
),
(
  'snc-vagus-direct',
  'regulacao_snc',
  3,
  'Estimulação directa do vago (1/dia)',
  'Fiz hoje uma das técnicas: gargarejar 30s, cantar/zumbir, splash água fria na face, ou exhale longo',
  'Activa directamente o ramo ventral do vago. Qualquer das técnicas serve: escolher uma e fazê-la.',
  'https://hubermanlab.com/episode/improve-flexibility-with-research-supported-stretching-protocols/',
  'Ler protocolo (Polyvagal Theory)',
  'easy'
),
(
  'snc-dry-brushing',
  'regulacao_snc',
  4,
  'Dry brushing · 3-5 min antes do banho',
  'Fiz dry brushing das extremidades para o coração, antes do banho',
  'Estimula sistema linfático e activação sensorial parassimpática. Prepara corpo para o dia.',
  NULL,
  NULL,
  'easy'
),
(
  'snc-evening-reset',
  'regulacao_snc',
  5,
  '15 min alongamento OU NSDR · 30-60 min antes de dormir',
  'Fiz 15 min de alongamento ou ouvi áudio NSDR, entre 30 e 60 min antes de me deitar',
  'Baixa actividade simpática residual do dia e prepara descanso profundo.',
  'https://www.youtube.com/watch?v=hEebnu-_45M',
  'Abrir áudio nocturno (Ally Boothroyd · 20 min)',
  'medium'
),
(
  'snc-conscious-pauses',
  'regulacao_snc',
  6,
  '3 pausas conscientes · 3 min cada',
  'Fiz 3 pausas de 3 min ao longo do dia: respiração lenta, sem ecrã, sem fazer nada',
  'Previne exaustão simpática. Recuperar antes da exaustão, não depois.',
  NULL,
  NULL,
  'easy'
),
(
  'snc-evening-stimuli',
  'regulacao_snc',
  7,
  'Reduzir estímulos depois das 21h',
  'Depois das 21h: luz quente activa, sem ecrãs intensos, óculos amber se precisei',
  'Permite ao parassimpático tomar o leme. Luz e ecrãs intensos mantêm o simpático activo e atrasam adormecer.',
  NULL,
  NULL,
  'medium'
)
ON CONFLICT (id) DO UPDATE SET
  mode_key = EXCLUDED.mode_key,
  "order" = EXCLUDED."order",
  label = EXCLUDED.label,
  threshold = EXCLUDED.threshold,
  why = EXCLUDED.why,
  external_link = EXCLUDED.external_link,
  link_label = EXCLUDED.link_label,
  tier = EXCLUDED.tier;

-- Verificação
SELECT
  id,
  mode_key,
  "order",
  label,
  external_link,
  link_label,
  tier
FROM actionables
WHERE mode_key = 'regulacao_snc'
  AND id LIKE 'snc-%'
ORDER BY "order";
