package com.patrick.musicdash.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * Entity representing a musical song in the user's repertoire.
 * Tracks learning progress, metadata, and technical details for each piece.
 */
@Entity
@Table(name = "songs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Song {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 200)
    private String artist;

    @Column(nullable = false, length = 32)
    private String instrument;

    @Enumerated(EnumType.STRING)
    @Column(length = 32)
    private Status status;

    @Column(name = "key_sig", length = 12)
    private String keySig;

    private Integer bpm;
    private String notes;

    /**
     * Represents the learning status of a song.
     * <ul>
     *   <li>LEARNING - Currently learning the piece</li>
     *   <li>POLISHING - Can play but refining technique</li>
     *   <li>MASTERED - Performance-ready</li>
     * </ul>
     */
    public enum Status {
        LEARNING, POLISHING, MASTERED
    }
}
