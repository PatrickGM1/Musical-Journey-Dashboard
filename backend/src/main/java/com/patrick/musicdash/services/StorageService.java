package com.patrick.musicdash.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class StorageService {
    private final Path root;

    public StorageService(@Value("${storage.root}") String rootDir) throws IOException {
        this.root = Paths.get(rootDir).toAbsolutePath().normalize();
        Files.createDirectories(this.root);
    }

    public String save(MultipartFile file) throws IOException {
        String name = UUID.randomUUID().toString();
        Files.copy(file.getInputStream(), root.resolve(name), StandardCopyOption.REPLACE_EXISTING);
        return name;
    }

    public Path pathOf(String storedName) {
        return root.resolve(storedName).normalize();
    }

    public boolean delete(String storedName) throws IOException {
        return FileSystemUtils.deleteRecursively(pathOf(storedName));
    }
}
