package com.patrick.musicdash.repos;

import com.patrick.musicdash.entities.PracticeLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PracticeRepo extends JpaRepository<PracticeLog, UUID> {}
