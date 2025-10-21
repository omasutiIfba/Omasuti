package com.Omasuti.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.Omasuti.backend.services.ImagemStorageService;

@RestController
@RequestMapping("/api/imagens")
public class ImageController {
  private final ImagemStorageService storageService;

  public ImageController(ImagemStorageService storageService){
    this.storageService = storageService;
  }
  @Value("${app.base-url}")
  private String baseUrl;

  @PostMapping
  public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file){
    try{
      String filePath = storageService.storeImage(file);
      return ResponseEntity.ok("{\"url\": \"" + baseUrl + filePath + "\"}");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Falha no upload: " + e.getMessage());
    }

  }
}
