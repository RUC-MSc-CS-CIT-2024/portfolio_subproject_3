import { useState, useEffect, useRef } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { fetchMedia, fetchPersons } from '@/services';
import {
  MediaGrid,
  AdvancedSearchForm,
  Pagination,
  PersonsGrid,
} from '@/components';
import { useToast } from '@/hooks';
import { useSearchParams, useLocation } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [mediaLoading, setMediaLoading] = useState(true);
  const [personLoading, setPersonLoading] = useState(true);
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

  const query = searchParams.get('query');
  const query_type = searchParams.get('query_type') || 'Simple';
  const title = searchParams.get('title');
  const plot = searchParams.get('plot');
  const character = searchParams.get('character');
  const person = searchParams.get('person');

  const { showToastMessage } = useToast();

  const [mediaShowMore, setMediaShowMore] = useState(false);
  const [personShowMore, setPersonShowMore] = useState(false);

  const mediaRef = useRef(null);
  const personsRef = useRef(null);

  const handleSearch = (query_data) => {
    setMediaPage({ ...mediaPage, page: 1 });
    setPersonPage({ ...personPage, page: 1 });

    setSearchParams((prev) => {
      if (query_data.query) {
        prev.set('query', query_data.query);
      } else if (query_data.keywords) {
        prev.set('query', query_data.keywords.join(' '));
      } else {
        prev.delete('query');
      }

      query_data.query_type
        ? prev.set('query_type', query_data.query_type)
        : prev.delete('query_type');

      query_data.title
        ? prev.set('title', query_data.title)
        : prev.delete('title');

      query_data.plot ? prev.set('plot', query_data.plot) : prev.delete('plot');

      query_data.character
        ? prev.set('character', query_data.character)
        : prev.delete('character');

      query_data.person
        ? prev.set('person', query_data.person)
        : prev.delete('person');

      return prev;
    });
  };

  useEffect(() => {
    setMediaLoading(true);
    setPersonLoading(true);
    setMediaShowMore(false);
    setPersonShowMore(false);
    setTimeout(() => {
      setMediaLoading(false);
      setPersonLoading(false);
    }, 5000);
  }, [location]);

  useEffect(() => {
    let params = {
      query_type: query_type,
      page: mediaPage.page,
      count: mediaPage.count,
    };
    if (query_type == 'Simple') {
      params.query = query;
    } else if (query_type == 'BestMatch' || query_type == 'ExactMatch') {
      params.keywords = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0);
      if (params.keywords.length === 0) {
        setMediaLoading(false);
        return;
      }
    } else if (query_type == 'Structured') {
      params.title = title;
      params.plot = plot;
      params.character = character;
      params.person = person;
    }

    (async () => {
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
      setMediaLoading(false);
    })();
  }, [
    character,
    mediaPage.count,
    mediaPage.page,
    person,
    plot,
    query,
    query_type,
    showToastMessage,
    title,
  ]);

  useEffect(() => {
    if (query_type == 'Structured') {
      setPersonResults({ items: [], numberOfItems: 0 });
      setPersonLoading(false);
      return;
    }
    let params = {
      name: query,
      page: personPage.page,
      count: personPage.count,
    };

    (async () => {
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
      setPersonLoading(false);
    })();
  }, [personPage.count, personPage.page, query, query_type, showToastMessage]);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  let resultBody;
  if (mediaLoading || personLoading) {
    resultBody = (
      <div className="align-middle text-center mt-5">
        <h2>Loading...</h2>
        <Spinner animation="grow" />
      </div>
    );
  } else if (
    mediaResults.items.length === 0 &&
    personResults.items.length === 0
  ) {
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
