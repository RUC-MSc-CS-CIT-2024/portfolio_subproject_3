import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMediaPerRow } from '@/hooks';
import { MediaCard } from '@/components';
import './MediaGrid.css';

export default function MediaGrid({ media, loading }) {
  const [showMore, setShowMore] = useState(false);
  const mediaPerRow = useMediaPerRow();

  const firstRowMedia = media.slice(0, mediaPerRow);
  const remainingMedia = media.slice(mediaPerRow);

  return (
    <Container fluid className="container-layout ">
      <Row>
        {firstRowMedia.map((media, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="position-relative"
          >
            <MediaCard
              id={media.id}
              imageUri={media.imageUri}
              type={media.type}
              title={media.title}
              releaseYear={media.releaseYear}
              isLoading={loading}
            />
            {index === firstRowMedia.length - 1 &&
              remainingMedia.length > 0 && (
                <Button
                  variant="link"
                  onClick={() => setShowMore(!showMore)}
                  className="see-more-button"
                >
                  {showMore ? 'See Less' : 'See More'}
                </Button>
              )}
          </Col>
        ))}
      </Row>
      {showMore && (
        <Row>
          {remainingMedia.map((media, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="position-relative"
            >
              <MediaCard
                id={media.mediaId}
                imageUri={media.imageUri}
                type={media.type}
                title={media.title}
                releaseYear={media.releaseYear}
                isLoading={loading}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
