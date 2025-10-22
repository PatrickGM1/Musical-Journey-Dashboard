ALTER TABLE sheets
  ADD COLUMN song_id UUID,
  ADD CONSTRAINT fk_sheets_song
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_sheets_song ON sheets(song_id);
