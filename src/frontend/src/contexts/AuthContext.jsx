import { createContext, useState, useEffect } from 'react';
import { login as loginService } from '@/services/authService';
import { setCookie, getCookie, deleteCookie } from '@/utils/cookie';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const parseToken = (token) => {
  const decoded = jwtDecode(token);
  return {
    id: decoded.user_id,
    email: decoded.email,
    username: decoded.sub,
    role: decoded.role,
    token,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      const userData = parseToken(token);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const token = await loginService(credentials);
      const userData = parseToken(token);

      sessionStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setCookie('token', token, 1);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    deleteCookie('token');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
