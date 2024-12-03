import { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import {
  MediaInformation,
  MediaActions,
  MediaBadges,
  MediaCarousel,
  InfoRow,
} from '@/components';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchMediaById,
  fetchTitles,
  fetchMediaCrew,
  //fetchMediaCast,
  fetchSimilarMedia,
  fetchReleases,
} from '@/services/mediaService';
import { useToast } from '@/contexts/ToastContext';
import {
  extractDirectors,
  extractWriters,
  extractProducer,
} from '@/utils/extractCrew';

export default function MediaDetailPage() {
  const { id: mediaId } = useParams();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState(null);
  const [titles, setTitles] = useState([]);
  const [crew, setCrew] = useState([]);
  // To be implemented - const [cast, setCast] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [releases, setReleases] = useState([]);

  const [loading, setLoading] = useState(true);
  const { showToastMessage } = useToast();

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const mediaData = await fetchMediaById(mediaId);
        setMediaData(mediaData);
        const titlesData = await fetchTitles(mediaId);
        setTitles(titlesData);
        const crewData = await fetchMediaCrew(mediaId);
        setCrew(crewData);
        //const castData = await fetchMediaCast(mediaId);
        //setCast(castData);
        const similarMediaData = await fetchSimilarMedia(mediaId);
        setSimilarMedia(similarMediaData.items);
        const releasesData = await fetchReleases(mediaId);
        setReleases(releasesData.items);
      } catch {
        showToastMessage('Error getting the media.', 'danger');
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [mediaId, showToastMessage]);

  useEffect(() => {
    if (!loading && !mediaData) {
      navigate('/NotFound');
    }
  }, [loading, mediaData, navigate]);

  const directors = extractDirectors(crew);
  const writers = extractWriters(crew);
  const producers = extractProducer(crew);

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
          <h5> Similar Media </h5>
          <MediaCarousel media={similarMedia} loading={loading} />
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
