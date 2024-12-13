import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');
  const search = (query) => {
    query = query.trim();
    setQuery(query);

    if (query !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      navigate(`/search`);
    }
  };

  useEffect(() => {
    console.log(pathname);
    if (pathname === '/') {
      console.log('clearing query');
      setQuery('');
    }
  }, [pathname]);

  return (
    <SearchContext.Provider value={{ query, search }}>
      {children}
    </SearchContext.Provider>
  );
};
