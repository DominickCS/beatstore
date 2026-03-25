package com.dominickcs.beatstore.dto.request;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BeatUploadRequest(@NotBlank(message = "The title field cannot be blank!") String title,
    @NotBlank(message = "The description field cannot be blank!") String description,
    @NotNull(message = "The price field cannot be empty!") @DecimalMin(value = "1.0", message = "The price field must be at least 1.0") @Digits(integer = 3, fraction = 2, message = "Enter a valid price xx.xx") BigDecimal price,
    @Min(value = 1, message = "The BPM field must be at least 1 BPM!") @Max(value = 522, message = "The bpm field cannot exceed 522 BPM!") @NotNull(message = "The BPM field cannot be blank!") Integer bpm,
    List<String> tags) {
};
