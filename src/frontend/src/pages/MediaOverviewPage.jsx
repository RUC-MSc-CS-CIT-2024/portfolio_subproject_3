import { Container } from 'react-bootstrap';
import { MovieCarousel, MovieGrid } from '@/components';

const movies = [
  {
    movieId: 1,
    title: 'Movie Title 1',
    releaseYear: '2023',
  },
  {
    movieId: 2,
    title: 'Movie Title 2',
    releaseYear: '2022',
  },
  {
    movieId: 3,
    title: 'Movie Title 3',
    releaseYear: '2021',
  },
  {
    movieId: 4,
    title: 'Movie Title 4',
    releaseYear: '2020',
  },
  {
    movieId: 5,
    title: 'Movie Title 5',
    releaseYear: '2019',
  },
  {
    movieId: 6,
    title: 'Movie Title 6',
    releaseYear: '2018',
  },
  {
    movieId: 7,
    title: 'Movie Title 7',
    releaseYear: '2017',
  },
  {
    movieId: 8,
    title: 'Movie Title 8',
    releaseYear: '2016',
  },
  {
    movieId: 9,
    title: 'Movie Title 9',
    releaseYear: '2015',
  },
  {
    movieId: 10,
    title: 'Movie Title 10',
    releaseYear: '2014',
  },
];

export default function MediaOverviewPage() {
  return (
    <Container>
      <h1>Media</h1>
      <MovieCarousel movies={movies} />
      <MovieGrid movies={movies} />
    </Container>
  );
}
