import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PersonInformation } from '@/components';
import { useState, useEffect } from 'react';
import { fetchPersonById } from '@/services/personService';

export default function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      const personData = await fetchPersonById(id);
      setPerson(personData);
      setIsLoading(false);
    };

    fetchPerson();
  }, [id]);

  return (
    <Container className="my-5">
      <PersonInformation
        pictureUri={person.pictureUri}
        name={person.name}
        birthDate={person.birthDate}
        deathDate={person.deathDate}
        bio={person.description}
        rating={person.nameRating}
        isLoading={isLoading}
      />
    </Container>
  );
}
