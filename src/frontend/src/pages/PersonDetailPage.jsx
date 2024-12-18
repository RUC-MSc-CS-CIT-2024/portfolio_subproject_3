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
  fetchPersonImages,
} from '@/services';
import { useToast, useUserData } from '@/contexts';
import { fetchAllPages } from '@/utils';
import { useAuth } from '@/hooks';

export default function PersonDetailPage() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const { following, refreshUserData } = useUserData();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [coActors, setCoActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const [personImages, setPersonImages] = useState([]);

  const isFollowed = following.some(
    (follow) => follow.personId === parseInt(id),
  );

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
        setHasMoreItems(coActorsData.nextPage !== null);
      } catch {
        showToastMessage('Error getting the co-actors.', 'danger');
      }
    },
    [showToastMessage],
  );

  const fetchAllCredits = useCallback(async () => {
    const allCredits = await fetchAllPages(fetchPersonMedia, 3, id);
    setCredits(allCredits);
    setHasMoreItems(false);
  }, [id]);

  useEffect(() => {
    setCoActors([]);
    setCredits([]);
    setHasMoreItems(true);

    fetchCoActorsData(id, 1);

    (async () => {
      try {
        const personData = await fetchPersonById(id);
        setPerson(personData);
        if (personData.tmdbId !== undefined) {
          const images = await fetchPersonImages(personData.tmdbId);
          setPersonImages(images.slice(1));
        }
      } catch {
        showToastMessage('Error getting the person.', 'danger');
        navigate('/');
      } finally {
        setLoading(false);
      }
    })();

    (async () => {
      try {
        const response = await fetchPersonMedia(id, 1, 3);
        setCredits((prevCredits) => {
          const newCredits = response.items.filter(
            (item) => !prevCredits.some((credit) => credit.id === item.id),
          );
          return [...prevCredits, ...newCredits];
        });
        setHasMoreItems(response.nextPage !== undefined);
      } catch {
        showToastMessage('Error getting the credits.', 'danger');
      }
    })();
  }, [fetchCoActorsData, id, navigate, showToastMessage]);

  useEffect(() => {
    if (!loading && !person) {
      navigate('/NotFound');
    }
  }, [loading, person, navigate]);

  const handleFollow = async () => {
    try {
      await createFollow(id);
      showToastMessage('Successfully followed the person', 'success');
      refreshUserData();
    } catch (error) {
      console.error('Error following the person', error);
      showToastMessage('Error following the person', 'danger');
    }
  };

  const handleLoadMoreCoActors = useCallback(() => {
    if (hasMoreItems) {
      fetchCoActorsData(id, currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [id, currentPage, hasMoreItems, fetchCoActorsData]);

  const knownForMedia =
    person?.knownForMedia?.map((media) => {
      return {
        id: media?.id,
        title: media?.title,
        releaseYear: media?.releaseDate,
        imageUri: `https://image.tmdb.org/t/p/w500${media?.posterPath}`,
        type: media?.mediaType,
      };
    }) ?? Array.from({ length: 3 }, (value) => value).map(() => {});

  const ratings = [
    {
      source: 'Popularity',
      value: person?.popularity || 'No Rating Available',
    },
    { source: 'Score', value: person?.score || 'No Rating Available' },
    { source: 'Name Rating', value: person?.rating || 'No Rating Available' },
  ];

  const actionButton = isFollowed ? (
    <div className="alert alert-info">
      You are already following {person?.name}. See people you are following:{' '}
      <Link to="/profile/lists#following">here</Link>
    </div>
  ) : (
    <Button
      variant="outline-dark"
      onClick={handleFollow}
      className="w-100 mb-2 rounded"
    >
      Follow
    </Button>
  );

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
            images={personImages}
          />
        </Col>
        <Row className="mt-5 align-items-start">
          <Col xs={12} md={3}>
            {isAuthenticated && actionButton}
          </Col>
          <Col xs={12} sm={12} md={12} lg={5}>
            <Rating ratings={ratings} noHeading />
          </Col>
          <Col
            xs={12}
            sm={12}
            lg={4}
            className="d-flex justify-content-between"
          >
            {knownForMedia?.map((media, index) => (
              <div key={index} className="flex-fill mx-2">
                <MediaCard {...media} clickable={false} />
              </div>
            ))}
          </Col>
        </Row>
        <Row></Row>
      </Row>
      <Row className="mt-5">
        <Col>
          <h5>Credits</h5>
          <CreditsList items={credits} />
          {hasMoreItems && (
            <Button onClick={fetchAllCredits} variant="link">
              Show all
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
