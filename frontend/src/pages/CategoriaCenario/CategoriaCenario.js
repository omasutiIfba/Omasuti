import { useNavigate } from "react-router-dom";
import "./categoriaCenario.css";
import { useCenario } from "../EditorCenario/CenarioContext";

const CategoriaCenario = () => {
  const navigate = useNavigate();
  const { setCategoria } = useCenario;

  const escolherCategoria = (categoria) => {
    setCategoria(categoria);
    navigate("/editor/nome");
  };

  return(
    <div className="editor-background">
      <div className="editor-content">
        <h1 className="editor-title">Escolha o tema para o cenário</h1>
        <div className="categoria-card" onClick={() => escolherCategoria("Localização")}>
          <img src="/imagens/localizacao.jpg" alt="Localização"/>
          <p>Localização</p>
        </div>
        <div className="categoria-card" onClick={() => escolherCategoria("Identificação")}>
          <img src="/imagens/identificacao.jpg" alt="Identificação"/>
          <p>Identificação</p>
        </div>
        <div className="categoria-card" onClick={() => escolherCategoria("Interpretação")}>
          <img src="/imagens/interpretação.jpg" alt="interpretação"/>
          <p>Interpretação</p>
        </div>
      </div>
    </div>
  );
};

export default CategoriaCenario;