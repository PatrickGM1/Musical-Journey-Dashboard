package com.patrick.musicdash.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

/**
 * Service for managing file storage operations.
 * Handles saving, retrieving, and deleting uploaded files in the file system.
 */
@Service
public class StorageService {
    private final Path root;

    /**
     * Initializes the storage service with the configured root directory.
     * Creates the directory if it doesn't exist.
     * @param rootDir root directory path from application properties
     * @throws IOException if directory creation fails
     */
    public StorageService(@Value("${storage.root}") String rootDir) throws IOException {
        this.root = Paths.get(rootDir).toAbsolutePath().normalize();
        Files.createDirectories(this.root);
    }

    /**
     * Saves an uploaded file to the storage directory with a unique name.
     * @param file the multipart file to save
     * @return the generated unique filename
     * @throws IOException if file save operation fails
     */
    public String save(MultipartFile file) throws IOException {
        String name = UUID.randomUUID().toString();
        Files.copy(file.getInputStream(), root.resolve(name), StandardCopyOption.REPLACE_EXISTING);
        return name;
    }

    /**
     * Resolves the full path for a stored file.
     * @param storedName the unique filename
     * @return normalized absolute path to the file
     */
    public Path pathOf(String storedName) {
        return root.resolve(storedName).normalize();
    }

    /**
     * Deletes a stored file.
     * @param storedName the unique filename to delete
     * @return true if deletion was successful
     * @throws IOException if deletion fails
     */
    public boolean delete(String storedName) throws IOException {
        return FileSystemUtils.deleteRecursively(pathOf(storedName));
    }
}
