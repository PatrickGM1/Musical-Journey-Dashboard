package com.patrick.musicdash.dto.link;

import java.time.OffsetDateTime;
import java.util.UUID;

public class LinkDtos {
    public record LinkCreate(String title, String url, String category, String notes) {
    }

    public record LinkView(UUID id, String title, String url, String category, String notes, OffsetDateTime createdAt) {
    }
}
