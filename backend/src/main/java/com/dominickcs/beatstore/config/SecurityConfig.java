package com.dominickcs.beatstore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.dominickcs.beatstore.entity.User;
import com.dominickcs.beatstore.entity.enums.UserRoles;
import com.dominickcs.beatstore.repository.UserRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Value("${ADMIN_EMAIL}")
  private String adminEmail;

  @Value("${ADMIN_PASSWORD}")
  private String adminPassword;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // disable for now, revisit before production
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, "/beats/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/beats/upload").hasRole("ADMIN")
            .requestMatchers("/auth/**").permitAll()
            .anyRequest().authenticated())
        .formLogin(form -> form.disable())
        .httpBasic(basic -> basic.disable());
    return http.build();
  }

  @Bean
  public ApplicationRunner initAdminAccount(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    return args -> {
      if (userRepository.findByEmail(adminEmail).isEmpty()) {
        User admin = new User();
        admin.setEmail(adminEmail);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setUserRole(UserRoles.ADMIN);
        admin.setEmailVerified(true);
        userRepository.save(admin);
      }
    };
  }
}
