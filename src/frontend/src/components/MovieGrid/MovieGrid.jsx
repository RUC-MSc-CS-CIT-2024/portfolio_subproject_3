import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { MovieCard } from '@/components';
import { useMoviesPerRow } from '@/hooks';
import './MovieGrid.css';

export default function MovieGrid({ movies }) {
  const [showMore, setShowMore] = useState(false);
  const moviesPerRow = useMoviesPerRow();

  const firstRowMovies = movies.slice(0, moviesPerRow);
  const remainingMovies = movies.slice(moviesPerRow);

  return (
    <Container fluid>
      <Row>
        {firstRowMovies.map((movie, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className={`position-relative ${index === 0 ? 'margin-left' : ''}`}
          >
            <MovieCard
              id={movie.movieId}
              imageUri={movie.imageUri}
              title={movie.title}
              releaseYear={movie.releaseYear}
              isLoading={false}
            />
            {index === firstRowMovies.length - 1 &&
              remainingMovies.length > 0 && (
                <Button
                  variant="link"
                  onClick={() => setShowMore(!showMore)}
                  className="see-more-button"
                >
                  {showMore ? 'See Less' : 'See More'}
                </Button>
              )}
          </Col>
        ))}
      </Row>
      {showMore && (
        <Row>
          {remainingMovies.map((movie, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className={`position-relative ${index === 0 ? 'margin-left' : ''}`}
            >
              <MovieCard
                id={movie.movieId}
                imageUri={movie.imageUri}
                title={movie.title}
                releaseYear={movie.releaseYear}
                isLoading={false}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
