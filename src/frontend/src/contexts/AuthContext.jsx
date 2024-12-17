import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { authenticate, refreshToken as refreshTokenService } from '@/services';
import { getCookie, deleteCookie, setCookie } from '@/utils';

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
    deleteCookie('token');
    localStorage.removeItem('REFRESH_TOKEN');
    setIsAuthenticated(false);
  }, []);

  const refresh = useCallback(
    async (refreshToken) => {
      const localRefreshToken =
        refreshToken ?? localStorage.getItem('REFRESH_TOKEN');
      if (!localRefreshToken) {
        return;
      }

      try {
        const tokenResult = await refreshTokenService(localRefreshToken);
        if (tokenResult.accessToken) {
          setCookie('token', tokenResult.accessToken, tokenResult.expiresIn);
          localStorage.setItem('REFRESH_TOKEN', tokenResult.refreshToken);
          storeUser(tokenResult.accessToken);
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
      }
    },
    [logout],
  );

  useEffect(() => {
    if (didInitialise.current) {
      return;
    }
    didInitialise.current = true;

    (async () => {
      let token = getCookie('token');
      const localRefreshToken = localStorage.getItem('REFRESH_TOKEN');
      if (!token && localRefreshToken) {
        // If token is not present, but refresh token is, try to refresh the token
        const tokenResult = await refreshTokenService(localRefreshToken);
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

    const handleStorageChange = (e) => {
      if (e.key === 'user' && e.newValue === null) {
        logout();
      }
      if (
        e.key === 'REFRESH_TOKEN' &&
        e.newValue !== undefined &&
        e.newValue !== e.oldValue
      ) {
        let token = getCookie('token');
        if (token !== undefined) {
          storeUser(token);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
      refresh,
      user,
      isAuthenticated,
    };
  }, [login, logout, refresh, user, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
