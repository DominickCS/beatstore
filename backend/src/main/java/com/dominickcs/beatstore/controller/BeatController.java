package com.dominickcs.beatstore.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.dto.request.BeatListingDeletionRequest;
import com.dominickcs.beatstore.dto.request.BeatObjectDeletionRequest;
import com.dominickcs.beatstore.dto.request.BeatObjectUploadRequest;
import com.dominickcs.beatstore.dto.response.BeatObjectUploadResponse;
import com.dominickcs.beatstore.dto.response.BeatResponse;
import com.dominickcs.beatstore.service.BeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BeatController {
  private final BeatService beatService;

  @PostMapping(value = "/admin/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<BeatObjectUploadResponse> uploadBeatObjects(
      @RequestPart("beatFile") MultipartFile beatFile,
      @RequestPart("coverArtFile") MultipartFile coverArtFile,
      @RequestPart("title") String title) {
    return beatService.uploadBeatObjects(new BeatObjectUploadRequest(beatFile, coverArtFile, title));
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
}
