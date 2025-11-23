package com.patrick.musicdash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the Musical Journey Dashboard.
 * A Spring Boot application for tracking musical practice, repertoire, and learning resources.
 */
@SpringBootApplication
public class MusicDashApplication {

	/**
	 * Application entry point.
	 * @param args command line arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(MusicDashApplication.class, args);
	}

}
