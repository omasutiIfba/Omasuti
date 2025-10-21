package com.Omasuti.backend.services;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagemStorageService {
  
  @Value("${app.upload.dir}")
  private String uploadDir;

  public String storeImage(MultipartFile file) throws IOException {
    
    Path uploadPath = Paths.get(uploadDir);
    if(!Files.exists(uploadPath)){
      Files.createDirectories(uploadPath);
    }

    if(file.isEmpty()){
      throw new IOException("Arquivo vazio");
    }

    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
    String extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
    if(!List.of(".jpg", ".jpeg", ".png").contains(extension)){
      throw new IOException("Formato inválido! Use JPG, JPEG ou PNG.");
    }
    Path filePath = uploadPath.resolve(fileName);

    Files.copy(file.getInputStream(), filePath);

    return fileName;
  }
}
