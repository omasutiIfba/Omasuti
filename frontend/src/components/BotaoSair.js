import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function BotaoSair({ className = 'btn-excluir' }) {
  const { logout } = useAuth();
  const nav = useNavigate();

  const onClick = () => {
    logout();
    nav('/login', { replace: true });
  };

  return (
    <button type="button" className={className} onClick={onClick}>
      Sair
    </button>
  );
}
