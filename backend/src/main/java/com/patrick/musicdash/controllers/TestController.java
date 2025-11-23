package com.patrick.musicdash.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Simple health check controller for testing backend connectivity.
 */
@RestController
public class TestController {
  /**
   * Health check endpoint.
   * @return a simple status message
   */
  @GetMapping("/api/hello")
  public String hello() {
    return "MusicDash backend is up 🎵";
  }
}
