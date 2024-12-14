import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  PersonsCarousel,
  PersonInformation,
  CreditsList,
  Rating,
  MediaCard,
} from '@/components';
import { useState, useEffect, useCallback } from 'react';
import {
  fetchPersonById,
  fetchPersonMedia,
  fetchPersonCoactors,
  createFollow,
} from '@/services';
import { useToast, useUserData } from '@/contexts';

export default function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const { following } = useUserData();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [coActors, setCoActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);

  const isFollowed = following.some(
    (follow) => follow.personId === parseInt(id),
  );

  const fetchPersonData = useCallback(async (personId, page) => {
    try {
      const response = await fetchPersonMedia(personId, page, 3);
      setCredits((prevCredits) => {
        const newCredits = response.items.filter(
          (item) => !prevCredits.some((credit) => credit.id === item.id),
        );
        return [...prevCredits, ...newCredits];
      });
      setHasMoreItems(response.nextPage !== null);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  }, []);

  const fetchCoActorsData = useCallback(
    async (personId, page) => {
      try {
        const coActorsData = await fetchPersonCoactors({
          id: personId,
          page: page,
          count: 12,
        });
        setCoActors((prevCoActors) => [
          ...prevCoActors,
          ...coActorsData.items.filter(
            (newCoactor) =>
              !prevCoActors.some((coactor) => coactor.id === newCoactor.id),
          ),
        ]);
        setHasMoreItems(!!coActorsData.nextPage);
      } catch {
        showToastMessage('Error getting the co-actors.', 'danger');
      }
    },
    [showToastMessage],
  );

  const loadPerson = useCallback(async () => {
    setLoading(true);
    try {
      const personData = await fetchPersonById(id);
      setPerson(personData);
      fetchCoActorsData(id, 1);
    } catch {
      showToastMessage('Error getting the person.', 'danger');
      navigate('/persons');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, showToastMessage, fetchCoActorsData]);

  useEffect(() => {
    loadPerson();
  }, [id, loadPerson]);

  useEffect(() => {
    fetchPersonData(id, currentPage);
  }, [id, currentPage, fetchPersonData]);

  useEffect(() => {
    if (!loading && !person) {
      navigate('/NotFound');
    }
  }, [loading, person, navigate]);

  useEffect(() => {
    setCoActors([]);
    setCredits([]);
    setCurrentPage(1);
    setHasMoreItems(true);
  }, [id]);

  const handleFollow = async () => {
    try {
      await createFollow(id);
      showToastMessage('Successfully followed the person', 'success');
    } catch (error) {
      console.error('Error following the person', error);
      showToastMessage('Error following the person', 'danger');
    }
  };

  const handleLoadMore = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const handleLoadMoreCoActors = useCallback(() => {
    if (hasMoreItems) {
      fetchCoActorsData(id, currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [id, currentPage, hasMoreItems, fetchCoActorsData]);

  const knownForMedia = person?.knownForMedia?.map((media) => ({
    id: media?.id,
    title: media?.title,
    releaseYear: media?.releaseDate,
    imageUri: `https://image.tmdb.org/t/p/w500${media?.posterPath}`,
    type: media?.mediaType,
  }));

  const ratings = [
    {
      source: 'Popularity',
      value: person?.popularity || 'No Rating Available',
    },
    { source: 'Score', value: person?.score || 'No Rating Available' },
    { source: 'Name Rating', value: person?.rating || 'No Rating Available' },
  ];

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
            alsoKnownAs={person?.alsoKnownAs}
            homepage={person?.homepage}
            placeOfBirth={person?.placeOfBirth}
            roles={
              person?.knownForDepartment ? [person?.knownForDepartment] : []
            }
          />
        </Col>
        <Row className="mt-5">
          <Col xs={12} md={3}>
            {isFollowed ? (
              <div className="alert alert-info">
                You are already following {person?.name}. See people you are
                following: <Link to="/profile/lists#following">here</Link>
              </div>
            ) : (
              <Button
                variant="outline-dark"
                onClick={handleFollow}
                className="w-100 mb-2 rounded"
              >
                Follow
              </Button>
            )}
          </Col>
          <Col xs={12} sm={12} md={12} lg={5}>
            <Rating ratings={ratings} noHeading />
          </Col>
          {knownForMedia?.map((media, index) => (
            <Col key={index} xs={12} sm={4} md={4} lg={1}>
              <MediaCard {...media} />
            </Col>
          ))}
        </Row>
        <Row></Row>
      </Row>
      <Row className="mt-5">
        <Col>
          <h5>Credits</h5>
          <CreditsList items={credits} />
          {hasMoreItems && (
            <Button onClick={handleLoadMore} variant="link">
              Load More
            </Button>
          )}
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
              onLoadMore={handleLoadMoreCoActors}
              hasMoreItems={hasMoreItems}
            />
          ) : (
            <p>No co-actors found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
