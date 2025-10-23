import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import api from "../../api/axios";

export default function EditorCenario() {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);
  const [pergunta, setPergunta] = useState("");

  const identificadorImagemUpload = (e) => {
    setImagem(e.target.files[0]);
    console.log(e.target.files[0]); // Movido para dentro da função
  }

  const handleSubmit = async () => {
    console.log("Tentando enviar para backend... ")
    if(!nome || !imagem || !pergunta){
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    const formData = new FormData();

    const cenario = {
      nome: nome,
      frase: pergunta
    };

    formData.append("cenario", JSON.stringify(cenario));
    formData.append("file", imagem);

    console.log("Cenário: ", cenario);
    console.log("Imagem: ", imagem);

    try {
      const response = await api.post("/cenarios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cenário salvo com sucesso!");
      console.log("Resposta: ", response.data);

      setNome('');
      setImagem(null);
      setPergunta('');
    } catch (error) {
      console.error("Erro ao salvar o cenário: ", error);
      alert("Erro ao salvar cenário!");
    }
  };

  return(
    <Box sx={{ padding: 4 }}>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        {/*Nomear Cenário*/}
        <TextField
          label="Nome do Cenário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />

        {/*Upload da imagem */}
        <input
          type="file"  
          accept="image/*"
          onChange={identificadorImagemUpload}
        />

        

        {/* Pergunta */}
        <TextField
          label="Pergunta do Quiz"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Salvar
        </Button>
      </form>
    </Box>
  );
}