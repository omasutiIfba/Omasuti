import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './jogo.css';
import BotaoVoltar from '../../components/BotaoVoltar';

const PerguntarCenario = () => {
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

  const irParaContexto = () => navigate(`/jogar/${id}/contexto`);
  const voltarCategorias = () => navigate(`/jogar/${cenario.categoria}`);

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
          {cenario.pergunta}
        </div>

        <div className="jogo-acao-base">
          <button className="botao-jogo" onClick={irParaContexto}>
            Resposta
          </button>
          <BotaoVoltar onClick={voltarCategorias} />
        </div>
      </div>
    </div>
  );
};

export default PerguntarCenario;
