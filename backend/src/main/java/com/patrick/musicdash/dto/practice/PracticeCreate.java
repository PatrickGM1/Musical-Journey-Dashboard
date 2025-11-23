package com.patrick.musicdash.dto.practice;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

/**
 * Data transfer object for creating a new practice log.
 * Contains validation constraints for practice session input.
 */
public class PracticeCreate {
  /** Practice date (required) */
  @NotNull public LocalDate date;
  /** Instrument practiced (required, max 32 chars) */
  @NotBlank @Size(max = 32) public String instrument;
  /** Focus area or piece practiced (max 1000 chars) */
  @Size(max = 1000) public String focus;
  /** Duration in minutes (minimum 1) */
  @Min(1) public int durationMin;
  /** Additional notes (max 4000 chars) */
  @Size(max = 4000) public String notes;
  /** Mood during practice, e.g., good, tired (max 8 chars) */
  @Size(max = 8) public String mood;
}
