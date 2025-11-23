package com.patrick.musicdash.controllers;

import com.patrick.musicdash.dto.practice.PracticeCreate;
import com.patrick.musicdash.dto.practice.PracticeView;
import com.patrick.musicdash.entities.PracticeLog;
import com.patrick.musicdash.repos.PracticeRepo;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * REST controller for managing practice session logs.
 * Tracks daily practice activities and provides analytics data.
 */
@RestController
@RequestMapping("/api/practice")
public class PracticeController {

  private final PracticeRepo repo;

  public PracticeController(PracticeRepo repo) {
    this.repo = repo;
  }

  /**
   * Retrieves all practice logs.
   * @return list of all practice sessions
   */
  @GetMapping
  public List<PracticeView> list() {
    return repo.findAll().stream().map(this::view).collect(Collectors.toList());
  }

  /**
   * Creates a new practice log entry.
   * @param in practice session data
   * @return the created practice log
   */
  @PostMapping
  public PracticeView create(@RequestBody @Valid PracticeCreate in) {
    PracticeLog p = PracticeLog.builder()
        .date(in.date)
        .instrument(in.instrument)
        .focus(in.focus)
        .durationMin(in.durationMin)
        .notes(in.notes)
        .mood(in.mood)
        .build();
    return view(repo.save(p));
  }

  /**
   * Deletes a practice log entry.
   * @param id practice log ID to delete
   */
  @DeleteMapping("/{id}")
  public void delete(@PathVariable UUID id) {
    repo.deleteById(id);
  }

  private PracticeView view(PracticeLog p) {
    PracticeView v = new PracticeView();
    v.id = p.getId();
    v.date = p.getDate();
    v.instrument = p.getInstrument();
    v.focus = p.getFocus();
    v.durationMin = p.getDurationMin();
    v.notes = p.getNotes();
    v.mood = p.getMood();
    return v;
  }
}
