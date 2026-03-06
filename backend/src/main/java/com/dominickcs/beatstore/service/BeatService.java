package com.dominickcs.beatstore.service;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dominickcs.beatstore.dto.request.BeatUploadRequest;
import com.dominickcs.beatstore.dto.response.BeatResponse;
import com.dominickcs.beatstore.entity.Beat;
import com.dominickcs.beatstore.repository.BeatRepository;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

@Service
public class BeatService {
  private S3Client s3Client;
  private S3Presigner s3Presigner;
  private BeatRepository beatRepository;

  public BeatService(S3Client s3Client, S3Presigner s3Presigner, BeatRepository beatRepository) {
    this.s3Client = s3Client;
    this.s3Presigner = s3Presigner;
    this.beatRepository = beatRepository;
  }

  @Value("${garage.bucket}")
  private String bucket;

  @Value("${garage.coverart-bucket}")
  private String coverartBucket;

  public String uploadBeat(MultipartFile beatFile, MultipartFile coverartFile, BeatUploadRequest uploadRequest) {
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
      beat.setTitle(uploadRequest.getTitle());
      beat.setDescription(uploadRequest.getDescription());
      beat.setPrice(uploadRequest.getPrice());
      beat.setBpm(uploadRequest.getBpm());
      beat.setTags(uploadRequest.getTags());

      beatRepository.save(beat);

      return "Upload Complete. BeatID: " + beatID + " CoverArtID: " + coverartID;
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
      BeatResponse beatResponse = new BeatResponse();
      beatResponse.setTitle(beat.getTitle());
      beatResponse.setDescription(beat.getDescription());
      beatResponse.setBpm(beat.getBpm());
      beatResponse.setObjStorageKey(beat.getObjStorageKey());
      beatResponse.setPrice(beat.getPrice());
      beatResponse.setTags(beat.getTags());
      beatResponse.setUploadDate(beat.getUploadDate());
      beatResponse.setCoverArtKey(beat.getCoverArtKey());
      return beatResponse;
    }).collect(Collectors.toList());
  }
}
