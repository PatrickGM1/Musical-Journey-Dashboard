CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS practice_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  instrument VARCHAR(32) NOT NULL,
  focus TEXT,
  duration_min INT NOT NULL CHECK (duration_min > 0),
  notes TEXT,
  mood VARCHAR(8)
);