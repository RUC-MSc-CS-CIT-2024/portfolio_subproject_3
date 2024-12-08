import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PersonsCarousel, PersonInformation, CreditsList } from '@/components';
import { useState, useEffect } from 'react';
import { fetchPersonById, fetchPersonCoactors } from '@/services/personService';
import { createFollow } from '@/services/userService';
import { useToast } from '@/hooks';

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
        navigate('/persons');
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
      } catch {
        showToastMessage('Error getting the co-actors.', 'danger');
      } finally {
        setLoadingCoActors(false);
      }
    };

    loadCoActors();
  }, [id]);

  useEffect(() => {
    if (!loadingPerson && !person) {
      navigate('/NotFound');
    }
  }, [loadingPerson, person, navigate]);

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
      <Row className="mt-5">
        <Col md={12}>
          <PersonInformation
            pictureUri={person?.pictureUri}
            name={person?.name}
            birthDate={person?.birthDate}
            deathDate={person?.deathDate}
            bio={person?.description}
            rating={person?.nameRating}
            score={person?.score}
            popularity={person?.popularity}
            alsoKnownAs={person?.alsoKnownAs}
            homepage={person?.homepage}
            placeOfBirth={person?.placeOfBirth}
            roles={
              person?.knownForDepartment ? [person?.knownForDepartment] : []
            }
            isLoading={loadingPerson}
          />
        </Col>
        <Row className="mt-5 gap-5">
          <Col xs={12} md={3}>
            <Button
              variant="outline-dark"
              onClick={handleFollow}
              className="w-100 mb-2 rounded"
            >
              Follow
            </Button>
          </Col>
          <Col md={6}>
            {/*  Here the rating and the 3 media cards should be inserted  */}
          </Col>
        </Row>
      </Row>
      <Row className="mt-5">
        <Col>
          <h5>Credits</h5>
          <CreditsList items={person?.knownForMedia} />
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
                imageUri: actor?.pictureUri,
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
