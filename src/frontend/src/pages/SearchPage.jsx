import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { fetchMedia } from '../services/mediaService';
export default function SearchPage() {
  const handleSearch = async () => {
    try {
      const results = await fetchMedia({ query: 'The Matrix' });
      console.log(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <Container>
      <h1>SearchPage</h1>
      <Button variant="primary" onClick={handleSearch()}>
        Search
      </Button>
    </Container>
  );
}
