import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { PersonsCarousel, PersonsGrid } from '@/components';
import { fetchPersons } from '@/services/personService';
import { useToast } from '@/contexts/ToastContext';

export default function PersonsOverviewPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToastMessage } = useToast();

  useEffect(() => {
    const loadPersons = async () => {
      try {
        const personsData = await fetchPersons();
        setPersons(personsData.items);
      } catch {
        showToastMessage('Error getting persons.', 'danger');
      } finally {
        setLoading(false);
      }
    };

    loadPersons();
  }, [showToastMessage]);

  return (
    <Container>
      <h1>Persons</h1>
      <PersonsCarousel persons={persons} loading={loading} />
      <PersonsGrid persons={persons} loading={loading} />
    </Container>
  );
}
