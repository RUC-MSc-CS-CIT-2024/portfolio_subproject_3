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
      applyFilters(mediaResults, newFilterCriteria);
    },
    [mediaResults, applyFilters],
  );

  const handleSearch = (query_data) => {
    setMediaPage({ ...mediaPage, page: 1 });
    setQuery(query_data);
  };

  const performSearch = useCallback(
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
        setMediaResults(response);
        applyFilters(response.items, filterCriteria);

        if (params.query_type !== 'Structured') {
          let q = params.query;
          if (params.query_type !== 'Simple') {
            q = params.keywords.join(' ');
          }
          const personResponse = await fetchPersons(
            { name: q },
            personPage.page,
            personPage.count,
          );
          setPersonResults(personResponse);
        }
      } catch (error) {
        console.error('Error searching:', error.message);
        showToastMessage(
          error.message || 'Error occurred while searching.',
          'danger',
        );
        setMediaResults();
        setFilteredResults([]);
        setPersonResults();
      } finally {
        setLoading(false);
      }
    },
    [
      applyFilters,
      filterCriteria,
      mediaPage.count,
      mediaPage.page,
      personPage.count,
      personPage.page,
      showToastMessage,
    ],
  );

  useEffect(() => {
    performSearch(query);
  }, [performSearch, query]);

  let resultBody = <></>;
  if (filteredResults.length === 0 || personResults.length === 0) {
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
          personResults.numberOfItems > personPage.count && (
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
