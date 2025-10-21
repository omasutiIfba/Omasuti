package com.Omasuti.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Omasuti.backend.model.Cenario;

public interface CenarioRepository extends JpaRepository<Cenario, Long> {

  List<Cenario> findAll();
  
  List<Cenario> findByCategoriaIgnoreCase(String categoria);
} 
