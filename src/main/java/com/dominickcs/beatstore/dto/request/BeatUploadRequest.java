package com.dominickcs.beatstore.dto.request;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class BeatUploadRequest {
  private String title;
  private String description;
  private BigDecimal price;
  private int bpm;
  private List<String> tags;
}
