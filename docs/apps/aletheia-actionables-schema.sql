-- ============================================================
-- Aletheia · Schema Actionables
-- Catálogo de actionables + check-offs diários binários
-- ============================================================
-- Aplicar antes de seeds como:
--   docs/apps/aletheia-snc-actionables-seed.sql
--
-- Aplicar via:
--   PGCLIENTENCODING=UTF8 psql "$DATABASE_URL" -f docs/apps/aletheia-actionables-schema.sql
-- ============================================================

SET CLIENT_ENCODING = 'UTF8';

-- Catálogo estático de actionables atribuíveis por modo clínico.
CREATE TABLE IF NOT EXISTS actionables (
  id TEXT PRIMARY KEY,
  mode_key TEXT NOT NULL REFERENCES clinical_modes(mode_key) ON DELETE CASCADE,

  "order" INTEGER NOT NULL DEFAULT 0,
  label TEXT NOT NULL,
  threshold TEXT NOT NULL,
  why TEXT NOT NULL,

  external_link TEXT,
  link_label TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('easy', 'medium', 'hard')),

  active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_actionables_mode_order
  ON actionables(mode_key, "order");

CREATE INDEX IF NOT EXISTS idx_actionables_active
  ON actionables(active);

-- Check-offs diários. Tracking MVP: fiz / não fiz.
CREATE TABLE IF NOT EXISTS actionable_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actionable_id TEXT NOT NULL REFERENCES actionables(id) ON DELETE CASCADE,

  completion_date DATE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT TRUE,
  completed_at TIMESTAMPTZ,
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (user_id, actionable_id, completion_date)
);

CREATE INDEX IF NOT EXISTS idx_actionable_completions_user_date
  ON actionable_completions(user_id, completion_date DESC);

CREATE INDEX IF NOT EXISTS idx_actionable_completions_actionable
  ON actionable_completions(actionable_id);

-- Verificação
SELECT
  'actionables' AS table_name,
  count(*) AS existing_rows
FROM actionables
UNION ALL
SELECT
  'actionable_completions' AS table_name,
  count(*) AS existing_rows
FROM actionable_completions;
