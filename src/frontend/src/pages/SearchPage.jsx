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
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    type: null,
    year: null,
  });
  const [currentMediaPage, setCurrentMediaPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [personResults, setPersonResults] = useState({
    items: [],
    numberOfItems: 0,
  });
  const [personPage, setPersonPage] = useState({ page: 1, count: 10 });

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
        const response = await fetchMedia(params);
        const resultList = response.items || [];
        setResults(resultList);
        setTotalItems(response.numberOfItems || resultList.length);
        applyFilters(resultList, filterCriteria);

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
          console.log(personResponse);
          setPersonResults(personResponse);
        }
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
    [
      applyFilters,
      currentMediaPage,
      filterCriteria,
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
        <MediaGrid media={filteredResults} loading={loading} />
        {filteredResults.length > 0 && totalItems > mediaItemsPerPage && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={mediaItemsPerPage}
            currentPage={currentMediaPage}
            onPageChange={(pageNumber) => setCurrentMediaPage(pageNumber)}
          />
        )}
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
      ) : (
        resultBody
      )}
    </Container>
  );
}
