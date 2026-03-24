import { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not authenticated

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = parseJwt(token);
        // Check expiry
        if (payload.exp * 1000 > Date.now()) {
          setUser({ username: payload.sub, roles: payload.roles ?? [] });
        } else {
          localStorage.removeItem('token'); // expired, clear it
        }
      } catch {
        localStorage.removeItem('token'); // malformed
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const payload = parseJwt(token);
    setUser({ username: payload.sub, roles: payload.roles ?? [] });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
