package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SongRepo extends JpaRepository<Song, UUID> {
}
