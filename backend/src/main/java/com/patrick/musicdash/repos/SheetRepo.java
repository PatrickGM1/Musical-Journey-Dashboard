package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SheetRepo extends JpaRepository<Sheet, UUID> {
}
