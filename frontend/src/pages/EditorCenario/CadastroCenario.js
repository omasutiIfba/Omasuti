import { useState } from 'react';
import { useCenario } from './CenarioContext';
import { useNavigate } from 'react-router-dom';
import './editorCenario.css';
import api from '../../api/axios';
import BotaoVoltar from '../../components/BotaoVoltar';

const CadastroCenario = () => {
  const { nome, imagem, categoria, contexto, setContexto, pergunta, setPergunta, resetCenario } = useCenario();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [savedPergunta, setSavedPergunta] = useState('');
  const [savedContexto, setSavedContexto] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pergunta.trim() || !nome || !imagem) return;
    if (!categoria) {
      alert('Escolha uma categoria antes de salvar.'); 
      return;
    }

    setIsLoading(true);


    const formData = new FormData();
    const cenario = {
      nome: nome,
      frase: pergunta,
      categoria: categoria,
      contexto: contexto,
      resposta: contexto,
    };

    formData.append("cenario", JSON.stringify(cenario));
    formData.append("file", imagem);

    try {
      await api.post("/cenarios", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setSavedPergunta(pergunta);
      setSavedContexto(contexto);
      setIsLoading(false); 
      setShowSuccess(true);

    } catch (error) {
      console.error("Erro ao salvar cenário:", error);
      alert("Erro ao salvar cenário.");
      setIsLoading(false);
    }
  };

  const fecharModal = () => {
      setShowSuccess(false);
      navigate(`/gerenciar/categorias/${categoria}`);   
      resetCenario();
  };

  return(
    <>
      <div className="editor-background">
        <div className="editor-content">
          <div className="section-banner">
            <h1 className="editor-title">Insira a pergunta e o contexto para o cenário</h1>
          </div>
          <form onSubmit={handleSubmit} className="pergunta-form">
            <label className="editor-label">Pergunta:</label>
            <textarea
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              className="editor-textarea-solid"
              placeholder="Ex: Onde está a criança?"
              required
            />

            <label className="editor-label">Frase de contextualização:</label>
            <textarea
              value={contexto}
              onChange={(e) => setContexto(e.target.value)}
              className="editor-textarea-solid"
              placeholder="Ex: A criança está no zoológico..."
              required
            />
            
            <div className="button-group">

              <BotaoVoltar />
              <button 
                type="submit"
                className={`editor-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || !pergunta.trim()}
              >
                {isLoading ? '' : 'Salvar'}
              </button>
          
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Sucesso */}
      <div className={`success-modal ${showSuccess ? 'active' : ''}`}
        onClick={fecharModal}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-icon">✓</div>
          <h2>Cenário salvo com sucesso!</h2>

          {/* Exibe a frase salva */}
          <p style={{ marginTop: 8 }}>
            <strong>Pergunta:</strong> {savedPergunta || '—'}
            <br />
            <strong>Contexto:</strong> {savedContexto || '—'}
          </p>

          <button className="modal-close-button" onClick={fecharModal}>
            Fechar
          </button>
        </div>
      </div>
    </>
  );
};

export default CadastroCenario;