package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

/**
 * Repository interface for Link entity operations.
 * Provides CRUD operations and query methods for managing web links and resources.
 */
public interface LinkRepo extends JpaRepository<Link, UUID> {
}
