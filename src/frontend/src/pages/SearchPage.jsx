import Container from 'react-bootstrap/Container';
import { fetchMedia } from '../services/mediaService';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchForm, MediaGrid } from '@/components';

export default function SearchPage() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (searchQuery, gueryType) => {
    if (!searchQuery) {
      return;
    }

    try {
      const results = await fetchMedia({
        query: searchQuery,
        queryType: gueryType,
      });
      setResults(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
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
      <SearchForm btnVariant="dark" />
      {!loading && results.length === 0 && <div>No results found.</div>}
      {loading && results.length === 0 && <div>Loading...</div>}
      <MediaGrid media={results} loading={loading} />
    </Container>
  );
}
