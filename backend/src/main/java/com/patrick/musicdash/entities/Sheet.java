package com.patrick.musicdash.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "sheets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sheet {
    @Id
    @GeneratedValue
    private UUID id;
    @Column(name = "original_name", nullable = false, length = 255)
    private String originalName;
    @Column(name = "content_type", length = 127)
    private String contentType;
    @Column(name = "size_bytes", nullable = false)
    private long sizeBytes;
    @Column(length = 32)
    private String instrument;
    @Column(name = "song_title", length = 200)
    private String songTitle;
    @Column(name = "stored_name", nullable = false, length = 80)
    private String storedName;
    @Column(name = "uploaded_at", nullable = false)
    private OffsetDateTime uploadedAt;
}
