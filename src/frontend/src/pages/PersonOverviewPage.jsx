import { Container } from 'react-bootstrap';
import { PersonsCarousel, PersonsGrid } from '@/components';

// This is a mock data for persons
const persons = [
  {
    id: 100,
    name: 'Person Name 1',
    role: 'Actor',
    additionalInfo: 'Some additional info about Person 1',
  },
  {
    id: 2,
    name: 'Person Name 2',
    role: 'Director',
    additionalInfo: 'Some additional info about Person 2',
  },
  {
    id: 3,
    name: 'Person Name 3',
    role: 'Producer',
    additionalInfo: 'Some additional info about Person 3',
  },
  {
    id: 4,
    name: 'Person Name 4',
    role: 'Writer',
    additionalInfo: 'Some additional info about Person 4',
  },
  {
    id: 5,
    name: 'Person Name 5',
    role: 'Actor',
    additionalInfo: 'Some additional info about Person 5',
  },
];
export default function PersonsOverviewPage() {
  return (
    <Container>
      <h1>Person</h1>
      <PersonsCarousel persons={persons} />
      <PersonsGrid persons={persons} />
    </Container>
  );
}
