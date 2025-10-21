import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menuJogos.css';

const MenuJogos = () => {
  const navigate = useNavigate();

  return(
    <div className="menu-jogos-background">
      <div className="menu-jogos-content">
        
        <div className="buttons-container">
          <button 
            onClick={() => navigate('/categorias')}
            className="menu-button primary"
          >
            Montar Cenário
          </button>
          
          <button 
            onClick={() => navigate('/categorias/jogar')} 
            className="menu-button secondary"
          >
            Explorar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuJogos;
