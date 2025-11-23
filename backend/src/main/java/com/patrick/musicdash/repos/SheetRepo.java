package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Repository interface for Sheet entity operations.
 * Provides CRUD operations and query methods for managing uploaded sheet music files.
 */
public interface SheetRepo extends JpaRepository<Sheet, UUID> {
}
