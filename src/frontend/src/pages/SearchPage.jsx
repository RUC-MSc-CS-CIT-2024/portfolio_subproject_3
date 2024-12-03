import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { fetchMedia } from '../services/mediaService';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';

export default function SearchPage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get('q'),
  );

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      return;
    }

    try {
      const results = await fetchMedia({
        query: searchQuery,
        queryType: 'Simple',
      });
      setMovies(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const searchQuery = new URLSearchParams(location.search).get('q');
      setQuery(searchQuery);
      await handleSearch(searchQuery);
      console.log('searchQuery:', searchQuery);
    }
    fetchData();
  }, [location.search]);

  return (
    <Container>
      <h1>SearchPage</h1>
      <SearchForm btnVariant="dark" />
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie.title}
            <img src={movie.posterUri} alt={movie.title} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
