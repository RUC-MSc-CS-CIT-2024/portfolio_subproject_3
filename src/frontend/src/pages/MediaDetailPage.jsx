import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchMediaById,
  fetchTitles,
  fetchMediaCrew,
  fetchSimilarMedia,
  fetchReleases,
} from '@/services';
import {
  MediaInformation,
  MediaActions,
  MediaBadges,
  MediaCarousel,
  InfoRow,
} from '@/components';
import { useToast } from '@/contexts';
import { extractMembersByJobCategory } from '@/utils';

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

export default function MediaDetailPage() {
  const { id: mediaId } = useParams();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState(null);
  const [titles, setTitles] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilarMedia, setLoadingSimilarMedia] = useState(true);
  const { showToastMessage } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const loadMedia = useCallback(async () => {
    try {
      setLoading(true);
      const mediaData = await fetchMediaById(mediaId);
      setMediaData(mediaData);
      const titlesData = await fetchTitles(mediaId);
      setTitles(titlesData);
      const crewData = await fetchMediaCrew(mediaId);
      setCrew(crewData);
      const releasesData = await fetchReleases(mediaId);
      setReleases(releasesData.items);
    } catch (error) {
      console.error('Error loading media details:', error);
      showToastMessage('Error loading media details', 'error');
    } finally {
      setLoading(false);
    }
  }, [mediaId, showToastMessage]);

  const loadSimilarMedia = useCallback(async () => {
    setLoadingSimilarMedia(true);
    try {
      const fetchedMedia = await fetchSimilarMedia({
        id: mediaId,
        page: currentPage,
        count: 12,
      });
      setSimilarMedia((prevMedia) =>
        currentPage === 1
          ? fetchedMedia.items
          : [...prevMedia, ...fetchedMedia.items],
      );
      setHasMoreItems(!!fetchedMedia.nextPage);
    } catch (error) {
      console.error('Error loading similar media:', error);
    } finally {
      setLoadingSimilarMedia(false);
    }
  }, [mediaId, currentPage]);

  useEffect(() => {
    if (mediaId) {
      loadMedia();
    }
  }, [mediaId, loadMedia]);

  useEffect(() => {
    if (mediaId) {
      loadSimilarMedia();
    }
  }, [mediaId, currentPage, loadSimilarMedia]);

  const handleLoadMore = useCallback(() => {
    if (!loadingSimilarMedia && hasMoreItems) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [loadingSimilarMedia, hasMoreItems]);

  useEffect(() => {
    if (!loading && !mediaData) {
      navigate('/NotFound');
    }
  }, [loading, mediaData, navigate]);

  const directors = extractDirectors(crew);
  const writers = extractWriters(crew);
  const producers = extractProducers(crew);

  return (
    <Container>
      <MediaInformation
        {...mediaData}
        isLoading={loading}
        director={directors}
        writer={writers}
        producer={producers}
        rating={releases ? releases.map((release) => release.rated) : []}
      />
      <Row className="mt-5 gap-5">
        <Col xs={12} md={3}>
          <MediaActions id={mediaId} />
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
          <h5>Similar Media</h5>
          <MediaCarousel
            media={similarMedia}
            loading={loadingSimilarMedia}
            onLoadMore={handleLoadMore}
            hasNextPage={hasMoreItems}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>{/* todo - cast and crew carousel */}</Col>
      </Row>
      <Row>
        <Col>
          <h5>Extra Information</h5>
          <InfoRow label="Type" value={mediaData?.type} />
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
