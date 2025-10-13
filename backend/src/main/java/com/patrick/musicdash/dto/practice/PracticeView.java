package com.patrick.musicdash.dto.practice;

import java.time.LocalDate;
import java.util.UUID;

public class PracticeView {
  public UUID id;
  public LocalDate date;
  public String instrument;
  public String focus;
  public int durationMin;
  public String notes;
  public String mood;
}
