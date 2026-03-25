package com.dominickcs.beatstore.service;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.dto.request.BeatUploadRequest;
import com.dominickcs.beatstore.dto.response.BeatResponse;
import com.dominickcs.beatstore.entity.Beat;
import com.dominickcs.beatstore.repository.BeatRepository;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

@Service
@RequiredArgsConstructor
public class BeatService {
  private final S3Client s3Client;
  private final S3Presigner s3Presigner;
  private final BeatRepository beatRepository;

  @Value("${garage.bucket}")
  private String bucket;

  @Value("${garage.coverart-bucket}")
  private String coverartBucket;

  public ResponseEntity<String> uploadBeat(MultipartFile beatFile, MultipartFile coverartFile,
      BeatUploadRequest uploadRequest) {
    try {
      String beatID = UUID.randomUUID().toString();
      s3Client.putObject(
          PutObjectRequest.builder().bucket(bucket).key(beatID).contentType("audio/mpeg").build(),
          RequestBody.fromBytes(beatFile.getBytes()));

      String coverartID = UUID.randomUUID().toString();
      s3Client.putObject(
          PutObjectRequest.builder().bucket(coverartBucket).key(coverartID).contentType("image/png").build(),
          RequestBody.fromBytes(coverartFile.getBytes()));

      Beat beat = new Beat();
      beat.setObjStorageKey(beatID);
      beat.setCoverArtKey(coverartID);
      beat.setTitle(uploadRequest.title());
      beat.setDescription(uploadRequest.description());
      beat.setPrice(uploadRequest.price());
      beat.setBpm(uploadRequest.bpm());
      beat.setTags(uploadRequest.tags());
      beatRepository.save(beat);

      return ResponseEntity.status(HttpStatus.CREATED).body("Your beat was uploaded successfully!");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There was an error uploading your beat...");
    }
  }

  public String generatePresignedURL(String key) {
    GetObjectRequest getObjectRequest = GetObjectRequest.builder()
        .bucket(bucket)
        .key(key)
        .build();
    GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
        .signatureDuration(Duration.ofMinutes(10))
        .getObjectRequest(getObjectRequest)
        .build();

    return s3Presigner.presignGetObject(presignRequest).url().toString();
  }

  public String generateCoverArtPresignedURL(String key) {
    GetObjectRequest getObjectRequest = GetObjectRequest.builder()
        .bucket(coverartBucket)
        .key(key)
        .build();

    GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
        .signatureDuration(Duration.ofMinutes(10))
        .getObjectRequest(getObjectRequest)
        .build();

    return s3Presigner.presignGetObject(presignRequest).url().toString();
  }

  public List<BeatResponse> getAllBeats() {
    List<Beat> beats = beatRepository.findAll();

    return beats.stream().map(beat -> {
      BeatResponse beatResponse = toBeatResponse(beat);
      return beatResponse;
    }).collect(Collectors.toList());
  }

  private BeatResponse toBeatResponse(Beat beat) {
    return new BeatResponse(beat.getObjStorageKey(), beat.getCoverArtKey(), beat.getTitle(), beat.getDescription(),
        beat.getPrice(), beat.getBpm(), beat.getTags(), beat.getUploadDate());
  }
}
