package com.patrick.musicdash.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
  @GetMapping("/api/hello")
  public String hello() {
    return "MusicDash backend is up 🎵";
  }
}
