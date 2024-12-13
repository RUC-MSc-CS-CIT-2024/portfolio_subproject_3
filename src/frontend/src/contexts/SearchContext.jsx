import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');

  const updateQuery = (query) => {
    query = query.trim();
    setQuery(query);
  };

  const searchWithNavigation = (query) => {
    setQuery(query);

    if (query !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      navigate(`/search`);
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      setQuery('');
    }
  }, [pathname]);

  return (
    <SearchContext.Provider
      value={{ query, setQuery: updateQuery, searchWithNavigation }}
    >
      {children}
    </SearchContext.Provider>
  );
};
