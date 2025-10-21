// src/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp é em segundos
    if (!payload.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  } catch {
    return true;
  }
}

export default function ProtectedRoute({ children }) {
  const { token, logout } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (isTokenExpired(token)) {
    logout();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
