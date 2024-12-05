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
  const [filterCriteria, setFilterCriteria] = useState({
    type: null,
    year: null,
  });

  const handleSearch = useCallback(
    async (searchQuery, queryType) => {
      if (!searchQuery) return;

      try {
        const resultList = await fetchMedia({ query: searchQuery, queryType });
        setResults(resultList);
        applyFilters(resultList, filterCriteria);
      } catch (error) {
        console.error('Error searching:', error);
      }
    },
    [filterCriteria],
  );

  const applyFilters = (results, filterCriteria) => {
    const { type, year } = filterCriteria;
    const filtered = results.filter((item) => {
      const matchesType = type ? item.type === type : true;
      const matchesYear = year ? item.releaseYear === year : true;
      return matchesType && matchesYear;
    });
    setFilteredResults(filtered);
  };

  const handleFilterChange = useCallback(
    (newFilterCriteria) => {
      setLoading(true);
      setFilterCriteria(newFilterCriteria);
      applyFilters(results, newFilterCriteria);
      setLoading(false);
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
      <FilterMediaComponent onFilterChange={handleFilterChange} />
      {!loading && filteredResults.length === 0 && (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <h2>No matches found.</h2>
        </div>
      )}
      <MediaGrid media={filteredResults} loading={loading} />
    </Container>
  );
}
