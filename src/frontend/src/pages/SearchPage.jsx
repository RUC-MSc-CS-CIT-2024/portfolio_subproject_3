import { useState, useEffect, useCallback } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { fetchMedia, fetchPersons } from '@/services';
import {
  MediaGrid,
  FilterMediaComponent,
  AdvancedSearchForm,
  Pagination,
  PersonsGrid,
} from '@/components';
import { useToast } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [mediaResults, setMediaResults] = useState({
    items: [],
    numberOfItems: 0,
  });
  const [mediaPage, setMediaPage] = useState({ page: 1, count: 24 });
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    type: null,
    year: null,
  });

  const [personResults, setPersonResults] = useState({
    items: [],
    numberOfItems: 0,
  });
  const [personPage, setPersonPage] = useState({ page: 1, count: 24 });

  const [query, setQuery] = useState({
    query: searchParams.get('query') || '',
    query_type: searchParams.get('query_type') || 'Simple',
    title: searchParams.get('title') || '',
    plot: searchParams.get('plot') || '',
    character: searchParams.get('character') || '',
    person: searchParams.get('person') || '',
  });

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
      applyFilters(mediaResults.items, newFilterCriteria);
    },
    [mediaResults.items, applyFilters],
  );

  const handleSearch = (query_data) => {
    setMediaPage({ ...mediaPage, page: 1 });
    setQuery(query_data);
  };

  const performMediaSearch = useCallback(
    async (query_data) => {
      setLoading(true);
      let params = {
        ...query_data,
        ...filterCriteria,
        page: mediaPage.page,
        count: mediaPage.count,
      };
      try {
        const response = await fetchMedia(params);
        console.log('this is the data for persons: ', response);
        setMediaResults(response);
        applyFilters(response.items, filterCriteria);
      } catch (error) {
        console.error('Error searching media:', error.message);
        showToastMessage(
          error.message || 'Error occurred while searching media.',
          'danger',
        );
        setMediaResults({ items: [], numberOfItems: 0 });
        setFilteredResults([]);
      } finally {
        setLoading(false);
      }
    },
    [
      applyFilters,
      filterCriteria,
      mediaPage.count,
      mediaPage.page,
      showToastMessage,
    ],
  );

  const performPersonSearch = useCallback(
    async (query_data) => {
      setLoading(true);
      let params = {
        name: query_data.query,
        page: personPage.page,
        count: personPage.count,
      };
      try {
        const response = await fetchPersons(params);
        console.log('this is the data for persons: ', response);
        setPersonResults(response);
      } catch (error) {
        console.error('Error searching persons:', error.message);
        showToastMessage(
          error.message || 'Error occurred while searching persons.',
          'danger',
        );
        setPersonResults({ items: [], numberOfItems: 0 });
      } finally {
        setLoading(false);
      }
    },
    [personPage.count, personPage.page, showToastMessage],
  );

  useEffect(() => {
    performMediaSearch(query);
  }, [performMediaSearch, query]);

  useEffect(() => {
    performPersonSearch(query);
  }, [performPersonSearch, query]);

  let resultBody = <></>;
  if (filteredResults.length === 0 && personResults.items.length === 0) {
    resultBody = (
      <div className="d-flex justify-content-center align-items-center py-5">
        <h2 className="text-muted">
          No matches found. Try a different search.
        </h2>
      </div>
    );
  } else {
    resultBody = (
      <>
        <h3 className="mt-2">Media</h3>
        <FilterMediaComponent
          className="mb-4"
          onFilterChange={handleFilterChange}
        />
        <MediaGrid media={filteredResults} />
        {filteredResults.length > 0 &&
          mediaResults.numberOfItems > mediaPage.count && (
            <Pagination
              totalItems={mediaResults.numberOfItems}
              itemsPerPage={mediaPage.count}
              currentPage={mediaPage.page}
              onPageChange={(pageNumber) =>
                setMediaPage({ ...mediaPage, page: pageNumber })
              }
            />
          )}
        <h3 className="mt-2">Persons</h3>
        <PersonsGrid persons={personResults.items} />
        {personResults.items.length > 0 &&
          personResults.numberOfItems > personPage.count && (
            <Pagination
              totalItems={personResults.numberOfItems}
              itemsPerPage={personPage.count}
              currentPage={personPage.page}
              onPageChange={(pageNumber) =>
                setPersonPage({ ...personPage, page: pageNumber })
              }
            />
          )}
      </>
    );
  }

  return (
    <Container className="mt-3">
      <AdvancedSearchForm className="mb-4" onSearch={handleSearch} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        resultBody
      )}
    </Container>
  );
}
