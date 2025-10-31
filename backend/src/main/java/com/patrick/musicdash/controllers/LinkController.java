package com.patrick.musicdash.controllers;

import com.patrick.musicdash.dto.link.LinkDtos.*;
import com.patrick.musicdash.entities.Link;
import com.patrick.musicdash.entities.Song;
import com.patrick.musicdash.repos.LinkRepo;
import com.patrick.musicdash.repos.SongRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
public class LinkController {
    private final LinkRepo repo;
    private final SongRepo songRepo;

    @GetMapping
    public List<LinkView> all(@RequestParam(value = "songId", required = false) UUID songId) {
        List<Link> links = repo.findAll();
        if (songId != null) {
            links = links.stream()
                    .filter(l -> l.getSong() != null && l.getSong().getId().equals(songId))
                    .toList();
        }
        return links.stream()
                .sorted(Comparator.comparing(Link::isFavorite).reversed()
                        .thenComparing(Link::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(this::view)
                .toList();
    }

    @PostMapping
    public LinkView add(@RequestBody LinkCreate body) {
        Song song = (body.songId() != null) ? songRepo.findById(body.songId()).orElse(null) : null;
        
        Link saved = repo.save(Link.builder()
                .title(body.title())
                .url(body.url())
                .category(body.category())
                .notes(body.notes())
                .tags(joinTags(body.tags()))
                .favorite(Boolean.TRUE.equals(body.favorite()))
                .createdAt(OffsetDateTime.now())
                .song(song)
                .build());
        return view(saved);
    }

    /** Toggle/set favorite */
    @PatchMapping("/{id}/favorite")
    public LinkView setFavorite(@PathVariable UUID id, @RequestParam boolean value) {
        Link l = repo.findById(id).orElseThrow();
        l.setFavorite(value);
        return view(repo.save(l));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        repo.deleteById(id);
    }

    // ---- helpers ----
    private String joinTags(List<String> tags) {
        if (tags == null || tags.isEmpty())
            return null;
        var cleaned = tags.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .distinct()
                .toList();
        return cleaned.isEmpty() ? null : String.join(",", cleaned);
    }

    private List<String> splitTags(String tags) {
        if (tags == null || tags.isBlank())
            return List.of();
        return Arrays.stream(tags.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    private LinkView view(Link l) {
        return new LinkView(
                l.getId(), l.getTitle(), l.getUrl(), l.getCategory(), l.getNotes(),
                splitTags(l.getTags()), l.isFavorite(), l.getCreatedAt(),
                (l.getSong() != null) ? l.getSong().getId() : null);
    }
}
