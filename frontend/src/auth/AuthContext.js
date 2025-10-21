import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

// util: decodifica o payload do JWT pra checar expiração (sem libs externas)
function getJwtPayload(token) {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = getJwtPayload(token);
  if (!payload || !payload.exp) return false; // se não tiver exp, tratamos como válido
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // estado derivado
  const authenticated = useMemo(() => {
    if (!token) return false;
    if (isTokenExpired(token)) return false;
    return true;
  }, [token]);

  // Interceptor: anexa token em TODAS as requests
  useEffect(() => {
    const reqId = api.interceptors.request.use((cfg) => {
      if (authenticated && token) {
        cfg.headers.Authorization = `Bearer ${token}`;
      }
      return cfg;
    });
    const resId = api.interceptors.response.use(
      (res) => res,
      (err) => {
        // Se o backend devolver 401, limpamos o token e forçamos login
        if (err?.response?.status === 401) {
          localStorage.removeItem('token');
          setToken('');
          // opcional: redirecionar aqui
          // window.location.assign('/login');
        }
        return Promise.reject(err);
      }
    );
    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [authenticated, token]);

  // Checagem de expiração ao montar
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      setToken('');
    }
  }, []); // só na primeira montagem

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    // espera { token: '...' }
    localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  // (opcional) dados do usuário — aqui usamos username do payload se existir
  const user = useMemo(() => {
    if (!authenticated) return null;
    const payload = getJwtPayload(token);
    const username = payload?.sub || 'admin';
    return { username };
  }, [authenticated, token]);

  return (
    <AuthCtx.Provider value={{ token, user, authenticated, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
