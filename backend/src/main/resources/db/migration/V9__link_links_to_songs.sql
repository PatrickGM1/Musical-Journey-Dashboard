ALTER TABLE links
  ADD COLUMN song_id UUID,
  ADD CONSTRAINT fk_links_song
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_links_song ON links(song_id);
