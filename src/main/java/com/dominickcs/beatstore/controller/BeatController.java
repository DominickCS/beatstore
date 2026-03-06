package com.dominickcs.beatstore.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.dto.request.BeatUploadRequest;
import com.dominickcs.beatstore.dto.response.BeatResponse;
import com.dominickcs.beatstore.service.BeatService;

@RestController
@RequestMapping("/beats")
public class BeatController {
  private BeatService beatService;

  public BeatController(BeatService beatService) {
    this.beatService = beatService;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadBeat(@RequestParam MultipartFile beatFile,
      @RequestParam MultipartFile coverartFile,
      @RequestPart BeatUploadRequest uploadRequest) {
    String response = beatService.uploadBeat(beatFile, coverartFile, uploadRequest);

    return ResponseEntity.ok().body(response);

  }

  @GetMapping("/{key}")
  public ResponseEntity<String> getBeat(@PathVariable(name = "key") String key) {
    String response = beatService.generatePresignedURL(key);

    return ResponseEntity.ok().body(response);
  }

  @GetMapping("")
  public ResponseEntity<List<BeatResponse>> getAllBeats() {
    return ResponseEntity.ok(beatService.getAllBeats());
  }
}
