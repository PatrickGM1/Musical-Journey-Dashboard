package com.patrick.musicdash;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.ExternalDocumentation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
      .info(new Info()
        .title("Musical Journey Dashboard API")
        .version("0.1.0-SNAPSHOT")
        .description(
          "Track piano/guitar practice, save pieces, upload sheet music/tabs/MIDI, ")
        .contact(new Contact()
          .name("PatrickGM1")
          .url("https://github.com/PatrickGM1"))
        .license(new License()
          .name("Unspecified (choose one)")
          .url("https://choosealicense.com/")))
      .externalDocs(new ExternalDocumentation()
        .description("Project repository")
        .url("https://github.com/PatrickGM1/Musical-Journey-Dashboard"))
      .addServersItem(new Server().url("http://localhost:8080"));
  }
}
