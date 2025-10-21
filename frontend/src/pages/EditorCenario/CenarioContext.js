import { createContext, useContext, useState } from 'react';

const CenarioContext = createContext();

export const CenarioProvider = ({ children }) => {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);
  const [pergunta, setPergunta] = useState('');
  const [categoria, setCategoria] = useState('');
  const [contexto, setContexto] = useState('');

  const resetCenario = () => {
    setNome('');
    setImagem(null);
    setCategoria('');
    setContexto('');
    setPergunta('');
  };

  return (
    <CenarioContext.Provider value={{
      nome, setNome,
      imagem, setImagem,
      pergunta, setPergunta,
      categoria, setCategoria,
      contexto, setContexto,
      resetCenario,
    }}>
      {children}
    </CenarioContext.Provider>
  );
};

export const useCenario = () => useContext(CenarioContext);
