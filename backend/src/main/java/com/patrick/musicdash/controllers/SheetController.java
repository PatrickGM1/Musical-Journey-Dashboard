package com.patrick.musicdash.controllers;

import com.patrick.musicdash.dto.sheet.SheetView;
import com.patrick.musicdash.entities.Sheet;
import com.patrick.musicdash.repos.SheetRepo;
import com.patrick.musicdash.repos.SongRepo;
import com.patrick.musicdash.entities.Song;
import com.patrick.musicdash.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sheets")
@RequiredArgsConstructor
public class SheetController {

  private final SheetRepo repo;
  private final StorageService storage;
  private final SongRepo songRepo;

  @GetMapping
  public List<SheetView> list(@RequestParam(value = "songId", required = false) UUID songId) {
    List<Sheet> all = (songId == null)
        ? repo.findAll()
        : repo.findAll().stream()
            .filter(s -> s.getSong() != null && s.getSong().getId().equals(songId))
            .collect(Collectors.toList());
    return all.stream().map(this::view).collect(Collectors.toList());
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public SheetView upload(@RequestPart("file") MultipartFile file,
                          @RequestParam(value = "instrument", required = false) String instrument,
                          @RequestParam(value = "songTitle", required = false) String songTitle,
                          @RequestParam(value = "songId", required = false) UUID songId)
      throws IOException {

    if (file == null || file.isEmpty()) {
      throw new IllegalArgumentException("Empty file");
    }

  String stored = storage.save(file);

  Song song = (songId != null) ? songRepo.findById(songId).orElse(null) : null;

  Sheet saved = repo.save(
    Sheet.builder()
      .originalName(file.getOriginalFilename())
      .contentType(file.getContentType())
      .sizeBytes(file.getSize())
      .instrument(instrument)
      .songTitle(songTitle)
      .storedName(stored)
      .uploadedAt(OffsetDateTime.now())
      .song(song)
      .build()
  );

  return view(saved);
  }

  @GetMapping("/{id}/download")
  public ResponseEntity<FileSystemResource> download(
      @PathVariable UUID id,
      @RequestParam(value = "inline", required = false, defaultValue = "false") boolean inline
  ) throws IOException {
    Sheet s = repo.findById(id).orElseThrow();
    FileSystemResource file = new FileSystemResource(storage.pathOf(s.getStoredName()));
    if (!file.exists()) return ResponseEntity.notFound().build();

    HttpHeaders headers = new HttpHeaders();
    
    // Use inline disposition for preview, attachment for download
    if (inline) {
      headers.setContentDisposition(
          ContentDisposition.inline().filename(s.getOriginalName()).build()
      );
    } else {
      headers.setContentDisposition(
          ContentDisposition.attachment().filename(s.getOriginalName()).build()
      );
    }
    
    MediaType mt = (s.getContentType() != null)
        ? MediaType.parseMediaType(s.getContentType())
        : MediaType.APPLICATION_OCTET_STREAM;
    headers.setContentType(mt);
    headers.setContentLength(file.contentLength());

    return new ResponseEntity<>(file, headers, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable UUID id) throws IOException {
    Sheet s = repo.findById(id).orElseThrow();
    storage.delete(s.getStoredName());
    repo.deleteById(id);
  }

  private SheetView view(Sheet s) {
    SheetView v = new SheetView();
    v.id = s.getId();
    v.originalName = s.getOriginalName();
    v.contentType = s.getContentType();
    v.sizeBytes = s.getSizeBytes();
    v.instrument = s.getInstrument();
    v.songTitle = s.getSongTitle();
    v.uploadedAt = s.getUploadedAt();
    v.songId = (s.getSong() != null) ? s.getSong().getId() : null;
    return v;
  }
}
