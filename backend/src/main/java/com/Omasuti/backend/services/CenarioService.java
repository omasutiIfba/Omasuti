package com.Omasuti.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Omasuti.backend.model.Cenario;
import com.Omasuti.backend.repository.CenarioRepository;

@Service
public class CenarioService {
  private final CenarioRepository repository;

  public CenarioService(CenarioRepository repository){
    this.repository = repository;
  }

  public List<Cenario> getByCategoria(String categoria) {
    return repository.findByCategoriaIgnoreCase(categoria);
  }

  public Cenario getById(Long id){
    return repository.findById(id)
      .orElseThrow(() -> new RuntimeException("Cenario não encontrado"));
  }
}
