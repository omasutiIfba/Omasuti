import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import BotaoVoltar from '../../components/BotaoVoltar';
import './gerenciarCenarios.css';

export default function GerenciarCenarios() {
  const nav = useNavigate();
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(''); 
  const [modalExcluir, setModalExcluir] = useState(false);
  const [alvo, setAlvo] = useState(null);

  const carregar = async () => {
    try {
      const { data } = await api.get('/cenarios'); 
      setItens(data || []);
    } catch (e) {
      console.error('Erro ao carregar cenários:', e);
      alert('Erro ao carregar cenários.');
    }
  };

  useEffect(() => { carregar(); }, []);

  const abrirExcluir = (c) => { setAlvo(c); setModalExcluir(true); };
  const fecharExcluir = () => { setAlvo(null); setModalExcluir(false); };

  const excluir = async () => {
    try {
      await api.delete(`/cenarios/${alvo.id}`);
      setItens(prev => prev.filter(i => i.id !== alvo.id));
    } catch (e) {
      console.error('Erro ao excluir:', e);
      alert('Erro ao excluir cenário.');
    } finally {
      fecharExcluir();
    }
  };

  const filtrados = useMemo(() => {
    return itens
      .filter(i => (categoria ? i.categoria?.toLowerCase() === categoria.toLowerCase() : true))
      .filter(i => (busca ? i.nome?.toLowerCase().includes(busca.toLowerCase()) : true));
  }, [itens, busca, categoria]);

  return (
    <div className="ger-stage">
      <div className="ger-topbar">
        <div className="left">
          <BotaoVoltar />
          <h2>Gerenciar cenários</h2>
        </div>
        <div className="right">
          <button className="btn-primario" onClick={() => nav('/cadastro-cenario')}>
            Novo cenário
          </button>
        </div>
      </div>

      <div className="ger-filtros">
        <input
          className="input-base"
          placeholder="Buscar por nome…"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <input
          className="input-base"
          placeholder="Filtrar por categoria (opcional)…"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        />
      </div>

      <div className="ger-grid">
        {filtrados.map((i) => (
          <div key={i.id} className="ger-card">
            <div className="thumb">
              <img
                src={`http://localhost:8080/uploads/${i.imagemPath}`}
                alt={i.nome}
                onError={(e) => { e.currentTarget.src = ''; e.currentTarget.alt = 'Sem imagem'; }}
              />
            </div>
            <div className="info">
              <div className="titulo">{i.nome}</div>
              <div className="meta">
                <span>Categoria: <b>{i.categoria || '—'}</b></span>
              </div>
            </div>
            <div className="acoes">
              <button
                className="btn"
                onClick={() => nav(`/editar-cenario/${i.id}`)}
              >
                Editar
              </button>
              <button
                className="btn-danger"
                onClick={() => abrirExcluir(i)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalExcluir && (
        <div className="modal" onClick={fecharExcluir}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Excluir este cenário?</h3>
            <p><b>{alvo?.nome}</b></p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={excluir}>Sim, excluir</button>
              <button className="btn" onClick={fecharExcluir}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
