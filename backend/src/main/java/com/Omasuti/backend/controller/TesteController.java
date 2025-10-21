package com.Omasuti.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/teste")
public class TesteController {
  @GetMapping
  public String testeConexao() {
      return "{\"mensagem\": \"Backend conectado com sucesso!\"}";
  }
  
}
