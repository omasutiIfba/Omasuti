package com.Omasuti.backend.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AutoController {
  @Value("${app.jwt.secret}")
  private String jwtSecret;

  @Value("${app.jwt.expiration-ms}")
  private long jwtExpirationMs;

  static class LoginRequest { public String username; public String password; }
  static class LoginResponse { public String token; public LoginResponse(String t){ this.token=t; } }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    if ("omasuti_app".equals(req.username) && "9457".equals(req.password)) {
      String token = Jwts.builder()
              .setSubject(req.username)
              .setIssuedAt(new Date())
              .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
              .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS256)
              .compact();
      return ResponseEntity.ok(new LoginResponse(token));
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
}
