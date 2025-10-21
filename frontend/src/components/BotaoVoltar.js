import { useNavigate } from 'react-router-dom';
import '../pages/EditorCenario/editorCenario.css';
import { useCenario } from '../pages/EditorCenario/CenarioContext';

const BotaoVoltar = () => {
  const navigate = useNavigate();
  const { resetCenario } = useCenario();

  const onClick = () => {
    resetCenario();     
    navigate(-1);  
  };

  return (
    <button 
      className='editor-button secondary'
      onClick={onClick}
    >
      Voltar
    </button>
  );
};

export default BotaoVoltar;
