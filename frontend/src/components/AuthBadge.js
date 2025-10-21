import { useAuth } from '../auth/AuthContext';

export default function AuthBadge() {
  const { authenticated, user } = useAuth();
  return (
    <div style={{
      position:'fixed', bottom:8, right:8, zIndex:9999,
      background: authenticated ? 'rgba(67,181,129,.9)' : 'rgba(244,67,54,.9)',
      color:'#fff', padding:'6px 10px', borderRadius:8, fontSize:12, boxShadow:'0 2px 8px rgba(0,0,0,.2)'
    }}>
      {authenticated ? `Logada: ${user?.username || 'admin'}` : 'Não logada'}
    </div>
  );
}
