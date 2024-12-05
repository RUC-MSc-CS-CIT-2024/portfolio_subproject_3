import Container from 'react-bootstrap/Container';
import { fetchMedia } from '../services/mediaService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchForm, MediaGrid, FilterMediaComponent } from '@/components';

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = async (searchQuery, gueryType) => {
    if (!searchQuery) {
      return;
    }

    try {
      const resultList = await fetchMedia({
        query: searchQuery,
        queryType: gueryType,
      });
      setResults(resultList);
      setFilteredResults(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleFilterChange = (filterCriteria) => {
    const newFilteredResults = results.filter(
      (item) => item.type === filterCriteria.type,
    );
    setFilteredResults(newFilteredResults);
  };

  useEffect(() => {
    const fetchData = async (searchQuery, type) => {
      setLoading(true);
      try {
        await handleSearch(searchQuery, type);
      } catch (err) {
        console.error('Error during search:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (location.search === '') {
      fetchData('all', 'All');
    }

    const search = new URLSearchParams(location.search).get('q');
    fetchData(search, 'Simple');
  }, [location.search]);

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
          <MediaGrid media={filteredResults} loading={loading} />
        </>
      )}
    </Container>
  );
}
