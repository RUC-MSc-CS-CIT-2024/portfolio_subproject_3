import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { MovieCard } from '@/components';
import { useMoviesPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieCarousel.css';

export default function MovieCarousel({ movies, loading }) {
  const moviesPerRow = useMoviesPerRow();

  const groupedMovies = [];
  for (let i = 0; i < movies.length; i += moviesPerRow) {
    groupedMovies.push(movies.slice(i, i + moviesPerRow));
  }

  return (
    <Container fluid className="container-layout ">
      <Carousel indicators={false} controls={true} interval={null} wrap={false}>
        {groupedMovies.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((movie) => (
                <Col key={movie.movieId} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <MovieCard
                    id={movie.movieId}
                    imageUri={movie.imageUri}
                    title={movie.title}
                    releaseYear={movie.releaseYear}
                    isLoading={loading}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
