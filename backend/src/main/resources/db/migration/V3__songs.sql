CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'song_status') THEN
    CREATE TYPE song_status AS ENUM ('LEARNING','POLISHING','MASTERED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(200),
  instrument VARCHAR(32) NOT NULL,
  status song_status NOT NULL DEFAULT 'LEARNING',
  key_sig VARCHAR(12),
  bpm INT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
