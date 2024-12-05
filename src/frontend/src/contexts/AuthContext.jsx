import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { authenticate, refreshToken } from '@/services/authService';
import { getCookie, deleteCookie, setCookie } from '@/utils/cookie';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const didInitialise = useRef(false);

  const storeUser = (token) => {
    const decoded = jwtDecode(token);
    const userData = {
      id: decoded.user_id,
      email: decoded.email,
      username: decoded.sub,
      role: decoded.role,
    };

    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('user');
    deleteCookie('access-token');
    localStorage.removeItem('REFRESH_TOKEN');
    setIsAuthenticated(false);
    console.log('Logged out');
  }, []);

  useEffect(() => {
    if (didInitialise.current) {
      return;
    }
    didInitialise.current = true;

    // const handleStorageChange = () => {
    //   const updatedStoredUser = sessionStorage.getItem('user');
    //   if (!updatedStoredUser) {
    //     setIsAuthenticated(false);
    //     setUser(null);
    //   }
    // };

    (async () => {
      let token = getCookie('access-token');
      const localRefreshToken = localStorage.getItem('REFRESH_TOKEN');

      // If token is not present, but refresh token is, try to refresh the token
      if (!token && localRefreshToken) {
        const tokenResult = await refreshToken(localRefreshToken);
        if (tokenResult.accessToken) {
          setCookie('token', tokenResult.accessToken, tokenResult.expiresIn);
          localStorage.setItem('REFRESH_TOKEN', tokenResult.refreshToken);
          token = tokenResult.accessToken;
        }
      }

      // If token is present, parse it and set user
      if (token) {
        storeUser(token);
      } else {
        logout();
      }
      setLoading(false);
    })();

    // window.addEventListener('storage', handleStorageChange);

    // return () => {
    //   window.removeEventListener('storage', handleStorageChange);
    // };
  }, [logout]);

  const login = useCallback(async (credentials) => {
    try {
      const token = await authenticate(credentials);

      setCookie('token', token.accessToken, token.expiresIn);
      localStorage.setItem('REFRESH_TOKEN', token.refreshToken);

      storeUser(token.accessToken);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const contextValue = useMemo(() => {
    return {
      login,
      logout,
      user,
      isAuthenticated,
    };
  }, [login, logout, user, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
