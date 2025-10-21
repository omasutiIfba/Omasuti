import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import BotaoVoltar from '../../components/BotaoVoltar';
import BotaoSair from '../../components/BotaoSair';
import '../CategoriaCenario/selecionarCategoria.css'; 

export default function GerenciarCenariosPorCategoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const [cenarios, setCenarios] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalExcluir, setModalExcluir] = useState(false);
  const [alvo, setAlvo] = useState(null);

  useEffect(() => {
    api.get(`/cenarios/categoria/${categoria}`)
      .then(({ data }) => setCenarios(data || []))
      .catch(() => alert('Erro ao carregar cenários.'));
  }, [categoria]);

  const filtrados = useMemo(
    () => cenarios.filter(c => c.nome?.toLowerCase().includes(busca.toLowerCase())),
    [cenarios, busca]
  );

  const abrirExcluir = (c) => { setAlvo(c); setModalExcluir(true); };
  const fecharExcluir = () => { setAlvo(null); setModalExcluir(false); };

  const excluir = async () => {
    try {
      await api.delete(`/cenarios/${alvo.id}`);
      setCenarios(prev => prev.filter(i => i.id !== alvo.id));
    } catch {
      alert('Erro ao excluir cenário.');
    } finally {
      fecharExcluir();
    }
  };

  return (
    <div className="selecionar-categoria-background">
      <div className="menu-jogos-content">

        <BotaoSair className="btn-sair-top" />
        <div className="section-banner">
          <h2 className='categoria-nome'>Gerenciar cenários — {categoria}</h2>
        </div>
        

        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input-busca"
        />

        <div className="lista-toolbar">
          <BotaoVoltar />
          <button
            className="btn-editar"  // usa o estilo abaixo
            onClick={() => navigate('/editor/nome')}
            style={{ marginLeft: 12 }}
          >
            Novo cenário
          </button>
        </div>

        {/* 👇 mesma grid/classe da tela de jogar para ficar idêntico */}
        <div className="cenarios-grid">
          {filtrados.map((cenario) => (
            <div key={cenario.id} className="cenario-card">
              <img
                src={`http://localhost:8080/uploads/${cenario.imagemPath}`}
                alt={cenario.nome}
                className="cenario-imagem"
              />
              <div className="categoria-nome">{cenario.nome}</div>

              {/* ações só no admin */}
              <div className="acoes-card">
                <button
                  type="button"
                  className="btn-editar"
                  onClick={() => navigate(`/editar-cenario/${cenario.id}`)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-excluir"
                  onClick={() => abrirExcluir(cenario)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {modalExcluir && (
          <div className="modal-confirmar-exclusao" onClick={fecharExcluir}>
            <div className="modal-content-excluir" onClick={(e) => e.stopPropagation()}>
              <h2>Excluir este cenário?</h2>
              <p><b>{alvo?.nome}</b></p>
              <div className="modal-buttons">
                <button type="button" className="confirmar" onClick={excluir}>Sim, excluir</button>
                <button type="button" className="cancelar" onClick={fecharExcluir}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
