CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE sheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_name VARCHAR(255) NOT NULL,
  content_type  VARCHAR(127),
  size_bytes    BIGINT NOT NULL,
  instrument    VARCHAR(32),
  song_title    VARCHAR(200),
  stored_name   VARCHAR(80) NOT NULL,
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
