// SearchPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { fetchMedia } from '@/services';
import {
  MediaGrid,
  FilterMediaComponent,
  AdvancedSearchForm,
} from '@/components';

export default function SearchPage() {
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    type: null,
    year: null,
  });

  // Default to 'Simple' since that's now the correct value
  const [queryType, setQueryType] = useState('Simple');
  const [query, setQuery] = useState('');

  const [keywords, setKeywords] = useState([]);
  const [structuredFields, setStructuredFields] = useState({
    title: '',
    plot: '',
    character: '',
    person: '',
  });

  const applyFilters = useCallback((results, filterCriteria) => {
    const { type, year } = filterCriteria;
    const filtered = results.filter((item) => {
      const matchesType = type ? item.type === type : true;
      const matchesYear = year ? item.releaseYear === year : true;
      return matchesType && matchesYear;
    });
    setFilteredResults(filtered);
  }, []);

  const handleFilterChange = useCallback(
    (newFilterCriteria) => {
      setFilterCriteria(newFilterCriteria);
      applyFilters(results, newFilterCriteria);
    },
    [results, applyFilters],
  );

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      let params = {
        queryType,
        ...filterCriteria,
      };

      if (queryType === 'Simple') {
        params.query = query;
      } else if (queryType === 'ExactMatch' || queryType === 'BestMatch') {
        params.keywords = keywords;
      } else if (queryType === 'Structured') {
        params = { ...params, ...structuredFields };
      }

      const response = await fetchMedia(params);
      const resultList = response.items || [];
      setResults(resultList);
      applyFilters(resultList, filterCriteria);
    } catch (error) {
      console.error('Error searching:', error.message);
    } finally {
      setLoading(false);
    }
  }, [
    query,
    queryType,
    filterCriteria,
    keywords,
    structuredFields,
    applyFilters,
  ]);

  const handleAdvancedSearch = useCallback((params) => {
    if (params.query_type) setQueryType(params.query_type);

    if (params.query_type === 'Simple' && params.query) {
      setQuery(params.query);
    }

    if (
      (params.query_type === 'ExactMatch' ||
        params.query_type === 'BestMatch') &&
      params.keywords
    ) {
      setKeywords(params.keywords);
      setQuery('');
    }

    if (params.query_type === 'Structured') {
      setStructuredFields({
        title: params.title || '',
        plot: params.plot || '',
        character: params.character || '',
        person: params.person || '',
      });
      setQuery('');
    }
    // Do NOT call handleSearch here, It will break the search completely.
  }, []);

  useEffect(() => {
    handleSearch();
  }, [
    query,
    queryType,
    keywords,
    structuredFields,
    filterCriteria,
    handleSearch,
  ]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryValue = searchParams.get('q') || '';
    setQuery(queryValue);
  }, [location.search]);

  return (
    <Container className="mt-5">
      <h1 className="text-center fw-bold mb-4">Search Movies</h1>
      <AdvancedSearchForm
        queryType={queryType}
        setQueryType={setQueryType}
        onSearch={handleAdvancedSearch}
      />
      <FilterMediaComponent onFilterChange={handleFilterChange} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <h2 className="text-muted">
            No matches found. Try a different search.
          </h2>
        </div>
      ) : (
        <MediaGrid media={filteredResults} />
      )}
    </Container>
  );
}
