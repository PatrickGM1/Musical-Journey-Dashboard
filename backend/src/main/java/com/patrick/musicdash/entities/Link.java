package com.patrick.musicdash.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "links")
public class Link {
    @Id
    @UuidGenerator
    private UUID id;

    private String title;
    private String url;
    private String category;
    private String notes;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}
