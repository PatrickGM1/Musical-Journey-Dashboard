package com.patrick.musicdash.controllers;

import com.patrick.musicdash.dto.song.SongCreate;
import com.patrick.musicdash.dto.song.SongView;
import com.patrick.musicdash.entities.Song;
import com.patrick.musicdash.repos.SongRepo;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/songs")
public class SongController {
  private final SongRepo repo;
  public SongController(SongRepo repo) { this.repo = repo; }

  @GetMapping
  public List<SongView> list() {
    return repo.findAll().stream().map(this::view).collect(Collectors.toList());
  }

  @PostMapping
  public SongView create(@RequestBody @Valid SongCreate in) {
    var status = in.status == null ? Song.Status.LEARNING : Song.Status.valueOf(in.status);
    Song s = Song.builder()
        .title(in.title)
        .artist(in.artist)
        .instrument(in.instrument)
        .status(status)
        .keySig(in.keySig)
        .bpm(in.bpm)
        .notes(in.notes)
        .build();
    return view(repo.save(s));
  }

  @PatchMapping("/{id}/status/{status}")
  public SongView updateStatus(@PathVariable UUID id, @PathVariable String status) {
    var s = repo.findById(id).orElseThrow();
    s.setStatus(Song.Status.valueOf(status));
    return view(repo.save(s));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable UUID id) { repo.deleteById(id); }

  private SongView view(Song s) {
    var v = new SongView();
    v.id = s.getId();
    v.title = s.getTitle();
    v.artist = s.getArtist();
    v.instrument = s.getInstrument();
    v.status = s.getStatus().name();
    v.keySig = s.getKeySig();
    v.bpm = s.getBpm();
    v.notes = s.getNotes();
    return v;
  }
}
