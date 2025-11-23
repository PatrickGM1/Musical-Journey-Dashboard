package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

/**
 * Repository interface for Song entity operations.
 * Provides CRUD operations and query methods for managing songs in the repertoire.
 */
public interface SongRepo extends JpaRepository<Song, UUID> {
}
