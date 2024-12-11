import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchMedia } from '@/services';
import {
  MediaGrid,
  FilterMediaComponent,
  AdvancedSearchForm,
} from '@/components';

export default function SearchPage() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    type: null,
    year: null,
  });
  const [queryType, setQueryType] = useState('ExactMatch');
  const handleSearch = useCallback(
    async (params) => {
      setLoading(true);
      try {
        const resultList = await fetchMedia(params);
        setResults(resultList);
        applyFilters(resultList, filterCriteria);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
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

  useEffect(() => {
    handleSearch({ query_type: queryType });
  }, [location.search, handleSearch, queryType]);

  return (
    <Container>
      <h1>SearchPage</h1>
      <AdvancedSearchForm
        queryType={queryType}
        setQueryType={setQueryType}
        onSearch={handleSearch}
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
