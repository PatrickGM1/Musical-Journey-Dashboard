package com.patrick.musicdash.dto.song;

import jakarta.validation.constraints.*;

public class SongCreate {
  @NotBlank @Size(max = 200)
  public String title;

  @Size(max = 200)
  public String artist;

  @NotBlank @Size(max = 32)
  public String instrument; // Piano, Guitar, etc.

  @Pattern(regexp = "LEARNING|POLISHING|MASTERED")
  public String status;

  @Size(max = 12)
  public String keySig;

  @Min(20) @Max(400)
  public Integer bpm;

  @Size(max = 4000)
  public String notes;
}
