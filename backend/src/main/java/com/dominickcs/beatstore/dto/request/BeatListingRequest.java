package com.dominickcs.beatstore.dto.request;

import java.math.BigDecimal;
import java.util.List;

public record BeatListingRequest(
    String beatObjKey,
    String coverArtObjKey,
    String title,
    String description,
    BigDecimal price,
    int bpm,
    List<String> tags) {
}
