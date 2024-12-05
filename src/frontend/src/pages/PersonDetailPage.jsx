import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { PersonCard, PersonsCarousel } from '@/components';
import { useState, useEffect } from 'react';
import { fetchPersonById, fetchPersonCoactors } from '@/services/personService';
import { useToast } from '@/contexts/ToastContext';

export default function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [coActors, setCoActors] = useState([]);
  const [loadingPerson, setLoadingPerson] = useState(true);
  const [loadingCoActors, setLoadingCoActors] = useState(true);
  const { showToastMessage } = useToast();

  useEffect(() => {
    const loadPerson = async () => {
      try {
        setLoadingPerson(true);
        const personData = await fetchPersonById(id);
        setPerson(personData);
        setLoadingPerson(false);
      } catch {
        showToastMessage('Error getting the person.', 'danger');
        setLoadingPerson(false);
      }
    };

    loadPerson();
  }, [id, showToastMessage]);

  useEffect(() => {
    const loadCoActors = async () => {
      try {
        setLoadingCoActors(true);
        const coActorsData = await fetchPersonCoactors(id);
        setCoActors(coActorsData);
        setLoadingCoActors(false);
      } catch {
        showToastMessage('Error getting the co-actors.', 'danger');
        setLoadingCoActors(false);
      }
    };

    loadCoActors();
  }, [id, showToastMessage]);

  useEffect(() => {
    if (!loadingPerson && !person) {
      navigate('/NotFound');
    }
  }, [loadingPerson, person, navigate]);

  return (
    <Container className="my-5">
      <Row className="mt-5">
        <Col xs={12} md={3}>
          {/*  the person card should be removed, and the information module should be inserted*/}
          <PersonCard
            id={person?.id}
            name={person?.name}
            description={person?.description}
            imageUri={person?.pictureUri}
            nameRating={person?.nameRating}
            isLoading={loadingPerson}
          />
        </Col>
        <Row className="mt-5 gap-5">
          <Col xs={12} md={3}>
            {/*  Here the button should be inserted so the action */}
          </Col>
          <Col md={6}>
            {/*  Here the rating and the 3 media cards should be inserted  */}
          </Col>
        </Row>
      </Row>
      <Row className="mt-5">
        <Col>
          <h5>Credits</h5>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h5>Co-actors</h5>
          {coActors.length > 0 ? (
            <PersonsCarousel
              persons={coActors.map((actor) => ({
                ...actor,
                name: actor.actorName,
                additionalInfo: `${actor.frequency} appearances together with ${person.name}`,
                role: `${actor.nameRating} rating`,
                imageUri: actor.pictureUri,
                id: actor.id,
              }))}
              loading={loadingCoActors}
            />
          ) : (
            <p>No co-actors found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
