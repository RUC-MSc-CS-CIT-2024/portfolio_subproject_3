import { Container } from 'react-bootstrap';
import { MediaCarousel, MediaGrid } from '@/components';

const titles = [
  {
    id: 1,
    title: 'Movie Title 1',
    releaseYear: '2023',
  },
  {
    id: 2,
    title: 'Movie Title 2',
    releaseYear: '2022',
  },
  {
    id: 3,
    title: 'Movie Title 3',
    releaseYear: '2021',
  },
  {
    id: 4,
    title: 'Movie Title 4',
    releaseYear: '2020',
  },
  {
    id: 5,
    title: 'Movie Title 5',
    releaseYear: '2019',
  },
  {
    id: 6,
    title: 'Movie Title 6',
    releaseYear: '2018',
  },
  {
    id: 7,
    title: 'Movie Title 7',
    releaseYear: '2017',
  },
  {
    id: 8,
    title: 'Movie Title 8',
    releaseYear: '2016',
  },
  {
    id: 9,
    title: 'Movie Title 9',
    releaseYear: '2015',
  },
  {
    id: 10,
    title: 'Movie Title 10',
    releaseYear: '2014',
  },
];

export default function MediaOverviewPage() {
  return (
    <Container>
      <h1>Media</h1>
      <MediaCarousel media={titles} />
      <MediaGrid media={titles} />
    </Container>
  );
}
