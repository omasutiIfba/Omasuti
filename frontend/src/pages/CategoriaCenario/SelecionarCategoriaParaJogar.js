import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './selecionarCategoria.css';

const SelecionarCategoriaParaJogar = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    setCategorias([
      { nome: 'Localização', valor: 'localizacao' },
      { nome: 'Identificação', valor: 'identificacao' },
      { nome: 'Interpretação', valor: 'interpretacao' }
    ]);
  }, []);

  const escolherCategoria = (categoria) => {
    navigate(`/jogar/${categoria}`);
  };

  return (
    <div className="selecionar-categoria-background">
      <div className="selecionar-categoria-content">
        <div className="section-banner">
          <h1 className="selecionar-categoria-title">Escolha uma categoria para explorar</h1>
        </div>
        
        <div className="categoria-grid">
          {categorias.map((cat) => (
            <div className="categoria-card" key={cat.valor} onClick={() => escolherCategoria(cat.valor)}>
              <img
                src={`/categorias/${cat.valor}.jpg`}
                alt={cat.nome}
                className="categoria-imagem"
              />
              <div className="categoria-nome">{cat.nome}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelecionarCategoriaParaJogar;
