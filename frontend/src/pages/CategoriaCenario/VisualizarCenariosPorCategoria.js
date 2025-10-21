import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './selecionarCategoria.css';
import BotaoVoltar from '../../components/BotaoVoltar';

const VisualizarCenariosPorCategoria = () => {
  const { categoria } = useParams();
  const [cenarios, setCenarios] = useState([]);
  const [busca, setBusca] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    const fetchCenarios = async () => {
      try {
        const response = await api.get(`/cenarios/categoria/${categoria}`);
        console.log("Cenários recebidos:", response.data);
        setCenarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar cenários:', error);
      }
    };
    fetchCenarios();
  }, [categoria]);

  const cenariosFiltrados = cenarios.filter(c =>
    c.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="menu-jogos-background">
      <div className="menu-jogos-content">
        <div className="section-banner">
          <h2>Cenários da categoria: {categoria.nome}</h2>
        </div>
        
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input-busca"
        />
        <div className="cenarios-grid">
          {cenariosFiltrados.map(cenario => (
            <div 
              key={cenario.id} 
              className="cenario-card"
              onClick={(e) => {
                if (e.target.closest('.btn-excluir')) return; 
                navigate(`/jogar/${cenario.id}/pergunta`);
              }}
            >
              <img
                src={`http://localhost:8080/uploads/${cenario.imagemPath}`}
                alt={cenario.nome}
                className="cenario-imagem"
              />
              <div className="categoria-nome">{cenario.nome}</div>
            </div>
          ))}
        </div>
        <div className="lista-toolbar">
          <BotaoVoltar />
        </div>
      </div>
    </div>
  );
};

export default VisualizarCenariosPorCategoria;
