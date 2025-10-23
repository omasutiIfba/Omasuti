import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import './cenariosPorCategoria.css';

const CenariosPorCategoria = () => {
  const { categoria } = useParams();
  const [cenarios, setCenarios] = useState([]);

  useEffect(() => {
    const fetchCenarios = async () => {
      try {
        const response = await api.get(`/cenarios/categoria/${categoria}`);
        setCenarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar cenários:", error);
      }
    };

    fetchCenarios();
  }, [categoria]);

  return (
    <div className="cenarios-page">
      <div className="section-banner">
        <h2 className="cenarios-titulo">Cenários da categoria: {categoria.nome}</h2>
      </div>
      

      <div className="cenarios-grid">
        {cenarios.map((cenario) => (
          <div className="cenario-card" key={cenario.id}>
            {cenario.imagemPath && (
              <img
                src={`http://localhost:8080/uploads/${cenario.imagemPath}`}
                alt={cenario.nome}
                className="cenario-imagem"
              />
            )}
            <h3 className="cenario-nome">{cenario.nome}</h3>
            {cenario.frase && <p className="cenario-descricao">{cenario.frase}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenariosPorCategoria;
