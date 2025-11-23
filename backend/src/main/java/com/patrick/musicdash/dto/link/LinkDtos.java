package com.patrick.musicdash.dto.link;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Container for link-related data transfer objects.
 */
public class LinkDtos {
    /**
     * Data transfer object for creating a new link.
     * @param title link title or description
     * @param url the web URL
     * @param category link category (e.g., Tutorial, Backing Track)
     * @param notes additional notes
     * @param tags list of tags for organization
     * @param favorite whether the link is marked as favorite
     * @param songId optional song ID to associate the link with
     */
    public record LinkCreate(
            String title,
            String url,
            String category,
            String notes,
            List<String> tags,
            Boolean favorite,
            UUID songId) {
    }

    /**
     * Data transfer object for link view/response.
     * @param id unique link identifier
     * @param title link title or description
     * @param url the web URL
     * @param category link category
     * @param notes additional notes
     * @param tags list of tags
     * @param favorite favorite status
     * @param createdAt timestamp when link was created
     * @param songId associated song ID (if any)
     */
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
