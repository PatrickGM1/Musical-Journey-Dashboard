package com.patrick.musicdash.controllers;

import com.patrick.musicdash.dto.sheet.SheetView;
import com.patrick.musicdash.entities.Sheet;
import com.patrick.musicdash.repos.SheetRepo;
import com.patrick.musicdash.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

  @GetMapping
  public List<SheetView> list() {
    return repo.findAll().stream().map(this::view).collect(Collectors.toList());
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public SheetView upload(@RequestPart("file") MultipartFile file,
                          @RequestPart(value = "instrument", required = false) String instrument,
                          @RequestPart(value = "songTitle", required = false) String songTitle)
      throws IOException {

    if (file == null || file.isEmpty()) {
      throw new IllegalArgumentException("Empty file");
    }

    String stored = storage.save(file);

    Sheet saved = repo.save(
        Sheet.builder()
            .originalName(file.getOriginalFilename())
            .contentType(file.getContentType())
            .sizeBytes(file.getSize())
            .instrument(instrument)
            .songTitle(songTitle)
            .storedName(stored)
            .uploadedAt(OffsetDateTime.now())
            .build()
    );

    return view(saved);
  }

  @GetMapping("/{id}/download")
  public ResponseEntity<FileSystemResource> download(@PathVariable UUID id) throws IOException {
    Sheet s = repo.findById(id).orElseThrow();
    FileSystemResource file = new FileSystemResource(storage.pathOf(s.getStoredName()));
    if (!file.exists()) return ResponseEntity.notFound().build();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentDisposition(
        ContentDisposition.attachment().filename(s.getOriginalName()).build()
    );
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
    return v;
  }
}
