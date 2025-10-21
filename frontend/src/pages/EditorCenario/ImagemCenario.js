import { useCenario } from "./CenarioContext";
import { useNavigate } from "react-router-dom";
import './editorCenario.css';
import BotaoVoltar from '../../components/BotaoVoltar';

const ImagemCenario = () => {
  const { imagem, setImagem } = useCenario();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imagem) navigate('/editor/pergunta');
  };
  return(
    <div className="editor-background">
      <div className="editor-content">
        <div className="section-banner">
          <h1 className="editor-title">Insira a imagem do cenário</h1>
        </div>
        <form onSubmit={handleSubmit} className="upload-form">
          <label className="upload-label">
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setImagem(e.target.files[0])}
              className="editor-input-file"
              required
            />
            <span className="upload-text">
              {imagem ? imagem.name : "Clique para selecionar (JPEG/PNG)"}
            </span>
            <p className="upload-instructions">
              Formatos permitidos: JPG e PNG. Tamanho até 5MB.
            </p>
          </label>
          <div className="button-group">

            <BotaoVoltar />
            <button 
              type="submit"
              className="editor-button"
              disabled={!imagem}
            >
              Próximo
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ImagemCenario;