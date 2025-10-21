import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import './login.css';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || '/categorias';

  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(u, p);
      nav('/categorias');
    } catch {
      setErr('Credenciais inválidas');
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={submit}>
        <h2>Entrar</h2>
        <input placeholder="Usuário" value={u} onChange={e=>setU(e.target.value)} />
        <input placeholder="Senha" type="password" value={p} onChange={e=>setP(e.target.value)} />
        {err && <div className="login-erro">{err}</div>}
        <button type="submit" className="btn-primario">Entrar</button>
      </form>
    </div>
  );
}
