package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.PracticeLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Repository interface for PracticeLog entity operations.
 * Provides CRUD operations and query methods for managing practice session records.
 */
public interface PracticeRepo extends JpaRepository<PracticeLog, UUID> {}
