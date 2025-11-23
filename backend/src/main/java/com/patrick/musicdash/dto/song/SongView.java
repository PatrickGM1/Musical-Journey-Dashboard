package com.patrick.musicdash.dto.song;

import java.util.UUID;

/**
 * Data transfer object for song view/response.
 * Contains all song information returned to the client.
 */
public class SongView {
    public UUID id;
    public String title;
    public String artist;
    public String instrument;
    public String status;
    public String keySig;
    public Integer bpm;
    public String notes;
}
