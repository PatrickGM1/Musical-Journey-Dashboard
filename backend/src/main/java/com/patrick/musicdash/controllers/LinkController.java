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

/**
 * REST controller for managing web links and resources.
 * Handles URLs to tutorials, videos, backing tracks, and other online content.
 * Links can be categorized, tagged, favorited, and associated with specific songs.
 */
@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
public class LinkController {
    private final LinkRepo repo;
    private final SongRepo songRepo;

    /**
     * Retrieves all links, optionally filtered by song.
     * Results are sorted by favorite status first, then by creation date.
     * @param songId optional song ID to filter links by
     * @return list of links
     */
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

    /**
     * Creates a new link.
     * @param body link creation data including URL, title, category, tags, etc.
     * @return the created link
     */
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

    /**
     * Sets the favorite status of a link.
     * @param id link ID
     * @param value true to mark as favorite, false otherwise
     * @return updated link
     */
    @PatchMapping("/{id}/favorite")
    public LinkView setFavorite(@PathVariable UUID id, @RequestParam boolean value) {
        Link l = repo.findById(id).orElseThrow();
        l.setFavorite(value);
        return view(repo.save(l));
    }

    /**
     * Deletes a link.
     * @param id link ID to delete
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        repo.deleteById(id);
    }

    // ---- helpers ----
    /**
     * Converts a list of tag strings into a comma-separated string.
     * Cleans and deduplicates tags.
     */
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

    /**
     * Splits a comma-separated tag string into a list of individual tags.
     */
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
