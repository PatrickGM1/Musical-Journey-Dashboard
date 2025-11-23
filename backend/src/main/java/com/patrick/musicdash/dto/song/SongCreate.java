package com.patrick.musicdash.dto.song;

import jakarta.validation.constraints.*;

/**
 * Data transfer object for creating a new song.
 * Contains validation constraints for input data.
 */
public class SongCreate {
  /** Song title (required, max 200 chars) */
  @NotBlank @Size(max = 200)
  public String title;

  /** Artist or composer name (optional, max 200 chars) */
  @Size(max = 200)
  public String artist;

  /** Instrument type, e.g., Piano, Guitar (required, max 32 chars) */
  @NotBlank @Size(max = 32)
  public String instrument;

  /** Learning status: LEARNING, POLISHING, or MASTERED */
  @Pattern(regexp = "LEARNING|POLISHING|MASTERED")
  public String status;

  /** Key signature, e.g., C, Am, F#m (max 12 chars) */
  @Size(max = 12)
  public String keySig;

  /** Tempo in beats per minute (20-400) */
  @Min(20) @Max(400)
  public Integer bpm;

  /** Additional notes or comments (max 4000 chars) */
  @Size(max = 4000)
  public String notes;
}
