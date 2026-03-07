package com.dominickcs.beatstore.service;

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

  public String registerUser(UserAuthRequest request) {
    boolean userExists = userRepository.findByEmail(request.getEmail()).isPresent();

    if (userExists) {
      return "USER EXISTS IN DB";
    } else {
      User user = new User();
      user.setEmail(request.getEmail());
      user.setPassword(passwordEncoder.encode(request.getPassword()));
      userRepository.save(user);
      return "USER REGISTERED";
    }
  }
}
