import { useNavigate } from 'react-router-dom';
import './selecionarCategoria.css';
import { useCenario } from '../EditorCenario/CenarioContext';
import BotaoSair from '../../components/BotaoSair';

const categorias = [
  {
    nome: "Localização",
    imagem: "/categorias/localizacao.jpg",
    valor: "localizacao"
  },
  {
    nome: "Identificação",
    imagem: "/categorias/identificacao.jpg",
    valor: "identificacao"
  },
  {
    nome: "Interpretação",
    imagem: "/categorias/interpretacao.jpg",
    valor: "interpretacao"
  }
];

const SelecionarCategoria = () => {
  const navigate = useNavigate();
  const { setCategoria } = useCenario();

  const escolherCategoria = (categoria) => {
    setCategoria(categoria);
    navigate(`/gerenciar/categorias/${categoria}`);
  };


  return (
    <div className="selecionar-categoria-background">
      <div className="selecionar-categoria-content">
        <BotaoSair className="btn-sair-top" />
        <div className="section-banner">
          <h1 className="selecionar-categoria-title">Escolha uma categoria para gerenciar</h1>
        </div>
        
        <div className="categoria-grid">
          {categorias.map((cat) => (
            <div key={cat.valor} className="categoria-card" onClick={() => escolherCategoria(cat.valor)}>
              <img src={cat.imagem} alt={cat.nome} className="categoria-imagem" />
              <div className="categoria-nome">{cat.nome}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelecionarCategoria;
