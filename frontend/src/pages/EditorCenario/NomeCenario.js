import { useCenario } from './CenarioContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import './editorCenario.css';
import BotaoVoltar from '../../components/BotaoVoltar';

const NomeCenario = () => {
  const { nome, setNome, setCategoria } = useCenario();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat) setCategoria(cat);
  }, [searchParams, setCategoria]);

  return (
    <div className="editor-background">
      <div className="editor-content"> 
        <div className="section-banner">
          <h1 className="editor-title">Insira um nome para o cenário</h1>
        </div>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Quarto infantil"
          className="editor-input-transparent"
        />
        <div className="button-group">
          
          <BotaoVoltar />
          <button 
            onClick={() => navigate('/editor/imagem')}
            className="editor-button"
            disabled={!nome.trim()}
          >
            Próximo
          </button>

        </div>
      </div>
    </div>
  );
};

export default NomeCenario;
