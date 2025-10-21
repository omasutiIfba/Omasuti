import { useLocation, useNavigate } from "react-router-dom";
import './jogo.css';

const RespostaCenario = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cenario = location.state?.cenario;

  if(!cenario) return null;

  const repetirCenario = () => {
    navigate(`/jogar/${cenario.id}/contexto`, { state: {cenario}});
  };

  const voltarParaCategorias = () => {
    navigate(`/categorias/jogar`, { state: {cenario}});
  };

  return (
    <div className="jogo-stage">
      <div className="jogo-layout">
        <div className="jogo-main">
          <div className="cenario-frame">
            <img
              className="cenario-img"
              src={`http://localhost:8080/uploads/${cenario.imagemPath}`}
              alt={cenario.nome}
            />
          </div>
          <div className="texto-caixa">
            {cenario.resposta /* <-- garanta o nome do campo */}
          </div>
        </div>

        <div className="jogo-acao">
          <button className="botao-secundario" onClick={repetirCenario}>
            Repetir
          </button>
          <button className="botao-jogo" onClick={voltarParaCategorias}>
            Voltar às Categorias
          </button>
        </div>
      </div>
    </div>
  );

};

export default RespostaCenario;