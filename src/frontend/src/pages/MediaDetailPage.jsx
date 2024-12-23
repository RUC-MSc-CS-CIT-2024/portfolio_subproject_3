import { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchMediaById,
  fetchTitles,
  fetchMediaCrew,
  fetchSimilarMedia,
  fetchReleases,
  fetchMediaCast,
} from '@/services';
import {
  MediaInformation,
  MediaActions,
  MediaBadges,
  MediaCarousel,
  InfoRow,
  PersonsCarousel,
  MediaTypeBadge,
} from '@/components';
import { useToast } from '@/contexts';
import { extractMembersByJobCategory } from '@/utils';
import { usePaginatedData, useAuth } from '@/hooks';

const extractDirectors = (crew) =>
  extractMembersByJobCategory(crew, 'director');
const extractWriters = (crew) => {
  const createdByWriters = extractMembersByJobCategory(
    crew,
    'writer',
    'created by',
  );
  return createdByWriters.length > 0
    ? createdByWriters
    : extractMembersByJobCategory(crew, 'writer');
};
const extractProducers = (crew) =>
  extractMembersByJobCategory(crew, 'producer');

const mergeRoles = (people) => {
  const merged = {};

  people.forEach((person) => {
    const role = person.role ? person.role : undefined;
    const character = person.character ? person.character : undefined;
    if (merged[person.personId]) {
      if (role) {
        merged[person.personId].role = Array.from(
          new Set([...merged[person.personId].role, role]),
        );
      }
      if (character) {
        merged[person.personId].character = Array.from(
          new Set([...merged[person.personId].character, character]),
        );
      }
    } else {
      merged[person.personId] = {
        ...person,
        id: person.personId,
        name: person.personName,
        role: role ? [role] : [],
        character: character ? [character] : [],
      };
    }
  });

  return Object.values(merged);
};

export default function MediaDetailPage() {
  const { isAuthenticated } = useAuth();
  const { id: mediaId } = useParams();
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [mediaData, setMediaData] = useState(null);
  const [titles, setTitles] = useState([]);
  const [releases, setReleases] = useState([]);

  const {
    data: crew,
    hasMore: hasMoreCrew,
    handleLoadMore: handleLoadMoreCrew,
  } = usePaginatedData(fetchMediaCrew, mediaId);

  const {
    data: cast,
    hasMore: hasMoreCast,
    handleLoadMore: handleLoadMoreCast,
  } = usePaginatedData(fetchMediaCast, mediaId);

  const {
    data: similarMedia,
    hasMore: hasMoreItems,
    handleLoadMore: handleLoadMoreSimilarMedia,
  } = usePaginatedData(fetchSimilarMedia, mediaId);

  useEffect(() => {
    setMediaData(null);
    setTitles([]);
    setReleases([]);

    (async () => {
      try {
        const mediaData = await fetchMediaById(mediaId);
        setMediaData(mediaData);
      } catch (error) {
        console.error('Error loading media details:', error);
        showToastMessage('Error loading media details', 'error');
        navigate('/');
      }
    })();

    (async () => {
      try {
        const allTitles = await fetchTitles(mediaId);
        setTitles(allTitles);
      } catch (error) {
        console.error('Error loading titles:', error);
        showToastMessage('Error loading titles', 'error');
      }
    })();

    (async () => {
      try {
        const releasesData = await fetchReleases(mediaId);
        setReleases(releasesData.items);
      } catch (error) {
        console.error('Error loading releases:', error);
        showToastMessage('Error loading releases', 'error');
      }
    })();
  }, [mediaId, navigate, showToastMessage]);

  const directors = extractDirectors(crew);
  const writers = extractWriters(crew);
  const producers = extractProducers(crew);

  const mergedCrew = mergeRoles(crew);
  const mergedCast = mergeRoles(cast);
  return (
    <Container>
      <MediaInformation
        {...mediaData}
        mediaId={mediaId}
        director={directors}
        writer={writers}
        producer={producers}
        rating={releases ? releases.map((release) => release.rated) : []}
      />
      <Row className="mt-5 gap-5">
        <Col xs={12} md={3}>
          {isAuthenticated && <MediaActions id={mediaId} />}
        </Col>
        <Col md={6}>
          <Tabs id="media-detail-tabs" className="mb-3">
            <Tab eventKey="genres" title="Genres">
              <MediaBadges
                title="Genres"
                badges={
                  mediaData?.genres
                    ? mediaData.genres.map((genre) => genre.name)
                    : []
                }
              />
            </Tab>
            <Tab eventKey="titles" title="Titles">
              <MediaBadges
                title="Titles"
                badges={
                  titles ? [...new Set(titles.map((title) => title.name))] : []
                }
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Tabs defaultActiveKey="crew" id="crew-cast-tabs" className="mb-3">
            <Tab eventKey="crew" title="Crew">
              <PersonsCarousel
                persons={mergedCrew.map((person) => ({
                  ...person,
                  id: person.personId,
                  name: person.personName,
                }))}
                onLoadMore={handleLoadMoreCrew}
                hasNextPage={hasMoreCrew}
              />
            </Tab>
            <Tab eventKey="cast" title="Cast">
              <PersonsCarousel
                persons={mergedCast.map((person) => ({
                  ...person,
                  id: person.personId,
                  name: person.personName,
                }))}
                onLoadMore={handleLoadMoreCast}
                hasNextPage={hasMoreCast}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h5>Similar Media</h5>
          <MediaCarousel
            media={similarMedia}
            onLoadMore={handleLoadMoreSimilarMedia}
            hasNextPage={hasMoreItems}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Extra Information</h5>
          <InfoRow
            label="Type"
            value={<MediaTypeBadge type={mediaData?.type} />}
          />
          <InfoRow label="Box Office" value={mediaData?.boxoffice} />
          <InfoRow label="Awards" value={mediaData?.awardText} />
          <InfoRow
            label="Release type"
            value={
              releases ? releases.map((release) => release.type).join(', ') : ''
            }
          />
          <InfoRow label="Episode number" value={mediaData?.episodeNumber} />
        </Col>
      </Row>
    </Container>
  );
}
