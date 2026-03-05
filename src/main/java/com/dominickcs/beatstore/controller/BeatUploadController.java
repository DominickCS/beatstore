package com.dominickcs.beatstore.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.entity.Beat;
import com.dominickcs.beatstore.repository.BeatRepository;
import com.dominickcs.beatstore.service.BeatUploadService;

@RestController
@RequestMapping("/beats")
public class BeatUploadController {
  private BeatUploadService beatUploadService;
  private BeatRepository beatRepository;

  public BeatUploadController(BeatUploadService beatUploadService, BeatRepository beatRepository) {
    this.beatUploadService = beatUploadService;
    this.beatRepository = beatRepository;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadBeat(@RequestParam MultipartFile file) {
    String response = beatUploadService.uploadBeat(file);

    if (response.startsWith("Error")) {
      return ResponseEntity.internalServerError().body(response);
    } else {
      return ResponseEntity.ok().body(response);
    }

  }

  @GetMapping("/{key}")
  public ResponseEntity<String> getBeat(@PathVariable(name = "key") String key) {
    String response = beatUploadService.generatePresignedURL(key);

    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/")
  public List<Beat> getAllBeats() {
    return beatRepository.findAll();
  }
}
