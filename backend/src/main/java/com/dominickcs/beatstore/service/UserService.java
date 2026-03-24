package com.dominickcs.beatstore.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

import com.dominickcs.beatstore.dto.request.UserAuthRequest;
import com.dominickcs.beatstore.entity.User;
import com.dominickcs.beatstore.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public ResponseEntity<String> registerUser(UserAuthRequest request) {
    boolean userExists = userRepository.findByEmail(request.getEmail()).isPresent();

    if (userExists) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .body("It appears you already have an account, sign in using your registered email.");
    } else {
      User user = new User();
      user.setEmail(request.getEmail());
      user.setPassword(passwordEncoder.encode(request.getPassword()));
      userRepository.save(user);
      return ResponseEntity.status(HttpStatus.OK).body("You have registered successfully!");
    }
  }

  public ResponseEntity<String> login(UserAuthRequest request, HttpServletRequest httpRequest,
      HttpServletResponse httpResponse) {
    try {
      UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(),
          request.getPassword());
      var authentication = authenticationManager.authenticate(token);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      new HttpSessionSecurityContextRepository().saveContext(SecurityContextHolder.getContext(), httpRequest,
          httpResponse);

      return ResponseEntity.ok("Your login was successful! Redirecting you...");
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password provided!");
    }
  }
}
