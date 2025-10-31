package com.patrick.musicdash.dto.link;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public class LinkDtos {
    public record LinkCreate(
            String title,
            String url,
            String category,
            String notes,
            List<String> tags,
            Boolean favorite,
            UUID songId) {
    }

    public record LinkView(
            UUID id,
            String title,
            String url,
            String category,
            String notes,
            List<String> tags,
            boolean favorite,
            OffsetDateTime createdAt,
            UUID songId) {
    }
}
