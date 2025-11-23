package com.patrick.musicdash.dto.sheet;

import java.util.UUID;

/**
 * Data transfer object for attaching a sheet to a song.
 * @param songId the ID of the song to link the sheet to
 */
public record SheetAttach(UUID songId) {
}
