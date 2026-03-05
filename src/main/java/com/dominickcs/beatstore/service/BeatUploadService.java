package com.dominickcs.beatstore.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.entity.Beat;
import com.dominickcs.beatstore.repository.BeatRepository;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

@Service
public class BeatUploadService {
  private S3Client s3Client;
  private S3Presigner s3Presigner;
  private BeatRepository beatRepository;

  public BeatUploadService(S3Client s3Client, S3Presigner s3Presigner, BeatRepository beatRepository) {
    this.s3Client = s3Client;
    this.s3Presigner = s3Presigner;
    this.beatRepository = beatRepository;
  }

  @Value("${garage.bucket}")
  private String bucket;

  public String uploadBeat(MultipartFile file) {
    try {
      String beatID = UUID.randomUUID().toString();
      s3Client.putObject(
          PutObjectRequest.builder().bucket(bucket).key(beatID).contentType("audio/mpeg").build(),
          RequestBody.fromBytes(file.getBytes()));

      Beat beat = new Beat();

      beat.setDescription("Beat Upload " + file.getSize());
      beat.setObjStorageKey(beatID);
      // beat.setPrice(50.0);
      beat.setUploadDate(LocalDateTime.now());
      beat.setTitle(file.getName());

      beatRepository.save(beat);

      return "Upload Complete. ID: " + beatID;
    } catch (Exception e) {
      return "Error" + e.getLocalizedMessage();
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
}
