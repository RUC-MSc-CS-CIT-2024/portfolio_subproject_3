import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PersonCard } from '@/components';
import { useState, useEffect } from 'react';
import { fetchPersonById } from '@/services/personService';

export default function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState({});

  useEffect(() => {
    const fetchPerson = async () => {
      const personData = await fetchPersonById(id);
      setPerson(personData);
    };

    fetchPerson();
  }, [id]);

  // TODO: Include   "birthDate": "1979-01-01T00:00:00", & "deathDate": null,

  return (
    <Container className="my-5">
      <PersonCard
        id={person.id}
        name={person.name}
        description={person.description}
        imageUri={person.pictureUri}
        nameRating={person.nameRating}
      />
    </Container>
  );
}
