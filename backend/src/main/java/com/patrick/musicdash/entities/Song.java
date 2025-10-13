package com.patrick.musicdash.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

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
    @Column(nullable = false, length = 16)
    private Status status;

    @Column(name = "key_sig", length = 12)
    private String keySig;

    private Integer bpm;
    private String notes;

    public enum Status {
        LEARNING, POLISHING, MASTERED
    }
}
