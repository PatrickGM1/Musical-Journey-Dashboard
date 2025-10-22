package com.patrick.musicdash.controllers;

import com.patrick.musicdash.dto.link.LinkDtos.*;
import com.patrick.musicdash.entities.Link;
import com.patrick.musicdash.repos.LinkRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
public class LinkController {

    private final LinkRepo repo;

    @GetMapping
    public List<LinkView> all() {
        return repo.findAll()
                .stream()
                .map(l -> new LinkView(l.getId(), l.getTitle(), l.getUrl(), l.getCategory(), l.getNotes(),
                        l.getCreatedAt()))
                .toList();
    }

    @PostMapping
    public LinkView add(@RequestBody LinkCreate body) {
        Link saved = repo.save(Link.builder()
                .title(body.title())
                .url(body.url())
                .category(body.category())
                .notes(body.notes())
                .createdAt(OffsetDateTime.now())
                .build());
        return new LinkView(saved.getId(), saved.getTitle(), saved.getUrl(), saved.getCategory(), saved.getNotes(),
                saved.getCreatedAt());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        repo.deleteById(id);
    }
}
