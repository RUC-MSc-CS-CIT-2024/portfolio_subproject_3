import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { PersonCard } from '@/components';
import { useState, useEffect } from 'react';
import { fetchPersonById } from '@/services/personService';
import { createFollow } from '@/services/userService';
import { useToast } from '@/hooks';

export default function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const { showToastMessage } = useToast();

  useEffect(() => {
    const fetchPerson = async () => {
      const personData = await fetchPersonById(id);
      setPerson(personData);
    };

    fetchPerson();
  }, [id]);

  // TODO: Include   "birthDate": "1979-01-01T00:00:00", & "deathDate": null,

  const handleFollow = async () => {
    try {
      await createFollow(id);
      showToastMessage('Successfully followed the person', 'success');
    } catch (error) {
      console.error('Error following the person', error);
      showToastMessage('Error following the person', 'danger');
    }
  };
  return (
    <Container className="my-5">
      <PersonCard
        id={person.id}
        name={person.name}
        description={person.description}
        imageUri={person.pictureUri}
        nameRating={person.nameRating}
      />
      <Button
        variant="outline-dark"
        onClick={handleFollow}
        className="w-100 mb-2 rounded"
      >
        Follow
      </Button>
    </Container>
  );
}
