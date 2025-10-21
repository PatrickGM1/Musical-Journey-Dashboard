package com.patrick.musicdash.dto.sheet;

import java.time.OffsetDateTime;
import java.util.UUID;

public class SheetView {
    public UUID id;
    public String originalName;
    public String contentType;
    public long sizeBytes;
    public String instrument;
    public String songTitle;
    public OffsetDateTime uploadedAt;
}
