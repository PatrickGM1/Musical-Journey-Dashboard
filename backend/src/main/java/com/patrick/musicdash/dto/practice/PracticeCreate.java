package com.patrick.musicdash.dto.practice;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class PracticeCreate {
  @NotNull public LocalDate date;
  @NotBlank @Size(max = 32) public String instrument;
  @Size(max = 1000) public String focus;
  @Min(1) public int durationMin;
  @Size(max = 4000) public String notes;
  @Size(max = 8) public String mood;
}
