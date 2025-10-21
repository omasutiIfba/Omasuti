package com.Omasuti.backend.config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  // 1) Exponha o filtro como @Bean, com injeção do secret no construtor
  @Bean
  JwtFilter jwtFilter(@Value("${app.jwt.secret}") String jwtSecret) {
    return new JwtFilter(jwtSecret);
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
          // público
          .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
          .requestMatchers(HttpMethod.GET, "/api/cenarios/**").permitAll()
          .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
          // protegido (CRUD de cenários)
          .requestMatchers(HttpMethod.POST, "/api/cenarios/**").authenticated()
          .requestMatchers(HttpMethod.PUT,  "/api/cenarios/**").authenticated()
          .requestMatchers(HttpMethod.DELETE, "/api/cenarios/**").authenticated()
          // o resto você decide; aqui estou liberando:
          .anyRequest().permitAll()
      )
      // 2) Use o bean aqui (sem "new")
      .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  // 3) Filtro estático com secret passado via construtor (sem @Component aqui)
  public static class JwtFilter extends OncePerRequestFilter {
    private final byte[] keyBytes;

    public JwtFilter(String jwtSecret) {
      this.keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
        throws ServletException, IOException {

      String authHeader = req.getHeader("Authorization");

      // Se não veio bearer, segue o fluxo sem autenticar
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        chain.doFilter(req, res);
        return;
      }

      String token = authHeader.substring(7);
      try {
        Jws<Claims> jws = Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(keyBytes))
            .build()
            .parseClaimsJws(token);

        // Aqui você poderia extrair roles do token; por enquanto, ROLE_ADMIN fixo
        var auth = new UsernamePasswordAuthenticationToken(
            "admin", null, List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

      } catch (JwtException ex) {
        // token inválido/expirado → zera contexto e segue (ou retorne 401 se preferir)
        SecurityContextHolder.clearContext();
        // res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        // return;
      }

      chain.doFilter(req, res);
    }
  }
}
