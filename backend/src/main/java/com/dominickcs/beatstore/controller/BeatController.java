package com.dominickcs.beatstore.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.dto.request.BeatListingDeletionRequest;
import com.dominickcs.beatstore.dto.request.BeatObjectDeletionRequest;
import com.dominickcs.beatstore.dto.request.BeatUploadRequest;
import com.dominickcs.beatstore.dto.response.BeatResponse;
import com.dominickcs.beatstore.service.BeatService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BeatController {
  private final BeatService beatService;

  @PostMapping("/admin/beats/upload")
  public ResponseEntity<String> uploadBeat(@RequestParam MultipartFile beatFile,
      @RequestParam MultipartFile coverartFile,
      @RequestPart @Valid BeatUploadRequest uploadRequest) {
    return beatService.uploadBeat(beatFile, coverartFile, uploadRequest);
  }

  @DeleteMapping("/admin/beats/delete")
  public ResponseEntity<String> deleteBeatListing(
      @RequestBody BeatListingDeletionRequest request) {
    return beatService.deleteBeatListing(request);
  }

  @GetMapping("/beats/{key}")
  public ResponseEntity<String> getBeat(@PathVariable(name = "key") String key) {
    String response = beatService.generatePresignedURL(key);

    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/beats/cover/{key}")
  public ResponseEntity<String> getCoverArt(@PathVariable String key) {
    return ResponseEntity.ok(beatService.generateCoverArtPresignedURL(key));
  }

  @GetMapping("/beats")
  public ResponseEntity<List<BeatResponse>> getAllBeats() {
    return ResponseEntity.ok(beatService.getAllBeats());
  }

  @GetMapping("/admin/buckets/beats")
  public List<String> getAllBeatObjects() {
    return beatService.getAllBeatObjects();
  }

  @DeleteMapping("/admin/buckets/beats/delete")
  public ResponseEntity<String> deleteBeatObject(@RequestBody BeatObjectDeletionRequest request) {
    return beatService.deleteBeatObject(request);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
    Map<String, String> errors = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .collect(Collectors.toMap(
            e -> e.getField(),
            e -> e.getDefaultMessage(),
            (existing, duplicate) -> existing));
    return ResponseEntity.badRequest().body(errors);
  }
}
