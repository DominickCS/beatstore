package com.dominickcs.beatstore.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dominickcs.beatstore.dto.request.UserAuthRequest;
import com.dominickcs.beatstore.entity.User;
import com.dominickcs.beatstore.repository.UserRepository;

@Service
public class UserService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public ResponseEntity<String> registerUser(UserAuthRequest request) {
    boolean userExists = userRepository.findByEmail(request.getEmail()).isPresent();

    if (userExists) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("It appears you already have an account, sign in using your registered email.");
    } else {
      User user = new User();
      user.setEmail(request.getEmail());
      user.setPassword(passwordEncoder.encode(request.getPassword()));
      userRepository.save(user);
      return ResponseEntity.status(HttpStatus.OK).body("You have registered successfully!");
    }
  }
}
