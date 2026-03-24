package com.dominickcs.beatstore.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dominickcs.beatstore.dto.request.UserAuthRequest;
import com.dominickcs.beatstore.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody UserAuthRequest request) {
    return userService.registerUser(request);
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody UserAuthRequest request, HttpServletRequest httpRequest,
      HttpServletResponse httpResponse) {
    return userService.login(request, httpRequest, httpResponse);
  }
}
