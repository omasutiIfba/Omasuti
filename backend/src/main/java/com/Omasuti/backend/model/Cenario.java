package com.Omasuti.backend.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cenario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @JsonAlias("frase")
    @Column(columnDefinition = "TEXT")
    private String pergunta;

    @Column(columnDefinition = "TEXT")
    private String contexto;

    @Column(columnDefinition = "TEXT")
    private String resposta;

    private String imagemPath;

    private String categoria;

    public Cenario() {}

    // Getters e Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getImagemPath() { return imagemPath; }
    public void setImagemPath(String imagemPath) { this.imagemPath = imagemPath; }

    public String getContexto() { return contexto; }
    public void setContexto(String contexto) { this.contexto = contexto; }

    public String getPergunta() { return pergunta; }
    public void setPergunta(String pergunta) { this.pergunta = pergunta; }

    public String getResposta() { return resposta; }
    public void setResposta(String resposta) { this.resposta = resposta; }

}
