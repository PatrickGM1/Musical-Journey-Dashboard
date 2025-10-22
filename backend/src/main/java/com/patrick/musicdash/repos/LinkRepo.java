package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface LinkRepo extends JpaRepository<Link, UUID> {
}
