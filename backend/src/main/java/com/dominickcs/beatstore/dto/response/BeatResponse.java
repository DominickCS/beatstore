package com.dominickcs.beatstore.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record BeatResponse(String objStorageKey, String coverArtKey, String title, String description, BigDecimal price,
    int bpm, List<String> tags, LocalDateTime uploadDate) {
};
