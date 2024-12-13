import { useState, useEffect, useCallback } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { fetchMedia } from '@/services';
import {
  MediaGrid,
  FilterMediaComponent,
  AdvancedSearchForm,
  Pagination,
} from '@/components';
import { useToast } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    type: null,
    year: null,
  });
  const [currentMediaPage, setCurrentMediaPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [query, setQuery] = useState({
    query: searchParams.get('query') || '',
    query_type: searchParams.get('query_type') || 'Simple',
    title: searchParams.get('title') || '',
    plot: searchParams.get('plot') || '',
    character: searchParams.get('character') || '',
    person: searchParams.get('person') || '',
  });

  const mediaItemsPerPage = 24;

  const { showToastMessage } = useToast();

  const applyFilters = useCallback((resultsToFilter, criteria) => {
    const { type, year } = criteria;
    const filtered = resultsToFilter.filter((item) => {
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

  const handleSearch = (query_data) => {
    setCurrentMediaPage(1);
    setQuery(query_data);
  };

  const performSearch = useCallback(
    async (query_data) => {
      setLoading(true);
      let params = {
        ...query_data,
        ...filterCriteria,
        page: currentMediaPage,
        count: mediaItemsPerPage,
      };
      try {
        console.log('Searching with params:', params);
        const response = await fetchMedia(params);
        const resultList = response.items || [];
        setResults(resultList);
        setTotalItems(response.numberOfItems || resultList.length);
        applyFilters(resultList, filterCriteria);
      } catch (error) {
        console.error('Error searching:', error.message);
        showToastMessage(
          error.message || 'Error occurred while searching.',
          'danger',
        );
        setResults([]);
        setFilteredResults([]);
      } finally {
        setLoading(false);
      }
    },
    [applyFilters, currentMediaPage, filterCriteria, showToastMessage],
  );

  const handleMediaPageChange = (pageNumber) => {
    setCurrentMediaPage(pageNumber);
  };

  useEffect(() => {
    performSearch(query);
  }, [performSearch, query]);

  return (
    <Container className="mt-5">
      <h1 className="text-center fw-bold mb-4">Search Movies</h1>
      <AdvancedSearchForm className="mb-4" onSearch={handleSearch} />
      <FilterMediaComponent
        className="mb-4"
        onFilterChange={handleFilterChange}
      />
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
        <>
          <MediaGrid media={filteredResults} loading={loading} />
          {totalItems > mediaItemsPerPage && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={mediaItemsPerPage}
              currentPage={currentMediaPage}
              onPageChange={handleMediaPageChange}
            />
          )}
        </>
      )}
    </Container>
  );
}
