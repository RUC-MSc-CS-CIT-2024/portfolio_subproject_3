import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { PersonsCarousel, PersonsGrid } from '@/components';
import { fetchPersons } from '@/services/personService';
import { useToast } from '@/contexts/ToastContext';

export default function PersonsOverviewPage() {
  const [persons, setPersons] = useState([]);
  const { showToastMessage } = useToast();

  useEffect(() => {
    const loadPersons = async () => {
      try {
        const personsData = await fetchPersons();
        setPersons(personsData.items);
      } catch {
        showToastMessage('Error getting persons.', 'danger');
      }
    };

    loadPersons();
  }, [showToastMessage]);

  return (
    <Container>
      <h1>Persons</h1>
      <PersonsCarousel persons={persons} />
      <PersonsGrid persons={persons} />
    </Container>
  );
}
