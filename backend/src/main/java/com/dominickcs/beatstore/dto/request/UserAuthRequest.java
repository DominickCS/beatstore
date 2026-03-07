package com.dominickcs.beatstore.dto.request;

import lombok.Data;

@Data
public class UserAuthRequest {
  private String email;
  private String password;
}
