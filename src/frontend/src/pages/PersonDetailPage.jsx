import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PersonCard } from '@/components';

export default function PersonDetailPage() {
  const { id } = useParams();

  const person = {
    id,
    name: 'Leonardo DiCaprio',
    role: 'Actor',
    imageUri: 'https://templated.co/meme-templates/leonardo-dicaprio/',
    additionalInfo:
      'Leonardo DiCaprio is known for iconic roles in Titanic, The Revenant, and Inception.',
  };

  return (
    <Container className="my-5">
      <PersonCard
        id={person.id}
        name={person.name}
        role={person.role}
        imageUri={person.imageUri}
        additionalInfo={person.additionalInfo}
      />
    </Container>
  );
}
