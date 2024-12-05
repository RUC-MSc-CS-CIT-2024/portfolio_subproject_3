import Container from 'react-bootstrap/Container';
import { fetchMedia } from '../services/mediaService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { SearchForm, MediaGrid, FilterMediaComponent } from '@/components';

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = useCallback(async (searchQuery, queryType) => {
    if (!searchQuery) return;

    try {
      const resultList = await fetchMedia({ query: searchQuery, queryType });
      setResults(resultList);
      setFilteredResults(resultList);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }, []);

  const handleFilterChange = useCallback(
    (filterCriteria) => {
      if (!filterCriteria || !filterCriteria.type) {
        setFilteredResults(results);
        return;
      }

      const newFilteredResults = results.filter(
        (item) => item.type === filterCriteria.type,
      );
      setFilteredResults(newFilteredResults);
    },
    [results],
  );

  const fetchData = useCallback(async () => {
    const searchQuery = new URLSearchParams(location.search).get('q') || 'all';
    const queryType = location.search ? 'Simple' : 'All';
    setLoading(true);

    try {
      await handleSearch(searchQuery, queryType);
    } catch (err) {
      console.error('Error during search:', err.message);
    } finally {
      setLoading(false);
    }
  }, [location.search, handleSearch]);

  useEffect(() => {
    if (!location.search) return;
    fetchData();
  }, [location.search, fetchData]);

  return (
    <Container>
      <h1>SearchPage</h1>
      <SearchForm
        btnVariant="dark"
        onSearch={(query) => navigate(`/search?q=${encodeURIComponent(query)}`)}
      />
      {!loading && results.length === 0 && <div>No results found.</div>}
      {loading && results.length === 0 && <div>Loading...</div>}
      {!loading && results.length > 0 && (
        <>
          <FilterMediaComponent onFilterChange={handleFilterChange} />
          {!loading && filteredResults.length === 0 && (
            <div>No filtered results found.</div>
          )}
          <MediaGrid media={filteredResults} loading={loading} />
        </>
      )}
    </Container>
  );
}
