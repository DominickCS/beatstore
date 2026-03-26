package com.dominickcs.beatstore.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record BeatObjectUploadRequest(MultipartFile beatFile, MultipartFile coverArtFile, String title) {
};
