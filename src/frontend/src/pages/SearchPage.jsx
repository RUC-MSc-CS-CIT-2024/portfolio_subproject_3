import { useState, useEffect, useCallback, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { fetchMedia, fetchPersons } from '@/services';
import {
  MediaGrid,
  AdvancedSearchForm,
  Pagination,
  PersonsGrid,
} from '@/components';
import { useToast } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const [mediaResults, setMediaResults] = useState({
    items: [],
    numberOfItems: 0,
  });
  const [mediaPage, setMediaPage] = useState({
    page: 1,
    count: 24,
  });

  const [personResults, setPersonResults] = useState({
    items: [],
    numberOfItems: 0,
  });
  const [personPage, setPersonPage] = useState({
    page: 1,
    count: 24,
  });

  const [query, setQuery] = useState({
    query: searchParams.get('query') || '',
    query_type: searchParams.get('query_type') || 'Simple',
    title: searchParams.get('title') || '',
    plot: searchParams.get('plot') || '',
    character: searchParams.get('character') || '',
    person: searchParams.get('person') || '',
  });

  const { showToastMessage } = useToast();

  const [mediaShowMore, setMediaShowMore] = useState(false);
  const [personShowMore, setPersonShowMore] = useState(false);

  const mediaRef = useRef(null);
  const personsRef = useRef(null);

  const handleSearch = (query_data) => {
    setQuery(query_data);
    setMediaPage({ ...mediaPage, page: 1 });
    setPersonPage({ ...personPage, page: 1 });
  };

  const performMediaSearch = useCallback(
    async (query_data = true) => {
      let params = {
        ...query_data,
        page: mediaPage.page,
        count: mediaPage.count,
      };

      try {
        const response = await fetchMedia(params);
        setMediaResults(response);
      } catch (error) {
        showToastMessage(
          error.message || 'Error occurred while searching media.',
          'danger',
        );
        setMediaResults({ items: [], numberOfItems: 0 });
      }
    },
    [mediaPage.count, mediaPage.page, showToastMessage],
  );

  const performPersonSearch = useCallback(
    async (query_data) => {
      if (query.query_type == 'Structured') {
        setPersonResults({ items: [], numberOfItems: 0 });
      } else if (query.query_type == 'Simple') {
        let params = {
          name: query_data.query,
          page: personPage.page,
          count: personPage.count,
        };
        try {
          const response = await fetchPersons(params);
          setPersonResults(response);
        } catch (error) {
          showToastMessage(
            error.message || 'Error occurred while searching persons.',
            'danger',
          );
          setPersonResults({ items: [], numberOfItems: 0 });
        }
      } else if (query.query_type !== 'Simple') {
        let params = {
          name: query_data.keywords.join(' '),
          page: personPage.page,
          count: personPage.count,
        };
        try {
          const response = await fetchPersons(params);
          setPersonResults(response);
        } catch (error) {
          showToastMessage(
            error.message || 'Error occurred while searching persons.',
            'danger',
          );
          setPersonResults({ items: [], numberOfItems: 0 });
        }
      }
    },
    [personPage.count, personPage.page, query.query_type, showToastMessage],
  );

  useEffect(() => {
    performMediaSearch(query);
  }, [performMediaSearch, query]);

  useEffect(() => {
    performPersonSearch(query);
  }, [performPersonSearch, query]);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  let resultBody;
  if (mediaResults.items.length === 0 && personResults.items.length === 0) {
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
        {mediaResults.items.length > 0 && (
          <>
            <h3 className="mt-2" ref={mediaRef}>
              Media
            </h3>
            <MediaGrid
              media={mediaResults.items}
              onShowMore={setMediaShowMore}
            />
            {mediaShowMore && mediaResults.numberOfItems > mediaPage.count && (
              <Pagination
                totalItems={mediaResults.numberOfItems}
                itemsPerPage={mediaPage.count}
                currentPage={mediaPage.page}
                onPageChange={(pageNumber) => {
                  setMediaPage({ ...mediaPage, page: pageNumber });
                  scrollToRef(mediaRef);
                }}
              />
            )}
          </>
        )}
        {personResults.items.length > 0 && (
          <>
            <h3 className="mt-2" ref={personsRef}>
              Persons
            </h3>
            <PersonsGrid
              persons={personResults.items}
              onShowMore={setPersonShowMore}
            />
            {personShowMore &&
              personResults.numberOfItems > personPage.count && (
                <Pagination
                  totalItems={personResults.numberOfItems}
                  itemsPerPage={personPage.count}
                  currentPage={personPage.page}
                  onPageChange={(pageNumber) => {
                    setPersonPage({ ...personPage, page: pageNumber });
                    scrollToRef(personsRef);
                  }}
                />
              )}
          </>
        )}
      </>
    );
  }

  return (
    <Container className="mt-3">
      <AdvancedSearchForm className="mb-4" onSearch={handleSearch} />
      {resultBody}
    </Container>
  );
}
