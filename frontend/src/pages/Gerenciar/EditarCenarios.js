import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import '../EditorCenario/editorCenario.css';
import './editarCenario.css'; 
import BotaoVoltar from '../../components/BotaoVoltar';

export default function EditarCenarios() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    pergunta: '',
    contexto: '',
    resposta: '',    
    categoria: '',
    imagemPath: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/cenarios/${id}`);
        setForm({
          nome: data?.nome || '',
          pergunta: data?.pergunta || '',
          contexto: data?.contexto || '',
          resposta: data?.resposta ?? data?.contexto ?? '',
          categoria: data?.categoria || '',
          imagemPath: data?.imagemPath || '',
        });
      } catch (e) {
        alert('Erro ao carregar cenário.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const salvar = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/cenarios/${id}`, {
        id,
        nome: form.nome,
        pergunta: form.pergunta,
        contexto: form.contexto,
        resposta: form.resposta,   
        categoria: form.categoria,
        imagemPath: form.imagemPath,
      });
      setShowSuccess(true);     
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  const fecharModal = () => {
    setShowSuccess(false);
    navigate(`/gerenciar/categorias/${form.categoria}`);
  };

  if (loading) return null;

  return (
    <>
      <div className="editor-background">
        <div className="editor-content editar-container">
          <div className="section-banner tight">
            <h2>Editar cenário</h2>
          </div>

          <form className="editar-card" onSubmit={salvar}>
            {/* Campos iguais aos do cadastro, mas SEM "Resposta" */}
            <div className="editar-card">
              <label className="editor-label">Nome</label>
              <input
                className="input-base"
                value={form.nome}
                onChange={onChange('nome')}
                placeholder="Digite o nome do cenário"
                required
              />

              <label className="editor-label">Pergunta</label>
              <textarea
                className="editor-textarea-solid"
                value={form.pergunta}
                onChange={onChange('pergunta')}
                placeholder="Ex: Onde está a criança?"
                required
              />

              <label className="editor-label">Contexto</label>
              <textarea
                className="editor-textarea-solid"
                value={form.contexto}
                onChange={onChange('contexto')}
                placeholder="Ex: A criança está no zoológico..."
                required
              />

              {/* Botões centralizados como no cadastro */}
              <div className="button-group">
                <BotaoVoltar />
                <button
                  type="submit"
                  className={`editor-button ${saving ? 'loading' : ''}`}
                  disabled={saving}
                >
                  {saving ? '' : 'Salvar alterações'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Sucesso (mesmo estilo do cadastro) */}
      <div className={`success-modal ${showSuccess ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-icon">✓</div>
          <h2>Cenário atualizado com sucesso!</h2>

          <p style={{ marginTop: 8 }}>
            <strong>Pergunta:</strong> {form.pergunta || '—'}
            <br />
            <strong>Contexto:</strong> {form.contexto || '—'}
          </p>

          <button className="modal-close-button" onClick={fecharModal}>
            Fechar
          </button>
        </div>
      </div>
    </>
  );
}
