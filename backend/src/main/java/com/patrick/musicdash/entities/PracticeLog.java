package com.patrick.musicdash.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "practice_logs")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PracticeLog {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(nullable = false)
  private LocalDate date;

  @Column(nullable = false, length = 32)
  private String instrument;

  private String focus;

  @Column(name = "duration_min", nullable = false)
  private int durationMin;

  private String notes;

  @Column(length = 8)
  private String mood;
}
