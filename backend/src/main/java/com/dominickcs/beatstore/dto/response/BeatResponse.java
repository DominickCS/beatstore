package com.dominickcs.beatstore.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class BeatResponse {
  private String objStorageKey;
  private String coverArtKey;
  private String title;
  private String description;
  private BigDecimal price;
  private int bpm;
  private List<String> tags;
  private LocalDateTime uploadDate;
}
