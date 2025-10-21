import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './jogo.css';

const ContextoCenario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cenario, setCenario] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/cenarios/${id}`);
        setCenario(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!cenario) return null;

  const repetir = () => navigate(`/jogar/${id}/pergunta`);
  const voltarCategorias = () => navigate('/categorias/jogar');

  return (
    <div className="jogo-stage jogo-umacoluna">
      <div className="jogo-main">
        <div className="cenario-frame central">
          <img
            className="cenario-img"
            src={`http://localhost:8080/uploads/${cenario.imagemPath}`}
            alt={cenario.nome}
          />
        </div>

        <div className="texto-caixa central">
          {cenario.contexto}
        </div>

        <div className="resposta-botoes">
          <button className="botao-jogo" onClick={repetir}>Repetir</button>
          <button className="botao-secundario" onClick={voltarCategorias}>Voltar às categorias</button>
        </div>
      </div>
    </div>
  );
};

export default ContextoCenario;
