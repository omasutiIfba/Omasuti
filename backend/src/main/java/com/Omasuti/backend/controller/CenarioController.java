package com.Omasuti.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.Omasuti.backend.model.Cenario;
import com.Omasuti.backend.repository.CenarioRepository;
import com.Omasuti.backend.services.CenarioService;
import com.Omasuti.backend.services.ImagemStorageService;
import com.fasterxml.jackson.databind.ObjectMapper;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cenarios")
public class CenarioController {

    private final CenarioRepository repository;
    private final ImagemStorageService storageService;
    private final ObjectMapper objectMapper;
    private final CenarioService cenarioService;

    public CenarioController(CenarioRepository repository,
                             ImagemStorageService storageService,
                             ObjectMapper objectMapper,
                             CenarioService cenarioService) {
        this.repository = repository;
        this.storageService = storageService;
        this.objectMapper = objectMapper;
        this.cenarioService = cenarioService;
    }

    @GetMapping("/categoria/{categoria}")
    public List<Cenario> listarPorCategoria(@PathVariable String categoria) {
        return repository.findByCategoriaIgnoreCase(categoria);
    }
    

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Cenario> criarCenarioComImagem(
            @RequestPart("cenario") String cenarioJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        
        try {
            // Converter JSON para objeto Cenario
            Cenario cenario = objectMapper.readValue(cenarioJson, Cenario.class);
            
            if (file != null && !file.isEmpty()) {
                String imagemPath = storageService.storeImage(file);
                cenario.setImagemPath(imagemPath);
            }

            if (cenario.getResposta() == null || cenario.getResposta().isBlank()) {
                cenario.setResposta(cenario.getContexto());
            }
            
            Cenario cenarioSalvo = repository.save(cenario);
            return ResponseEntity.ok(cenarioSalvo);
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/categoria/{categoria}/representativo")
    public ResponseEntity<Cenario> buscaPrimeiroDaCategoria(@PathVariable String categoria) {
        return repository.findByCategoriaIgnoreCase(categoria)
        .stream()
        .findFirst()
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCenario(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public Cenario buscarPorId(@PathVariable Long id) {
        return cenarioService.getById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cenario> atualizar(
            @PathVariable Long id,
            @RequestBody Cenario atualizacao
    ){
        return repository.findById(id)
            .map(c -> {
                c.setNome(atualizacao.getNome());
                c.setCategoria(atualizacao.getCategoria());
                c.setContexto(atualizacao.getContexto());
                c.setPergunta(atualizacao.getPergunta());
                c.setResposta(atualizacao.getResposta());
                return ResponseEntity.ok(repository.save(c));
            })
            .orElse(ResponseEntity.notFound().build());
    }


}